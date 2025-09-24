import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Filter, TrendingUp, Clock, Target, Star, Award, Zap, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
}

const transformations: Transformation[] = [
  // FLAGSHIP RESULTS (Top 3)
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
    companySize: 'enterprise',
    challengeType: 'acquisition',
    shortCrisis: '$50M stalled pipeline',
    shortResult: 'Market leadership in 6 months',
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
    companySize: 'growth',
    challengeType: 'retention',
    shortCrisis: '3 months from bankruptcy',
    shortResult: '$18M ARR recovery',
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
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: '4 hours daily executive time consumed',
    shortResult: '$2.4M revenue acceleration',
    metrics: {
      primary: '$2.4M',
      secondary: '18mo',
      tertiary: '4hrs'
    },
    scarcity: 'Only healthcare transformation to achieve sub-6-month market entry',
    authority: 'Chief Medical Officer: "This changed how we think about growth"',
    socialProof: '2 major health systems now studying this approach'
  },

  // AUTHORITY PROOF (Middle 6)
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
    companySize: 'growth',
    challengeType: 'scaling',
    shortCrisis: 'Founders trapped in operations',
    shortResult: '300% team scaling + $8M valuation',
    metrics: {
      primary: '300%',
      secondary: '$8M',
      tertiary: '73%'
    },
    authority: 'CEO: "Finally free to think about the future instead of today\'s problems"',
    testimonial: 'Finally free to think about the future instead of today\'s problems'
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
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'retention',
    shortCrisis: '28% monthly churn destroying growth',
    shortResult: '85% churn reduction + $12M recovery',
    metrics: {
      primary: '85%',
      secondary: '$12M',
      tertiary: '28%'
    },
    authority: 'Investor: "This single change made them fundable again"',
    testimonial: 'This single change made them fundable again'
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
    industry: 'Services',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: 'Market entry taking 6 months each',
    shortResult: '5 new markets + 180% growth',
    metrics: {
      primary: '180%',
      secondary: '5',
      tertiary: '6mo'
    },
    authority: 'Board Chairman: "This gave us the speed advantage we needed"',
    testimonial: 'This gave us the speed advantage we needed'
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
    industry: 'Services',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: 'Route optimization consuming 6 hours daily',
    shortResult: '340% efficiency + $5.2M savings',
    metrics: {
      primary: '340%',
      secondary: '$5.2M',
      tertiary: '6hrs'
    },
    authority: 'Operations Director: "We went from reactive to predictive overnight"',
    testimonial: 'We went from reactive to predictive overnight'
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
    industry: 'Financial',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: '3 weeks per property evaluation',
    shortResult: '15x faster + $25M expansion',
    metrics: {
      primary: '15x',
      secondary: '$25M',
      tertiary: '3wks'
    },
    authority: 'Managing Partner: "We can now compete with the biggest funds"',
    testimonial: 'We can now compete with the biggest funds'
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
    industry: 'Technology',
    companySize: 'growth',
    challengeType: 'acquisition',
    shortCrisis: '2.1% conversion despite 300% traffic',
    shortResult: '290% conversion + $8.7M boost',
    metrics: {
      primary: '290%',
      secondary: '$8.7M',
      tertiary: '2.1%'
    },
    authority: 'CMO: "This turned our traffic into a revenue goldmine"',
    testimonial: 'This turned our traffic into a revenue goldmine'
  },

  // SPEED WINS (Bottom 6)
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
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: '40 hours per proposal',
    shortResult: '2000% efficiency gain',
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
    industry: 'Services',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: '8 hours per contract review',
    shortResult: '1600% faster processing',
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
    industry: 'Financial',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: '14 days claims processing',
    shortResult: '8400% faster processing',
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
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: '2 weeks per enrollment',
    shortResult: 'Instant matching + 400% enrollment',
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
    industry: 'Services',
    companySize: 'growth',
    challengeType: 'operations',
    shortCrisis: '4 hours daily pricing decisions',
    shortResult: '180% revenue per room',
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
    industry: 'Services',
    companySize: 'enterprise',
    challengeType: 'operations',
    shortCrisis: 'Crop planning based on guesswork',
    shortResult: '250% yield improvement',
    metrics: {
      primary: '250%',
      secondary: 'Data',
      tertiary: 'Guess'
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
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCompanySize, setSelectedCompanySize] = useState('all');
  const [selectedChallengeType, setSelectedChallengeType] = useState('all');
  const [currentSpeedWinIndex, setCurrentSpeedWinIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
          
          {/* STEP 1A: FLAGSHIP RESULTS SECTION (TOP) */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white leading-tight mb-8">
              Impossible Challenges We've{' '}
              <span className="font-extralight italic text-red-400">
                Transformed
              </span>{' '}
              Into Market Dominance
            </h1>
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
                  className={`relative group cursor-pointer transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  {/* Red Border Glow - Reduced */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/20 via-red-500/20 to-red-600/20 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                  
                  <div className="relative bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300">
                    
                    {/* Flagship Badge */}
                    <div className="inline-block bg-white/5 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded mb-6 tracking-wide">
                      FLAGSHIP
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

                    {/* MASSIVE Metrics */}
                    <div className="text-center mb-6">
                      <div className="text-6xl lg:text-7xl font-bold text-red-400 mb-2">
                        {transformation.metrics.primary}
                      </div>
                      <div className="text-2xl font-semibold text-white mb-1">
                        {transformation.metrics.secondary} IMPACT
                      </div>
                      <div className="text-lg text-white/70">
                        {transformation.industry} | {transformation.metrics.secondary} Impact
                      </div>
                    </div>

                    {/* Crisis & Result */}
                    <div className="space-y-3 mb-6">
                      <div className="text-center">
                        <div className="text-red-300 text-sm font-semibold mb-1">Crisis:</div>
                        <div className="text-white/80 text-sm">{transformation.shortCrisis}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-emerald-300 text-sm font-semibold mb-1">Result:</div>
                        <div className="text-white/80 text-sm">{transformation.shortResult}</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-red-600/90 to-red-700/90 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-600/30">
                      <span>VIEW FULL STORY</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* STEP 1B: SMART FILTER SECTION (MIDDLE) */}
          <div className="mb-16">
            {/* Smart Discovery System */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-thin text-white mb-6">
                Show Me Transformations For:
              </h2>
              
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
                  >
                    <div className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300 h-full">
                      
                      {/* Authority Badge */}
                      <div className="inline-flex items-center space-x-2 bg-amber-600/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 border border-amber-600/30">
                        <Award className="w-3 h-3" />
                        <span>AUTHORITY PROOF</span>
                      </div>

                      {/* Compact Title */}
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                        {transformation.title.split(' ').slice(0, 3).join(' ')}
                      </h3>
                      
                      {/* Key Metrics */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-400">{transformation.metrics.primary}</div>
                          <div className="text-xs text-white/60">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-400">{transformation.metrics.secondary}</div>
                          <div className="text-xs text-white/60">Growth</div>
                        </div>
                      </div>

                      {/* Quick Summary */}
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-white/80">
                          "{transformation.shortCrisis}"
                        </div>
                        {transformation.testimonial && (
                          <div className="text-xs text-amber-400 italic">
                            "{transformation.testimonial}"
                          </div>
                        )}
                      </div>

                      {/* Learn More Button */}
                      <button className="w-full bg-amber-600/15 border border-amber-600/25 text-amber-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-600/20 hover:border-amber-600/35 transition-all duration-300 flex items-center justify-center space-x-2">
                        <span>LEARN MORE</span>
                        <ArrowRight className="w-3 h-3" />
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

          {/* STEP 1C: SPEED SHOWCASE (BOTTOM) */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-white/80 text-sm font-light tracking-wider uppercase">Quick Wins Achieved</span>
                <Zap className="w-4 h-4 text-emerald-500" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-thin text-white mb-4">
                Speed Transformations
              </h2>
              <p className="text-lg text-white/70">
                30-second scan of breakthrough speed improvements
              </p>
            </div>

            {/* Speed Wins Carousel */}
            <div className="relative">
              {/* Desktop: Show 3 cards */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {speedWins.slice(currentSpeedWinIndex, currentSpeedWinIndex + 3).map((transformation, index) => (
                  <div key={transformation.id} className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                    
                    {/* Speed Badge */}
                    <div className="inline-flex items-center space-x-2 bg-emerald-600/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 border border-emerald-600/30">
                      <Zap className="w-3 h-3" />
                      <span>SPEED WIN</span>
                    </div>

                    {/* Ultra-Compact Format */}
                    <h3 className="text-lg font-bold text-white mb-2">
                      {transformation.metrics.primary} FASTER
                    </h3>
                    
                    <div className="text-sm text-white/70 mb-2">
                      {transformation.industry} | {transformation.timeline}
                    </div>
                    
                    <div className="text-sm text-white/80 mb-4">
                      {transformation.shortCrisis} → {transformation.shortResult}
                    </div>

                    <button className="w-full bg-emerald-600/15 border border-emerald-600/25 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600/20 hover:border-emerald-600/35 transition-all duration-300">
                      QUICK VIEW →
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobile: Show 1 card */}
              <div className="md:hidden">
                <div className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-xl p-6">
                  <div className="inline-flex items-center space-x-2 bg-emerald-600/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 border border-emerald-600/30">
                    <Zap className="w-3 h-3" />
                    <span>SPEED WIN</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {speedWins[currentSpeedWinIndex].metrics.primary} FASTER
                  </h3>
                  
                  <div className="text-sm text-white/70 mb-2">
                    {speedWins[currentSpeedWinIndex].industry} | {speedWins[currentSpeedWinIndex].timeline}
                  </div>
                  
                  <div className="text-sm text-white/80 mb-4">
                    {speedWins[currentSpeedWinIndex].shortCrisis} → {speedWins[currentSpeedWinIndex].shortResult}
                  </div>

                  <button className="w-full bg-emerald-600/15 border border-emerald-600/25 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                    QUICK VIEW →
                  </button>
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
          </div>

          {/* HORMOZI POWER CTA */}
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