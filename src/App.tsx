import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  const sections = ['hero', 'strategic', 'transformation-1', 'transformation-2', 'transformation-3'];
  const totalSections = sections.length;

  // Simple scroll to section function
  const scrollToSection = (sectionIndex: number) => {
    if (isScrolling || sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    const targetScroll = sectionIndex * window.innerHeight;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // Handle wheel events for slide navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Wait for wheel events to settle
      scrollTimeoutRef.current = setTimeout(() => {
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = currentSection + direction;
        
        if (nextSection >= 0 && nextSection < totalSections) {
          scrollToSection(nextSection);
        }
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection, isScrolling, totalSections]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling]);

  // Calculate scroll progress
  const scrollProgress = (currentSection / (totalSections - 1)) * 100;

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
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <Header />
      
      {/* Content sections */}
      <div className="relative">
        <div className="h-screen">
          <Hero />
        </div>
        
        <div className="h-screen">
          <OpportunityStatement />
        </div>
        
        <TransformationProcess />
      </div>

      {/* Section Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className="group relative"
            disabled={isScrolling}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-red-600 scale-125 shadow-lg shadow-red-600/50' 
                  : 'bg-red-600/30 hover:bg-red-600/60'
              } ${isScrolling ? 'opacity-50' : ''}`}
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