import { CSSProperties, ReactNode } from 'react';
import { useT } from '../content';

/**
 * What each system actually looks like at work. Illustrative data, real shapes:
 * these are the screens a client's team uses every day.
 */

const k = (n: number) => ({ ['--k' as string]: n }) as CSSProperties;

function Shell({ title, tag, children }: { title: string; tag: string; children: ReactNode }) {
  return (
    <div className="cv flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-[#141211] text-[#ede9e3] shadow-[0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.13),0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="truncate text-[14px] font-semibold tracking-[-0.01em]">{title}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-[11.5px] text-[#ff5440]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff2b1e]" />
          {tag}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-4">{children}</div>
    </div>
  );
}

const Row = ({ i, children, hot }: { i: number; children: ReactNode; hot?: boolean }) => (
  <div className={`cv-item rounded-xl px-3.5 py-2.5 text-[13.5px] leading-snug ${hot ? 'bg-[#ff2b1e]/[0.13]' : 'bg-white/[0.05]'}`} style={k(i)}>
    {children}
  </div>
);

const Done = ({ i, children }: { i: number; children: ReactNode }) => (
  <div className="cv-item flex items-start gap-2.5 text-[13.5px] leading-snug" style={k(i)}>
    <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#ff2b1e] text-[10px] font-bold text-[#141211]">✓</span>
    <span>{children}</span>
  </div>
);

const Label = ({ children }: { children: ReactNode }) => <div className="text-[11.5px] font-medium text-white/60">{children}</div>;

