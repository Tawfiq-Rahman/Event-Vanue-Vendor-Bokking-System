import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, CalendarDays, Users, Wallet, Star, MapPin } from 'lucide-react';
import Navbar from './component/Navbar';
import Login from './pages/logIn';
import Register from './pages/register';
import Vendor from './pages/Vendor';
import Packages from './pages/Packages';

function Home() {
  const featuredVenues = [
    { name: 'Grand Plaza Resort', loc: 'Downtown City Center', price: '$1,200', cap: 'Up to 500 Guests', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop' },
    { name: 'The Glass House', loc: 'Riverside District', price: '$2,500', cap: 'Up to 300 Guests', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop' },
    { name: 'Heritage Banquet', loc: 'Old Town Square', price: '$850', cap: 'Up to 200 Guests', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop' },
    { name: 'Crystal Pavilion', loc: 'Uptown Business Park', price: '$3,200', cap: 'Up to 1000 Guests', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop' },
    { name: 'Sapphire Lounge', loc: 'Westside Marina', price: '$950', cap: 'Up to 150 Guests', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop' },
    { name: 'Emerald Estate', loc: 'Outskirts Countryside', price: '$1,800', cap: 'Up to 400 Guests', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Premium CSS Background Hero Section */}
      <div className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 flex items-center justify-center shadow-lg">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1561501878-aabd62634533?auto=format&fit=crop&q=80&w=2500")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
            Find the Perfect Space <br className="hidden md:block"/> for Your <span className="text-indigo-400">Dream Event</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 drop-shadow-md font-medium">
            From majestic banquet halls to professional corporate spaces. Book venues and top-tier vendors all in one place.
          </p>

          {/* Premium Floating Search Bar */}
          <div className="bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-2 border border-white/20">
            <div className="flex-1 flex items-center px-4 py-3 md:py-2 md:border-r border-gray-100 hover:bg-gray-50 rounded-full transition-colors cursor-text">
              <CalendarDays className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Event Date</span>
                {/* Fixed the mm/dd/yyyy issue with onFocus trick */}
                <input 
                  type="text" 
                  placeholder="Select a date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
                  className="bg-transparent w-full outline-none text-sm text-gray-900 font-medium cursor-pointer" 
                />
              </div>
            </div>
            
            <div className="flex-1 flex items-center px-4 py-3 md:py-2 md:border-r border-gray-100 hover:bg-gray-50 rounded-full transition-colors cursor-text">
              <Users className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Guests</span>
                <input type="number" placeholder="Add capacity" className="bg-transparent w-full outline-none text-sm text-gray-900 font-medium" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center px-4 py-3 md:py-2 hover:bg-gray-50 rounded-full transition-colors">
              <Wallet className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Budget</span>
                <select className="bg-transparent w-full outline-none text-sm text-gray-900 font-medium appearance-none cursor-pointer">
                  <option value="">Any Budget</option>
                  <option value="low">Under $1,000</option>
                  <option value="med">$1,000 - $5,000</option>
                  <option value="high">$5,000+</option>
                </select>
              </div>
            </div>
            
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 md:py-0 md:h-14 rounded-xl md:rounded-full font-bold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center min-w-[140px]">
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Featured Venues</h2>
            <p className="text-gray-500 mt-2 text-lg">Highly rated spaces for your next gathering.</p>
          </div>
          <Link to="/venues" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors flex items-center">
            Explore all spaces <span className="ml-2">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map((venue, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-black text-xl text-gray-900">{venue.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-2 mb-6">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {venue.loc}
                </div>
                <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="font-black text-gray-900 text-xl">{venue.price}</span>
                    <span className="text-gray-500 text-sm font-medium"> / day</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">
                    {venue.cap}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vendors" element={<Vendor />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
      </div>
    </Router>
  );
}