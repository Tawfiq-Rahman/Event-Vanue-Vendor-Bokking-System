import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Users, Building, Settings, LogOut, Check, X, Trash2, LayoutDashboard, Tag, Megaphone, Activity, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allVenues, setAllVenues] = useState([]);
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0, pendingApprovals: 0, activeUsers: 0 });
  const [settings, setSettings] = useState({ commission_rate: 10, cancellation_rules: '' });
  const [categories, setCategories] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', target_role: 'all' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Unified fetching function that grabs the latest data from the database
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'overview') {
        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } else if (activeTab === 'approvals') {
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
      } else if (activeTab === 'all-venues') {
        const [resVenues, resCategories] = await Promise.all([
          fetch('http://localhost:5000/api/admin/venues', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
          fetch('http://localhost:5000/api/admin/categories', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        ]);
        if (resVenues.ok) {
          const venuesData = await resVenues.json();
          setAllVenues(venuesData);
        }
        if (resCategories.ok) {
          const categoriesData = await resCategories.json();
          setCategories(categoriesData);
        }
      } else if (activeTab === 'settings') {
        const [resSettings, resCats, resAnn] = await Promise.all([
          fetch('http://localhost:5000/api/admin/settings', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
          fetch('http://localhost:5000/api/admin/categories', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
          fetch('http://localhost:5000/api/admin/announcements', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        ]);
        if (resSettings.ok) setSettings(await resSettings.json());
        if (resCats.ok) setCategories(await resCats.json());
        if (resAnn.ok) setAnnouncements(await resAnn.json());
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name: newCategory })
      });
      if (res.ok) { setNewCategory(''); fetchDashboardData(); }
    } catch (err) {}
  };

  const handleDeleteVenue = async (id) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/venues/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {}
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(settings)
      });
      if (res.ok) alert('Settings saved successfully!');
    } catch (err) {}
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.message) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newAnnouncement)
      });
      if (res.ok) {
        setNewAnnouncement({ title: '', message: '', target_role: 'all' });
        fetchDashboardData();
        alert('Announcement Broadcasted!');
      }
    } catch (err) {}
  };

  const handleDownloadReport = () => {
    window.open('http://localhost:5000/api/admin/report/monthly', '_blank');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
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
          {(activeTab === 'approvals' || activeTab === 'all-users' || activeTab === 'overview' || activeTab === 'settings') && (
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm font-bold backdrop-blur-md transition-all shadow-md flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
              {isLoading ? 'Syncing...' : 'Live Sync'}
            </button>
          )}
        </header>

        {/* TAB: OVERVIEW / STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Bookings', value: stats.totalBookings, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Pending Approvals', value: stats.pendingApprovals, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-6 flex flex-col justify-between h-36">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500 font-bold text-sm">{stat.label}</span>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-gray-900">Monthly Booking Report</h3>
                <p className="text-sm text-gray-500 mt-1">Generate a comprehensive PDF report of this month's platform activity.</p>
              </div>
              <button 
                onClick={handleDownloadReport}
                className="flex items-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-5 h-5" />
                Download PDF Report
              </button>
            </div>
          </div>
        )}

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
                            {(user.government_id || user.business_license_id) && (
                              <div className="mt-2 text-xs border-t border-gray-100 pt-2">
                                {user.government_id && <p className="text-gray-600"><span className="font-bold">Gov ID:</span> {user.government_id}</p>}
                                {user.business_license_id && <p className="text-gray-600"><span className="font-bold">License:</span> {user.business_license_id}</p>}
                              </div>
                            )}
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
                            {(user.government_id || user.business_license_id) && (
                              <div className="mt-2 text-xs border-t border-gray-100 pt-2">
                                {user.government_id && <p className="text-gray-600"><span className="font-bold">Gov ID:</span> {user.government_id}</p>}
                                {user.business_license_id && <p className="text-gray-600"><span className="font-bold">License:</span> {user.business_license_id}</p>}
                              </div>
                            )}
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

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Financial Rules */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-indigo-600" />
                Commission & Cancellation Rules
              </h3>
              <form onSubmit={handleUpdateSettings} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Platform Commission Rate (%)</label>
                  <input 
                    type="number" step="0.01" 
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={settings.commission_rate}
                    onChange={(e) => setSettings({...settings, commission_rate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Global Cancellation Rules</label>
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={settings.cancellation_rules}
                    onChange={(e) => setSettings({...settings, cancellation_rules: e.target.value})}
                  />
                </div>
                <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md">
                  Save Settings
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Categories */}
              <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  Event Categories
                </h3>
                <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
                  <input 
                    type="text" placeholder="New category name..."
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Add</button>
                </form>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {categories.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                      <span className="font-bold text-gray-700">{c.name}</span>
                      <button onClick={() => handleDeleteCategory(c.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Broadcast Announcements */}
              <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6">
                  <Megaphone className="w-5 h-5 text-indigo-600" />
                  Broadcast Announcement
                </h3>
                <form onSubmit={handleBroadcast} className="space-y-4">
                  <input 
                    type="text" placeholder="Announcement Title" required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  />
                  <textarea 
                    rows="3" placeholder="Message content..." required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none"
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                  />
                  <select 
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none font-bold text-gray-700"
                    value={newAnnouncement.target_role}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, target_role: e.target.value})}
                  >
                    <option value="all">Broadcast to All Users</option>
                    <option value="customer">Customers Only</option>
                    <option value="venue_owner">Venue Owners Only</option>
                    <option value="vendor">Vendors Only</option>
                  </select>
                  <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Broadcast Now</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === 'all-venues' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-6 h-6 text-indigo-600" /> Platform Venues
            </h2>
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8">
              {allVenues.length === 0 ? (
                <div className="text-center py-12">
                  <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No venues registered on the platform yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-500 text-sm tracking-wider uppercase">
                        <th className="py-4 font-bold">Venue ID</th>
                        <th className="py-4 font-bold">Title</th>
                        <th className="py-4 font-bold">Owner</th>
                        <th className="py-4 font-bold">Location</th>
                        <th className="py-4 font-bold">Price / Day</th>
                        <th className="py-4 font-bold">Capacity</th>
                        <th className="py-4 font-bold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {allVenues.map((venue) => (
                        <tr key={venue.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 text-sm font-bold text-indigo-600">VNE-{venue.id.toString().padStart(3, '0')}</td>
                          <td className="py-4 text-sm font-bold text-gray-900">{venue.title}</td>
                          <td className="py-4 text-sm font-medium text-gray-600">
                            <div>{venue.owner_name}</div>
                            <div className="text-xs text-gray-400">{venue.owner_email}</div>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-700">{venue.location}</td>
                          <td className="py-4 text-sm font-black text-green-600">${Number(venue.price_per_day).toLocaleString()}</td>
                          <td className="py-4 text-sm font-bold text-gray-500">{venue.capacity}</td>
                          <td className="py-4 text-center">
                            <button 
                              onClick={() => handleDeleteVenue(venue.id)} 
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete Venue"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}