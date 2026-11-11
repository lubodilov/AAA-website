import { Suspense } from 'react';
import { Meta } from '../components/Meta';
import { useLocale } from '../content';
import { CaseVisual } from '../components/CaseVisuals';
import { CaseMini } from '../components/CaseMinis';
import { Fit } from '../components/Fit';
import { FinalCTA } from '../sections/FinalCTA';
import { useUI } from '../components/UI';
import { Button } from '../components/Button';
import { Split } from '../components/Split';

export default function WorkPage() {
  const { t, href } = useLocale();
  const { results, work, builds, ui: copy } = t;
  const W = copy.workPage;
  const ui = useUI();
  return (
    <>
      <Meta title={copy.meta.workTitle} description={copy.meta.workDesc} path={href('/work')} />
      <section className="relative overflow-hidden pb-14 pt-[calc(var(--header-h)+72px)] md:pt-[calc(var(--header-h)+112px)]">
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="wrap relative">
          <Split as="h1" text={W.h1} mode="intro" className="t-hero" />
          <div className="hero-fade" style={{ ['--d' as string]: '420ms' }}>
            <p className="lead mt-7 max-w-[52ch]">{W.intro}</p>
          </div>
        </div>
      </section>

      {work.cases.map((c) => (
        <article key={c.id} id={c.id} className="sec rise scroll-mt-20" aria-labelledby={`${c.id}-t`}>
          <div className="wrap">
            <div className="grid gap-8 md:grid-cols-12">
              <Split as="h2" id={`${c.id}-t`} text={c.title} className="d2 md:col-span-8" />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-end md:col-span-4">
                {[[W.client, c.confidential ? W.confidential : c.client], [W.sector, c.sector], [W.type, c.type], [W.year, c.year], ...(c.partnerName ? [[W.partner, c.partnerName]] : [])].map(([k, v]) => (
                  <div key={k}>
                    <dt className="small">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-12 overflow-hidden rounded-[22px] border border-[var(--line)]" data-reveal="clip">
              <div className="aspect-[5/6] md:aspect-[16/9]">
                <Fit base={1240}>
                  <CaseVisual id={c.id} />
                </Fit>
              </div>
            </div>
            <div className="mt-12 grid gap-12 md:grid-cols-12">
              <div className="space-y-8 md:col-span-4">
                <div>
                  <h3 className="text-[18px] font-medium">{W.challenge}</h3>
                  <p className="mt-2 text-char-2">{c.detail.challenge}</p>
                </div>
                <div>
                  <h3 className="text-[18px] font-medium">{W.how}</h3>
                  <p className="mt-2 text-char-2">{c.detail.approach}</p>
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <h3 className="text-[18px] font-medium">{W.built}</h3>
                <ul className="mt-2">
                  {c.detail.built.map((b) => (
                    <li key={b} className="border-t border-[var(--rule)] py-3 text-char-2">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-[var(--char)] pt-5">
                  <h3 className="text-[18px] font-medium">{W.outcome}</h3>
                  <p className="d3 mt-2">{c.detail.outcome}</p>
                  <div className="mt-6">
                    {c.confidential ? (
                      <Button size="sm" onClick={() => ui.open('booking')}>
                        {W.fullStory}
                      </Button>
                    ) : c.link ? (
                      <a href={c.link} target="_blank" rel="noreferrer" className="textlink">
                        {W.visit} {c.link.replace('https://', '')}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}

      <section id="systems" className="sec rise scroll-mt-20" aria-labelledby="systems-title">
        <div className="wrap">
          <Split as="h2" id="systems-title" text={W.systemsTitle} className="d2" />
          <div className="mt-12">
            {results.cases.map((c) => (
              <article key={c.id} id={c.id} className="grid scroll-mt-24 grid-cols-1 gap-8 border-t border-[var(--rule)] py-10 md:grid-cols-12 md:gap-x-10 md:py-14">
                <div className="h-[420px] min-w-0 md:col-span-4" data-reveal>
                  <CaseMini id={c.id} />
                </div>
                <div className="flex flex-col md:col-span-7 md:col-start-5">
                  <p className="small">
                    {c.system} · {c.context} · {c.timeline}
                  </p>
                  <p className="serif mt-5 text-[clamp(3.4rem,6vw,5.6rem)] leading-none tabular-nums">{c.metric}</p>
                  <p className="small mt-1">{c.metricLabel}</p>
                  <h3 className="d3 mt-6">{c.headline}</h3>
                  <p className="mt-3 max-w-[58ch] text-char-2">{c.story}</p>
                  <p className="mt-3">{c.extras.join('. ')}.</p>
                  <p className="small mt-3">
                    {W.built2}: {c.stack}
                  </p>
                </div>
              </article>
            ))}
            <p className="small border-t border-[var(--rule)] pt-6">{results.note}</p>
          </div>
        </div>
      </section>
      <section className="sec rise" aria-labelledby="builds-title">
        <div className="wrap grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Split as="h2" id="builds-title" text={builds.title} className="d2 md:col-span-4 [&_.em]:text-signal-hot" />
          <div className="md:col-span-8 md:col-start-5">
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {builds.items.map((b) => (
                <div key={b.name} className="border-t border-[var(--rule)] py-6">
                  <dt className="text-[19px] font-medium tracking-[-0.01em]">{b.name}</dt>
                  <dd className="mt-1 text-char-2">{b.body}</dd>
                </div>
              ))}
            </dl>
            <p className="small mt-8 max-w-[80ch]">
              {builds.stackLabel} {builds.stack.join(', ')}.
            </p>
          </div>
        </div>
      </section>
      <Suspense fallback={null}>
        <FinalCTA />
      </Suspense>
    </>
  );
}
