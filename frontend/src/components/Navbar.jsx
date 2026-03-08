import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              ⚡ Task Automation
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition"
            >
              Dashboard
            </Link>
            <Link
              to="/admin"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition"
            >
              Admin Panel
            </Link>
            <Link
              to="/create-task"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition"
            >
              Create Task
            </Link>
            <Link
              to="/progress"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition"
            >
              Progress
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
