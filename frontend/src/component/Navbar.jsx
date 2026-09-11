import { Link, useNavigate } from 'react-router-dom';
import { Calendar, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Dynamically determine the correct dashboard path based on the user's role
  const getDashboardPath = (role) => {
    if (!role) return '/';
    switch (role) {
      case 'venue_owner': return '/venue-dashboard';
      case 'vendor': return '/vendor-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/customer-dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-black text-xl tracking-tight hover:opacity-80 transition-opacity">
          <Calendar className="w-6 h-6 stroke-[2.5]" />
          <span>Event<span className="text-gray-900">Hub</span></span>
        </Link>

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Venues</Link>
          <Link to="/vendors" className="hover:text-indigo-600 transition-colors">Vendors</Link>
          <Link to="/packages" className="hover:text-indigo-600 transition-colors">Packages</Link>
        </nav>

        {/* User / Auth Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Dynamic Dashboard Button */}
              <Link 
                to={getDashboardPath(user.role)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                My Dashboard
              </Link>
              
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all active:scale-95"
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