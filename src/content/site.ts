import type { IconName } from '../lib/orgGraph';
/**
 * All English copy on the site. Bulgarian lives in bg.ts with the same shape.
 */
export const site = {
  name: 'Upgrade Vision AI',
  short: 'Upgrade Vision',
  url: 'https://upgradevision.ai',
  base: 'Based in Bulgaria',
  reach: 'Working across Europe & Switzerland',
  calendly:
    'https://calendly.com/lubo-daniel-dilov/acquisition-audit-20-minute-strategy-call?hide_gdpr_banner=1&background_color=0f0e0d&text_color=ede9e3&primary_color=ff2b1e',
  callLength: '20 minutes',
};

export const nav = [
  { label: 'Results', href: '/#results' },
  { label: 'How it works', href: '/#method' },
  { label: 'Work', href: '/work' },
];

export const chapters = [
  { id: 'what-we-find', label: 'The problem' },
  { id: 'mechanism', label: 'The cause' },
  { id: 'results', label: 'Results' },
  { id: 'work', label: 'The work' },
  { id: 'method', label: 'How it works' },
  { id: 'about', label: 'Who we are' },
];

export const hero = {
  descriptor: 'AI transformation for companies in Europe and Switzerland',
  h1: 'Everyone is busy. The numbers aren’t *moving.*',
  sub: 'Somewhere in the way your company works, one step is missing, and everyone is queuing behind it. We find that step, build it with AI on the tools you already use, and train your team to run it without us.',
  primary: 'Book a free 20-minute call',
  secondary: 'See what we’ve built',
  beats: [
    { line: 'From where you stand, it looks connected.', sub: '' },
    { line: 'It *isn’t.*', sub: '' },
    {
      line: 'One step is missing. Everyone is waiting behind it.',
      sub: 'That’s your bottleneck. It shows up as late proposals, lost emails and people chasing people, so it looks like a hundred problems. It’s one.',
    },
    { line: 'We build the *step.*', sub: 'One AI system, made for that one gap, running on the tools you already have. Live in weeks.' },
    { line: 'Same people. Now the numbers *move.*', sub: 'We train your team on their own work, then hand it over. From there it’s simply how your company runs.' },
  ],
  gap: 'The missing step',
  cue: 'Scroll',
  skip: 'Skip the animation',
};

export const clients = {
  label: 'We’ve built for',
  logos: [
    { src: '/img/clients/marken.webp', alt: 'Markenregistrierung.ch', w: 160, h: 160, scale: 1 },
    { src: '/img/clients/offmind.webp', alt: 'Offmind Artificial Intelligence', w: 317, h: 100, scale: 0.6 },
    { src: '/img/clients/ehc.webp', alt: 'EHC Lenzerheide', w: 138, h: 160, scale: 1 },
    { src: '/img/clients/italiano.webp', alt: 'Italiano & Partners', w: 531, h: 74, scale: 0.42 },
    { src: '/img/clients/gamechangers.webp', alt: 'Gamechangers Network', w: 155, h: 160, scale: 1 },
    { src: '/img/clients/nelio.webp', alt: 'nelio', w: 215, h: 120, scale: 0.62 },
  ],
  extra: 'YourApplicant',
};

export const recognition = {
  title: 'Stop us when this sounds *familiar.*',
  items: [
    { id: 'tools', title: 'You’re paying for software nobody opens.', body: 'The licences renew every year. Excel, meanwhile, is open on every screen in the building.' },
    { id: 'pilots', title: 'The AI pilot went well. That was eleven months ago.', body: 'Everyone loved the demo. Then the person running it moved on, IT had questions, and summer happened.' },
    { id: 'person', title: 'Maria is on holiday, so month-end is on hold.', body: 'Every company has someone who knows how it really works. You’ve probably thought about what happens the day she hands in her notice.' },
  ],
  turn: 'And at some point, someone on your board asked what the company is doing about AI. You gave a good answer. You know how much of it was true.',
};

export const mechanism = {
  title: 'Why more AI hasn’t made you *faster.*',
  body: [
    'A company moves at the speed of its slowest step. Usually that step is barely a step at all: a spreadsheet, a chase, one person who knows how. Speed up anything else and you get a longer queue in front of it.',
    'That’s why the smarter inbox didn’t shorten your sales cycle, and why the tool everybody liked changed nothing you can point to. Nobody asked which step was slowest.',
  ],
  demo: {
    title: 'Try it. Give AI to any step.',
    stages: [
      { name: 'Enquiries', cap: 40 },
      { name: 'Proposals', cap: 9 },
      { name: 'Approvals', cap: 22 },
      { name: 'Delivery', cap: 30 },
      { name: 'Invoicing', cap: 35 },
    ],
    perWeek: 'a week',
    output: 'Orders finished each week',
    add: 'Add AI',
    added: 'AI added',
    reset: 'Start again',
    start: 'Five steps. Everyone is flat out. Pick the step you’d automate first.',
    wasted: '{stage} can now handle {cap} a week. Orders finished: still {out}. You’ve paid for a longer queue.',
    hit: 'Orders finished went from {old} to {out}. One change did that. Now {next} is the slowest step.',
    done: 'Find the slowest step, fix it, then find the next one. That’s all this is, and almost nobody does the first part.',
    note: 'Illustrative numbers.',
  },
};

