import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Filter, TrendingUp, Clock, Target, Star, Award, Zap, Building2, Code, Heart, DollarSign, Users, Briefcase } from 'lucide-react';
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
  category: 'manufacturing' | 'technology' | 'healthcare' | 'financial';
  metrics: {
    before: string;
    after: string;
    result: string;
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  scarcity?: string;
  authority?: string;
  socialProof?: string;
  relevanceScore?: number;
  viewCount?: number;
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
    category: 'manufacturing',
    metrics: {
      before: '$50M Stalled Pipeline',
      after: '$62M Active Pipeline',
      result: '467% Qualified Leads',
      primary: '467%',
      secondary: '$12M',
      tertiary: '60%'
    },
    scarcity: 'Only 23 transformations like this completed worldwide',
    authority: 'Fortune 500 leadership team calls this "impossible made routine"',
    socialProof: '3 competitors tried to replicate this approach - all failed',
    relevanceScore: 95,
    viewCount: 347
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
    category: 'financial',
    metrics: {
      before: '$18M Revenue at Risk',
      after: '$36M ARR Secured',
      result: '520% Acquisition Velocity',
      primary: '520%',
      secondary: '$18M',
      tertiary: '45%'
    },
    scarcity: 'First FinTech transformation of this scale ever documented',
    authority: 'Board of Directors: "This saved our company and our careers"',
    socialProof: 'Now teaching this methodology to other Series B companies',
    relevanceScore: 92,
    viewCount: 289
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
    category: 'healthcare',
    metrics: {
      before: '4hrs Daily Executive Time',
      after: '18mo Market Entry Acceleration',
      result: '$2.4M Revenue Boost',
      primary: '$2.4M',
      secondary: '18mo',
      tertiary: '4hrs'
    },
    scarcity: 'Only healthcare transformation to achieve sub-6-month market entry',
    authority: 'Chief Medical Officer: "This changed how we think about growth"',
    socialProof: '2 major health systems now studying this approach',
    relevanceScore: 88,
    viewCount: 234
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
    category: 'technology',
    metrics: {
      before: '50 Employee Ceiling',
      after: '150 Team Members',
      result: '$8M Valuation Increase',
      primary: '300%',
      secondary: '$8M',
      tertiary: '73%'
    },
    authority: 'CEO: "Finally free to think about the future instead of today\'s problems"',
    relevanceScore: 91,
    viewCount: 156
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
    category: 'manufacturing',
    metrics: {
      before: '6mo Decision Timeline',
      after: '5 New Markets Opened',
      result: '180% Revenue Growth',
      primary: '180%',
      secondary: '5',
      tertiary: '6mo'
    },
    authority: 'Board Chairman: "This gave us the speed advantage we needed"',
    relevanceScore: 84,
    viewCount: 198
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
    category: 'manufacturing',
    metrics: {
      before: '6hrs Daily Manual Work',
      after: '90% Process Automation',
      result: '$5.2M Cost Savings',
      primary: '340%',
      secondary: '$5.2M',
      tertiary: '6hrs'
    },
    authority: 'Operations Director: "We went from reactive to predictive overnight"',
    relevanceScore: 87,
    viewCount: 143
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
    category: 'technology',
    metrics: {
      before: '28% Monthly Churn',
      after: '4% Monthly Churn',
      result: '$12M Revenue Recovery',
      primary: '85%',
      secondary: '$12M',
      tertiary: '28%'
    },
    authority: 'Investor: "This single change made them fundable again"',
    relevanceScore: 93,
    viewCount: 267
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
    category: 'financial',
    metrics: {
      before: '3wks Per Evaluation',
      after: '24hrs Per Evaluation',
      result: '$25M Portfolio Growth',
      primary: '15x',
      secondary: '$25M',
      tertiary: '3wks'
    },
    authority: 'Managing Partner: "We can now compete with the biggest funds"',
    relevanceScore: 89,
    viewCount: 178
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
    category: 'technology',
    metrics: {
      before: '2.1% Conversion Rate',
      after: '6.1% Conversion Rate',
      result: '$8.7M Revenue Boost',
      primary: '290%',
      secondary: '$8.7M',
      tertiary: '2.1%'
    },
    authority: 'CMO: "This turned our traffic into a revenue goldmine"',
    relevanceScore: 86,
    viewCount: 201
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
    category: 'healthcare',
    metrics: {
      before: '40hrs Per Proposal',
      after: '2hrs Per Proposal',
      result: '5x More Clients',
      primary: '2000%',
      secondary: '5x',
      tertiary: '40hrs'
    },
    relevanceScore: 82,
    viewCount: 134
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
    category: 'healthcare',
    metrics: {
      before: '8hrs Per Contract',
      after: '30min Per Contract',
      result: 'Premium Pricing',
      primary: '1600%',
      secondary: '30min',
      tertiary: '8hrs'
    },
    relevanceScore: 79,
    viewCount: 98
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
    category: 'financial',
    metrics: {
      before: '14 Days Processing',
      after: '2hrs Processing',
      result: 'Customer Satisfaction',
      primary: '8400%',
      secondary: '2hrs',
      tertiary: '14days'
    },
    relevanceScore: 85,
    viewCount: 167
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
    category: 'healthcare',
    metrics: {
      before: '2wks Per Match',
      after: 'Instant Matching',
      result: '400% Enrollment',
      primary: '400%',
      secondary: 'Instant',
      tertiary: '2wks'
    },
    relevanceScore: 81,
    viewCount: 145
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
    category: 'healthcare',
    metrics: {
      before: '4hrs Daily Pricing',
      after: 'Automated Pricing',
      result: '180% Revenue/Room',
      primary: '180%',
      secondary: 'Auto',
      tertiary: '4hrs'
    },
    relevanceScore: 77,
    viewCount: 112
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
    category: 'manufacturing',
    metrics: {
      before: 'Guesswork Planning',
      after: 'Data-Driven Decisions',
      result: '250% Yield Increase',
      primary: '250%',
      secondary: 'Data',
      tertiary: 'Guess'
    },
    relevanceScore: 74,
    viewCount: 89
  }
];

