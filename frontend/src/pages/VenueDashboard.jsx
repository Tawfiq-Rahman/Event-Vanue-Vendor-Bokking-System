import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Building, LayoutDashboard, CalendarCheck, Settings,
  Plus, LogOut, TrendingUp, Users, DollarSign,
  MessageSquare, Send, CheckCircle, XCircle, MapPin, Download, Clock
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

  // Venue Owner Feature State
  const [venues, setVenues] = useState([]);
  const [unassignedVenues, setUnassignedVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  
  // Add Venue State
  const [venueView, setVenueView] = useState('list'); // 'list' | 'claim' | 'create'
  const [venueForm, setVenueForm] = useState({ title: '', description: '', location: '', capacity: '', price_per_day: '', image_url: '', image_file: null, packages: '' });
  const [actionMessage, setActionMessage] = useState(null);
  
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
    fetchVenues();
    fetchUnassignedVenues();
    fetchBookings();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/venue-owner/venues', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setVenues(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchUnassignedVenues = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/venue-owner/unassigned-venues', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setUnassignedVenues(await res.json());
    } catch (err) { console.error(err); }
  };

  const showMessage = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleClaimVenue = async (venueId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/venue-owner/venues/${venueId}/claim`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        fetchVenues();
        fetchUnassignedVenues();
        showMessage('Venue successfully claimed and added to your portfolio!');
      }
    } catch (err) { console.error(err); }
  };

  const handleRemoveVenue = async (venueId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/venue-owner/venues/${venueId}/unclaim`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        fetchVenues();
        fetchUnassignedVenues();
        showMessage('Venue removed from your portfolio.');
      }
    } catch (err) { console.error(err); }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/venue-owner/bookings', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setBookings(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchHistoryBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/venue-owner/history', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setHistoryBookings(await res.json());
    } catch (err) { console.error(err); }
  };

  // CHAT FUNCTIONS
  const fetchChatContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/venue-owner/chat-contacts', {
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
      const res = await fetch('http://localhost:5000/api/venue-owner/announcements', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setAnnouncements(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchMessages = async () => {
    if (!activeChat) return;
    try {
      const res = await fetch(`http://localhost:5000/api/venue-owner/messages/${activeChat.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setMessages(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      const res = await fetch('http://localhost:5000/api/venue-owner/messages', {
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
    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'history') fetchHistoryBookings();
    if (activeTab === 'messages') {
      fetchChatContacts();
      fetchAnnouncements();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeChat && activeChat.id !== 'system_notices') {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [activeChat]);

  const handleAddVenue = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', venueForm.title);
      formData.append('description', venueForm.description);
      formData.append('location', venueForm.location);
      formData.append('capacity', venueForm.capacity);
      formData.append('price_per_day', venueForm.price_per_day);
      formData.append('packages', venueForm.packages);
      if (venueForm.image_url) formData.append('image_url', venueForm.image_url);
      if (venueForm.image_file) formData.append('image_file', venueForm.image_file);

      const response = await fetch('http://localhost:5000/api/venue-owner/venues', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (response.ok) {
        showMessage('Venue customized and created successfully!');
        setVenueView('list');
        setVenueForm({ title: '', description: '', location: '', capacity: '', price_per_day: '', image_url: '', image_file: null, packages: '' });
        fetchVenues();
      }
    } catch (error) {
      console.error("Error adding venue:", error);
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/venue-owner/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (err) { console.error(err); }
  };

  const handleDownloadPDF = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/venue-owner/bookings/${bookingId}/confirmation-pdf`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking-${bookingId}-confirmation.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF');
    }
  };

  const handleUpdatePaymentStatus = async (id, payment_status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/venue-owner/bookings/${id}/payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ payment_status })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, payment_status } : b));
      }
    } catch (err) { console.error(err); }
  };

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
    { id: 'history', label: 'History', icon: Clock },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const filteredContacts = chatContacts.filter(c => c.role === activeContactTab);

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
              <button 
                onClick={() => { setActiveTab('my-venues'); setVenueView('claim'); }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Venue
              </button>
            </header>

            {/* Quick Stats Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Total Revenue', value: '$' + bookings.filter(b => b.status !== 'cancelled').reduce((acc, b) => acc + Number(b.total_price), 0).toFixed(2), icon: DollarSign, trend: '+14%' },
                { title: 'Active Bookings', value: bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length, icon: CalendarCheck, trend: '+5%' },
                { title: 'Total Guests Hosted', value: bookings.filter(b => b.status === 'completed').reduce((acc, b) => acc + Number(b.guest_count), 0), icon: Users, trend: '+22%' },
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

            {/* Recent Booking Requests */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
              <h3 className="text-lg font-black text-gray-900 mb-6">Recent Booking Requests</h3>
              {bookings.length === 0 ? (
                <div className="flex items-center justify-center py-12 border-2 border-dashed border-white/40 rounded-2xl bg-white/30">
                  <p className="text-sm font-bold text-gray-500">No new booking requests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="p-4 bg-white/50 border border-gray-100 rounded-2xl flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">{booking.customer_name} - {booking.venue_name}</p>
                        <p className="text-xs text-gray-500">{new Date(booking.event_date).toLocaleDateString()} • {booking.guest_count} Guests</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-venues' && (
          <div className="space-y-6">
            {actionMessage && (
              <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 shadow-sm">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">{actionMessage}</span>
              </div>
            )}
            
            {venueView === 'list' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white drop-shadow-md">Your Venues ({venues.length})</h3>
                  <button 
                    onClick={() => setVenueView('claim')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Venue
                  </button>
                </div>
                
                {venues.length === 0 ? (
                  <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-12 text-center">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No venues added yet</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first venue to receive bookings.</p>
                    <button 
                      onClick={() => setVenueView('claim')}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-indigo-700"
                    >
                      Add Venue Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {venues.map(venue => (
                      <div key={venue.id} className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl overflow-hidden group hover:shadow-indigo-900/20 transition-all">
                        <div className="h-48 relative overflow-hidden">
                          <img src={venue.image_url} alt={venue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-black text-indigo-700 text-sm shadow-md">
                            ${venue.price_per_day} <span className="text-xs text-gray-500">/day</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-black text-gray-900 mb-2">{venue.title}</h3>
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4 font-medium">
                            <MapPin className="w-4 h-4" /> {venue.location}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{venue.description}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                            <span className="text-sm font-bold text-gray-700 flex items-center gap-1">
                              <Users className="w-4 h-4 text-indigo-500"/> {venue.capacity} Capacity
                            </span>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                              {venue.packages ? 'Packages Available' : 'No Packages'}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleRemoveVenue(venue.id)}
                            className="w-full py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-sm font-bold transition-colors border border-red-100"
                          >
                            Remove Venue
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {venueView === 'claim' && (
              <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setVenueView('list')} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                      <XCircle className="w-6 h-6"/>
                    </button>
                    <h3 className="text-2xl font-black text-gray-900">Available Venues to Claim</h3>
                  </div>
                  <button 
                    onClick={() => setVenueView('create')}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-indigo-200"
                  >
                    <Plus className="w-4 h-4" /> Customize New
                  </button>
                </div>

                {unassignedVenues.length === 0 ? (
                  <div className="text-center py-12">
                    <Building className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold mb-4">No pre-existing venues left to claim.</p>
                    <button 
                      onClick={() => setVenueView('create')}
                      className="text-indigo-600 hover:text-indigo-700 font-bold underline"
                    >
                      Create your own custom venue instead
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {unassignedVenues.map(venue => (
                      <div key={venue.id} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col group">
                        <div className="h-48 relative overflow-hidden">
                          <img src={venue.image_url} alt={venue.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-black text-gray-900 text-sm shadow-md">
                            ${venue.price_per_day} <span className="text-xs text-gray-500">/day</span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-xl font-black text-gray-900 mb-2">{venue.title}</h3>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3 font-medium">
                            <MapPin className="w-4 h-4" /> {venue.location}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{venue.description}</p>
                          <button 
                            onClick={() => {
                              handleClaimVenue(venue.id);
                              setVenueView('list');
                            }}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all mt-auto shadow-md"
                          >
                            Claim Venue
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {venueView === 'create' && (
              <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-gray-900">Customize New Venue</h3>
                  <button onClick={() => setVenueView('list')} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                    <XCircle className="w-6 h-6"/>
                  </button>
                </div>
                <form onSubmit={handleAddVenue} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Venue Title</label>
                      <input type="text" required value={venueForm.title} onChange={e => setVenueForm({...venueForm, title: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Grand Plaza Hall" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                      <input type="text" required value={venueForm.location} onChange={e => setVenueForm({...venueForm, location: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder="City, State" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Capacity</label>
                      <input type="number" required value={venueForm.capacity} onChange={e => setVenueForm({...venueForm, capacity: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. 500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price Per Day ($)</label>
                      <input type="number" required value={venueForm.price_per_day} onChange={e => setVenueForm({...venueForm, price_per_day: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. 1500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                    <textarea required rows="3" value={venueForm.description} onChange={e => setVenueForm({...venueForm, description: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder="Describe your venue..."></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Upload Desktop Image (Optional)</label>
                    <input type="file" accept="image/*" onChange={e => setVenueForm({...venueForm, image_file: e.target.files[0]})} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">OR Image URL (Optional)</label>
                    <input type="text" value={venueForm.image_url} onChange={e => setVenueForm({...venueForm, image_url: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Packages (JSON or Text)</label>
                    <textarea rows="2" value={venueForm.packages} onChange={e => setVenueForm({...venueForm, packages: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-indigo-500" placeholder='e.g. [{"name": "Premium Catering", "price": 500}]'></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all">
                    Create Venue
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6">Booking Requests</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-black text-gray-900">{booking.customer_name}</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        <span className="text-gray-400">Venue:</span> {booking.venue_name}
                      </p>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        <span className="text-gray-400">Date:</span> {new Date(booking.event_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        <span className="text-gray-400">Guests:</span> {booking.guest_count} • <span className="text-gray-400">Cost:</span> ${booking.total_price}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-bold text-gray-500 mr-2">Payment:</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${booking.payment_status === 'pending' ? 'bg-gray-100 text-gray-600' : 'bg-emerald-100 text-emerald-700'}`}>
                          {booking.payment_status.replace('_', ' ').toUpperCase()}
                        </span>
                        
                        {booking.payment_status === 'pending' && booking.status !== 'cancelled' && (
                          <button onClick={() => handleUpdatePaymentStatus(booking.id, 'advance_paid')} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded">Mark Advance Paid</button>
                        )}
                        {booking.payment_status === 'advance_paid' && booking.status !== 'cancelled' && (
                          <button onClick={() => handleUpdatePaymentStatus(booking.id, 'full_paid')} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded">Mark Fully Paid</button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-48">
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-all"><CheckCircle className="w-4 h-4"/> Approve</button>
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')} className="w-full py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-all"><XCircle className="w-4 h-4"/> Reject</button>
                        </>
                      )}
                      {(booking.status === 'confirmed' || booking.status === 'completed') && (
                        <button 
                          onClick={() => handleDownloadPDF(booking.id)}
                          className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Download className="w-4 h-4"/> Download PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-600"/> Booking History</h3>
            {historyBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No past bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {historyBookings.map(booking => (
                  <div key={booking.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-black text-gray-900">{booking.customer_name}</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        <span className="text-gray-400">Venue:</span> {booking.venue_name}
                      </p>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        <span className="text-gray-400">Date:</span> {new Date(booking.event_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        <span className="text-gray-400">Guests:</span> {booking.guest_count} • <span className="text-gray-400">Cost:</span> ${booking.total_price}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-48">
                      {(booking.status === 'confirmed' || booking.status === 'completed') && (
                        <button 
                          onClick={() => handleDownloadPDF(booking.id)}
                          className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Download className="w-4 h-4"/> Download PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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
                    onClick={() => setActiveContactTab('vendor')}
                    className={`flex-1 py-2.5 px-4 text-sm font-black rounded-xl transition-all shadow-sm ${activeContactTab === 'vendor' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    Vendors
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

                {filteredContacts.length === 0 ? (
                  <p className="p-4 text-gray-500 text-sm text-center capitalize">No {activeContactTab}s found.</p>
                ) : (
                  filteredContacts.map(contact => (
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
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{contact.role.replace('_', ' ')}</div>
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
                            <div className={`max-w-[70%] p-3 rounded-2xl ${isMine ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-gray-100 text-gray-900 rounded-tl-none border border-gray-200'}`}>
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
                          className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md flex-shrink-0"
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