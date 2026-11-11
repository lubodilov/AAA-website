import { clamp, easeInOut, easeOut, lerp, mulberry32, range } from './env';
import { addFrame } from './scroll';
import type { Content } from '../content/site';

/**
 * The company as a living map. Every block is a real thing a buyer recognises:
 * an inbox, a CRM, an account lead, an approval. Its state is a pure function of
 * the scroll position P (0..6, one unit per stage), eased so it always glides,
 * and scrolling back plays the whole story in reverse.
 *
 * Drawn the way the hero is lit: black glass with a lit edge, one weight of line,
 * and red only where something is wrong or has just been built.
 */

/** One family of icons: a 24 unit grid, one line weight. */
const ICONS = {
  inbox: 'M3 13h5l1.5 3h5L16 13h5M3 13l3-8h12l3 8v6H3z',
  card: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM9 9.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM6 16.5c.5-1.4 1.7-2.1 3-2.1s2.5.7 3 2.1M15 10h3M15 14h3',
  doc: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6',
  sheet: 'M4 5h16v14H4zM4 10h16M4 15h16M10 5v14',
  db: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  cal: 'M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1zM4 10h16M8 3v4M16 3v4',
  invoice: 'M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21zM9 8h6M9 12h6',
  stamp: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 12.2l2.4 2.4 4.6-5',
  chart: 'M4 20h16M7 20v-6M12 20V8M17 20V10',
  chat: 'M4 5h16v11H9l-5 4zM8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01',
  phone: 'M6.5 3.5l3 .6 1.2 3.8-2 1.6c1 2.2 2.8 4 5 5l1.6-2 3.8 1.2.6 3c0 1.2-1 2.1-2.2 2C10.6 18.3 5.7 13.4 4.5 5.7c-.1-1.2.8-2.2 2-2.2z',
  book: 'M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2zM12 6.5v14',
  key: 'M19.5 8.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM11.6 11.9L4 19.5M6.5 17l2.5 2.5M4 19.5l1.8 1.8',
  folder: 'M3 7a1 1 0 0 1 1-1h5l2 2.5h9a1 1 0 0 1 1 1V19H3z',
  cap: 'M2.5 9.5L12 5l9.5 4.5L12 14zM6.5 11.5V16c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4v-4.5M21.5 9.5V15',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1-3.8 4-5.7 7.5-5.7s6.5 1.9 7.5 5.7',
  spark: 'M12 2.5c.9 5.6 3.9 8.6 9.5 9.5-5.6.9-8.6 3.9-9.5 9.5-.9-5.6-3.9-8.6-9.5-9.5 5.6-.9 8.6-3.9 9.5-9.5z',
  gear: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1',
  shield: 'M12 3l7.5 2.6v6c0 4.6-3 7.7-7.5 9.4-4.5-1.7-7.5-4.8-7.5-9.4v-6z',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8',
} as const;
export type IconName = keyof typeof ICONS;

type Item = {
  icon: IconName;
  label: string;
  tip: string;
  person?: boolean;
  bottleneck?: number;
  quote?: string;
};

export type GraphCopy = Content['graph'];

type Node = {
  kind: 'hub' | 'item' | 'core' | 'outer';
  cluster: number;
  mx: number;
  my: number;
  cx: number;
  cy: number;
  seed: number;
  item?: Item;
  personIndex?: number;
  outerIndex?: number;
};
type Edge = { a: number; b: number; kind: 'intra' | 'ring' | 'core' | 'outer'; order: number };

export type GraphTip = { x: number; y: number; title: string; text: string; hot: boolean };

const C = {
  bone: '237,233,227',
  ash: '142,138,132',
  signal: '255,43,30',
  hot: '255,84,64',
};
const INK = '#0a0908';
const GLASS = '#131110';
const SANS = '"Inter Tight", sans-serif';
const rgba = (c: string, a: number) => `rgba(${c},${clamp(a, 0, 1).toFixed(3)})`;

