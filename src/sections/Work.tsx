import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../content';
import { Split } from '../components/Split';
import { CaseVisual } from '../components/CaseVisuals';
import { Fit } from '../components/Fit';
import { ArrowUpRight, Lock } from '../components/Icons';
import { invalidateScroll, useScrollProgress } from '../lib/scroll';

/** Horizontal gallery on desktop (scroll moves it sideways), stacked on mobile. */
export function Work() {
  const { t, href } = useLocale();
  const { work, ui } = t;
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const dist = useRef(0);
  const desktop = useRef(false);
  const layers = useRef<{ el: HTMLElement; slide: HTMLElement; depth: number }[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const measure = () => {
      desktop.current = mq.matches;
      const r = row.current;
      if (!r) return;
      if (!mq.matches) {
        r.style.transform = '';
        dist.current = 0;
        return;
      }
      const last = r.lastElementChild as HTMLElement | null;
      const end = last ? last.offsetLeft + last.offsetWidth : r.scrollWidth;
      dist.current = Math.max(0, end - window.innerWidth + window.innerWidth * 0.05);
      layers.current = Array.from(r.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({ el, slide: el.closest('article') as HTMLElement, depth: Number(el.dataset.depth) }));
      invalidateScroll();
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (row.current) ro.observe(row.current);
    mq.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useScrollProgress(track, (p) => {
    if (!desktop.current || !row.current) return;
    row.current.style.transform = `translate3d(${(-p * dist.current).toFixed(1)}px,0,0)`;
    const vw = window.innerWidth;
    layers.current.forEach(({ el, slide, depth }) => {
      const off = (slide.offsetLeft + slide.offsetWidth / 2 - p * dist.current - vw / 2) / vw;
      el.style.transform = `translate3d(${(off * depth).toFixed(1)}px,0,0)`;
    });
    const idx = Math.min(work.cases.length, Math.max(1, Math.round(p * (work.cases.length + 0.6) + 0.2)));
    if (count.current) count.current.textContent = String(idx).padStart(2, '0');
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section id="work" className="relative bg-ink" aria-labelledby="work-title">
      <div ref={track} className="relative md:h-[360vh]">
        <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden">
          <div ref={row} className="relative flex flex-col gap-20 py-24 will-change-transform md:flex-row md:items-stretch md:gap-[5vw] md:py-0 md:pl-[var(--gutter)] md:pr-[12vw]">
            {/* Intro panel */}
            <div className="frame flex shrink-0 flex-col justify-between md:w-[34vw] md:max-w-[520px] md:px-0 md:py-[12vh]">
              <div>
                <span className="kicker" data-reveal>
                  {ui.kickers.work}
                </span>
                <Split as="h2" id="work-title" text={work.title} className="t-h2 mt-6 [&_.em]:text-signal-hot" />
                <p className="mt-6 max-w-[36ch] t-lead text-bone-dim" data-reveal>
                  {work.sub}
                </p>
              </div>
              <div className="mt-10 hidden items-center gap-4 md:flex">
                <span className="label tabular-nums text-bone">
                  <span ref={count}>01</span> <span className="text-ash">/ 0{work.cases.length}</span>
                </span>
                <span className="relative h-px w-40 overflow-hidden bg-[var(--line)]">
                  <span ref={bar} className="absolute inset-0 origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
                </span>
                <span className="label">{ui.work.scroll}</span>
              </div>
            </div>

            {work.cases.map((c, i) => (
              <article
                key={c.id}
                className="frame shrink-0 md:flex md:h-[78vh] md:w-[min(84vw,1400px)] md:max-h-[780px] md:items-center md:px-0"
                aria-labelledby={`case-${c.id}`}
              >
                <Link
                  to={href(`/work#${c.id}`)}
                  viewTransition
                  className="group grid h-full w-full gap-6 md:grid-cols-12 md:gap-10"
                >
                  <div className="relative aspect-[5/6] md:col-span-8 md:aspect-auto md:h-full" data-reveal="fade">
                    <div className="absolute inset-0 overflow-hidden rounded-[22px] border border-[var(--line)]">
                      <div className="relative h-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]">
                        <Fit base={1000}>
                          <CaseVisual id={c.id} />
                        </Fit>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:col-span-4 md:py-6">
                    <div className="flex items-center justify-between label">
                      <span className="text-bone">0{i + 1}</span>
                      <span>
                        {c.sector} · {c.year}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-auto">
                      {c.confidential ? (
                        <span className="chip !border-signal/40 !text-signal-hot">
                          <Lock /> {ui.work.nda}
                        </span>
                      ) : (
                        <span className="chip">{c.client}</span>
                      )}
                      <span className="chip">{c.type}</span>
                    </div>
                    <h3 id={`case-${c.id}`} className="mt-5 text-[clamp(26px,2.6vw,40px)] leading-[1.02] tracking-[-0.035em]">
                      {c.title}
                    </h3>
                    <p className="mt-4 t-body text-bone-dim">{c.summary}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-[14px] text-bone">
                      <span className="ulink">{c.confidential ? ui.work.share : ui.work.read}</span>
                      <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
