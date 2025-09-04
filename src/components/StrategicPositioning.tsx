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
      className="min-h-screen flex items-center relative overflow-hidden will-change-transform"
    >
      <div className="w-full max-w-none">
        {/* Desktop & Tablet Layout (≥768px) */}
        <div className="hidden md:flex min-h-screen">
          {/* Left Column - 60% */}
          <div className="w-[55%] flex items-center px-20 lg:px-24 relative z-10">
            <div className="max-w-2xl">
              {/* Headline */}
              <h2 className="split-text text-3xl lg:text-5xl font-thin text-white leading-tight mb-8 will-change-transform">
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
              <div className="space-y-6 reveal">
                <p className="text-base lg:text-lg font-extralight text-white leading-relaxed reveal">
                  Most AI companies help you work faster. We help you{' '}
                  <span className="text-red-400 font-light">grow exponentially</span>.
                </p>
                
                <p className="text-base lg:text-lg font-extralight text-white leading-relaxed reveal">
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
            className="w-[45%] flex items-center justify-center relative overflow-hidden z-10 reveal"
          >
            <div className="text-center ml-8 relative z-10">
              {/* Counter */}
              <div className="relative mb-4">
                {/* Clean circular frame */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                  {/* Circular border */}
                  <div 
                    className="absolute inset-0 rounded-full border transition-all duration-1000"
                    style={{
                      borderColor: counterFinished ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                      borderWidth: '2px'
                    }}
                  />
                
                  {/* Main counter */}
                  <div 
                    className="relative text-7xl lg:text-8xl font-bold transition-all duration-700"
                    style={{
                      color: '#ef4444', 
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '-0.02em',
                      fontWeight: '700'
                    }}
                  >
                    <span className="counter-value">0</span>%
                  </div>
                
                  {/* Horizontal line */}
                  <div 
                    className="absolute bottom-16 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-1000"
                    style={{
                      width: counterFinished ? '100px' : '0px',
                      backgroundColor: '#ef4444'
                    }}
                  />
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
          <h2 className="split-text text-2xl font-thin text-white leading-tight mb-6 will-change-transform">
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
          <div className="space-y-4 mb-8 reveal">
            <p className="text-sm font-extralight text-white leading-relaxed reveal">
              Most AI companies help you work faster. We help you{' '}
              <span className="text-red-400 font-light">grow exponentially</span>.
            </p>
            
            <p className="text-sm font-extralight text-white leading-relaxed reveal">
              The difference? We focus on{' '}
              <span className="text-white font-light">acquisition acceleration</span>, not operational efficiency.
            </p>
          </div>
          
          {/* Inline Visualization */}
          <div 
            className="p-8 rounded-2xl text-center bg-black/30 backdrop-blur-sm border border-red-600/20 reveal"
          >
            {/* Counter */}
            <div className="relative mb-4">
              {/* Clean circular frame for mobile */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                {/* Circular border */}
                <div 
                  className="absolute inset-0 rounded-full border transition-all duration-1000"
                  style={{
                    borderColor: counterFinished ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                    borderWidth: '2px'
                  }}
                />
              
                {/* Main counter */}
                <div 
                  className="relative text-5xl font-bold transition-all duration-700"
                  style={{
                    color: '#ef4444', 
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.02em',
                    fontWeight: '700'
                  }}
                >
                  <span className="counter-value">0</span>%
                </div>
              
                {/* Horizontal line */}
                <div 
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-1000"
                  style={{
                    width: counterFinished ? '80px' : '0px',
                    backgroundColor: '#ef4444'
                  }}
                />
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