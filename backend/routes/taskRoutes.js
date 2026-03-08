import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getUpcomingTasks,
  getTaskStats,
  searchTasks,
} from '../controllers/taskController.js';
import { sendManualReminder } from '../controllers/reminderController.js';

const router = express.Router();

// Task routes
router.get('/stats/overview', getTaskStats);
router.get('/upcoming', getUpcomingTasks);
router.get('/search', searchTasks);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/remind', sendManualReminder);

export default router;
