import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, LayoutDashboard, CalendarCheck, Settings, 
  Plus, MoreVertical, LogOut, User, Bell, TrendingUp, Users, DollarSign 
} from 'lucide-react';

export default function VenueDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user data to display their actual name
  const storedUser = JSON.parse(localStorage.getItem('user')) || { name: 'Rafiq Hasan' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'my-venues', label: 'My Venues', icon: Building },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2500")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Clear Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80 z-0"></div>
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-[#fffdf8]/95 backdrop-blur-xl border-r border-white/40 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-white/40 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <Building className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">EventHub <span className="text-indigo-600 font-bold text-sm">{storedUser.name}</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-100/50 text-indigo-700 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        
        {/* DASHBOARD TOP HEADER */}
        <header className="h-20 bg-[#fffdf8]/95 backdrop-blur-md border-b border-white/40 px-10 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          
          {/* --- UPDATED: Colorful Welcome Greeting --- */}
          <div>
            {activeTab === 'overview' ? (
              <h2 className="text-2xl font-black text-gray-900">
                Welcome, <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">{storedUser.name}</span> 👋
              </h2>
            ) : (
              <h2 className="text-xl font-black text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h2>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="h-8 w-px bg-gray-200"></div>

            {/* User Profile & 3-Dot Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-2 hover:bg-white/60 rounded-full transition-all border border-transparent hover:border-white/50"
              >
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center border border-indigo-200">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>

              {/* Dropdown Box */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#fffdf8]/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-white/40 mb-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white/60 hover:text-indigo-600 flex items-center gap-2">
                    <User className="w-4 h-4" /> Profile Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8">
          {/* Header */}
          {activeTab === 'overview' && (
            <header className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-md">Overview</h1>
                <p className="text-gray-300 font-medium mt-1 drop-shadow">Manage your properties and incoming requests.</p>
              </div>
              
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Venue
              </button>
            </header>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Total Revenue', value: '$12,450', icon: DollarSign, trend: '+14%' },
                  { title: 'Active Bookings', value: '24', icon: CalendarCheck, trend: '+5%' },
                  { title: 'Total Guests Hosted', value: '1,204', icon: Users, trend: '+22%' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-2xl hover:-translate-y-1 transition-transform flex items-center gap-5">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                        <Icon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
                        <div className="flex items-end gap-3">
                          <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                          <span className="text-xs font-bold text-emerald-500 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/>{stat.trend}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Placeholder for Recent Bookings Table */}
              <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Recent Booking Requests</h3>
                <div className="flex items-center justify-center py-12 border-2 border-dashed border-white/40 rounded-2xl bg-white/30">
                  <p className="text-sm font-bold text-gray-500">No new booking requests this week.</p>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {activeTab !== 'overview' && (
            <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 flex items-center justify-center min-h-[400px]">
              <p className="text-gray-500 font-bold capitalize">{activeTab.replace('-', ' ')} Management Grid will go here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}