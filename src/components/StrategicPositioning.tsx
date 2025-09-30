import React, { useState, useEffect, useRef } from 'react';

export default function OpportunityStatement() {
  const [isVisible, setIsVisible] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [copyVisible, setCopyVisible] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [counterFinished, setCounterFinished] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<number>(0);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
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
      setTimeout(() => setHeadlineVisible(true), 50);
      
      // Start copy animation after headline
      setTimeout(() => setCopyVisible(true), 300);
      
      // Start counter animation
      setTimeout(() => {
        const duration = 800; // Faster loading
        const targetValue = 467;
        const startTime = Date.now();
        
        const animateCounter = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing function for dramatic counter animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(easeOutQuart * targetValue);
          
          setCounterValue(currentValue);
          
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            setCounterValue(targetValue);
            setCounterFinished(true);
          }
        };
        
        animateCounter();
      }, 200); // Start counter timing
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="w-full max-w-none">
        {/* Desktop & Tablet Layout (≥768px) */}
        <div className="hidden md:flex min-h-screen">
          {/* Left Column - 60% */}
          <div className="w-[55%] flex items-center px-20 lg:px-24 relative z-10">
            <div className="max-w-2xl">
              {/* Headline */}
              <h2 
                className={`text-3xl lg:text-5xl font-thin text-white leading-tight mb-8 transition-all duration-400 ${
                  prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.4,0,0.2,1)'
                }`}
                style={{
                  transform: headlineVisible ? 'translateY(0px)' : 'translateY(30px)',
                  opacity: headlineVisible ? 1 : 0
                }}
              >
                While Others Automate Tasks,{' '}
                <span 
                  className="font-extralight italic"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  We Multiply Revenue
                </span>
              </h2>
              
              {/* Supporting Copy */}
              <div 
                className={`space-y-6 transition-opacity duration-400 delay-75`}
                style={{
                  opacity: copyVisible ? 0.8 : 0
                }}
              >
                <p className="text-base lg:text-lg font-extralight text-white leading-relaxed">
                  Most AI companies help you work faster. We help you{' '}
                  <span className="text-red-400 font-light">grow exponentially</span>.
                </p>
                
                <p className="text-base lg:text-lg font-extralight text-white leading-relaxed">
                  The difference? We focus on{' '}
                  <span className="text-white font-light">acquisition acceleration</span>, not operational efficiency. 
                  While competitors optimize customer service, we architect intelligent systems that{' '}
                  <span className="text-red-400 font-light">multiply your revenue streams</span>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - 45% */}
          <div 
            className="w-[45%] flex items-center justify-center relative overflow-hidden z-10"
          >
            <div className="text-center ml-8 relative z-10">
              {/* Counter */}
              <div className="relative mb-4">
                {/* Clean circular frame */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                  {/* Animated circular progress ring */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#b91c1c" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(239, 68, 68, 0.1)"
                      strokeWidth="2"
                    />
                    
                    {/* Animated progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      strokeDasharray="283"
                      strokeDashoffset={counterFinished ? "0" : "283"}
                      style={{
                        transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionDelay: '0.5s'
                      }}
                    />
                    
                    {/* Pulsing dots around the circle */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                      const x = 50 + 45 * Math.cos((angle * Math.PI) / 180);
                      const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="1.5"
                          fill="#ef4444"
                          opacity={counterFinished ? "0.8" : "0"}
                          style={{
                            transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out',
                            transitionDelay: `${1 + i * 0.1}s`,
                            animation: !prefersReducedMotion && counterFinished ? `pulse 2s ease-in-out infinite ${i * 0.2}s` : 'none'
                          }}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Inner glow effect */}
                  <div 
                    className="absolute inset-3 rounded-full transition-all duration-1000"
                    style={{
                      background: counterFinished 
                        ? 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)'
                        : 'transparent',
                      filter: 'blur(15px)'
                    }}
                  />
                
                  {/* Main counter */}
                  <div 
                    className="relative text-5xl font-bold transition-all duration-700 z-10"
                    style={{
                      color: '#ef4444',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '-0.02em',
                      fontWeight: '700',
                      textShadow: counterFinished ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none',
                      filter: counterFinished ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.3))' : 'none'
                    }}
                  >
                    {counterValue}%
                  </div>
                
                  {/* Enhanced horizontal accent line */}
                  <div 
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-1000"
                    style={{
                      width: counterFinished ? '100px' : '0px',
                      background: counterFinished 
                        ? 'linear-gradient(90deg, transparent, #ef4444, transparent)'
                        : 'transparent',
                      boxShadow: counterFinished ? '0 0 15px rgba(239, 68, 68, 0.5)' : 'none'
                    }}
                  />
                  
                  {/* Floating accent elements */}
                  {counterFinished && [
                    { top: '20%', left: '15%', delay: '1.5s' },
                    { top: '25%', right: '20%', delay: '1.8s' },
                    { bottom: '30%', left: '10%', delay: '2.1s' },
                    { bottom: '25%', right: '15%', delay: '2.4s' }
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-red-400 rounded-full"
                      style={{
                        ...pos,
                        opacity: counterFinished ? 0.6 : 0,
                        transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out',
                        transitionDelay: pos.delay,
                        animation: !prefersReducedMotion && counterFinished 
                          ? `pulse 3s ease-in-out infinite ${parseFloat(pos.delay)}` 
                          : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Supporting Label */}
              <div 
                className={`text-sm font-normal leading-relaxed transition-all duration-500`}
                style={{
                  opacity: counterFinished ? 0.9 : 0,
                  transform: counterFinished ? 'translateY(0)' : 'translateY(15px)',
                  color: counterFinished ? '#ffffff' : '#d1d5db'
                }}
              >
                <span className="font-normal">Average Customer</span>
                <br />
                <span className="font-medium">Acquisition Increase</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Layout (<768px) */}
        <div className="md:hidden min-h-screen flex flex-col justify-center px-6 py-20 relative z-10">
          {/* Headline */}
          <h2 
            className={`text-2xl font-thin text-white leading-tight mb-6 transition-all duration-400 ${
              prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.4,0,0.2,1)'
            }`}
            style={{
              transform: headlineVisible ? 'translateY(0px)' : 'translateY(30px)',
              opacity: headlineVisible ? 1 : 0
            }}
          >
            While Others Automate Tasks,{' '}
            <span 
              className="font-extralight italic"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              We Multiply Revenue
            </span>
          </h2>
          
          {/* Supporting Copy */}
          <div 
            className={`space-y-4 mb-8 transition-opacity duration-400 delay-75`}
            style={{
              opacity: copyVisible ? 0.8 : 0
            }}
          >
            <p className="text-sm font-extralight text-white leading-relaxed">
              Most AI companies help you work faster. We help you{' '}
              <span className="text-red-400 font-light">grow exponentially</span>.
            </p>
            
            <p className="text-sm font-extralight text-white leading-relaxed">
              The difference? We focus on{' '}
              <span className="text-white font-light">acquisition acceleration</span>, not operational efficiency.
            </p>
          </div>
          
          {/* Inline Visualization */}
          <div 
            className="p-8 rounded-2xl text-center bg-black/30 backdrop-blur-sm border border-red-600/20"
          >
            {/* Counter */}
            <div className="relative mb-4">
              {/* Clean circular frame for mobile */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                {/* Animated circular progress ring for mobile */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="progressGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#b91c1c" />
                    </linearGradient>
                    <filter id="glowMobile">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(239, 68, 68, 0.1)"
                    strokeWidth="2"
                  />
                  
                  {/* Animated progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progressGradientMobile)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glowMobile)"
                    strokeDasharray="283"
                    strokeDashoffset={counterFinished ? "0" : "283"}
                    style={{
                      transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transitionDelay: '0.5s'
                    }}
                  />
                  
                  {/* Pulsing dots around the circle */}
                  {[0, 90, 180, 270].map((angle, i) => {
                    const x = 50 + 45 * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="1.5"
                        fill="#ef4444"
                        opacity={counterFinished ? "0.8" : "0"}
                        style={{
                          transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out',
                          transitionDelay: `${1 + i * 0.15}s`,
                          animation: !prefersReducedMotion && counterFinished ? `pulse 2s ease-in-out infinite ${i * 0.3}s` : 'none'
                        }}
                      />
                    );
                  })}
                </svg>
                
                {/* Inner glow effect */}
                <div 
                  className="absolute inset-3 rounded-full transition-all duration-1000"
                  style={{
                    background: counterFinished 
                      ? 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)'
                      : 'transparent',
                    filter: 'blur(15px)'
                  }}
                />
              
                {/* Main counter */}
                <div 
                  className="relative text-5xl font-bold transition-all duration-700 z-10"
                  style={{
                    color: '#ef4444',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.02em',
                    fontWeight: '700',
                    textShadow: counterFinished ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none',
                    filter: counterFinished ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.3))' : 'none'
                  }}
                >
                  {counterValue}%
                </div>
              
                {/* Enhanced horizontal accent line */}
                <div 
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-1000"
                  style={{
                    width: counterFinished ? '100px' : '0px',
                    background: counterFinished 
                      ? 'linear-gradient(90deg, transparent, #ef4444, transparent)'
                      : 'transparent',
                    boxShadow: counterFinished ? '0 0 15px rgba(239, 68, 68, 0.5)' : 'none'
                  }}
                />
                
                {/* Floating accent elements */}
                {counterFinished && [
                  { top: '20%', left: '15%', delay: '1.5s' },
                  { top: '25%', right: '20%', delay: '1.8s' },
                  { bottom: '30%', left: '10%', delay: '2.1s' },
                  { bottom: '25%', right: '15%', delay: '2.4s' }
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-red-400 rounded-full"
                    style={{
                      ...pos,
                      opacity: counterFinished ? 0.6 : 0,
                      transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out',
                      transitionDelay: pos.delay,
                      animation: !prefersReducedMotion && counterFinished 
                        ? `pulse 3s ease-in-out infinite ${parseFloat(pos.delay)}` 
                        : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Supporting Label */}
            <div 
              className={`text-sm lg:text-base font-normal max-w-xs mx-auto leading-relaxed transition-all duration-500`}
              style={{
                opacity: counterFinished ? 0.9 : 0,
                transform: counterFinished ? 'translateY(0)' : 'translateY(15px)',
                color: counterFinished ? '#ffffff' : '#d1d5db'
              }}
            >
              <span className="font-normal">Average Customer</span>
              <br />
              <span className="font-medium">Acquisition Increase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}