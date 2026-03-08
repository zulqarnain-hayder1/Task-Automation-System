import cron from 'node-cron';
import { checkAndSendReminders } from '../controllers/reminderController.js';
import Task from '../models/Task.js';

// Schedule reminder check every hour
export const scheduleReminderJob = () => {
  // Run every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    console.log('Running hourly reminder check...');
    try {
      const result = await checkAndSendReminders();
      if (result.success) {
        console.log(`Reminder job completed. Sent ${result.count} reminders.`);
      } else {
        console.error('Reminder job failed:', result.error);
      }
    } catch (error) {
      console.error('Error in reminder job:', error);
    }
  });
  
  console.log('Reminder job scheduled (runs every hour)');
};

// Schedule overdue task checker - runs every 30 minutes
export const scheduleOverdueCheck = () => {
  cron.schedule('*/30 * * * *', async () => {
    console.log('Checking for overdue tasks...');
    try {
      const now = new Date();
      
      // Find tasks that are past deadline and not completed
      const overdueTasks = await Task.find({
        deadline: { $lt: now },
        status: { $nin: ['Completed', 'Overdue'] },
      });
      
      // Update all overdue tasks
      for (const task of overdueTasks) {
        task.status = 'Overdue';
        await task.save();
      }
      
      console.log(`Updated ${overdueTasks.length} tasks to Overdue status`);
    } catch (error) {
      console.error('Error in overdue check job:', error);
    }
  });
  
  console.log('Overdue check job scheduled (runs every 30 minutes)');
};

// Schedule recurring task creation - runs every Monday at 9 AM
export const scheduleRecurringTasks = () => {
  // Run every Monday at 9:00 AM
  cron.schedule('0 9 * * 1', async () => {
    console.log('Creating recurring weekly tasks...');
    try {
      // Get all interns (you would fetch this from User model in a real app)
      const interns = ['Mushaf', 'John', 'Sarah']; // Example interns
      
      // Create a weekly progress report task for each intern
      for (const intern of interns) {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        await Task.create({
          title: 'Submit Weekly Progress Report',
          description: 'Please submit your weekly progress report including completed tasks, challenges faced, and plans for next week.',
          assignedTo: intern,
          priority: 'Medium',
          deadline: nextWeek,
          status: 'Pending',
        });
      }
      
      console.log(`Created weekly progress report tasks for ${interns.length} interns`);
    } catch (error) {
      console.error('Error creating recurring tasks:', error);
    }
  });
  
  console.log('Recurring task job scheduled (runs every Monday at 9 AM)');
};

// Schedule daily summary - runs every day at 6 PM
export const scheduleDailySummary = () => {
  cron.schedule('0 18 * * *', async () => {
    console.log('Generating daily task summary...');
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayTasks = await Task.find({
        createdAt: { $gte: today },
      });
      
      const todayCompleted = await Task.find({
        completedAt: { $gte: today },
      });
      
      console.log('Daily Summary:');
      console.log(`- Tasks created today: ${todayTasks.length}`);
      console.log(`- Tasks completed today: ${todayCompleted.length}`);
    } catch (error) {
      console.error('Error generating daily summary:', error);
    }
  });
  
  console.log('Daily summary job scheduled (runs every day at 6 PM)');
};

// Initialize all cron jobs
export const initializeCronJobs = () => {
  console.log('Initializing cron jobs...');
  scheduleReminderJob();
  scheduleOverdueCheck();
  scheduleRecurringTasks();
  scheduleDailySummary();
  console.log('All cron jobs initialized successfully');
};