export const method = {
  title: 'How we find the bottleneck and *fix it.*',
  diagrams: ['What your team tells us', 'Five teams, every handoff, on one map', 'Where work piles up', 'AI systems replace the bottlenecks', 'Your people take ownership', 'The next wave connects'],
  lead: 'It starts with a free 20-minute call. If there’s a case for going further, the audit is a fixed price and comes off the build if you continue.',
  youGet: 'You get',
  steps: [
    {
      when: 'The audit, 7–10 working days',
      name: 'We find it',
      body: 'We sit with your leadership, then with the people doing the work, because they never describe the same company. We trace every handover and put a cost on every delay.',
      get: 'A written diagnosis: the one step costing you most, what fixing it is worth, and a ranked plan with a business case for each move.',
    },
    {
      when: 'The build, 4–8 weeks per system',
      name: 'We build it',
      body: 'A working AI system on the tools you already use, inside your security rules. You see it running on your own data every week.',
      get: 'One system, live, tied to one number you care about.',
    },
    {
      when: 'Alongside the build',
      name: 'We hand it over',
      body: 'We train your people on their own work, write the playbooks and measure who actually uses it. It isn’t finished until they’d complain if you took it away.',
      get: 'A team that runs it without us.',
    },
    {
      when: 'After that',
      name: 'The next step shows itself',
      body: 'Fix one bottleneck and you’ll see the next. Keep us, or take everything and run it yourselves.',
      get: 'A clear yes or no after every stage, with no penalty for saying no.',
    },
  ],
};

export type Case = {
  id: string;
  client: string;
  sector: string;
  type: string;
  year: string;
  title: string;
  summary: string;
  link?: string;
  confidential?: boolean;
  partnerName?: string;
  detail: { challenge: string; built: string[]; approach: string; outcome: string };
};

export const work = {
  title: 'Running *today.*',
  sub: 'Three platforms in daily use, designed and built by us.',
  cases: [
    {
      id: 'nelio-os',
      client: 'nelio',
      sector: 'Consulting',
      type: 'Operating system for a company',
      year: '2026',
      title: 'nelio’s founders stopped rebuilding the week from memory.',
      summary: 'nelio OS turns meetings, decisions, documents and deadlines into one live picture, and shows the founders only the few things that need a person. Every change carries its evidence. Disclosure: our founder is also nelio’s COO.',
      detail: {
        challenge: 'A growing consultancy where the scarce resource was leadership attention. Status lived in meetings, inboxes and documents, and rebuilding the picture every morning cost hours.',
        built: [
          'Pulse: a short, ranked list of the situations that need a person, with a cap so attention stays on what matters',
          'Rooms: every client, project, decision and meeting opens with its full context',
          'Meeting intake: a transcript goes in, reviewable changes come out, each one traceable to its source',
          'A command bar to go anywhere, create anything and ask anything, answered from live data and documents',
        ],
        approach: 'Built in thin slices, each shown weekly and tested on a real week of the company’s work. If a slice didn’t measurably lighten that week, it was cut.',
        outcome: 'The system tells the founders what needs them. They no longer go looking.',
      },
    },
    {
      id: 'yourapplicant',
      client: 'YourApplicant',
      sector: 'Education, Switzerland',
      type: 'Career platform',
      year: '2026',
      title: 'Swiss school-leavers get from blank page to apprenticeship.',
      summary: 'Students build a living profile and dossier, write CVs and motivation letters with AI, and get matched to apprenticeships from many sources. Schools and companies join in the same flow.',
      link: 'https://yourapplicant.ch',
      detail: {
        challenge: 'For many students this is the first real application process of their lives: scattered listings, a blank page for the CV and letter, and little guidance between school and company.',
        built: [
          'Sign-up, profile and a shareable dossier with an employer summary, by link or QR code',
          'AI-written CVs and motivation letters that students can open and improve',
          'Apprenticeship matching across sources, with a system of guided tasks',
          'A background service for messages and reminders by email, SMS and WhatsApp',
        ],
        approach: 'Delivered in phases on the product’s own design system, with a separate dashboard and background service so the platform stays fast as it grows.',
        outcome: 'A finished product where schools invite, companies browse and students actually get to the end, with roles for teachers and companies on the same foundation.',
      },
    },
    {
      id: 'swiss-enterprise',
      client: 'Swiss industrial group',
      sector: 'Industry, Switzerland',
      type: 'Enterprise automation platform',
      year: '2026',
      title: 'A Swiss industrial group stopped reading thousands of documents by hand.',
      summary: 'A platform that monitors sources every day, reads and scores documents with AI, and gives the teams who act on it evidence they can check. Every AI judgement links to the text behind it. It runs inside the client’s own cloud.',
      confidential: true,
      detail: {
        challenge: 'Valuable opportunities were scattered across many sources and long documents. Finding and judging them was slow manual work for expensive specialists.',
        built: [
          'Automated daily collection through official channels only, with every original kept unchanged',
          'Rule-based and AI scoring where each decision carries a reason, a confidence level and its source text',
          'A portal for the teams who act on the results, with roles and a full history of actions',
          'Enterprise setup: company sign-in, least-privilege access, secrets in a vault, personal data kept out of AI prompts',
        ],
        approach: 'Discovery workshops to agree the foundation, then one repository, one change per task and passing checks before anything shipped.',
        outcome: 'The details are under NDA. We’re glad to walk you through the project on a call.',
      },
    },
  ] as Case[],
};

