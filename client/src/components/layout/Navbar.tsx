import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-primary-light/10 text-primary' 
      : 'text-text-secondary hover:bg-primary-light/5 hover:text-primary';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <span className="bg-gradient-primary bg-clip-text text-transparent font-bold text-xl">RaveNest</span>
            </Link>
            
            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/how-it-works" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/how-it-works')}`}>
                How It Works
              </Link>
              <Link to="/why-choose-us" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/why-choose-us')}`}>
                Why Choose Us?
              </Link>
              <Link to="/mentors" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/mentors')}`}>
                Find Mentors
              </Link>
              <Link to="/trending" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/trending')}`}>
                Trending
              </Link>
              <Link to="/forum" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/forum')}`}>
                Forum
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-lg text-text-secondary hover:bg-primary-light/5 hover:text-primary transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className={`px-3 py-2 rounded-lg transition-colors ${isActive('/signin')}`}>
                  Sign In
                </Link>
                <Link to="/signup" className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-text-secondary hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
