import { useT } from '../content';
import { Split } from '../components/Split';

export function FitCheck() {
  const { fit, ui } = useT();
  return (
    <section className="relative bg-ink py-28 md:py-40" aria-labelledby="fit-title">
      <div className="frame">
        <span className="kicker" data-reveal>
          {ui.kickers.fit}
        </span>
        <Split as="h2" id="fit-title" text={fit.title} className="t-display mt-6 [&_.em]:text-signal-hot" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--line)] md:mt-20 md:grid-cols-2">
          <div className="bg-ink-850 p-7 md:p-11" data-reveal>
            <h3 className="label text-signal-hot">{fit.yesLabel}</h3>
            <ul className="mt-7 space-y-6">
              {fit.yes.map((t) => (
                <li key={t} className="flex gap-4 text-[clamp(20px,1.9vw,27px)] leading-[1.18] tracking-[-0.02em]">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-7 md:p-11" data-reveal style={{ ['--d' as string]: '120ms' }}>
            <h3 className="label">{fit.noLabel}</h3>
            <ul className="mt-7 space-y-6">
              {fit.no.map((t) => (
                <li key={t} className="flex gap-4 text-[clamp(20px,1.9vw,27px)] leading-[1.18] tracking-[-0.02em] text-ash">
                  <span className="mt-[0.55em] h-px w-3 shrink-0 bg-ash" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
