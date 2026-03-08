import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import api from '../services/api';

const TaskList = ({ filterStatus, filterPriority, searchQuery, refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    fetchTasks();
  }, [filterStatus, filterPriority, searchQuery, refresh]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let data;
      
      if (searchQuery || filterStatus || filterPriority) {
        const params = {};
        if (searchQuery) params.query = searchQuery;
        if (filterStatus) params.status = filterStatus;
        if (filterPriority) params.priority = filterPriority;
        
        const response = await api.searchTasks(params);
        data = response.data.data;
      } else {
        const response = await api.getAllTasks();
        data = response.data.data;
      }
      
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  };

  const sortedTasks = sortTasks(tasks);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Tasks ({sortedTasks.length})
        </h2>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTasks.map((task) => (
            <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
