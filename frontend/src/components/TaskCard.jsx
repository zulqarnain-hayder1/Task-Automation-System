import { useState } from 'react';
import api from '../services/api';

const TaskCard = ({ task, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await api.updateTask(task._id, { status: newStatus });
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await api.deleteTask(task._id);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-semibold mr-2">👤 Assigned to:</span>
          <span>{task.assignedTo}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-semibold mr-2">📅 Deadline:</span>
          <span>{formatDate(task.deadline)}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <span className="font-semibold mr-2 text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {task.status !== 'In Progress' && task.status !== 'Completed' && (
            <button
              onClick={() => handleStatusChange('In Progress')}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 text-sm"
            >
              Start Task
            </button>
          )}
          
          {task.status !== 'Completed' && (
            <button
              onClick={() => handleStatusChange('Completed')}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50 text-sm"
            >
              Mark Completed
            </button>
          )}
          
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50 text-sm ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