export const results = {
  title: 'What *changed.*',
  sub: 'Seven more systems, and the number each one moved.',
  cols: ['Result', 'What changed', 'Where', 'Build time'],
  note: 'Results vary with company size and starting point. Interfaces shown are illustrative. References on request.',
  cases: [
    { id: 'sales-copilot', system: 'AI sales co-pilot', context: 'B2B SaaS, DACH, 24 reps', timeline: '6 weeks', metric: '+31%', metricLabel: 'qualified meetings', headline: 'Reps stopped writing reports and started selling.', story: 'Reps rebuilt calls from memory, follow-ups went out late and the CRM was barely used. Now every call becomes notes, tasks, a draft email and an updated CRM, automatically.', extras: ['7.2 hours back per rep, every week', 'Forecast accuracy +14%'], stack: 'Gong/Fathom, HubSpot, custom assistant, Make' },
    { id: 'receptionist', system: 'AI receptionist', context: 'Healthcare, several sites', timeline: '6 weeks', metric: '−43%', metricLabel: 'first response time', headline: 'Every patient answered, with no extra staff.', story: 'Reception was swamped and patients waited on hold. An AI receptionist now handles appointments and routine questions, and passes anything clinical to staff.', extras: ['12 staff hours back every day', 'Patient satisfaction +26%'], stack: 'Web chat, AI assistant, helpdesk and EMR integrations' },
    { id: 'trademark-engine', system: 'Trademark data engine', context: 'Markenregistrierung.ch, Switzerland', timeline: '3 weeks', metric: '−85%', metricLabel: 'research time', headline: 'Weeks of manual research became a pipeline.', story: 'Contact lists were built by hand from fragmented registers. A pipeline now extracts, enriches, cleans and scores the data, ready to use.', extras: ['A ready contact base in 3 weeks', 'Capacity for more campaigns'], stack: 'Python, TMView, Swissreg, database, Clay, Make' },
    { id: 'lead-ops', system: 'Lead operations', context: 'B2B agency', timeline: '5 weeks', metric: '−90%', metricLabel: 'manual triage', headline: 'No reply left behind in an inbox.', story: 'Replies got lost, triage was manual and the CRM was dirty. Target lists, personalised sequences and a reply parser now feed clean data on their own.', extras: ['More qualified meetings', 'A CRM the team trusts'], stack: 'Apollo, Clay, HubSpot, Salesforce, Make' },
    { id: 'cx-triage', system: 'Support triage with guardrails', context: 'E-commerce', timeline: 'Within 8 weeks', metric: '−38%', metricLabel: 'first response time', headline: 'Agents stopped sorting and started solving.', story: 'Response times were high, refunds were rising and agents were overloaded. Intent detection, drafted replies and refund rules now take the first pass, with clear escalation.', extras: ['Fewer refunds', 'Agents kept for the hard cases'], stack: 'Zendesk, Gorgias, rules engine, Make' },
    { id: 'onboarding', system: 'New-starter assistant', context: 'SME, internal', timeline: 'Within 6 weeks', metric: '−28%', metricLabel: 'ramp-up time', headline: 'New people became useful sooner.', story: 'New starters ramped slowly and asked the same questions. An assistant now guides them with checklists, procedures and reminders, so experienced colleagues keep working.', extras: ['Fewer handover errors', 'Procedures people read'], stack: 'Web and Slack assistant, Confluence, Notion, Make' },
    { id: 'analytics', system: 'Revenue analytics layer', context: 'B2B, many channels', timeline: 'Within 8 weeks', metric: '−23%', metricLabel: 'sales cycle', headline: 'One view from first click to signed deal.', story: 'Marketing data sat apart from the CRM, so decisions were slow and argued over. A single layer with weekly signals now shows what actually brings in revenue.', extras: ['Attribution leadership trusts', 'Bottlenecks visible every week'], stack: 'GA4, Ads, GSC, BigQuery, CRM' },
  ],
};

