import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Camera } from 'lucide-react';

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB, same limit as the backend
const fileInputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none cursor-pointer file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-xs file:font-bold file:cursor-pointer hover:file:bg-indigo-100";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
    government_id: '',
    business_license_id: ''
  });
  const [files, setFiles] = useState({
    profile_picture: null,
    government_id_document: null,
    business_license_document: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const isBusinessRole = formData.role === 'vendor' || formData.role === 'venue_owner';

  const handleFileChange = (e) => {
    const { name, files: selected } = e.target;
    const file = selected[0] || null;
    if (file && file.size > MAX_UPLOAD_SIZE) {
      setError('Each uploaded file must be 5 MB or smaller.');
      e.target.value = '';
      setFiles({ ...files, [name]: null });
      return;
    }
    setError('');
    setFiles({ ...files, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Send as multipart so the profile picture and ID documents can be uploaded
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    if (files.profile_picture) payload.append('profile_picture', files.profile_picture);
    if (files.government_id_document) payload.append('government_id_document', files.government_id_document);
    if (isBusinessRole && files.business_license_document) payload.append('business_license_document', files.business_license_document);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: payload
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess('Registration submitted! Please wait for Admin approval.');
      setTimeout(() => navigate('/login'), 2500); // Redirect everyone after showing message
    } catch (err) {
      setError(err.message);
    }
  };

  const roles = [
    { id: 'customer', title: 'Customer', icon: User, desc: 'Book venues & vendors' },
    { id: 'venue_owner', title: 'Venue Owner', icon: MapPin, desc: 'List your spaces' },
    { id: 'vendor', title: 'Vendor', icon: Camera, desc: 'Offer your services' }
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      
      {/* Left Side - Original Background Image with Blur */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2500" 
          alt="Luxury Event Venue" 
          /* The blur and scale are applied here to your original image */
          className="absolute inset-0 w-full h-full object-cover blur-[3px] scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/70 z-10" />
        
        <div className="relative z-20 text-white p-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 drop-shadow-xl tracking-tight">Elevate Every Event</h2>
          <p className="text-lg font-medium text-gray-200 drop-shadow-md max-w-md mx-auto">
            Join our platform to book stunning venues, hire top-tier vendors, and manage your events seamlessly.
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2 font-medium">Choose your account type to get started</p>
          </div>

          {error && <div className="p-3 mb-4 text-sm font-semibold bg-red-50 text-red-600 rounded-lg border border-red-100">{error}</div>}
          {success && <div className="p-3 mb-4 text-sm font-semibold bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="e.g. John Doe"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="name@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {(formData.role === 'vendor' || formData.role === 'venue_owner') && (
                <>

                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Business License ID</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                      placeholder="Enter License ID"
                      onChange={(e) => setFormData({ ...formData, business_license_id: e.target.value })}
                    />
                  </div>
                </>
              )}

              {isBusinessRole && (
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Business License</label>
                  <input
                    type="file"
                    name="business_license_document"
                    required
                    accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                    className={fileInputClass}
                    onChange={handleFileChange}
                  />
                  <p className="text-[11px] text-gray-400 font-medium mt-1 ml-1">Image or PDF, max 5 MB</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              Sign Up as {roles.find(r => r.id === formData.role)?.title}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}