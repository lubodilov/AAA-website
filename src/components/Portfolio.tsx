import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, Clock, Target, ChevronDown, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Header from './Header';

const CursorGlow = ({ color, isVisible }: { color: string; isVisible: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (isVisible) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: position.x - 75,
        top: position.y - 75,
        width: '150px',
        height: '150px',
        background: `radial-gradient(circle, ${color}60 0%, ${color}35 25%, ${color}15 50%, transparent 75%)`,
        borderRadius: '50%',
        filter: 'blur(25px)',
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

interface FlagshipCase {
  id: string;
  title: string;
  clientType: string;
  problem: string;
  shipped: string;
  impact: string;
  stack: string;
  whyItWorked: string;
  industry: string;
  companySize: string;
  challengeType: string;
  kpiType: string;
}

interface AuthorityCase {
  id: string;
  title: string;
  baseline: string;
  intervention: string;
  impact: string;
  stack: string;
  industry: string;
  companySize: string;
  challengeType: string;
  kpiType: string;
}

interface SpeedWin {
  id: string;
  title: string;
  impact: string;
  stack: string;
}

const flagshipCases: FlagshipCase[] = [
  {
    id: 'flagship-1',
    title: 'B2B Sales Co-Pilot (DACH, 24 reps)',
    clientType: 'B2B SaaS (mid-market)',
    problem: 'Late follow-ups, messy notes, weak meeting→proposal rate; CRM underused.',
    shipped: 'AI Sales Co-Pilot (notes → tasks → follow-ups → CRM), weekly KPI email, enablement.',
    impact: '+31% qualified meetings and 7.2h saved/rep/week in 6 weeks; forecast accuracy +14% by week 8.',
    stack: 'Gong/Fathom • HubSpot • Custom assistant • Make',
    whyItWorked: 'Clear owner, one source of truth, adoption measured weekly.',
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'acquisition',
    kpiType: 'meetings-up'
  },
  {
    id: 'flagship-2',
    title: 'AI Receptionist & Intake (US clinic, multi-location)',
    clientType: 'Healthcare provider',
    problem: 'Slow intake, staff overloaded; patients waiting for answers; phone/email backlog.',
    shipped: 'AI receptionist + intake + triage, SOPs, escalation rules, staff training.',
    impact: 'First response time −43% within 6 weeks; staff hours reclaimed; CSAT up.',
    stack: 'Web chat + Voiceflow • OpenAI (HIPAA-aware patterns) • Helpdesk/EMR integrations',
    whyItWorked: 'Guardrails, human-in-the-loop, clear escalation and handoff.',
    industry: 'Healthcare',
    companySize: 'enterprise',
    challengeType: 'operations',
    kpiType: 'admin-down'
  },
  {
    id: 'flagship-3',
    title: 'Trademark Lead Engine (CH market, data enrichment)',
    clientType: 'Swiss B2B firm (trademark enrichment & outreach)',
    problem: 'Manual research, fragmented data, slow list building; outreach capacity capped.',
    shipped: 'Extraction + enrichment pipeline (TMView/Swissreg), dedupe & scoring; delivery into Sheets/DB and outreach tools.',
    impact: 'Research time −80–90%; outreach-ready dataset delivered in 3 weeks; capacity to scale targeted campaigns.',
    stack: 'Python/APIs • GSheets/DB • Clay/Make',
    whyItWorked: 'Clean schema, dedupe rules, clear scoring → instant list usability.',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    kpiType: 'admin-down'
  }
];

const authorityCases: AuthorityCase[] = [
  {
    id: 'authority-1',
    title: 'Lead Ops Automation (Agency, B2B)',
    baseline: 'Replies lost in inboxes; manual triage; dirty CRM.',
    intervention: 'Intent lists, personalized sequences, reply parser to CRM; dedupe & enrichment.',
    impact: 'Qualified meetings +20–40%; manual triage −90%. (5 weeks)',
    stack: 'Apollo/Clay • HubSpot/Salesforce • Make',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    kpiType: 'meetings-up'
  },
  {
    id: 'authority-2',
    title: 'Acquisition Analytics Layer (B2B, multi-channel)',
    baseline: 'GA4/GAds/GSC separate; no CRM join; slow decisions.',
    intervention: 'Unify GA4/GAds/GSC + CRM; build KPI dashboard; weekly bottleneck alerts.',
    impact: 'Cycle time −15–30%; attribution clarity improves CAC decisions. (6–8 weeks)',
    stack: 'GA4/GAds/GSC • BigQuery/Sheets • CRM',
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'operations',
    kpiType: 'cycle-down'
  },
  {
    id: 'authority-3',
    title: 'Onboarding Assistant (SME, internal)',
    baseline: 'New hires/clients ramp slowly; repetitive Q&A; errors in steps.',
    intervention: 'AI onboarding assistant with checklists, SOPs, and nudges.',
    impact: 'Ramp time −20–35%; handover errors down. (4–6 weeks)',
    stack: 'Web/Slack assistant • Confluence/Notion • Make',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    kpiType: 'admin-down'
  },
  {
    id: 'authority-4',
    title: 'Persona / Audience Simulation (Creators/Agency)',
    baseline: 'Content/offer testing slow; guesswork on angles.',
    intervention: 'Build AI personas from reviews, transcripts, comments; run message tests.',
    impact: 'Ideation time −50–60%; engagement on test posts +12–20%. (3–5 weeks)',
    stack: 'RAG + vector DB • Sheets/Notion',
    industry: 'Services',
    companySize: 'startup',
    challengeType: 'acquisition',
    kpiType: 'cycle-down'
  },
  {
    id: 'authority-5',
    title: 'CX Triage & Macros (E-com)',
    baseline: 'First response times high; refunds creeping; agents overloaded.',
    intervention: 'Intent routing, macro assist, refund guardrails, escalation rules.',
    impact: 'First response −30–45%; refunds −8–15%. (4–8 weeks)',
    stack: 'Zendesk/Gorgias • Rules engine • Make',
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'retention',
    kpiType: 'admin-down'
  },
  {
    id: 'authority-6',
    title: 'Pre-Qual & Calendar Guardrails (B2B)',
    baseline: 'No-shows on discovery calls; low fit leads landing on calendar.',
    intervention: 'Intake scoring, pre-qual questions, slot limits, reminder flows.',
    impact: 'No-shows −18–30%; better call quality. (3–4 weeks)',
    stack: 'Calendly/Cal • Typeform • Make/CRM',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    kpiType: 'meetings-up'
  }
];

const speedWins: SpeedWin[] = [
  {
    id: 'speed-1',
    title: 'Reply Parser to CRM',
    impact: 'Qualified meetings +18–25%; manual triage −90% in 3 weeks.',
    stack: 'Gmail/API • Make • CRM'
  },
  {
    id: 'speed-2',
    title: 'Call Summary → Follow-ups',
    impact: '5–8h saved/rep/week; follow-ups same-day in 2 weeks.',
    stack: 'Fathom/Gong • Assistant • CRM'
  },
  {
    id: 'speed-3',
    title: 'Enrichment Pipeline (Clean List)',
    impact: 'Build 10–50k clean contacts; research time −80–90% in 2–4 weeks.',
    stack: 'Python/APIs • Clay/Sheets'
  },
  {
    id: 'speed-4',
    title: 'KPI Email (Weekly)',
    impact: 'Decisions accelerated; bottlenecks surfaced weekly in 2 weeks.',
    stack: 'GA4/GAds/GSC • CRM • Email automation'
  },
  {
    id: 'speed-5',
    title: 'Intake & Routing (Helpdesk)',
    impact: 'First response −25–38% in 3–4 weeks.',
    stack: 'Zendesk/Gorgias • Rules'
  },
  {
    id: 'speed-6',
    title: 'Calendar Logic & Reminders',
    impact: 'No-show rate −15–24% in 3 weeks.',
    stack: 'Calendly/Cal • CRM • SMS/email'
  }
];

const industries = [
  { id: 'all', name: 'All Industries' },
  { id: 'Technology', name: 'Technology' },
  { id: 'Healthcare', name: 'Healthcare' },
  { id: 'Services', name: 'Services' },
  { id: 'Financial', name: 'Financial' }
];

const companySizes = [
  { id: 'all', name: 'All Sizes' },
  { id: 'startup', name: 'Startup' },
  { id: 'growth', name: 'Growth Stage' },
  { id: 'enterprise', name: 'Enterprise' }
];

const challengeTypes = [
  { id: 'all', name: 'All Challenges' },
  { id: 'acquisition', name: 'Customer Acquisition' },
  { id: 'retention', name: 'Customer Retention' },
  { id: 'operations', name: 'Operations' }
];

const kpiTypes = [
  { id: 'all', name: 'All KPIs' },
  { id: 'meetings-up', name: 'Meetings ↑' },
  { id: 'cycle-down', name: 'Cycle ↓' },
  { id: 'cac-down', name: 'CAC ↓' },
  { id: 'admin-down', name: 'Admin hours ↓' }
];

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCompanySize, setSelectedCompanySize] = useState('all');
  const [selectedChallengeType, setSelectedChallengeType] = useState('all');
  const [selectedKpiType, setSelectedKpiType] = useState('all');
  const [currentSpeedWinIndex, setCurrentSpeedWinIndex] = useState(0);
  const [cursorGlow, setCursorGlow] = useState({ color: '', isVisible: false });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFilteredCases = () => {
    return authorityCases.filter(c => {
      const industryMatch = selectedIndustry === 'all' || c.industry === selectedIndustry;
      const sizeMatch = selectedCompanySize === 'all' || c.companySize === selectedCompanySize;
      const challengeMatch = selectedChallengeType === 'all' || c.challengeType === selectedChallengeType;
      const kpiMatch = selectedKpiType === 'all' || c.kpiType === selectedKpiType;

      return industryMatch && sizeMatch && challengeMatch && kpiMatch;
    });
  };

  const filteredCases = getFilteredCases();
  const matchCount = filteredCases.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeedWinIndex(prev => (prev + 1) % speedWins.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSpeedWin = () => {
    setCurrentSpeedWinIndex(prev => (prev + 1) % speedWins.length);
  };

  const prevSpeedWin = () => {
    setCurrentSpeedWinIndex(prev => (prev - 1 + speedWins.length) % speedWins.length);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Header isScrolled={isScrolled} />

      <CursorGlow color={cursorGlow.color} isVisible={cursorGlow.isVisible} />

      {/* Fixed Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/hero_animation.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* PAGE HEADER (Sticky Intro Bar) */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
                Results that move meetings, cycles, and CAC—<span className="text-red-600 font-normal">fast.</span>
              </h1>
              <p className="text-xl text-white/70 font-light">
                Real projects. Plain language. KPI deltas with timelines.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="appearance-none bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 pr-12 rounded-full focus:border-red-500 focus:outline-none cursor-pointer"
                >
                  {industries.map(industry => (
                    <option key={industry.id} value={industry.id} className="bg-black text-white">
                      {industry.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedCompanySize}
                  onChange={(e) => setSelectedCompanySize(e.target.value)}
                  className="appearance-none bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 pr-12 rounded-full focus:border-red-500 focus:outline-none cursor-pointer"
                >
                  {companySizes.map(size => (
                    <option key={size.id} value={size.id} className="bg-black text-white">
                      {size.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedChallengeType}
                  onChange={(e) => setSelectedChallengeType(e.target.value)}
                  className="appearance-none bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 pr-12 rounded-full focus:border-red-500 focus:outline-none cursor-pointer"
                >
                  {challengeTypes.map(challenge => (
                    <option key={challenge.id} value={challenge.id} className="bg-black text-white">
                      {challenge.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedKpiType}
                  onChange={(e) => setSelectedKpiType(e.target.value)}
                  className="appearance-none bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 pr-12 rounded-full focus:border-red-500 focus:outline-none cursor-pointer"
                >
                  {kpiTypes.map(kpi => (
                    <option key={kpi.id} value={kpi.id} className="bg-black text-white">
                      {kpi.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>
            </div>

            {/* Result Counter */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6">
              <div className="text-white/90 text-lg font-light mb-4 md:mb-0">
                Showing <span className="text-red-400 font-semibold">{matchCount}</span> transformations that match your profile.
              </div>
              <button className="bg-red-600/90 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Book a 20-min Acquisition Audit</span>
              </button>
            </div>
          </div>

          {/* SECTION 1: FLAGSHIP RESULTS (Top 3) */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
                Flagship Results: <span className="text-red-400 font-normal">acquisition wins backed by KPIs</span>
              </h2>
              <p className="text-lg text-white/70 font-light">
                Three engagements that show our end-to-end approach—diagnose → pilot → scale.
              </p>
            </div>

            {/* 3 Flagship Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {flagshipCases.map((flagship, index) => (
                <div
                  key={flagship.id}
                  className="relative group cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setCursorGlow({ color: '#ef4444', isVisible: true })}
                  onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                >
                  <div className="relative bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-2xl p-8 overflow-hidden hover:border-red-600/50 transition-all duration-300">

                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-2xl overflow-hidden transition-opacity duration-500">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                          <pattern id={`grid-flagship-${flagship.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-flagship-${flagship.id})`} />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                        {flagship.title}
                      </h3>
                      <div className="text-sm text-red-400 font-medium mb-6">
                        {flagship.clientType}
                      </div>

                      {/* Problem */}
                      <div className="mb-4">
                        <div className="text-xs text-white/60 font-semibold mb-1 uppercase tracking-wide">Problem (baseline)</div>
                        <div className="text-sm text-white/80 font-light">{flagship.problem}</div>
                      </div>

                      {/* What we shipped */}
                      <div className="mb-4">
                        <div className="text-xs text-white/60 font-semibold mb-1 uppercase tracking-wide">What we shipped</div>
                        <div className="text-sm text-white/80 font-light">{flagship.shipped}</div>
                      </div>

                      {/* Impact */}
                      <div className="mb-4 bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                        <div className="text-xs text-red-400 font-semibold mb-1 uppercase tracking-wide">Impact & timeline</div>
                        <div className="text-sm text-white font-medium">{flagship.impact}</div>
                      </div>

                      {/* Stack */}
                      <div className="mb-4">
                        <div className="text-xs text-white/60 font-semibold mb-1 uppercase tracking-wide">Stack</div>
                        <div className="text-sm text-white/70 font-light">{flagship.stack}</div>
                      </div>

                      {/* Why it worked */}
                      <div className="mb-6">
                        <div className="text-xs text-white/60 font-semibold mb-1 uppercase tracking-wide">Why it worked</div>
                        <div className="text-sm text-white/70 font-light italic">{flagship.whyItWorked}</div>
                      </div>

                      {/* CTAs */}
                      <div className="space-y-2">
                        <button className="w-full bg-red-600/20 border border-red-600/40 text-red-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600/30 transition-all duration-300 flex items-center justify-center space-x-2">
                          <span>See the 6-week plan</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button className="w-full bg-red-600/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300">
                          Book a 20-min Audit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclosure */}
            <p className="text-center text-xs text-white/50 font-light">
              Metrics reflect deltas vs. client baselines and may vary by team size, market, and data quality. References available on request.
            </p>
          </div>

          {/* SECTION 2: AUTHORITY PROOF (Middle 6) */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
                Show me transformations for<span className="text-red-400">…</span>
              </h2>
              <p className="text-lg text-white/70 font-light">
                Use filters above. Each card shows baseline → intervention → KPI delta → timeline → stack.
              </p>
            </div>

            {/* Authority Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((authority) => (
                <div
                  key={authority.id}
                  className="relative group cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setCursorGlow({ color: '#f59e0b', isVisible: true })}
                  onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                >
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 hover:border-amber-500/50 hover:bg-black/65 transition-all duration-300 h-full">

                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-xl overflow-hidden transition-opacity duration-500">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                          <pattern id={`grid-authority-${authority.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-authority-${authority.id})`} />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-4 leading-tight">
                        {authority.title}
                      </h3>

                      {/* Baseline */}
                      <div className="mb-3">
                        <div className="text-xs text-white/60 font-semibold mb-1">Baseline:</div>
                        <div className="text-sm text-white/80 font-light">{authority.baseline}</div>
                      </div>

                      {/* Intervention */}
                      <div className="mb-3">
                        <div className="text-xs text-white/60 font-semibold mb-1">Intervention:</div>
                        <div className="text-sm text-white/80 font-light">{authority.intervention}</div>
                      </div>

                      {/* Impact */}
                      <div className="mb-3 bg-amber-600/10 border border-amber-600/20 rounded-lg p-3">
                        <div className="text-xs text-amber-400 font-semibold mb-1">Impact:</div>
                        <div className="text-sm text-white font-medium">{authority.impact}</div>
                      </div>

                      {/* Stack */}
                      <div className="mb-4">
                        <div className="text-xs text-white/60 font-semibold mb-1">Stack:</div>
                        <div className="text-sm text-white/70 font-light">{authority.stack}</div>
                      </div>

                      {/* CTA */}
                      <button className="w-full bg-amber-600/15 border border-amber-600/30 text-amber-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-600/25 transition-all duration-300 flex items-center justify-center space-x-2">
                        <span>See flows</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: SPEED WINS (Bottom 6, carousel) */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
                Speed wins <span className="text-red-400 font-normal">(2–6 weeks)</span>
              </h2>
              <p className="text-lg text-white/70 font-light">
                Tactical improvements that pay back quickly.
              </p>
            </div>

            {/* Speed Wins Carousel */}
            <div className="relative">
              {/* Desktop: Show 3 cards */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
                {speedWins.slice(currentSpeedWinIndex, currentSpeedWinIndex + 3).map((speed, index) => {
                  const displayIndex = (currentSpeedWinIndex + index) % speedWins.length;
                  const displaySpeed = speedWins[displayIndex];

                  return (
                    <div
                      key={`${displaySpeed.id}-${displayIndex}`}
                      className="relative group cursor-pointer transition-all duration-500"
                      onMouseEnter={() => setCursorGlow({ color: '#10b981', isVisible: true })}
                      onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                    >
                      <div className="relative bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-black/65 transition-all duration-300">

                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-xl overflow-hidden transition-opacity duration-500">
                          <svg width="100%" height="100%" className="absolute inset-0">
                            <defs>
                              <pattern id={`grid-speed-${displaySpeed.id}-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-speed-${displaySpeed.id}-${index})`} />
                          </svg>
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-lg font-bold text-white mb-3">
                            {displaySpeed.title}
                          </h3>

                          <div className="mb-3 bg-emerald-600/10 border border-emerald-600/20 rounded-lg p-3">
                            <div className="text-sm text-white font-medium">{displaySpeed.impact}</div>
                          </div>

                          <div className="text-sm text-white/70 font-light mb-4">
                            {displaySpeed.stack}
                          </div>

                          <button className="w-full bg-emerald-600/15 border border-emerald-600/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600/25 transition-all duration-300">
                            Quick View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: Show 1 card */}
              <div className="md:hidden mb-8">
                <div
                  className="relative group cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setCursorGlow({ color: '#10b981', isVisible: true })}
                  onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                >
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-black/65 transition-all duration-300">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-3">
                        {speedWins[currentSpeedWinIndex].title}
                      </h3>

                      <div className="mb-3 bg-emerald-600/10 border border-emerald-600/20 rounded-lg p-3">
                        <div className="text-sm text-white font-medium">{speedWins[currentSpeedWinIndex].impact}</div>
                      </div>

                      <div className="text-sm text-white/70 font-light mb-4">
                        {speedWins[currentSpeedWinIndex].stack}
                      </div>

                      <button className="w-full bg-emerald-600/15 border border-emerald-600/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600/25 transition-all duration-300">
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSpeedWin}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-black/40 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:border-emerald-500/40 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSpeedWin}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-black/40 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:border-emerald-500/40 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {speedWins.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSpeedWinIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSpeedWinIndex ? 'bg-emerald-500' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Micro-CTA */}
            <div className="text-center mt-8">
              <p className="text-white/70 font-light mb-4">
                Want the fast ROI play? Start with a 4-week Pilot
              </p>
              <button className="bg-red-600/90 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 mx-auto">
                <span>Book Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
