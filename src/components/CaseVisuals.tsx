import { CSSProperties, ReactNode } from 'react';
import { useT } from '../content';
import { Lock } from './Icons';

/**
 * Product shots, built in code. Each one is a real-sized interface on a lit stage,
 * running off the edge of the frame, with one detail lifted out in front of it.
 * All data is illustrative. Layers marked data-depth drift apart as the gallery moves.
 */

const k = (n: number) => ({ ['--k' as string]: n }) as CSSProperties;

function Ic({ d, s = 16 }: { d: string; s?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d={d} />
    </svg>
  );
}

const D = {
  pulse: 'M3 12h4l3-8 4 16 3-8h4',
  folder: 'M3 7a1 1 0 0 1 1-1h5l2 2.5h9a1 1 0 0 1 1 1V19H3z',
  cal: 'M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1zM4 10h16M8 3v4M16 3v4',
  check: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 12.2l2.4 2.4 4.6-5',
  doc: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1-3.8 4-5.7 7.5-5.7s6.5 1.9 7.5 5.7',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  chat: 'M4 5h16v11H9l-5 4z',
  match: 'M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z',
  send: 'M21 3L10 14M21 3l-7 18-4-7-7-4z',
  spark: 'M12 3c.7 4.8 3.2 7.3 8 8-4.8.7-7.3 3.2-8 8-.7-4.8-3.2-7.3-8-8 4.8-.7 7.3-3.2 8-8z',
};

