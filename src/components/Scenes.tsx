import { CSSProperties, ReactNode } from 'react';
import { CountUp } from './CountUp';
import { useT } from '../content';

/**
 * Three moments every owner recognises, shown as the software they actually
 * happen in. Illustrative data, but nothing here is a metaphor.
 */

const k = (n: number) => ({ ['--k' as string]: n }) as CSSProperties;
const bar = (v: number, from: number, delay = 0.7) =>
  ({ ['--v' as string]: v, ['--from' as string]: from, ['--bd' as string]: `${delay}s` }) as CSSProperties;

export function LicencesScene() {
  const s = useT().scenes.tools;
  return (
    <div className="cv w-full overflow-hidden rounded-[6px] bg-[#f4f2ee] text-[#191715]">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
        <div>
          <div className="text-[16px] font-semibold tracking-[-0.015em]">{s.title}</div>
          <div className="mt-0.5 text-[12.5px] text-black/60">{s.sub}</div>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-black/[0.06] px-3 py-1 text-[12px] text-black/60">{s.range}</span>
      </div>
      <div className="ui-row border-b border-black/10 px-5 py-2.5 text-[11.5px] font-medium text-black/60">
        <span>{s.cols[0]}</span>
        <span>{s.cols[1]}</span>
        <span className="ui-hide">{s.cols[2]}</span>
        <span className="ui-hide text-right">{s.cols[3]}</span>
      </div>
      {s.rows.map(([name, used, seats, last, cost], i) => (
        <div key={name} className="cv-item ui-row border-b border-black/[0.07] px-5 py-3 text-[14px]" style={k(i)}>
          <span className="truncate font-medium">{name}</span>
          <span className="flex items-center gap-3">
            <span className="ui-bar flex-1" style={{ ['--t' as string]: 'rgba(0,0,0,0.09)' }}>
              <i className="bg-[#191715]" style={bar(used / seats, 1, 0.8 + i * 0.1)} />
            </span>
            <span className="w-[52px] shrink-0 text-right text-[12.5px] tabular-nums text-black/60">
              {used}/{seats}
            </span>
          </span>
          <span className="ui-hide text-[13px] text-black/60">{last}</span>
          <span className="ui-hide text-right text-[13px] tabular-nums text-black/60">{cost}</span>
        </div>
      ))}
      <div className="cv-item ui-row bg-[#ff2b1e]/[0.13] px-5 py-3 text-[14px]" style={k(6)}>
        <span className="font-semibold">Excel</span>
        <span className="flex items-center gap-3">
          <span className="ui-bar flex-1" style={{ ['--t' as string]: 'rgba(168,22,13,0.16)' }}>
            <i className="bg-[#d41f14]" style={bar(118 / 120, 0, 1.6)} />
          </span>
          <span className="w-[52px] shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-[#a8160d]">118/120</span>
        </span>
        <span className="ui-hide text-[13px] font-medium text-[#a8160d]">{s.excelLast}</span>
        <span className="ui-hide text-right text-[13px] text-black/60">{s.excelNote}</span>
      </div>
      <div className="flex items-baseline justify-between gap-4 px-5 py-4">
        <span className="text-[13.5px] text-black/60">{s.unused}</span>
        <span className="text-[clamp(26px,2.5vw,36px)] font-semibold tracking-[-0.03em] text-[#c21a10]">
          <CountUp value={s.total} />
          <span className="ml-1 text-[13px] font-normal tracking-normal text-black/60">{s.perYear}</span>
        </span>
      </div>
    </div>
  );
}

