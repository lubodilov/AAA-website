import { useT } from '../content';
import { parseEm } from '../components/Split';
import { scrollToTarget } from '../lib/scroll';

const PICKS = ['sales-copilot', 'trademark-engine', 'receptionist'];

export function Clients() {
  const { clients, results } = useT();
  const picks = PICKS.map((id) => results.cases.find((c) => c.id === id)!);
  const row = (aria: boolean) => (
    <div className="marquee-track" aria-hidden={aria || undefined}>
      {clients.logos.map((l) => (
        <img key={l.alt} src={l.src} alt={aria ? '' : l.alt} width={l.w} height={l.h} loading="lazy" decoding="async" className="client-logo w-auto opacity-55 transition-opacity duration-500 hover:opacity-100" style={{ height: `${Math.round(56 * l.scale)}px` }} />
      ))}
      <span className="whitespace-nowrap text-[28px] font-semibold tracking-[-0.04em] text-bone opacity-55">
        Your<span className="font-normal">Applicant</span>
      </span>
    </div>
  );
  return (
    <section id="after-hero" className="relative z-10 bg-ink" aria-label={clients.label}>
      <div className="frame flex flex-col gap-6 py-10 md:flex-row md:items-center md:gap-12">
        <p className="label shrink-0 md:max-w-[200px]">{clients.label}</p>
        <div className="marquee min-w-0 flex-1" style={{ ['--dur' as string]: '38s' }}>
          {row(false)}
          {row(true)}
        </div>
      </div>
      <div className="frame">
        <button type="button" onClick={() => scrollToTarget('#results')} className="group grid w-full grid-cols-3 gap-x-5 border-y border-[var(--line)] py-7 text-left md:grid-cols-12 md:items-baseline md:gap-x-8">
          <span className="label col-span-3 mb-4 md:col-span-3 md:mb-0">{parseEm(results.title).map(([t]) => t).join('')}</span>
          {picks.map((c) => (
            <span key={c.id} className="md:col-span-3">
              <span className="block text-[clamp(30px,4vw,60px)] font-light leading-none tabular-nums tracking-[-0.05em] transition-colors duration-500 group-hover:text-signal-hot">{c.metric}</span>
              <span className="label mt-2 block">{c.metricLabel}</span>
            </span>
          ))}
        </button>
      </div>
    </section>
  );
}
