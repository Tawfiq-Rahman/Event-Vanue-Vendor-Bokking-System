import { useState, useEffect } from 'react';
import { ShieldCheck, Users, Building, Settings, LogOut, Check, X, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 1. FETCH REAL DATA: Pull pending users from your database when the page loads
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/pending-users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setPendingUsers(data);
        } else {
          console.error("Failed to fetch real users. Make sure your backend route exists!");
          // Fallback to dummy data ONLY if the backend isn't ready yet
          setPendingUsers([
            { id: '1', name: 'Rafiq Hasan (Mock)', email: 'rafiq@gmail.com', role: 'venue_owner', createdAt: 'Sept 11, 2026' }
          ]);
        }
      } catch (error) {
        console.error("Backend offline. Loading mock data.", error);
        setPendingUsers([
          { id: '1', name: 'Rafiq Hasan (Mock)', email: 'rafiq@gmail.com', role: 'venue_owner', createdAt: 'Sept 11, 2026' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 2. SEND REAL APPROVAL: Tell the database to update the user's status
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/approve-user/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });

      if (response.ok) {
        // Remove the user from the screen only if the database successfully updated
        setPendingUsers(pendingUsers.filter(user => user.id !== id));
        alert('Success! User has been approved in the database and can now log in.');
      } else {
        alert('Error: Backend route failed or does not exist yet.');
      }
    } catch (error) {
      alert('Error connecting to backend server.');
    }
  };

  // Simulate rejecting a user
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reject-user/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        setPendingUsers(pendingUsers.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error("Failed to reject user");
    }
  };

  const navItems = [
    { id: 'approvals', label: 'User Approvals', icon: ShieldCheck },
    { id: 'all-users', label: 'Manage Users', icon: Users },
    { id: 'all-venues', label: 'Manage Venues', icon: Building },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2500")', // Audience in a dark stage looking aside
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Clear Dark Gradient Overlay matching Venue Dashboard */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80 z-0"></div>

      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#fffdf8]/95 backdrop-blur-xl border-r border-white/40 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-white/40 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">EventHub <span className="text-indigo-600 font-bold text-sm">Admin</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
                {item.id === 'approvals' && pendingUsers.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {pendingUsers.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/40">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 relative z-10">
        <header className="mb-10 relative z-10">
          <h1 className="text-3xl font-black text-white capitalize drop-shadow-md">{activeTab.replace('-', ' ')}</h1>
          <p className="text-gray-300 font-medium mt-1 drop-shadow">Platform management and administration.</p>
        </header>

        {activeTab === 'approvals' && (
          <div className="space-y-8">
            {/* Glassmorphic Admin Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Registered Users', count: '1,248', icon: Users, trend: '+12% this week', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'System Venues', count: '42', icon: Building, trend: '+3 new', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Pending Approvals', count: pendingUsers.length, icon: ShieldCheck, trend: 'Requires action', color: 'text-amber-600', bg: 'bg-amber-50' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} shadow-inner`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-white/50 border border-gray-100 px-3 py-1 rounded-full shadow-sm">{stat.trend}</span>
                    </div>
                    <div>
                      <span className="text-3xl font-black text-gray-900">{stat.count}</span>
                      <p className="text-sm font-bold text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Approvals Table */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/40 flex items-center justify-between bg-white/50">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                Access Requests
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                    <th className="p-6 font-black">User Details</th>
                    <th className="p-6 font-black">Requested Role</th>
                    <th className="p-6 font-black">Date Applied</th>
                    <th className="p-6 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr><td colSpan="4" className="p-12 text-center text-gray-400 font-bold">Loading accounts...</td></tr>
                  ) : pendingUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-gray-400 font-bold">
                        No pending approvals at this time.
                      </td>
                    </tr>
                  ) : (
                    pendingUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-6">
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            user.role === 'venue_owner' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : 'bg-purple-50 text-purple-700 border border-purple-100'
                          }`}>
                            {user.role ? user.role.replace('_', ' ') : 'Unknown'}
                          </span>
                        </td>
                        <td className="p-6 text-sm font-medium text-gray-500">
                          {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleReject(user.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleApprove(user.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm font-bold rounded-lg transition-all active:scale-95"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}
      </main>
    </div>
  );
}