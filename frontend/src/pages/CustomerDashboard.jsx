import { useState, useEffect } from 'react';
import { CalendarDays, Search, MessageSquare, Settings, LogOut, Download, Star, MapPin, User, Users, FileText, Send, CheckCircle, Plus, Store, Clock } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [statements, setStatements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', dob: '', address: '', profile_picture: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // New features state
  const [searchParams, setSearchParams] = useState({ date: '', capacity: '', maxBudget: '' });
  const [venues, setVenues] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedIndependentVendor, setSelectedIndependentVendor] = useState(null);
  const [guestCount, setGuestCount] = useState('');
  
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, type: '', data: null });
  
  const [chatContacts, setChatContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

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
          
          // Mark any newly fetched cancelled/rejected bookings as seen
          // so they move to history on the next reload
          fetch('http://localhost:5000/api/customer/bookings/mark-seen', {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }).catch(err => console.error("Could not mark as seen:", err));
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

    const fetchHistoryBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/history', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setHistoryBookings(data);
        }
      } catch (error) {
        console.error("Backend offline. Could not fetch history.", error);
      }
    };

    const fetchStatements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/statements', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStatements(data);
        }
      } catch (error) {
        console.error("Backend offline. Could not fetch statements.", error);
      }
    };

    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'history') fetchHistoryBookings();
    if (activeTab === 'statements') fetchStatements();
  }, [activeTab]);

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

  const handlePayFull = async (rawId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customer/bookings/${rawId}/pay-full`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        // Refresh bookings to reflect full payment
        const updatedResponse = await fetch('http://localhost:5000/api/customer/bookings', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setBookings(data);
        }
        alert('Full payment successful!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Payment failed');
      }
    } catch (error) {
      console.error("Error paying full balance:", error);
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

  const handleSearchVenues = async (e) => {
    e?.preventDefault();
    try {
      const query = new URLSearchParams();
      if (searchParams.date) query.append('date', searchParams.date);
      if (searchParams.capacity) query.append('capacity', searchParams.capacity);
      if (searchParams.maxBudget) query.append('maxBudget', searchParams.maxBudget);

      const res = await fetch(`http://localhost:5000/api/customer/venues/search?${query.toString()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setVenues(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customer/vendors', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setVendors(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleBookVenue = async () => {
    if (!selectedVenue || !searchParams.date || !guestCount) return alert("Date and guest count are required!");
    
    const venueCost = Number(selectedVenue.price_per_day);
    const vendorCost = selectedVendors.reduce((sum, v) => sum + Number(v.starting_rate || v.cost || 0), 0);
    const totalAmount = venueCost + vendorCost;

    const payload = {
      venue_id: selectedVenue.id,
      event_date: searchParams.date,
      guest_count: guestCount,
      total_amount: totalAmount,
      vendor_ids: selectedVendors.map(v => ({ id: v.id, cost: v.starting_rate }))
    };

    try {
      const res = await fetch('http://localhost:5000/api/customer/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Booking request submitted successfully!");
        setSelectedVenue(null);
        setSelectedVendors([]);
        setActiveTab('bookings');
        // Refresh bookings
        const updatedResponse = await fetch('http://localhost:5000/api/customer/bookings', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (updatedResponse.ok) setBookings(await updatedResponse.json());
      } else {
        const data = await res.json();
        alert(data.message || "Error submitting booking.");
      }
    } catch (err) { console.error(err); alert("Error submitting booking."); }
  };

  const handleBookIndependentVendor = async () => {
    if (!selectedIndependentVendor || !searchParams.date || !guestCount) return alert("Date and guest count are required!");

    const payload = {
      venue_id: null,
      event_date: searchParams.date,
      guest_count: guestCount,
      total_amount: Number(selectedIndependentVendor.starting_rate),
      vendor_ids: [{ id: selectedIndependentVendor.id, cost: selectedIndependentVendor.starting_rate }]
    };

    try {
      const res = await fetch('http://localhost:5000/api/customer/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Vendor booking confirmed!");
        setSelectedIndependentVendor(null);
        setActiveTab('bookings');
        // Refresh bookings
        const updatedResponse = await fetch('http://localhost:5000/api/customer/bookings', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (updatedResponse.ok) setBookings(await updatedResponse.json());
      } else {
        const data = await res.json();
        alert(data.message || "Error submitting booking.");
      }
    } catch (err) { console.error(err); alert("Error submitting booking."); }
  };

  const fetchChatContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customer/chat-contacts', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const fetchedContacts = await res.json();
        setChatContacts(prev => {
          const merged = [...fetchedContacts];
          // If we have an active chat that isn't in the fetched list, keep it
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
      const res = await fetch('http://localhost:5000/api/customer/announcements', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setAnnouncements(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchMessages = async (partnerId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/customer/messages/${partnerId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setMessages(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;
    try {
      const res = await fetch('http://localhost:5000/api/customer/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ receiver_id: activeChat.id, message: newMessage })
      });
      if (res.ok) {
        setNewMessage('');
        fetchMessages(activeChat.id);
        fetchChatContacts();
      }
    } catch (err) { console.error(err); }
  };

  const handleDownloadInvoice = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customer/bookings/${id}/invoice`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to download invoice');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_BKG-${id.toString().padStart(3, '0')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Error downloading invoice');
    }
  };

  const handleRate = async (booking) => {
    const rating = prompt(`Rate ${booking.venueName} (1-5):`, "5");
    if (!rating) return;
    const comment = prompt("Optional comment:");
    try {
      const res = await fetch('http://localhost:5000/api/customer/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ venue_id: booking.rawId, rating: Number(rating), comment })
      });
      if (res.ok) alert("Review submitted! Thank you.");
    } catch (err) { console.error(err); }
  };

  // When changing to explore, fetch vendors. When changing to messages, fetch contacts.
  useEffect(() => {
    if (activeTab === 'explore') {
       handleSearchVenues();
       fetchVendors();
    } else if (activeTab === 'explore-vendors') {
       fetchVendors();
    } else if (activeTab === 'messages') {
       fetchChatContacts();
       fetchAnnouncements();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeChat && activeChat.id !== 'system_notices') {
      fetchMessages(activeChat.id);
      const interval = setInterval(() => fetchMessages(activeChat.id), 5000); // Simple polling
      return () => clearInterval(interval);
    }
  }, [activeChat]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { id: 'bookings', label: 'My Bookings', icon: CalendarDays },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'explore', label: 'Explore Venues', icon: Search },
    { id: 'explore-vendors', label: 'Explore Vendors', icon: Store },
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
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          (booking.status || '').toLowerCase() === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
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
                      {(booking.status || '').toLowerCase() === 'pending' && (
                        <button 
                          onClick={() => handlePayAdvance(booking.rawId)}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
                        >
                          Pay Advance
                        </button>
                      )}
                      {(booking.status || '').toLowerCase() === 'confirmed' && (
                        <>
                          {booking.total !== booking.paid && (
                            <button 
                              onClick={() => handlePayFull(booking.rawId)}
                              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all whitespace-nowrap"
                            >
                              Pay Balance
                            </button>
                          )}
                          <button onClick={() => handleDownloadInvoice(booking.rawId)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all shadow-sm">
                            <Download className="w-4 h-4" /> Invoice
                          </button>
                          <button onClick={() => handleRate(booking)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 text-yellow-700 font-bold rounded-xl transition-all shadow-sm">
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

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="text-center p-12 text-white font-bold bg-[#fffdf8]/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  Loading your history...
                </div>
              ) : historyBookings.length === 0 ? (
                <div className="text-center p-12 bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl">
                   <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                   <h2 className="text-2xl font-black text-gray-900 mb-2">No Past Bookings</h2>
                   <p className="text-gray-500 max-w-sm mx-auto">Your booking history is currently empty.</p>
                </div>
              ) : (
                historyBookings.map((booking, idx) => (
                  <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-gray-900">{booking.venueName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          booking.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                          booking.status === 'confirmed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          'bg-red-50 text-red-700 border border-red-100'
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
                      {(booking.status || '').toLowerCase() === 'completed' && (
                        <>
                          <button onClick={() => handleDownloadInvoice(booking.rawId)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all shadow-sm">
                            <Download className="w-4 h-4" /> Invoice
                          </button>
                          <button onClick={() => handleRate(booking)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 text-yellow-700 font-bold rounded-xl transition-all shadow-sm">
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
          <div className="space-y-6">
            <form onSubmit={handleSearchVenues} className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-6 flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Event Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium" value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Guests</label>
                <input type="number" placeholder="Capacity" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium" value={searchParams.capacity} onChange={e => setSearchParams({...searchParams, capacity: e.target.value})} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Max Budget</label>
                <input type="number" placeholder="$" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium" value={searchParams.maxBudget} onChange={e => setSearchParams({...searchParams, maxBudget: e.target.value})} />
              </div>
              <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all h-[50px] flex items-center justify-center">
                Search
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map(v => (
                <div key={v.id} className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl overflow-hidden group">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {v.image_url ? (
                      <img src={v.image_url} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-black text-gray-900">{v.title}</h3>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Owner</span>
                        <span className="text-sm font-bold text-gray-700">{v.owner_name || 'EventHub Partner'}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapPin className="w-4 h-4" /> {v.location}</p>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-gray-900">Up to {v.capacity} guests</span>
                      <span className="font-black text-indigo-600">${v.price_per_day}/day</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setDetailsModal({ isOpen: true, type: 'venue', data: v })}
                          className="w-1/3 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold rounded-xl transition-all text-center flex items-center justify-center"
                        >
                          About
                        </button>
                        <button 
                          onClick={() => { setSelectedVenue(v); setGuestCount(searchParams.capacity || ''); }}
                          className="flex-1 py-3 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold rounded-xl transition-all"
                        >
                          Book This Venue
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                          const contactInfo = { id: v.owner_user_id, name: v.owner_name || 'EventHub Partner', role: 'venue_owner' };
                          if (contactInfo.id && !chatContacts.find(c => c.id === contactInfo.id)) {
                            setChatContacts(prev => [contactInfo, ...prev]);
                          }
                          if (contactInfo.id) {
                            setActiveChat(contactInfo);
                            setActiveTab('messages');
                          }
                        }}
                        className="w-full py-3 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" /> Message Owner
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedVenue && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#fffdf8] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Book {selectedVenue.title}</h2>
                  <p className="text-gray-500 mb-6">Complete your booking details and select optional vendors.</p>

                  <div className="space-y-4 mb-6">
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Event Date</label>
                       <input type="date" className="w-full px-4 py-2 border rounded-xl" value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Guest Count</label>
                       <input type="number" className="w-full px-4 py-2 border rounded-xl" value={guestCount} onChange={e => setGuestCount(e.target.value)} />
                     </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3">Add Vendors (Optional)</h3>
                  <div className="space-y-2 mb-8 max-h-48 overflow-y-auto">
                    {vendors.map(vendor => (
                      <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-xl">
                        <div>
                          <span className="font-bold text-gray-800">{vendor.vendor_name}</span>
                          <span className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded">{vendor.service_type}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            type="button"
                            onClick={() => setDetailsModal({ isOpen: true, type: 'vendor', data: vendor })}
                            className="text-xs text-indigo-600 font-bold hover:underline"
                          >
                            About Vendor
                          </button>
                          <span className="font-bold text-indigo-600">${vendor.starting_rate}</span>
                          <button 
                            onClick={() => {
                              setSelectedVendors(prev => {
                                if (prev.find(v => v.id === vendor.id)) {
                                  return prev.filter(v => v.id !== vendor.id);
                                } else {
                                  return [...prev, vendor];
                                }
                              });
                            }}
                            className={`p-1.5 rounded-lg border ${selectedVendors.find(v => v.id === vendor.id) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-400 border-gray-200'}`}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-bold">Total Estimated Cost</p>
                      <p className="text-2xl font-black text-gray-900">${Number(selectedVenue.price_per_day) + selectedVendors.reduce((s, v) => s + Number(v.starting_rate), 0)}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setSelectedVenue(null)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Cancel</button>
                      <button onClick={handleBookVenue} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700">Confirm Booking</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'explore-vendors' && (
          <div className="space-y-6">
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-8 mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Explore Elite Vendors</h2>
              <p className="text-gray-500">Discover top-tier photographers, caterers, and decorators for your next event.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map(v => (
                <div key={v.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col">
                  <div className="h-52 overflow-hidden relative bg-gray-100">
                    <img 
                      src={v.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'} 
                      alt={v.vendor_name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {v.rating || '5.0'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 bg-indigo-50 w-max px-2.5 py-1 rounded-md">
                      {v.service_type.replace('_', ' ')}
                    </div>
                    
                    <h3 className="font-black text-xl text-gray-900 mb-2">{v.vendor_name}</h3>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4 font-medium">
                      <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {v.location || 'Available Nationwide'}
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">
                      {v.description || "Top rated vendor on EventHub. Professional service guaranteed."}
                    </p>
                    
                    <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center gap-4">
                      <span className="font-black text-gray-900">From ${Number(v.starting_rate || 0).toLocaleString()}</span>
                      <div className="flex flex-wrap gap-2 justify-end mt-2">
                        <button 
                          onClick={() => setDetailsModal({ isOpen: true, type: 'vendor', data: v })}
                          className="px-3 py-2 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          About
                        </button>
                        <button 
                          onClick={() => {
                            const contactInfo = { id: v.user_id, name: v.vendor_name, role: 'vendor' };
                            if (!chatContacts.find(c => c.id === contactInfo.id)) {
                              setChatContacts(prev => [contactInfo, ...prev]);
                            }
                            setActiveChat(contactInfo);
                            setActiveTab('messages');
                          }}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Message
                        </button>
                        <button 
                          onClick={() => setSelectedIndependentVendor(v)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-lg text-xs transition-colors flex items-center shadow-md shadow-indigo-200"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

            {/* Independent Vendor Booking Form */}
            {selectedIndependentVendor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedIndependentVendor(null)}></div>
                <div className="bg-white rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Book {selectedIndependentVendor.vendor_name}</h2>
                  <p className="text-gray-500 mb-6">Complete your booking details for this vendor.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Event Date</label>
                       <input type="date" className="w-full px-4 py-2 border rounded-xl" value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} min={new Date().toISOString().split('T')[0]} />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estimated Guests</label>
                       <input type="number" className="w-full px-4 py-2 border rounded-xl" value={guestCount} onChange={e => setGuestCount(e.target.value)} />
                     </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Booking Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600 font-medium">
                        <span>{selectedIndependentVendor.service_type} Fee</span>
                        <span className="font-bold">${selectedIndependentVendor.starting_rate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Cost</p>
                        <p className="text-2xl font-black text-gray-900">${Number(selectedIndependentVendor.starting_rate)}</p>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setSelectedIndependentVendor(null)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Cancel</button>
                        <button 
                          onClick={handleBookIndependentVendor} 
                          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
                        >
                          Confirm Vendor Booking
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            )}

        {activeTab === 'messages' && (
          <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden flex h-[600px]">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r border-gray-200 bg-gray-50/50 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-black text-gray-900">Your Conversations</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
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
                {chatContacts.map(contact => (
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
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{contact.role.replace('_', ' ')}</div>
                      {contact.message_count > 0 && (
                        <div className="text-[10px] text-indigo-600 font-bold mt-0.5">
                          {contact.message_count} {contact.message_count === 1 ? 'Message' : 'Messages'}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {activeChat.id === 'system_notices' ? <MessageSquare className="w-5 h-5" /> : activeChat.name.charAt(0)}
                    </div>
                    <span className="font-black text-gray-900">{activeChat.name}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                    {activeChat.id === 'system_notices' ? (
                      announcements.length === 0 ? (
                        <div className="text-center text-gray-400 py-10 font-medium">No notices from the administration.</div>
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
                    ) : (
                      messages.map(msg => {
                        const isMine = msg.sender_id === user.id;
                        return (
                          <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-4 rounded-2xl ${
                              isMine ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-bl-sm'
                            }`}>
                              <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                              <div className={`text-[10px] mt-2 font-bold ${isMine ? 'text-indigo-200' : 'text-gray-400'}`}>
                                {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {activeChat.id !== 'system_notices' && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input 
                          type="text" placeholder="Type a message..."
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2">
                          <Send className="w-4 h-4" /> Send
                        </button>
                      </form>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
                  <p className="font-bold">Select a conversation to start chatting</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'statements' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2"><FileText className="w-6 h-6 text-white"/> Billing Statements</h2>
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8">
              {statements.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Your payment history and invoices will appear here once you complete a transaction.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-500 text-sm tracking-wider uppercase">
                        <th className="py-4 font-bold">Date</th>
                        <th className="py-4 font-bold">Booking ID</th>
                        <th className="py-4 font-bold">Vendor / Venue</th>
                        <th className="py-4 font-bold">Amount Paid</th>
                        <th className="py-4 font-bold">Total Cost</th>
                        <th className="py-4 font-bold">Status</th>
                        <th className="py-4 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {statements.map((stmt, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 text-sm font-medium text-gray-700">{stmt.date}</td>
                          <td className="py-4 text-sm font-bold text-indigo-600">{stmt.bookingId}</td>
                          <td className="py-4 text-sm font-bold text-gray-900">{stmt.venueName}</td>
                          <td className="py-4 text-sm font-black text-green-600">${Number(stmt.advance_paid).toLocaleString()}</td>
                          <td className="py-4 text-sm font-bold text-gray-500">${Number(stmt.total_amount).toLocaleString()}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              stmt.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                              stmt.status === 'confirmed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                              'bg-gray-50 text-gray-700 border border-gray-100'
                            }`}>
                              {stmt.status === 'completed' ? 'Fully Paid' : 'Partially Paid'}
                            </span>
                          </td>
                          <td className="py-4">
                            <button 
                              onClick={() => handleDownloadInvoice(stmt.rawId)} 
                              className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all shadow-sm text-xs"
                            >
                              <Download className="w-3.5 h-3.5" /> PDF
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

        {/* Details Modal */}
        {detailsModal.isOpen && detailsModal.data && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setDetailsModal({ isOpen: false, type: '', data: null })}></div>
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col">
              
              {/* Modal Header / Cover Image */}
              <div className="relative h-64 md:h-80 w-full bg-gray-100 flex-shrink-0">
                <img 
                  src={detailsModal.data.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'} 
                  alt={detailsModal.data.title || detailsModal.data.vendor_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <button 
                  onClick={() => setDetailsModal({ isOpen: false, type: '', data: null })}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 rounded-full transition-colors"
                >
                  <LogOut className="w-5 h-5 rotate-180" />
                </button>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 bg-indigo-900/40 w-max px-3 py-1 rounded-full backdrop-blur-md border border-indigo-400/20">
                    {detailsModal.type === 'venue' ? 'Event Venue' : detailsModal.data.service_type?.replace('_', ' ')}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">
                    {detailsModal.data.title || detailsModal.data.vendor_name}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 flex-1 bg-gray-50 flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                  <section>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-indigo-600" /> 
                      About {detailsModal.data.title || detailsModal.data.vendor_name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {detailsModal.data.description || "Top rated on EventHub. Professional service guaranteed. Let us make your event unforgettable."}
                    </p>
                  </section>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-4 h-4"/> Location</div>
                      <div className="font-bold text-gray-900">{detailsModal.data.location || 'Available Nationwide'}</div>
                    </div>
                    {detailsModal.type === 'venue' && (
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Users className="w-4 h-4"/> Capacity</div>
                        <div className="font-bold text-gray-900">Up to {detailsModal.data.capacity} guests</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-80 flex-shrink-0">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl sticky top-8">
                    <div className="text-center mb-6">
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Starting at</div>
                      <div className="text-4xl font-black text-indigo-600">
                        ${Number(detailsModal.data.price_per_day || detailsModal.data.starting_rate).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 font-medium mt-1">{detailsModal.type === 'venue' ? 'per day' : 'base rate'}</div>
                    </div>
                    <button 
                      onClick={() => setDetailsModal({ isOpen: false, type: '', data: null })}
                      className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-xl transition-all shadow-lg active:scale-95"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
