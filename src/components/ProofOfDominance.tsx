import React, { useState, useEffect, useRef } from 'react';

export default function ProofOfDominance() {
  const [isVisible, setIsVisible] = useState(false);
  const [metricsAnimated, setMetricsAnimated] = useState([false, false, false]);
  const [counterValues, setCounterValues] = useState([0, 0, 0]);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metrics = [
    {
      value: 467,
      suffix: '%',
      label: 'Average Customer',
      sublabel: 'Acquisition Increase',
      color: '#ef4444',
      duration: 1200
    },
    {
      value: 89,
      suffix: '',
      label: 'Hours Weekly Leadership',
      sublabel: 'Time Reclaimed',
      color: '#f59e0b',
      duration: 1000
    },
    {
      value: 2.4,
      suffix: 'M',
      prefix: '$',
      label: 'Average Annual Growth',
      sublabel: 'Acceleration',
      color: '#10b981',
      duration: 1400
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation sequence
  useEffect(() => {
    if (isVisible) {
      // Start headline animation
      setTimeout(() => setHeadlineVisible(true), 100);
      
      // Start metrics animations with staggered timing
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          setMetricsAnimated(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });

          // Animate counter
          const startTime = Date.now();
          const animateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / metric.duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = easeOutQuart * metric.value;
            
            setCounterValues(prev => {
              const newValues = [...prev];
              newValues[index] = metric.value === 2.4 ? 
                Math.round(currentValue * 10) / 10 : 
                Math.floor(currentValue);
              return newValues;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            }
          };
          
          animateCounter();
        }, 400 + (index * 200));
      });
      
      // Start description animation
      setTimeout(() => setDescriptionVisible(true), 1600);
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-center relative overflow-hidden snap-start"
    >
      {/* Elite Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" stroke="url(#gridGradient)" />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f59e0b' : '#10b981',
                opacity: 0.3,
                animation: !prefersReducedMotion ? `pulse ${3 + Math.random() * 4}s ease-in-out infinite` : 'none',
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Diagonal accent lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform -rotate-12"
            style={{
              transform: isVisible ? 'translateX(0) rotate(-12deg)' : 'translateX(-100%) rotate(-12deg)',
              transition: prefersReducedMotion ? 'none' : 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: '0.5s'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-amber-500/20 to-transparent transform rotate-12"
            style={{
              transform: isVisible ? 'translateX(0) rotate(12deg)' : 'translateX(100%) rotate(12deg)',
              transition: prefersReducedMotion ? 'none' : 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: '0.8s'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-block mb-6"
            style={{
              opacity: headlineVisible ? 1 : 0,
              transform: headlineVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {/* Elite badge */}
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs font-light tracking-wider uppercase">Proof of Dominance</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin text-white leading-tight">
              The Vision{' '}
              <span 
                className="font-extralight italic"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Elevation
              </span>{' '}
              Results
            </h2>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                opacity: metricsAnimated[index] ? 1 : 0,
                transform: metricsAnimated[index] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: `${index * 0.2}s`
              }}
            >
              {/* Card Background */}
              <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 group-hover:bg-black/40">
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${metric.color}15 0%, transparent 70%)`,
                    filter: 'blur(20px)'
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Main Metric */}
                  <div className="mb-3">
                    <div 
                      className="text-4xl lg:text-5xl font-bold mb-2"
                      style={{ 
                        color: metric.color,
                        fontFamily: 'Inter, system-ui, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {metric.prefix || ''}{counterValues[index]}{metric.suffix}
                    </div>
                    
                    {/* Accent line */}
                    <div 
                      className="h-0.5 mx-auto transition-all duration-1000"
                      style={{
                        width: metricsAnimated[index] ? '60px' : '0px',
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                  
                  {/* Labels */}
                  <div className="space-y-1">
                    <div className="text-white font-light text-base">
                      {metric.label}
                    </div>
                    <div className="text-white/70 font-extralight text-sm">
                      {metric.sublabel}
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div 
          className="text-center max-w-3xl mx-auto"
          style={{
            opacity: descriptionVisible ? 1 : 0,
            transform: descriptionVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <div className="relative">
            {/* Elite frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl" />
            <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              <p className="text-lg lg:text-xl font-extralight text-white leading-relaxed">
                Within <span className="text-red-400 font-light">6 months</span>, our clients shift from{' '}
                <span className="text-white/90">managing operations</span> to{' '}
                <span 
                  className="font-light"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  architecting market dominance
                </span>.
              </p>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-6 h-6">
                <div className="w-full h-full border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6">
                <div className="w-full h-full border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6">
                <div className="w-full h-full border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}