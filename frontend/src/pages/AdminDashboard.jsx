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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 flex flex-col fixed h-full z-10 shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">EventHub <span className="text-indigo-400 font-bold text-sm">Admin</span></span>
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
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
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

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
          <p className="text-gray-500 font-medium mt-1">Review and manage platform access.</p>
        </header>

        {activeTab === 'approvals' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Pending Registrations
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
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
                            user.role === 'venue_owner' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
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
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-sm shadow-emerald-200 transition-all active:scale-95"
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
        )}
      </main>
    </div>
  );
}