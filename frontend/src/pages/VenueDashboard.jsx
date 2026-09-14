import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building, LayoutDashboard, CalendarCheck, Settings,
  Plus, LogOut, TrendingUp, Users, DollarSign
} from 'lucide-react';

export default function VenueDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Profile settings state
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', dob: '', address: '', profile_picture: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/venue-owner/profile', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const userData = await response.json();
          const formattedDob = userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '';
          setProfileForm({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            dob: formattedDob,
            address: userData.address || '',
            profile_picture: userData.profile_picture || ''
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const response = await fetch('http://localhost:5000/api/venue-owner/profile', {
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
      const response = await fetch('http://localhost:5000/api/venue-owner/profile/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        const updatedLocalUser = { ...JSON.parse(localStorage.getItem('user')), profile_picture: data.profile_picture };
        localStorage.setItem('user', JSON.stringify(updatedLocalUser));
        setUser(updatedLocalUser);
        setProfileForm({ ...profileForm, profile_picture: data.profile_picture });
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
      const response = await fetch('http://localhost:5000/api/venue-owner/password', {
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
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'my-venues', label: 'My Venues', icon: Building },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80 z-0"></div>

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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
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
            {activeTab === 'overview' ? (
              <>Welcome, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{user?.name || 'Venue Owner'}</span> 👋</>
            ) : (
              navItems.find(i => i.id === activeTab)?.label || 'Profile Settings'
            )}
          </h1>
          <p className="text-gray-300 font-medium mt-1 drop-shadow">
            {activeTab === 'overview' ? 'Manage your properties and incoming requests.' : 'Manage your profile and properties.'}
          </p>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <header className="flex justify-end items-end mb-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Venue
              </button>
            </header>

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
                        <span className="text-xs font-bold text-emerald-500 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />{stat.trend}</span>
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

        {activeTab !== 'overview' && activeTab !== 'settings' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 font-bold capitalize">{activeTab.replace('-', ' ')} Management Grid will go here.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-indigo-600" /> Profile Settings</h3>

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
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium"
                      value={profileForm.email}
                      onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium"
                      value={profileForm.phone}
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium"
                      value={profileForm.dob}
                      onChange={e => setProfileForm({ ...profileForm, dob: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Address</label>
                  <textarea
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium resize-none"
                    value={profileForm.address}
                    onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
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
                          onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                        <input
                          type="password"
                          required
                          className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium"
                          value={passwordForm.newPassword}
                          onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
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