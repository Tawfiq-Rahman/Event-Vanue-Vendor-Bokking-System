import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-black text-xl tracking-tight">
          <Calendar className="w-6 h-6 stroke-[2.5]" />
          <span>Event<span className="text-gray-900">Hub</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Venues</Link>
          <Link to="/vendors" className="hover:text-indigo-600 transition-colors">Vendors</Link>
          <Link to="/packages" className="hover:text-indigo-600 transition-colors">Packages</Link>
        </nav>

        {/* User / Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full capitalize">
                {user.role.replace('_', ' ')}
              </span>
              <button 
                onClick={handleLogout} 
                className="p-2 text-gray-500 hover:text-red-600 transition-colors" 
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}