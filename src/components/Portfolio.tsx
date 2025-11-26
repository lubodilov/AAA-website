import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Filter, TrendingUp, Clock, Target, Star, Award, Zap, ChevronDown, ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import Header from './Header';

// Cursor glow component
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

interface Transformation {
  id: string;
  tier: 'flagship' | 'authority' | 'proof';
  title: string;
  company: string;
  timeline: string;
  crisis: string;
  breakthrough: string;
  domination: string;
  meaningForYou: string;
  industry: string;
  companySize: 'startup' | 'growth' | 'enterprise';
  challengeType: 'acquisition' | 'retention' | 'operations' | 'scaling';
  metrics: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  shortCrisis: string;
  shortResult: string;
  testimonial?: string;
  scarcity?: string;
  authority?: string;
  socialProof?: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
}

const transformations: Transformation[] = [
  // FLAGSHIP RESULTS (Top 3)
  {
    id: 'b2b-sales-copilot',
    tier: 'flagship',
    title: 'B2B SALES CO-PILOT (DACH, 24 REPS)',
    company: 'B2B SaaS (mid-market)',
    timeline: '6-8 weeks',
    crisis: 'Late follow-ups, messy notes, weak meeting→proposal rate; CRM underused',
    breakthrough: 'AI Sales Co-Pilot (notes → tasks → follow-ups → CRM), weekly KPI email, enablement',
    domination: '+31% qualified meetings and 7.2h saved/rep/week in 6 weeks; forecast accuracy +14% by week 8',
    meaningForYou: 'Clear owner, one source of truth, adoption measured weekly',
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'Late follow-ups, messy notes, weak meeting→proposal rate',
    shortResult: '+31% qualified meetings and 7.2h saved/rep/week',
    metrics: {
      primary: '+31%',
      secondary: '7.2h',
      tertiary: '+14%'
    },
    scarcity: 'Gong/Fathom • HubSpot • Custom assistant • Make',
    authority: 'Clear owner, one source of truth, adoption measured weekly',
    socialProof: 'See the 6-week plan →',
    mediaType: 'video',
    mediaUrl: '/hero_animation.mp4'
  },
  {
    id: 'ai-receptionist-intake',
    tier: 'flagship',
    title: 'AI RECEPTIONIST & INTAKE (US CLINIC)',
    company: 'Healthcare provider (multi-location)',
    timeline: '6 weeks',
    crisis: 'Slow intake, staff overloaded; patients waiting for answers; phone/email backlog',
    breakthrough: 'AI receptionist + intake + triage, SOPs, escalation rules, staff training',
    domination: 'First response time −43% within 6 weeks; staff hours reclaimed; CSAT up',
    meaningForYou: 'Guardrails, human-in-the-loop, clear escalation and handoff',
    industry: 'Healthcare',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: 'Slow intake, staff overloaded; patients waiting',
    shortResult: 'First response time −43%; staff hours reclaimed',
    metrics: {
      primary: '−43%',
      secondary: '6wks',
      tertiary: 'CSAT↑'
    },
    scarcity: 'Web chat + Voiceflow • OpenAI (HIPAA-aware) • Helpdesk/EMR integrations',
    authority: 'Guardrails, human-in-the-loop, clear escalation and handoff',
    socialProof: 'View the intake flow map →',
    mediaType: 'video',
    mediaUrl: '/hero_animation.mp4'
  },
  {
    id: 'trademark-lead-engine',
    tier: 'flagship',
    title: 'TRADEMARK LEAD ENGINE (CH MARKET)',
    company: 'Swiss B2B firm (trademark enrichment)',
    timeline: '3 weeks',
    crisis: 'Manual research, fragmented data, slow list building; outreach capacity capped',
    breakthrough: 'Extraction + enrichment pipeline (TMView/Swissreg), dedupe & scoring; delivery into Sheets/DB and outreach tools',
    domination: 'Research time −80–90%; outreach-ready dataset delivered in 3 weeks; capacity to scale targeted campaigns',
    meaningForYou: 'Clean schema, dedupe rules, clear scoring → instant list usability',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'Manual research, fragmented data, slow list building',
    shortResult: 'Research time −80–90%; outreach-ready dataset',
    metrics: {
      primary: '−85%',
      secondary: '3wks',
      tertiary: 'Scale'
    },
    scarcity: 'Python/APIs • GSheets/DB • Clay/Make',
    authority: 'Clean schema, dedupe rules, clear scoring → instant list usability',
    socialProof: 'See the data schema →',
    mediaType: 'video',
    mediaUrl: '/hero_animation.mp4'
  },

  // AUTHORITY PROOF (Middle 6)
  {
    id: 'lead-ops-automation',
    tier: 'authority',
    title: 'LEAD OPS AUTOMATION (AGENCY, B2B)',
    company: 'B2B Agency',
    timeline: '5 weeks',
    crisis: 'Replies lost in inboxes; manual triage; dirty CRM',
    breakthrough: 'Intent lists, personalized sequences, reply parser to CRM; dedupe & enrichment',
    domination: 'Qualified meetings +20–40%; manual triage −90%',
    meaningForYou: 'Apollo/Clay • HubSpot/Salesforce • Make',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'Replies lost in inboxes; manual triage; dirty CRM',
    shortResult: 'Qualified meetings +20–40%; manual triage −90%',
    metrics: {
      primary: '+30%',
      secondary: '−90%',
      tertiary: '5wks'
    },
    authority: 'Apollo/Clay • HubSpot/Salesforce • Make',
    testimonial: 'See flows →'
  },
  {
    id: 'acquisition-analytics-layer',
    tier: 'authority',
    title: 'ACQUISITION ANALYTICS LAYER (B2B)',
    company: 'B2B multi-channel',
    timeline: '6-8 weeks',
    crisis: 'GA4/GAds/GSC separate; no CRM join; slow decisions',
    breakthrough: 'Unify GA4/GAds/GSC + CRM; build KPI dashboard; weekly bottleneck alerts',
    domination: 'Cycle time −15–30%; attribution clarity improves CAC decisions',
    meaningForYou: 'GA4/GAds/GSC • BigQuery/Sheets • CRM',
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: 'GA4/GAds/GSC separate; no CRM join; slow decisions',
    shortResult: 'Cycle time −15–30%; attribution clarity improves CAC',
    metrics: {
      primary: '−23%',
      secondary: '6-8wks',
      tertiary: 'CAC↓'
    },
    authority: 'GA4/GAds/GSC • BigQuery/Sheets • CRM',
    testimonial: 'View dashboard sample →'
  },
  {
    id: 'onboarding-assistant',
    tier: 'authority',
    title: 'ONBOARDING ASSISTANT (SME, INTERNAL)',
    company: 'SME, internal',
    timeline: '4-6 weeks',
    crisis: 'New hires/clients ramp slowly; repetitive Q&A; errors in steps',
    breakthrough: 'AI onboarding assistant with checklists, SOPs, and nudges',
    domination: 'Ramp time −20–35%; handover errors down',
    meaningForYou: 'Web/Slack assistant • Confluence/Notion • Make',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: 'New hires/clients ramp slowly; repetitive Q&A; errors',
    shortResult: 'Ramp time −20–35%; handover errors down',
    metrics: {
      primary: '−28%',
      secondary: '4-6wks',
      tertiary: 'Errors↓'
    },
    authority: 'Web/Slack assistant • Confluence/Notion • Make',
    testimonial: 'See SOP pack →'
  },
  {
    id: 'persona-audience-simulation',
    tier: 'authority',
    title: 'PERSONA / AUDIENCE SIMULATION',
    company: 'Creators/Agency',
    timeline: '3-5 weeks',
    crisis: 'Content/offer testing slow; guesswork on angles',
    breakthrough: 'Build AI personas from reviews, transcripts, comments; run message tests',
    domination: 'Ideation time −50–60%; engagement on test posts +12–20%',
    meaningForYou: 'RAG + vector DB • Sheets/Notion',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'Content/offer testing slow; guesswork on angles',
    shortResult: 'Ideation time −50–60%; engagement +12–20%',
    metrics: {
      primary: '−55%',
      secondary: '+16%',
      tertiary: '3-5wks'
    },
    authority: 'RAG + vector DB • Sheets/Notion',
    testimonial: 'See test grid →'
  },
  {
    id: 'cx-triage-macros',
    tier: 'authority',
    title: 'CX TRIAGE & MACROS (E-COM)',
    company: 'E-commerce',
    timeline: '4-8 weeks',
    crisis: 'First response times high; refunds creeping; agents overloaded',
    breakthrough: 'Intent routing, macro assist, refund guardrails, escalation rules',
    domination: 'First response −30–45%; refunds −8–15%',
    meaningForYou: 'Zendesk/Gorgias • Rules engine • Make',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'retention',
    shortCrisis: 'First response times high; refunds creeping; agents overloaded',
    shortResult: 'First response −30–45%; refunds −8–15%',
    metrics: {
      primary: '−38%',
      secondary: '−12%',
      tertiary: '4-8wks'
    },
    authority: 'Zendesk/Gorgias • Rules engine • Make',
    testimonial: 'See macro set →'
  },
  {
    id: 'prequal-calendar-guardrails',
    tier: 'authority',
    title: 'PRE-QUAL & CALENDAR GUARDRAILS (B2B)',
    company: 'B2B',
    timeline: '3-4 weeks',
    crisis: 'No-shows on discovery calls; low fit leads landing on calendar',
    breakthrough: 'Intake scoring, pre-qual questions, slot limits, reminder flows',
    domination: 'No-shows −18–30%; better call quality',
    meaningForYou: 'Calendly/Cal • Typeform • Make/CRM',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'No-shows on discovery calls; low fit leads landing',
    shortResult: 'No-shows −18–30%; better call quality',
    metrics: {
      primary: '−24%',
      secondary: '3-4wks',
      tertiary: 'Quality↑'
    },
    authority: 'Calendly/Cal • Typeform • Make/CRM',
    testimonial: 'See intake form →'
  },

  // SPEED WINS (Bottom 6)
  {
    id: 'reply-parser-crm',
    tier: 'proof',
    title: 'REPLY PARSER TO CRM',
    company: 'Speed Win',
    timeline: '3 weeks',
    crisis: 'Manual reply triage',
    breakthrough: 'Gmail/API • Make • CRM',
    domination: 'Qualified meetings +18–25%; manual triage −90%',
    meaningForYou: 'Gmail/API • Make • CRM',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'Manual reply triage',
    shortResult: '+18–25% meetings; −90% triage',
    metrics: {
      primary: '+22%',
      secondary: '−90%',
      tertiary: '3wks'
    }
  },
  {
    id: 'call-summary-followups',
    tier: 'proof',
    title: 'CALL SUMMARY → FOLLOW-UPS',
    company: 'Speed Win',
    timeline: '2 weeks',
    crisis: 'Slow follow-ups',
    breakthrough: 'Fathom/Gong • Assistant • CRM',
    domination: '5–8h saved/rep/week; follow-ups same-day',
    meaningForYou: 'Fathom/Gong • Assistant • CRM',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: 'Slow follow-ups',
    shortResult: '5–8h saved/rep/week; same-day follow-ups',
    metrics: {
      primary: '6.5h',
      secondary: '2wks',
      tertiary: 'Same-day'
    }
  },
  {
    id: 'enrichment-pipeline',
    tier: 'proof',
    title: 'ENRICHMENT PIPELINE (CLEAN LIST)',
    company: 'Speed Win',
    timeline: '2-4 weeks',
    crisis: 'Slow list building',
    breakthrough: 'Python/APIs • Clay/Sheets',
    domination: 'Build 10–50k clean contacts; research time −80–90%',
    meaningForYou: 'Python/APIs • Clay/Sheets',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'Slow list building',
    shortResult: '10–50k contacts; −80–90% research time',
    metrics: {
      primary: '−85%',
      secondary: '30k',
      tertiary: '2-4wks'
    }
  },
  {
    id: 'kpi-email-weekly',
    tier: 'proof',
    title: 'KPI EMAIL (WEEKLY)',
    company: 'Speed Win',
    timeline: '2 weeks',
    crisis: 'Slow decisions',
    breakthrough: 'GA4/GAds/GSC • CRM • Email automation',
    domination: 'Decisions accelerated; bottlenecks surfaced weekly',
    meaningForYou: 'GA4/GAds/GSC • CRM • Email automation',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: 'Slow decisions',
    shortResult: 'Decisions accelerated; weekly bottleneck visibility',
    metrics: {
      primary: 'Weekly',
      secondary: '2wks',
      tertiary: 'Fast'
    }
  },
  {
    id: 'intake-routing-helpdesk',
    tier: 'proof',
    title: 'INTAKE & ROUTING (HELPDESK)',
    company: 'Speed Win',
    timeline: '3-4 weeks',
    crisis: 'High first response time',
    breakthrough: 'Zendesk/Gorgias • Rules',
    domination: 'First response −25–38%',
    meaningForYou: 'Zendesk/Gorgias • Rules',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'retention',
    shortCrisis: 'High first response time',
    shortResult: 'First response −25–38%',
    metrics: {
      primary: '−32%',
      secondary: '3-4wks',
      tertiary: 'Fast'
    }
  },
  {
    id: 'calendar-logic-reminders',
    tier: 'proof',
    title: 'CALENDAR LOGIC & REMINDERS',
    company: 'Speed Win',
    timeline: '3 weeks',
    crisis: 'High no-show rate',
    breakthrough: 'Calendly/Cal • CRM • SMS/email',
    domination: 'No-show rate −15–24%',
    meaningForYou: 'Calendly/Cal • CRM • SMS/email',
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: 'High no-show rate',
    shortResult: 'No-show rate −15–24%',
    metrics: {
      primary: '−20%',
      secondary: '3wks',
      tertiary: 'Show↑'
    }
  }
];