export const builds = {
  title: 'Depending on where the bottleneck is, we might *build:*',
  items: [
    { name: 'An operating layer for the company', body: 'One live picture of what needs a person today.' },
    { name: 'Agents that do the admin', body: 'Sorting, data entry, follow-ups and routing, with people approving what matters.' },
    { name: 'A memory for the business', body: 'Your documents and inboxes, answerable in plain language, every answer linked to its source.' },
    { name: 'A receptionist on every channel', body: 'Phone, web chat and WhatsApp, in your tone, handing over to a person when it should.' },
    { name: 'First drafts of your documents', body: 'Proposals, contracts, tenders and reports, ready for your review.' },
    { name: 'Clean data, where you work', body: 'Collected, deduplicated and scored, delivered into your CRM.' },
    { name: 'A CRM that stays current', body: 'Call notes, tasks and follow-ups written automatically, and a forecast you can believe.' },
    { name: 'Numbers on Monday morning', body: 'KPIs from live systems, explained in plain words.' },
  ],
  stackLabel: 'We work with any model and connect to what you already use:',
  stack: ['OpenAI', 'Anthropic', 'Azure', 'Open-source models', 'Microsoft 365', 'Google Workspace', 'HubSpot', 'Salesforce', 'Slack', 'Make', 'n8n', 'Python', 'Postgres'],
};

export const fit = {
  title: 'Who this is *for.*',
  yesLabel: 'This is for you if',
  noLabel: 'It isn’t if',
  yes: [
    'Your team is flat out and growth is limited by how the work gets done.',
    'You’re under pressure to “do something with AI” and nobody owns it.',
    'You want something running in the business within a quarter.',
  ],
  no: [
    'You want a chatbot by Friday.',
    'We can’t talk to the people who do the work.',
    'You want AI on the website more than in the business.',
  ],
};

export const founder = {
  title: 'A note from *Lubo.*',
  name: 'Lubo Dilov',
  role: 'Founder, Upgrade Vision AI',
  body: [
    'I started Upgrade Vision after watching good companies pay for AI and receive a presentation. The technology was rarely the problem. Nobody had taken the time to understand the business first, and nobody stayed long enough to see it work.',
    'We do both. If we talk and I don’t think we can help, I’ll tell you in the first twenty minutes.',
  ],
  photoAlt: 'Lubo Dilov, founder of Upgrade Vision AI',
};


export const faq = {
  title: 'What people ask before they *call.*',
  items: [
    { q: 'How is this different from a consultancy or a software vendor?', a: 'A consultancy leaves you a deck. A vendor leaves you a login. We do the diagnosis, the build and the training, and we’re accountable for whether the thing actually gets used.' },
    { q: 'Will this replace my people?', a: 'It takes the work nobody wanted: re-typing, chasing, searching. What you do with the time is your decision. We build every system to be used by your team.' },
    { q: 'We aren’t a tech company. Is this for us?', a: 'Especially for you. Most of our clients are consultancies, service businesses and industrial companies. We bring the technology and you bring the knowledge of your business.' },
    { q: 'Our data is a mess. Do we need to fix that first?', a: 'No. Assessing your data is part of the audit, and often the first win is simply making usable what you already have.' },
    { q: 'What about privacy and security?', a: 'GDPR by default, data processing agreements, audit trails and least-privilege access. Where it’s needed we deploy into your own cloud, including EU and Swiss regions, and keep personal data out of AI prompts. Anything above the limits you set waits for a person, and every action is logged.' },
    { q: 'How much of our team’s time will this take?', a: 'During the audit, a few conversations with the people doing the work. During the build, one person on your side who can make decisions. Training happens on real work, so it replaces work instead of adding to it.' },
    { q: 'What does it cost?', a: 'The audit is a fixed price, agreed before we start, and comes off the build if you continue. The build is priced once the audit shows what’s worth building, and the running cost is in the same business case, so you see the full number before you commit.' },
    { q: 'What about the EU AI Act?', a: 'We check each system against it during the audit and build in the oversight and records it requires. If something is borderline, we’ll tell you to bring in your lawyer.' },
    { q: 'You’re a small firm. What if you disappear?', a: 'You own the code and the documentation, and your team is trained to run it. The system keeps working whether we’re around or not.' },
  ],
};

