import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Calendar, Briefcase } from 'lucide-react';

interface HeaderProps {
  onOpenContact?: () => void;
  onOpenSchedule?: () => void;
  isScrolled?: boolean;
}

export default function Header({ onOpenContact, onOpenSchedule, isScrolled = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/30 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <img
              src="/upgrade_vision_ai.png"
              alt="Upgrade Vision AI Solutions"
              className="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-105"
            />
            <span
              className="font-semibold text-xl tracking-wide hidden sm:block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 60%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Upgrade Vision AI
            </span>
          </Link>

          {/* CTA Button and Portfolio Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/portfolio"
              className="group relative text-white/70 hover:text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4" />
              <span className="font-light text-sm">Case Studies</span>
            </Link>
            <button
              onClick={onOpenSchedule}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-red-600/25 hover:shadow-red-600/40"
            >
              <Calendar className="w-4 h-4" />
              <span className="font-light">Book Audit</span>
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
            <Link
              to="/portfolio"
              className="block font-light py-2 text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="w-4 h-4" />
              <span>Case Studies</span>
            </Link>
            <button
              onClick={() => {
                onOpenSchedule?.();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-light hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2 mt-4"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Audit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}