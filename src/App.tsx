import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sections = ['hero', 'strategic', 'transformation'];

  // Navigate to specific section
  const navigateToSection = (targetSection: number) => {
    if (targetSection >= 0 && targetSection < sections.length && !isTransitioning) {
      setIsTransitioning(true);
      setLastScrollTime(Date.now());
      setCurrentSection(targetSection);
      
      sectionRefs.current[targetSection]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Reset transition lock
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }
  };

  // Section visibility observers
  useEffect(() => {
    const observers = sectionRefs.current.map((sectionRef, index) => {
      if (!sectionRef) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setCurrentSection(index);
          }
        },
        { threshold: 0.6 }
      );
      
      observer.observe(sectionRef);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Global wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Ignore rapid scroll events
      if (now - lastScrollTime < 150) {
        e.preventDefault();
        return;
      }
      
      // Don't handle if already transitioning
      if (isTransitioning || now - lastScrollTime < 300) {
        e.preventDefault();
        return;
      }
      
      // Check if we're in the transformation section (which has its own scroll handling)
      const transformationSection = sectionRefs.current[2];
      if (transformationSection) {
        const rect = transformationSection.getBoundingClientRect();
        const isInTransformationSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
        
        // If we're in the transformation section, let it handle its own scrolling
        if (isInTransformationSection && currentSection === 2) {
          return;
        }
      }
      
      // Prevent default scroll behavior for section navigation
      e.preventDefault();
      
      // Accumulate scroll delta
      const newAccumulator = scrollAccumulator + Math.abs(e.deltaY);
      setScrollAccumulator(newAccumulator);
      
      // Require moderate scroll distance before navigating
      const scrollThreshold = 30;
      
      if (newAccumulator < scrollThreshold) {
        setLastScrollTime(now);
        return;
      }
      
      // Reset accumulator after successful navigation
      setScrollAccumulator(0);
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetSection = currentSection + direction;
      
      // Navigate to next/previous section if within bounds
      if (targetSection >= 0 && targetSection < sections.length) {
        setLastScrollTime(now);
        navigateToSection(targetSection);
      }
    };

    // Reset scroll accumulator when not scrolling
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
  }, [currentSection, isTransitioning, lastScrollTime, scrollAccumulator]);

  return (
    <div className="bg-black min-h-screen overflow-hidden smooth-scroll">
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
      
      <Header />
      
      <div 
        ref={el => sectionRefs.current[0] = el}
        className="snap-start"
      >
        <Hero />
      </div>
      
      <div 
        ref={el => sectionRefs.current[1] = el}
        className="snap-start"
      >
        <OpportunityStatement />
      </div>
      
      <div 
        ref={el => sectionRefs.current[2] = el}
        className="snap-start"
      >
        <TransformationProcess />
      </div>
    </div>
  );
}

export default App;