const categories = [
  { id: 'all', name: 'All Industries', icon: Target, count: 15 },
  { id: 'manufacturing', name: 'Manufacturing & Industrial', icon: Building2, count: 4 },
  { id: 'technology', name: 'Technology & SaaS', icon: Code, count: 4 },
  { id: 'healthcare', name: 'Healthcare & Services', icon: Heart, count: 4 },
  { id: 'financial', name: 'Financial & Real Estate', icon: DollarSign, count: 3 }
];

export default function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCTA, setShowCTA] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const ctaRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Filter transformations by category
  const filteredTransformations = selectedCategory === 'all' 
    ? transformations 
    : transformations.filter(t => t.category === selectedCategory);

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
  }, [filteredTransformations]);

  // CTA visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCTA(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'flagship':
        return {
          size: 'scale-110 lg:scale-125',
          border: 'border-red-600/60 shadow-red-600/25',
          glow: 'shadow-2xl',
          badge: 'FLAGSHIP RESULT',
          badgeColor: 'bg-red-600',
          icon: Star,
          cardClass: 'flagship-card'
        };
      case 'authority':
        return {
          size: 'scale-100',
          border: 'border-white/20 shadow-black/25',
          glow: 'shadow-lg',
          badge: 'AUTHORITY PROOF',
          badgeColor: 'bg-amber-600',
          icon: Award,
          cardClass: 'authority-card'
        };
      case 'proof':
        return {
          size: 'scale-95',
          border: 'border-white/10 shadow-black/20',
          glow: 'shadow-md',
          badge: 'SPEED WIN',
          badgeColor: 'bg-emerald-600',
          icon: Zap,
          cardClass: 'proof-card'
        };
      default:
        return {
          size: 'scale-100',
          border: 'border-white/20 shadow-black/25',
          glow: 'shadow-lg',
          badge: 'TRANSFORMATION',
          badgeColor: 'bg-gray-600',
          icon: Target,
          cardClass: 'default-card'
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
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-light tracking-wider uppercase">Impossible Results Made Routine</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Business Challenges We've{' '}
              <span className="font-extralight italic text-red-400">
                Transformed
              </span>{' '}
              Into Market Dominance
            </h1>
            
            <p className="text-xl font-extralight text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              15 unique transformations. $127M+ in revealed opportunities. 
              Proof that your "impossible" challenge has been solved before.
            </p>

            {/* Industry Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'bg-black/40 border-white/20 text-white/80 hover:border-red-600/50 hover:bg-red-600/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-light">{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20'
                        : 'bg-white/10'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transformations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {filteredTransformations.map((transformation) => {
              const tierConfig = getTierConfig(transformation.tier);
              const IconComponent = tierConfig.icon;
              const isVisible = visibleCards.has(transformation.id);

              return (
                <div
                  key={transformation.id}
                  id={transformation.id}
                  ref={el => cardRefs.current[transformation.id] = el}
                  className={`relative group cursor-pointer transition-all duration-500 ${tierConfig.size} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${tierConfig.cardClass}`}
                  style={{
                    transitionDelay: `${Math.random() * 0.3}s`
                  }}
                >
                  {/* Flagship Glow Effect */}
                  {transformation.tier === 'flagship' && (
                    <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-red-600/10 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  {/* Card Container */}
                  <div className={`relative bg-black/40 backdrop-blur-sm border ${tierConfig.border} ${tierConfig.glow} rounded-2xl p-6 hover:border-red-600/40 transition-all duration-300 h-full`}>
                    {/* Tier Badge */}
                    <div className={`inline-flex items-center space-x-2 ${tierConfig.badgeColor} text-white text-xs font-medium px-3 py-1 rounded-full mb-4`}>
                      <IconComponent className="w-3 h-3" />
                      <span>{tierConfig.badge}</span>
                    </div>

                    {/* Social Proof Indicators */}
                    {transformation.relevanceScore && (
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <div className="flex items-center space-x-2 text-emerald-400">
                          <Users className="w-3 h-3" />
                          <span>{transformation.viewCount} CEOs viewed this month</span>
                        </div>
                        <div className="text-amber-400">
                          {transformation.relevanceScore}% relevant to you
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-red-600/20 text-red-400 text-xs font-medium px-2 py-1 rounded-full">
                          {transformation.industry}
                        </span>
                        <span className="text-white/60 text-xs font-light">
                          {transformation.timeline}
                        </span>
                      </div>
                      <h3 className={`font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-1 leading-tight ${
                        transformation.tier === 'flagship' ? 'text-xl lg:text-2xl' : 'text-lg'
                      }`}>
                        {transformation.title}
                      </h3>
                      <p className="text-sm text-white/70 font-light">
                        {transformation.company}
                      </p>
                    </div>

                    {/* Enhanced Metrics - Visual Impact */}
                    <div className={`mb-4 bg-black/20 rounded-lg p-4 ${
                      transformation.tier === 'flagship' ? 'border border-red-600/20' : ''
                    }`}>
                      {/* Before/After Comparison for Flagship */}
                      {transformation.tier === 'flagship' ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-center flex-1">
                              <div className="text-red-400 text-xs font-semibold uppercase mb-1">FROM</div>
                              <div className="text-red-300 text-sm font-medium">{transformation.metrics.before}</div>
                            </div>
                            <div className="mx-4">
                              <ArrowRight className="w-6 h-6 text-white/60" />
                            </div>
                            <div className="text-center flex-1">
                              <div className="text-emerald-400 text-xs font-semibold uppercase mb-1">TO</div>
                              <div className="text-emerald-300 text-sm font-medium">{transformation.metrics.after}</div>
                            </div>
                          </div>
                          <div className="text-center pt-2 border-t border-white/10">
                            <div className="text-white text-xs font-semibold uppercase mb-1">RESULT</div>
                            <div className="text-2xl font-bold text-red-600">{transformation.metrics.result}</div>
                          </div>
                        </div>
                      ) : (
                        // Standard metrics for other tiers
                        <div className="flex justify-between">
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-600">{transformation.metrics.primary}</div>
                            <div className="text-xs text-white/60 font-light">Impact</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-600">{transformation.metrics.secondary}</div>
                            <div className="text-xs text-white/60 font-light">Growth</div>
                          </div>
                          {transformation.metrics.tertiary && (
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">{transformation.metrics.tertiary}</div>
                              <div className="text-xs text-white/60 font-light">Before</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Story Structure */}
                    <div className="space-y-3 mb-4">
                      <div className="bg-red-600/10 border-l-2 border-red-600/50 pl-3 py-2">
                        <span className="text-red-400 text-xs font-semibold uppercase tracking-wide">🚨 THE CRISIS:</span>
                        <p className="text-sm text-white/80 font-light leading-relaxed mt-1">{transformation.crisis}</p>
                      </div>
                      
                      <div className="bg-black/20 border-l-2 border-amber-600/50 pl-3 py-2">
                        <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">⚡ THE BREAKTHROUGH:</span>
                        <p className="text-sm text-white/80 font-light leading-relaxed mt-1">{transformation.breakthrough}</p>
                      </div>
                      
                      <div className="bg-emerald-600/10 border-l-2 border-emerald-600/50 pl-3 py-2">
                        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">👑 THE DOMINATION:</span>
                        <p className="text-sm text-white/80 font-light leading-relaxed mt-1">{transformation.domination}</p>
                      </div>
                    </div>

                    {/* What This Means For You */}
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3 mb-4">
                      <span className="text-red-400 text-xs font-semibold uppercase tracking-wide">WHAT THIS MEANS FOR YOU:</span>
                      <p className="text-sm text-white/90 font-light leading-relaxed mt-1">{transformation.meaningForYou}</p>
                    </div>

                    {/* Psychological Triggers (for flagship cards) */}
                    {transformation.tier === 'flagship' && (
                      <div className="space-y-2 text-xs">
                        {transformation.scarcity && (
                          <div className="flex items-center space-x-2 text-amber-400">
                            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                            <span className="font-light italic">{transformation.scarcity}</span>
                          </div>
                        )}
                        {transformation.authority && (
                          <div className="flex items-center space-x-2 text-emerald-400">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                            <span className="font-light italic">"{transformation.authority}"</span>
                          </div>
                        )}
                        {transformation.socialProof && (
                          <div className="flex items-center space-x-2 text-blue-400">
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

                    {/* Urgency for Speed Wins */}
                    {transformation.tier === 'proof' && (
                      <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-lg p-2 text-xs text-emerald-400">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Similar transformation available - 2 Q1 spots remaining
                      </div>
                    )}

                    {/* Hover Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, rgba(239, 68, 68, 0.05) 0%, transparent 70%)`,
                        filter: 'blur(15px)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progressive CTA Strategy */}
          <div className="text-center mb-8">
            <button className="group bg-black/40 backdrop-blur-sm border border-red-600/30 text-red-400 px-8 py-3 rounded-full font-light hover:bg-red-600/10 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <span>Which Result Interests You Most?</span>
              <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Hormozi Power CTA */}
          <div ref={ctaRef} className="mt-20 text-center">
            <div className="bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-3xl p-8 lg:p-12 max-w-5xl mx-auto relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20"></div>
              </div>
              
              <div className="relative z-10">
                {/* Power Headline */}
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  STOP LEAVING{' '}
                  <span className="text-red-400">$MILLIONS</span>{' '}
                  ON THE TABLE
                </h2>
                
                {/* Social Proof */}
                <div className="bg-red-600/20 border border-red-600/30 rounded-xl p-6 mb-8">
                  <p className="text-xl font-light text-white mb-4">
                    In the past 18 months, these transformations revealed{' '}
                    <span className="font-bold text-red-400">$127M+</span> in missed opportunities.
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
                <p className="text-sm font-light text-white/70 mb-8">
                  "Takes 90 seconds. Shows 7-8 figure potential."
                </p>
                
                {/* Urgency & Risk Reversal */}
                <div className="space-y-4 text-sm font-light text-white/80">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="italic">We only accept 3 new Vision Elevation clients per quarter. Current spots filling for Q1 2026.</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="italic">If we don't identify at least $500K in new opportunities, the analysis is free.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        showCTA ? 'translate-y-full' : 'translate-y-0'
      }`}>
        <div className="bg-black/90 backdrop-blur-sm border-t border-red-600/30 p-4">
          <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-2">
            <span>REVEAL MY OPPORTUNITIES</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}