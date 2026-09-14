import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, MapPin, ArrowLeft, CheckCircle2, CalendarDays } from 'lucide-react';
import { getVendorBySlug } from '../data/vendors';
import { heroSrc } from '../data/images';

export default function VendorDetail() {
  const { slug } = useParams();
  const vendor = getVendorBySlug(slug);

  // Land at the top of the profile instead of keeping the grid scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center max-w-md w-full">
          <h1 className="text-2xl font-black text-gray-900 mb-3">Vendor not found</h1>
          <p className="text-gray-500 font-medium mb-8">The vendor you are looking for is no longer listed.</p>
          <Link to="/vendors" className="inline-block px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95">
            Back to all vendors
          </Link>
        </div>
      </div>
    );
  }

  const Icon = vendor.icon;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Hero uses the vendor's own photo, same treatment as the vendor listing */}
      <div
        className="relative pt-32 pb-40 flex items-center justify-center mb-16 shadow-sm"
        style={{
          backgroundImage: `url("${heroSrc(vendor.img)}")`,
          backgroundSize: 'cover',
          backgroundPosition: vendor.heroPosition || 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/40"></div>

        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest mb-4 bg-indigo-600 px-2.5 py-1 rounded-md shadow-sm">
            <Icon className="w-3.5 h-3.5" /> {vendor.type}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            {vendor.name}
          </h1>
          <p className="text-lg text-gray-100 font-medium drop-shadow-md mb-8">
            {vendor.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {vendor.rating}
            </div>
            <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> Available Nationwide
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/vendors" className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all vendors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* About */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">About {vendor.name}</h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">{vendor.about}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {vendor.stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl px-5 py-4">
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">What is included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendor.services.map((service) => (
                  <li key={service} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Recent work</h2>
              <div className="grid grid-cols-2 gap-4">
                {vendor.gallery.map((photo, idx) => (
                  <div key={idx} className="h-52 rounded-2xl overflow-hidden bg-gray-100 group">
                    <img
                      src={photo}
                      alt={`${vendor.name} work ${idx + 1}`}
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
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 bg-indigo-50 w-max px-2.5 py-1 rounded-md">
                <Icon className="w-3.5 h-3.5" /> {vendor.type}
              </div>

              <div className="text-3xl font-black text-gray-900 mb-1">{vendor.price}</div>
              <div className="flex items-center text-gray-500 text-sm mb-8 font-medium">
                <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" /> {vendor.rating} rating
              </div>

              <button className="w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                Check Availability
              </button>
              <button className="w-full mt-3 py-4 rounded-xl font-bold text-sm transition-all bg-gray-100 text-gray-900 hover:bg-gray-200">
                Request a Quote
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
