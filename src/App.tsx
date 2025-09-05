import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSnappingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  const sections = ['hero', 'strategic', 'transformation-1', 'transformation-2', 'transformation-3'];

  // Smooth scroll with section snapping
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      
      // Determine current section based on scroll position with individual slide detection
      let currentSectionIndex = 0;
      
      if (scrollTop < windowHeight * 0.5) {
        currentSectionIndex = 0; // Hero
      } else if (scrollTop < windowHeight * 1.5) {
        currentSectionIndex = 1; // Strategic
      } else {
        // Transformation slides (each is 100vh)
        const transformationStart = windowHeight * 2;
        const transformationProgress = scrollTop - transformationStart;
        const slideIndex = Math.floor(transformationProgress / windowHeight);
        currentSectionIndex = Math.min(2 + slideIndex, 4); // Slides 2, 3, 4
      }
      
      const clampedIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
      
      if (clampedIndex !== currentSection) {
        setCurrentSection(clampedIndex);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (isSnappingRef.current) return;
      
      const now = Date.now();
      lastScrollTimeRef.current = now;
      
      if (!isScrolling) {
        setIsScrolling(true);
      }

      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout for scroll end detection
      scrollTimeoutRef.current = setTimeout(() => {
        if (Date.now() - lastScrollTimeRef.current >= 150) {
          setIsScrolling(false);
          snapToNearestSection();
        }
      }, 150);
    };

    const snapToNearestSection = () => {
      if (isSnappingRef.current) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Find the closest section/slide
      let closestSection = 0;
      let minDistance = Infinity;
      
      // Check all possible scroll positions
      const scrollTargets = [
        0, // Hero
        windowHeight, // Strategic
        windowHeight * 2, // Transformation slide 1
        windowHeight * 3, // Transformation slide 2
        windowHeight * 4, // Transformation slide 3
      ];
      
      scrollTargets.forEach((targetScroll, index) => {
        const distance = Math.abs(scrollTop - targetScroll);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = index;
        }
      });

      // Only snap if we're not already very close to a section boundary
      const targetScrollTop = scrollTargets[closestSection];
      const distanceToTarget = Math.abs(scrollTop - targetScrollTop);
      
      if (distanceToTarget > 50) { // Only snap if more than 50px away
        isSnappingRef.current = true;
        
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });

        // Reset snapping flag after animation completes
        setTimeout(() => {
          isSnappingRef.current = false;
        }, 800);
      }
    };

    // Enhanced wheel handling for smoother experience
    const handleWheel = (e: WheelEvent) => {
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      // Allow natural scrolling but with momentum
      const delta = e.deltaY;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 5 - windowHeight; // 5 sections total
      
      // Smooth momentum scrolling
      const targetScroll = Math.max(0, Math.min(scrollTop + delta * 1.2, maxScroll));
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });
      
      e.preventDefault();
    };

    // Touch handling for mobile
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 5 - windowHeight;
      
      const targetScroll = Math.max(0, Math.min(scrollTop + deltaY * 2, maxScroll));
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });
      
      touchStartY = touchY;
    };

    const handleTouchEnd = () => {
      const touchDuration = Date.now() - touchStartTime;
      
      // Add momentum for quick swipes
      if (touchDuration < 200) {
        setTimeout(() => {
          if (!isScrolling) {
            snapToNearestSection();
          }
        }, 100);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection, isScrolling, sections.length]);

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
          style={{
            transform: `translateY(${scrollProgress * -20}px)`,
            transition: isScrolling ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <Hero />
        </div>
        
        <div 
          ref={el => sectionRefs.current[1] = el}
          className="min-h-screen"
          style={{
            transform: `translateY(${Math.max(0, (scrollProgress - 0.2) * -30)}px)`,
            transition: isScrolling ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
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
            onClick={() => {
              const scrollTargets = [
                0, // Hero
                window.innerHeight, // Strategic
                window.innerHeight * 2, // Transformation slide 1
                window.innerHeight * 3, // Transformation slide 2
                window.innerHeight * 4, // Transformation slide 3
              ];
              const targetScroll = scrollTargets[index];
              isSnappingRef.current = true;
              window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
              });
              setTimeout(() => {
                isSnappingRef.current = false;
              }, 800);
            }}
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