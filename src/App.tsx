import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Simple momentum detection
  const wheelSamplesRef = useRef<Array<{delta: number, time: number}>>([]);
  const lastWheelTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  
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

  // Simple smooth scroll to target
  const scrollToSection = (targetIndex: number) => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    setIsAnimating(true);
    
    const targetScroll = scrollTargets[targetIndex];
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Reset after animation
    setTimeout(() => {
      isScrollingRef.current = false;
      setIsAnimating(false);
      setCurrentSection(targetIndex);
    }, 800);
  };

  // Simple momentum detection
  const detectMomentum = () => {
    const samples = wheelSamplesRef.current;
    if (samples.length < 2) return { hasMomentum: false, direction: 0 };
    
    // Get recent samples (last 3)
    const recentSamples = samples.slice(-3);
    const totalDelta = recentSamples.reduce((sum, sample) => sum + sample.delta, 0);
    
    // Very simple momentum detection
    const hasMomentum = Math.abs(totalDelta) > 10; // Lower threshold
    const direction = totalDelta > 0 ? 1 : -1;
    
    return { hasMomentum, direction };
  };

  // Handle wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't interfere if already scrolling
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      
      const now = performance.now();
      lastWheelTimeRef.current = now;
      
      // Add sample
      wheelSamplesRef.current.push({ delta: e.deltaY, time: now });
      
      // Keep only last 5 samples
      if (wheelSamplesRef.current.length > 5) {
        wheelSamplesRef.current.shift();
      }
      
      // Prevent default scrolling
      e.preventDefault();
      
      // Wait for wheel events to stop
      setTimeout(() => {
        if (now === lastWheelTimeRef.current) {
          processWheelGesture();
        }
      }, 100);
    };

    const processWheelGesture = () => {
      const currentScroll = window.scrollY;
      const currentSectionIndex = getCurrentSectionIndex(currentScroll);
      const momentum = detectMomentum();
      
      if (momentum.hasMomentum) {
        // HAS MOMENTUM - move to next slide only
        let targetSectionIndex;
        
        if (momentum.direction > 0) {
          // Scrolling down - next section
          targetSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        } else {
          // Scrolling up - previous section
          targetSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }
        
        // Only move if changing sections
        if (targetSectionIndex !== currentSectionIndex) {
          scrollToSection(targetSectionIndex);
        }
      } else {
        // NO MOMENTUM - center current slide
        const currentTargetScroll = scrollTargets[currentSectionIndex];
        const distanceFromCenter = Math.abs(currentScroll - currentTargetScroll);
        
        if (distanceFromCenter > 50) {
          scrollToSection(currentSectionIndex);
        }
      }
      
      // Clear samples
      wheelSamplesRef.current = [];
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [sections.length]);

  // Handle regular scroll for progress tracking
  useEffect(() => {
    const handleScroll = () => {
      // Don't update during controlled scrolling
      if (isScrollingRef.current) return;
      
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
    if (targetIndex >= 0 && targetIndex < sections.length && !isScrollingRef.current) {
      scrollToSection(targetIndex);
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