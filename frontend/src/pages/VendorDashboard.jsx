import { useState, useEffect } from 'react';
import { ClipboardList, Briefcase, MessageSquare, Settings, LogOut, CheckCircle, XCircle, Clock, Check, Edit3, Send } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]);
  const [myVendors, setMyVendors] = useState([]);
  const [vendorForm, setVendorForm] = useState({ title: '', service_type: 'catering', portfolio_description: '', starting_rate: '', location: '', image_url: '', image_file: null });
  const [unassignedVendors, setUnassignedVendors] = useState([]);
  
  const [vendorView, setVendorView] = useState('list');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Basic Profile State
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', dob: '', address: '', profile_picture: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Chat State
  const [chatContacts, setChatContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeContactTab, setActiveContactTab] = useState('customer');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch Requests
        const reqResponse = await fetch('http://localhost:5000/api/vendor/requests', { headers });
        if (reqResponse.ok) {
          const reqData = await reqResponse.json();
          setRequests(reqData);
        }
        
        // Fetch History
        const histResponse = await fetch('http://localhost:5000/api/vendor/history', { headers });
        if (histResponse.ok) {
          const histData = await histResponse.json();
          setHistoryRequests(histData);
        }

        // Fetch Unassigned Vendors
        const unassignedResponse = await fetch('http://localhost:5000/api/vendor/unassigned-vendors', { headers });
        if (unassignedResponse.ok) {
          const unassignedData = await unassignedResponse.json();
          setUnassignedVendors(unassignedData);
        }

        // Fetch Vendors
        const vendorsResponse = await fetch('http://localhost:5000/api/vendor/vendors', { headers });
        if (vendorsResponse.ok) {
          const vendorsData = await vendorsResponse.json();
          setMyVendors(vendorsData);
        }
      } catch (err) {
        console.error("Failed to fetch vendor data", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchChatContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vendor/chat-contacts', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const fetchedContacts = await res.json();
        setChatContacts(prev => {
          const merged = [...fetchedContacts];
          if (activeChat && activeChat.id !== 'system_notices' && !merged.find(c => c.id === activeChat.id)) {
            merged.unshift(activeChat);
          }
          return merged;
        });
      }
    } catch (err) { console.error(err); }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vendor/announcements', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setAnnouncements(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchMessages = async () => {
    if (!activeChat) return;
    try {
      const res = await fetch(`http://localhost:5000/api/vendor/messages/${activeChat.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setMessages(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      const res = await fetch('http://localhost:5000/api/vendor/messages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ receiver_id: activeChat.id, message: newMessage })
      });
      if (res.ok) {
        setNewMessage('');
        fetchMessages();
        fetchChatContacts();
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchChatContacts();
      fetchAnnouncements();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeChat && activeChat.id !== 'system_notices') {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Polling for demo
      return () => clearInterval(interval);
    }
  }, [activeChat]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vendor/requests/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Update local state
        setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert('Network error while updating status.');
    }
  };

  const handleClaimVendor = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vendor/vendors/${vendorId}/claim`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        alert('Vendor claimed successfully!');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to claim vendor');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  

  const handleSaveVendor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', vendorForm.title || '');
      formData.append('service_type', vendorForm.service_type);
      formData.append('starting_rate', vendorForm.starting_rate);
      formData.append('portfolio_description', vendorForm.portfolio_description);
      formData.append('location', vendorForm.location || 'Available Nationwide');
      if (vendorForm.image_url) formData.append('image_url', vendorForm.image_url);
      if (vendorForm.image_file) formData.append('image_file', vendorForm.image_file);

      const response = await fetch('http://localhost:5000/api/vendor/vendors', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: formData
      });
      
      if (response.ok) {
        alert('Vendor profile created successfully!');
        window.location.reload();
      } else {
        alert('Failed to create vendor profile');
      }
    } catch (error) {
      console.error("Error creating vendor:", error);
      alert('Network error while creating vendor.');
    }
  };

  const handleRemoveVendor = async (id) => {
    if (!window.confirm('Are you sure you want to unclaim/remove this vendor profile?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/vendor/vendors/${id}/unclaim`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        alert('Vendor profile removed successfully!');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to remove vendor');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const response = await fetch('http://localhost:5000/api/vendor/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(profileForm)
      });
      
      const data = await response.json();
      if (response.ok) {
        const updatedLocalUser = { ...JSON.parse(localStorage.getItem('user')), name: data.user.name, email: data.user.email, profile_picture: data.user.profile_picture };
        localStorage.setItem('user', JSON.stringify(updatedLocalUser));
        setUser(updatedLocalUser);
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Network error while updating profile.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await fetch('http://localhost:5000/api/vendor/profile/upload', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: formData
      });
      
      const data = await response.json();
      if (response.ok) {
        // Update local state and local storage immediately
        const updatedLocalUser = { ...JSON.parse(localStorage.getItem('user')), profile_picture: data.profile_picture };
        localStorage.setItem('user', JSON.stringify(updatedLocalUser));
        setUser(updatedLocalUser);
        setProfileForm({...profileForm, profile_picture: data.profile_picture});
        alert('Profile picture updated successfully!');
      } else {
        alert(data.message || 'Failed to upload picture');
      }
    } catch (error) {
      console.error("Error uploading picture:", error);
      alert('Network error while uploading picture.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      const response = await fetch('http://localhost:5000/api/vendor/password', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(passwordForm)
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Password updated successfully!');
        setShowPasswordChange(false);
        setPasswordForm({ oldPassword: '', newPassword: '' });
      } else {
        alert(data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert('Network error while changing password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'portfolio', label: 'My Portfolio', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'declined': return 'bg-red-50 text-red-700 border-red-200';
      case 'preparing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ready': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2500")', // High-end catering/vendor plating
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90 z-0"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-[#fffdf8]/95 backdrop-blur-xl border-r border-white/40 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-white/40 flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('settings')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 overflow-hidden border-2 border-white group-hover:scale-105 transition-transform">
            {user?.profile_picture ? (
               <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <span className="text-white font-bold">{user?.name ? user.name.charAt(0).toUpperCase() : 'V'}</span>
            )}
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors">EventHub <span className="text-indigo-600 font-bold text-sm">Vendor</span></span>
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 relative z-10">
        <header className="mb-10 relative z-10">
          <h1 className="text-3xl font-black text-white capitalize drop-shadow-md">
            {activeTab === 'requests' ? (
              <>Welcome, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{user?.name || 'Vendor'}</span> 👋</>
            ) : (
              navItems.find(i => i.id === activeTab)?.label || 'Profile Settings'
            )}
          </h1>
          <p className="text-gray-300 font-medium mt-1 drop-shadow">Manage your services, portfolio, and requests.</p>
        </header>

        {myVendors.length === 0 && activeTab !== 'portfolio' && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-lg mb-8 flex items-start gap-4">
            <Settings className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-800 font-bold">Complete Your Portfolio</h3>
              <p className="text-amber-700 text-sm mt-1">You need to add at least one vendor profile before customers can send you requests. Go to the Portfolio tab to get started.</p>
              <button onClick={() => setActiveTab('portfolio')} className="mt-3 text-sm font-bold text-amber-600 hover:text-amber-800 underline">Set up now &rarr;</button>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="text-center p-12 text-white font-bold bg-[#fffdf8]/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  Loading requests...
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center p-12 bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl">
                   <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                   <h2 className="text-2xl font-black text-gray-900 mb-2">No Requests Found</h2>
                   <p className="text-gray-500 max-w-sm mx-auto">You don't have any event service requests yet. Make sure your portfolio is up to date to attract customers!</p>
                </div>
              ) : (
                requests.map((req, idx) => (
                  <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-6 flex flex-col lg:flex-row items-center justify-between hover:shadow-indigo-500/10 transition-all">
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-gray-900">{req.customerName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)} capitalize`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-2">
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500"/> {req.date}</div>
                        <div className="flex items-center gap-1 text-gray-700 font-bold">Phone: {req.customerPhone}</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Venue: <span className="font-bold">{req.venueName}</span>, {req.location}</p>
                      
                      <div className="flex gap-4 text-sm bg-gray-50/50 p-3 rounded-xl border border-gray-100 inline-flex">
                        <span className="font-bold text-gray-500">Guests: <span className="text-gray-900">{req.guests}</span></span>
                        <span className="font-bold text-gray-500 border-l pl-4 border-gray-200">Agreed Cost: <span className="text-indigo-600 font-black">{req.cost}</span></span>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 flex flex-wrap gap-3 w-full lg:w-auto justify-end">
                      {req.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'accepted')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
                          >
                            <CheckCircle className="w-4 h-4" /> Accept
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'declined')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700 font-bold rounded-xl transition-all shadow-sm"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                        </>
                      )}
                      
                      {req.status === 'accepted' && (
                        <button 
                          onClick={() => handleUpdateStatus(req.id, 'preparing')}
                          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
                        >
                          <Settings className="w-4 h-4" /> Start Preparing
                        </button>
                      )}

                      {req.status === 'preparing' && (
                        <button 
                          onClick={() => handleUpdateStatus(req.id, 'ready')}
                          className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all"
                        >
                          <Check className="w-4 h-4" /> Mark as Ready
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 max-w-5xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-600"/> Request History</h3>
            
            {historyRequests.length === 0 ? (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-bold mb-4">No past requests found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyRequests.map(req => (
                  <div key={req.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-black text-gray-900">{req.customer_name}</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          req.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          req.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        <span className="text-gray-400">Venue:</span> {req.venue_name}
                      </p>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        <span className="text-gray-400">Event Date:</span> {new Date(req.event_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            
            {vendorView === 'list' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white drop-shadow-md">Your Vendors ({myVendors.length})</h3>
                  <button 
                    onClick={() => setVendorView('claim')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    Add Vendor
                  </button>
                </div>
                
                {myVendors.length === 0 ? (
                  <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-12 text-center">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No vendors added yet</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first vendor profile.</p>
                    <button 
                      onClick={() => setVendorView('claim')}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-indigo-700"
                    >
                      Add Vendor Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myVendors.map(v => (
                      <div key={v.id} className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl overflow-hidden group hover:shadow-indigo-900/20 transition-all">
                        <div className="h-48 relative overflow-hidden">
                          <img src={v.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-black text-indigo-700 text-sm shadow-md uppercase">
                            {v.service_type}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-black text-gray-900 mb-2">{v.title}</h3>
                          <p className="text-gray-500 text-sm mb-4">Location: {v.location}</p>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{v.portfolio_description}</p>
                          <p className="font-bold text-gray-900 mb-6">Starting at ${v.starting_rate}</p>
                          <button 
                            onClick={() => handleRemoveVendor(v.id)}
                            className="w-full py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-sm font-bold transition-colors border border-red-100"
                          >
                            Remove Vendor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {vendorView === 'claim' && (
              <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setVendorView('list')} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                      <XCircle className="w-6 h-6"/>
                    </button>
                    <h3 className="text-2xl font-black text-gray-900">Available Vendors to Claim</h3>
                  </div>
                  <button 
                    onClick={() => setVendorView('create')}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-indigo-200"
                  >
                    Customize New
                  </button>
                </div>

                {unassignedVendors.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold mb-4">No pre-existing vendors left to claim.</p>
                    <button 
                      onClick={() => setVendorView('create')}
                      className="text-indigo-600 hover:text-indigo-700 font-bold underline"
                    >
                      Create your own custom vendor instead
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unassignedVendors.map(v => (
                      <div key={v.id} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col group">
                        <div className="h-40 relative overflow-hidden">
                          <img src={v.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="font-black text-gray-900 mb-1">{v.title}</h4>
                          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">{v.service_type}</p>
                          <button 
                            onClick={() => handleClaimVendor(v.id)} 
                            className="mt-auto w-full bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all"
                          >
                            Claim Vendor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {vendorView === 'create' && (
              <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setVendorView('claim')} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                      <XCircle className="w-6 h-6"/>
                    </button>
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-2"><Edit3 className="w-5 h-5 text-indigo-600"/> Create Custom Vendor</h3>
                  </div>
                </div>
                
                <form onSubmit={handleSaveVendor} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vendor Name / Title</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={vendorForm.title || ''} 
                        onChange={e => setVendorForm({...vendorForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Available Nationwide"
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={vendorForm.location || ''} 
                        onChange={e => setVendorForm({...vendorForm, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Service Type</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium appearance-none cursor-pointer"
                        value={vendorForm.service_type}
                        onChange={(e) => setVendorForm({...vendorForm, service_type: e.target.value})}
                      >
                        <option value="catering">Catering</option>
                        <option value="decoration">Decoration</option>
                        <option value="photography">Photography</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Starting Package Rate ($)</label>
                      <input 
                        type="number" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={vendorForm.starting_rate} 
                        onChange={e => setVendorForm({...vendorForm, starting_rate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Upload Image from Desktop</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 mb-4" 
                      onChange={e => setVendorForm({...vendorForm, image_file: e.target.files[0]})}
                    />
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">OR Cover Image URL (Unsplash)</label>
                    <input 
                      type="url" 
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                      value={vendorForm.image_url} 
                      onChange={e => setVendorForm({...vendorForm, image_url: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Portfolio Description & Packages</label>
                    <textarea 
                      rows="6"
                      required
                      placeholder="Describe your services, experience, and the packages you offer..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium resize-none leading-relaxed" 
                      value={vendorForm.portfolio_description}
                      onChange={e => setVendorForm({...vendorForm, portfolio_description: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all w-full mt-6 flex items-center justify-center text-lg"
                  >
                    Save Custom Vendor
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden flex h-[600px]">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r border-gray-200 bg-gray-50/50 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-black text-gray-900 mb-3">Contacts</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveContactTab('customer')}
                    className={`flex-1 py-2.5 px-4 text-sm font-black rounded-xl transition-all shadow-sm ${activeContactTab === 'customer' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    Customers
                  </button>
                  <button 
                    onClick={() => setActiveContactTab('venue_owner')}
                    className={`flex-1 py-2.5 px-4 text-sm font-black rounded-xl transition-all shadow-sm ${activeContactTab === 'venue_owner' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    Venue Owners
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* System Notices Contact */}
                <button 
                  onClick={() => setActiveChat({ id: 'system_notices', name: 'System Notices', role: 'admin' })}
                  className={`w-full text-left p-4 border-b border-gray-100 flex items-center gap-3 transition-colors ${activeChat?.id === 'system_notices' ? 'bg-indigo-50 border-indigo-100' : 'hover:bg-white'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">System Notices</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ADMIN ANNOUNCEMENTS</div>
                    {announcements.length > 0 && (
                      <div className="text-[10px] text-indigo-600 font-bold mt-0.5">
                        {announcements.length} {announcements.length === 1 ? 'Notice' : 'Notices'}
                      </div>
                    )}
                  </div>
                </button>

                {chatContacts.filter(c => c.role === activeContactTab).length === 0 ? (
                  <p className="p-4 text-gray-500 text-sm text-center capitalize">No {activeContactTab.replace('_', ' ')}s found.</p>
                ) : (
                  chatContacts.filter(c => c.role === activeContactTab).map(contact => (
                    <button 
                      key={contact.id} 
                      onClick={() => setActiveChat(contact)}
                      className={`w-full text-left p-4 border-b border-gray-100 flex items-center gap-3 transition-colors ${activeChat?.id === contact.id ? 'bg-indigo-50 border-indigo-100' : 'hover:bg-white'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{contact.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{contact.role.replace('_', ' ')}</div>
                        {contact.message_count > 0 && (
                          <div className="text-[10px] text-indigo-600 font-bold mt-0.5">
                            {contact.message_count} {contact.message_count === 1 ? 'Message' : 'Messages'}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white/50">
              {activeChat ? (
                <>
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {activeChat.id === 'system_notices' ? <MessageSquare className="w-5 h-5" /> : activeChat.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">{activeChat.name}</h3>
                      {activeChat.id !== 'system_notices' && <p className="text-xs text-green-600 font-bold">Online</p>}
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                    {activeChat.id === 'system_notices' ? (
                      announcements.length === 0 ? (
                        <div className="m-auto text-center">
                          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500 font-medium">No notices from the administration.</p>
                        </div>
                      ) : (
                        announcements.map((ann, idx) => (
                          <div key={ann.id} className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-50">
                            <h4 className="font-black text-gray-900 mb-2 flex items-center gap-2">
                              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">{idx + 1}</span>
                              {ann.title}
                            </h4>
                            <p className="text-gray-600 text-sm whitespace-pre-wrap pl-8">{ann.message}</p>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-8 mt-4">
                              {new Date(ann.created_at).toLocaleString()}
                            </div>
                          </div>
                        ))
                      )
                    ) : messages.length === 0 ? (
                      <div className="m-auto text-center">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium">No messages yet. Send a hello!</p>
                      </div>
                    ) : (
                      messages.map(msg => {
                        const isMine = msg.sender_id === user.id;
                        return (
                          <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-2xl ${isMine ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-900 rounded-tl-none'}`}>
                              <p className="text-sm">{msg.message}</p>
                              <p className={`text-[10px] mt-1 text-right ${isMine ? 'text-indigo-200' : 'text-gray-400'}`}>
                                {new Date(msg.sent_at || msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {activeChat.id !== 'system_notices' && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={newMessage}
                          onChange={e => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <button 
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex-shrink-0"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  )}
                </>
              ) : (
                <div className="m-auto text-center">
                  <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400">Select a conversation</h3>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-indigo-600"/> Profile Settings</h3>
            
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left Column: Avatar & Photo Upload */}
              <div className="flex flex-col items-center gap-4 md:w-1/3">
                 <div className="w-40 h-40 bg-gray-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {user?.profile_picture ? (
                       <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <span className="text-5xl font-black text-gray-300">{user?.name ? user.name.charAt(0).toUpperCase() : 'V'}</span>
                    )}
                 </div>
                 
                 <div className="w-full mt-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">Update Picture</label>
                   <input 
                     type="file" 
                     accept="image/*"
                     className="w-full px-3 py-2 text-sm rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                     onChange={handleProfilePictureUpload}
                   />
                 </div>
                 <p className="text-xs text-center text-gray-400 mt-1">Select an image from your device.</p>
              </div>

              {/* Right Column: Form */}
              <form onSubmit={handleUpdateProfile} className="flex-1 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                    value={profileForm.name}
                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                    value={profileForm.email}
                    onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                    value={profileForm.phone}
                    onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                    value={profileForm.dob}
                    onChange={e => setProfileForm({...profileForm, dob: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Address</label>
                <textarea 
                  rows="2"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium resize-none" 
                  value={profileForm.address}
                  onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Security</h4>
                
                {!showPasswordChange ? (
                  <button 
                    type="button"
                    onClick={() => setShowPasswordChange(true)}
                    className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all text-sm"
                  >
                    Change Password
                  </button>
                ) : (
                  <div className="space-y-4 bg-white/50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Old Password</label>
                      <input 
                        type="password" 
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={passwordForm.oldPassword}
                        onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                      <input 
                        type="password" 
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={passwordForm.newPassword}
                        onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={handleChangePassword}
                        disabled={isChangingPassword}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isChangingPassword ? 'Updating...' : 'Update Password'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setShowPasswordChange(false);
                          setPasswordForm({ oldPassword: '', newPassword: '' });
                        }}
                        className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold rounded-lg transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isUpdatingProfile}
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all w-full mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUpdatingProfile ? 'Saving Changes...' : 'Save All Changes'}
              </button>
            </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
