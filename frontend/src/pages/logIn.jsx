import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, MapPin, Camera } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      // This line catches the 403 "pending approval" error from your backend!
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Route actors to their specific dashboards based on the selected role
      if (formData.role === 'vendor') navigate('/vendor-dashboard');
      else if (formData.role === 'venue_owner') navigate('/venue-dashboard');
      else navigate('/'); 

    } catch (err) {
      // This displays the error on the screen
      setError(err.message);
    }
  };

  const roles = [
    { id: 'customer', title: 'Customer', icon: User },
    { id: 'venue_owner', title: 'Venue Owner', icon: MapPin },
    { id: 'vendor', title: 'Vendor', icon: Camera }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1561501878-aabd62634533?auto=format&fit=crop&q=80&w=2500" 
          alt="Event Lights" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Select your portal and sign in</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="p-3 mb-6 text-sm font-semibold bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = formData.role === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className="text-[10px] font-black uppercase tracking-wider">{r.title}</span>
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-2 py-4 mt-2 bg-gray-900 hover:bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            Sign In as {roles.find(r => r.id === formData.role)?.title}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          New to EventHub?{' '}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline transition-all">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}