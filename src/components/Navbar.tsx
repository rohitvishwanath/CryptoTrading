import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, Home, BookOpen, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            <Coins className="h-8 w-8" />
            <span className="hidden sm:block">CryptoTracker Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActiveLink('/') 
                  ? 'text-blue-400 bg-gray-800'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActiveLink('/about')
                  ? 'text-blue-400 bg-gray-800'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md w-full transition-colors ${
                isActiveLink('/')
                  ? 'text-blue-400 bg-gray-800'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md w-full transition-colors ${
                isActiveLink('/about')
                  ? 'text-blue-400 bg-gray-800'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;