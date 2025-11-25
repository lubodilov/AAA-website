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
      line2: "in 30–60 days"
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
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentHeadline = headlines[currentIndex];
    const fullText = currentHeadline.line1 + ' ' + currentHeadline.highlight + ' ' + currentHeadline.line2;
    let charIndex = 0;

    setDisplayText({ line1: '', highlight: '', line2: '' });
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        const char = fullText[charIndex];
        const line1Length = currentHeadline.line1.length;
        const highlightLength = currentHeadline.highlight.length;

        if (charIndex < line1Length) {
          setDisplayText(prev => ({ ...prev, line1: prev.line1 + char }));
        } else if (charIndex === line1Length) {
          charIndex++;
          return;
        } else if (charIndex <= line1Length + highlightLength) {
          setDisplayText(prev => ({ ...prev, highlight: prev.highlight + char }));
        } else if (charIndex === line1Length + highlightLength + 1) {
          charIndex++;
          return;
        } else {
          setDisplayText(prev => ({ ...prev, line2: prev.line2 + char }));
        }

        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        }, 3000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative text-center max-w-6xl mx-auto z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white leading-tight mb-12 min-h-[280px] md:min-h-[320px] flex flex-col justify-center drop-shadow-2xl">
          <div className="font-thin" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div>
              {displayText.line1}
              {isTyping && displayText.line1.length > 0 && !displayText.highlight && !displayText.line2 && (
                <span
                  className={`inline-block w-1 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ height: '0.8em', animation: 'none' }}
                >
                  |
                </span>
              )}
            </div>
            <div>
              <span
                className="font-extralight italic"
                style={{ color: '#991923' }}
              >
                {displayText.highlight}
              </span>
              {isTyping && displayText.highlight.length > 0 && !displayText.line2 && (
                <span
                  className={`inline-block w-1 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ height: '0.8em', animation: 'none', backgroundColor: '#991923' }}
                >
                  |
                </span>
              )}
            </div>
            <div>
              {displayText.line2}
              {isTyping && displayText.line2.length > 0 && (
                <span
                  className={`inline-block w-1 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ height: '0.8em', animation: 'none' }}
                >
                  |
                </span>
              )}
              {!isTyping && (
                <span
                  className={`inline-block w-1 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ height: '0.8em', animation: 'none' }}
                >
                  |
                </span>
              )}
            </div>
          </div>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenSchedule}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-light text-lg">Book a Call</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>

          <button
            onClick={onScrollToResults}
            className="group relative bg-transparent border border-gray-600 text-white px-8 py-4 rounded-full hover:border-red-600 transition-all duration-300 flex items-center space-x-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative z-10 font-light">See our work</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
