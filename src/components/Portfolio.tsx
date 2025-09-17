import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Filter, TrendingUp, Clock, Target, Star, Award, Zap } from 'lucide-react';
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
  industry: string;
  metrics: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  scarcity?: string;
  authority?: string;
  socialProof?: string;
}

const transformations: Transformation[] = [
  // TIER 1: FLAGSHIP RESULTS (Top 3 - Hero Cards)
  {
    id: 'manufacturing-flagship',
    tier: 'flagship',
    title: 'MANUFACTURING LEADERSHIP BREAKTHROUGH',
    company: 'Fortune 500 Company',
    timeline: '4 Months',
    crisis: '$50M pipeline stalled - 60% of sales time wasted on unqualified leads',
    breakthrough: 'AI revealed $12M in ignored high-value prospects hiding in their existing data',
    domination: '467% qualified pipeline increase → Market leadership achieved in 6 months',
    meaningForYou: 'If you\'re losing deals to lead quality issues, this shows exactly what\'s possible.',
    industry: 'Manufacturing',
    metrics: {
      primary: '467%',
      secondary: '$12M',
      tertiary: '60%'
    },
    scarcity: 'Only 23 transformations like this completed worldwide',
    authority: 'Fortune 500 leadership team calls this "impossible made routine"',
    socialProof: '3 competitors tried to replicate this approach - all failed'
  },
  {
    id: 'fintech-flagship',
    tier: 'flagship',
    title: 'HOW WE SAVED FINTECH CEO FROM $18M REVENUE COLLAPSE',
    company: 'Series B FinTech',
    timeline: '3 Months',
    crisis: '3 months from bankruptcy - 45% customer abandonment during 14-day onboarding',
    breakthrough: 'THE BREAKTHROUGH MOMENT: When their AI system identified 520% more qualified prospects in week 3',
    domination: '$18M ARR recovery + 520% acquisition velocity → Now industry benchmark',
    meaningForYou: 'If your onboarding is killing conversions, here\'s proof it\'s completely fixable.',
    industry: 'FinTech',
    metrics: {
      primary: '520%',
      secondary: '$18M',
      tertiary: '45%'
    },
    scarcity: 'First FinTech transformation of this scale ever documented',
    authority: 'Board of Directors: "This saved our company and our careers"',
    socialProof: 'Now teaching this methodology to other Series B companies'
  },
  {
    id: 'healthcare-flagship',
    tier: 'flagship',
    title: 'HEALTHCARE NETWORK DOMINATION STRATEGY',
    company: 'Regional Healthcare Network',
    timeline: '5 Months',
    crisis: 'Patient routing consuming 4 hours daily executive time - growth impossible',
    breakthrough: 'Intelligent workflow revealed 40% hidden capacity + $2.4M acceleration opportunity',
    domination: 'New market entry 18 months early → $2.4M revenue acceleration achieved',
    meaningForYou: 'If operational bottlenecks are blocking your expansion, this proves breakthrough is possible.',
    industry: 'Healthcare',
    metrics: {
      primary: '$2.4M',
      secondary: '18mo',
      tertiary: '4hrs'
    },
    scarcity: 'Only healthcare transformation to achieve sub-6-month market entry',
    authority: 'Chief Medical Officer: "This changed how we think about growth"',
    socialProof: '2 major health systems now studying this approach'
  },

  // TIER 2: INDUSTRY RELEVANCE (Next 6 - Authority Cards)
  {
    id: 'technology-authority',
    tier: 'authority',
    title: 'TECHNOLOGY FIRM SCALING BREAKTHROUGH',
    company: 'High-Growth SaaS',
    timeline: '7 Months',
    crisis: 'Founders trapped in operational decisions - scaling impossible beyond 50 employees',
    breakthrough: 'Executive liberation framework automated 73% of routine decisions',
    domination: '300% team scaling + $8M valuation increase → Strategic partnerships unlocked',
    meaningForYou: 'If you\'re stuck in operations instead of strategy, this shows the way out.',
    industry: 'Technology',
    metrics: {
      primary: '300%',
      secondary: '$8M',
      tertiary: '73%'
    },
    authority: 'CEO: "Finally free to think about the future instead of today\'s problems"'
  },
  {
    id: 'retail-authority',
    tier: 'authority',
    title: 'RETAIL EXPANSION INTELLIGENCE SYSTEM',
    company: 'Regional Retail Chain',
    timeline: '8 Months',
    crisis: 'Market entry decisions taking 6 months each - competitors moving faster',
    breakthrough: 'AI market intelligence reduced analysis from months to days',
    domination: '5 new markets opened + 180% revenue growth → Acquisition discussions started',
    meaningForYou: 'If slow decision-making is costing you market opportunities, here\'s your solution.',
    industry: 'Retail',
    metrics: {
      primary: '180%',
      secondary: '5',
      tertiary: '6mo'
    },
    authority: 'Board Chairman: "This gave us the speed advantage we needed"'
  },
  {
    id: 'logistics-authority',
    tier: 'authority',
    title: 'LOGISTICS NETWORK OPTIMIZATION MASTERY',
    company: 'National Logistics Provider',
    timeline: '4 Months',
    crisis: 'Route optimization consuming 6 hours daily - operational costs spiraling',
    breakthrough: 'Real-time AI orchestration automated 90% of routing decisions',
    domination: '340% delivery efficiency + $5.2M operational savings → Market leadership',
    meaningForYou: 'If manual processes are eating your margins, this shows massive savings potential.',
    industry: 'Logistics',
    metrics: {
      primary: '340%',
      secondary: '$5.2M',
      tertiary: '6hrs'
    },
    authority: 'Operations Director: "We went from reactive to predictive overnight"'
  },
  {
    id: 'saas-authority',
    tier: 'authority',
    title: 'SAAS CUSTOMER RETENTION REVOLUTION',
    company: 'B2B SaaS Platform',
    timeline: '5 Months',
    crisis: '28% monthly churn destroying growth - investors threatening to pull funding',
    breakthrough: 'Predictive analytics identified at-risk customers 60 days early',
    domination: '85% churn reduction + $12M revenue recovery → Series B funding secured',
    meaningForYou: 'If churn is killing your growth, here\'s proof it can be virtually eliminated.',
    industry: 'SaaS',
    metrics: {
      primary: '85%',
      secondary: '$12M',
      tertiary: '28%'
    },
    authority: 'Investor: "This single change made them fundable again"'
  },
  {
    id: 'realestate-authority',
    tier: 'authority',
    title: 'REAL ESTATE INVESTMENT ACCELERATION',
    company: 'Commercial Real Estate Fund',
    timeline: '6 Months',
    crisis: '3 weeks per property evaluation limiting portfolio growth to 12 deals/year',
    breakthrough: 'Investment intelligence automation reduced evaluation to 24 hours',
    domination: '15x faster decisions + $25M portfolio expansion → Institutional partnerships',
    meaningForYou: 'If slow analysis is limiting your deal flow, this shows how to accelerate dramatically.',
    industry: 'Real Estate',
    metrics: {
      primary: '15x',
      secondary: '$25M',
      tertiary: '3wks'
    },
    authority: 'Managing Partner: "We can now compete with the biggest funds"'
  },
  {
    id: 'ecommerce-authority',
    tier: 'authority',
    title: 'E-COMMERCE CONVERSION OPTIMIZATION',
    company: 'Multi-Brand E-commerce',
    timeline: '4 Months',
    crisis: '2.1% conversion rate stagnation despite 300% traffic growth',
    breakthrough: 'Hyper-personalization engine tripled conversion rates across all brands',
    domination: '290% conversion increase + $8.7M revenue boost → Market expansion funded',
    meaningForYou: 'If your traffic isn\'t converting, here\'s how to unlock massive revenue from existing visitors.',
    industry: 'E-commerce',
    metrics: {
      primary: '290%',
      secondary: '$8.7M',
      tertiary: '2.1%'
    },
    authority: 'CMO: "This turned our traffic into a revenue goldmine"'
  },

  // TIER 3: SPEED WINS (Final 6 - Proof Cards)
  {
    id: 'consulting-proof',
    tier: 'proof',
    title: 'CONSULTING FIRM RAPID TRANSFORMATION',
    company: 'Management Consulting',
    timeline: '1.5 Months',
    crisis: 'Proposal generation taking 40 hours per client',
    breakthrough: 'AI proposal system reduced time to 2 hours',
    domination: '2000% efficiency gain → 5x more clients served',
    meaningForYou: 'Quick wins are possible - this shows immediate impact potential.',
    industry: 'Consulting',
    metrics: {
      primary: '2000%',
      secondary: '5x',
      tertiary: '40hrs'
    }
  },
  {
    id: 'legal-proof',
    tier: 'proof',
    title: 'LAW FIRM DOCUMENT INTELLIGENCE',
    company: 'Corporate Law Firm',
    timeline: '2 Months',
    crisis: 'Contract review taking 8 hours per document',
    breakthrough: 'Legal AI reduced review time to 30 minutes',
    domination: '1600% faster processing → Premium pricing justified',
    meaningForYou: 'Even complex professional services can be dramatically accelerated.',
    industry: 'Legal',
    metrics: {
      primary: '1600%',
      secondary: '30min',
      tertiary: '8hrs'
    }
  },
  {
    id: 'insurance-proof',
    tier: 'proof',
    title: 'INSURANCE CLAIMS AUTOMATION',
    company: 'Regional Insurance',
    timeline: '2.5 Months',
    crisis: 'Claims processing taking 14 days average',
    breakthrough: 'Intelligent claims system reduced to 2 hours',
    domination: '8400% faster processing → Customer satisfaction soared',
    meaningForYou: 'Regulatory industries can still achieve breakthrough speed improvements.',
    industry: 'Insurance',
    metrics: {
      primary: '8400%',
      secondary: '2hrs',
      tertiary: '14days'
    }
  },
  {
    id: 'education-proof',
    tier: 'proof',
    title: 'EDUCATION PLATFORM OPTIMIZATION',
    company: 'Online Education',
    timeline: '3 Months',
    crisis: 'Student matching taking 2 weeks per enrollment',
    breakthrough: 'AI matching reduced to instant recommendations',
    domination: 'Instant matching → 400% enrollment increase',
    meaningForYou: 'Service businesses can eliminate waiting periods entirely.',
    industry: 'Education',
    metrics: {
      primary: '400%',
      secondary: 'Instant',
      tertiary: '2wks'
    }
  },
  {
    id: 'hospitality-proof',
    tier: 'proof',
    title: 'HOSPITALITY REVENUE OPTIMIZATION',
    company: 'Boutique Hotel Chain',
    timeline: '2 Months',
    crisis: 'Pricing decisions taking 4 hours daily',
    breakthrough: 'Dynamic pricing AI automated all decisions',
    domination: 'Automated pricing → 180% revenue per room',
    meaningForYou: 'Even traditional industries can benefit from intelligent automation.',
    industry: 'Hospitality',
    metrics: {
      primary: '180%',
      secondary: 'Auto',
      tertiary: '4hrs'
    }
  },
  {
    id: 'agriculture-proof',
    tier: 'proof',
    title: 'AGRICULTURE YIELD PREDICTION',
    company: 'Commercial Farm Network',
    timeline: '1.5 Months',
    crisis: 'Crop planning based on guesswork and historical data',
    breakthrough: 'Predictive agriculture AI optimized planting decisions',
    domination: 'Data-driven farming → 250% yield improvement',
    meaningForYou: 'Any industry with planning cycles can benefit from predictive intelligence.',
    industry: 'Agriculture',
    metrics: {
      primary: '250%',
      secondary: 'Data',
      tertiary: 'Guess'
    }
  }
];

