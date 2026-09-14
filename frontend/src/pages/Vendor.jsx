import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { vendors } from '../data/vendors';

export default function Vendor() {
  // Added state to track which category is currently clicked
  const [activeCategory, setActiveCategory] = useState('All Vendors');

  // Logic to filter the vendors based on the clicked button
  const filteredVendors = activeCategory === 'All Vendors' 
    ? vendors 
    : vendors.filter(vendor => vendor.type === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Bulletproof CSS Background Hero Section */}
      <div 
        className="relative pt-32 pb-40 flex items-center justify-center mb-16 shadow-sm"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/40"></div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            Top-Tier Event Vendors
          </h1>
          <p className="text-lg text-gray-100 font-medium drop-shadow-md">
            Browse verified photographers, caterers, and decorators to make your event truly unforgettable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Functional Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All Vendors', 'Photography', 'Catering', 'Decoration'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vendor Grid rendering the filtered list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredVendors.map((vendor) => {
            const Icon = vendor.icon;
            return (
              <Link to={`/vendors/${vendor.slug}`} key={vendor.slug} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="h-52 overflow-hidden relative bg-gray-100">
                  <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {vendor.rating}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 bg-indigo-50 w-max px-2.5 py-1 rounded-md">
                    <Icon className="w-3.5 h-3.5" /> {vendor.type}
                  </div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">{vendor.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> Available Nationwide
                  </div>
                  <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-black text-gray-900 text-lg">{vendor.price}</span>
                    <span className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Profile &rarr;</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Fallback if a category is empty (though ours are full) */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium">
            No vendors found for this category.
          </div>
        )}

      </div>
    </div>
  );
}