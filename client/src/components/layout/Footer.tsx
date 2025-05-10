import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company Info */}
          <div>
            <h3 className="text-primary-light text-sm font-semibold mb-1">RaveNest</h3>
            <p className="text-text-secondary text-xs">
              Connecting mentors and mentees for professional growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-light text-sm font-semibold mb-1">Quick Links</h3>
            <ul className="space-y-0.5">
              <li>
                <Link to="/" className="text-text-secondary hover:text-primary-light text-xs transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-text-secondary hover:text-primary-light text-xs transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-text-secondary hover:text-primary-light text-xs transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary-light text-sm font-semibold mb-1">Contact Us</h3>
            <ul className="space-y-0.5">
              <li className="text-text-secondary text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@ravenest.com
              </li>
              <li className="text-text-secondary text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-text-secondary text-xs text-center">
            © {new Date().getFullYear()} RaveNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 