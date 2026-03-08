# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

### Step 3: Configure Email (Optional)

Edit `backend/.env` with your email credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

> **Note:** Email is optional for testing. The app will work without it, but reminders won't be sent.

### Step 4: Start Backend

```bash
cd backend
npm run dev
```

✅ Backend running on http://localhost:5000

### Step 5: Start Frontend

Open a new terminal:
```bash
cd frontend
npm run dev
```

✅ Frontend running on http://localhost:3000

### Step 6: Open Your Browser

Navigate to: **http://localhost:3000**

---

## 🎯 What to Try First

1. **View Dashboard** - See the overview and empty task list
2. **Create a Task** - Go to "Create Task" and add your first task
3. **Check Admin Panel** - View intern performance statistics
4. **See Progress** - Navigate to "Progress" to see analytics

---

## 📧 Email Setup (Gmail)

1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Go to App Passwords
4. Generate password for "Mail"
5. Copy the 16-character password
6. Paste in `backend/.env` as `EMAIL_PASS`

---

## 🐛 Common Issues

**MongoDB not running?**
- Check if MongoDB service is started
- Verify MongoDB is installed

**Port already in use?**
- Change PORT in `backend/.env`
- Kill process using `netstat` commands

**Dependencies error?**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

---

## 📝 Sample Task Data

Try creating tasks with these examples:

**Task 1:**
- Title: "Build Login System"
- Description: "Create authentication with JWT"
- Assigned to: "Mushaf"
- Priority: "High"
- Deadline: Tomorrow

**Task 2:**
- Title: "Write Documentation"
- Description: "Document all API endpoints"
- Assigned to: "Sarah"
- Priority: "Medium"
- Deadline: Next week

---

## 🎓 Learning Resources

- MongoDB: https://docs.mongodb.com/
- React: https://react.dev/
- Express: https://expressjs.com/
- Tailwind CSS: https://tailwindcss.com/

---

**Happy Task Managing! 🎉**
