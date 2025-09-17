import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Star, Clock, Target, Trophy, Zap } from 'lucide-react';
import Header from './Header';

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
  metrics: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  industry: string;
  scarcityNote?: string;
  authorityQuote?: string;
  socialProof?: string;
}

const transformations: Transformation[] = [
  // TIER 1: FLAGSHIP RESULTS (Top 3 - Hero Cards)
  {
    id: 'manufacturing-empire',
    tier: 'flagship',
    title: 'MANUFACTURING LEADERSHIP BREAKTHROUGH',
    company: 'Fortune 500 Company',
    timeline: '4 Months',
    crisis: '$50M pipeline stalled - 60% of sales time wasted on unqualified leads',
    breakthrough: 'AI revealed $12M in ignored high-value prospects hiding in their existing data',
    domination: '467% qualified pipeline increase → Market leadership achieved in 6 months',
    meaningForYou: 'If you\'re losing deals to lead quality issues, this shows exactly what\'s possible.',
    metrics: {
      primary: '467%',
      secondary: '$12M',
      tertiary: '60%'
    },
    industry: 'Manufacturing',
    scarcityNote: 'Only 8 transformations like this completed worldwide',
    authorityQuote: 'Fortune 500 leadership team calls this "impossible made routine"',
    socialProof: '4 competitors tried to replicate this approach - all failed'
  },
  {
    id: 'healthcare-revolution',
    tier: 'flagship',
    title: 'HOW WE SAVED HEALTHCARE CEO FROM $25M COLLAPSE',
    company: 'Regional Healthcare Network',
    timeline: '5 Months',
    crisis: '3 months from bankruptcy - patient routing chaos consuming 6 hours daily executive time',
    breakthrough: 'The turning point came when we revealed 40% capacity increase through intelligent workflow automation',
    domination: 'New market entry 18 months early, $2.4M revenue acceleration, CEO now focuses on strategic expansion',
    meaningForYou: 'If operational chaos is drowning your leadership team, here\'s proof it\'s completely solvable.',
    metrics: {
      primary: '$2.4M',
      secondary: '18mo',
      tertiary: '6hrs'
    },
    industry: 'Healthcare',
    scarcityNote: 'First healthcare transformation of this scale ever documented',
    authorityQuote: 'Board of Directors: "This saved our entire organization"',
    socialProof: 'Now consulted by 12 other healthcare networks seeking similar results'
  },
  {
    id: 'fintech-domination',
    tier: 'flagship',
    title: 'FINTECH CEO\'S $18M REVENUE RESURRECTION',
    company: 'Series B FinTech',
    timeline: '3 Months',
    crisis: '14-day onboarding process, 45% customer abandonment rate threatening Series C funding',
    breakthrough: 'THE BREAKTHROUGH MOMENT: When their AI system reduced onboarding to 2 hours in week 3',
    domination: '520% acquisition velocity increase, $18M ARR boost, Series C oversubscribed by 300%',
    meaningForYou: 'If customer acquisition bottlenecks are killing your growth, this proves rapid transformation is possible.',
    metrics: {
      primary: '520%',
      secondary: '$18M',
      tertiary: '45%'
    },
    industry: 'FinTech',
    scarcityNote: 'Only FinTech transformation to achieve 500%+ acquisition velocity',
    authorityQuote: 'Investors called it "the fastest turnaround in FinTech history"',
    socialProof: '7 FinTech competitors now studying this case study'
  },

  // TIER 2: INDUSTRY RELEVANCE (Next 6 - Authority Cards)
  {
    id: 'retail-expansion-mastery',
    tier: 'authority',
    title: 'REGIONAL RETAIL\'S $45M EXPANSION BREAKTHROUGH',
    company: 'Multi-State Retail Chain',
    timeline: '8 Months',
    crisis: 'Market entry decisions taking 6 months each, missing prime locations to competitors',
    breakthrough: 'AI market intelligence reduced location analysis from 6 months to 3 days',
    domination: '5 new markets opened simultaneously, 180% revenue growth, positioned for acquisition',
    meaningForYou: 'If slow decision-making is costing you market opportunities, here\'s your roadmap.',
    metrics: {
      primary: '180%',
      secondary: '5',
      tertiary: '6mo'
    },
    industry: 'Retail',
    authorityQuote: 'Real estate team: "We went from followers to market leaders overnight"'
  },
  {
    id: 'saas-retention-revolution',
    tier: 'authority',
    title: 'SAAS FOUNDER\'S CHURN CRISIS SOLUTION',
    company: 'B2B SaaS Platform',
    timeline: '5 Months',
    crisis: '28% monthly churn rate destroying growth metrics and investor confidence',
    breakthrough: 'Predictive analytics identified at-risk customers 60 days before churn',
    domination: '85% churn reduction, $12M revenue recovery, leadership bandwidth freed for product innovation',
    meaningForYou: 'If customer retention is bleeding your growth, this shows the exact solution path.',
    metrics: {
      primary: '85%',
      secondary: '$12M',
      tertiary: '28%'
    },
    industry: 'SaaS',
    authorityQuote: 'CTO: "This saved our company and our sanity"'
  },
  {
    id: 'logistics-optimization-breakthrough',
    tier: 'authority',
    title: 'LOGISTICS NETWORK\'S $5.2M EFFICIENCY GAIN',
    company: 'National Logistics Provider',
    timeline: '4 Months',
    crisis: 'Route optimization consuming 6 hours daily, 23% delivery inefficiency bleeding profits',
    breakthrough: 'Real-time AI orchestration automated 90% of routing decisions',
    domination: '340% delivery efficiency, $5.2M operational savings, team freed for strategic initiatives',
    meaningForYou: 'If operational inefficiency is crushing your margins, here\'s proven transformation.',
    metrics: {
      primary: '340%',
      secondary: '$5.2M',
      tertiary: '6hrs'
    },
    industry: 'Logistics',
    authorityQuote: 'Operations Director: "We thought this level of efficiency was impossible"'
  },
  {
    id: 'realestate-intelligence-revolution',
    tier: 'authority',
    title: 'REAL ESTATE FIRM\'S $25M PORTFOLIO EXPLOSION',
    company: 'Commercial Real Estate Fund',
    timeline: '6 Months',
    crisis: '3 weeks per property evaluation limiting portfolio growth to 12 deals annually',
    breakthrough: 'AI market analysis reduced evaluation time from 3 weeks to 24 hours',
    domination: '15x faster investment decisions, $25M portfolio expansion, institutional partnerships secured',
    meaningForYou: 'If analysis paralysis is limiting your investment velocity, this proves rapid scaling is achievable.',
    metrics: {
      primary: '15x',
      secondary: '$25M',
      tertiary: '3wks'
    },
    industry: 'Real Estate',
    authorityQuote: 'Managing Partner: "We went from 12 deals to 180 deals per year"'
  },
  {
    id: 'ecommerce-conversion-mastery',
    tier: 'authority',
    title: 'E-COMMERCE BRAND\'S CONVERSION BREAKTHROUGH',
    company: 'Direct-to-Consumer Brand',
    timeline: '4 Months',
    crisis: '2.1% conversion rate stagnation despite 400% traffic growth investment',
    breakthrough: 'Hyper-personalization AI tripled conversion rates through intelligent customer journey mapping',
    domination: '290% conversion increase, $8.7M revenue boost, marketing leadership freed for brand expansion',
    meaningForYou: 'If traffic growth isn\'t translating to revenue, here\'s the missing conversion science.',
    metrics: {
      primary: '290%',
      secondary: '$8.7M',
      tertiary: '2.1%'
    },
    industry: 'E-commerce',
    authorityQuote: 'CMO: "This turned our traffic into a revenue printing machine"'
  },
  {
    id: 'professional-services-scaling',
    tier: 'authority',
    title: 'CONSULTING FIRM\'S $15M REVENUE BREAKTHROUGH',
    company: 'Management Consulting Firm',
    timeline: '6 Months',
    crisis: 'Revenue growth stalled at $50M ceiling, 40% of inquiries never reached decision-makers',
    breakthrough: 'Intelligent lead routing and qualification system captured hidden opportunities',
    domination: '$15M revenue breakthrough, 67% margin improvement, CEO bandwidth freed for market expansion',
    meaningForYou: 'If you\'ve hit a revenue ceiling despite market demand, this shows the breakthrough path.',
    metrics: {
      primary: '$15M',
      secondary: '67%',
      tertiary: '40%'
    },
    industry: 'Professional Services',
    authorityQuote: 'CEO: "We broke through our ceiling and found a new stratosphere"'
  },

  // TIER 3: SPEED WINS (Final 6 - Proof Cards)
  {
    id: 'tech-startup-rapid-scaling',
    tier: 'proof',
    title: 'TECH STARTUP\'S 90-DAY SCALING MIRACLE',
    company: 'Series A Technology Startup',
    timeline: '3 Months',
    crisis: 'Founders trapped in operational decisions, 73% of decisions could be automated',
    breakthrough: 'Executive liberation framework automated routine decision-making',
    domination: '300% team scaling, $8M valuation increase, founder availability for strategic partnerships',
    meaningForYou: 'If you\'re trapped in your business instead of leading it, rapid liberation is possible.',
    metrics: {
      primary: '300%',
      secondary: '$8M',
      tertiary: '73%'
    },
    industry: 'Technology'
  },
  {
    id: 'automotive-dealer-transformation',
    tier: 'proof',
    title: 'AUTO DEALER\'S 60-DAY INVENTORY REVOLUTION',
    company: 'Multi-Location Auto Dealer',
    timeline: '2 Months',
    crisis: 'Inventory management consuming 8 hours daily, 35% of vehicles sitting too long',
    breakthrough: 'AI inventory optimization predicted demand 30 days in advance',
    domination: '240% inventory turnover, $3.2M cash flow improvement, management focus on expansion',
    meaningForYou: 'If inventory management is consuming your leadership time, here\'s rapid relief.',
    metrics: {
      primary: '240%',
      secondary: '$3.2M',
      tertiary: '8hrs'
    },
    industry: 'Automotive'
  },
  {
    id: 'restaurant-chain-optimization',
    tier: 'proof',
    title: 'RESTAURANT CHAIN\'S 45-DAY PROFIT SURGE',
    company: 'Regional Restaurant Chain',
    timeline: '1.5 Months',
    crisis: 'Food waste and staffing decisions eating 18% of profits',
    breakthrough: 'Predictive analytics optimized inventory and scheduling simultaneously',
    domination: '180% profit margin improvement, $1.8M annual savings, expansion planning accelerated',
    meaningForYou: 'If operational waste is killing your margins, rapid optimization is achievable.',
    metrics: {
      primary: '180%',
      secondary: '$1.8M',
      tertiary: '18%'
    },
    industry: 'Restaurant'
  },
  {
    id: 'construction-project-acceleration',
    tier: 'proof',
    title: 'CONSTRUCTION FIRM\'S PROJECT ACCELERATION',
    company: 'Commercial Construction Company',
    timeline: '2 Months',
    crisis: 'Project delays averaging 6 weeks, client satisfaction dropping to 67%',
    breakthrough: 'AI project management predicted and prevented 89% of potential delays',
    domination: '95% on-time completion rate, client satisfaction to 94%, $4.1M in delay penalties avoided',
    meaningForYou: 'If project delays are damaging your reputation, predictive management works.',
    metrics: {
      primary: '95%',
      secondary: '$4.1M',
      tertiary: '6wks'
    },
    industry: 'Construction'
  },
  {
    id: 'legal-firm-efficiency',
    tier: 'proof',
    title: 'LAW FIRM\'S BILLABLE HOUR BREAKTHROUGH',
    company: 'Corporate Law Firm',
    timeline: '2.5 Months',
    crisis: 'Document review consuming 40% of billable hours, junior associates overwhelmed',
    breakthrough: 'AI document analysis freed 32 hours weekly per attorney',
    domination: '220% billable hour efficiency, $2.7M revenue increase, attorney satisfaction soared',
    meaningForYou: 'If routine work is consuming your high-value time, automation liberation is rapid.',
    metrics: {
      primary: '220%',
      secondary: '$2.7M',
      tertiary: '40%'
    },
    industry: 'Legal'
  },
  {
    id: 'insurance-claims-revolution',
    tier: 'proof',
    title: 'INSURANCE FIRM\'S CLAIMS PROCESSING REVOLUTION',
    company: 'Regional Insurance Provider',
    timeline: '3 Months',
    crisis: 'Claims processing taking 21 days average, customer satisfaction at 71%',
    breakthrough: 'AI claims analysis reduced processing time to 3.2 days average',
    domination: '85% faster claims processing, customer satisfaction to 91%, $1.9M operational savings',
    meaningForYou: 'If slow processes are hurting customer experience, rapid transformation is proven.',
    metrics: {
      primary: '85%',
      secondary: '$1.9M',
      tertiary: '21d'
    },
    industry: 'Insurance'
  }
];