export const finalCta = {
  title: 'You probably already *suspect* where the bottleneck is.',
  sub: 'Most owners do. Tell us what you see, and in twenty minutes you’ll know whether an audit is worth paying for.',
  primary: 'Book a free 20-minute call',
  secondary: 'Write to us instead',
};

export const scenes = {
  tools: {
    title: 'Software licences',
    sub: 'Annual renewal in 23 days',
    range: 'Last 30 days',
    cols: ['Tool', 'Seats in use', 'Last opened', 'Per year'],
    rows: [
      ['CRM Enterprise', 31, 120, 'Yesterday', '€64,800'],
      ['AI Writing Assistant', 6, 80, '94 days ago', '€23,040'],
      ['Workflow Automation Pro', 3, 40, '61 days ago', '€19,200'],
      ['BI Dashboards', 9, 60, '38 days ago', '€21,600'],
      ['Meeting Notes AI', 11, 120, '12 days ago', '€17,280'],
    ] as [string, number, number, string, string][],
    excelLast: '2 minutes ago',
    excelNote: 'Not on this bill',
    unused: 'Paid for, not used',
    total: '€121,188',
    perYear: '/ year',
  },
  pilots: {
    title: 'AI initiatives',
    sub: '4 projects · 0 in production',
    scope: 'All teams',
    cols: ['Initiative', 'Progress', 'Status', 'Last update'],
    rows: [
      ['Customer chatbot POC', 'Owner left the company', 'Demo done', 0.8, '11 months ago'],
      ['Invoice reading pilot', 'IT to be confirmed', 'Waiting for IT', 0.65, '8 months ago'],
      ['AI for proposals', 'M. Keller', 'Demo done', 0.9, '9 months ago'],
      ['Sales forecast model', 'No owner', 'On hold', 0.4, '14 months ago'],
    ] as [string, string, string, number, string][],
    comment: 'Great demo! Let’s roll this out after the summer.',
    who: 'CEO · 14 months ago',
    initials: 'CE',
  },
  chat: {
    channel: '# operations',
    status: 'Maria K. is on holiday until the 24th',
    mention: '@Maria',
    messages: [
      { n: 'TB', c: '#44505f', name: 'Tom', time: '09:02', text: '{m} where’s the current supplier price list?' },
      { n: 'AS', c: '#7a5a44', name: 'Anna', time: '09:41', text: '{m} can you approve this? The client is waiting.' },
      { n: 'JR', c: '#4c6b5c', name: 'Jonas', time: '11:15', text: 'Does anyone know how month-end works without {m}?' },
      { n: 'TB', c: '#44505f', name: 'Tom', time: '11:17', text: 'Only {m} has the login.' },
    ],
    auto: 'Auto-reply from Maria: I’m out of office with limited access to email.',
    typing: 'Anna is typing',
    mentions: 'mentions this week',
  },
};

