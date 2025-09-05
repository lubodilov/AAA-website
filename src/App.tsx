import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs for momentum detection and control
  const scrollSamplesRef = useRef<Array<{position: number, time: number, delta: number}>>([]);
  const lastWheelTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isControllingScrollRef = useRef(false);
  const targetSectionRef = useRef<number | null>(null);
  
  const sections = ['hero', 'strategic', 'transformation-1', 'transformation-2', 'transformation-3'];
  const scrollTargets = [0, window.innerHeight, window.innerHeight * 2, window.innerHeight * 3, window.innerHeight * 4];

  // Get current section based on scroll position
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

  // Smooth scroll to target with easing
  const smoothScrollToTarget = (targetScroll: number, duration: number = 800) => {
    if (isControllingScrollRef.current) return;
    
    isControllingScrollRef.current = true;
    setIsAnimating(true);
    
    const startScroll = window.scrollY;
    const distance = targetScroll - startScroll;
    const startTime = performance.now();
    
    // Easing function for smooth deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentScroll = startScroll + (distance * easedProgress);
      window.scrollTo(0, currentScroll);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        // Animation complete
        isControllingScrollRef.current = false;
        setIsAnimating(false);
        targetSectionRef.current = null;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  };

  // Add scroll sample for momentum detection
  const addScrollSample = (position: number, delta: number) => {
    const now = performance.now();
    scrollSamplesRef.current.push({ position, time: now, delta });
    
    // Keep only last 10 samples for momentum calculation
    if (scrollSamplesRef.current.length > 10) {
      scrollSamplesRef.current.shift();
    }
  };

  // Calculate momentum from recent samples
  const calculateMomentum = () => {
    const samples = scrollSamplesRef.current;
    if (samples.length < 3) return { hasMomentum: false, direction: 0, velocity: 0 };
    
    // Use last 5 samples for momentum calculation
    const recentSamples = samples.slice(-5);
    const totalDelta = recentSamples.reduce((sum, sample) => sum + sample.delta, 0);
    const timeSpan = recentSamples[recentSamples.length - 1].time - recentSamples[0].time;
    
    if (timeSpan === 0) return { hasMomentum: false, direction: 0, velocity: 0 };
    
    const velocity = Math.abs(totalDelta / timeSpan);
    const direction = totalDelta > 0 ? 1 : -1;
    
    // Very sensitive momentum detection - any velocity > 0.05 is considered momentum
    const hasMomentum = velocity > 0.05;
    
    return { hasMomentum, direction, velocity };
  };

  // Handle wheel events with momentum detection
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't interfere if we're already controlling scroll
      if (isControllingScrollRef.current) {
        e.preventDefault();
        return;
      }
      
      const now = performance.now();
      lastWheelTimeRef.current = now;
      
      // Add scroll sample
      addScrollSample(window.scrollY, e.deltaY);
      
      // Prevent default to control scrolling ourselves
      e.preventDefault();
      
      // Wait a bit to see if more wheel events come (indicating momentum)
      setTimeout(() => {
        // Only process if this was the last wheel event (no newer events)
        if (now === lastWheelTimeRef.current && !isControllingScrollRef.current) {
          processScrollGesture();
        }
      }, 50);
    };

    const processScrollGesture = () => {
      const currentScroll = window.scrollY;
      const currentSectionIndex = getCurrentSectionIndex(currentScroll);
      const momentum = calculateMomentum();
      
      console.log('Processing scroll gesture:', {
        hasMomentum: momentum.hasMomentum,
        direction: momentum.direction,
        velocity: momentum.velocity,
        currentSection: currentSectionIndex
      });
      
      if (momentum.hasMomentum) {
        // HAS MOMENTUM - move to next slide in direction
        let targetSectionIndex;
        
        if (momentum.direction > 0) {
          // Scrolling down - go to next section (max one step)
          targetSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        } else {
          // Scrolling up - go to previous section (max one step)
          targetSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }
        
        // Only move if we're actually changing sections
        if (targetSectionIndex !== currentSectionIndex) {
          const targetScroll = scrollTargets[targetSectionIndex];
          targetSectionRef.current = targetSectionIndex;
          
          // Use longer duration for momentum-based scrolling for smooth deceleration
          smoothScrollToTarget(targetScroll, 1000);
          setCurrentSection(targetSectionIndex);
        }
      } else {
        // NO MOMENTUM - stay on current slide and center it
        const currentTargetScroll = scrollTargets[currentSectionIndex];
        const distanceFromCenter = Math.abs(currentScroll - currentTargetScroll);
        
        // Only center if we're significantly off-center
        if (distanceFromCenter > 30) {
          smoothScrollToTarget(currentTargetScroll, 600);
        }
      }
      
      // Clear scroll samples after processing
      scrollSamplesRef.current = [];
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sections.length]);

  // Handle regular scroll for progress tracking
  useEffect(() => {
    const handleScroll = () => {
      // Don't update during our controlled animations
      if (isControllingScrollRef.current) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      
      // Update current section
      const currentSectionIndex = getCurrentSectionIndex(scrollTop);
      const clampedIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
      
      if (clampedIndex !== currentSection && !isAnimating) {
        setCurrentSection(clampedIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, sections.length, isAnimating]);

  // Navigation function for dots
  const navigateToSection = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < sections.length && !isControllingScrollRef.current) {
      const targetScroll = scrollTargets[targetIndex];
      targetSectionRef.current = targetIndex;
      smoothScrollToTarget(targetScroll, 800);
      setCurrentSection(targetIndex);
    }
  };

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
      
      {/* Content sections */}
      <div className="relative">
        <div className="min-h-screen">
          <Hero />
        </div>
        
        <div className="min-h-screen">
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
            disabled={isAnimating}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-red-600 scale-125 shadow-lg shadow-red-600/50' 
                  : 'bg-red-600/30 hover:bg-red-600/60'
              } ${isAnimating ? 'opacity-50' : ''}`}
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