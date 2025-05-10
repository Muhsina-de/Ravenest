import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white pt-20">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          How RaveNest Works
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Our platform makes it easy to connect with expert mentors and start your learning journey. Here's how it works:
        </p>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4 mt-4">Create Your Profile</h3>
              <p className="text-text-secondary mb-4">
                Sign up and create your profile. Tell us about your goals, interests, and what you want to learn.
              </p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Choose your role (mentor or mentee)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add your skills and expertise
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Set your availability
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4 mt-4">Browse Mentors</h3>
              <p className="text-text-secondary mb-4">
                Explore our curated list of expert mentors and find the perfect match for your learning goals.
              </p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Filter by skills and expertise
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Read verified reviews
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Compare mentor profiles
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4 mt-4">Book a Session</h3>
              <p className="text-text-secondary mb-4">
                Schedule a session with your chosen mentor at a time that works for both of you.
              </p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Choose session duration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Select preferred time
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure payment process
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4 mt-4">Start Learning</h3>
              <p className="text-text-secondary mb-4">
                Connect with your mentor through our integrated video platform and begin your learning journey.
              </p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  HD video calls
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Screen sharing
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Interactive whiteboard
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4 mt-4">Track Progress</h3>
              <p className="text-text-secondary mb-4">
                Monitor your learning journey with our comprehensive progress tracking system.
              </p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Learning milestones
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Skill assessments
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Progress reports
                </li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4 mt-4">Share Success</h3>
              <p className="text-text-secondary mb-4">
                Celebrate your achievements and help others by sharing your experience.
              </p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Leave reviews
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Share testimonials
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Build your portfolio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-t from-primary/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-2">What types of sessions are available?</h3>
              <p className="text-text-secondary">
                We offer various session types including one-on-one mentoring, group sessions, and specialized workshops. Each session can be customized to your specific learning needs.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-2">How do I choose the right mentor?</h3>
              <p className="text-text-secondary">
                You can filter mentors by skills, experience, and reviews. We recommend reading mentor profiles, checking their expertise, and reviewing feedback from other mentees.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-2">What happens during a session?</h3>
              <p className="text-text-secondary">
                Sessions typically include goal setting, skill development, problem-solving, and Q&A. You'll have access to our integrated video platform with features like screen sharing and interactive whiteboard.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-2">How do I track my progress?</h3>
              <p className="text-text-secondary">
                Our platform provides comprehensive progress tracking, including learning milestones, skill assessments, and detailed progress reports. You can also set and monitor your learning goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-text-secondary mb-8">
            Join RaveNest today and take the next step in your career development.
          </p>
          <Link
            to="/signup"
            className="glass-card px-8 py-3 bg-gradient-primary text-white hover:bg-gradient-light transition-all inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks; 