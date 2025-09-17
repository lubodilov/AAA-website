import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Filter, TrendingUp, Clock, Target } from 'lucide-react';
import Header from './Header';

interface Transformation {
  id: string;
  category: 'acquisition' | 'operations' | 'expansion';
  title: string;
  businessChallenge: string;
  hiddenOpportunity: string;
  visionSolution: string;
  businessImpact: string;
  executiveOutcome: string;
  metrics: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  timeline: string;
  industry: string;
}

const transformations: Transformation[] = [
  {
    id: 'manufacturing-leadership',
    category: 'acquisition',
    title: 'Manufacturing Leadership Crisis',
    businessChallenge: 'Sales team spending 60% of time on unqualified leads',
    hiddenOpportunity: '$12M in high-value prospects being ignored',
    visionSolution: 'AI-driven lead intelligence system',
    businessImpact: '467% qualified pipeline increase, market leadership achieved',
    executiveOutcome: 'Sales leadership refocused on strategic accounts',
    metrics: {
      primary: '467%',
      secondary: '$12M',
      tertiary: '60%'
    },
    timeline: '4 months',
    industry: 'Manufacturing'
  },
  {
    id: 'services-plateau',
    category: 'acquisition',
    title: 'Services Company Plateau',
    businessChallenge: 'Revenue growth stalled at $50M ceiling',
    hiddenOpportunity: '40% of inquiries never reached decision-makers',
    visionSolution: 'Intelligent lead routing and qualification',
    businessImpact: '$15M revenue breakthrough, 67% margin improvement',
    executiveOutcome: 'CEO bandwidth freed for market expansion',
    metrics: {
      primary: '$15M',
      secondary: '67%',
      tertiary: '40%'
    },
    timeline: '6 months',
    industry: 'Professional Services'
  },
  {
    id: 'healthcare-bottleneck',
    category: 'operations',
    title: 'Healthcare Network Bottleneck',
    businessChallenge: 'Patient routing consuming 4 hours daily executive time',
    hiddenOpportunity: '40% capacity increase through intelligent workflow',
    visionSolution: 'Automated decision-making system',
    businessImpact: 'New market entry 18 months early, $2.4M acceleration',
    executiveOutcome: 'Leadership focus shifted to strategic growth',
    metrics: {
      primary: '$2.4M',
      secondary: '18mo',
      tertiary: '4hrs'
    },
    timeline: '5 months',
    industry: 'Healthcare'
  },
  {
    id: 'technology-scaling',
    category: 'operations',
    title: 'Technology Firm Scaling Crisis',
    businessChallenge: 'Founders trapped in operational decisions',
    hiddenOpportunity: '73% of decisions could be automated',
    visionSolution: 'Executive liberation framework',
    businessImpact: '300% team scaling, $8M valuation increase',
    executiveOutcome: 'Founder availability for strategic partnerships',
    metrics: {
      primary: '300%',
      secondary: '$8M',
      tertiary: '73%'
    },
    timeline: '7 months',
    industry: 'Technology'
  },
  {
    id: 'retail-expansion',
    category: 'expansion',
    title: 'Regional Retail Expansion',
    businessChallenge: 'Market entry decisions taking 6 months each',
    hiddenOpportunity: 'AI could predict market viability in days',
    visionSolution: 'Market intelligence automation',
    businessImpact: '5 new markets opened, 180% revenue growth',
    executiveOutcome: 'CEO positioned for acquisition discussions',
    metrics: {
      primary: '180%',
      secondary: '5',
      tertiary: '6mo'
    },
    timeline: '8 months',
    industry: 'Retail'
  }
];