export const minis = {
  sales: {
    title: 'Call · Northwind Logistics',
    tag: 'Processed in 40s',
    said: 'What was said',
    quote: '“If you can get us pricing by Thursday, we’ll take it to the board.”',
    doneLabel: 'Done automatically',
    done: ['CRM stage moved to Proposal', 'Task for you: send pricing by Thursday', 'Call notes saved to the account'],
    draftLabel: 'Follow-up draft',
    draft: 'Hi Anna, thanks for your time today. As promised, here is the pricing for the board…',
    action: 'Review and send',
  },
  reception: {
    title: 'Patient line · Live',
    tag: 'Answering now',
    q1: 'Hi, can I move my appointment to Thursday?',
    a1: 'Of course. Dr. Weiss has 14:30 or 16:00 on Thursday. Which suits you?',
    q2: '14:30 please.',
    done: 'Rebooked, calendar updated, confirmation sent',
    handled: 'Handled today',
    passed: 'Passed to staff',
  },
  trademark: {
    title: 'Trademark register · CH + EU',
    tag: 'Updated daily',
    cols: ['Mark', 'Classes', 'Renewal', 'Score'],
    rows: [
      ['HELVIO', 'Class 9, 42', 'Mar 2027', 92],
      ['ALPENKRAFT', 'Class 30', 'Nov 2026', 88],
      ['NORDWERK', 'Class 7', 'Jan 2027', 81],
      ['VELARA', 'Class 3', 'Dec 2026', 74],
      ['KORNBLUM', 'Class 25', 'Feb 2027', 67],
    ] as [string, string, string, number][],
    note: 'Duplicates removed, contacts enriched',
    ready: 'Ready',
  },
  leads: {
    title: 'Replies · This morning',
    tag: 'Sorted automatically',
    rows: [
      ['“Sounds good, can we talk Tuesday?”', 'Interested', 'hot', 'Meeting booked'],
      ['“Not this quarter, try us in June.”', 'Not now', 'n', 'Reminder set for June'],
      ['“Who handles data security?”', 'Question', 'good', 'Sent to account lead'],
      ['“Please take me off this list.”', 'Opt-out', 'n', 'Removed everywhere'],
    ] as [string, string, 'hot' | 'n' | 'good', string][],
  },
  cx: {
    title: 'Support queue',
    tag: 'First pass done',
    rows: [
      ['Where is my order #48213?', 'Answered', 'good', 'Tracking link sent'],
      ['The lamp arrived broken.', 'Refund €42', 'good', 'Within policy, approved automatically'],
      ['Refund for six items, €480.', 'Needs a person', 'hot', 'Above limit, routed to Sara with full context'],
    ] as [string, string, 'hot' | 'n' | 'good', string][],
    guardLabel: 'Guardrail',
    guard: 'Automatic refunds stop at €100. People decide the rest.',
  },
  onboarding: {
    title: 'New starter assistant',
    tag: 'Week 1',
    q: 'How do I submit travel expenses?',
    a: 'Use the Expenses form in the portal and add receipts within 30 days. Your manager approves it.',
    sources: ['Finance SOP v4', 'Travel policy'],
    list: 'Onboarding checklist',
    progress: '7 of 12',
  },
  analytics: {
    title: 'Revenue, first click to close',
    tag: 'This quarter',
    rows: [
      ['Visits', '48,200', 1],
      ['Leads', '3,140', 0.62],
      ['Meetings', '612', 0.42],
      ['Proposals', '204', 0.28],
      ['Won', '31', 0.09],
    ] as [string, string, number][],
    alertLabel: 'Monday alert',
    alert: 'Proposals now take 9 days to go out, up from 4. That’s where deals are being lost.',
  },
};

export const privacy = {
  kicker: 'Legal',
  title: 'Privacy policy.',
  updated: 'Last updated: 10 November 2026',
  intro: 'This page explains what personal data this website collects, why, and what you can do about it. It is short because the website collects very little.',
  glance: [
    { k: 'Analytics', v: 'None' },
    { k: 'Advertising trackers', v: 'None' },
    { k: 'Cookies of our own', v: 'None' },
  ],
  toc: 'On this page',
  contact: 'Send us a privacy request',
  sections: [
    {
      id: 'who',
      title: 'Who is responsible',
      body: ['This website is operated by Upgrade Vision AI, based in Bulgaria (“we”). We are the data controller for the personal data described on this page.', 'To contact us about privacy, use the button at the end of this page.'],
    },
    {
      id: 'what',
      title: 'What we collect and why',
      list: [
        ['Contact form', 'Your name, work email, company, role and message. We use them to reply and to discuss working together. Legal basis: steps you ask us to take before a contract, and our legitimate interest in answering business enquiries (GDPR Art. 6(1)(b) and (f)).'],
        ['Booking a call', 'If you book through the calendar, Calendly collects your name, email, the time you choose and any answers you give. We use them to hold the call. Legal basis: the same as above.'],
        ['Technical data', 'When you load a page, our hosting provider processes your IP address, browser details and the page requested. This is needed to deliver and protect the website. Legal basis: legitimate interest (GDPR Art. 6(1)(f)).'],
      ],
      body: ['You do not have to give us any personal data to read this website. Without your details we simply cannot reply to you.'],
    },
    {
      id: 'not',
      title: 'What we do not do',
      body: ['We do not use analytics or advertising trackers on this website, and we do not sell your personal data. We do not make automated decisions about you that have legal or similarly significant effects.'],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      body: ['This website sets no cookies of its own, and our fonts are served from our own host. The booking calendar loads only when you open it. At that point Calendly may set its own cookies, described in the [Calendly privacy notice](https://calendly.com/legal/privacy-notice).'],
    },
    {
      id: 'recipients',
      title: 'Who receives your data',
      body: ['We share personal data only with the service providers we need to run this website and reply to you:'],
      list: [
        ['Netlify', 'Website hosting and contact form processing. [Privacy policy](https://www.netlify.com/privacy/)'],
        ['Calendly', 'Scheduling, if you book a call. [Privacy notice](https://calendly.com/legal/privacy-notice)'],
        ['Our business email and calendar tools', 'To read and answer your message.'],
      ],
      after: ['We may also disclose data where the law requires it.'],
    },
    {
      id: 'transfers',
      title: 'Transfers outside the EU',
      body: ['Netlify and Calendly are based in the United States, so your data may be processed outside the European Economic Area. These transfers rely on an EU adequacy decision or on the European Commission’s standard contractual clauses, as provided by each company.'],
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      body: ['We keep messages and booking details for as long as we need them to handle your request, and for up to 24 months after our last contact. If we go on to work together, contract and accounting records are kept for the periods the law requires. Server logs are kept for the limited period set by our hosting provider.'],
    },
    {
      id: 'rights',
      title: 'Your rights',
      body: ['You can ask us for access to your personal data, and to correct, delete, restrict or transfer it. You can also object to processing based on legitimate interest.', 'You can complain to a data protection authority. In Bulgaria this is the [Commission for Personal Data Protection](https://www.cpdp.bg). If you are in Switzerland, you have comparable rights under the Swiss Federal Act on Data Protection.'],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: ['If this policy changes, we will update this page and the date at the top.'],
    },
  ],
};

