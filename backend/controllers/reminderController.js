import nodemailer from 'nodemailer';
import Task from '../models/Task.js';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// @desc    Send reminder email
export const sendReminderEmail = async (task, internEmail) => {
  try {
    const transporter = createTransporter();
    
    const deadlineDate = new Date(task.deadline).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: internEmail,
      subject: `Task Reminder: ${task.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB;">Task Reminder</h2>
          <p>Hello,</p>
          <p>This is a reminder that your assigned task is due soon.</p>
          
          <div style="background-color: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E293B; margin-top: 0;">${task.title}</h3>
            <p style="color: #475569;"><strong>Description:</strong> ${task.description}</p>
            <p style="color: #475569;"><strong>Priority:</strong> <span style="color: ${
              task.priority === 'High' ? '#EF4444' : task.priority === 'Medium' ? '#F59E0B' : '#10B981'
            };">${task.priority}</span></p>
            <p style="color: #475569;"><strong>Deadline:</strong> ${deadlineDate}</p>
            <p style="color: #475569;"><strong>Status:</strong> ${task.status}</p>
          </div>
          
          <p>Please complete this task before the deadline.</p>
          
          <p style="color: #64748B; font-size: 12px; margin-top: 30px;">
            This is an automated reminder from the Task Automation System.
          </p>
        </div>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent for task: ${task.title}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// @desc    Check and send reminders for upcoming tasks
export const checkAndSendReminders = async () => {
  try {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Find tasks due within 24 hours that haven't been completed and reminder not sent
    const upcomingTasks = await Task.find({
      deadline: { $gte: now, $lte: next24Hours },
      status: { $ne: 'Completed' },
      reminderSent: false,
    });
    
    console.log(`Found ${upcomingTasks.length} tasks requiring reminders`);
    
    for (const task of upcomingTasks) {
      // In a real application, you would fetch the intern's email from the User model
      // For now, we'll use a placeholder email format
      const internEmail = `${task.assignedTo.toLowerCase().replace(/\s+/g, '.')}@company.com`;
      
      const result = await sendReminderEmail(task, internEmail);
      
      if (result.success) {
        task.reminderSent = true;
        await task.save();
      }
    }
    
    return { success: true, count: upcomingTasks.length };
  } catch (error) {
    console.error('Error checking and sending reminders:', error);
    return { success: false, error: error.message };
  }
};

// @desc    Manual trigger to send reminder
// @route   POST /api/tasks/:id/remind
export const sendManualReminder = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    const internEmail = `${task.assignedTo.toLowerCase().replace(/\s+/g, '.')}@company.com`;
    const result = await sendReminderEmail(task, internEmail);
    
    if (result.success) {
      task.reminderSent = true;
      await task.save();
      
      res.status(200).json({
        success: true,
        message: 'Reminder sent successfully',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send reminder',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
