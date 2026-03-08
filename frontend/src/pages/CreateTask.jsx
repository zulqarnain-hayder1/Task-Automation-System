import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const CreateTask = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-gray-600 mt-2">Assign a new task to an intern</p>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Task created successfully! Redirecting to dashboard...
          </div>
        )}

        <TaskForm onSuccess={handleSuccess} />

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Task Creation Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Use clear and descriptive task titles</li>
            <li>Provide detailed descriptions to avoid confusion</li>
            <li>Set realistic deadlines considering intern workload</li>
            <li>High priority tasks will receive more attention</li>
            <li>Automated reminders will be sent 24 hours before deadline</li>
          </ul>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              View Admin Panel
            </button>
            <button
              onClick={() => navigate('/progress')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              View Progress Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
