import { useState } from 'react';
import { useT } from '../content';
import { Split } from '../components/Split';
import { Plus } from '../components/Icons';

export function FAQ() {
  const { faq, ui } = useT();
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="relative bg-ink py-28 md:py-40" aria-labelledby="faq-title">
      <div className="frame grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <span className="kicker" data-reveal>
              {ui.kickers.faq}
            </span>
            <Split as="h2" id="faq-title" text={faq.title} className="t-display mt-6 [&_.em]:text-signal-hot" />
          </div>
        </div>
        <ul className="lg:col-span-7 lg:col-start-6">
          {faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-[var(--line)] first:border-t" data-reveal style={{ ['--d' as string]: `${i * 40}ms` }}>
                <h3>
                  <button
                    type="button"
                    className="group flex w-full items-center gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span
                      className={`flex-1 text-[clamp(19px,1.7vw,24px)] leading-snug tracking-[-0.02em] transition-colors duration-500 ${isOpen ? 'text-bone' : 'text-bone-dim group-hover:text-bone'}`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-700 ease-out ${isOpen ? 'rotate-45 border-bone bg-bone text-ink' : 'border-[var(--line-strong)]'}`}
                    >
                      <Plus size={12} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} className="acc" data-open={isOpen} role="region">
                  <div>
                    <p className="max-w-[60ch] pb-7 pr-14 t-lead text-ash">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
