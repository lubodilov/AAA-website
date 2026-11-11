/**
 * The impossible staircase.
 *
 * A real 3D object, seen through a true isometric lens. From exactly that angle
 * the flights close into a loop and the people on it climb forever. The geometry
 * is an open spiral: its top sits precisely in front of its bottom along the line
 * of sight. Turn the camera and the illusion falls apart, as it would in life.
 *
 * Two materials share one object. In the dark theme it is black glass with lit
 * edges, standing in a pool of red light whose shadow can't lie: under a closed
 * loop it draws an open stair. A river of light runs around the loop, trapped,
 * until the missing step is built and it pours out. In the white theme it is
 * plaster, on the page itself. Nothing here is post-processing.
 */

import { addFrame } from './scroll';
import { clamp, easeInOut, lerp, mulberry32, range } from './env';
import { TOTAL } from './heroTimeline';

/* ------------------------------------------------------------------ */
/* The plan                                                             */
/* ------------------------------------------------------------------ */
const WIDTH = 2.1;
const RISE = 0.2;
const THICK = 1.05;
/** The flight that finally leaves the loop, past the step that was missing. */
const EXIT = 30;
const FLIGHTS: [number, number, number][] = [
  [1, 0, 13],
  [0, -1, 5],
  [-1, 0, 5],
  [0, 1, 13],
];

type Tile = { x: number; z: number; y: number; w: number; d: number; ox: number; oz: number; halfOut: number; kind: number };

function plan(): Tile[] {
  // the loop as a list of tiles, then rotated so the seam falls on a flight that walks away from the viewer
  const seq: { ix: number; iz: number; ox: number; oz: number; corner: boolean }[] = [];
  FLIGHTS.forEach(([dx, dz, n], f) => {
    for (let i = 0; i < n; i++) seq.push({ ix: dx, iz: dz, ox: dx, oz: dz, corner: false });
    const [nx, nz] = FLIGHTS[(f + 1) % 4];
    seq.push({ ix: dx, iz: dz, ox: nx, oz: nz, corner: true });
  });
  const start = 13 + 1 + 5 + 1 + 2;
  const ring = [...seq.slice(start), ...seq.slice(0, start)];

  // One turn of a spiral. Its top sits exactly in front of its bottom along the
  // line of sight, so from the true isometric view the ends seem to meet.
  const halfAlong = (t: { corner: boolean }) => (t.corner ? WIDTH / 2 : 0.5);
  const tiles: Tile[] = [];
  let x = 0;
  let z = 0;
  const n = ring.length;
  for (let i = 0; i <= n + EXIT; i++) {
    const t = i < n ? ring[i] : ring[0];
    const next = i + 1 < n ? ring[i + 1] : ring[0];
    const w = t.corner ? WIDTH : t.ix !== 0 ? 1 : WIDTH;
    const d = t.corner ? WIDTH : t.ix !== 0 ? WIDTH : 1;
    tiles.push({ x, z, y: i * RISE, w, d, ox: t.ox, oz: t.oz, halfOut: t.ox !== 0 ? w / 2 : d / 2, kind: i < n ? 0 : i === n ? 1 : 2 });
    const step = halfAlong(t) + halfAlong(next);
    x += t.ox * step;
    z += t.oz * step;
  }
  return tiles;
}

const TILES = plan();
const LOOP = TILES.filter((t) => t.kind === 0).length;
const TOP = TILES.length;
const RING = LOOP * RISE;
const CENTRE = (() => {
  const c = { x: 0, y: 0, z: 0 };
  for (let i = 0; i < LOOP; i++) {
    c.x += TILES[i].x / LOOP;
    c.y += TILES[i].y / LOOP;
    c.z += TILES[i].z / LOOP;
  }
  return c;
})();

/** A box with softly broken edges; a hard CG corner gives the game away. */
function bevelBox(w: number, d: number, h: number, bevel: number) {
  const hw = w / 2 - bevel;
  const hd = d / 2 - bevel;
  const cs = 2;
  const outline: [number, number, number, number][] = [];
  ([
    [hw, hd, 0],
    [-hw, hd, 90],
    [-hw, -hd, 180],
    [hw, -hd, 270],
  ] as const).forEach(([cx, cz, a0]) => {
    for (let i = 0; i <= cs; i++) {
      const a = ((a0 + (i / cs) * 90) * Math.PI) / 180;
      outline.push([cx, cz, Math.cos(a), Math.sin(a)]);
    }
  });
  const rows: { r: number; y: number; nr: number; ny: number }[] = [];
  const bs = 2;
  for (let i = bs; i >= 0; i--) {
    const t = (i / bs) * (Math.PI / 2);
    rows.push({ r: Math.cos(t), y: -bevel * Math.sin(t) + bevel, nr: Math.cos(t), ny: -Math.sin(t) });
  }
  for (let i = 0; i <= bs; i++) {
    const t = (i / bs) * (Math.PI / 2);
    rows.push({ r: Math.cos(t), y: h - bevel + bevel * Math.sin(t), nr: Math.cos(t), ny: Math.sin(t) });
  }
  const v: number[] = [];
  const idx: number[] = [];
  rows.forEach((r) =>
    outline.forEach(([cx, cz, nx, nz]) => {
      v.push(cx + nx * bevel * r.r, r.y - h, cz + nz * bevel * r.r, nx * r.nr, r.ny, nz * r.nr);
    }),
  );
  const n = outline.length;
  for (let r = 0; r < rows.length - 1; r++) {
    for (let i = 0; i < n; i++) {
      const a = r * n + i;
      const b = r * n + ((i + 1) % n);
      idx.push(a, b, a + n, b, b + n, a + n);
    }
  }
  const cap = (y: number, ny: number, row: number) => {
    const c = v.length / 6;
    v.push(0, y, 0, 0, ny, 0);
    for (let i = 0; i < n; i++) idx.push(c, row * n + i, row * n + ((i + 1) % n));
  };
  cap(0, 1, rows.length - 1);
  cap(-h, -1, 0);
  return { v, idx };
}

