import { MouseEvent, ReactNode } from 'react';
import { Meta } from '../components/Meta';
import { Button } from '../components/Button';
import { useUI } from '../components/UI';
import { useLocale } from '../content';
import { scrollToTarget } from '../lib/scroll';

/** "[label](https://…)" inside a sentence becomes a link. */
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https:[^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    out.push(text.slice(last, m.index));
    out.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noreferrer" className="textlink">
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

type Section = { id: string; title: string; body: string[]; list?: string[][]; after?: string[] };

export default function Privacy() {
  const { t, href } = useLocale();
  const p = t.privacy;
  const ui = useUI();
  const jump = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
  };

  return (
    <>
      <Meta title={t.ui.meta.privacyTitle} description={t.ui.meta.privacyDesc} path={href('/privacy')} />

      <section className="pb-14 pt-[calc(var(--header-h)+72px)] md:pt-[calc(var(--header-h)+112px)]" aria-labelledby="privacy-h1">
        <div className="wrap">
          <h1 id="privacy-h1" className="d1">{p.title.replace(/\*/g, '')}</h1>
          <p className="lead mt-7 max-w-[56ch]">{p.intro}</p>
          <p className="small mt-5">{p.updated}</p>

          <dl className="mt-12 grid gap-x-10 sm:grid-cols-3">
            {p.glance.map((g) => (
              <div key={g.k} className="border-t border-[var(--char)] py-4">
                <dt className="small">{g.k}</dt>
                <dd className="d3 mt-1">{g.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <nav className="hidden lg:col-span-3 lg:block" aria-label={p.toc}>
            <div className="sticky top-28">
              <div className="small">{p.toc}</div>
              <ol className="mt-5 space-y-2.5 text-[14.5px]">
                {(p.sections as Section[]).map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={jump(s.id)} className="text-char-2 transition-colors hover:text-char">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            {(p.sections as Section[]).map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-28 border-t border-[var(--rule)] py-10">
                <h2 className="d3">{s.title}</h2>
                {s.id !== 'what' && s.body.map((b) => <p key={b} className="mt-4 max-w-[66ch] text-char-2"><Rich text={b} /></p>)}
                {s.list && (
                  <dl className="mt-5 space-y-4">
                    {s.list.map(([k, v]) => (
                      <div key={k} className="grid gap-1 border-t border-[var(--rule)] py-4 md:grid-cols-[200px_1fr] md:gap-6">
                        <dt className="font-medium">{k}</dt>
                        <dd className="text-char-2"><Rich text={v} /></dd>
                      </div>
                    ))}
                  </dl>
                )}
                {s.id === 'what' && s.body.map((b) => <p key={b} className="mt-5 max-w-[66ch] text-char-2"><Rich text={b} /></p>)}
                {s.after?.map((b) => <p key={b} className="mt-5 max-w-[66ch] text-char-2"><Rich text={b} /></p>)}
              </article>
            ))}
            <div className="border-t border-[var(--rule)] pt-10">
              <Button onClick={() => ui.open('contact')}>{p.contact}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