const categories = [
  { id: 'all', name: 'All Transformations', icon: Target },
  { id: 'acquisition', name: 'Acquisition Acceleration', icon: TrendingUp },
  { id: 'operations', name: 'Operational Intelligence', icon: Clock },
  { id: 'expansion', name: 'Market Expansion', icon: ArrowRight }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Filter transformations based on selected category
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

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'acquisition': return 'Revenue Growth Bottlenecks';
      case 'operations': return 'Executive Bandwidth Constraints';
      case 'expansion': return 'Growth Vision Limitations';
      default: return 'Business Transformation Categories';
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
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-light tracking-wider uppercase">Business Transformations</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white leading-tight mb-6">
              Business Challenges We've{' '}
              <span 
                className="font-extralight italic text-red-400"
              >
                Transformed
              </span>{' '}
              Into Market Advantages
            </h1>
            
            <p className="text-xl font-extralight text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
              See how we've elevated business vision for companies facing acquisition bottlenecks, 
              operational inefficiencies, and growth constraints.
            </p>
          </div>

          {/* Moving Cards Section */}
          <div className="relative overflow-hidden">
            {/* First Row - Moving Right */}
            <div className="flex space-x-6 mb-8" style={{ animation: 'infinite-scroll-right 30s linear infinite' }}>
              {[...Array(3)].flatMap((_, setIndex) => 
                transformations.map((transformation, cardIndex) => (
                <div
                  key={`right-${transformation.id}-${setIndex}-${cardIndex}`}
                  className="flex-shrink-0 w-80 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => setHoveredCard(transformation.id)}
                >
                  {/* Card Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-red-600/20 text-red-400 text-xs font-medium px-2 py-1 rounded-full">
                        {transformation.industry}
                      </span>
                      <span className="text-white/60 text-xs font-light">
                        {transformation.timeline}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                      {transformation.title}
                    </h3>
                  </div>

                  {/* Key Metrics */}
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{transformation.metrics.primary}</div>
                      <div className="text-xs text-white/60 font-light">Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{transformation.metrics.secondary}</div>
                      <div className="text-xs text-white/60 font-light">Growth</div>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <p className="text-sm text-white/80 font-light leading-relaxed line-clamp-3">
                    {transformation.businessImpact}
                  </p>

                  {/* Hover Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, rgba(239, 68, 68, 0.05) 0%, transparent 70%)`,
                      filter: 'blur(15px)'
                    }}
                  />
                </div>
                ))
              )}
            </div>

            {/* Second Row - Moving Left */}
            <div className="flex space-x-6" style={{ animation: 'infinite-scroll-left 35s linear infinite' }}>
              {[...Array(3)].flatMap((_, setIndex) => 
                transformations.slice().reverse().map((transformation, cardIndex) => (
                <div
                  key={`left-${transformation.id}-${setIndex}-${cardIndex}`}
                  className="flex-shrink-0 w-80 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => setHoveredCard(transformation.id)}
                >
                  {/* Card Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-red-600/20 text-red-400 text-xs font-medium px-2 py-1 rounded-full">
                        {transformation.industry}
                      </span>
                      <span className="text-white/60 text-xs font-light">
                        {transformation.timeline}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                      {transformation.title}
                    </h3>
                  </div>

                  {/* Key Metrics */}
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{transformation.metrics.primary}</div>
                      <div className="text-xs text-white/60 font-light">Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{transformation.metrics.secondary}</div>
                      <div className="text-xs text-white/60 font-light">Growth</div>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <p className="text-sm text-white/80 font-light leading-relaxed line-clamp-3">
                    {transformation.businessImpact}
                  </p>

                  {/* Hover Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, rgba(239, 68, 68, 0.05) 0%, transparent 70%)`,
                      filter: 'blur(15px)'
                    }}
                  />
                </div>
                ))
              )}
            </div>
          </div>

          {/* Strategic CTA */}
          <div className="mt-16 text-center">
            <div className="bg-black/40 backdrop-blur-sm border border-red-600/20 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-light text-white mb-6">
                Ready to Transform Your{' '}
                <span 
                  className="font-extralight italic text-red-600"
                >
                  Business Vision
                </span>?
              </h3>
              
              <p className="text-xl font-extralight text-white/80 mb-8 leading-relaxed">
                Every transformation starts with understanding your unique challenges and hidden opportunities. 
                Let's architect your path to market dominance.
              </p>
              
              <button className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-light hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-3 mx-auto">
                <span className="text-lg">Start Your Vision Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}