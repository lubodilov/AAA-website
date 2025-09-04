import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';

export default function VisionAssessment() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const questions = [
    {
      id: 1,
      question: "What's limiting your customer acquisition growth?",
      options: [
        "Lead generation volume",
        "Lead qualification accuracy", 
        "Executive bandwidth constraints",
        "Market expansion speed"
      ]
    },
    {
      id: 2,
      question: "What would 3x revenue growth in 18 months enable?",
      options: [
        "Market leadership positioning",
        "Strategic exit opportunity",
        "Geographic expansion", 
        "Industry transformation"
      ]
    },
    {
      id: 3,
      question: "Investment capacity for AI systems that multiply revenue?",
      options: [
        "$25K-75K (Foundation)",
        "$75K-150K (Acceleration)",
        "$150K+ (Market Domination)"
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Auto-advance to next question after selection
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowForm(true);
      }
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers(['', '', '']);
    setShowForm(false);
    setIsSubmitted(false);
    setFormData({ name: '', company: '', title: '', email: '', phone: '' });
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Elite background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circuit pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
                <circle cx="10" cy="10" r="2" fill="#ef4444"/>
                <circle cx="90" cy="90" r="2" fill="#ef4444"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-600/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: !prefersReducedMotion ? `pulse ${4 + Math.random() * 3}s ease-in-out infinite` : 'none',
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        {!showForm && !isSubmitted && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h2 
                className={`text-4xl md:text-6xl font-thin text-white leading-tight mb-6 transition-all duration-800 ${
                  prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }`}
                style={{
                  transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                Discover Your Hidden{' '}
                <span 
                  className="font-extralight italic"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  AI Revenue Potential
                </span>
              </h2>
              
              <p 
                className={`text-lg md:text-xl font-extralight text-white/80 leading-relaxed transition-all duration-800 delay-200 ${
                  prefersReducedMotion ? 'ease-linear' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }`}
                style={{
                  transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                Take our 60-second Vision Assessment to reveal exactly how AI can multiply your acquisition and liberate your strategic focus.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/60 text-sm font-light">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-white/60 text-sm font-light">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group hover:border-red-600/50 hover:bg-red-600/5 ${
                      answers[currentQuestion] === option 
                        ? 'border-red-600 bg-red-600/10' 
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-light text-lg">{option}</span>
                      <div className="flex items-center space-x-2">
                        {answers[currentQuestion] === option && (
                          <CheckCircle className="w-5 h-5 text-red-600" />
                        )}
                        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-red-600 transition-colors duration-300" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Contact Form */}
        {showForm && !isSubmitted && (
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-light text-white mb-4">
                Get Your Personalized AI Strategy
              </h3>
              <p className="text-white/80 font-extralight">
                Complete your contact information to receive your custom assessment results.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 focus:outline-none transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 focus:outline-none transition-colors duration-300"
                    placeholder="Company name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-light mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 focus:outline-none transition-colors duration-300"
                  placeholder="Your job title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 focus:outline-none transition-colors duration-300"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-xl font-light text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Get My AI Strategy</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="text-center bg-black/40 backdrop-blur-sm rounded-2xl border border-green-600/30 p-12">
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-light text-white mb-4">
              Assessment Complete!
            </h3>
            <p className="text-white/80 font-extralight text-lg mb-8 leading-relaxed">
              Thank you for completing the Vision Assessment. Our AI strategists will analyze your responses and contact you within 24 hours with your personalized revenue multiplication roadmap.
            </p>
            <button
              onClick={resetAssessment}
              className="bg-white/10 text-white py-3 px-6 rounded-xl font-light hover:bg-white/20 transition-all duration-300"
            >
              Take Assessment Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}