export default function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intersection Observer for card animations
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

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'flagship': return Trophy;
      case 'authority': return Target;
      case 'proof': return Zap;
      default: return Star;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'flagship': return 'FLAGSHIP RESULT';
      case 'authority': return 'INDUSTRY AUTHORITY';
      case 'proof': return 'SPEED WIN';
      default: return 'TRANSFORMATION';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'flagship': return 'from-red-600 to-red-700';
      case 'authority': return 'from-amber-600 to-amber-700';
      case 'proof': return 'from-emerald-600 to-emerald-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const flagshipTransformations = transformations.filter(t => t.tier === 'flagship');
  const authorityTransformations = transformations.filter(t => t.tier === 'authority');
  const proofTransformations = transformations.filter(t => t.tier === 'proof');

  return (
    <div className="min-h-screen bg-black relative">
      <Header />
      
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
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-light tracking-wider uppercase">Transformation Gallery</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white leading-tight mb-6">
              $127M+ In Hidden{' '}
              <span 
                className="font-extralight italic text-red-400"
              >
                Opportunities
              </span>{' '}
              Revealed
            </h1>
            
            <p className="text-xl font-extralight text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              These transformations prove your biggest challenges are completely solvable. 
              See exactly how we've turned impossible situations into market dominance.
            </p>

            <div className="bg-black/40 backdrop-blur-sm border border-red-600/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-lg font-light text-red-400 mb-2">
                Only 23 transformations like these completed worldwide
              </p>
              <p className="text-sm font-extralight text-white/70">
                Your competitors are making the same mistakes these companies were
              </p>
            </div>
          </div>

          {/* TIER 1: FLAGSHIP RESULTS */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                <Trophy className="inline-block w-8 h-8 mr-3 text-red-400" />
                Flagship Results
              </h2>
              <p className="text-lg font-extralight text-white/70">
                The most impressive outcomes that redefined entire industries
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {flagshipTransformations.map((transformation) => {
                const TierIcon = getTierIcon(transformation.tier);
                const isVisible = visibleCards.has(transformation.id);
                
                return (
                  <div
                    key={transformation.id}
                    id={transformation.id}
                    ref={el => cardRefs.current[transformation.id] = el}
                    className="relative group cursor-pointer transform transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                      transitionDelay: `${flagshipTransformations.indexOf(transformation) * 0.2}s`
                    }}
                    onMouseEnter={() => setHoveredCard(transformation.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card - 20% larger for flagship */}
                    <div className="bg-black/40 backdrop-blur-sm border-2 border-red-600/40 rounded-3xl p-8 hover:border-red-600/60 transition-all duration-500 group-hover:bg-black/50 transform scale-110">
                      {/* Flagship Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`bg-gradient-to-r ${getTierColor(transformation.tier)} text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center space-x-2`}>
                          <TierIcon className="w-3 h-3" />
                          <span>{getTierBadge(transformation.tier)}</span>
                        </div>
                        <span className="text-white/60 text-xs font-light">
                          {transformation.timeline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-3">
                        {transformation.title}
                      </h3>
                      
                      <p className="text-sm text-red-400 font-medium mb-6">
                        {transformation.company}
                      </p>

                      {/* Key Metrics */}
                      <div className="flex justify-between mb-6 bg-black/30 rounded-xl p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{transformation.metrics.primary}</div>
                          <div className="text-xs text-white/60 font-light">Primary</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{transformation.metrics.secondary}</div>
                          <div className="text-xs text-white/60 font-light">Impact</div>
                        </div>
                        {transformation.metrics.tertiary && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{transformation.metrics.tertiary}</div>
                            <div className="text-xs text-white/60 font-light">Saved</div>
                          </div>
                        )}
                      </div>

                      {/* Story Structure */}
                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="text-red-400 font-medium">THE CRISIS: </span>
                          <span className="text-white/90 font-light">{transformation.crisis}</span>
                        </div>
                        
                        <div>
                          <span className="text-amber-400 font-medium">THE BREAKTHROUGH: </span>
                          <span className="text-white/90 font-light">{transformation.breakthrough}</span>
                        </div>
                        
                        <div>
                          <span className="text-emerald-400 font-medium">THE DOMINATION: </span>
                          <span className="text-white/90 font-light">{transformation.domination}</span>
                        </div>
                        
                        <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-4 mt-4">
                          <span className="text-red-300 font-medium">WHAT THIS MEANS FOR YOU: </span>
                          <span className="text-white/90 font-light">{transformation.meaningForYou}</span>
                        </div>
                      </div>

                      {/* Authority Elements */}
                      {transformation.scarcityNote && (
                        <div className="mt-4 text-xs text-amber-400 font-light italic">
                          {transformation.scarcityNote}
                        </div>
                      )}
                      
                      {transformation.authorityQuote && (
                        <div className="mt-3 text-xs text-emerald-400 font-light">
                          "{transformation.authorityQuote}"
                        </div>
                      )}
                      
                      {transformation.socialProof && (
                        <div className="mt-2 text-xs text-white/60 font-light">
                          {transformation.socialProof}
                        </div>
                      )}

                      {/* Glow Effect */}
                      <div 
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)`,
                          filter: 'blur(20px)'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIER 2: AUTHORITY CARDS */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                <Target className="inline-block w-8 h-8 mr-3 text-amber-400" />
                Industry Authority
              </h2>
              <p className="text-lg font-extralight text-white/70">
                Proven solutions across major verticals with clear ROI demonstration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorityTransformations.map((transformation) => {
                const TierIcon = getTierIcon(transformation.tier);
                const isVisible = visibleCards.has(transformation.id);
                
                return (
                  <div
                    key={transformation.id}
                    id={transformation.id}
                    ref={el => cardRefs.current[transformation.id] = el}
                    className="relative group cursor-pointer"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                      transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                      transitionDelay: `${authorityTransformations.indexOf(transformation) * 0.1}s`
                    }}
                  >
                    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-amber-600/30 transition-all duration-300 group-hover:bg-black/40">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`bg-gradient-to-r ${getTierColor(transformation.tier)} text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1`}>
                          <TierIcon className="w-3 h-3" />
                          <span>{transformation.industry}</span>
                        </div>
                        <span className="text-white/60 text-xs font-light">
                          {transformation.timeline}
                        </span>
                      </div>

                      <h3 className="text-lg font-light text-white group-hover:text-amber-400 transition-colors duration-300 mb-4">
                        {transformation.title}
                      </h3>

                      {/* Metrics */}
                      <div className="flex justify-between mb-4 bg-black/20 rounded-lg p-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-amber-600">{transformation.metrics.primary}</div>
                          <div className="text-xs text-white/60">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-amber-600">{transformation.metrics.secondary}</div>
                          <div className="text-xs text-white/60">Value</div>
                        </div>
                      </div>

                      {/* Condensed Story */}
                      <div className="space-y-2 text-xs">
                        <p><span className="text-red-300 font-medium">Crisis:</span> <span className="text-white/80">{transformation.crisis.substring(0, 80)}...</span></p>
                        <p><span className="text-emerald-300 font-medium">Result:</span> <span className="text-white/80">{transformation.domination.substring(0, 80)}...</span></p>
                      </div>

                      {/* Authority Quote */}
                      {transformation.authorityQuote && (
                        <div className="mt-3 text-xs text-amber-300 italic">
                          "{transformation.authorityQuote}"
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIER 3: SPEED WINS */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                <Zap className="inline-block w-8 h-8 mr-3 text-emerald-400" />
                Speed Wins
              </h2>
              <p className="text-lg font-extralight text-white/70">
                Rapid implementations with immediate impact - proof that transformation doesn't take years
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proofTransformations.map((transformation) => {
                const TierIcon = getTierIcon(transformation.tier);
                const isVisible = visibleCards.has(transformation.id);
                
                return (
                  <div
                    key={transformation.id}
                    id={transformation.id}
                    ref={el => cardRefs.current[transformation.id] = el}
                    className="relative group cursor-pointer"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                      transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      transitionDelay: `${proofTransformations.indexOf(transformation) * 0.05}s`
                    }}
                  >
                    {/* Compact Card */}
                    <div className="bg-black/25 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-emerald-600/30 transition-all duration-300 group-hover:bg-black/35">
                      {/* Compact Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`bg-gradient-to-r ${getTierColor(transformation.tier)} text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center space-x-1`}>
                          <TierIcon className="w-2.5 h-2.5" />
                          <span>{transformation.timeline}</span>
                        </div>
                        <Clock className="w-4 h-4 text-emerald-400" />
                      </div>

                      <h3 className="text-base font-light text-white group-hover:text-emerald-400 transition-colors duration-300 mb-3 leading-tight">
                        {transformation.title}
                      </h3>

                      {/* Quick Metrics */}
                      <div className="flex justify-between mb-3">
                        <div className="text-center">
                          <div className="text-base font-bold text-emerald-500">{transformation.metrics.primary}</div>
                          <div className="text-xs text-white/50">Boost</div>
                        </div>
                        <div className="text-center">
                          <div className="text-base font-bold text-emerald-500">{transformation.metrics.secondary}</div>
                          <div className="text-xs text-white/50">Value</div>
                        </div>
                      </div>

                      {/* Quick Win Summary */}
                      <p className="text-xs text-white/80 leading-relaxed">
                        {transformation.meaningForYou}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HORMOZI POWER CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-black/60 via-red-900/20 to-black/60 backdrop-blur-sm border-2 border-red-600/30 rounded-3xl p-12 max-w-5xl mx-auto relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 25% 25%, #ef4444 0%, transparent 50%), radial-gradient(circle at 75% 75%, #dc2626 0%, transparent 50%)',
                  backgroundSize: '100px 100px'
                }} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  STOP LEAVING{' '}
                  <span className="text-red-400">$MILLIONS</span>{' '}
                  ON THE TABLE
                </h3>
                
                <p className="text-xl font-light text-white/90 mb-4 leading-relaxed">
                  In the past 18 months, these transformations revealed{' '}
                  <span className="text-red-400 font-medium">$127M+</span> in missed opportunities.
                </p>
                
                <p className="text-lg font-light text-white/80 mb-8">
                  Your competitors are making the same mistakes these companies were.
                </p>
                
                <p className="text-xl font-medium text-white mb-8">
                  Get your <span className="text-red-400">FREE Vision Gap Analysis</span> and discover what you're missing:
                </p>
                
                <button className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-6 rounded-full text-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-4 mx-auto mb-6 shadow-2xl shadow-red-600/25">
                  <span>REVEAL MY HIDDEN OPPORTUNITIES</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <p className="text-sm font-light text-white/70 mb-6">
                  Takes 90 seconds. Shows 7-8 figure potential.
                </p>
                
                {/* Urgency & Risk Reversal */}
                <div className="space-y-3 text-sm">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-4">
                    <p className="text-red-300 font-medium">
                      ⚡ We only accept 3 new Vision Elevation clients per quarter. Current spots filling for Q1 2026.
                    </p>
                  </div>
                  
                  <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-xl p-4">
                    <p className="text-emerald-300 font-medium">
                      🛡️ If we don't identify at least $500K in new opportunities, the analysis is free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}