export type GraphItem = { icon: IconName; label: string; tip: string; person?: boolean; bottleneck?: number; quote?: string };

export const graph = {
  depts: [
    {
      name: 'Sales',
      items: [
        { icon: 'inbox', label: 'Inbox', tip: 'Where leads arrive, and where half of them get stuck.' },
        { icon: 'card', label: 'CRM', tip: 'Where deals should live. Half the notes still don’t.' },
        { icon: 'person', label: 'Account lead', person: true, tip: 'Spends mornings updating systems instead of selling.', quote: '“Which version is the latest?”' },
        { icon: 'doc', label: 'Proposals', tip: 'Rebuilt from old documents, every single time.' },
      ] as GraphItem[],
    },
    {
      name: 'Operations',
      items: [
        { icon: 'sheet', label: 'Excel', bottleneck: 0, tip: 'The real system of record, whatever the org chart says.' },
        { icon: 'db', label: 'ERP', tip: 'Correct, once somebody has keyed the data in.' },
        { icon: 'person', label: 'Ops lead', person: true, tip: 'Knows where everything is. Gets asked all day.', quote: '“We re-type every order into Excel.”' },
        { icon: 'cal', label: 'Schedule', tip: 'Rebuilt by hand every time something changes.' },
      ] as GraphItem[],
    },
    {
      name: 'Finance',
      items: [
        { icon: 'stamp', label: 'Approvals', bottleneck: 1, tip: 'Every signature waits for one person.' },
        { icon: 'invoice', label: 'Invoices', tip: 'Matched line by line, by hand.' },
        { icon: 'person', label: 'Controller', person: true, tip: 'Spends month-end chasing numbers.', quote: '“Approvals sit in someone’s inbox.”' },
        { icon: 'chart', label: 'Reports', tip: 'Accurate last month. The decision is needed today.' },
      ] as GraphItem[],
    },
    {
      name: 'Service',
      items: [
        { icon: 'chat', label: 'Tickets', tip: 'They arrive everywhere and get sorted by hand.' },
        { icon: 'phone', label: 'Calls', tip: 'Answered whenever somebody happens to be free.' },
        { icon: 'person', label: 'Support', person: true, tip: 'Looks up the same answers all day.', quote: '“Only Maria knows how that works.”' },
        { icon: 'book', label: 'Know-how', bottleneck: 2, tip: 'Written down somewhere. Nobody can find it.' },
      ] as GraphItem[],
    },
    {
      name: 'People',
      items: [
        { icon: 'key', label: 'Onboarding', tip: 'Months to full speed, mostly by asking around.' },
        { icon: 'folder', label: 'Policies', tip: 'They exist. Finding the right one is another matter.' },
        { icon: 'person', label: 'HR partner', person: true, tip: 'Answers the same questions every week.' },
        { icon: 'cap', label: 'Training', tip: 'One-off sessions that don’t stick.' },
      ] as GraphItem[],
    },
  ],
  findings: ['Every order typed in again by hand', 'Requests wait days in one inbox', 'The answers live in one person’s head'],
  agents: [
    { name: 'Order agent', job: 'Syncs CRM to ERP. Nobody re-types.' },
    { name: 'Approval agent', job: 'Pre-checks and routes. People sign off on exceptions.' },
    { name: 'Knowledge assistant', job: 'Answers from your documents, with sources.' },
  ],
  next: [
    { icon: 'chart', label: 'Forecasting' },
    { icon: 'doc', label: 'Contracts' },
    { icon: 'search', label: 'Quality checks' },
    { icon: 'shield', label: 'Compliance' },
    { icon: 'gear', label: 'Procurement' },
    { icon: 'cal', label: 'Planning' },
    { icon: 'chat', label: 'Customer portal' },
    { icon: 'folder', label: 'Archive' },
  ],
  core: 'Your AI layer',
  trained: 'Trained on their own workflows. The system is theirs now.',
};

