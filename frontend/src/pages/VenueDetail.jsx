import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, MapPin, ArrowLeft, CheckCircle2, CalendarDays, Users } from 'lucide-react';
import { getVenueBySlug } from '../data/venues';
import { heroSrc } from '../data/images';

export default function VenueDetail() {
  const { slug } = useParams();
  const venue = getVenueBySlug(slug);

  // Land at the top of the venue instead of keeping the grid scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center max-w-md w-full">
          <h1 className="text-2xl font-black text-gray-900 mb-3">Venue not found</h1>
          <p className="text-gray-500 font-medium mb-8">The venue you are looking for is no longer listed.</p>
          <Link to="/" className="inline-block px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95">
            Back to all venues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Hero uses the venue's own photo, same treatment as the other listings */}
      <div
        className="relative pt-32 pb-40 flex items-center justify-center mb-16 shadow-sm"
        style={{
          backgroundImage: `url("${heroSrc(venue.img)}")`,
          backgroundSize: 'cover',
          backgroundPosition: venue.heroPosition || 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/40"></div>

        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            {venue.name}
          </h1>
          <p className="text-lg text-gray-100 font-medium drop-shadow-md mb-8">
            {venue.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {venue.rating}
            </div>
            <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> {venue.loc}
            </div>
            <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
              <Users className="w-3.5 h-3.5 text-gray-400" /> {venue.cap}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/" className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all venues
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* About */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">About {venue.name}</h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">{venue.about}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {venue.stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl px-5 py-4">
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spaces */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Spaces available</h2>
              <div className="flex flex-col gap-4">
                {venue.spaces.map((space) => (
                  <div key={space.name} className="bg-gray-50 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-black text-gray-900">{space.name}</span>
                    <span className="text-sm text-gray-500 font-medium">{space.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">What this venue offers</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {venue.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Photos</h2>
              <div className="grid grid-cols-2 gap-4">
                {venue.gallery.map((photo, idx) => (
                  <div key={idx} className="h-52 rounded-2xl overflow-hidden bg-gray-100 group">
                    <img
                      src={photo}
                      alt={`${venue.name} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Booking sidebar */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="mb-1">
                <span className="font-black text-gray-900 text-3xl">{venue.price}</span>
                <span className="text-gray-500 text-sm font-medium"> / day</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
                <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {venue.loc}
              </div>

              <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg w-max mb-8">
                {venue.cap}
              </div>

              <button className="w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                Check Availability
              </button>
              <button className="w-full mt-3 py-4 rounded-xl font-bold text-sm transition-all bg-gray-100 text-gray-900 hover:bg-gray-200">
                Request a Tour
              </button>

              <p className="text-xs text-gray-500 font-medium text-center mt-6">
                No payment is taken at this step.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
