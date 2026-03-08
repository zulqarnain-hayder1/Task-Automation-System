# Task Automation System

A complete full-stack web application designed to help manage intern tasks automatically and improve productivity. The system includes automated reminders, email notifications, and comprehensive task tracking features.

## 🚀 Features

### Core Functionality
- ✅ **Task Management** - Create, update, delete, and track tasks
- 👥 **User Roles** - Admin and Intern roles with different permissions
- 📊 **Dashboard** - Modern dashboard with task statistics and filtering
- 📧 **Email Notifications** - Automated email reminders for upcoming deadlines
- ⏰ **Automated Scheduling** - Cron jobs for reminder checks and recurring tasks
- 📈 **Progress Tracking** - Detailed analytics and performance metrics
- 🔍 **Search & Filter** - Search tasks by title, filter by status and priority
- 🎨 **Responsive Design** - Modern UI built with Tailwind CSS

### Automation Features
- Hourly checks for upcoming task deadlines
- Automatic email reminders 24 hours before deadline
- Automated status updates for overdue tasks
- Recurring weekly tasks creation (every Monday at 9 AM)
- Daily task summary generation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **node-cron** - Task scheduling
- **Nodemailer** - Email sending functionality

## 📁 Project Structure

```
task-automation-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── ProgressStats.jsx
│   │   │   └── Notification.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   └── ProgressPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── reminderController.js
│   │
│   ├── cron/
│   │   └── reminderJob.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🔧 Installation

### 1. Clone or Navigate to the Project

```bash
cd task-automation-system
```

### 2. Set Up MongoDB

Start your MongoDB server:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**
```bash
# Start MongoDB
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud database):
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string

### 3. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Edit the `.env` file in the backend folder with your configurations:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-automation-system
NODE_ENV=development

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Task Automation System <your-email@gmail.com>
```

**Email Setup Instructions:**

For Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password
   - Use this password in `EMAIL_PASS`

### 5. Frontend Setup

Open a new terminal, navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Start Backend Server

In the backend folder:

```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

You should see:
```
🚀 Server running on port 5000
📡 API: http://localhost:5000
MongoDB Connected: ...
Initializing cron jobs...
```

### Start Frontend Development Server

In a new terminal, from the frontend folder:

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📱 Application Pages

### 1. Dashboard (`/`)
- View all tasks with statistics
- Filter tasks by status and priority
- Search tasks by title or description
- Quick action buttons for task management

### 2. Admin Panel (`/admin`)
- Monitor intern performance
- View completion rates per intern
- See upcoming deadlines (next 24 hours)
- Send manual reminders

### 3. Create Task (`/create-task`)
- Create new tasks with detailed form
- Assign tasks to interns
- Set priority and deadlines
- Automated validation

### 4. Progress Page (`/progress`)
- View detailed statistics
- Completion rate visualization
- Priority breakdown
- System status monitoring

## 🔄 Automated Features

### Cron Jobs Schedule

1. **Reminder Check** - Runs every hour (`0 * * * *`)
   - Checks for tasks due within 24 hours
   - Sends email reminders to assigned interns

2. **Overdue Check** - Runs every 30 minutes (`*/30 * * * *`)
   - Updates task status to "Overdue" if deadline passed

3. **Recurring Tasks** - Runs every Monday at 9 AM (`0 9 * * 1`)
   - Creates "Weekly Progress Report" task for all interns

4. **Daily Summary** - Runs every day at 6 PM (`0 18 * * *`)
   - Generates daily statistics log

## 📡 API Endpoints

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/upcoming` | Get tasks with upcoming deadlines |
| GET | `/api/tasks/stats/overview` | Get task statistics |
| GET | `/api/tasks/search` | Search tasks |
| POST | `/api/tasks/:id/remind` | Send manual reminder |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/users/role/:role` | Get users by role |

## 🎯 Usage Workflow

### Admin Workflow
1. Log in to the application
2. Navigate to "Create Task" page
3. Fill in task details (title, description, intern, priority, deadline)
4. Submit to create the task
5. Monitor progress on the Dashboard
6. View analytics on the Progress page
7. Check Admin Panel for intern performance

### Intern Workflow
1. View assigned tasks on Dashboard
2. Click "Start Task" to begin working
3. Update status as needed
4. Click "Mark Completed" when finished
5. Receive automated email reminders for upcoming deadlines

### Automated System
1. System checks for upcoming deadlines every hour
2. Sends email reminders 24 hours before deadline
3. Updates overdue tasks automatically
4. Creates recurring tasks every Monday
5. Generates daily summaries

## 🎨 Color Scheme

- **Primary**: `#2563EB` (Blue)
- **Secondary**: `#3B82F6` (Light Blue)
- **Background**: `#F8FAFC` (Light Gray)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

## 🔐 Task Schema

```javascript
{
  title: String,
  description: String,
  assignedTo: String,
  priority: "Low" | "Medium" | "High",
  deadline: Date,
  status: "Pending" | "In Progress" | "Completed" | "Overdue",
  reminderSent: Boolean,
  createdAt: Date,
  completedAt: Date
}
```

## 📊 Task Priorities

- **High** 🔴 - Urgent tasks requiring immediate attention
- **Medium** 🟡 - Standard priority tasks
- **Low** 🟢 - Can be completed when time allows

## 🛡️ Task Statuses

- **Pending** - Task not yet started
- **In Progress** - Currently being worked on
- **Completed** - Successfully finished
- **Overdue** - Past deadline and not completed

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: Could not connect to MongoDB
```
**Solution:** Ensure MongoDB is running on your system or check your connection string.

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change the PORT in `.env` file or kill the process using that port.

### Email Not Sending
**Solution:** 
- Check your email credentials in `.env`
- Ensure you're using an App Password for Gmail
- Check if less secure app access is enabled (not recommended)

### Frontend Can't Connect to Backend
**Solution:** 
- Ensure backend is running on port 5000
- Check the proxy configuration in `vite.config.js`

## 📝 Development Commands

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Set up MongoDB Atlas for cloud database
4. Configure email service with production credentials

### Frontend Deployment
1. Run `npm run build` in frontend folder
2. Deploy the `dist` folder to hosting service (Netlify, Vercel, etc.)
3. Update API URLs to point to production backend

## 📄 License

This project is created for educational purposes.

## 👥 Contributors

- Task Automation System Team

## 📞 Support

For issues or questions, please create an issue in the project repository.

---

**Built by this account Holder(zulqarnain) using React, Node.js, and MongoDB**
# Task-Automation-System
