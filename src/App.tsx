import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const velocityRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const lastScrollPositionRef = useRef(0);
  const momentumInterceptRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sections = ['hero', 'strategic', 'transformation-1', 'transformation-2', 'transformation-3'];
  const scrollTargets = [0, window.innerHeight, window.innerHeight * 2, window.innerHeight * 3, window.innerHeight * 4];

  // Calculate scroll velocity
  const calculateVelocity = (currentScroll: number, currentTime: number) => {
    const deltaScroll = currentScroll - lastScrollPositionRef.current;
    const deltaTime = currentTime - lastScrollTimeRef.current;
    
    if (deltaTime > 0) {
      velocityRef.current = deltaScroll / deltaTime;
    }
    
    lastScrollPositionRef.current = currentScroll;
    lastScrollTimeRef.current = currentTime;
  };

  // Predict target based on momentum
  const predictMomentumTarget = (currentScroll: number, velocity: number) => {
    // Only predict if there's significant velocity
    if (Math.abs(velocity) < 0.3) {
      // Low velocity - snap to nearest
      let nearestTarget = scrollTargets[0];
      let minDistance = Math.abs(currentScroll - nearestTarget);
      
      scrollTargets.forEach(target => {
        const distance = Math.abs(currentScroll - target);
        if (distance < minDistance) {
          minDistance = distance;
          nearestTarget = target;
        }
      });
      
      return nearestTarget;
    }
    
    // High velocity - predict momentum target
    const momentumDistance = velocity * 300; // Predict momentum travel
    const predictedPosition = currentScroll + momentumDistance;
    
    // Find target in the direction of momentum
    if (velocity > 0) {
      // Scrolling down - find next target
      const nextTarget = scrollTargets.find(target => target > currentScroll + 50);
      return nextTarget || scrollTargets[scrollTargets.length - 1];
    } else {
      // Scrolling up - find previous target
      const prevTargets = scrollTargets.filter(target => target < currentScroll - 50);
      return prevTargets[prevTargets.length - 1] || scrollTargets[0];
    }
  };

  // Smooth momentum interception
  const interceptMomentum = (targetScroll: number) => {
    momentumInterceptRef.current = true;
    
    // Use smooth scroll behavior for natural deceleration
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, targetScroll);
    
    // Reset after animation completes
    setTimeout(() => {
      momentumInterceptRef.current = false;
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1000);
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
      
      // Calculate velocity
      calculateVelocity(scrollTop, currentTime);
      
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
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect scroll end and predict target
      scrollTimeoutRef.current = setTimeout(() => {
        if (!momentumInterceptRef.current) {
          const currentScroll = window.scrollY;
          const velocity = velocityRef.current;
          const targetScroll = predictMomentumTarget(currentScroll, velocity);
          
          // Only intercept if we're not already at the target
          const distanceToTarget = Math.abs(currentScroll - targetScroll);
          if (distanceToTarget > 30) {
            interceptMomentum(targetScroll);
          }
        }
      }, 100); // Shorter delay for responsive prediction
    };

    // Wheel handling - block during momentum interception
    const handleWheel = (e: WheelEvent) => {
      if (momentumInterceptRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
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
              momentumInterceptRef.current = true;
              document.documentElement.style.scrollBehavior = 'smooth';
              window.scrollTo(0, scrollTargets[index]);
              setTimeout(() => { 
                momentumInterceptRef.current = false;
                document.documentElement.style.scrollBehavior = 'auto';
              }, 1000);
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