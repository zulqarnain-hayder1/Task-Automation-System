import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import CreateTask from './pages/CreateTask';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