function Stage({ light, children }: { light: string; children: ReactNode }) {
  return (
    <div className="cv relative h-full w-full overflow-hidden" style={{ background: light }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* nelio OS: deep blue-black, colour only for meaning, gold as its voice */
/* ------------------------------------------------------------------ */
function NelioVisual() {
  const situations = [
    { dot: '#E5484D', title: 'Client sign-off is 3 days late', why: 'Blocks Monday’s kickoff. Two workshops depend on it.', ev: ['Weekly sync', 'Scope v3', 'Overdue task'], act: 'Send reminder' },
    { dot: '#E8B44A', title: 'Decision needed: scope change', why: 'The proposal adds a module. Budget and timeline are unchanged so far.', ev: ['2 email threads', 'Proposal'], act: 'Open decision' },
    { dot: '#E8B44A', title: 'Workshop readiness: 3 of 5', why: 'Agenda and attendee list are missing for Thursday.', ev: ['Project Atlas'], act: 'Draft agenda' },
  ];
  const nav: [string, string, boolean?][] = [
    ['Pulse', D.pulse, true],
    ['Rooms', D.folder],
    ['Meetings', D.cal],
    ['Decisions', D.check],
    ['Documents', D.doc],
    ['People', D.person],
  ];
  const tray: [string, string, string][] = [
    ['New', 'Task', 'Send revised scope to client by Friday'],
    ['New', 'Decision', 'Move the kickoff to 8 September'],
    ['Update', 'Risk', 'Sign-off delay raised to high'],
    ['Update', 'Health', 'Project Atlas moved to amber'],
  ];
  const rooms: [string, string, number][] = [
    ['Atlas', '#E8B44A', 62],
    ['Northwind', '#4CC38A', 88],
    ['Helios', '#4CC38A', 74],
  ];
  return (
    <Stage light="radial-gradient(62% 56% at 86% 4%, rgba(232,180,74,0.2), rgba(232,180,74,0) 72%), radial-gradient(60% 60% at 0% 100%, rgba(255,43,30,0.16), rgba(255,43,30,0) 72%), #0a0a0c">
      <div className="cv-win bg-[#0B0E15] text-[#E6E9F0]" data-depth="-26">
        <aside className="cvq-flex w-[200px] shrink-0 flex-col border-r border-white/[0.06] bg-[#090C12] px-3 py-4">
          <div className="flex items-center gap-2 px-2.5 pb-6">
            <span className="text-[20px] font-semibold tracking-[-0.035em]">nelio</span>
            <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[10.5px] font-medium text-white/65">OS</span>
          </div>
          {nav.map(([n, d, on]) => (
            <div key={n} className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] ${on ? 'bg-white/[0.08] text-white' : 'text-white/65'}`}>
              <Ic d={d} />
              {n}
            </div>
          ))}
          <div className="mt-auto rounded-xl border border-white/[0.07] p-3">
            <div className="text-[11.5px] text-white/65">Viewing as</div>
            <div className="mt-0.5 text-[13.5px] font-medium">Chief operating officer</div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[58px] shrink-0 items-center gap-4 border-b border-white/[0.06] px-6">
            <div className="flex h-9 min-w-0 flex-1 items-center gap-2.5 rounded-lg bg-white/[0.05] px-3 text-[13.5px] text-white/65">
              <Ic d={D.search} s={15} />
              <span className="truncate">Search or ask anything</span>
              <span className="ml-auto rounded bg-white/[0.08] px-1.5 py-0.5 text-[11px] text-white/65">⌘K</span>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E8B44A] text-[12.5px] font-semibold text-[#1a1407]">EK</span>
          </div>
          <div className="flex min-h-0 flex-1">
            <main className="min-w-0 flex-1 px-7 py-6">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <div className="text-[14px] text-white/65">Good morning, Eva</div>
                  <div className="mt-0.5 text-[29px] font-medium leading-tight tracking-[-0.03em]">3 situations need you</div>
                </div>
                <div className="cvq-block text-right">
                  <div className="text-[12px] text-white/65">12 projects</div>
                  <div className="mt-1.5 flex gap-1">
                    {Array.from({ length: 12 }, (_, i) => (
                      <span key={i} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: i < 9 ? '#4CC38A' : i < 11 ? '#E8B44A' : '#E5484D' }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {situations.map((s, i) => (
                  <div key={s.title} className="cv-item rounded-2xl border border-white/[0.08] bg-white/[0.03] p-[18px]" style={k(i)}>
                    <div className="flex items-start gap-3.5">
                      <span className="cv-dot mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.dot, color: s.dot }} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[17px] font-medium tracking-[-0.015em]">{s.title}</div>
                        <div className="mt-1 text-[14px] leading-snug text-white/65">{s.why}</div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {s.ev.map((e) => (
                            <span key={e} className="rounded-md bg-white/[0.06] px-2 py-1 text-[12px] text-white/65">
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="cvq-block shrink-0 rounded-lg bg-[#E8B44A] px-3 py-2 text-[13px] font-medium text-[#1a1407]">{s.act}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {rooms.map(([n, c, p], i) => (
                  <div key={n} className="cv-item rounded-xl border border-white/[0.07] p-3.5" style={k(i + 3)}>
                    <div className="text-[14px] font-medium">{n}</div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                      <div className="cv-bar h-full rounded-full" style={{ background: c, ['--w' as string]: `${p}%` }} />
                    </div>
                    <div className="mt-2 text-[12px] text-white/65">{p}% on plan</div>
                  </div>
                ))}
              </div>
            </main>
            <section className="cvq-flex w-[292px] shrink-0 flex-col border-l border-white/[0.06] bg-[#0D1119] p-5">
              <div className="text-[12.5px] text-white/65">From this morning’s meeting</div>
              <div className="mt-1 text-[18px] font-medium tracking-[-0.02em]">4 proposed changes</div>
              <div className="mt-4">
                {tray.map(([op, kind, text], i) => (
                  <div key={text} className="cv-item border-t border-white/[0.07] py-3" style={k(i + 2)}>
                    <div className="flex items-center gap-2 text-[12px]">
                      <span style={{ color: op === 'New' ? '#4CC38A' : '#E8B44A' }}>{op}</span>
                      <span className="text-white/65">{kind}</span>
                    </div>
                    <div className="mt-1 text-[14px] leading-snug text-white/85">{text}</div>
                  </div>
                ))}
              </div>
              <div className="cv-item mt-1 border-t border-white/[0.07] pt-4" style={k(6)}>
                <div className="flex gap-2">
                  <span className="flex-1 rounded-lg bg-[#E8B44A] py-2 text-center text-[13.5px] font-medium text-[#1a1407]">Approve all</span>
                  <span className="flex-1 rounded-lg border border-white/[0.14] py-2 text-center text-[13.5px] text-white/75">Review</span>
                </div>
                <div className="mt-2.5 text-[12px] text-white/65">Proposed by nelio. Waiting for a person.</div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="cv-float cv-item w-[430px] bg-[#141925] p-4 text-[#E6E9F0]" data-depth="58" style={k(6)}>
        <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-3 text-[15px]">
          <Ic d={D.search} s={16} />
          Why is Atlas late?
          <span className="cv-caret ml-0.5 inline-block h-[15px] w-[1.5px] bg-[#E8B44A]" />
        </div>
        <div className="mt-3 flex gap-2.5">
          <span className="mt-0.5 text-[#E8B44A]">
            <Ic d={D.spark} s={16} />
          </span>
          <div>
            <p className="text-[14.5px] leading-snug">The client hasn’t signed the revised scope. It blocks Monday’s kickoff.</p>
            <div className="mt-2.5 flex gap-1.5">
              <span className="rounded-md bg-white/[0.07] px-2 py-1 text-[12px] text-white/70">Weekly sync, Tue</span>
              <span className="rounded-md bg-white/[0.07] px-2 py-1 text-[12px] text-white/70">Scope v3</span>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* YourApplicant: the product's own white, violet and coral            */
/* ------------------------------------------------------------------ */
function YourApplicantVisual() {
  const violet = '#563CF3';
  const coral = '#FD7753';
  const nav: [string, string, boolean?][] = [
    ['Startseite', D.home, true],
    ['Coach', D.chat],
    ['Nachrichten', D.mail],
    ['Profil', D.person],
    ['Lehrstellen', D.search],
    ['Übereinstimmungen', D.match],
    ['Bewerbungen', D.send],
  ];
  const bars = [30, 74, 44, 52, 36, 60, 48, 58, 50, 66, 62, 46];
  const matches: [string, string, string, number, string][] = [
    ['EM', 'Informatiker/in EFZ', 'Elektro Meier AG · Zürich', 94, violet],
    ['LP', 'Mediamatiker/in EFZ', 'Logistik Partner · Bern', 88, coral],
    ['TK', 'Kaufmann/-frau EFZ', 'Treuhand Keller · Luzern', 81, '#3E4755'],
    ['AB', 'ICT-Fachmann/-frau EFZ', 'Alpina Bau · Winterthur', 76, '#6B7280'],
  ];
  return (
    <Stage light="radial-gradient(70% 62% at 88% 0%, rgba(253,119,83,0.34), rgba(253,119,83,0) 70%), radial-gradient(64% 64% at 0% 100%, rgba(86,60,243,0.34), rgba(86,60,243,0) 72%), #0d0c12">
      <div className="cv-win bg-white text-[#111827]" data-depth="-26">
        <aside className="cvq-flex w-[204px] shrink-0 flex-col border-r border-black/[0.06] px-3 py-4">
          <div className="flex items-center gap-2 px-2.5 pb-6">
            <span className="h-[18px] w-[18px] rounded-[7px_7px_7px_2px]" style={{ background: coral }} />
            <span className="text-[16.5px] font-semibold tracking-[-0.03em]">YourApplicant</span>
          </div>
          {nav.map(([n, d, on]) => (
            <div key={n} className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] ${on ? 'bg-[#F3F2FE] font-medium text-[#111827]' : 'text-[#6B7280]'}`}>
              <Ic d={d} />
              {n}
            </div>
          ))}
          <div className="mt-auto flex items-center gap-2.5 border-t border-black/[0.06] px-2 pt-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F3F2FE] text-[12.5px] font-semibold" style={{ color: violet }}>LM</span>
            <div className="min-w-0">
              <div className="truncate text-[14px] font-medium">Lea Meier</div>
              <div className="truncate text-[12.5px] text-[#6B7280]">Sekundarschule, 3. Jahr</div>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-7 py-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-[29px] font-semibold leading-tight tracking-[-0.03em]">Willkommen, Lea!</div>
              <div className="mt-0.5 text-[14.5px] text-[#6B7280]">Du bist fast fertig mit deinem Profil.</div>
            </div>
            <span className="flex items-center gap-2 rounded-xl border border-black/[0.08] px-3.5 py-2 text-[14px] font-medium">
              <span className="h-3 w-3 rounded-[4px_4px_4px_1px]" style={{ background: coral }} />
              Frag Ben!
            </span>
          </div>
          <div className="cvq-cols mt-5 grid gap-4" style={{ ['--cols' as string]: '1.08fr 1fr' }}>
            <div className="cv-item rounded-2xl border border-black/[0.07] p-5" style={k(0)}>
              <div className="flex items-center gap-2 text-[14px] font-medium">
                <Ic d={D.doc} /> Dossier-Ansichten
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[38px] font-semibold leading-none tracking-[-0.04em]">47</span>
                <span className="rounded-full bg-[#DCF7E5] px-2 py-0.5 text-[12px] font-medium text-[#0f6b30]">+32%</span>
              </div>
              <div className="mt-5 flex h-[172px] items-end gap-[7px]">
                {bars.map((b, i) => (
                  <span key={i} className="cv-item flex-1 rounded-t-[5px]" style={{ height: `${b + 26}%`, background: `linear-gradient(180deg, ${violet}, rgba(86,60,243,0.14))`, ...k(i * 0.4) }} />
                ))}
              </div>
            </div>
            <div className="cvq-block cv-item rounded-2xl border border-black/[0.07] p-5" style={k(1)}>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium">Für dich vorgeschlagen</span>
                <span className="text-[12.5px] text-[#6B7280]">Alle anzeigen</span>
              </div>
              <div className="mt-2">
                {matches.map(([i, role, co, p, c]) => (
                  <div key={role} className="flex items-center gap-3 border-t border-black/[0.06] py-2.5 first:border-t-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[11.5px] font-semibold text-white" style={{ background: c }}>
                      {i}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-medium">{role}</div>
                      <div className="truncate text-[12.5px] text-[#6B7280]">{co}</div>
                    </div>
                    <span className="text-[14px] font-semibold tabular-nums">{p}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="cv-item mt-4 rounded-2xl border border-black/[0.07] p-5" style={k(2)}>
            <div className="flex items-center justify-between text-[14px] font-medium">
              <span>Dein Dossier</span>
              <span className="tabular-nums" style={{ color: violet }}>80%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F1F1F6]">
              <div className="cv-bar h-full rounded-full" style={{ background: violet, ['--w' as string]: '80%' }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[13.5px]">
              {[
                ['Profil', true],
                ['Lebenslauf', true],
                ['Motivationsschreiben', false],
              ].map(([t, done]) => (
                <div key={t as string} className="flex items-center gap-2">
                  <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[10.5px] ${done ? 'text-white' : 'border border-dashed border-black/30'}`} style={done ? { background: violet } : undefined}>
                    {done ? '✓' : ''}
                  </span>
                  <span className={`truncate ${done ? 'text-[#6B7280]' : ''}`}>{t as string}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cv-item mt-4 rounded-2xl border border-black/[0.07] p-5" style={k(3)}>
            <div className="text-[14px] font-medium">Deine Bewerbungen</div>
            {[
              ['Elektro Meier AG', 'Informatiker/in EFZ', 'Schnuppertag am Dienstag', '#DCF7E5', '#0f6b30'],
              ['Logistik Partner', 'Mediamatiker/in EFZ', 'Gesendet', '#F3F2FE', violet],
              ['Treuhand Keller', 'Kaufmann/-frau EFZ', 'Entwurf', '#F1F1F6', '#6B7280'],
            ].map(([c, r, st, bg, col]) => (
              <div key={c} className="flex items-center gap-3 border-t border-black/[0.06] py-2.5 first:mt-2">
                <span className="w-[170px] shrink-0 truncate text-[14px]">{c}</span>
                <span className="cvq-block min-w-0 flex-1 truncate text-[13.5px] text-[#6B7280]">{r}</span>
                <span className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[12.5px] font-medium" style={{ background: bg, color: col }}>{st}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
      <div className="cv-float cv-item w-[352px] bg-white p-4 text-[#111827]" data-depth="58" style={k(5)}>
        <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: violet }}>
          <Ic d={D.spark} s={15} /> In 3 Minuten erstellt
        </div>
        {[
          ['Motivationsschreiben', 'Kaufmann_EFZ.pdf'],
          ['Lebenslauf', 'Lea_Meier_2026.pdf'],
        ].map(([t, f]) => (
          <div key={t} className="mt-2.5 flex items-center gap-3 rounded-xl border border-black/[0.07] p-3">
            <span className="grid h-10 w-9 shrink-0 place-items-center rounded-md bg-[#FDEDE8] text-[10px] font-bold text-[#CC4520]">PDF</span>
            <div className="min-w-0">
              <div className="truncate text-[15px] font-medium">{t}</div>
              <div className="truncate text-[12.5px] text-[#6B7280]">{f}</div>
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Confidential: the real shape of the tool, with the names blacked out */
/* ------------------------------------------------------------------ */
function Bar({ w, tone = 'bg-white/80' }: { w: number; tone?: string }) {
  return <span className={`inline-block h-[0.8em] translate-y-[1.5px] rounded-[2px] ${tone}`} style={{ width: `${w}em` }} />;
}

function ConfidentialVisual() {
  const N = useT().ui.nda;
  const tier = { HIGH: N.high, MED: N.med, LOW: N.low };
  const rows = [
    ['HIGH', 15, 94, 'PDF', true],
    ['HIGH', 12, 91, 'HTML', false],
    ['MED', 17, 72, 'PDF', false],
    ['MED', 10, 68, 'DOCX', false],
    ['MED', 14, 61, 'PDF', false],
    ['MED', 11, 58, 'HTML', false],
    ['LOW', 16, 44, 'PDF', false],
    ['LOW', 13, 41, 'PDF', false],
    ['LOW', 9, 33, 'HTML', false],
    ['LOW', 14, 27, 'DOCX', false],
  ] as const;
  const line = (w: string, key: number) => <span key={key} className="mt-[9px] block h-[7px] rounded-full bg-[#14110d]/[0.13]" style={{ width: w }} />;
  return (
    <Stage light="radial-gradient(64% 60% at 92% 6%, rgba(255,43,30,0.3), rgba(255,43,30,0) 72%), radial-gradient(50% 50% at 0% 100%, rgba(255,43,30,0.1), rgba(255,43,30,0) 72%), #0a0908">
      <div className="cv-win bg-[#100F0E] text-[#EDE9E3]" data-depth="-26">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[58px] shrink-0 items-center justify-between gap-4 border-b border-white/[0.07] px-6">
            <div className="flex items-center gap-2.5 text-[14px] text-white/70">
              <Lock /> {N.project} <Bar w={5} /> <span className="text-white/65">·</span> {N.confidential}
            </div>
            <span className="text-[13px] text-white/65">{N.run}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-white/[0.07]">
            {N.stats.map(([v, l], i) => (
              <div key={l} className={`cv-item px-6 py-5 ${i ? 'border-l border-white/[0.07]' : ''}`} style={k(i)}>
                <div className="text-[34px] font-medium leading-none tracking-[-0.035em]">{v}</div>
                <div className="mt-1.5 text-[13px] text-white/65">{l}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[86px_minmax(0,1fr)_128px] gap-3 px-6 pb-2.5 pt-5 text-[12.5px] text-white/65">
            <span>{N.head[3]}</span>
            <span>{N.head[0]}</span>
            <span className="text-right">{N.head[2]}</span>
          </div>
          {rows.map(([conf, w, score, type, active], i) => (
            <div key={i} className={`cv-item grid grid-cols-[86px_minmax(0,1fr)_128px] items-center gap-3 border-t border-white/[0.06] px-6 py-[13px] ${active ? 'bg-white/[0.05] shadow-[inset_2px_0_0_#ff2b1e]' : ''}`} style={k(i + 2)}>
              <span className={`text-[13.5px] font-medium ${conf === 'HIGH' ? 'text-white' : 'text-white/65'}`}>{tier[conf]}</span>
              <span className="flex min-w-0 items-center gap-2.5 text-[14px]">
                <Bar w={w} />
                <span className="text-[12px] text-white/65">{type}</span>
              </span>
              <span className="flex items-center justify-end gap-2.5">
                <span className="h-[3px] w-[62px] overflow-hidden rounded-full bg-white/[0.1]">
                  <span className="block h-full rounded-full" style={{ width: `${score}%`, background: conf === 'HIGH' ? '#ff2b1e' : 'rgba(237,233,227,0.55)' }} />
                </span>
                <span className="w-7 text-right text-[13.5px] tabular-nums text-white/80">{score}</span>
              </span>
            </div>
          ))}
        </div>
        <section className="cvq-flex w-[372px] shrink-0 flex-col border-l border-white/[0.07] bg-[#171514] p-5">
          <div className="text-[13px] text-white/65">{N.why}</div>
          <div className="cv-item mt-3 flex-1 rounded-t-lg bg-[#F4F1EA] px-6 pt-6 text-[#14110D]" style={k(4)}>
            <Bar w={8} tone="bg-[#14110d]" />
            <span className="mt-1.5 block"><Bar w={13} tone="bg-[#14110d]" /></span>
            <div className="mt-5">{['100%', '96%', '100%', '88%'].map(line)}</div>
            <p className="mt-4 text-[15px] leading-[1.55]" style={{ fontFamily: 'Georgia, serif' }}>
              <Bar w={4} tone="bg-[#14110d]" /> {N.quote[0]} <mark className="bg-[#ffb4a8] px-0.5 text-[#14110d]">{N.quote[1]}</mark>
              {N.quote[2]} <Bar w={5} tone="bg-[#14110d]" />.
            </p>
            <div className="mt-4">{['100%', '92%', '97%', '100%', '84%', '96%', '64%'].map(line)}</div>
          </div>
        </section>
      </div>
      <div className="cv-float cv-item w-[350px] bg-[#1b1817] p-4 text-[#EDE9E3]" data-depth="58" style={k(7)}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/65">{N.reasonLabel}</span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#ff6a5a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff2b1e]" />
            94
          </span>
        </div>
        <p className="mt-1.5 text-[16px] leading-snug tracking-[-0.01em]">{N.reason}</p>
        <div className="mt-4 flex gap-2">
          <span className="flex-1 rounded-lg bg-[#EDE9E3] py-2 text-center text-[13.5px] font-medium text-[#100f0e]">{N.assign}</span>
          <span className="flex-1 rounded-lg border border-white/15 py-2 text-center text-[13.5px] text-white/75">{N.dismiss}</span>
        </div>
      </div>
    </Stage>
  );
}

export function CaseVisual({ id }: { id: string }) {
  if (id === 'nelio-os') return <NelioVisual />;
  if (id === 'yourapplicant') return <YourApplicantVisual />;
  return <ConfidentialVisual />;
}