function Pill({ children, tone = 'n' }: { children: ReactNode; tone?: 'n' | 'hot' | 'good' }) {
  const t = tone === 'hot' ? 'bg-[#ff2b1e]/20 text-[#ff5440]' : tone === 'good' ? 'bg-[#ede9e3]/[0.14] text-[#ede9e3]' : 'bg-white/[0.08] text-white/60';
  return <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12px] ${t}`}>{children}</span>;
}

function Sales() {
  const s = useT().minis.sales;
  return (
    <Shell title={s.title} tag={s.tag}>
      <Label>{s.said}</Label>
      <Row i={0}>{s.quote}</Row>
      <Label>{s.doneLabel}</Label>
      {s.done.map((d, i) => (
        <Done key={d} i={i + 1}>
          {d}
        </Done>
      ))}
      <div className="cv-item mt-auto rounded-xl border border-white/10 p-3.5" style={k(5)}>
        <Label>{s.draftLabel}</Label>
        <p className="mt-1.5 text-[13.5px] leading-snug text-white/75">{s.draft}</p>
        <span className="mt-3 inline-block rounded-lg bg-[#ede9e3] px-3 py-1.5 text-[12.5px] font-semibold text-[#141211]">{s.action}</span>
      </div>
    </Shell>
  );
}

function Reception() {
  const s = useT().minis.reception;
  return (
    <Shell title={s.title} tag={s.tag}>
      <div className="cv-item max-w-[82%] self-start rounded-2xl rounded-bl-sm bg-white/[0.07] px-3.5 py-2.5 text-[13.5px] leading-snug" style={k(0)}>
        {s.q1}
      </div>
      <div className="cv-item max-w-[82%] self-end rounded-2xl rounded-br-sm bg-[#ede9e3] px-3.5 py-2.5 text-[13.5px] leading-snug text-[#141211]" style={k(2)}>
        {s.a1}
      </div>
      <div className="cv-item max-w-[82%] self-start rounded-2xl rounded-bl-sm bg-white/[0.07] px-3.5 py-2.5 text-[13.5px] leading-snug" style={k(4)}>
        {s.q2}
      </div>
      <div className="mt-1">
        <Done i={6}>{s.done}</Done>
      </div>
      <div className="cv-item mt-auto grid grid-cols-2 gap-2" style={k(7)}>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <div className="text-[24px] font-light tracking-[-0.03em]">38</div>
          <Label>{s.handled}</Label>
        </div>
        <div className="rounded-xl bg-[#ff2b1e]/[0.13] p-3">
          <div className="text-[24px] font-light tracking-[-0.03em]">2</div>
          <Label>{s.passed}</Label>
        </div>
      </div>
    </Shell>
  );
}

function Trademark() {
  const s = useT().minis.trademark;
  return (
    <Shell title={s.title} tag={s.tag}>
      <div className="ui-mini border-b border-white/[0.08] pb-2 text-[11.5px] font-medium text-white/60">
        <span>{s.cols[0]}</span>
        <span>{s.cols[1]}</span>
        <span>{s.cols[2]}</span>
        <span className="text-right">{s.cols[3]}</span>
      </div>
      {s.rows.map(([m, c, e, score], i) => (
        <div key={m} className="cv-item ui-mini text-[13.5px]" style={k(i)}>
          <span className="truncate font-semibold tracking-[0.02em]">{m}</span>
          <span className="truncate text-white/55">{c}</span>
          <span className="truncate text-white/55">{e}</span>
          <span className={`text-right tabular-nums ${i < 2 ? 'font-semibold text-[#ff5440]' : 'text-white/70'}`}>{score}</span>
        </div>
      ))}
      <div className="cv-item mt-auto flex items-center justify-between rounded-xl bg-white/[0.05] px-3.5 py-3 text-[13.5px]" style={k(6)}>
        <span>{s.note}</span>
        <Pill tone="good">{s.ready}</Pill>
      </div>
    </Shell>
  );
}

function Leads() {
  const s = useT().minis.leads;
  return (
    <Shell title={s.title} tag={s.tag}>
      {s.rows.map(([q, t, tone, a], i) => (
        <Row key={q} i={i} hot={tone === 'hot'}>
          <div className="flex items-start justify-between gap-3">
            <span>{q}</span>
            <Pill tone={tone}>{t}</Pill>
          </div>
          <div className="mt-1.5 text-[12.5px] text-white/60">CRM: {a}</div>
        </Row>
      ))}
    </Shell>
  );
}

function Cx() {
  const s = useT().minis.cx;
  return (
    <Shell title={s.title} tag={s.tag}>
      {s.rows.map(([q, t, tone, a], i) => (
        <Row key={q} i={i} hot={tone === 'hot'}>
          <div className="flex items-start justify-between gap-3">
            <span>{q}</span>
            <Pill tone={tone}>{t}</Pill>
          </div>
          <div className="mt-1.5 text-[12.5px] text-white/60">{a}</div>
        </Row>
      ))}
      <div className="cv-item mt-auto rounded-xl border border-white/10 px-3.5 py-3 text-[13.5px]" style={k(4)}>
        <Label>{s.guardLabel}</Label>
        <div className="mt-1">{s.guard}</div>
      </div>
    </Shell>
  );
}

function Onboarding() {
  const s = useT().minis.onboarding;
  return (
    <Shell title={s.title} tag={s.tag}>
      <div className="cv-item max-w-[85%] self-end rounded-2xl rounded-br-sm bg-[#ede9e3] px-3.5 py-2.5 text-[13.5px] leading-snug text-[#141211]" style={k(0)}>
        {s.q}
      </div>
      <div className="cv-item max-w-[92%] self-start rounded-2xl rounded-bl-sm bg-white/[0.07] px-3.5 py-2.5 text-[13.5px] leading-snug" style={k(2)}>
        {s.a}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.sources.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </div>
      </div>
      <div className="cv-item mt-auto rounded-xl bg-white/[0.05] p-3.5" style={k(4)}>
        <div className="flex items-center justify-between text-[13.5px]">
          <span>{s.list}</span>
          <span className="tabular-nums text-white/60">{s.progress}</span>
        </div>
        <span className="ui-bar mt-2.5" style={{ ['--t' as string]: 'rgba(255,255,255,0.1)' }}>
          <i className="bg-[#ff4433]" style={{ ['--v' as string]: 7 / 12, ['--from' as string]: 0, ['--bd' as string]: '0.9s' } as CSSProperties} />
        </span>
      </div>
    </Shell>
  );
}

function Analytics() {
  const s = useT().minis.analytics;
  return (
    <Shell title={s.title} tag={s.tag}>
      {s.rows.map(([n, v, w], i) => (
        <div key={n} className="cv-item grid grid-cols-[78px_1fr_58px] items-center gap-3 text-[13.5px]" style={k(i)}>
          <span className="text-white/60">{n}</span>
          <span className="ui-bar !h-[14px] !rounded" style={{ ['--t' as string]: 'rgba(255,255,255,0.05)' }}>
            <i className={i === s.rows.length - 1 ? 'bg-[#ff2b1e]' : 'bg-[#ede9e3]/70'} style={{ ['--v' as string]: w, ['--from' as string]: 0, ['--bd' as string]: `${0.5 + i * 0.12}s` } as CSSProperties} />
          </span>
          <span className="text-right tabular-nums">{v}</span>
        </div>
      ))}
      <div className="cv-item mt-auto rounded-xl bg-[#ff2b1e]/[0.13] p-3.5 text-[13.5px] leading-snug" style={k(6)}>
        <div className="text-[11.5px] font-medium text-[#ff5440]">{s.alertLabel}</div>
        <div className="mt-1">{s.alert}</div>
      </div>
    </Shell>
  );
}

const MAP: Record<string, () => JSX.Element> = {
  'sales-copilot': Sales,
  receptionist: Reception,
  'trademark-engine': Trademark,
  'lead-ops': Leads,
  'cx-triage': Cx,
  onboarding: Onboarding,
  analytics: Analytics,
};

export function CaseMini({ id }: { id: string }) {
  const C = MAP[id];
  return <C />;
}
