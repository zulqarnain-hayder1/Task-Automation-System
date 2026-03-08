import ProgressStats from '../components/ProgressStats';

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor overall task completion and analytics</p>
        </div>

        <ProgressStats />

        {/* Additional Insights */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Productivity Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📊 Analytics</h3>
              <p className="text-sm text-gray-600">
                Track task completion rates, identify bottlenecks, and monitor team productivity
                in real-time. Use this data to optimize task assignments and improve workflow efficiency.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">✅ Automation</h3>
              <p className="text-sm text-gray-600">
                The system automatically checks for upcoming deadlines every hour and sends reminder
                emails to interns. Recurring tasks are created every Monday at 9 AM automatically.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">⚡ Performance</h3>
              <p className="text-sm text-gray-600">
                Monitor individual intern performance, completion rates, and average task completion
                times. Identify high performers and those who may need additional support.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📧 Notifications</h3>
              <p className="text-sm text-gray-600">
                Automated email reminders are sent 24 hours before task deadlines. Admins can also
                manually trigger reminders from the admin panel for urgent tasks.
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Automation Status</h3>
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-sm text-gray-600">Cron jobs are running</p>
            <ul className="mt-3 space-y-1 text-xs text-gray-500">
              <li>• Hourly reminder checks</li>
              <li>• Overdue task updates</li>
              <li>• Weekly recurring tasks</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Email Service</h3>
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-sm text-gray-600">Ready to send notifications</p>
            <p className="mt-3 text-xs text-gray-500">
              Configure email settings in backend/.env file
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Database</h3>
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-sm text-gray-600">MongoDB connected</p>
            <p className="mt-3 text-xs text-gray-500">
              All task data is securely stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
