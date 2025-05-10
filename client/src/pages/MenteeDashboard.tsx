import React, { useState, useEffect } from 'react';
import dashboardService, { MenteeDashboardData, Session } from '../services/dashboardService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const MenteeDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<MenteeDashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await dashboardService.getMenteeDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!dashboardData) {
    return <ErrorDisplay message="No dashboard data available" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentee Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {dashboardData.upcomingSessions.map((session: Session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{session.mentor?.username}</h3>
                        <p className="text-sm text-gray-500">{session.skill}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(`${session.date}T${session.time}`).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button className="btn btn-primary btn-sm">Join Session</button>
                        <button className="btn btn-secondary btn-sm">Reschedule</button>
                      </div>
                    </div>
                  </div>
                ))}
                {dashboardData.upcomingSessions.length === 0 && (
                  <p className="text-gray-500">No upcoming sessions</p>
                )}
              </div>
            </div>

            {/* Favorite Mentors */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Favorite Mentors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.favoriteMentors.map(({ mentorId, mentor }) => (
                  <div key={mentorId} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.username}`}
                      alt={mentor.username}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{mentor.username}</h3>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">
                          {(mentor.reviews.reduce((acc, r) => acc + r.rating, 0) / mentor.reviews.length).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {dashboardData.favoriteMentors.length === 0 && (
                  <p className="text-gray-500 col-span-2">No favorite mentors yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Learning Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
              <div className="space-y-4">
                {dashboardData.learningProgress.map((progress) => (
                  <div key={progress.skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{progress.skill}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {progress.sessionsCompleted} sessions
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min((progress.sessionsCompleted / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {dashboardData.learningProgress.length === 0 && (
                  <p className="text-gray-500">No learning progress yet</p>
                )}
              </div>
            </div>

            {/* Pending Reviews */}
            {dashboardData.pendingReviews.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Reviews</h2>
                <div className="space-y-4">
                  {dashboardData.pendingReviews.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <h3 className="font-medium">{session.mentor?.username}</h3>
                      <p className="text-sm text-gray-500">{session.skill}</p>
                      <button className="mt-2 btn btn-primary btn-sm">Write Review</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full btn btn-primary">Find New Mentor</button>
                <button className="w-full btn btn-secondary">View All Sessions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard; 