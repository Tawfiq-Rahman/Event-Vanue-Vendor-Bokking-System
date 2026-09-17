import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowLeft } from 'lucide-react';

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/venues/public');
        const data = await res.json();
        setVenues(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch venues:", err);
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Explore All Spaces</h1>
          <p className="text-xl text-gray-500">Discover the perfect venue for your next unforgettable event.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => {
              const slug = venue.title.toLowerCase().replace(/ /g, '-');
              return (
                <Link to={`/venues/${slug}`} key={venue.id || slug} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img src={venue.image_url} alt={venue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-black text-xl text-gray-900">{venue.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-2 mb-6">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {venue.location}
                    </div>
                    <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <span className="font-black text-gray-900 text-xl">${venue.price_per_day}</span>
                        <span className="text-gray-500 text-sm font-medium"> / day</span>
                      </div>
                      <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">
                        Up to {venue.capacity}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
