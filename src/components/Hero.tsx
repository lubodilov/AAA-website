import React, { useState, useEffect } from 'react';

export default function Hero() {
  const headlines = [
    {
      line1: "Your Business Vision",
      highlight: "Our Upgrade",
      line2: "Unmatched Results"
    },
    {
      line1: "AI Systems",
      highlight: "Built for scaling",
      line2: "Your Business"
    },
    {
      line1: "Results First",
      highlight: "Technology Second",
      line2: "Your Success Always"
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
          // Skip the space between line1 and highlight
          charIndex++;
          return;
        } else if (charIndex <= line1Length + highlightLength) {
          setDisplayText(prev => ({ ...prev, highlight: prev.highlight + char }));
        } else if (charIndex === line1Length + highlightLength + 1) {
          // Skip the space between highlight and line2
          charIndex++;
          return;
        } else {
          setDisplayText(prev => ({ ...prev, line2: prev.line2 + char }));
        }
        
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Wait 5 seconds before starting next headline
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        }, 5000);
      }
    }, 100); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      
      <div className="relative text-center max-w-6xl mx-auto z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white leading-tight mb-8 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex flex-col justify-center">
          <div className="font-mono font-thin">
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
        
      </div>
      
    </section>
  );
}