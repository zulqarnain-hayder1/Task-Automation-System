import { useState, useEffect } from 'react';
import api from '../services/api';

const ProgressStats = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    completionRate: 0,
    priorityBreakdown: {
      high: 0,
      medium: 0,
      low: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getTaskStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`${color} rounded-lg shadow-md p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Task Statistics</h2>
      
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon="📋"
          color="bg-blue-500"
        />
        <StatCard
          title="Completed"
          value={stats.completedTasks}
          icon="✅"
          color="bg-green-500"
        />
        <StatCard
          title="Pending"
          value={stats.pendingTasks}
          icon="⏳"
          color="bg-yellow-500"
        />
        <StatCard
          title="Overdue"
          value={stats.overdueTasks}
          icon="⚠️"
          color="bg-red-500"
        />
      </div>

      {/* Completion Rate */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Completion Rate</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-blue-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary">
                {stats.completionRate}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${stats.completionRate}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
            ></div>
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Tasks by Priority</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">High Priority</span>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
              {stats.priorityBreakdown.high}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Medium Priority</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold">
              {stats.priorityBreakdown.medium}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Low Priority</span>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
              {stats.priorityBreakdown.low}
            </span>
          </div>
        </div>
      </div>

      {/* In Progress Tasks */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Tasks In Progress</h3>
          <span className="text-2xl font-bold text-primary">{stats.inProgressTasks}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
