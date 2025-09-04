import React, { useState, useEffect, useRef } from 'react';

export default function ProofOfDominance() {
  const [isVisible, setIsVisible] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState([false, false, false]);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metrics = [
    { value: 467, suffix: '%', label: 'Average Customer Acquisition Increase', color: '#ef4444' },
    { value: 89, suffix: ' Hours', label: 'Weekly Leadership Time Reclaimed', color: '#f97316' },
    { value: 2.4, suffix: 'M', label: 'Average Annual Growth Acceleration', prefix: '$', color: '#10b981' }
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
      
      // Animate metrics one by one
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          setMetricsVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
          
          // Start counter animation for this metric
          const duration = 1200;
          const startTime = Date.now();
          
          const animateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = easeOutQuart * metric.value;
            
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = metric.value === 2.4 ? 
                Math.round(currentValue * 10) / 10 : 
                Math.floor(currentValue);
              return newCounters;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            }
          };
          
          animateCounter();
        }, 400 + (index * 200));
      });
      
      // Show description last
      setTimeout(() => setDescriptionVisible(true), 1400);
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Elite background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: !prefersReducedMotion ? 'pulse 8s ease-in-out infinite' : 'none'
          }} />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-600/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: !prefersReducedMotion ? `pulse ${3 + Math.random() * 4}s ease-in-out infinite` : 'none',
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl md:text-6xl lg:text-7xl font-thin text-white leading-tight transition-all duration-800 ${
              prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }`}
            style={{
              transform: headlineVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.95)',
              opacity: headlineVisible ? 1 : 0
            }}
          >
            The Vision Elevation{' '}
            <span 
              className="font-extralight italic"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Results
            </span>
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }`}
              style={{
                transform: metricsVisible[index] ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.9)',
                opacity: metricsVisible[index] ? 1 : 0,
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Metric Container */}
              <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-red-600/30 transition-all duration-500 group">
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${metric.color}15 0%, transparent 70%)`,
                    filter: 'blur(20px)'
                  }}
                />
                
                {/* Counter */}
                <div className="relative z-10 mb-4">
                  <div 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2"
                    style={{ 
                      color: metric.color,
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {metric.prefix || ''}{counters[index]}{metric.suffix}
                  </div>
                  
                  {/* Accent line */}
                  <div 
                    className="h-1 mx-auto rounded-full transition-all duration-1000"
                    style={{
                      width: metricsVisible[index] ? '60px' : '0px',
                      backgroundColor: metric.color
                    }}
                  />
                </div>
                
                {/* Label */}
                <p className="text-white/90 font-light text-lg leading-relaxed">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center max-w-4xl mx-auto">
          <p 
            className={`text-xl md:text-2xl font-extralight text-white/90 leading-relaxed transition-all duration-800 ${
              prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }`}
            style={{
              transform: descriptionVisible ? 'translateY(0px)' : 'translateY(30px)',
              opacity: descriptionVisible ? 1 : 0
            }}
          >
            Within 6 months, our clients shift from{' '}
            <span className="text-white font-light">managing operations</span> to{' '}
            <span 
              className="font-light italic"
              style={{ color: '#ef4444' }}
            >
              architecting market dominance
            </span>.
          </p>
        </div>
      </div>
    </section>
  );
}