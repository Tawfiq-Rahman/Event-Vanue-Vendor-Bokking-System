import { useState } from 'react';
import { Camera, Utensils, Palette, Star, MapPin } from 'lucide-react';

export default function Vendor() {
  // Added state to track which category is currently clicked
  const [activeCategory, setActiveCategory] = useState('All Vendors');

  const vendors = [
    // 4 Catering
    { name: 'Gourmet Delights', type: 'Catering', icon: Utensils, rating: 4.9, price: 'From $25/plate', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop' },
    { name: 'Urban Feast', type: 'Catering', icon: Utensils, rating: 4.7, price: 'From $18/plate', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop' },
    { name: 'Savory & Sweet', type: 'Catering', icon: Utensils, rating: 4.8, price: 'From $30/plate', img: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=800&auto=format&fit=crop' },
    { name: 'Global Bites', type: 'Catering', icon: Utensils, rating: 4.9, price: 'From $22/plate', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop' },
    
    // 4 Photography
    { name: 'Lens & Light Pro', type: 'Photography', icon: Camera, rating: 4.8, price: 'From $500/day', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cinematic Memories', type: 'Photography', icon: Camera, rating: 4.9, price: 'From $600/day', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop' },
    { name: 'Aperture Studios', type: 'Photography', icon: Camera, rating: 4.6, price: 'From $450/day', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
    { name: 'Candid Moments', type: 'Photography', icon: Camera, rating: 4.8, price: 'From $550/day', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop' },
    
    // 4 Decoration
    { name: 'Elegant Blooms', type: 'Decoration', icon: Palette, rating: 5.0, price: 'From $800/event', img: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop' },
    { name: 'Luxe Aesthetics', type: 'Decoration', icon: Palette, rating: 4.7, price: 'From $1,200/event', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop' },
    { name: 'Floral Symphonies', type: 'Decoration', icon: Palette, rating: 5.0, price: 'From $950/event', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop' },
    { name: 'Vintage Charm', type: 'Decoration', icon: Palette, rating: 4.7, price: 'From $700/event', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop' },
  ];

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
          {filteredVendors.map((vendor, index) => {
            const Icon = vendor.icon;
            return (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col">
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
                    <button className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Profile &rarr;</button>
                  </div>
                </div>
              </div>
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