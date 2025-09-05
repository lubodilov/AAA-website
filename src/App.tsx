import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const momentumTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollPositionRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  const sections = ['hero', 'strategic', 'transformation-1', 'transformation-2', 'transformation-3'];

  // Momentum-aware scroll with prediction
  useEffect(() => {
    let ticking = false;
    let lastTime = 0;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      
      // Calculate scroll velocity for momentum prediction
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      const deltaScroll = scrollTop - lastScrollPositionRef.current;
      
      if (deltaTime > 0) {
        scrollVelocityRef.current = deltaScroll / deltaTime;
      }
      
      lastScrollPositionRef.current = scrollTop;
      lastTime = currentTime;
      
      // Determine current section
      let currentSectionIndex = 0;
      
      if (scrollTop < windowHeight * 0.5) {
        currentSectionIndex = 0; // Hero
      } else if (scrollTop < windowHeight * 1.5) {
        currentSectionIndex = 1; // Strategic
      } else {
        const transformationStart = windowHeight * 2;
        const transformationProgress = scrollTop - transformationStart;
        const slideIndex = Math.floor(transformationProgress / windowHeight);
        currentSectionIndex = Math.min(2 + slideIndex, 4);
      }
      
      const clampedIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
      
      if (clampedIndex !== currentSection) {
        setCurrentSection(clampedIndex);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
      
      // Clear existing momentum timeout
      if (momentumTimeoutRef.current) {
        clearTimeout(momentumTimeoutRef.current);
      }
      
      // Predict momentum direction and target
      momentumTimeoutRef.current = setTimeout(() => {
        predictAndSnapToTarget();
      }, 50); // Much shorter delay for immediate prediction
    };

    const predictAndSnapToTarget = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const velocity = scrollVelocityRef.current;
      
      const scrollTargets = [
        0,
        windowHeight,
        windowHeight * 2,
        windowHeight * 3,
        windowHeight * 4,
      ];
      
      let targetSection = 0;
      let minDistance = Infinity;
      
      // Find closest section considering momentum
      scrollTargets.forEach((target, index) => {
        const distance = Math.abs(scrollTop - target);
        
        // Apply momentum prediction - if scrolling fast in a direction, 
        // prefer the target in that direction
        let adjustedDistance = distance;
        
        if (Math.abs(velocity) > 0.5) { // If there's significant velocity
          if (velocity > 0 && target > scrollTop) {
            // Scrolling down, prefer targets below
            adjustedDistance *= 0.7;
          } else if (velocity < 0 && target < scrollTop) {
            // Scrolling up, prefer targets above
            adjustedDistance *= 0.7;
          }
        }
        
        if (adjustedDistance < minDistance) {
          minDistance = adjustedDistance;
          targetSection = index;
        }
      });
      
      const targetScrollTop = scrollTargets[targetSection];
      const distanceToTarget = Math.abs(scrollTop - targetScrollTop);
      
      // Snap if we're not already very close
      if (distanceToTarget > 30) {
        // Use CSS scroll-behavior for ultra-smooth snapping
        document.documentElement.style.scrollBehavior = 'smooth';
        window.scrollTo(0, targetScrollTop);
        
        // Reset scroll behavior after animation
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'auto';
        }, 1000);
      }
    };

    // Wheel handling with momentum prediction
    const handleWheel = (e: WheelEvent) => {
      // Let the browser handle natural scrolling with momentum
      // Our scroll handler will predict and snap appropriately
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      
      if (momentumTimeoutRef.current) {
        clearTimeout(momentumTimeoutRef.current);
      }
    };
  }, [currentSection, sections.length]);

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
          className="min-h-screen snap-start"
        >
          <Hero />
        </div>
        
        <div 
          ref={el => sectionRefs.current[1] = el}
          className="min-h-screen snap-start"
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
                0, window.innerHeight, window.innerHeight * 2, window.innerHeight * 3, window.innerHeight * 4
              ];
              document.documentElement.style.scrollBehavior = 'smooth';
              window.scrollTo(0, scrollTargets[index]);
              setTimeout(() => { document.documentElement.style.scrollBehavior = 'auto'; }, 1000);
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