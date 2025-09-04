import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useScrollSystem = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Fall back to native scroll for accessibility
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    if (isInitialized.current) return;
    isInitialized.current = true;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.12,
      normalizeWheel: true,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Initialize text splitting and animations after a short delay
    setTimeout(() => {
      initializeAnimations();
    }, 100);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const initializeAnimations = () => {
    // Split text elements
    const splitElements = document.querySelectorAll('.split-text');
    const splits: SplitType[] = [];

    splitElements.forEach((element) => {
      const split = new SplitType(element as HTMLElement, { 
        types: 'lines,words',
        tagName: 'span'
      });
      splits.push(split);

      // Wrap lines in overflow hidden containers
      if (split.lines) {
        split.lines.forEach((line) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }
    });

    // Hero section pin and animations
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Hero text reveal
      const heroSplit = splits.find(split => 
        (split.elements[0] as HTMLElement).closest('.hero-section')
      );
      
      if (heroSplit?.lines) {
        gsap.from(heroSplit.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: heroSection,
            start: 'top 50%',
            once: true,
          }
        });
      }
    }

    // Strategic positioning section animations
    const strategicSection = document.querySelector('.strategic-section');
    if (strategicSection) {
      const strategicSplit = splits.find(split => 
        (split.elements[0] as HTMLElement).closest('.strategic-section')
      );
      
      if (strategicSplit?.lines) {
        gsap.from(strategicSplit.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: strategicSection,
            start: 'top 70%',
            once: true,
          }
        });
      }

      // Counter animation
      const counter = strategicSection.querySelector('.counter-value');
      if (counter) {
        const countObj = { value: 0 };
        gsap.to(countObj, {
          value: 467,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.floor(countObj.value).toString();
          },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            once: true,
          }
        });
      }
    }

    // Transformation process slides
    const transformationSection = document.querySelector('.transformation-section');
    if (transformationSection) {
      const slides = transformationSection.querySelectorAll('.transformation-slide');
      
      slides.forEach((slide, index) => {
        // Pin each slide
        ScrollTrigger.create({
          trigger: slide,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // Animate slide content
        const slideContent = slide.querySelectorAll('.slide-content > *');
        gsap.from(slideContent, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: slide,
            start: 'top 60%',
            once: true,
          }
        });

        // Phase text animation
        const phaseText = slide.querySelector('.phase-text');
        if (phaseText) {
          gsap.from(phaseText, {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 80%',
              once: true,
            }
          });
        }
      });
    }

    // General reveal animations for other elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
      gsap.from(element, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach((element) => {
      gsap.to(element, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  };

  return { lenis: lenisRef.current };
};