export default function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
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

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'flagship':
        return {
          size: 'scale-110',
          border: 'border-red-600/50',
          badge: 'FLAGSHIP RESULT',
          badgeColor: 'bg-red-600',
          icon: Star
        };
      case 'authority':
        return {
          size: 'scale-100',
          border: 'border-white/20',
          badge: 'AUTHORITY PROOF',
          badgeColor: 'bg-amber-600',
          icon: Award
        };
      case 'proof':
        return {
          size: 'scale-95',
          border: 'border-white/10',
          badge: 'SPEED WIN',
          badgeColor: 'bg-emerald-600',
          icon: Zap
        };
      default:
        return {
          size: 'scale-100',
          border: 'border-white/20',
          badge: 'TRANSFORMATION',
          badgeColor: 'bg-gray-600',
          icon: Target
        };
    }
  };

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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20 lg:mb-24">
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-light tracking-wider uppercase">Impossible Results Made Routine</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white leading-tight mb-8">
              Business Challenges We've{' '}
              <span className="font-extralight italic text-red-400">
                Transformed
              </span>{' '}
              Into Market Dominance
            </h1>
            
            <p className="text-lg lg:text-xl font-extralight text-white/80 max-w-3xl mx-auto leading-relaxed">
              15 unique transformations. $127M+ in revealed opportunities. 
              Proof that your "impossible" challenge has been solved before.
            </p>
          </div>

          {/* Transformations Grid */}
          <div className="space-y-12 lg:space-y-16 mb-20 lg:mb-24">
            {transformations.map((transformation) => {
              const tierConfig = getTierConfig(transformation.tier);
              const IconComponent = tierConfig.icon;
              const isVisible = visibleCards.has(transformation.id);

              return (
                <div
                  key={transformation.id}
                  id={transformation.id}
                  ref={el => cardRefs.current[transformation.id] = el}
                  className={`relative group cursor-pointer transition-all duration-500 max-w-5xl mx-auto ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${Math.random() * 0.3}s`
                  }}
                >
                  {/* Card Container */}
                  <div className={`relative bg-black/30 backdrop-blur-sm border ${tierConfig.border} rounded-2xl ${
                    transformation.tier === 'flagship' ? 'p-8 lg:p-10' : 'p-6 lg:p-8'
                  } hover:border-red-600/40 transition-all duration-300`}>
                    
                    {/* Tier Badge */}
                    <div className={`inline-flex items-center space-x-2 ${tierConfig.badgeColor} text-white text-xs font-medium px-4 py-2 rounded-full mb-6`}>
                      <IconComponent className="w-3 h-3" />
                      <span>{tierConfig.badge}</span>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-red-600/20 text-red-400 text-sm font-medium px-3 py-1 rounded-full">
                          {transformation.industry}
                        </span>
                        <span className="text-white/60 text-sm font-light">
                          {transformation.timeline}
                        </span>
                      </div>
                      <h3 className={`${
                        transformation.tier === 'flagship' ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                      } font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-3 leading-tight`}>
                        {transformation.title}
                      </h3>
                      <p className="text-white/70 font-light">
                        {transformation.company}
                      </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-8 bg-black/20 rounded-xl p-6">
                      <div className="flex justify-between">
                        <div className="text-center">
                          <div className="text-3xl lg:text-4xl font-bold text-red-600 mb-2">{transformation.metrics.primary}</div>
                          <div className="text-sm text-white/60 font-light">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl lg:text-4xl font-bold text-red-600 mb-2">{transformation.metrics.secondary}</div>
                          <div className="text-sm text-white/60 font-light">Growth</div>
                        </div>
                        {transformation.metrics.tertiary && (
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-red-600 mb-2">{transformation.metrics.tertiary}</div>
                            <div className="text-sm text-white/60 font-light">Before</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Story Structure */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">THE CRISIS:</span>
                        <p className="text-white/80 font-light leading-relaxed mt-2">{transformation.crisis}</p>
                      </div>
                      
                      <div>
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-wide">THE BREAKTHROUGH:</span>
                        <p className="text-white/80 font-light leading-relaxed mt-2">{transformation.breakthrough}</p>
                      </div>
                      
                      <div>
                        <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wide">THE DOMINATION:</span>
                        <p className="text-white/80 font-light leading-relaxed mt-2">{transformation.domination}</p>
                      </div>
                    </div>

                    {/* What This Means For You */}
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6">
                      <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">WHAT THIS MEANS FOR YOU:</span>
                      <p className="text-white/80 font-extralight leading-relaxed mt-2">{transformation.meaningForYou}</p>
                    </div>

                    {/* Social Proof Elements */}
                    {(transformation.scarcity || transformation.authority || transformation.socialProof) && (
                      <div className="space-y-2 text-xs">
                        {transformation.scarcity && (
                          <div className="flex items-center space-x-2 text-white/60">
                            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                            <span className="font-light italic">{transformation.scarcity}</span>
                          </div>
                        )}
                        {transformation.authority && (
                          <div className="flex items-center space-x-2 text-white/60">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                            <span className="font-light italic">"{transformation.authority}"</span>
                          </div>
                        )}
                        {transformation.socialProof && (
                          <div className="flex items-center space-x-2 text-white/60">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            <span className="font-light italic">{transformation.socialProof}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Authority Quote (for authority cards) */}
                    {transformation.tier === 'authority' && transformation.authority && (
                      <div className="border-l-2 border-amber-600/30 pl-3 text-xs text-white/70 italic">
                        "{transformation.authority}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hormozi Power CTA */}
          <div className="text-center">
            <div className="bg-black/40 backdrop-blur-sm border border-red-600/30 rounded-3xl p-10 lg:p-16 max-w-4xl mx-auto relative overflow-hidden">
              {/* Background Effect */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                  STOP LEAVING{' '}
                  <span className="text-red-400">$MILLIONS</span>{' '}
                  ON THE TABLE
                </h2>
                
                {/* Social Proof */}
                <div className="bg-red-600/20 border border-red-600/30 rounded-xl p-6 mb-8">
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
                <button className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-6 rounded-full font-bold text-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-4 mx-auto mb-6 shadow-2xl shadow-red-600/25">
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