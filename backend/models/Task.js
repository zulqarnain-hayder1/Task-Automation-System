import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a task description'],
  },
  assignedTo: {
    type: String,
    required: [true, 'Please assign the task to an intern'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline'],
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
    default: 'Pending',
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

// Method to check if task is overdue
taskSchema.methods.isOverdue = function() {
  return this.deadline < new Date() && this.status !== 'Completed';
};

// Update status to overdue automatically
taskSchema.pre('save', function(next) {
  if (this.isOverdue()) {
    this.status = 'Overdue';
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
