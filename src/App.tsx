import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Momentum detection system
  const velocityRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const lastScrollPositionRef = useRef(0);
  const scrollSamplesRef = useRef<Array<{position: number, time: number}>>([]);
  const isScrollingRef = useRef(false);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sections = ['hero', 'strategic', 'transformation-1', 'transformation-2', 'transformation-3'];
  const scrollTargets = [0, window.innerHeight, window.innerHeight * 2, window.innerHeight * 3, window.innerHeight * 4];

  // Calculate momentum from scroll samples
  const calculateMomentum = () => {
    const samples = scrollSamplesRef.current;
    if (samples.length < 2) return { velocity: 0, direction: 0 };
    
    // Use last 3 samples for momentum calculation
    const recentSamples = samples.slice(-3);
    const firstSample = recentSamples[0];
    const lastSample = recentSamples[recentSamples.length - 1];
    
    const deltaPosition = lastSample.position - firstSample.position;
    const deltaTime = lastSample.time - firstSample.time;
    
    const velocity = deltaTime > 0 ? Math.abs(deltaPosition / deltaTime) : 0;
    const direction = deltaPosition > 0 ? 1 : deltaPosition < 0 ? -1 : 0;
    
    return { velocity, direction };
  };

  // Get current section index based on scroll position
  const getCurrentSectionIndex = (scrollTop: number) => {
    const windowHeight = window.innerHeight;
    
    if (scrollTop < windowHeight * 0.5) {
      return 0; // Hero
    } else if (scrollTop < windowHeight * 1.5) {
      return 1; // Strategic
    } else {
      const transformationStart = windowHeight * 2;
      const transformationProgress = scrollTop - transformationStart;
      const slideIndex = Math.floor(transformationProgress / windowHeight);
      return Math.min(2 + slideIndex, 4);
    }
  };

  // Smooth scroll to target with deceleration
  const smoothScrollToTarget = (targetScroll: number) => {
    isAnimatingRef.current = true;
    
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Scroll to target
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Reset after animation
    setTimeout(() => {
      isAnimatingRef.current = false;
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1000);
  };

  // Handle scroll end with momentum detection
  const handleScrollEnd = () => {
    if (isAnimatingRef.current) return;
    
    const currentScroll = window.scrollY;
    const currentSectionIndex = getCurrentSectionIndex(currentScroll);
    const momentum = calculateMomentum();
    
    // Momentum threshold - very sensitive to detect any momentum
    const MOMENTUM_THRESHOLD = 0.1;
    const hasMomentum = momentum.velocity > MOMENTUM_THRESHOLD;
    
    if (hasMomentum && momentum.direction !== 0) {
      // HAS MOMENTUM - move to next slide in direction
      let targetSectionIndex;
      
      if (momentum.direction > 0) {
        // Scrolling down - go to next section
        targetSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
      } else {
        // Scrolling up - go to previous section
        targetSectionIndex = Math.max(currentSectionIndex - 1, 0);
      }
      
      const targetScroll = scrollTargets[targetSectionIndex];
      
      // Only animate if we're moving to a different section
      if (targetSectionIndex !== currentSectionIndex) {
        smoothScrollToTarget(targetScroll);
      } else {
        // Same section - center it
        const currentTargetScroll = scrollTargets[currentSectionIndex];
        if (Math.abs(currentScroll - currentTargetScroll) > 30) {
          smoothScrollToTarget(currentTargetScroll);
        }
      }
    } else {
      // NO MOMENTUM - stay on current slide and center it
      const currentTargetScroll = scrollTargets[currentSectionIndex];
      const distanceFromCenter = Math.abs(currentScroll - currentTargetScroll);
      
      // Only center if we're significantly off-center
      if (distanceFromCenter > 30) {
        smoothScrollToTarget(currentTargetScroll);
      }
    }
    
    // Clear scroll samples
    scrollSamplesRef.current = [];
  };

  // Add scroll sample for momentum calculation
  const addScrollSample = (position: number, time: number) => {
    scrollSamplesRef.current.push({ position, time });
    
    // Keep only last 5 samples for momentum calculation
    if (scrollSamplesRef.current.length > 5) {
      scrollSamplesRef.current.shift();
    }
  };

  // Main scroll handler
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const currentTime = performance.now();
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      
      // Add scroll sample for momentum detection
      addScrollSample(scrollTop, currentTime);
      
      // Update current section
      const currentSectionIndex = getCurrentSectionIndex(scrollTop);
      const clampedIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
      
      if (clampedIndex !== currentSection) {
        setCurrentSection(clampedIndex);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      // Skip if we're animating
      if (isAnimatingRef.current) return;
      
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
      
      // Mark as actively scrolling
      isScrollingRef.current = true;
      
      // Clear existing timeout
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      
      // Set timeout to detect scroll end
      scrollEndTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        handleScrollEnd();
      }, 150); // 150ms delay to detect scroll end
    };

    // Wheel event handler - block during animation
    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }
      
      // Clear wheel timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      
      // Set wheel timeout to detect wheel end
      wheelTimeoutRef.current = setTimeout(() => {
        // Wheel ended - this helps detect momentum vs manual scroll
        const currentTime = performance.now();
        addScrollSample(window.scrollY, currentTime);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [currentSection, sections.length]);

  // Navigation function for dots and manual navigation
  const navigateToSection = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < sections.length && !isAnimatingRef.current) {
      const targetScroll = scrollTargets[targetIndex];
      smoothScrollToTarget(targetScroll);
      setCurrentSection(targetIndex);
    }
  };

  // Section visibility observers for animations
  useEffect(() => {
    const observers = sectionRefs.current.slice(0, 2).map((sectionRef, index) => {
      if (!sectionRef) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setCurrentSection(index);
          }
        },
        { 
          threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
          rootMargin: '-10% 0px -10% 0px'
        }
      );
      
      observer.observe(sectionRef);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
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
      </div>
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      <Header />
      
      {/* Smooth scroll container */}
      <div className="relative">
        <div 
          ref={el => sectionRefs.current[0] = el}
          className="min-h-screen"
        >
          <Hero />
        </div>
        
        <div 
          ref={el => sectionRefs.current[1] = el}
          className="min-h-screen"
        >
          <OpportunityStatement />
        </div>
        
        <TransformationProcess />
      </div>

      {/* Section Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className="group relative"
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-red-600 scale-125 shadow-lg shadow-red-600/50' 
                  : 'bg-red-600/30 hover:bg-red-600/60'
              }`}
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                {index < 2 ? sections[index].toUpperCase() : `PHASE ${index - 1}`}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;