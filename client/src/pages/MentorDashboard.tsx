import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import dashboardService, { MentorDashboardData, Session } from '../services/dashboardService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorDisplay from '../components/ui/ErrorDisplay';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MentorDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<MentorDashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await dashboardService.getMentorDashboard();
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

  const chartData = {
    labels: dashboardData.earnings.map(e => {
      const date = new Date(e.month);
      return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
    }),
    datasets: [{
      label: 'Monthly Earnings (USD)',
      data: dashboardData.earnings.map(e => e.total),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentor Dashboard</h1>
        
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
                        <h3 className="font-medium">{session.mentee?.username}</h3>
                        <p className="text-sm text-gray-500">{session.skill}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(`${session.date}T${session.time}`).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-x-2">
                        {session.status === 'pending' && (
                          <>
                            <button className="btn btn-primary btn-sm">Accept</button>
                            <button className="btn btn-secondary btn-sm">Decline</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {dashboardData.upcomingSessions.length === 0 && (
                  <p className="text-gray-500">No upcoming sessions</p>
                )}
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Earnings Overview</h2>
              <Line data={chartData} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Success Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Success Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.averageRating}</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.completionRate}%</p>
                  <p className="text-sm text-gray-500">Session Completion</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.totalSessions}</p>
                  <p className="text-sm text-gray-500">Total Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.totalMentees}</p>
                  <p className="text-sm text-gray-500">Active Mentees</p>
                </div>
                <div className="col-span-2 text-center border-t pt-4">
                  <p className="text-2xl font-bold text-gray-900">${dashboardData.metrics.totalEarnings}</p>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full btn btn-primary">Update Availability</button>
                <button className="w-full btn btn-secondary">View All Sessions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard; 