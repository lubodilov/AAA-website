import { CSSProperties } from 'react';

/**
 * Eight small working diagrams, one for each thing we build. Pure CSS/SVG,
 * transforms and opacity only, paused whenever they are off screen.
 */
const delay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

function Platform() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {[46, 62, 38].map((w, i) => (
        <div key={i} className="cap-row flex items-center gap-3 rounded-xl bg-white/[0.05] px-3.5 py-3" style={delay(i * 1.6)}>
          <span className="h-2 w-2 shrink-0 rounded-full bg-signal" />
          <span className="h-1.5 rounded bg-white/50" style={{ width: `${w}%` }} />
          <span className="ml-auto h-5 w-12 shrink-0 rounded-md bg-signal/80" />
        </div>
      ))}
    </div>
  );
}

function Agents() {
  const a = 'M24 70 H116 C150 70 150 30 186 30 H296';
  const b = 'M24 70 H116 C150 70 150 110 186 110 H296';
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet">
      <path d={a} stroke="rgba(237,233,227,.2)" strokeWidth="1.5" />
      <path d={b} stroke="rgba(237,233,227,.2)" strokeWidth="1.5" />
      <path d={a} pathLength={100} className="cap-trace" stroke="#ff2b1e" strokeWidth="2.5" strokeLinecap="round" />
      <path d={b} pathLength={100} className="cap-trace" style={delay(1.3)} stroke="#ff2b1e" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="70" r="9" fill="#1b1a18" stroke="rgba(237,233,227,.5)" />
      <rect x="100" y="54" width="32" height="32" rx="9" fill="#ff2b1e" />
      <path d="M116 61 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4z" fill="#0a0908" />
      {[30, 110].map((y) => (
        <g key={y}>
          <circle cx="296" cy={y} r="11" fill="#1b1a18" stroke="rgba(237,233,227,.5)" />
          <path d={`M291 ${y} l3.6 3.6 6.6 -7`} stroke="#ede9e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

function Knowledge() {
  return (
    <div className="grid h-full grid-cols-[1fr_auto_1.2fr] items-center gap-3">
      <div className="space-y-2 rounded-xl bg-white/[0.05] p-3.5">
        {[88, 70, 94, 60, 78].map((w, i) => (
          <span key={i} className={`block h-1.5 rounded ${i === 2 ? 'cap-hl bg-signal' : 'bg-white/25'}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <svg viewBox="0 0 40 20" className="w-9" fill="none">
        <path d="M0 10 H40" pathLength={100} className="cap-trace" stroke="#ff2b1e" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0 10 H40" stroke="rgba(237,233,227,.2)" strokeWidth="1.2" />
      </svg>
      <div className="rounded-2xl rounded-bl-sm bg-bone/90 p-3.5">
        <span className="block h-1.5 w-[90%] rounded bg-ink/70" />
        <span className="mt-2 block h-1.5 w-[64%] rounded bg-ink/70" />
        <span className="cap-hl mt-3 inline-block h-3.5 w-11 rounded-full bg-signal" />
      </div>
    </div>
  );
}

function Voice() {
  return (
    <div className="flex h-full items-center justify-center gap-[5px]">
      {Array.from({ length: 34 }).map((_, i) => (
        <span
          key={i}
          className={`cap-wave w-[3px] rounded-full ${i > 11 && i < 22 ? 'bg-signal' : 'bg-white/35'}`}
          style={{ height: `${26 + ((i * 37) % 60)}%`, animationDelay: `${((i * 73) % 900) / 1000}s` }}
        />
      ))}
    </div>
  );
}

function Docs() {
  return (
    <div className="grid h-full grid-cols-[1fr_1fr] items-center gap-4">
      <div className="relative overflow-hidden rounded-lg bg-bone/90 p-3.5">
        <div className="space-y-2">
          {[70, 92, 84, 96, 60, 88, 74].map((w, i) => (
            <span key={i} className="block h-1 rounded bg-ink/40" style={{ width: `${w}%` }} />
          ))}
        </div>
        <span className="cap-scan absolute inset-x-0 top-0 h-7 bg-gradient-to-b from-transparent to-signal/50" />
      </div>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="cap-field flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2.5" style={delay(i * 0.9)}>
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="h-1.5 flex-1 rounded bg-white/45" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Data() {
  const spots = [[-46, -30], [38, 22], [-12, 40], [52, -38], [-58, 18], [20, -44], [-30, 46], [60, 30], [-8, -48], [44, -8], [-52, -6], [10, 34]];
  return (
    <div className="grid h-full place-items-center">
      <div className="grid grid-cols-6 gap-3">
        {spots.map(([x, y], i) => (
          <span
            key={i}
            className={`cap-sort block h-3.5 w-3.5 rounded ${i % 5 === 0 ? 'bg-signal' : 'bg-white/45'}`}
            style={{ ['--x' as string]: `${x}px`, ['--y' as string]: `${y}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function Pipeline() {
  return (
    <div className="relative grid h-full grid-cols-3 gap-2.5">
      {[0, 1, 2].map((c) => (
        <div key={c} className="space-y-2 rounded-xl bg-white/[0.04] p-2.5">
          <span className="block h-1 w-1/2 rounded bg-white/30" />
          {Array.from({ length: 3 - c }).map((_, i) => (
            <span key={i} className="block h-7 rounded-md bg-white/[0.08]" />
          ))}
        </div>
      ))}
      <span className="cap-move absolute left-[10px] top-[26px] h-7 w-[calc((100%-20px)/3-20px)] rounded-md bg-signal" />
    </div>
  );
}

function Report() {
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet">
      {[30, 70, 110].map((y) => (
        <path key={y} d={`M8 ${y} H312`} stroke="rgba(237,233,227,.1)" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={14 + i * 38} y={118 - (i + 2) * 8} width="20" height={(i + 2) * 8} rx="3" fill="rgba(237,233,227,.1)" />
      ))}
      <path d="M12 106 C60 100 72 84 110 82 S170 56 214 50 S280 22 308 16" pathLength={100} className="cap-draw" stroke="#ff2b1e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const CAP_VISUALS = [Platform, Agents, Knowledge, Voice, Docs, Data, Pipeline, Report];
