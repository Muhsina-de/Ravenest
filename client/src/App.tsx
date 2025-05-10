import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import MentorsPage from './pages/MentorsPage'
import MentorProfile from './pages/MentorProfile'
import Reviews from './components/reviews/Reviews'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import TrendingRepos from './components/TrendingRepos/TrendingReposPage'
import HowItWorks from './pages/HowItWorks'
import WhyChooseUs from './pages/WhyChooseUs'
import Forums from './components/forums/Forums'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Dashboard from './components/Dashboard'
import NewTopicPage from './pages/NewTopicPage'
import TopicDetailPage from './pages/TopicDetailPage'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mentors"
                element={
                  <ProtectedRoute>
                    <MentorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mentor/:id"
                element={
                  <ProtectedRoute>
                    <MentorProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute>
                    <Reviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trending"
                element={
                  <ProtectedRoute>
                    <TrendingRepos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forum"
                element={
                  <ProtectedRoute>
                    <Forums />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forum/new"
                element={
                  <ProtectedRoute>
                    <NewTopicPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forum/topics/:id"
                element={
                  <ProtectedRoute>
                    <TopicDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App