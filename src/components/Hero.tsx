import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenContact?: () => void;
  onOpenSchedule?: () => void;
  onScrollToResults?: () => void;
}

export default function Hero({ onOpenContact, onOpenSchedule, onScrollToResults }: HeroProps) {
  const headlines = [
    {
      line1: "AI for B2B acquisition",
      highlight: "that pays for itself",
      line2: "in 28 days"
    },
    {
      line1: "Turn your acquisition",
      highlight: "from busy work",
      line2: "into compounding revenue"
    },
    {
      line1: "Systems that find leaks,",
      highlight: "deploy AI,",
      line2: "and move the needle"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState({ line1: '', highlight: '', line2: '' });
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentHeadline = headlines[currentIndex];
    const fullText = currentHeadline.line1 + ' ' + currentHeadline.highlight + ' ' + currentHeadline.line2;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    setDisplayText({ line1: '', highlight: '', line2: '' });
    setIsTyping(true);

    const getTypingSpeed = (char: string, nextChar?: string) => {
      // Faster for spaces
      if (char === ' ') return 30;
      // Pause at punctuation
      if ([',', '.', '!', '?', ':', ';'].includes(char)) return 200;
      // Slightly longer for end of words
      if (nextChar === ' ') return 60;
      // Variable speed for natural feel (40-70ms)
      return 40 + Math.random() * 30;
    };

    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        const char = fullText[charIndex];
        const nextChar = fullText[charIndex + 1];
        const line1Length = currentHeadline.line1.length;
        const highlightLength = currentHeadline.highlight.length;

        if (charIndex < line1Length) {
          setDisplayText(prev => ({ ...prev, line1: prev.line1 + char }));
        } else if (charIndex === line1Length) {
          charIndex++;
          timeoutId = setTimeout(typeNextChar, 30);
          return;
        } else if (charIndex <= line1Length + highlightLength) {
          setDisplayText(prev => ({ ...prev, highlight: prev.highlight + char }));
        } else if (charIndex === line1Length + highlightLength + 1) {
          charIndex++;
          timeoutId = setTimeout(typeNextChar, 30);
          return;
        } else {
          setDisplayText(prev => ({ ...prev, line2: prev.line2 + char }));
        }

        charIndex++;
        const delay = getTypingSpeed(char, nextChar);
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);

        timeoutId = setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        }, 2500);
      }
    };

    typeNextChar();

    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  return (
    <section className="h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-0"></div>
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative text-center max-w-6xl mx-auto z-30 w-full">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium text-white leading-[1.1] mb-8 sm:mb-12 min-h-[240px] sm:min-h-[300px] md:min-h-[350px] flex flex-col justify-center px-2 drop-shadow-2xl tracking-tighter">
          <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              {displayText.line1}
              {isTyping && displayText.line1.length > 0 && !displayText.highlight && !displayText.line2 && (
                <span
                  className="inline-block w-0.5 bg-white ml-1"
                  style={{
                    height: '0.8em',
                    animation: 'blink 1s step-end infinite'
                  }}
                />
              )}
            </div>
            <div className="relative inline-block my-2">
              <span
                className="italic font-light relative z-10"
                style={{ color: '#ff4d5e' }}
              >
                {displayText.highlight}
              </span>
              {displayText.highlight && (
                <div className="absolute inset-0 blur-2xl bg-red-600/20 opacity-50 z-0"></div>
              )}
              {isTyping && displayText.highlight.length > 0 && !displayText.line2 && (
                <span
                  className="inline-block w-0.5 ml-1 relative z-10"
                  style={{
                    height: '0.8em',
                    backgroundColor: '#ff4d5e',
                    animation: 'blink 1s step-end infinite'
                  }}
                />
              )}
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              {displayText.line2}
              {isTyping && displayText.line2.length > 0 && (
                <span
                  className="inline-block w-0.5 bg-white ml-1"
                  style={{
                    height: '0.8em',
                    animation: 'blink 1s step-end infinite'
                  }}
                />
              )}
              {!isTyping && (
                <span
                  className="inline-block w-0.5 bg-white ml-1"
                  style={{
                    height: '0.8em',
                    animation: 'blink 1s step-end infinite'
                  }}
                />
              )}
            </div>
          </div>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 w-full">
          <button
            onClick={onOpenSchedule}
            className="group relative px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full flex items-center justify-center space-x-3 border border-white/10">
              <Calendar className="w-5 h-5" />
              <span className="font-medium text-lg tracking-wide">Book a Call</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

          <button
            onClick={onScrollToResults}
            className="group relative px-8 py-4 rounded-full transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors"></div>
            <div className="relative flex items-center justify-center space-x-3 text-white">
              <span className="font-light text-lg tracking-wide">See our work</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
