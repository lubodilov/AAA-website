import React, { useState, useEffect, useRef } from 'react';

export default function TransformationProcess() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationStates, setAnimationStates] = useState([false, false, false]);
  const [sectionInView, setSectionInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const momentumInterceptRef = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slides = [
    {
      phase: "ANALYZE",
      title: "Reveal Hidden Opportunities",
      outcome: "Revenue multiplication roadmap",
      description: "We uncover AI opportunities in your acquisition funnel that competitors miss, creating clear pathways to exponential growth.",
      icon: "eye"
    },
    {
      phase: "UPGRADE", 
      title: "Architect Intelligent Systems",
      outcome: "Acquisition acceleration engine",
      description: "We design and build AI systems that work autonomously to multiply your customer acquisition while you focus on strategic growth.",
      icon: "blueprint"
    },
    {
      phase: "SCALE",
      title: "Eliminate Routine Decisions",
      outcome: "Strategic focus liberation", 
      description: "We automate 70% of routine leadership decisions through intelligent systems, returning your bandwidth to exponential thinking.",
      icon: "rocket"
    }
  ];

  // Animated SVG Icons
  const EyeIcon = ({ isAnimated }: { isAnimated: boolean }) => (
    <svg width="120" height="120" viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="analyzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer hexagonal frame */}
      <polygon
        points="60,15 90,35 90,65 60,85 30,65 30,35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        strokeDasharray="240"
        strokeDashoffset={isAnimated ? "0" : "240"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.1s'
        }}
      />
      
      {/* Inner geometric pattern */}
      <g opacity={isAnimated ? "1" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease-out',
        transitionDelay: '0.4s'
      }}>
        {/* Central diamond */}
        <polygon
          points="60,35 75,50 60,65 45,50"
          fill="url(#analyzeGradient)"
          stroke="currentColor"
          strokeWidth="1"
          filter="url(#glow)"
        />
        
        {/* Corner triangles */}
        <polygon points="60,20 70,30 50,30" fill="currentColor" opacity="0.6" />
        <polygon points="85,50 75,40 75,60" fill="currentColor" opacity="0.6" />
        <polygon points="60,80 50,70 70,70" fill="currentColor" opacity="0.6" />
        <polygon points="35,50 45,60 45,40" fill="currentColor" opacity="0.6" />
      </g>
      
      {/* Scanning lines */}
      <g opacity={isAnimated ? "0.8" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out',
        transitionDelay: '0.8s'
      }}>
        <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="60" y1="30" x2="60" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      </g>
    </svg>
  );

  const BlueprintIcon = ({ isAnimated }: { isAnimated: boolean }) => (
    <svg width="120" height="120" viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="upgradeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <filter id="architectGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer architectural frame */}
      <rect
        x="20" y="20" width="80" height="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="320"
        strokeDashoffset={isAnimated ? "0" : "320"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.1s'
        }}
      />
      
      {/* Central processing core */}
      <g opacity={isAnimated ? "1" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease-out',
        transitionDelay: '0.3s'
      }}>
        <rect
          x="45" y="45" width="30" height="30"
          fill="url(#upgradeGradient)"
          stroke="currentColor"
          strokeWidth="1.5"
          filter="url(#architectGlow)"
        />
        
        {/* Neural network nodes */}
        <circle cx="35" cy="35" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="85" cy="35" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="35" cy="85" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="85" cy="85" r="3" fill="currentColor" opacity="0.8" />
        
        {/* Connection lines */}
        <line x1="35" y1="35" x2="45" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="85" y1="35" x2="75" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="35" y1="85" x2="45" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="85" y1="85" x2="75" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </g>
      
      {/* Data flow indicators */}
      <g opacity={isAnimated ? "0.7" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out',
        transitionDelay: '0.6s'
      }}>
        <polygon points="60,25 65,30 55,30" fill="currentColor" opacity="0.8" />
        <polygon points="95,60 90,55 90,65" fill="currentColor" opacity="0.8" />
        <polygon points="60,95 55,90 65,90" fill="currentColor" opacity="0.8" />
        <polygon points="25,60 30,65 30,55" fill="currentColor" opacity="0.8" />
      </g>
    </svg>
  );

  const RocketIcon = ({ isAnimated }: { isAnimated: boolean }) => (
    <svg width="120" height="120" viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="scaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
        <filter id="scaleGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer orbital rings */}
      <circle
        cx="60" cy="60" r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="283"
        strokeDashoffset={isAnimated ? "0" : "283"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.1s'
        }}
      />
      
      <circle
        cx="60" cy="60" r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="220"
        strokeDashoffset={isAnimated ? "0" : "220"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.3s'
        }}
      />
      
      {/* Central core */}
      <g opacity={isAnimated ? "1" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease-out',
        transitionDelay: '0.5s'
      }}>
        <circle
          cx="60" cy="60" r="18"
          fill="url(#scaleGradient)"
          stroke="currentColor"
          strokeWidth="1.5"
          filter="url(#scaleGlow)"
        />
        
        {/* Inner geometric pattern */}
        <polygon
          points="60,48 68,60 60,72 52,60"
          fill="currentColor"
          opacity="0.8"
        />
      </g>
      
      {/* Orbital elements */}
      <g opacity={isAnimated ? "0.9" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out',
        transitionDelay: '0.8s'
      }}>
        {/* Strategic points */}
        <circle cx="60" cy="15" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="105" cy="60" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="105" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="15" cy="60" r="2.5" fill="currentColor" opacity="0.8" />
        
        {/* Connection vectors */}
        <line x1="60" y1="25" x2="60" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="95" y1="60" x2="78" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="60" y1="95" x2="60" y2="78" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="25" y1="60" x2="42" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </g>
      
      {/* Growth trajectory arrows */}
      <g opacity={isAnimated ? "0.8" : "0"} style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out',
        transitionDelay: '1.0s'
      }}>
        <polygon points="60,12 63,18 57,18" fill="currentColor" opacity="0.9" />
        <polygon points="108,60 102,57 102,63" fill="currentColor" opacity="0.9" />
      </g>
    </svg>
  );

  const getIcon = (iconType: string, isAnimated: boolean) => {
    switch (iconType) {
      case 'eye':
        return <EyeIcon isAnimated={isAnimated} />;
      case 'blueprint':
        return <BlueprintIcon isAnimated={isAnimated} />;
      case 'rocket':
        return <RocketIcon isAnimated={isAnimated} />;
      default:
        return <EyeIcon isAnimated={isAnimated} />;
    }
  };

  // Navigate to specific slide
  const navigateToSlide = (targetSlide: number) => {
    if (targetSlide >= 0 && targetSlide < slides.length && !isTransitioning) {
      setIsTransitioning(true);
      momentumInterceptRef.current = true;
      setLastScrollTime(Date.now());
      setCurrentSlide(targetSlide);
      
      const targetScroll = window.innerHeight * (2 + targetSlide);
      document.documentElement.style.scrollBehavior = 'smooth';
      window.scrollTo(0, targetScroll);

      // Reset transition lock
      setTimeout(() => {
        setIsTransitioning(false);
        momentumInterceptRef.current = false;
        document.documentElement.style.scrollBehavior = 'auto';
      }, 1000);
    }
  };

  // Section visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Individual slide observers
  useEffect(() => {
    const observers = slideRefs.current.map((slideRef, index) => {
      if (!slideRef) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Use much higher threshold for first slide to delay animation trigger significantly
          const threshold = index === 0 ? 0.98 : 0.6;
          if (entry.isIntersecting && entry.intersectionRatio > threshold) {
            setCurrentSlide(index);
            setAnimationStates(prev => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });
          }
        },
        // Use much higher threshold for first slide
        { threshold: index === 0 ? 0.98 : 0.6 }
      );
      
      observer.observe(slideRef);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Smooth wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Ignore rapid scroll events (debounce to 150ms for accumulation)
      if (now - lastScrollTime < 150) {
        e.preventDefault();
        return;
      }
      
      // Only handle on desktop
      if (window.innerWidth < 768) return;
      
      const container = sectionRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isInSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (!isInSection) return;
    };

    // Remove global wheel handling - now handled by parent App component
    return () => {};
  }, [currentSlide, isTransitioning, slides.length, lastScrollTime, scrollAccumulator]);

  return (
    <section ref={sectionRef} className="relative snap-scroll-container" style={{ height: '300vh' }}>
      {/* Progress Indicator - Only visible when section is in view */}

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={el => slideRefs.current[index] = el}
          className="h-screen flex items-center relative overflow-hidden sticky top-0 snap-start"
          style={{ zIndex: slides.length - index }}
        >
          {/* Background Parallax Layer */}
          <div className="absolute inset-0 overflow-hidden z-10">
            {/* Animated particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-600/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: !prefersReducedMotion ? `pulse ${2 + Math.random() * 3}s ease-in-out infinite` : 'none',
                    animationDelay: `${Math.random() * 2}s`,
                    transform: currentSlide === index ? `translateX(${Math.random() * 20 - 10}px)` : 'translateX(0)',
                    transition: 'transform 2s ease-out'
                  }}
                />
              ))}
            </div>
            
            {/* Wave lines */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <linearGradient id={`waveGradient${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,${50 + index * 10} Q${25 + index * 5},${30 + index * 10} ${50 + index * 5},${50 + index * 10} T100,${50 + index * 10}`}
                  fill="none"
                  stroke={`url(#waveGradient${index})`}
                  strokeWidth="1"
                  style={{
                    transform: currentSlide === index ? 'translateX(10px)' : 'translateX(-10px)',
                    transition: 'transform 3s ease-out'
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Large Phase Word Background */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: animationStates[index] ? 0 : 1,
              transform: animationStates[index] ? 'scale(0.92) translateY(-30px)' : 'scale(1) translateY(0px)',
              transition: prefersReducedMotion ? 'none' : 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: '0.5s'
            }}
          >
            {/* Elite backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl" />
            
            {/* Premium frame */}
            <div className="absolute top-20 left-8 right-8 bottom-8 border border-white/10 rounded-2xl" />
            
            <h2 
              className="text-[12vw] md:text-[8vw] font-extralight select-none relative z-10"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(239,68,68,0.8) 50%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 60px rgba(239, 68, 68, 0.3), 0 0 120px rgba(0, 0, 0, 0.8)',
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))'
              }}
            >
              {slide.phase}
            </h2>
            
            {/* Elite accent lines */}
            <div 
              className="absolute top-1/2 left-8 w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent"
              style={{
                opacity: animationStates[index] ? 0 : 1,
                transform: animationStates[index] ? 'translateX(-30px)' : 'translateX(0px)',
                transition: prefersReducedMotion ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: '0.3s'
              }}
            />
            <div 
              className="absolute top-1/2 right-8 w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent"
              style={{
                opacity: animationStates[index] ? 0 : 1,
                transform: animationStates[index] ? 'translateX(30px)' : 'translateX(0px)',
                transition: prefersReducedMotion ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: '0.3s'
              }}
            />
            
            {/* Corner elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              {/* Left Content - 2/3 */}
              <div className="md:col-span-2 space-y-6">
                <div
                  style={{
                    opacity: animationStates[index] ? 1 : 0,
                    transform: animationStates[index] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
                    transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    transitionDelay: '1.0s'
                  }}
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-4 leading-tight">
                    {slide.title}
                  </h3>
                  
                  <p 
                    className="text-xl md:text-2xl font-extralight italic text-red-400 mb-6"
                    style={{
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {slide.outcome}
                  </p>
                  
                  <p className="text-lg font-extralight text-white/90 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                </div>
              </div>

              {/* Right Content - 1/3 */}
              <div className="flex justify-center md:justify-start">
                <div 
                  className="w-48 h-48 flex items-center justify-center"
                  style={{
                    opacity: animationStates[index] ? 1 : 0,
                    transform: animationStates[index] ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-5deg)',
                    transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    transitionDelay: '1.1s'
                  }}
                >
                  <div className="text-red-400 w-full h-full flex items-center justify-center">
                    {getIcon(slide.icon, animationStates[index])}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden z-50">
            <div className="flex space-x-3">
              {slides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => {
                    const targetScroll = window.innerHeight * (2 + dotIndex);
                    momentumInterceptRef.current = true;
                    document.documentElement.style.scrollBehavior = 'smooth';
                    window.scrollTo({
                      top: targetScroll,
                      behavior: 'smooth'
                    });
                    setTimeout(() => {
                      momentumInterceptRef.current = false;
                      document.documentElement.style.scrollBehavior = 'auto';
                    }, 1000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === dotIndex 
                      ? 'bg-red-600 scale-125' 
                      : 'bg-red-600/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}