/** A small figure: a tapered body and a head, the way an architect draws people. */
function figureMesh() {
  const v: number[] = [];
  const idx: number[] = [];
  const lathe = (profile: [number, number][], seg: number) => {
    const base = v.length / 6;
    profile.forEach(([r, y], i) => {
      const [pr, py] = profile[Math.max(0, i - 1)];
      const [nr, ny] = profile[Math.min(profile.length - 1, i + 1)];
      let nx = ny - py;
      let ny2 = pr - nr;
      const l = Math.hypot(nx, ny2) || 1;
      nx /= l;
      ny2 /= l;
      for (let k = 0; k <= seg; k++) {
        const a = (k / seg) * Math.PI * 2;
        v.push(Math.cos(a) * r, y, Math.sin(a) * r, Math.cos(a) * nx, ny2, Math.sin(a) * nx);
      }
    });
    for (let i = 0; i < profile.length - 1; i++) {
      for (let k = 0; k < seg; k++) {
        const a = base + i * (seg + 1) + k;
        const b = a + seg + 1;
        idx.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
  };
  lathe([[0.001, 0], [0.085, 0.015], [0.1, 0.09], [0.105, 0.28], [0.12, 0.42], [0.095, 0.5], [0.001, 0.52]], 10);
  const head: [number, number][] = [];
  for (let i = 0; i <= 8; i++) {
    const a = (i / 8) * Math.PI;
    head.push([Math.max(0.001, Math.sin(a) * 0.082), 0.625 - Math.cos(a) * 0.082]);
  }
  lathe(head, 10);
  return { v, idx };
}

/* ------------------------------------------------------------------ */
/* Shaders                                                              */
/* ------------------------------------------------------------------ */
const TILE_ATTR = `
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNor;
layout(location=2) in vec4 aA;   // tile centre x,z and exit direction
layout(location=3) in vec4 aB;   // half length out, top y, index, red
uniform float uBuild, uIntro, uLoop, uUpper;
float eo(float t){ t = 1.0 - t; return 1.0 - t * t * t; }
vec3 place(vec3 p, out float visible){
  visible = 1.0;
  if (aB.w > 1.5) {
    // the way out draws itself backward from the far end, and stops one step short
    float k = uUpper * ${(EXIT + 6).toFixed(1)} - (uLoop + ${(EXIT + 1).toFixed(1)} - aB.z);
    if (k <= 0.0) visible = 0.0;
    p.y -= (1.0 - eo(clamp(k / 5.0, 0.0, 1.0))) * 0.7;
  } else if (aB.w > 0.5) {
    if (uBuild <= 0.0) visible = 0.0;
    float e = eo(uBuild);
    p.x += (1.0 - e) * 1.0;
    p.y -= (1.0 - e) * ${RISE.toFixed(4)};
  } else {
    float k = clamp(uIntro * 1.55 - aB.z / uLoop * 0.55, 0.0, 1.0);
    p.y -= (1.0 - eo(k)) * 0.9;
  }
  return p;
}`;

const STONE_VS = `#version 300 es
precision highp float;
${TILE_ATTR}
uniform mat4 uVP, uLight;
out vec3 vW, vN;
out vec4 vL, vA, vB;
void main(){
  float vis;
  vec3 p = place(aPos, vis);
  vW = p; vN = aNor; vA = aA; vB = aB;
  vL = uLight * vec4(p + aNor * 0.075, 1.0);
  gl_Position = vis > 0.5 ? uVP * vec4(p, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}`;

const STONE_FS = `#version 300 es
precision highp float;
precision highp sampler2DShadow;
in vec3 vW, vN;
in vec4 vL, vA, vB;
out vec4 o;
uniform sampler2DShadow uShadow;
uniform vec3 uSun, uEye;
uniform float uTexel, uDark, uTime, uRelease;
uniform vec3 uCut, uTop;
uniform vec2 uRes;
uniform float uVert;
float cut(){
  float c = uVert > 0.5 ? gl_FragCoord.y / uRes.y : gl_FragCoord.x / uRes.x;
  float top = 1.0 - smoothstep(uTop.x, uTop.y, gl_FragCoord.y / uRes.y);
  return mix(1.0, smoothstep(uCut.x, uCut.y, c), uCut.z) * mix(1.0, top, uTop.z);
}

const vec2 P[12] = vec2[12](vec2(-0.326,-0.406),vec2(-0.840,-0.074),vec2(-0.696,0.457),vec2(-0.203,0.621),vec2(0.962,-0.195),vec2(0.473,-0.480),vec2(0.519,0.767),vec2(0.185,-0.893),vec2(0.507,0.064),vec2(0.896,0.412),vec2(-0.322,-0.933),vec2(-0.792,-0.598));

float h3(vec3 q){ return fract(sin(dot(q, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float vn(vec3 p){
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z);
}

vec3 toS(vec3 c){ return pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2)); }

void main(){
  vec3 N = normalize(vN);
  vec3 p = vL.xyz / vL.w * 0.5 + 0.5;
  float s = 0.0;
  for (int i = 0; i < 12; i++) s += texture(uShadow, vec3(p.xy + P[i] * uTexel * 2.4, p.z - 0.0013));
  s /= 12.0;

  float k = dot(N, uSun);
  float sun = max(k, 0.0) * s;

  // contact shading: where each tread meets the riser of the next step, and each riser its tread
  vec2 c = vA.xy;
  vec2 dir = vA.zw;
  float ao = 1.0;
  if (N.y > 0.9) {
    float d = vB.x - dot(vW.xz - c, dir);
    ao *= 1.0 - 0.5 * exp(-d * 7.0);
    ao *= 1.0 - 0.14 * exp(-d * 1.6);
  } else if (N.y > -0.2) {
    float below = vW.y - (vB.y - ${RISE.toFixed(4)});
    if (dot(N.xz, dir) < -0.5) ao *= 1.0 - 0.55 * exp(-max(below, 0.0) * 22.0);
    ao *= 0.86 + 0.14 * clamp((vW.y - (vB.y - ${THICK.toFixed(3)})) / ${THICK.toFixed(3)}, 0.0, 1.0);
  }

  float grain = (vn(vW * 26.0) - 0.5) * 0.03 + (vn(vW * 7.0) - 0.5) * 0.02;

  vec3 stone = vec3(0.86, 0.838, 0.8);
  vec3 paint = vec3(0.78, 0.014, 0.006);
  vec3 base = (vB.w > 0.5 && vB.w < 1.5) ? paint : stone;

  vec3 sky = mix(vec3(0.2, 0.19, 0.18), vec3(0.5, 0.495, 0.48), N.y * 0.5 + 0.5);
  vec3 col = base * (sky * ao + vec3(1.0, 0.96, 0.89) * sun * 0.8);
  col *= 1.0 + grain;

  if (uDark > 0.001) {
    // black glass: almost no colour of its own, everything it shows is light arriving at it
    float NV = max(dot(N, uEye), 0.0);
    float fres = pow(1.0 - NV, 3.0);
    float bevel = smoothstep(0.03, 0.2, 1.0 - max(max(abs(N.x), abs(N.y)), abs(N.z)));
    vec3 H = normalize(uSun + uEye);
    float spec = pow(max(dot(N, H), 0.0), 70.0) * s;
    float up = clamp((vW.y - (vB.y - ${THICK.toFixed(3)})) / ${THICK.toFixed(3)}, 0.0, 1.0);
    vec3 red = vec3(1.0, 0.075, 0.03);
    vec3 R = reflect(-uEye, N);
    float sheen = pow(max(dot(R, normalize(vec3(-0.35, 0.8, 0.5))), 0.0), 9.0) * (N.y > 0.5 ? 1.0 : 0.25);
    vec3 d = vec3(0.0055, 0.005, 0.0056) + vec3(0.016, 0.015, 0.017) * sun * ao;
    d += vec3(0.05, 0.043, 0.048) * sheen;
    if (abs(N.y) < 0.5) d += red * pow(1.0 - up, 2.2) * 0.2 * ao;
    d += red * fres * (N.y > 0.5 ? 0.05 : 0.22);
    d += vec3(1.0, 0.36, 0.24) * bevel * 0.5;
    d += vec3(1.0, 0.93, 0.86) * spec * 0.22;
    d *= 1.0 + grain;
    if (vB.w > 0.5 && vB.w < 1.5) {
      float beat = 0.9 + 0.2 * sin(uTime * 2.2);
      d = (N.y > 0.5 ? vec3(1.0, 0.13, 0.05) : vec3(0.72, 0.03, 0.012)) * beat + vec3(1.0, 0.5, 0.3) * bevel * 0.7;
    } else if (vB.w > 1.5) {
      d += red * uRelease * 0.035;
    }
    col = mix(col, d, uDark);
  }
  float f = cut();
  o = vec4(toS(col) * f, f);
}`;

const DEPTH_VS = `#version 300 es
precision highp float;
${TILE_ATTR}
uniform mat4 uVP;
void main(){
  float vis;
  vec3 p = place(aPos, vis);
  if (aB.w > 1.5 && aB.z > uLoop + 2.5) vis = 0.0; // the way out shouldn't darken the loop it leaves
  gl_Position = vis > 0.5 ? uVP * vec4(p, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}`;

const EMPTY_FS = `#version 300 es
precision highp float;
out vec4 o;
void main(){ o = vec4(1.0); }`;

const FIG_VS = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNor;
layout(location=2) in vec4 aI;  // x, y, z, scale
uniform mat4 uVP;
out vec3 vN;
void main(){
  vN = aNor;
  gl_Position = uVP * vec4(aPos * aI.w + aI.xyz, 1.0);
}`;

const FIG_FS = `#version 300 es
precision highp float;
in vec3 vN;
out vec4 o;
uniform vec3 uSun, uEye;
uniform float uDark;
uniform vec3 uCut, uTop;
uniform vec2 uRes;
uniform float uVert;
float cut(){
  float c = uVert > 0.5 ? gl_FragCoord.y / uRes.y : gl_FragCoord.x / uRes.x;
  float top = 1.0 - smoothstep(uTop.x, uTop.y, gl_FragCoord.y / uRes.y);
  return mix(1.0, smoothstep(uCut.x, uCut.y, c), uCut.z) * mix(1.0, top, uTop.z);
}
void main(){
  vec3 N = normalize(vN);
  float l = max(dot(N, uSun), 0.0);
  vec3 c = vec3(0.012, 0.011, 0.01) + vec3(0.11, 0.1, 0.09) * l;
  // in the dark the people are the brightest solid thing on the stairs
  vec3 lit = vec3(0.3, 0.28, 0.26) * (0.16 + 0.84 * l) + vec3(1.0, 0.07, 0.03) * (0.5 - N.y * 0.5) * 0.34 + vec3(1.0, 0.42, 0.28) * pow(1.0 - max(dot(N, uEye), 0.0), 2.4) * 0.8;
  c = mix(c, lit, uDark);
  float f = cut();
  o = vec4(pow(c, vec3(1.0 / 2.2)) * f, f);
}`;

const FLAT_VS = `#version 300 es
precision highp float;
${TILE_ATTR}
uniform vec3 uSun;
uniform float uFloor, uSpan;
void main(){
  float vis;
  vec3 p = place(aPos, vis);
  if (aB.w > 1.5) vis = 0.0;
  float t = (p.y - uFloor) / uSun.y;
  vec2 q = p.xz - uSun.xz * t;
  gl_Position = vis > 0.5 ? vec4(q / uSpan, 0.0, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}`;

const FULL_VS = `#version 300 es
out vec2 vUv;
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;

const BLUR_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uT;
uniform vec2 uStep;
void main(){
  float s = texture(uT, vUv).r * 0.2042;
  float w[4] = float[4](0.1802, 0.1238, 0.0663, 0.0276);
  for (int i = 0; i < 4; i++) {
    vec2 d = uStep * (float(i) * 2.0 + 1.5);
    s += (texture(uT, vUv + d).r + texture(uT, vUv - d).r) * w[i];
  }
  o = vec4(s, s, s, 1.0);
}`;

const FLOOR_VS = `#version 300 es
precision highp float;
uniform mat4 uVP;
uniform float uFloor, uSpan;
out vec2 vUv;
void main(){
  vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vUv = q * 0.5 + 0.5;
  gl_Position = uVP * vec4(q.x * uSpan, uFloor, q.y * uSpan, 1.0);
}`;

const FLOOR_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uT;
uniform float uA, uClip, uH, uDark;
uniform vec2 uC;
void main(){
  vec2 e = smoothstep(vec2(0.0), vec2(0.08), vUv) * smoothstep(vec2(0.0), vec2(0.08), 1.0 - vUv);
  float clip = smoothstep(uClip - 0.01, uClip + 0.11, gl_FragCoord.y / uH);
  float sh = texture(uT, vUv).r;
  float a = sh * uA * e.x * e.y * clip;
  vec4 paper = vec4(vec3(0.13, 0.1, 0.07) * a, a);
  vec2 q = vUv - uC;
  float pool = exp(-dot(q, q) * 64.0) * 0.82 + exp(-dot(q, q) * 15.0) * 0.18;
  float glow = pool * (1.0 - sh * 0.96) * uA * 2.0 * e.x * e.y * clip;
  vec4 lit = vec4(pow(vec3(1.0, 0.1, 0.045) * glow, vec3(0.8)), 0.0);
  o = mix(paper, lit, uDark);
}`;

/* The river: thin ribbons of light that follow the stairs. */
const RIB_VS = `#version 300 es
precision highp float;
layout(location=0) in vec3 aP;
layout(location=1) in vec3 aQ;
layout(location=2) in vec3 aM;   // side, position along the stairs, seed
uniform mat4 uVP;
uniform vec2 uPx;
uniform float uW;
out float vV, vS, vSeed;
void main(){
  vec4 a = uVP * vec4(aP, 1.0);
  vec4 b = uVP * vec4(aQ, 1.0);
  vec2 d = normalize((b.xy - a.xy) / uPx + vec2(0.00001));
  a.xy += vec2(-d.y, d.x) * aM.x * uW * uPx;
  vV = aM.x; vS = aM.y; vSeed = aM.z;
  gl_Position = a;
}`;

const RIB_FS = `#version 300 es
precision highp float;
in float vV, vS, vSeed;
out vec4 o;
uniform float uT, uHead, uCore, uShare, uPower, uDark, uTail;
uniform vec3 uCut, uTop;
uniform vec2 uRes;
uniform float uVert;
float cut(){
  float c = uVert > 0.5 ? gl_FragCoord.y / uRes.y : gl_FragCoord.x / uRes.x;
  float top = 1.0 - smoothstep(uTop.x, uTop.y, gl_FragCoord.y / uRes.y);
  return mix(1.0, smoothstep(uCut.x, uCut.y, c), uCut.z) * mix(1.0, top, uTop.z);
}
void main(){
  if (vSeed > uShare) discard;
  float reach = smoothstep(uHead + vSeed * 1.2, uHead + vSeed * 1.2 - 0.7, vS);
  if (reach <= 0.0) discard;
  float across = pow(1.0 - abs(vV), uCore > 0.5 ? 1.2 : 2.4);
  float ph = fract((vS - uT * (3.4 + vSeed * 2.2)) / ${(40/4).toFixed(1)} + vSeed * 11.0);
  float comet = pow(ph, 7.0) * smoothstep(1.0, 0.985, ph);
  float strand = uTail + 0.9 * comet;
  float a = across * strand * reach * cut() * uPower * (uCore > 0.5 ? 1.0 : 0.17);
  vec3 hot = mix(vec3(1.0, 0.09, 0.035), vec3(1.0, 0.62, 0.36), clamp(comet * (uCore > 0.5 ? 1.4 : 0.6), 0.0, 1.0));
  vec4 dark = vec4(hot * a, 0.0);
  float la = clamp(a * 0.7, 0.0, 0.85);
  vec4 light = vec4(vec3(0.82, 0.05, 0.02) * la, la);
  o = uDark > 0.5 ? dark : light;
}`;

/* The light that gathers where the stairs stop. */
const GLOW_VS = `#version 300 es
precision highp float;
uniform vec4 uBox;
out vec2 vQ;
void main(){
  vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vQ = q;
  gl_Position = vec4(uBox.xy + q * uBox.zw, 0.0, 1.0);
}`;

const GLOW_FS = `#version 300 es
precision highp float;
in vec2 vQ;
out vec4 o;
uniform float uA;
void main(){
  float r = dot(vQ, vQ);
  float a = (exp(-r * 18.0) * 0.55 + exp(-r * 4.2) * 0.3) * smoothstep(1.0, 0.72, r) * uA;
  o = vec4(vec3(1.0, 0.1, 0.04) * a, 0.0);
}`;

/* ------------------------------------------------------------------ */
/* Small maths                                                          */
/* ------------------------------------------------------------------ */
function ortho(o: Float32Array, halfH: number, aspect: number, near: number, far: number, sx: number, sy: number) {
  const halfW = halfH * aspect;
  o.fill(0);
  o[0] = 1 / halfW;
  o[5] = 1 / halfH;
  o[10] = -2 / (far - near);
  o[12] = sx;
  o[13] = sy;
  o[14] = -(far + near) / (far - near);
  o[15] = 1;
}
function look(o: Float32Array, e: number[], t: number[]) {
  let zx = e[0] - t[0], zy = e[1] - t[1], zz = e[2] - t[2];
  let l = Math.hypot(zx, zy, zz);
  zx /= l; zy /= l; zz /= l;
  let xx = zz, xz = -zx;
  l = Math.hypot(xx, xz);
  xx /= l; xz /= l;
  const yx = zy * xz, yy = zz * xx - zx * xz, yz = -zy * xx;
  o[0] = xx; o[1] = yx; o[2] = zx; o[3] = 0;
  o[4] = 0; o[5] = yy; o[6] = zy; o[7] = 0;
  o[8] = xz; o[9] = yz; o[10] = zz; o[11] = 0;
  o[12] = -(xx * e[0] + xz * e[2]);
  o[13] = -(yx * e[0] + yy * e[1] + yz * e[2]);
  o[14] = -(zx * e[0] + zy * e[1] + zz * e[2]);
  o[15] = 1;
}
function mul(o: Float32Array, a: Float32Array, b: Float32Array) {
  for (let c = 0; c < 4; c++) {
    const x = b[c * 4], y = b[c * 4 + 1], z = b[c * 4 + 2], w = b[c * 4 + 3];
    o[c * 4] = a[0] * x + a[4] * y + a[8] * z + a[12] * w;
    o[c * 4 + 1] = a[1] * x + a[5] * y + a[9] * z + a[13] * w;
    o[c * 4 + 2] = a[2] * x + a[6] * y + a[10] * z + a[14] * w;
    o[c * 4 + 3] = a[3] * x + a[7] * y + a[11] * z + a[15] * w;
  }
}
function key(s: number, keys: [number, number][]) {
  if (s <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (s <= keys[i][0]) {
      const [s0, v0] = keys[i - 1];
      const [s1, v1] = keys[i];
      const t = (s - s0) / (s1 - s0);
      return v0 + (v1 - v0) * (t * t * (3 - 2 * t));
    }
  }
  return keys[keys.length - 1][1];
}

/* ------------------------------------------------------------------ */
/* The stage                                                            */
/* ------------------------------------------------------------------ */
type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };

const ISO_YAW = Math.PI / 4;
const ISO_PITCH = Math.atan(1 / Math.SQRT2);

const pause = (ms = 0) => new Promise<void>((r) => setTimeout(r, ms));

/** How much of the view the single turn takes up from a given angle, so any screen can frame it exactly. */
function viewBox(yaw: number, pitch: number) {
  const cp = Math.cos(pitch);
  const zx = Math.sin(yaw) * cp, zy = Math.sin(pitch), zz = Math.cos(yaw) * cp;
  const l = Math.hypot(zz, zx);
  const xx = zz / l, xz = -zx / l;
  const yx = zy * xz, yy = zz * xx - zx * xz, yz = -zy * xx;
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (let i = 0; i < LOOP; i++) {
    const t = TILES[i];
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) for (const dy of [0, -THICK]) {
      const px = t.x + (sx * t.w) / 2 - CENTRE.x, py = t.y + dy - CENTRE.y, pz = t.z + (sz * t.d) / 2 - CENTRE.z;
      const vx = xx * px + xz * pz;
      const vy = yx * px + yy * py + yz * pz;
      x0 = Math.min(x0, vx); x1 = Math.max(x1, vx);
      y0 = Math.min(y0, vy); y1 = Math.max(y1, vy);
    }
  }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  return { w: x1 - x0, h: y1 - y0, x: CENTRE.x + cx * xx + cy * yx, y: CENTRE.y + cy * yy, z: CENTRE.z + cx * xz + cy * yz };
}
type Box = ReturnType<typeof viewBox>;
const OPEN_YAW = 0.36;
const OPEN_PITCH = 0.5;
const ISO_BOX = viewBox(ISO_YAW, ISO_PITCH);
const OPEN_BOX = viewBox(OPEN_YAW, OPEN_PITCH);
const FLOOR = -1.7;
const SHADOW_SPAN = 34;
const STRANDS = 46;
const PER_TILE = 6;

/** The line the river follows: tile to tile, corners rounded, up the middle of the flight. */
function centreline() {
  const D = { x: TILES[LOOP].x - TILES[0].x, y: LOOP * RISE, z: TILES[LOOP].z - TILES[0].z };
  const tile = (i: number) => {
    if (i < 0) {
      const t = TILES[((i % LOOP) + LOOP) % LOOP];
      return [t.x - D.x, t.y - D.y, t.z - D.z];
    }
    if (i >= TOP) {
      const t = TILES[TOP - 1];
      const k = i - TOP + 1;
      return [t.x + t.ox * k, t.y + RISE * k, t.z + t.oz * k];
    }
    return [TILES[i].x, TILES[i].y, TILES[i].z];
  };
  const pad = 4 * PER_TILE;
  const n = (TOP - 1) * PER_TILE;
  let pts: number[][] = [];
  for (let j = -pad; j <= n + pad; j++) {
    const u = j / PER_TILE;
    const i = Math.floor(u);
    const a = tile(i);
    const b = tile(i + 1);
    pts.push([lerp(a[0], b[0], u - i), lerp(a[1], b[1], u - i), lerp(a[2], b[2], u - i)]);
  }
  for (let pass = 0; pass < 2; pass++) {
    const r = PER_TILE;
    const prev = pts;
    pts = prev.map((_, i) => {
      const c = [0, 0, 0];
      let w = 0;
      for (let k = Math.max(0, i - r); k <= Math.min(prev.length - 1, i + r); k++) {
        c[0] += prev[k][0];
        c[1] += prev[k][1];
        c[2] += prev[k][2];
        w++;
      }
      return [c[0] / w, c[1] / w, c[2] / w];
    });
  }
  return pts.slice(pad, n + pad + 1);
}

function riverMesh() {
  const line = centreline();
  const rnd = mulberry32(19);
  const samples = line.length;
  const data = new Float32Array(STRANDS * samples * 2 * 9);
  const index = new Uint32Array(STRANDS * (samples - 1) * 6);
  const TAU = Math.PI * 2;
  let d = 0;
  let e = 0;
  for (let k = 0; k < STRANDS; k++) {
    const seed = k / STRANDS;
    const lane = (rnd() * 2 - 1) * 0.62;
    const a1 = 0.1 + rnd() * 0.16;
    const a2 = 0.04 + rnd() * 0.08;
    const k1 = 1 + Math.floor(rnd() * 3);
    const k2 = 4 + Math.floor(rnd() * 5);
    const p1 = rnd() * TAU;
    const p2 = rnd() * TAU;
    const lift = 0.1 + rnd() * 0.07;
    const pos = (j: number) => {
      const c = line[Math.max(0, Math.min(samples - 1, j))];
      const a = line[Math.max(0, Math.min(samples - 1, j - 1))];
      const b = line[Math.max(0, Math.min(samples - 1, j + 1))];
      let tx = b[0] - a[0];
      let tz = b[2] - a[2];
      const l = Math.hypot(tx, tz) || 1;
      tx /= l;
      tz /= l;
      const s = j / PER_TILE;
      const side = lane + a1 * Math.sin((TAU * k1 * s) / LOOP + p1) + a2 * Math.sin((TAU * k2 * s) / LOOP + p2);
      return [c[0] - tz * side, c[1] + lift, c[2] + tx * side];
    };
    const base = d / 9;
    for (let j = 0; j < samples; j++) {
      const p = pos(j);
      const q = j + 1 < samples ? pos(j + 1) : [p[0] * 2 - pos(j - 1)[0], p[1] * 2 - pos(j - 1)[1], p[2] * 2 - pos(j - 1)[2]];
      for (const side of [-1, 1]) {
        data.set([p[0], p[1], p[2], q[0], q[1], q[2], side, j / PER_TILE, seed], d);
        d += 9;
      }
      if (j + 1 < samples) {
        const v = base + j * 2;
        index.set([v, v + 1, v + 2, v + 1, v + 3, v + 2], e);
        e += 6;
      }
    }
  }
  return { data, index };
}

const FIG_COUNT = 15;
const FLAT = 1400;

/** Screen anchors: the missing step. */
export class StairStage {
  onFrame: ((s: number, edgeX: number, edgeY: number) => void) | null = null;
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private small = false;
  private fit: { top: number; bottom: number; cut: number; left: number; bottomEnd: number } | null = null;
  private P_: Record<string, Prog> = {};
  private vao!: WebGLVertexArrayObject;
  private figVao!: WebGLVertexArrayObject;
  private figBuf!: WebGLBuffer;
  private emptyVao!: WebGLVertexArrayObject;
  private tileCount = 0;
  private figCount = 0;
  private shadowFb!: WebGLFramebuffer;
  private shadowTex!: WebGLTexture;
  private shadowSize = 2048;
  private flat: { fb: WebGLFramebuffer; tex: WebGLTexture }[] = [];
  private off: (() => void) | null = null;
  private running = false;
  private disposed = false;
  private last = 0;
  private t = 0;
  private intro = 0;
  private target = 0;
  private S = 0;
  private vS = 0;
  private mx = 0;
  private my = 0;
  private tx = 0;
  private ty = 0;
  private vx = 0;
  private vy = 0;
  private W = 2;
  private H = 2;
  private ftSum = 0;
  private ftN = 0;
  private dprCap = 2;

  private Proj = new Float32Array(16);
  private View = new Float32Array(16);
  private VP = new Float32Array(16);
  private LP = new Float32Array(16);
  private LV = new Float32Array(16);
  private Light = new Float32Array(16);
  private ribVao!: WebGLVertexArrayObject;
  private ribCount = 0;
  private dark = 1;
  private figData = new Float32Array(FIG_COUNT * 4);
  private figQ = new Float32Array(FIG_COUNT);
  private figS = new Float32Array(FIG_COUNT);
  private figV = new Float32Array(FIG_COUNT);
  private figLane = new Float32Array(FIG_COUNT);

  static async create(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) return null;
    const stage = new StairStage(canvas, gl);
    try {
      await stage.boot();
      return stage;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.gl = gl;
    this.small = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    this.shadowSize = this.small ? 1024 : 2048;
    this.dprCap = 2;
  }

  /** Startup in small pieces, so the page never stops answering while the stage gets ready. */
  private async boot() {
    await this.programs();
    await pause();
    this.geometry();
    await pause();
    this.targets();
    this.people();
    this.resize();
  }

  private async programs() {
    const gl = this.gl;
    const shader = (t: number, src: string) => {
      const s = gl.createShader(t)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const all = ([
      ['stone', STONE_VS, STONE_FS],
      ['depth', DEPTH_VS, EMPTY_FS],
      ['fig', FIG_VS, FIG_FS],
      ['figDepth', FIG_VS.replace('out vec3 vN;', '').replace('vN = aNor;', ''), EMPTY_FS],
      ['flat', FLAT_VS, EMPTY_FS],
      ['blur', FULL_VS, BLUR_FS],
      ['floor', FLOOR_VS, FLOOR_FS],
      ['river', RIB_VS, RIB_FS],
      ['glow', GLOW_VS, GLOW_FS],
    ] as const).map(([name, vs, fs]) => {
      const v = shader(gl.VERTEX_SHADER, vs);
      const f = shader(gl.FRAGMENT_SHADER, fs);
      const p = gl.createProgram()!;
      gl.attachShader(p, v);
      gl.attachShader(p, f);
      gl.linkProgram(p);
      return { name, p, v, f };
    });

    // Compiling happens on the GPU's side. Asking for the result too early makes the page wait for it.
    const parallel = gl.getExtension('KHR_parallel_shader_compile');
    if (parallel) {
      while (!this.disposed && !all.every((x) => gl.getProgramParameter(x.p, parallel.COMPLETION_STATUS_KHR))) await pause(16);
    }

    for (const { name, p, v, f } of all) {
      await pause();
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(`${name}: ${gl.getProgramInfoLog(p)} ${gl.getShaderInfoLog(v)} ${gl.getShaderInfoLog(f)}`);
      }
      const u: Prog['u'] = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(p, i)!;
        u[info.name.replace('[0]', '')] = gl.getUniformLocation(p, info.name);
      }
      this.P_[name] = { p, u };
    }
  }

  private geometry() {
    const gl = this.gl;
    const verts: number[] = [];
    const idx: number[] = [];
    TILES.forEach((t, i) => {
      const m = bevelBox(t.w, t.d, THICK, 0.022);
      const base = verts.length / 14;
      for (let k = 0; k < m.v.length; k += 6) {
        verts.push(m.v[k] + t.x, m.v[k + 1] + t.y, m.v[k + 2] + t.z, m.v[k + 3], m.v[k + 4], m.v[k + 5], t.x, t.z, t.ox, t.oz, t.halfOut, t.y, i, t.kind);
      }
      m.idx.forEach((v) => idx.push(v + base));
    });
    this.tileCount = idx.length;
    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    const S = 14 * 4;
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, S, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, S, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, S, 24);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 4, gl.FLOAT, false, S, 40);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(idx), gl.STATIC_DRAW);

    const f = figureMesh();
    this.figCount = f.idx.length;
    this.figVao = gl.createVertexArray()!;
    gl.bindVertexArray(this.figVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(f.v), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(f.idx), gl.STATIC_DRAW);
    this.figBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.figBuf);
    gl.bufferData(gl.ARRAY_BUFFER, this.figData, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(2, 1);
    this.emptyVao = gl.createVertexArray()!;

    const river = riverMesh();
    this.ribCount = river.index.length;
    this.ribVao = gl.createVertexArray()!;
    gl.bindVertexArray(this.ribVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, river.data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 36, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 36, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 36, 24);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, river.index, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
  }

  private targets() {
    const gl = this.gl;
    this.shadowTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.shadowTex);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT24, this.shadowSize, this.shadowSize);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
    this.shadowFb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.shadowFb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.shadowTex, 0);
    gl.drawBuffers([gl.NONE]);
    gl.readBuffer(gl.NONE);

    for (let i = 0; i < 2; i++) {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texStorage2D(gl.TEXTURE_2D, 1, gl.R8, FLAT, FLAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      this.flat.push({ fb, tex });
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private people() {
    const rnd = mulberry32(5);
    // three lanes, one pace per lane: nobody walks through anybody
    const lanes = [-0.52, 0.02, 0.52];
    const pace = [0.6, 0.68, 0.64];
    for (let i = 0; i < FIG_COUNT; i++) {
      this.figS[i] = (i / FIG_COUNT) * LOOP + rnd() * 0.4;
      this.figV[i] = pace[i % 3];
      this.figLane[i] = lanes[i % 3];
    }
  }

  resize() {
    const cw = this.canvas.clientWidth || window.innerWidth;
    const ch = this.canvas.clientHeight || window.innerHeight;
    this.small = cw < 768 || ch > cw;
    let dpr = Math.min(window.devicePixelRatio || 1, this.dprCap);
    const budget = 4.2e6;
    if (cw * ch * dpr * dpr > budget) dpr = Math.sqrt(budget / (cw * ch));
    this.W = Math.max(2, Math.round(cw * dpr));
    this.H = Math.max(2, Math.round(ch * dpr));
    this.canvas.width = this.W;
    this.canvas.height = this.H;
    if (!this.running) this.draw();
  }

  /** On a phone the staircase lives above the words: `top` to `bottom` of the screen, faded out by `cut`. */
  setFit(top: number, bottom: number, cut: number, left: number, bottomEnd: number) {
    this.fit = { top, bottom: Math.max(top + 0.16, bottom), cut, left, bottomEnd };
    if (!this.running) this.draw();
  }

  setTheme(light: boolean) {
    this.dark = light ? 0 : 1;
    if (!this.running) this.draw();
  }

  setProgress(p: number) {
    this.target = clamp(p) * TOTAL;
  }

  setPointer(x: number, y: number) {
    this.tx = (x / window.innerWidth) * 2 - 1;
    this.ty = (y / window.innerHeight) * 2 - 1;
  }

  play() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.off = addFrame((now) => this.frame(now));
  }

  pause() {
    this.running = false;
    this.off?.();
    this.off = null;
  }

  destroy() {
    this.disposed = true;
    this.pause();
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  private spring(x: number, v: number, target: number, omega: number, h: number): [number, number] {
    const d = x - target;
    const e = Math.exp(-omega * h);
    const t = v + omega * d;
    return [target + (d + t * h) * e, (v - omega * t * h) * e];
  }

  private frame(now: number) {
    const raw = (now - this.last) / 1000;
    const h = Math.min(0.05, raw);
    this.last = now;
    this.t += h;
    this.intro = Math.min(1, this.intro + h / 1.5);
    [this.S, this.vS] = this.spring(this.S, this.vS, this.target, 9, h);
    [this.mx, this.vx] = this.spring(this.mx, this.vx, this.tx, 3.2, h);
    [this.my, this.vy] = this.spring(this.my, this.vy, this.ty, 3.2, h);

    if (raw > 0 && raw < 0.25 && this.intro >= 1) {
      this.ftSum += raw;
      if (++this.ftN >= 60) {
        const avg = this.ftSum / this.ftN;
        this.ftSum = 0;
        this.ftN = 0;
        if (avg > 1 / 45 && this.dprCap > 0.9) {
          this.dprCap = Math.max(0.9, this.dprCap - 0.35);
          this.resize();
        }
      }
    }

    this.walk(h);
    this.draw();
  }

  /** People: forever around the loop while the illusion holds, then real people on a real stair. */
  private walk(h: number) {
    const S = this.S;
    const closed = S < 0.6;
    const bridged = S > 2.62;
    const order = Array.from(this.figS.keys()).sort((a, b) => this.figS[b] - this.figS[a]);
    const lanes = [Infinity, Infinity, Infinity];
    const ranks = [0, 0, 0];
    const gathered = easeInOut(range(S, 0.95, 1.7));
    order.forEach((i) => {
      let s = this.figS[i] + this.figV[i] * h;
      if (closed) {
        if (s >= LOOP) s -= LOOP;
      } else if (bridged) {
        if (s >= TOP - 0.01) s -= TOP - 0.01;
      } else {
        const lane = i % 3;
        const place = LOOP - 1.02 - ranks[lane]++ * 0.56;
        this.figQ[i] = place;
        const limit = Math.min(LOOP - 1.02, lanes[lane] - 0.56);
        if (gathered >= 1) s = s + (place - s) * (1 - Math.exp(-h * 6));
        else if (s > limit) s = limit;
        lanes[lane] = s;
      }
      this.figS[i] = s;
    });

    const settle = easeInOut(range(S, 3.25, 3.92));
    for (let i = 0; i < FIG_COUNT; i++) {
      let s = this.figS[i];
      if (gathered > 0 && gathered < 1 && !closed && !bridged) s = lerp(s, this.figQ[i], gathered);
      if (settle > 0) {
        const even = ((i / FIG_COUNT) * TOP + this.t * 0.68) % (TOP - 0.05);
        s = lerp(s, even, settle);
      }
      const k = Math.min(TILES.length - 2, Math.floor(s));
      const f = s - k;
      const a = TILES[k];
      const b = TILES[closed && k + 1 >= LOOP ? 0 : k + 1];
      const wrapped = closed && k + 1 >= LOOP;
      const x = wrapped ? a.x + (b.x + RING - a.x) * f : lerp(a.x, b.x, f);
      const z2 = wrapped ? a.z + (b.z + RING - a.z) * f : lerp(a.z, b.z, f);
      const y = (closed && k + 1 >= LOOP ? a.y + (b.y + LOOP * RISE - a.y) * clamp((f - 0.3) / 0.45) : lerp(a.y, b.y, clamp((f - 0.3) / 0.45))) + Math.sin(f * Math.PI) * 0.07;
      // walk to one side or the other of the centre line
      const nx = -a.oz;
      const nz = a.ox;
      const lane = this.figLane[i] * (WIDTH / 2 - 0.18);
      const fadeTop = 1 - range(s, TOP - 2.4, TOP - 0.4);
      const grow = (!closed && s < 1.2 ? clamp(s / 1.2) : 1) * fadeTop;
      this.figData[i * 4] = x + nx * lane;
      this.figData[i * 4 + 1] = y;
      this.figData[i * 4 + 2] = z2 + nz * lane;
      this.figData[i * 4 + 3] = 1.2 * grow * (this.intro > 0.45 ? easeInOut(range(this.intro, 0.45, 1)) : 0);
    }
  }

  private draw() {
    if (this.disposed) return;
    const gl = this.gl;
    const S = this.S;
    const small = this.small;
    const aspect = this.W / this.H;

    /* ---- the view ---- */
    // Held perfectly true while the words say it's connected, then one move, whole object in frame.
    const yaw = key(S, [[0, ISO_YAW], [0.6, ISO_YAW], [1.05, OPEN_YAW], [1.9, -0.34], [2.9, -0.5], [3.96, ISO_YAW]]);
    const pitch = key(S, [[0, ISO_PITCH], [0.6, ISO_PITCH], [1.05, OPEN_PITCH], [1.9, 0.62], [2.9, 0.66], [3.96, ISO_PITCH]]);
    let base = small ? 15.5 : 10;
    let open = base * 1.2;
    let fitY = 0.52;
    let regionX = 0.47;
    let endY = -0.07;
    if (this.fit) {
      const f = this.fit;
      if (small) {
        const fitTo = (b: Box) => Math.max(b.h / ((f.bottom - f.top) * 0.98), b.w / (aspect * 0.95)) / 2;
        base = fitTo(ISO_BOX);
        open = fitTo(OPEN_BOX);
        fitY = 1 - (f.top + f.bottom);
        endY = 1 - 2 * Math.max(f.bottom, f.bottomEnd) + ISO_BOX.h / (2 * base);
      } else {
        const room = 0.985 - f.left;
        const fitTo = (b: Box) => b.w / (2 * aspect * room);
        base = Math.max(ISO_BOX.h / (2 * 0.68), fitTo(ISO_BOX));
        open = Math.max(OPEN_BOX.h / (2 * 0.78), fitTo(OPEN_BOX));
        regionX = f.left + 0.985 - 1;
      }
    }
    const zoom = key(S, [[0, base], [0.6, base * (small ? 0.99 : 0.93)], [1.05, open], [1.9, base * 0.36], [2.9, base * 0.42], [3.96, base]]);
    const gap = TILES[LOOP];
    const tx = key(S, [[0, ISO_BOX.x], [0.6, ISO_BOX.x], [1.05, OPEN_BOX.x], [1.9, gap.x], [2.9, gap.x - 1], [3.96, ISO_BOX.x]]);
    const ty = key(S, [[0, ISO_BOX.y], [0.6, ISO_BOX.y], [1.05, OPEN_BOX.y], [1.9, gap.y], [2.9, gap.y + 0.2], [3.96, ISO_BOX.y]]);
    const tz = key(S, [[0, ISO_BOX.z], [0.6, ISO_BOX.z], [1.05, OPEN_BOX.z], [1.9, gap.z], [2.9, gap.z], [3.96, ISO_BOX.z]]);
    const upper = easeInOut(range(S, 1.2, 1.8));
    const cp = Math.cos(pitch);


    const dist = 60;
    const eye = [tx + Math.sin(yaw) * cp * dist, ty + Math.sin(pitch) * dist, tz + Math.cos(yaw) * cp * dist];
    const close = key(S, [[0, 0], [1.15, 0], [1.5, 1], [3.45, 1], [3.85, 0]]);
    const end = easeInOut(range(S, 3.3, 3.92));
    const floorA = key(S, [[0, 1], [1.12, 1], [1.45, 0], [3.35, 0], [3.8, 1]]);
    const closeUp = key(S, [[0, 0], [1.1, 0], [1.6, 1], [3.1, 1], [3.6, 0]]);
    const shiftX = small ? 0 : regionX;
    const shiftY = small ? lerp(lerp(fitY, 0.52, close), endY, end) : lerp(0.13, endY, end);
    ortho(this.Proj, zoom, aspect, 1, 140, shiftX, shiftY);
    look(this.View, eye, [tx, ty, tz]);
    mul(this.VP, this.Proj, this.View);

    /* ---- the sun ---- */
    const az = key(S, [[0, 1.2], [0.6, 1.2], [1.05, 0.9], [1.9, 0.1], [2.9, -0.2], [3.96, 1.2]]) + this.mx * 0.42;
    const el = key(S, [[0, 0.8], [0.95, 0.72], [1.9, 0.74], [2.9, 0.78], [3.96, 0.8]]) - this.my * 0.12;
    const sun = [Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)];
    const c = [CENTRE.x + RING / 2, CENTRE.y + RING / 2, CENTRE.z + RING / 2];
    const LE = [c[0] + sun[0] * 50, c[1] + sun[1] * 50, c[2] + sun[2] * 50];
    ortho(this.LP, SHADOW_SPAN, 1, 1, 120, 0, 0);
    look(this.LV, LE, c);
    mul(this.Light, this.LP, this.LV);

    // The floor gets its own, higher sun: straight under the object the shadow draws the true plan.
    const fAz = ISO_YAW + this.mx * 0.5;
    const fEl = 1.27 - this.my * 0.1;
    const floorSun = [Math.sin(fAz) * Math.cos(fEl), Math.sin(fEl), Math.cos(fAz) * Math.cos(fEl)];

    const build = easeInOut(range(S, 2.2, 2.62));

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);

    const tileUniforms = (u: Prog['u']) => {
      gl.uniform1f(u.uBuild, build);
      gl.uniform1f(u.uIntro, smooth(this.intro));
      gl.uniform1f(u.uLoop, LOOP);
      gl.uniform1f(u.uUpper, upper);
    };

    /* ---- shadow depth ---- */
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.shadowFb);
    gl.viewport(0, 0, this.shadowSize, this.shadowSize);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    const d = this.P_.depth;
    gl.useProgram(d.p);
    gl.uniformMatrix4fv(d.u.uVP, false, this.Light);
    tileUniforms(d.u);
    gl.bindVertexArray(this.vao);
    gl.drawElements(gl.TRIANGLES, this.tileCount, gl.UNSIGNED_INT, 0);
    const fd = this.P_.figDepth;
    gl.useProgram(fd.p);
    gl.uniformMatrix4fv(fd.u.uVP, false, this.Light);
    gl.bindVertexArray(this.figVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.figBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.figData);
    gl.drawElementsInstanced(gl.TRIANGLES, this.figCount, gl.UNSIGNED_SHORT, 0, FIG_COUNT);

    /* ---- the shadow on the page ---- */
    if (floorA > 0) {
    gl.disable(gl.DEPTH_TEST);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.flat[0].fb);
    gl.viewport(0, 0, FLAT, FLAT);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const fl = this.P_.flat;
    gl.useProgram(fl.p);
    tileUniforms(fl.u);
    gl.uniform3f(fl.u.uSun, floorSun[0], floorSun[1], floorSun[2]);
    gl.uniform1f(fl.u.uFloor, FLOOR);
    gl.uniform1f(fl.u.uSpan, SHADOW_SPAN);
    gl.bindVertexArray(this.vao);
    gl.drawElements(gl.TRIANGLES, this.tileCount, gl.UNSIGNED_INT, 0);
    const bl = this.P_.blur;
    gl.useProgram(bl.p);
    gl.bindVertexArray(this.emptyVao);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(bl.u.uT, 0);
    for (const step of [0.7, 0.35]) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.flat[1].fb);
      gl.bindTexture(gl.TEXTURE_2D, this.flat[0].tex);
      gl.uniform2f(bl.u.uStep, step / FLAT, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.flat[0].fb);
      gl.bindTexture(gl.TEXTURE_2D, this.flat[1].tex);
      gl.uniform2f(bl.u.uStep, 0, step / FLAT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    }

    /* ---- the picture ---- */
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.W, this.H);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const fp = this.P_.floor;
    gl.useProgram(fp.p);
    gl.bindVertexArray(this.emptyVao);
    gl.bindTexture(gl.TEXTURE_2D, this.flat[0].tex);
    gl.uniform1i(fp.u.uT, 0);
    gl.uniformMatrix4fv(fp.u.uVP, false, this.VP);
    gl.uniform1f(fp.u.uFloor, FLOOR);
    gl.uniform1f(fp.u.uSpan, SHADOW_SPAN);
    gl.uniform1f(fp.u.uA, (this.dark ? 0.62 : 0.27) * smooth(this.intro) * floorA);
    gl.uniform1f(fp.u.uDark, this.dark);
    gl.uniform2f(fp.u.uC, ((CENTRE.x + 3 + SHADOW_SPAN) / (2 * SHADOW_SPAN)), ((CENTRE.z + 3 + SHADOW_SPAN) / (2 * SHADOW_SPAN)));
    gl.uniform1f(fp.u.uClip, small ? 1 - (this.fit?.bottom ?? 0.5) - 0.01 : -1);
    gl.uniform1f(fp.u.uH, this.H);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.disable(gl.BLEND);

    gl.enable(gl.DEPTH_TEST);
    const st = this.P_.stone;
    gl.useProgram(st.p);
    gl.uniformMatrix4fv(st.u.uVP, false, this.VP);
    gl.uniformMatrix4fv(st.u.uLight, false, this.Light);
    tileUniforms(st.u);
    gl.uniform3f(st.u.uSun, sun[0], sun[1], sun[2]);
    const toEye = [Math.sin(yaw) * cp, Math.sin(pitch), Math.cos(yaw) * cp];
    gl.uniform3f(st.u.uEye, toEye[0], toEye[1], toEye[2]);
    gl.uniform1f(st.u.uDark, this.dark);
    gl.uniform1f(st.u.uTime, this.t);
    gl.uniform1f(st.u.uRelease, build);
    gl.uniform1f(st.u.uTexel, 1 / this.shadowSize);
    const wideCut = this.fit ? this.fit.left - 0.07 : 0.3;
    const cutAt = small ? 1 - (this.fit?.cut ?? 0.5) : wideCut;
    const topAt = 1 - (this.fit?.top ?? 0.08);
    const topK = key(S, [[0, 0], [2.7, 0], [3.1, 1], [9, 1]]);
    gl.uniform3f(st.u.uTop, topAt - 0.09, topAt, topK);
    gl.uniform3f(st.u.uCut, cutAt, cutAt + (small ? 0.13 : 0.2), close);
    gl.uniform2f(st.u.uRes, this.W, this.H);
    gl.uniform1f(st.u.uVert, small ? 1 : 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.shadowTex);
    gl.uniform1i(st.u.uShadow, 1);
    gl.bindVertexArray(this.vao);
    gl.drawElements(gl.TRIANGLES, this.tileCount, gl.UNSIGNED_INT, 0);

    const fg = this.P_.fig;
    gl.useProgram(fg.p);
    gl.uniformMatrix4fv(fg.u.uVP, false, this.VP);
    gl.uniform3f(fg.u.uSun, sun[0], sun[1], sun[2]);
    gl.uniform3f(fg.u.uEye, toEye[0], toEye[1], toEye[2]);
    gl.uniform1f(fg.u.uDark, this.dark);
    gl.uniform3f(fg.u.uTop, topAt - 0.09, topAt, topK);
    gl.uniform3f(fg.u.uCut, cutAt, cutAt + (small ? 0.13 : 0.2), close);
    gl.uniform2f(fg.u.uRes, this.W, this.H);
    gl.uniform1f(fg.u.uVert, small ? 1 : 0);
    gl.bindVertexArray(this.figVao);
    gl.drawElementsInstanced(gl.TRIANGLES, this.figCount, gl.UNSIGNED_SHORT, 0, FIG_COUNT);

    /* ---- the river ---- */
    const release = easeInOut(range(S, 2.42, 3.2));
    const px = this.H / Math.max(1, this.canvas.clientHeight);
    const trapped = Math.min(smooth(this.intro) * (LOOP + 4) - 1.2, key(S, [[0.52, LOOP + 3], [0.68, LOOP - 1.75]]));
    const trappedHead = lerp(trapped, TOP + 3, release);
    gl.enable(gl.BLEND);
    if (this.dark) gl.blendFunc(gl.ONE, gl.ONE);
    else gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);
    const rb = this.P_.river;
    gl.useProgram(rb.p);
    gl.uniformMatrix4fv(rb.u.uVP, false, this.VP);
    gl.uniform2f(rb.u.uPx, 2 / this.W, 2 / this.H);
    gl.uniform1f(rb.u.uT, this.t);
    gl.uniform1f(rb.u.uHead, trappedHead);
    gl.uniform1f(rb.u.uShare, lerp(this.dark ? 0.62 : 0.3, 1, release));
    gl.uniform1f(rb.u.uPower, lerp(0.95, 1.5, release) * (1 + 0.5 * closeUp));
    gl.uniform1f(rb.u.uTail, lerp(0.13, 0.3, release));
    gl.uniform1f(rb.u.uDark, this.dark);
    gl.uniform3f(rb.u.uCut, cutAt, cutAt + (small ? 0.13 : 0.2), close);
    gl.uniform3f(rb.u.uTop, topAt - 0.09, topAt, topK);
    gl.uniform2f(rb.u.uRes, this.W, this.H);
    gl.uniform1f(rb.u.uVert, small ? 1 : 0);
    gl.bindVertexArray(this.ribVao);
    const widen = 1 + closeUp * 1.4;
    gl.uniform1f(rb.u.uCore, 0);
    gl.uniform1f(rb.u.uW, 9 * px * widen);
    if (this.dark) gl.drawElements(gl.TRIANGLES, this.ribCount, gl.UNSIGNED_INT, 0);
    gl.uniform1f(rb.u.uCore, 1);
    gl.uniform1f(rb.u.uW, 0.8 * px * widen);
    gl.drawElements(gl.TRIANGLES, this.ribCount, gl.UNSIGNED_INT, 0);
    gl.depthMask(true);

    /* ---- what gathers at the edge ---- */
    const gapGlow = key(S, [[0.62, 0], [1.05, 0.5], [1.7, 0.85], [2.3, 1], [2.56, 2.4], [3.05, 0.5], [3.96, 0.3]]);
    if (this.dark && gapGlow > 0.002) {
      const clip = [this.VP[0] * gap.x + this.VP[4] * gap.y + this.VP[8] * gap.z + this.VP[12], this.VP[1] * gap.x + this.VP[5] * gap.y + this.VP[9] * gap.z + this.VP[13]];
      const gl2 = this.P_.glow;
      gl.disable(gl.DEPTH_TEST);
      gl.useProgram(gl2.p);
      gl.bindVertexArray(this.emptyVao);
      gl.uniform4f(gl2.u.uBox, clip[0], clip[1], 4.6 / (zoom * aspect), 4.6 / zoom);
      gl.uniform1f(gl2.u.uA, gapGlow * smooth(this.intro));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.enable(gl.DEPTH_TEST);
    }
    gl.disable(gl.BLEND);
    gl.bindVertexArray(null);
    gl.activeTexture(gl.TEXTURE0);

    // where the missing step is on screen
    const vw = this.canvas.clientWidth;
    const vh = this.canvas.clientHeight;
    const v = this.VP;
    const ex = gap.x;
    const ey = gap.y;
    const ez = gap.z;
    const w = v[3] * ex + v[7] * ey + v[11] * ez + v[15];
    this.onFrame?.(S, (((v[0] * ex + v[4] * ey + v[8] * ez + v[12]) / w) * 0.5 + 0.5) * vw, (0.5 - ((v[1] * ex + v[5] * ey + v[9] * ez + v[13]) / w) * 0.5) * vh);
  }
}

function smooth(x: number) {
  const k = clamp(x);
  return k * k * (3 - 2 * k);
}
