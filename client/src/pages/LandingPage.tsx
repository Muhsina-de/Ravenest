import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary-dark">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 animate-fade-in">
            Learn, Grow, and
            <span className="bg-gradient-primary bg-clip-text text-transparent block mt-3 leading-tight">Soar Higher</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto animate-slide-up">
            RaveNest connects you with experienced mentors who can help you level up your skills and advance your career.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up">
            <Link
              to="/mentors"
              className="glass-card px-8 py-3 text-primary hover:bg-primary-light/10 transition-all"
            >
              Find a Mentor
            </Link>
            <Link
              to="/signup"
              className="glass-card px-8 py-3 bg-gradient-primary text-white hover:bg-gradient-light transition-all"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 