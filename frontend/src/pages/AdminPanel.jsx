import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksResponse, upcomingResponse] = await Promise.all([
        api.getAllTasks(),
        api.getUpcomingTasks(),
      ]);
      
      setTasks(tasksResponse.data.data);
      setUpcomingTasks(upcomingResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendReminder = async (taskId) => {
    try {
      await api.sendReminder(taskId);
      alert('Reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Failed to send reminder');
    }
  };

  const getInternStats = () => {
    const internMap = {};
    
    tasks.forEach(task => {
      if (!internMap[task.assignedTo]) {
        internMap[task.assignedTo] = {
          name: task.assignedTo,
          total: 0,
          completed: 0,
          pending: 0,
          overdue: 0,
        };
      }
      
      internMap[task.assignedTo].total++;
      
      if (task.status === 'Completed') {
        internMap[task.assignedTo].completed++;
      } else if (task.status === 'Overdue') {
        internMap[task.assignedTo].overdue++;
      } else {
        internMap[task.assignedTo].pending++;
      }
    });
    
    return Object.values(internMap);
  };

  const internStats = getInternStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Monitor task progress and team performance</p>
        </div>

        {/* Intern Performance Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Intern Performance</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Intern Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overdue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {internStats.map((intern, index) => {
                  const completionRate = intern.total > 0 
                    ? ((intern.completed / intern.total) * 100).toFixed(1)
                    : 0;
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{intern.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{intern.total}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {intern.completed}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {intern.pending}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {intern.overdue}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 mr-2">
                            <div className="text-sm font-medium text-gray-900">{completionRate}%</div>
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${completionRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upcoming Deadlines (Next 24 Hours)
          </h2>
          
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming deadlines</p>
          ) : (
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">
                          👤 {task.assignedTo}
                        </span>
                        <span className="text-sm text-gray-600">
                          📅 {new Date(task.deadline).toLocaleString()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          task.priority === 'High' ? 'bg-red-100 text-red-600' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => sendReminder(task._id)}
                      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                    >
                      Send Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