const industries = [
  { id: 'all', name: 'All Industries', count: 15 },
  { id: 'Technology', name: 'Tech/SaaS', count: 4 },
  { id: 'Healthcare', name: 'Healthcare', count: 1 },
  { id: 'Financial', name: 'Financial', count: 2 },
  { id: 'Manufacturing', name: 'Manufacturing', count: 1 },
  { id: 'Services', name: 'Services', count: 7 }
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
  { id: 'operations', name: 'Operations' },
  { id: 'scaling', name: 'Scaling' }
];

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCompanySize, setSelectedCompanySize] = useState('all');
  const [selectedChallengeType, setSelectedChallengeType] = useState('all');
  const [currentSpeedWinIndex, setCurrentSpeedWinIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [cursorGlow, setCursorGlow] = useState({ color: '', isVisible: false });
  const [selectedProject, setSelectedProject] = useState<Transformation | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get flagship transformations (top 3)
  const flagshipTransformations = transformations.filter(t => t.tier === 'flagship');
  
  // Get speed wins (bottom 6)
  const speedWins = transformations.filter(t => t.tier === 'proof');

  // Filter authority transformations based on selected filters
  const getFilteredTransformations = () => {
    return transformations.filter(t => {
      if (t.tier !== 'authority') return false;
      
      const industryMatch = selectedIndustry === 'all' || t.industry === selectedIndustry;
      const sizeMatch = selectedCompanySize === 'all' || t.companySize === selectedCompanySize;
      const challengeMatch = selectedChallengeType === 'all' || t.challengeType === selectedChallengeType;
      
      return industryMatch && sizeMatch && challengeMatch;
    });
  };

  const filteredTransformations = getFilteredTransformations();
  const matchCount = filteredTransformations.length;

  // Auto-scroll speed wins carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeedWinIndex(prev => (prev + 1) % speedWins.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [speedWins.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(cardRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const nextSpeedWin = () => {
    setCurrentSpeedWinIndex(prev => (prev + 1) % speedWins.length);
  };

  const prevSpeedWin = () => {
    setCurrentSpeedWinIndex(prev => (prev - 1 + speedWins.length) % speedWins.length);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-black relative">
      <Header isScrolled={isScrolled} />

      {/* Elite Cursor Glow */}
      <CursorGlow color={cursorGlow.color} isVisible={cursorGlow.isVisible} />

      {/* Project Detail Modal */}
      {selectedProject && (
        <>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
            style={{ isolation: 'isolate' }}
          >
          <div
            className="relative bg-white border border-gray-200 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left: Content */}
              <div className="p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-red-600/90 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
                  <Star className="w-4 h-4" />
                  <span>{selectedProject.tier === 'flagship' ? 'FLAGSHIP RESULT' : selectedProject.tier === 'authority' ? 'AUTHORITY PROOF' : 'SPEED WIN'}</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedProject.title}</h2>

                {/* Client Type & Timeline */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <div className="text-sm text-gray-500">Client Type</div>
                    <div className="text-gray-900 font-medium">{selectedProject.company}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Timeline</div>
                    <div className="text-gray-900 font-medium">{selectedProject.timeline}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className={`grid ${selectedProject.metrics.tertiary ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mb-8`}>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-red-600">{selectedProject.metrics.primary}</div>
                    <div className="text-xs text-gray-600 mt-1">Primary Impact</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600">{selectedProject.metrics.secondary}</div>
                    <div className="text-xs text-gray-600 mt-1">Secondary</div>
                  </div>
                  {selectedProject.metrics.tertiary && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-emerald-600">{selectedProject.metrics.tertiary}</div>
                      <div className="text-xs text-gray-600 mt-1">Tertiary</div>
                    </div>
                  )}
                </div>

                {/* Problem */}
                <div className="mb-6">
                  <h3 className="text-red-600 text-sm font-semibold mb-2">Problem (baseline):</h3>
                  <p className="text-gray-700">{selectedProject.crisis}</p>
                </div>

                {/* What we shipped */}
                <div className="mb-6">
                  <h3 className="text-emerald-600 text-sm font-semibold mb-2">What we shipped:</h3>
                  <p className="text-gray-700">{selectedProject.breakthrough}</p>
                </div>

                {/* Impact & timeline */}
                <div className="mb-6">
                  <h3 className="text-amber-600 text-sm font-semibold mb-2">Impact & timeline:</h3>
                  <p className="text-gray-700">{selectedProject.domination}</p>
                </div>

                {/* Stack */}
                {selectedProject.scarcity && (
                  <div className="mb-6">
                    <h3 className="text-blue-600 text-sm font-semibold mb-2">Stack:</h3>
                    <p className="text-gray-700">{selectedProject.scarcity}</p>
                  </div>
                )}

                {/* Why it worked */}
                {selectedProject.authority && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-sm font-semibold mb-2">Why it worked:</h3>
                    <p className="text-gray-700 italic">{selectedProject.authority}</p>
                  </div>
                )}

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-red-600/90 to-red-700/90 text-white px-6 py-4 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-600/30 mt-8">
                  <span>Book a 20-min Audit</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right: Media */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 hidden lg:flex items-center justify-center p-12">
                {selectedProject.mediaType === 'video' && selectedProject.mediaUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-xl"
                  >
                    <source src={selectedProject.mediaUrl} type="video/mp4" />
                  </video>
                ) : selectedProject.mediaType === 'image' && selectedProject.mediaUrl ? (
                  <img
                    src={selectedProject.mediaUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white">
                    <div className="text-center px-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-300 mb-6 hover:bg-gray-200 transition-all duration-300 cursor-pointer group">
                        <Play className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-all duration-300 ml-1" fill="currentColor" />
                      </div>
                      <div className="text-2xl font-semibold text-gray-700 mb-3">Case Study Video</div>
                      <div className="text-lg text-gray-500">Coming Soon</div>
                      <div className="text-sm text-gray-400 mt-4">
                        We're preparing an in-depth video walkthrough of this project
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </>
      )}
      
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

          {/* Page Title */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white leading-tight mb-6">
              Case Studies & Results —{' '}
              <span className="font-extralight italic text-red-400">
                Proof Over Promises
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              Real projects in plain language: baseline → intervention → KPI delta → timeline. Meetings ↑, cycle time ↓, CAC ↓—most wins in 30–60 days.
            </p>
          </div>

          {/* SECTION 1 — FLAGSHIP RESULTS (TOP 3) */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-white leading-tight mb-4">
              Flagship Results:{' '}
              <span className="font-extralight italic text-red-400">
                acquisition wins backed by KPIs
              </span>
            </h2>
            <p className="text-lg text-white/70 mt-4">
              Three engagements that show our end-to-end approach—diagnose → pilot → scale.
            </p>
          </div>

          {/* 3 Flagship Cards - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {flagshipTransformations.map((transformation, index) => {
              const isVisible = visibleCards.has(transformation.id);
              return (
                <div
                  key={transformation.id}
                  id={transformation.id}
                  ref={el => cardRefs.current[transformation.id] = el}
                  className={`relative group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                  onMouseEnter={() => setCursorGlow({ color: '#ef4444', isVisible: true })}
                  onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                >
                  <div className="relative bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-2xl p-8 overflow-hidden">
                    
                    {/* Pale Grid Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 rounded-2xl overflow-hidden transition-opacity duration-500 pointer-events-none">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                          <pattern id={`grid-${transformation.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${transformation.id})`} />
                      </svg>
                    </div>
                    
                    {/* Flagship Badge */}
                    <div className="relative inline-flex items-center space-x-2 bg-red-600/90 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                      <Star className="w-4 h-4" />
                      <span>FLAGSHIP RESULT</span>
                    </div>

                    {/* Industry & Timeline */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-red-600/15 text-red-300 text-sm font-medium px-3 py-1 rounded-full border border-red-600/20">
                        {transformation.industry}
                      </span>
                      <span className="text-white/60 text-sm font-light">
                        {transformation.timeline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                      {transformation.title}
                    </h3>

                    {/* Metrics Display */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{transformation.metrics.primary}</div>
                        <div className="text-xs text-white/60 mt-1">Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-400">{transformation.metrics.secondary}</div>
                        <div className="text-xs text-white/60 mt-1">Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{transformation.metrics.tertiary}</div>
                        <div className="text-xs text-white/60 mt-1">Extra</div>
                      </div>
                    </div>

                    {/* Short Result */}
                    <p className="text-white/80 text-sm mb-6 line-clamp-2">
                      {transformation.shortResult}
                    </p>

                    {/* View Details Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedProject(transformation);
                      }}
                      className="w-full bg-gradient-to-r from-red-600/90 to-red-700/90 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-600/30 cursor-pointer"
                    >
                      <span>View Full Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclosure */}
          <div className="text-center mb-20">
            <p className="text-xs text-white/50">
              Metrics reflect deltas vs. client baselines and may vary by team size, market, and data quality. References available on request.
            </p>
          </div>

          {/* SECTION 2 — AUTHORITY PROOF (MIDDLE 6) */}
          <div className="mb-16">
            {/* Authority Proof Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-thin text-white mb-4">
                Show me transformations for…
              </h2>
              <p className="text-base text-white/70 mb-8">
                Use filters above. Each card shows baseline → intervention → KPI delta → timeline → stack.
              </p>
              
              {/* Filter Dropdowns */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                {/* Industry Filter */}
                <div className="relative">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="appearance-none bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 pr-12 rounded-full focus:border-red-500 focus:outline-none cursor-pointer"
                  >
                    {industries.map(industry => (
                      <option key={industry.id} value={industry.id} className="bg-black text-white">
                        {industry.name} ({industry.count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                </div>

                {/* Company Size Filter */}
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

                {/* Challenge Type Filter */}
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
              </div>

              {/* Results Preview */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
                <div className="text-2xl font-bold text-white mb-2">
                  {matchCount} TRANSFORMATIONS MATCH YOUR PROFILE
                </div>
                <div className="text-white/70">
                  Showing most relevant cases for your industry and challenge type
                </div>
              </div>
            </div>

            {/* Filtered Grid - 2x3 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTransformations.slice(0, 6).map((transformation, index) => {
                const isVisible = visibleCards.has(`filtered-${transformation.id}`);
                return (
                  <div
                    key={`filtered-${transformation.id}`}
                    id={`filtered-${transformation.id}`}
                    ref={el => cardRefs.current[`filtered-${transformation.id}`] = el}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setCursorGlow({ color: '#f59e0b', isVisible: true })}
                    onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                  >
                    {/* Elite Authority Frame */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600/5 via-amber-500/8 to-amber-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 group-hover:border-amber-500/70 group-hover:bg-black/65 group-hover:shadow-lg group-hover:shadow-amber-500/15 transition-all duration-500 group-hover:scale-[1.005] group-hover:-translate-y-0.5 h-full">
                      
                      {/* Pale Grid Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-25 rounded-xl overflow-hidden transition-opacity duration-500">
                        <svg width="100%" height="100%" className="absolute inset-0">
                          <defs>
                            <pattern id={`grid-authority-${transformation.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-authority-${transformation.id})`} />
                        </svg>
                      </div>
                      
                      {/* Authority Badge */}
                      <div className="inline-flex items-center space-x-2 bg-amber-600/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 border border-amber-600/30">
                        <Award className="w-3 h-3" />
                        <span>AUTHORITY PROOF</span>
                      </div>

                      {/* Compact Title */}
                      <h3 className="text-lg font-bold text-white mb-4 leading-tight">
                        {transformation.title}
                      </h3>

                      {/* Key Metrics */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-400">{transformation.metrics.primary}</div>
                          <div className="text-xs text-white/60">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-400">{transformation.metrics.secondary}</div>
                          <div className="text-xs text-white/60">Result</div>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">
                        {transformation.shortResult}
                      </p>

                      {/* CTA */}
                      <button
                        onClick={() => setSelectedProject(transformation)}
                        className="relative w-full bg-amber-600/15 border border-amber-600/25 text-amber-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-600/25 hover:border-amber-600/40 hover:text-amber-200 transition-all duration-500 flex items-center justify-center space-x-2 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-400/8 to-amber-600/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Matches */}
            {filteredTransformations.length > 6 && (
              <div className="text-center mt-8">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300">
                  VIEW ALL {filteredTransformations.length} MATCHES →
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3 — SPEED WINS (BOTTOM 6, CAROUSEL) */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-white/80 text-sm font-light tracking-wider uppercase">Speed wins (2–6 weeks)</span>
                <Zap className="w-4 h-4 text-emerald-500" />
              </div>

              <h2 className="text-3xl lg:text-4xl font-thin text-white mb-4">
                Speed wins (2–6 weeks)
              </h2>
              <p className="text-lg text-white/70">
                Tactical improvements that pay back quickly.
              </p>
            </div>

            {/* Speed Wins Carousel */}
            <div className="relative">
              {/* Desktop: Show 3 cards */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {speedWins.slice(currentSpeedWinIndex, currentSpeedWinIndex + 3).map((transformation, index) => (
                  <div 
                    key={transformation.id} 
                    className="relative group cursor-pointer transition-all duration-500"
                    onMouseEnter={() => setCursorGlow({ color: '#10b981', isVisible: true })}
                    onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                  >
                    {/* Elite Speed Frame */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/5 via-emerald-500/8 to-emerald-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 group-hover:border-emerald-500/70 group-hover:bg-black/65 group-hover:shadow-lg group-hover:shadow-emerald-500/15 transition-all duration-500 group-hover:scale-[1.005] group-hover:-translate-y-0.5">
                    
                      {/* Pale Grid Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-25 rounded-xl overflow-hidden transition-opacity duration-500">
                        <svg width="100%" height="100%" className="absolute inset-0">
                          <defs>
                            <pattern id={`grid-speed-mobile-${transformation.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-speed-mobile-${transformation.id})`} />
                        </svg>
                      </div>
                      
                      {/* Pale Grid Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-25 rounded-xl overflow-hidden transition-opacity duration-500">
                        <svg width="100%" height="100%" className="absolute inset-0">
                          <defs>
                            <pattern id={`grid-speed-${transformation.id}-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-speed-${transformation.id}-${index})`} />
                        </svg>
                      </div>
                      
                      {/* Speed Badge */}
                      <div className="inline-flex items-center space-x-2 bg-emerald-600/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 border border-emerald-600/30">
                        <Zap className="w-3 h-3" />
                        <span>SPEED WIN</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-3">
                        {transformation.title}
                      </h3>

                      {/* Metrics */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">{transformation.metrics.primary}</div>
                          <div className="text-xs text-white/60">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-white/70">{transformation.timeline}</div>
                          <div className="text-xs text-white/60">Timeline</div>
                        </div>
                      </div>

                      {/* Short Result */}
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">
                        {transformation.shortResult}
                      </p>

                      {/* CTA */}
                      <button
                        onClick={() => setSelectedProject(transformation)}
                        className="relative w-full bg-emerald-600/15 border border-emerald-600/25 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600/25 hover:border-emerald-600/40 hover:text-emerald-200 transition-all duration-500 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-400/8 to-emerald-600/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative">View Details</span>
                        <ArrowRight className="inline w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: Show 1 card */}
              <div className="md:hidden">
                <div 
                  className="relative group cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setCursorGlow({ color: '#10b981', isVisible: true })}
                  onMouseLeave={() => setCursorGlow({ color: '', isVisible: false })}
                >
                  {/* Elite Speed Frame */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/5 via-emerald-500/8 to-emerald-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 group-hover:border-emerald-500/70 group-hover:bg-black/65 group-hover:shadow-lg group-hover:shadow-emerald-500/15 transition-all duration-500 group-hover:scale-[1.005] group-hover:-translate-y-0.5">
                    <div className="inline-flex items-center space-x-2 bg-emerald-600/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 border border-emerald-600/30">
                      <Zap className="w-3 h-3" />
                      <span>SPEED WIN</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3">
                      {speedWins[currentSpeedWinIndex].title}
                    </h3>

                    {/* Metrics */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{speedWins[currentSpeedWinIndex].metrics.primary}</div>
                        <div className="text-xs text-white/60">Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-white/70">{speedWins[currentSpeedWinIndex].timeline}</div>
                        <div className="text-xs text-white/60">Timeline</div>
                      </div>
                    </div>

                    {/* Short Result */}
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                      {speedWins[currentSpeedWinIndex].shortResult}
                    </p>

                    {/* CTA */}
                    <button
                      onClick={() => setSelectedProject(speedWins[currentSpeedWinIndex])}
                      className="relative w-full bg-emerald-600/15 border border-emerald-600/25 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600/25 hover:border-emerald-600/40 hover:text-emerald-200 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-400/8 to-emerald-600/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative">View Details</span>
                      <ArrowRight className="inline w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
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

              {/* Micro-CTA under carousel */}
              <div className="text-center mt-8">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300">
                  Want the fast ROI play? Start with a 4-week Pilot → Book Audit
                </button>
              </div>
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="text-center">
            <div className="bg-black/60 backdrop-blur-sm border border-red-600/20 rounded-3xl p-10 lg:p-16 max-w-4xl mx-auto relative overflow-hidden">
              {/* Background Effect */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-600/10"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                  STOP LEAVING{' '}
                  <span className="text-red-400">$MILLIONS</span>{' '}
                  ON THE TABLE
                </h2>
                
                {/* Social Proof */}
                <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-6 mb-8">
                  <p className="text-xl font-light text-white mb-4">
                    In the past 18 months, these transformations revealed{' '}
                    <span className="font-bold text-red-400">$127M+</span>{' '}
                    in missed opportunities.
                  </p>
                  <p className="text-lg font-extralight text-white/80">
                    Your competitors are making the same mistakes these companies were.
                  </p>
                </div>
                
                {/* Value Proposition */}
                <p className="text-xl font-light text-white mb-8 leading-relaxed">
                  Get your <span className="font-bold text-red-400">FREE Vision Gap Analysis</span> and discover what you're missing:
                </p>
                
                {/* CTA Button */}
                <button className="group bg-gradient-to-r from-red-600/90 to-red-700/90 text-white px-12 py-6 rounded-full font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-4 mx-auto mb-6 shadow-xl shadow-red-600/15 hover:scale-102 border border-red-600/30">
                  <span>REVEAL MY HIDDEN OPPORTUNITIES</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                {/* Subtext */}
                <p className="text-white/70 font-light mb-10">
                  "Takes 90 seconds. Shows 7-8 figure potential."
                </p>
                
                {/* Urgency & Risk Reversal */}
                <div className="space-y-4 font-light text-white/80">
                  <p>We only accept 3 new Vision Elevation clients per quarter. Current spots filling for Q1 2026.</p>
                  <p>If we don't identify at least $500K in new opportunities, the analysis is free.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}