export function PilotsScene() {
  const s = useT().scenes.pilots;
  return (
    <div className="cv w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#171514] text-[#ede9e3]">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
        <div>
          <div className="text-[16px] font-semibold tracking-[-0.015em]">{s.title}</div>
          <div className="mt-0.5 text-[12.5px] text-white/60">{s.sub}</div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-white/55">{s.scope}</span>
      </div>
      <div className="ui-row border-b border-white/[0.08] px-5 py-2.5 text-[11.5px] font-medium text-white/60">
        <span>{s.cols[0]}</span>
        <span>{s.cols[1]}</span>
        <span className="ui-hide">{s.cols[2]}</span>
        <span className="ui-hide text-right">{s.cols[3]}</span>
      </div>
      {s.rows.map(([name, owner, stage, p, last], i) => (
        <div key={name} className="cv-item ui-row border-b border-white/[0.06] px-5 py-3.5" style={k(i)}>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-medium">{name}</span>
            <span className="mt-0.5 block truncate text-[12.5px] text-white/60">{owner}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="ui-bar flex-1" style={{ ['--t' as string]: 'rgba(255,255,255,0.1)' }}>
              <i className="bg-[#ff4433]" style={bar(p, 0, 0.8 + i * 0.12)} />
            </span>
            <span className="w-8 shrink-0 text-right text-[12.5px] tabular-nums text-white/55">{Math.round(p * 100)}%</span>
          </span>
          <span className="ui-hide">
            <span className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[12px] text-white/70">{stage}</span>
          </span>
          <span className="ui-hide text-right text-[12.5px] text-[#ff5440]">{last}</span>
        </div>
      ))}
      <div className="cv-item m-4 flex gap-3 rounded-xl bg-white/[0.05] p-3.5" style={k(5)}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ede9e3] text-[11px] font-semibold text-[#171514]">{s.initials}</span>
        <div>
          <div className="text-[14px] leading-snug">{s.comment}</div>
          <div className="mt-1 text-[12px] text-white/60">{s.who}</div>
        </div>
      </div>
    </div>
  );
}

function At({ children }: { children: ReactNode }) {
  return <span className="rounded bg-[#ff2b1e]/[0.16] px-1 py-px font-medium text-[#a8160d]">{children}</span>;
}

function Msg({ i, n, c, name, time, children }: { i: number; n: string; c: string; name: string; time: string; children: ReactNode }) {
  return (
    <div className="cv-item flex gap-3" style={k(i)}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[11px] font-semibold text-white" style={{ background: c }}>
        {n}
      </span>
      <div className="min-w-0">
        <div className="text-[13px]">
          <span className="font-semibold">{name}</span> <span className="ml-1 text-[11.5px] text-black/60">{time}</span>
        </div>
        <div className="mt-0.5 text-[14px] leading-snug">{children}</div>
      </div>
    </div>
  );
}

/** Message text with the @mention token swapped for the highlighted mention. */
function withMention(text: string, mention: string) {
  return text.split('{m}').flatMap((part, i) => (i === 0 ? [part] : [<At key={i}>{mention}</At>, part]));
}

export function DependencyScene() {
  const s = useT().scenes.chat;
  const m = s.messages;
  const message = (i: number, k: number) => (
    <Msg i={k} n={m[i].n} c={m[i].c} name={m[i].name} time={m[i].time}>
      {withMention(m[i].text, s.mention)}
    </Msg>
  );
  return (
    <div className="chat-seq cv flex w-full flex-col overflow-hidden rounded-[6px] bg-[#f7f5f2] text-[#191715]">
      <div className="flex items-center justify-between gap-3 border-b border-black/10 px-5 py-3.5">
        <div className="text-[16px] font-semibold tracking-[-0.015em]">{s.channel}</div>
        <span className="truncate rounded-full bg-black/[0.06] px-3 py-1 text-[12px] text-black/60">{s.status}</span>
      </div>
      <div className="flex flex-col gap-3.5 px-5 py-4">
        {message(0, 0)}
        {message(1, 1)}
        <div className="cv-item rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-[13.5px] text-black/60" style={k(2)}>
          {s.auto}
        </div>
        {message(2, 3)}
        {message(3, 4)}
      </div>
      <div className="cv-item flex items-center justify-between gap-4 border-t border-black/10 px-5 py-3 text-[13px] text-black/60" style={k(5)}>
        <span className="flex items-center gap-2">
          <span className="typing" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {s.typing}
        </span>
        <span className="font-semibold text-[#c21a10]">
          <CountUp value="23" /> {s.mentions}
        </span>
      </div>
    </div>
  );
}

export function Scene({ id }: { id: string }) {
  if (id === 'tools') return <LicencesScene />;
  if (id === 'pilots') return <PilotsScene />;
  return <DependencyScene />;
}
