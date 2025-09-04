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
    <svg width="120" height="80" viewBox="0 0 120 80" className="w-full h-full">
      <path
        d="M10 40 Q60 10 110 40 Q60 70 10 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="200"
        strokeDashoffset={isAnimated ? "0" : "200"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.8s ease-out',
          transitionDelay: '0.2s'
        }}
      />
      <circle
        cx="60"
        cy="40"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="95"
        strokeDashoffset={isAnimated ? "0" : "95"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '0.6s'
        }}
      />
      <circle
        cx="60"
        cy="40"
        r="6"
        fill="currentColor"
        opacity={isAnimated ? "1" : "0"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out',
          transitionDelay: '1s'
        }}
      />
    </svg>
  );

  const BlueprintIcon = ({ isAnimated }: { isAnimated: boolean }) => (
    <svg width="120" height="120" viewBox="0 0 120 120" className="w-full h-full">
      {/* Grid lines */}
      {[20, 40, 60, 80, 100].map((pos, i) => (
        <g key={i}>
          <line
            x1={pos}
            y1="10"
            x2={pos}
            y2="110"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="100"
            strokeDashoffset={isAnimated ? "0" : "100"}
            style={{
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
              transitionDelay: `${i * 0.1}s`
            }}
          />
          <line
            x1="10"
            y1={pos}
            x2="110"
            y2={pos}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="100"
            strokeDashoffset={isAnimated ? "0" : "100"}
            style={{
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
              transitionDelay: `${i * 0.1 + 0.3}s`
            }}
          />
        </g>
      ))}
      {/* Main structure */}
      <rect
        x="30"
        y="30"
        width="60"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="200"
        strokeDashoffset={isAnimated ? "0" : "200"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.8s ease-out',
          transitionDelay: '0.8s'
        }}
      />
      <rect
        x="40"
        y="80"
        width="40"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="120"
        strokeDashoffset={isAnimated ? "0" : "120"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '1.2s'
        }}
      />
    </svg>
  );

  const RocketIcon = ({ isAnimated }: { isAnimated: boolean }) => (
    <svg width="120" height="120" viewBox="0 0 120 120" className="w-full h-full">
      {/* Rocket body */}
      <path
        d="M60 20 L50 80 L60 75 L70 80 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="150"
        strokeDashoffset={isAnimated ? "0" : "150"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.8s ease-out',
          transitionDelay: '0.2s'
        }}
      />
      {/* Fins */}
      <path
        d="M45 70 L50 80 L45 85"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="50"
        strokeDashoffset={isAnimated ? "0" : "50"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '0.8s'
        }}
      />
      <path
        d="M75 70 L70 80 L75 85"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="50"
        strokeDashoffset={isAnimated ? "0" : "50"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '0.8s'
        }}
      />
      {/* Flame trails */}
      <path
        d="M55 80 Q50 90 45 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
        strokeDasharray="40"
        strokeDashoffset={isAnimated ? "0" : "40"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '1.2s'
        }}
      />
      <path
        d="M60 80 Q60 95 55 105"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
        strokeDasharray="45"
        strokeDashoffset={isAnimated ? "0" : "45"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '1.4s'
        }}
      />
      <path
        d="M65 80 Q70 90 75 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
        strokeDasharray="40"
        strokeDashoffset={isAnimated ? "0" : "40"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
          transitionDelay: '1.2s'
        }}
      />
      {/* Tip */}
      <circle
        cx="60"
        cy="40"
        r="3"
        fill="currentColor"
        opacity={isAnimated ? "1" : "0"}
        style={{
          transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out',
          transitionDelay: '1.6s'
        }}
      />
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
      setLastScrollTime(Date.now());
      setCurrentSlide(targetSlide);
      
      slideRefs.current[targetSlide]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Reset transition lock
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2000); // Slower, more elegant transitions
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

      // Don't navigate if already transitioning or just transitioned
      if (isTransitioning || now - lastScrollTime < 300) {
        e.preventDefault();
        return;
      }
      
      // Prevent default scroll behavior within section
      e.preventDefault();
      
      // Accumulate scroll delta for less sensitive navigation
      const newAccumulator = scrollAccumulator + Math.abs(e.deltaY);
      setScrollAccumulator(newAccumulator);
      
      // Require moderate scroll distance before navigating - perfect balance
      const scrollThreshold = 30; // Optimized threshold for smooth but controlled navigation
      
      if (newAccumulator < scrollThreshold) {
        setLastScrollTime(now);
        return;
      }
      
      // Reset accumulator after successful navigation
      setScrollAccumulator(0);
      
      // Don't navigate if already transitioning
      if (isTransitioning) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetSlide = currentSlide + direction;
      
      // Navigate to next/previous slide if within bounds
      if (targetSlide >= 0 && targetSlide < slides.length) {
        setLastScrollTime(now);
        navigateToSlide(targetSlide);
      } else if (targetSlide >= slides.length) {
        // Allow scrolling out of section to next page section
        setIsTransitioning(true);
        window.scrollTo({
          top: container.offsetTop + container.offsetHeight,
          behavior: 'smooth'
        });
        setTimeout(() => setIsTransitioning(false), 800);
        setLastScrollTime(now);
      } else if (targetSlide < 0) {
        // Allow scrolling out of section to previous page section
        setIsTransitioning(true);
        window.scrollTo({
          top: container.offsetTop - window.innerHeight,
          behavior: 'smooth'
        });
        setTimeout(() => setIsTransitioning(false), 800);
        setLastScrollTime(now);
      }
    };

    // Reset scroll accumulator when not scrolling for a while
    const resetAccumulator = () => {
      const now = Date.now();
      if (now - lastScrollTime > 400) {
        setScrollAccumulator(0);
      }
    };

    const resetInterval = setInterval(resetAccumulator, 200);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearInterval(resetInterval);
    };
  }, [currentSlide, isTransitioning, slides.length, lastScrollTime, scrollAccumulator]);

  return (
    <section ref={sectionRef} className="relative">
      {/* Progress Indicator - Only visible when section is in view */}
      <div className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 md:flex flex-col space-y-4 transition-all duration-500 ${
        sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      } hidden`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSlide(index)}
            className="group relative"
            disabled={isTransitioning}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-red-600 scale-125' 
                  : 'bg-red-600/30 hover:bg-red-600/60'
              }`}
              style={{
                boxShadow: currentSlide === index ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none',
                animation: currentSlide === index && !prefersReducedMotion ? 'pulse 2s infinite' : 'none'
              }}
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                {slides[index].phase}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={el => slideRefs.current[index] = el}
          className="h-screen flex items-center relative overflow-hidden snap-start"
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
                    transitionDelay: '0.4s'
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
              <div className="flex justify-center md:justify-end">
                <div 
                  className="w-48 h-48 flex items-center justify-center"
                  style={{
                    opacity: animationStates[index] ? 1 : 0,
                    transform: animationStates[index] ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-5deg)',
                    transition: prefersReducedMotion ? 'opacity 0.3s ease-out' : 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    transitionDelay: '0.5s'
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
            <div className="flex space-x-3">
              {slides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => navigateToSlide(dotIndex)}
                  disabled={isTransitioning}
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