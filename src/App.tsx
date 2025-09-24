// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';
import ProofOfDominance from './components/ProofOfDominance';
import VisionAssessment from './components/VisionAssessment';
import PortfolioProjects from './components/PortfolioProjects';
import ContactForm from './components/ContactForm';
import ScheduleCall from './components/ScheduleCall';
import VoiceflowWidget from './components/VoiceflowWidget';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);

  // Popups
  const [contactOpen, setContactOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  // Calendly kept mounted (warm) from app start
  const [hasOpenedSchedule] = useState(true);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const scheduleRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Modal lock + ESC for both
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

  const sections = ['hero', 'strategic', 'transformation', 'proof', 'portfolio', 'assessment'];

  const navigateToSection = (targetSection: number) => {
    if (targetSection >= 0 && targetSection < sections.length && !isTransitioning) {
      setIsTransitioning(true);
      setLastScrollTime(Date.now());
      setCurrentSection(targetSection);

      sectionRefs.current[targetSection]?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      setTimeout(() => setIsTransitioning(false), 1200);
    }
  };

  // Section observers
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && entry.intersectionRatio > 0.6 && setCurrentSection(i),
        { threshold: 0.6 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Scroll handler (blocked when any modal is open)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (contactOpen || scheduleOpen) return;

      const now = Date.now();
      if (now - lastScrollTime < 150 || isTransitioning || now - lastScrollTime < 300) {
        e.preventDefault();
        return;
      }

      const transformationSection = sectionRefs.current[2];
      if (transformationSection) {
        const rect = transformationSection.getBoundingClientRect();
        const inTransformation = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
        if (inTransformation && currentSection === 2) return;
      }

      e.preventDefault();
      const newAcc = scrollAccumulator + Math.abs(e.deltaY);
      setScrollAccumulator(newAcc);

      if (newAcc < 30) {
        setLastScrollTime(now);
        return;
      }
      setScrollAccumulator(0);

      const dir = e.deltaY > 0 ? 1 : -1;
      const target = currentSection + dir;
      if (target >= 0 && target < sections.length) {
        setLastScrollTime(now);
        navigateToSection(target);
      }
    };

    const reset = () => {
      const now = Date.now();
      if (now - lastScrollTime > 400) setScrollAccumulator(0);
    };

    const interval = setInterval(reset, 200);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearInterval(interval);
    };
  }, [currentSection, isTransitioning, lastScrollTime, scrollAccumulator, contactOpen, scheduleOpen]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (scheduleOpen) setScheduleOpen(false);
    else if (contactOpen) setContactOpen(false);
  };

  return (
    <div className="bg-black min-h-screen overflow-hidden smooth-scroll">
      {/* Fixed video background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/hero_animation.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black via-gray-900/80 to-black" />
      </div>

      <Header
        onOpenContact={() => setContactOpen(true)}
        onOpenSchedule={() => setScheduleOpen(true)}
      />

      {/* Sections */}
      <div ref={(el) => (sectionRefs.current[0] = el)} className="snap-start">
        <Hero />
      </div>
      <div ref={(el) => (sectionRefs.current[1] = el)} className="snap-start">
        <OpportunityStatement />
      </div>
      <div ref={(el) => (sectionRefs.current[2] = el)} className="snap-start">
        <TransformationProcess />
      </div>
      <div ref={(el) => (sectionRefs.current[3] = el)} className="snap-start">
        <ProofOfDominance />
      </div>
      <div ref={(el) => (sectionRefs.current[4] = el)} className="snap-start">
        <PortfolioProjects />
      </div>
      <div ref={(el) => (sectionRefs.current[5] = el)} className="snap-start">
        <VisionAssessment />
      </div>

      {/* CONTACT POPUP (only when open) */}
      {contactOpen && (
        <div
          onMouseDown={onBackdrop}
          className="fixed inset-0 z-[100] backdrop-blur-[6px] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-label="Contact"
        >
          {/* Spotlight / vignette */}
          <div
            className="absolute inset-0 pointer-events-none animate-spotlight"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.0) 22%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)'
            }}
          />
          {/* Base dim */}
          <div className="absolute inset-0 bg-black/40" />

          <div
            ref={contactRef}
            tabIndex={-1}
            className="relative w-full max-w-2xl max-h-[90vh] outline-none flex flex-col animate-panel"
          >
            <div className="bg-black/60 border border-white/10 rounded-2xl shadow-2xl flex flex-col flex-1 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white text-lg font-light">Contact</h3>
                <button
                  onClick={() => setContactOpen(false)}
                  className="text-white/70 hover:text-white transition"
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

      {/* SCHEDULE A CALL POPUP (PERSISTENT + PRELOADED) */}
      {hasOpenedSchedule && (
        <div
          onMouseDown={onBackdrop}
          className={`fixed inset-0 z-[100] backdrop-blur-[6px] flex items-center justify-center p-4
            ${scheduleOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}
            transition-opacity duration-300`}
          aria-modal="true"
          role="dialog"
          aria-label="Schedule a Call"
          aria-hidden={scheduleOpen ? 'false' : 'true'}
        >
          {/* Spotlight / vignette */}
          <div
            className="absolute inset-0 pointer-events-none animate-spotlight"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.0) 22%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)'
            }}
          />
          {/* Base dim */}
          <div className="absolute inset-0 bg-black/40" />

          <div
            ref={scheduleRef}
            tabIndex={-1}
            className={`relative w-full max-w-2xl max-h-[90vh] outline-none flex flex-col ${scheduleOpen ? 'animate-panel' : ''}`}
          >
            <div className="bg-black/60 border border-white/10 rounded-2xl shadow-2xl flex flex-col flex-1 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white text-lg font-light">Schedule a Call</h3>
                <button
                  onClick={() => setScheduleOpen(false)}
                  className="text-white/70 hover:text-white transition"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {/* Keep Calendly mounted always; just show/hide via parent */}
                <ScheduleCall isOpen={scheduleOpen} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voiceflow chat widget (bottom-right) */}
      <VoiceflowWidget projectID="68d052aa5682320b1b1bc769" />
    </div>
  );
}

export default App;
