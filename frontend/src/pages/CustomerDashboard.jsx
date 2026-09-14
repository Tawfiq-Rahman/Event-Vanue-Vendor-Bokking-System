import { useState, useEffect } from 'react';
import { CalendarDays, Search, MessageSquare, Settings, LogOut, Download, Star, MapPin, User, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', dob: '', address: '', profile_picture: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/profile', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          // Only date portion if dob exists
          const formattedDob = userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '';
          setProfileForm({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            dob: formattedDob,
            address: userData.address || '',
            profile_picture: userData.profile_picture || ''
          });
        } else {
          // Fallback to local storage if API fails
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
             setUser(storedUser);
             setProfileForm(prev => ({ ...prev, name: storedUser.name, email: storedUser.email }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    
    fetchProfile();
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/bookings', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          // Fallback to dummy data ONLY if the backend isn't ready or user has no token yet
          setBookings([
            { id: 'BKG-001', rawId: 1, venueName: 'Grand Plaza Resort (Mock)', date: 'Oct 15, 2026', status: 'Confirmed', total: '$1,200', paid: '$600 (Advance)' },
            { id: 'BKG-002', rawId: 2, venueName: 'The Glass House (Mock)', date: 'Dec 05, 2026', status: 'Pending', total: '$2,500', paid: '$0' }
          ]);
        }
      } catch (error) {
        console.error("Backend offline. Loading mock data.", error);
        setBookings([
          { id: 'BKG-001', rawId: 1, venueName: 'Grand Plaza Resort (Mock)', date: 'Oct 15, 2026', status: 'Confirmed', total: '$1,200', paid: '$600 (Advance)' },
          { id: 'BKG-002', rawId: 2, venueName: 'The Glass House (Mock)', date: 'Dec 05, 2026', status: 'Pending', total: '$2,500', paid: '$0' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handlePayAdvance = async (rawId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customer/bookings/${rawId}/pay`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        // Refresh bookings to reflect new status and payment
        const updatedResponse = await fetch('http://localhost:5000/api/customer/bookings', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setBookings(data);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Payment failed');
      }
    } catch (error) {
      console.error("Error paying advance:", error);
      alert('Network error while processing payment.');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch('http://localhost:5000/api/customer/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(profileForm)
      });
      
      const data = await response.json();
      if (response.ok) {
        // Update local storage so the Navbar stays in sync
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
      setIsUpdating(false);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await fetch('http://localhost:5000/api/customer/profile/upload', {
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
      const response = await fetch('http://localhost:5000/api/customer/password', {
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
    { id: 'bookings', label: 'My Bookings', icon: CalendarDays },
    { id: 'explore', label: 'Explore Venues', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'statements', label: 'Statements', icon: FileText },
  ];

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=2500")', // Moody elegant luxury event
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80 z-0"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-[#fffdf8]/95 backdrop-blur-xl border-r border-white/40 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-white/40 flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('settings')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 overflow-hidden border-2 border-white group-hover:scale-105 transition-transform">
            {user?.profile_picture ? (
               <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <span className="text-white font-bold">{user?.name ? user.name.charAt(0).toUpperCase() : 'C'}</span>
            )}
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors">EventHub</span>
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
            {activeTab === 'bookings' ? (
              <>Welcome, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{user?.name || 'Customer'}</span> 👋</>
            ) : (
              navItems.find(i => i.id === activeTab)?.label || 'Profile Settings'
            )}
          </h1>
          <p className="text-gray-300 font-medium mt-1 drop-shadow">Manage your events and bookings.</p>
        </header>

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="text-center p-12 text-white font-bold bg-[#fffdf8]/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  Loading your bookings...
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center p-12 bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl">
                   <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                   <h2 className="text-2xl font-black text-gray-900 mb-2">No Bookings Found</h2>
                   <p className="text-gray-500 max-w-sm mx-auto">You haven't booked any venues yet. Explore our venues to get started!</p>
                </div>
              ) : (
                bookings.map((booking, idx) => (
                  <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-indigo-500/10 transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-gray-900">{booking.venueName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
                        <div className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-indigo-500"/> {booking.date}</div>
                        <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-indigo-500"/> Booking ID: {booking.id}</div>
                      </div>
                      <div className="mt-4 flex gap-4 text-sm">
                        <span className="font-black text-gray-900">Total: <span className="text-indigo-600">{booking.total}</span></span>
                        <span className="font-bold text-gray-500">Paid: {booking.paid}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      {booking.status === 'Pending' && (
                        <button 
                          onClick={() => handlePayAdvance(booking.rawId)}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
                        >
                          Pay Advance
                        </button>
                      )}
                      {booking.status === 'Confirmed' && (
                        <>
                          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all shadow-sm">
                            <Download className="w-4 h-4" /> Invoice
                          </button>
                          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 text-yellow-700 font-bold rounded-xl transition-all shadow-sm">
                            <Star className="w-4 h-4 fill-yellow-500" /> Rate
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-10 text-center">
            <Search className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Find Your Perfect Venue</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Explore our wide collection of venues and connect with top-tier vendors to make your event special.</p>
            <Link to="/" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg shadow-indigo-200 transition-all">
              Go to Search
            </Link>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-10 text-center">
             <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
             <h2 className="text-2xl font-black text-gray-900 mb-2">No Messages Yet</h2>
             <p className="text-gray-500 max-w-sm mx-auto">When you contact a venue owner or vendor, your conversations will appear here.</p>
          </div>
        )}

        {activeTab === 'statements' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-10 text-center">
             <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
             <h2 className="text-2xl font-black text-gray-900 mb-2">Billing Statements</h2>
             <p className="text-gray-500 max-w-sm mx-auto">Your payment history and invoices will appear here once you complete a transaction.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><User className="w-5 h-5 text-indigo-600"/> Edit Profile</h3>
            
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left Column: Avatar */}
              <div className="flex flex-col items-center gap-4 md:w-1/3">
                 <div className="w-40 h-40 bg-gray-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {user?.profile_picture ? (
                       <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <span className="text-5xl font-black text-gray-300">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                      value={profileForm.phone}
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium cursor-text" 
                      value={profileForm.dob}
                      onChange={e => setProfileForm({...profileForm, dob: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Address</label>
                  <textarea 
                    rows="2"
                    placeholder="123 Event Street, City, Country"
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
                  disabled={isUpdating}
                  className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all w-full mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isUpdating ? 'Saving Changes...' : 'Save All Changes'}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