export const ui = {
  kickers: { problem: 'The problem', cause: 'The cause', results: 'Results', work: 'The work', method: 'How it works', build: 'What we build', founder: 'Founder', fit: 'Fit', faq: 'Questions', next: 'Next step' },
  dock: { label: 'Sections', book: 'Book a call' },
  approach: { hover: 'Hover any block', stages: 'Stages' },
  theme: { toLight: 'Switch to the white theme', toDark: 'Switch to the dark theme' },
  meta: {
    homeTitle: 'Upgrade Vision AI: find what’s holding your company back and fix it with AI',
    homeDesc: 'Everyone is busy and the numbers aren’t moving. We find the bottleneck, fix it with AI on the tools you already use, and train your team to run it. For companies in Europe and Switzerland.',
    workTitle: 'Work: Upgrade Vision AI',
    workDesc: 'Platforms and AI systems we designed, built and put into daily use: nelio OS, YourApplicant, an enterprise platform for a Swiss industrial group, and more.',
    privacyTitle: 'Privacy policy: Upgrade Vision AI',
    privacyDesc: 'What personal data the Upgrade Vision AI website collects, why, and what you can do about it.',
    notFoundTitle: 'Page not found: Upgrade Vision AI',
    notFoundDesc: 'This page doesn’t exist.',
  },
  header: { menu: 'Menu', close: 'Close', bookCall: 'Book a call', home: 'Home', homeAria: 'home', langLabel: 'Български', lang: 'BG' },
  footer: { blurb: 'We find what’s holding your company back, fix it with AI and train your team to run it.', company: 'Company', privacy: 'Privacy', top: 'Back to top', message: 'Send a message', bookCall: 'Book a call' },
  work: { all: 'Read every case', nda: 'Under NDA', share: 'What we can share', read: 'Read the case', scroll: 'Keep scrolling' },
  workPage: {
    h1: 'The work.',
    intro: 'Platforms and systems we designed, built and put into daily use. Some clients we can name and some we can’t. We’re glad to walk you through all of them on a call.',
    client: 'Client', sector: 'Sector', type: 'Type', year: 'Year', partner: 'Partner', confidential: 'Confidential',
    challenge: 'The problem', how: 'How we worked', built: 'What we built', outcome: 'Outcome',
    fullStory: 'Hear the full story', visit: 'Visit',
    systemsTitle: 'Seven more systems, and what each one moved.',
    built2: 'Built with',
  },
  nda: { project: 'Project', confidential: 'Confidential', run: 'Daily run, 05:00', source: 'Open original', today: 'Read today: 142 documents', review: '5 for review', why: 'Source text', quote: ['intends to', 'appoint an external supplier before the end of the quarter', ', subject to approval by'], stats: [['142', 'Read today'], ['5', 'For review'], ['0', 'Read by hand']] as [string, string][], head: ['Document', 'Type', 'Confidence', 'Level'], reasonLabel: 'Why it was flagged', reason: 'Matches three of your criteria. Deadline within 90 days.', assign: 'Assign', dismiss: 'Dismiss', high: 'High', med: 'Medium', low: 'Low' },
  notFound: { h1: 'This step is missing.', home: 'Back to the homepage' },
  modal: { booking: 'Book a call', contact: 'Send a message', close: 'Close' },
  booking: {
    title: 'Twenty minutes.',
    expect: ['Your goals and where the time goes today', 'Where AI would and wouldn’t make a difference', 'A clear next step, even if it isn’t us'],
    founder: 'Lubo Dilov',
    founderNote: 'You’ll speak with the founder',
    prefer: 'Prefer writing?',
    preferLink: 'Send a message instead',
    loading: 'Loading calendar',
    error: 'The calendar couldn’t load, probably because of a browser extension.',
    open: 'Open calendar',
    message: 'Send a message',
  },
  contact: {
    title: 'Tell us where it hurts.',
    sub: 'A few lines are enough. We reply within one working day.',
    name: 'Name', email: 'Work email', company: 'Company', role: 'Role',
    message: 'What would you like to fix?',
    placeholder: 'Our team spends hours every week on…',
    send: 'Send message', sending: 'Sending…',
    orBook: 'or', bookLink: 'book a call',
    privacyA: 'We use your details only to reply to you. See our', privacyLink: 'privacy policy',
    errorA: 'Something went wrong sending your message. Please try again, or', errorLink: 'book a call', errorB: 'instead.',
    sentTitle: 'Thank you.', sentEm: 'We’ll be in touch.',
    sentBody: 'We reply within one working day. If it’s urgent, you can book a call straight away.',
    sentAction: 'Book a call',
  },
};

export const en = {
  site, nav, chapters, graph, hero, clients, recognition, mechanism, method, work, results, builds, fit, founder, faq, finalCta, scenes, minis, privacy, ui,
};

export type Content = typeof en;
