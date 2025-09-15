import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';
import ProofOfDominance from './components/ProofOfDominance';
import SlideNavigation from './components/SlideNavigation';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slides = [
    { id: 'hero', name: 'Hero' },
    { id: 'strategic', name: 'Strategic' },
    { id: 'transformation', name: 'Process' },
    { id: 'proof', name: 'Results' }
  ];

  // Scroll to specific slide
  const scrollToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < slides.length && slideRefs.current[slideIndex]) {
      slideRefs.current[slideIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Track current slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      slideRefs.current.forEach((slideRef, index) => {
        if (slideRef) {
          const rect = slideRef.getBoundingClientRect();
          const slideTop = window.scrollY + rect.top;
          const slideBottom = slideTop + rect.height;
          
          if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
            setCurrentSlide(index);
          }
        }
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div className="bg-black">
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
      
      {/* Main Scroll Container with Snap */}
      <div 
        ref={containerRef}
        className="relative z-10 snap-y snap-mandatory overflow-y-auto h-screen"
      >
        <div 
          ref={el => slideRefs.current[0] = el}
          className="snap-start snap-always"
        >
          <Hero />
        </div>
        
        <div 
          ref={el => slideRefs.current[1] = el}
          className="snap-start snap-always"
        >
          <OpportunityStatement />
        </div>
        
        <div 
          ref={el => slideRefs.current[2] = el}
          className="snap-start snap-always"
        >
          <TransformationProcess />
        </div>
        
        <div 
          ref={el => slideRefs.current[3] = el}
          className="snap-start snap-always"
        >
          <ProofOfDominance />
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        slides={slides}
        currentSlide={currentSlide}
        onSlideChange={scrollToSlide}
      />
    </div>
  );
}

export default App;