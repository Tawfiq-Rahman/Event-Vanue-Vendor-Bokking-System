import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Users, Building, Settings, LogOut, Check, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Unified fetching function that grabs the latest data from the database
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'approvals') {
        const response = await fetch('http://localhost:5000/api/admin/pending-users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const data = await response.json();
          setPendingUsers(data);
        }
      } else if (activeTab === 'all-users') {
        const response = await fetch('http://localhost:5000/api/admin/users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const data = await response.json();
          setAllUsers(data);
        }
      }
    } catch (error) {
      console.error("Backend offline. Could not fetch data.", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  // Fetch data immediately when the page loads, or when the active tab changes!
  useEffect(() => {
    fetchDashboardData();
    // Setting up a periodic polling could also be done here, but tab-switching ensures fresh data.
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 1. SEND REAL APPROVAL: Tell the database to update the user's status
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
        alert('Success! User has been approved.');
        fetchDashboardData(); // Always fetch the freshest data after an action
      } else {
        alert('Error: Backend route failed.');
      }
    } catch (error) {
      alert('Error connecting to backend server.');
    }
  };

  // 2. Reject or Delete User
  const handleRejectOrDelete = async (id, isRejection = true) => {
    if(!window.confirm(`Are you sure you want to ${isRejection ? 'reject' : 'delete'} this user? This cannot be undone.`)) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reject-user/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        fetchDashboardData(); // Refetch the fresh list directly from the database!
      } else {
        alert(`Failed to ${isRejection ? 'reject' : 'delete'} user.`);
      }
    } catch (error) {
      console.error(`Failed to ${isRejection ? 'reject' : 'delete'} user`);
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
        backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2500")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
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
        <header className="mb-10 relative z-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white capitalize drop-shadow-md">{activeTab.replace('-', ' ')}</h1>
            <p className="text-gray-300 font-medium mt-1 drop-shadow">Platform management and administration.</p>
          </div>
          {(activeTab === 'approvals' || activeTab === 'all-users') && (
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm font-bold backdrop-blur-md transition-all shadow-md flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
              {isLoading ? 'Syncing with Database...' : 'Live Database Sync'}
            </button>
          )}
        </header>

        {/* TAB: APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="space-y-8">
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/40 flex items-center justify-between bg-white/50">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  Pending Access Requests
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
                      <tr><td colSpan="4" className="p-12 text-center text-gray-400 font-bold">Fetching latest pending accounts...</td></tr>
                    ) : pendingUsers.length === 0 ? (
                      <tr><td colSpan="4" className="p-12 text-center text-gray-400 font-bold">No pending approvals at this time.</td></tr>
                    ) : (
                      pendingUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-6">
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              user.role === 'venue_owner' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-purple-50 text-purple-700 border border-purple-100'
                            }`}>
                              {user.role ? user.role.replace('_', ' ') : 'Unknown'}
                            </span>
                          </td>
                          <td className="p-6 text-sm font-medium text-gray-500">
                            {new Date(user.created_at || Date.now()).toLocaleDateString()}
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleRejectOrDelete(user.id, true)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip" title="Reject"
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

        {/* TAB: ALL USERS */}
        {activeTab === 'all-users' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/40 flex items-center justify-between bg-white/50">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  All System Users
                </h3>
                <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                  {allUsers.length} Users Total
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                      <th className="p-6 font-black">User Details</th>
                      <th className="p-6 font-black">Role</th>
                      <th className="p-6 font-black">Account Status</th>
                      <th className="p-6 font-black text-right">Admin Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoading ? (
                      <tr><td colSpan="4" className="p-12 text-center text-gray-400 font-bold">Fetching latest database records...</td></tr>
                    ) : allUsers.length === 0 ? (
                      <tr><td colSpan="4" className="p-12 text-center text-gray-400 font-bold">No users found in the database.</td></tr>
                    ) : (
                      allUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-6">
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              user.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                              user.role === 'customer' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                              user.role === 'venue_owner' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
                              'bg-purple-50 text-purple-700 border border-purple-100'
                            }`}>
                              {user.role ? user.role.replace('_', ' ') : 'Unknown'}
                            </span>
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              user.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                              user.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                              'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                              {user.status || 'Unknown'}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {user.status === 'pending' && (
                                <button 
                                  onClick={() => handleApprove(user.id)}
                                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg transition-all"
                                >
                                  Approve
                                </button>
                              )}
                              {user.role !== 'admin' && (
                                <button 
                                  onClick={() => handleRejectOrDelete(user.id, false)}
                                  className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors tooltip flex items-center gap-1 text-xs font-bold" 
                                  title="Delete User"
                                >
                                  <Trash2 className="w-4 h-4" /> Delete
                                </button>
                              )}
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

        {/* Placeholders for other tabs */}
        {activeTab !== 'approvals' && activeTab !== 'all-users' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 font-bold capitalize">{activeTab.replace('-', ' ')} module coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}