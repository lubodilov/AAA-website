import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenContact?: () => void;
  onOpenSchedule?: () => void;
}

export default function Header({ onOpenContact, onOpenSchedule }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/25 group-hover:shadow-red-600/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">UV</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-light text-xl tracking-tight">Upgrade Vision</span>
              <span className="text-red-400 text-xs font-extralight tracking-wider uppercase">AI Solutions</span>
            </div>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-light transition-colors duration-300 ${
                  location.pathname === item.href 
                    ? 'text-red-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onOpenSchedule}
              className="group relative bg-transparent border border-gray-600 text-white px-6 py-2.5 rounded-full hover:border-amber-600 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/10 to-amber-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Calendar className="relative z-10 w-4 h-4" />
              <span className="relative z-10 font-light">Book a Call</span>
            </button>
            <button 
              onClick={onOpenContact}
              className="group relative bg-transparent border border-gray-600 text-white px-6 py-2.5 rounded-full hover:border-red-600 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 font-light">Get Started</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-red-600/10 rounded-lg transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/80 backdrop-blur-md rounded-xl border border-red-600/20 p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block font-light py-2 transition-colors duration-300 ${
                  location.pathname === item.href 
                    ? 'text-red-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                onOpenSchedule?.();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-light hover:from-amber-700 hover:to-amber-800 transition-all duration-300 flex items-center justify-center space-x-2 mt-4"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Call</span>
            </button>
            <button 
              onClick={() => {
                onOpenContact?.();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-light hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2 mt-2"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}