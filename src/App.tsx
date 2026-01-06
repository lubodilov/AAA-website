import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SEOHead from './components/SEOHead';
import Hero from './components/Hero';
import CredibilitySlide from './components/CredibilitySlide';
import ProblemSlide from './components/ProblemSlide';
import SolutionSlide from './components/SolutionSlide';
import SystemsSlide from './components/SystemsSlide';
import ResultsSlide from './components/ResultsSlide';
import MethodSlide from './components/MethodSlide';
import OfferPricingSlide from './components/OfferPricingSlide';
import FAQSlide from './components/FAQSlide';
import BookAuditSlide from './components/BookAuditSlide';
import ContactForm from './components/ContactForm';
import ScheduleCall from './components/ScheduleCall';
import StickyCTABar from './components/StickyCTABar';
import VoiceflowWidget from './components/VoiceflowWidget';
import SlideNavigation from './components/SlideNavigation';

// Lazy load Portfolio page for better initial load performance
const Portfolio = lazy(() => import('./components/Portfolio'));

function App() {
  return (
    <Router>
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay bg-noise"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={
              <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading portfolio...</p>
                </div>
              </div>
            }>
              <Portfolio />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Modal states
  const [contactOpen, setContactOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [hasOpenedSchedule] = useState(true);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const scheduleRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    { id: 'hero', name: 'Hero' },
    { id: 'credibility', name: 'Credibility' },
    { id: 'problem', name: 'Problem' },
    { id: 'solution', name: 'Solution' },
    { id: 'systems', name: 'Systems' },
    { id: 'results', name: 'Results' },
    { id: 'method', name: 'Method' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'faq', name: 'FAQ' },
    { id: 'book', name: 'Book Audit' }
  ];

  // Modal management with ESC key support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (scheduleOpen) setScheduleOpen(false);
      else if (contactOpen) setContactOpen(false);
    };

    const anyOpen = contactOpen || scheduleOpen;
    if (anyOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
      setTimeout(() => {
        if (contactOpen) contactRef.current?.focus();
        if (scheduleOpen) scheduleRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [contactOpen, scheduleOpen]);

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
      if (!containerRef.current) return;

      // Update header scroll state
      setIsScrolled(containerRef.current.scrollTop > 50);

      const scrollPosition = containerRef.current.scrollTop + window.innerHeight / 2;

      slideRefs.current.forEach((slideRef, index) => {
        if (slideRef) {
          const rect = slideRef.getBoundingClientRect();
          const slideTop = containerRef.current!.scrollTop + rect.top;
          const slideBottom = slideTop + rect.height;

          if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
            setCurrentSlide(index);
          }
        }
      });
    };

    // Throttle scroll events for performance (100ms delay for better performance)
    let timeoutId: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', throttledScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', throttledScroll);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (scheduleOpen) setScheduleOpen(false);
    else if (contactOpen) setContactOpen(false);
  };

  return (
    <div className="bg-black">
      <SEOHead />
      {/* Fixed Video Background */}
      <div className="fixed inset-0 z-0" role="presentation" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-label="Background animation video"
        >
          <source src="/hero_animation.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        </video>
      </div>

      <Header
        onOpenContact={() => setContactOpen(true)}
        onOpenSchedule={() => setScheduleOpen(true)}
        isScrolled={isScrolled}
      />

      {/* Main Scroll Container with Snap */}
      <main
        ref={containerRef}
        className="relative z-10 snap-y snap-mandatory overflow-y-auto h-screen"
        role="main"
        aria-label="Main content"
      >
        <div ref={el => slideRefs.current[0] = el} className="snap-start snap-always">
          <Hero
            onOpenContact={() => setContactOpen(true)}
            onOpenSchedule={() => setScheduleOpen(true)}
            onScrollToResults={() => scrollToSlide(5)}
          />
        </div>

        <div ref={el => slideRefs.current[1] = el} className="snap-start snap-always">
          <CredibilitySlide onScrollToCases={() => scrollToSlide(5)} />
        </div>

        <div ref={el => slideRefs.current[2] = el} className="snap-start snap-always">
          <ProblemSlide />
        </div>

        <div ref={el => slideRefs.current[3] = el} className="snap-start snap-always">
          <SolutionSlide onScrollToSystems={() => scrollToSlide(4)} />
        </div>

        <div ref={el => slideRefs.current[4] = el} className="snap-start snap-always">
          <SystemsSlide onOpenSchedule={() => setScheduleOpen(true)} />
        </div>

        <div ref={el => slideRefs.current[5] = el} className="snap-start snap-always">
          <ResultsSlide onOpenSchedule={() => setScheduleOpen(true)} />
        </div>

        <div ref={el => slideRefs.current[6] = el} className="snap-start snap-always">
          <MethodSlide />
        </div>

        <div ref={el => slideRefs.current[7] = el} className="snap-start snap-always">
          <OfferPricingSlide onOpenSchedule={() => setScheduleOpen(true)} />
        </div>

        <div ref={el => slideRefs.current[8] = el} className="snap-start snap-always">
          <FAQSlide />
        </div>

        <div ref={el => slideRefs.current[9] = el} className="snap-start snap-always">
          <BookAuditSlide isOpen={true} />
        </div>
      </main>

      {/* Slide Navigation Dots */}
      <SlideNavigation
        slides={slides}
        currentSlide={currentSlide}
        onSlideChange={scrollToSlide}
      />

      {/* CONTACT POPUP */}
      {contactOpen && (
        <div
          onMouseDown={onBackdrop}
          className="fixed inset-0 z-[100] backdrop-blur-[2px] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-label="Contact Form"
          aria-describedby="contact-description"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.35) 100%)'
            }}
          />
          <div className="absolute inset-0 bg-black/5" />

          <div
            ref={contactRef}
            tabIndex={-1}
            className="relative w-full max-w-2xl max-h-[90vh] outline-none flex flex-col animate-in fade-in-0 zoom-in-95 duration-300"
          >
            <div className="bg-black/60 border border-white/10 rounded-2xl shadow-2xl flex flex-col flex-1 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 id="contact-description" className="text-white text-lg font-light">Get Started</h3>
                <button
                  onClick={() => setContactOpen(false)}
                  className="text-white/70 hover:text-white transition text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE A CALL POPUP */}
      {hasOpenedSchedule && (
        <div
          onMouseDown={onBackdrop}
          className={`fixed inset-0 z-[100] backdrop-blur-[2px] flex items-center justify-center p-4 ${
            scheduleOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
          } transition-opacity duration-300`}
          aria-modal="true"
          role="dialog"
          aria-label="Schedule a Call"
          aria-describedby="schedule-description"
          aria-hidden={scheduleOpen ? 'false' : 'true'}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.35) 100%)'
            }}
          />
          <div className="absolute inset-0 bg-black/5" />
          <div
            ref={scheduleRef}
            tabIndex={-1}
            className={`relative w-full max-w-6xl max-h-[90vh] outline-none flex flex-col ${
              scheduleOpen ? 'animate-in fade-in-0 zoom-in-95 duration-300' : ''
            }`}
          >
            <div className="bg-black/60 border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row flex-1 overflow-hidden relative">
              {/* Close Button - Positioned Absolutely */}
              <button
                onClick={() => setScheduleOpen(false)}
                className="absolute top-4 right-4 z-20 text-black/70 hover:text-black transition text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10"
                aria-label="Close"
              >
                ×
              </button>

              {/* Left Side - Calendly Widget */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 id="schedule-description" className="text-white text-xl font-light">Book Your Acquisition Audit</h3>
                  <p className="text-gray-400 text-sm font-light mt-1">Choose a time that works for you</p>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <ScheduleCall isOpen={scheduleOpen} />
                </div>
              </div>

              {/* Right Side - Portrait Image */}
              <div className="hidden md:block md:w-80 lg:w-96 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 z-10"></div>
                <img
                  src="/lubo_dilov_ai.jpg"
                  alt="Lubo Dilov"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voiceflow AI Chatbot Widget */}
      <VoiceflowWidget projectID="68d052aa5682320b1b1bc769" />
    </div>
  );
}

export default App;
