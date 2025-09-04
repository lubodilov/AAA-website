import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OpportunityStatement from './components/StrategicPositioning';
import TransformationProcess from './components/TransformationProcess';
import { useScrollSystem } from './hooks/useScrollSystem';

function App() {
  // Initialize the Morningside-style scroll system
  useScrollSystem();

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
      
      <Header />
      
      {/* Main content with smooth scroll sections */}
      <div className="relative">
        <div className="hero-section min-h-screen">
          <Hero />
        </div>
        
        <div className="strategic-section min-h-screen">
          <OpportunityStatement />
        </div>
        
        <div className="transformation-section">
          <TransformationProcess />
        </div>
      </div>
    </div>
  );
}

export default App;