function glowSprite(color: string) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${color},0.6)`);
  grad.addColorStop(0.4, `rgba(${color},0.14)`);
  grad.addColorStop(1, `rgba(${color},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export class OrgGraph {
  private copy: GraphCopy;
  private depts: { name: string; items: Item[] }[];
  private outerItems: { icon: IconName; label: string }[];
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private nodes: Node[] = [];
  private edges: Edge[] = [];
  private Pt = 0;
  private P = 0;
  private w = 1;
  private h = 1;
  private dpr = 1;
  private off: (() => void) | null = null;
  private Pv = 0;
  private running = false;
  private t0 = performance.now();
  private last = 0;
  private persons = 0;
  private reduced: boolean;
  private paths = Object.fromEntries(Object.entries(ICONS).map(([k, d]) => [k, new Path2D(d)])) as Record<IconName, Path2D>;
  private glowRed = glowSprite(C.signal);
  private xy: (readonly [number, number])[] = [];
  onFrame?: (P: number) => void;

  constructor(canvas: HTMLCanvasElement, reduced: boolean, copy: GraphCopy) {
    this.copy = copy;
    this.depts = copy.depts.map((d) => ({ name: d.name, items: d.items as Item[] }));
    this.outerItems = copy.next as { icon: IconName; label: string }[];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.reduced = reduced;
    this.build();
    // Icons are vectors now, but the labels and numbers still wait for the font.
    document.fonts?.ready.then(() => this.paint());
  }

  private build() {
    const rnd = mulberry32(11);
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const hubs: number[] = [];
    const R = 0.62;
    let person = 0;
    let order = 0;

    // Before anyone has mapped it the company is scattered, but nothing sits on top of anything else.
    const taken: [number, number][] = [];
    const place = () => {
      let best: [number, number] = [0, 0];
      let far = -1;
      for (let tries = 0; tries < 80; tries++) {
        const c: [number, number] = [(rnd() * 2 - 1) * 1.02, (rnd() * 2 - 1) * 0.84];
        const d = taken.reduce((m, q) => Math.min(m, Math.hypot(c[0] - q[0], c[1] - q[1])), 9);
        if (d > far) {
          far = d;
          best = c;
        }
        if (d > 0.34) break;
      }
      taken.push(best);
      return best;
    };

    this.depts.forEach((d, c) => {
      const ang = -Math.PI / 2 + (c / this.depts.length) * Math.PI * 2;
      const hx = Math.cos(ang) * R;
      const hy = Math.sin(ang) * R * 0.9;
      const hub = nodes.length;
      hubs.push(hub);
      nodes.push({ kind: 'hub', cluster: c, mx: hx, my: hy, cx: hx, cy: hy, seed: rnd() });
      d.items.forEach((item, k) => {
        const a = ang + Math.PI / 4 + (k * Math.PI) / 2;
        const rr = 0.232;
        const [cx, cy] = place();
        const n: Node = {
          kind: 'item',
          cluster: c,
          mx: hx + Math.cos(a) * rr,
          my: hy + Math.sin(a) * rr * 0.96,
          cx,
          cy,
          seed: rnd(),
          item,
        };
        if (item.person) n.personIndex = person++;
        const idx = nodes.length;
        nodes.push(n);
        edges.push({ a: hub, b: idx, kind: 'intra', order: order++ });
      });
    });
    this.persons = person;

    for (let c = 0; c < this.depts.length; c++) {
      edges.push({ a: hubs[c], b: hubs[(c + 1) % this.depts.length], kind: 'ring', order: order++ });
    }

    const core = nodes.length;
    nodes.push({ kind: 'core', cluster: -1, mx: 0, my: 0, cx: 0, cy: 0, seed: 0.5 });
    hubs.forEach((h) => edges.push({ a: core, b: h, kind: 'core', order: order++ }));
    nodes.forEach((n, i) => {
      if (n.item?.bottleneck !== undefined) edges.push({ a: core, b: i, kind: 'core', order: order++ });
    });

    this.outerItems.forEach((_, i) => {
      const ang = -Math.PI / 2 + ((i + 0.5) / this.outerItems.length) * Math.PI * 2;
      const idx = nodes.length;
      nodes.push({
        kind: 'outer',
        cluster: -1,
        mx: Math.cos(ang) * 1.14,
        my: Math.sin(ang) * 1.0,
        cx: 0,
        cy: 0,
        seed: rnd(),
        outerIndex: i,
      });
      const nearest = Math.round(((i + 0.5) / this.outerItems.length) * this.depts.length) % this.depts.length;
      edges.push({ a: hubs[nearest], b: idx, kind: 'outer', order: order++ });
    });

    this.nodes = nodes;
    this.edges = edges;
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, r.width);
    this.h = Math.max(1, r.height);
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.paint();
  }

  setProgress(P: number) {
    this.Pt = P;
    if (this.reduced) this.P = P;
    if (!this.running) this.paint();
  }

  start() {
    if (this.running || this.reduced) {
      this.paint();
      return;
    }
    this.running = true;
    this.last = performance.now();
    this.off = addFrame((now) => {
      const h = Math.max(1, Math.min(64, now - this.last)) / 1000;
      this.last = now;
      // critically damped: stages ease in and out without sudden speed changes
      const omega = 13;
      const d = this.P - this.Pt;
      const t = (this.Pv + omega * d) * h;
      const e = Math.exp(-omega * h);
      this.P = this.Pt + (d + t) * e;
      this.Pv = (this.Pv - omega * t) * e;
      this.draw(now);
    });
  }

  stop() {
    this.running = false;
    this.off?.();
    this.off = null;
  }

  private paint() {
    this.draw(performance.now());
  }

  private get narrow() {
    return this.w < 560;
  }
  private scaleBase() {
    return Math.min(this.w * (this.narrow ? 0.4 : 0.455), this.h * (this.narrow ? 0.44 : 0.51));
  }
  private get tile() {
    return this.narrow ? 26 : Math.max(36, Math.min(44, this.scaleBase() * 0.12));
  }
  /** The map sits a little high, leaving the bottom of the figure to the legend. */
  private get lift() {
    return this.narrow ? 26 : 28;
  }

  private pos(n: Node, m: number, t: number, zoom: number) {
    const drift = 1 - m;
    const dx = Math.sin(t * 0.35 + n.seed * 20) * 0.03 * drift;
    const dy = Math.cos(t * 0.3 + n.seed * 31) * 0.03 * drift;
    const x = n.kind === 'item' ? lerp(n.cx + dx, n.mx, m) : n.mx;
    const y = n.kind === 'item' ? lerp(n.cy + dy, n.my, m) : n.my;
    const s = this.scaleBase() * zoom;
    return [this.w / 2 + x * s, this.h / 2 - this.lift + y * s] as const;
  }

  private glow(x: number, y: number, r: number, a: number) {
    if (a <= 0.003) return;
    const ctx = this.ctx;
    ctx.globalAlpha = clamp(a);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(this.glowRed, x - r, y - r, r * 2, r * 2);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  private icon(name: IconName, x: number, y: number, size: number, a: number, color = C.bone) {
    if (a <= 0.003) return;
    const ctx = this.ctx;
    const k = size / 24;
    ctx.save();
    ctx.translate(x - size / 2, y - size / 2);
    ctx.scale(k, k);
    ctx.globalAlpha = clamp(a);
    if (name === 'spark') {
      ctx.fillStyle = `rgb(${color})`;
      ctx.fill(this.paths.spark);
    } else {
      ctx.strokeStyle = `rgb(${color})`;
      ctx.lineWidth = 1.25 / k;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke(this.paths[name]);
    }
    ctx.restore();
  }

  /** Black glass, lit from above. */
  private glass(x: number, y: number, T: number, round: boolean, fill: string, edge: string, a: number, width = 1) {
    const ctx = this.ctx;
    ctx.beginPath();
    if (round) ctx.arc(x, y, T / 2, 0, Math.PI * 2);
    else ctx.roundRect(x - T / 2, y - T / 2, T, T, T * 0.3);
    ctx.fillStyle = fill;
    ctx.fill();
    const g = ctx.createLinearGradient(0, y - T / 2, 0, y + T / 2);
    g.addColorStop(0, rgba(edge, a));
    g.addColorStop(1, rgba(edge, a * 0.32));
    ctx.strokeStyle = g;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  /** Text on a small patch of the background, so a line can pass behind it and never through it. */
  private caption(text: string, x: number, y: number, font: string, color: string) {
    const ctx = this.ctx;
    ctx.font = font;
    const tw = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(10,9,8,0.84)';
    ctx.fillRect(x - tw / 2 - 3, y - 11, tw + 6, 15);
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.textAlign = 'start';
  }

  private curve(ax: number, ay: number, bx: number, by: number, bend: number) {
    return [(ax + bx) / 2 + (by - ay) * bend, (ay + by) / 2 - (bx - ax) * bend] as const;
  }

  private wrap(text: string, font: string, max: number) {
    const ctx = this.ctx;
    ctx.font = font;
    const lines: string[] = [];
    let line = '';
    text.split(' ').forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > max && line) {
        lines.push(line);
        line = word;
      } else line = next;
    });
    if (line) lines.push(line);
    return lines;
  }

  private draw(now: number) {
    const ctx = this.ctx;
    const t = (now - this.t0) / 1000;
    const P = this.P;
    const { w, h, narrow } = this;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const appear = easeOut(range(P, 0.02, 0.55));
    const consult = 1 - range(P, 0.85, 1.25);
    const m = easeInOut(range(P, 1.05, 1.85));
    const scanOn = range(P, 0.98, 1.1) * (1 - range(P, 1.8, 1.95));
    const scanX = lerp(-0.05, 1.05, range(P, 1.0, 1.9));
    const edgesIn = range(P, 1.55, 2.05);
    const deptA = range(P, 1.5, 1.9);
    const diag = easeInOut(range(P, 2.02, 2.45));
    const fix = easeInOut(range(P, 3.02, 3.55));
    const diagOn = diag * (1 - fix);
    const findA = range(P, 2.25, 2.6) * (1 - range(P, 3.0, 3.22));
    const coreA = easeOut(range(P, 3.15, 3.7));
    const coreEdges = range(P, 3.3, 3.95);
    const agentA = range(P, 3.42, 3.8) * (1 - range(P, 4.1, 4.35));
    const enable = range(P, 4.02, 4.85);
    const trainedA = range(P, 4.55, 4.85) * (1 - range(P, 5.05, 5.25));
    const scale = easeInOut(range(P, 5.02, 5.8));
    const zoom = lerp(1, 0.82, scale);
    const flowSpeed = lerp(0.1, 0.34, fix) + scale * 0.14;
    const flowA = (0.22 + 0.78 * range(P, 3.3, 3.8)) * edgesIn;
    const labelA = range(m, 0.55, 1) * appear * (1 - 0.5 * diagOn);

    const T = this.tile;
    const xy = this.nodes.map((n) => this.pos(n, m, t, zoom));
    this.xy = xy;

    this.onFrame?.(P);

    // consult: listening, outward from the middle of the company
    if (consult > 0.01) {
      const S = this.scaleBase() * zoom;
      for (let i = 0; i < 3; i++) {
        const k = (((t * 0.14 + i / 3) % 1) + 1) % 1;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2 - this.lift, k * S * 1.3, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(C.bone, (1 - k) * 0.07 * consult * appear);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // the connections, and the work moving along them
    const edgeDim = lerp(1, 0.3, diagOn);
    this.edges.forEach((e, idx) => {
      let reveal: number;
      let base: number;
      let color = C.bone;
      if (e.kind === 'core') {
        reveal = range(coreEdges, (idx % 8) * 0.05, (idx % 8) * 0.05 + 0.6);
        base = 0.42;
        color = C.hot;
      } else if (e.kind === 'outer') {
        reveal = range(scale, 0.15 + ((idx * 0.618) % 1) * 0.4, 0.55 + ((idx * 0.618) % 1) * 0.4);
        base = 0.16;
      } else {
        reveal = range(edgesIn, (e.order / this.edges.length) * 0.4, (e.order / this.edges.length) * 0.4 + 0.6);
        base = e.kind === 'intra' ? 0.2 : 0.13;
      }
      if (reveal <= 0) return;
      const [ax, ay] = xy[e.a];
      const [bx, by] = xy[e.b];
      const bend = e.kind === 'intra' ? 0.04 : e.kind === 'core' ? 0.08 : 0.14;
      const [cx, cy] = this.curve(ax, ay, bx, by, bend);
      const q = (u: number) => {
        const v = 1 - u;
        return [v * v * ax + 2 * v * u * cx + u * u * bx, v * v * ay + 2 * v * u * cy + u * u * by] as const;
      };
      const touches = this.nodes[e.b].item?.bottleneck !== undefined || this.nodes[e.a].item?.bottleneck !== undefined;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      const steps = 22;
      for (let s = 1; s <= steps; s++) {
        const [px, py] = q((s / steps) * reveal);
        ctx.lineTo(px, py);
      }
      const a = base * (e.kind === 'core' ? 1 : edgeDim) * appear;
      ctx.strokeStyle = touches && diagOn > 0 ? rgba(C.signal, a + diagOn * 0.34) : rgba(color, a);
      ctx.lineWidth = 1;
      ctx.stroke();

      if (reveal >= 1 && flowA > 0.02) {
        const count = e.kind === 'core' ? 2 : 1;
        for (let k = 0; k < count; k++) {
          let ph = (((t * flowSpeed * (0.8 + (idx % 5) * 0.12) + k / count + idx * 0.137) % 1) + 1) % 1;
          let col = e.kind === 'core' ? C.hot : C.bone;
          let pa = flowA * (e.kind === 'core' ? 1 : 0.62);
          if (touches && diagOn > 0) {
            const toward = this.nodes[e.b].item?.bottleneck !== undefined;
            const pile = 1 - Math.pow(1 - ph, 0.2 + 2.6 * (1 - diagOn));
            ph = toward ? lerp(ph, pile * 0.9, diagOn) : lerp(ph, (1 - pile) * 0.9, diagOn);
            col = C.signal;
            pa = Math.max(pa, 0.8 * diagOn);
          }
          // a short streak of light, the same thing that runs around the staircase
          const len = e.kind === 'core' ? 0.2 : 0.15;
          const segs = 6;
          ctx.lineWidth = e.kind === 'core' ? 1.5 : 1.25;
          ctx.lineCap = 'round';
          for (let s = 0; s < segs; s++) {
            const u0 = clamp(ph - (len * (s + 1)) / segs);
            const u1 = clamp(ph - (len * s) / segs);
            if (u1 <= u0) continue;
            const [x0, y0] = q(u0);
            const [x1, y1] = q(u1);
            ctx.strokeStyle = rgba(col, pa * (1 - s / segs));
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
          }
          ctx.lineCap = 'butt';
        }
      }
    });

    // audit: one clean line passes over the company
    if (scanOn > 0.01) {
      const x = scanX * w;
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, rgba(C.hot, 0));
      g.addColorStop(0.5, rgba(C.hot, 0.85 * scanOn));
      g.addColorStop(1, rgba(C.hot, 0));
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, 1, h);
    }

    // the blocks
    this.nodes.forEach((n, i) => {
      const [x, y] = xy[i];

      if (n.kind === 'core') {
        if (coreA <= 0) return;
        const r = (narrow ? 20 : 30) * coreA;
        this.glow(x, y, r * 2.8, 0.3 * coreA);
        this.glass(x, y, r * 2, true, '#120e0d', C.hot, coreA, 1.25);
        this.icon('spark', x, y, r * 1.05, coreA, C.hot);
        this.caption(this.copy.core, x, y + r + (narrow ? 15 : 21), `600 ${narrow ? 10 : 12.5}px ${SANS}`, rgba(C.bone, coreA));
        return;
      }

      if (n.kind === 'hub') {
        if (deptA <= 0) return;
        const name = this.depts[n.cluster].name;
        this.caption(name, x, y + 4, `600 ${narrow ? 9.5 : 12.5}px ${SANS}`, rgba(C.bone, deptA));
        return;
      }

      if (n.kind === 'outer') {
        const a = range(scale, 0.2 + (n.outerIndex! / 8) * 0.5, 0.42 + (n.outerIndex! / 8) * 0.5);
        if (a <= 0) return;
        const ot = T * 0.84;
        ctx.globalAlpha = a;
        this.glass(x, y, ot, false, GLASS, C.bone, 0.26);
        ctx.globalAlpha = 1;
        const next = this.outerItems[n.outerIndex!];
        this.icon(next.icon, x, y, ot * 0.5, a * 0.8);
        if (!narrow) this.caption(next.label, x, y + ot / 2 + 15, `500 11px ${SANS}`, rgba(C.ash, a));
        return;
      }

      const item = n.item!;
      const b = item.bottleneck;
      const isB = b !== undefined;
      const a = appear;
      const lit =
        n.personIndex !== undefined
          ? range(enable, (n.personIndex / this.persons) * 0.72, (n.personIndex / this.persons) * 0.72 + 0.28)
          : 0;

      if (isB && diagOn > 0) {
        this.glow(x, y, T * 1.6, 0.24 * diagOn);
        const ph = ((t * 0.5) % 1 + 1) % 1;
        ctx.beginPath();
        if (item.person) ctx.arc(x, y, T / 2 + ph * T * 0.5, 0, Math.PI * 2);
        else ctx.roundRect(x - T / 2 - ph * T * 0.5, y - T / 2 - ph * T * 0.5, T + ph * T, T + ph * T, T * 0.3 + ph * T * 0.5);
        ctx.strokeStyle = rgba(C.signal, (1 - ph) * 0.4 * diagOn);
        ctx.lineWidth = 1;
        ctx.stroke();

        // the queue: a small, tidy meter of work waiting
        const away = n.mx >= -0.05 ? -1 : 1;
        const rows = narrow ? 6 : 9;
        const bw = narrow ? 8 : 12;
        const bx = x + away * (T / 2 + (narrow ? 6 : 9)) + (away < 0 ? -bw : 0);
        for (let k = 0; k < rows; k++) {
          const show = range(diag, k * 0.07, k * 0.07 + 0.3) * (1 - fix);
          if (show <= 0) continue;
          ctx.fillStyle = rgba(C.signal, show * lerp(0.45, 0.95, k / rows));
          ctx.fillRect(bx, y + T / 2 - 2 - k * (narrow ? 4 : 4.4), bw, narrow ? 2 : 2.4);
        }
      }
      if (isB && fix > 0) this.glow(x, y, T * 1.5, 0.3 * fix);

      if (lit > 0 && lit < 1) {
        ctx.beginPath();
        ctx.arc(x, y, T / 2 + lit * T * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(C.bone, (1 - lit) * 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      let edge = C.bone;
      let edgeA = 0.34 + 0.08 * m;
      if (isB && diagOn > 0) {
        edge = C.signal;
        edgeA = lerp(edgeA, 1, diagOn);
      }
      if (lit > 0) edgeA = lerp(edgeA, 0.95, lit);
      const fill = isB ? `rgb(${Math.round(lerp(19, 224, fix))},${Math.round(lerp(17, 25, fix))},${Math.round(lerp(16, 12, fix))})` : GLASS;
      ctx.globalAlpha = a;
      this.glass(x, y, T, !!item.person, fill, fix > 0 && isB ? C.hot : edge, edgeA, isB && diagOn > 0.05 ? 1.25 : 1);
      ctx.globalAlpha = 1;

      const size = T * 0.5;
      const iconColor = isB && diagOn > 0.4 ? C.hot : C.bone;
      this.icon(item.icon, x, y, size, a * (1 - fix * (isB ? 1 : 0)) * lerp(0.62, 0.92, Math.max(lit, m)), iconColor);
      if (isB && fix > 0) this.icon('spark', x, y, size * 1.1, fix);

      // a number that ties this block to the legend
      if (isB) {
        const na = Math.max(findA, agentA);
        if (na > 0) {
          const nx = x + T * 0.46;
          const ny = y - T * 0.46;
          ctx.globalAlpha = na;
          ctx.beginPath();
          ctx.arc(nx, ny, narrow ? 6.5 : 8, 0, Math.PI * 2);
          ctx.fillStyle = agentA > findA ? '#ede9e3' : '#ff2b1e';
          ctx.fill();
          ctx.fillStyle = agentA > findA ? INK : '#fff';
          ctx.font = `600 ${narrow ? 8.5 : 10}px ${SANS}`;
          ctx.textAlign = 'center';
          ctx.fillText(String(b! + 1), nx, ny + (narrow ? 3 : 3.5));
          ctx.textAlign = 'start';
          ctx.globalAlpha = 1;
        }
      }

      if (lit >= 0.98) {
        const bx = x + T * 0.36;
        const by = y - T * 0.36;
        ctx.beginPath();
        ctx.arc(bx, by, narrow ? 5 : 6.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ede9e3';
        ctx.fill();
        ctx.beginPath();
        const r = narrow ? 2.2 : 2.9;
        ctx.moveTo(bx - r, by);
        ctx.lineTo(bx - r * 0.25, by + r * 0.75);
        ctx.lineTo(bx + r, by - r * 0.7);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      if (!narrow && labelA > 0.02) {
        const strong = (isB && (diagOn > 0.3 || fix > 0.3)) || lit > 0.5;
        this.caption(item.label, x, y + T / 2 + 15, `500 11px ${SANS}`, strong ? rgba(C.bone, 1) : rgba(C.ash, labelA * 1.15));
      }
    });

    // consult: what people tell us, in their own words
    this.nodes.forEach((n, i) => {
      const q = n.item?.quote;
      if (!q) return;
      const k = n.personIndex!;
      const qa = range(P, 0.1 + k * 0.17, 0.28 + k * 0.17) * (1 - range(P, 0.9, 1.1));
      if (qa <= 0) return;
      const [x, y] = xy[i];
      ctx.font = `italic ${narrow ? 14 : 19}px "Instrument Serif", Georgia, serif`;
      const tw = ctx.measureText(q).width;
      const tx = Math.max(6, Math.min(w - tw - 6, x - tw / 2));
      const ty = Math.max(20, y - T / 2 - 12 - (1 - qa) * 6);
      ctx.fillStyle = rgba(C.bone, qa);
      ctx.fillText(q, tx, ty);
    });

    // the legend: what we found, then what we built, always in the same place
    const legend = (rows: { title: string; body?: string }[], alpha: number, solid: boolean) => {
      if (alpha <= 0) return;
      ctx.globalAlpha = alpha;
      const tFont = `500 ${narrow ? 10.5 : 13}px ${SANS}`;
      const bFont = `400 ${narrow ? 9.5 : 11.5}px ${SANS}`;
      if (narrow) {
        rows.forEach((r, i) => {
          const y = h - 42 + i * 15;
          ctx.beginPath();
          ctx.arc(11, y - 3.5, 6, 0, Math.PI * 2);
          ctx.fillStyle = solid ? '#ede9e3' : '#ff2b1e';
          ctx.fill();
          ctx.fillStyle = solid ? INK : '#fff';
          ctx.font = `600 8px ${SANS}`;
          ctx.textAlign = 'center';
          ctx.fillText(String(i + 1), 11, y - 0.6);
          ctx.textAlign = 'start';
          ctx.fillStyle = rgba(C.bone, 1);
          ctx.font = tFont;
          ctx.fillText(r.title, 23, y);
        });
      } else {
        const gap = 18;
        const col = (w - gap * 2) / 3;
        rows.forEach((r, i) => {
          const x = i * (col + gap);
          const y = h - 56;
          ctx.beginPath();
          ctx.arc(x + 8, y - 4.5, 8, 0, Math.PI * 2);
          ctx.fillStyle = solid ? '#ede9e3' : '#ff2b1e';
          ctx.fill();
          ctx.fillStyle = solid ? INK : '#fff';
          ctx.font = `600 10px ${SANS}`;
          ctx.textAlign = 'center';
          ctx.fillText(String(i + 1), x + 8, y - 1);
          ctx.textAlign = 'start';
          ctx.fillStyle = rgba(C.bone, 1);
          let ly = y;
          this.wrap(r.title, tFont, col - 26).slice(0, 2).forEach((l) => {
            ctx.font = tFont;
            ctx.fillText(l, x + 24, ly);
            ly += 17;
          });
          if (r.body) {
            ctx.fillStyle = rgba(C.ash, 1);
            this.wrap(r.body, bFont, col - 26).slice(0, 2).forEach((l) => {
              ctx.font = bFont;
              ctx.fillText(l, x + 24, ly);
              ly += 15;
            });
          }
        });
      }
      ctx.globalAlpha = 1;
    };
    legend(this.copy.findings.map((title) => ({ title })), findA, false);
    legend(this.copy.agents.map((g) => ({ title: g.name, body: g.job })), agentA, true);

    if (trainedA > 0) {
      ctx.font = `500 ${narrow ? 10 : 12.5}px ${SANS}`;
      ctx.textAlign = 'center';
      ctx.fillStyle = rgba(C.bone, trainedA);
      ctx.fillText(this.copy.trained, w / 2, h - 30);
      ctx.textAlign = 'start';
    }
  }

  /** What is under the pointer, in plain language. */
  hit(mx: number, my: number): GraphTip | null {
    const P = this.P;
    if (P < 0.3 || !this.xy.length) return null;
    const T = this.tile;
    const fix = easeInOut(range(P, 3.02, 3.55));
    const diag = easeInOut(range(P, 2.02, 2.45)) * (1 - fix);
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (n.kind !== 'item') continue;
      const [x, y] = this.xy[i];
      if (Math.abs(mx - x) > T * 0.62 || Math.abs(my - y) > T * 0.62) continue;
      const item = n.item!;
      const b = item.bottleneck;
      if (b !== undefined && fix > 0.5) return { x, y: y - T / 2, title: this.copy.agents[b].name, text: this.copy.agents[b].job, hot: true };
      if (b !== undefined && diag > 0.5) return { x, y: y - T / 2, title: item.label, text: this.copy.findings[b], hot: true };
      return { x, y: y - T / 2, title: item.label, text: item.tip, hot: false };
    }
    return null;
  }
}
