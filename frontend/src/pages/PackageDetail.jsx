import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Crown, ArrowLeft, Sparkles } from 'lucide-react';
import { getPackageBySlug } from '../data/packages';

export default function PackageDetail() {
  const { slug } = useParams();
  const pkg = getPackageBySlug(slug);

  // Land at the top of the package instead of keeping the grid scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Same fixed elegant background the packages listing uses
  const background = (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2500")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm"></div>
    </div>
  );

  if (!pkg) {
    return (
      <div className="min-h-screen relative py-20 flex items-center">
        {background}
        <div className="relative z-10 max-w-md mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <h1 className="text-2xl font-black text-gray-900 mb-3">Package not found</h1>
            <p className="text-gray-500 font-medium mb-8">The package you are looking for is no longer offered.</p>
            <Link to="/packages" className="inline-block px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95">
              Back to all packages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-20">
      {background}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <Link to="/packages" className="inline-flex items-center text-sm font-bold text-gray-300 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all packages
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {pkg.popular && (
            <div className="inline-flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg mb-6">
              <Crown className="w-4 h-4 mr-1.5" /> Most Popular
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            {pkg.name}
          </h1>
          <p className="text-lg text-gray-300 font-medium drop-shadow-md">
            {pkg.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* About */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">About this package</h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">{pkg.about}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {pkg.stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl px-5 py-4">
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Everything included */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Everything included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Ideal for</h3>
                <div className="flex flex-wrap gap-2">
                  {pkg.idealFor.map((use) => (
                    <span key={use} className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional add-ons */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Optional add-ons</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.addOns.map((addOn) => (
                  <li key={addOn} className="flex items-start">
                    <Sparkles className="w-5 h-5 mr-3 shrink-0 text-amber-500" />
                    <span className="text-sm font-semibold text-gray-700">{addOn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">From past events</h2>
              <div className="grid grid-cols-2 gap-4">
                {pkg.gallery.map((photo, idx) => (
                  <div key={idx} className="h-52 rounded-2xl overflow-hidden bg-gray-100 group">
                    <img
                      src={photo}
                      alt={`${pkg.name} event ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing sidebar keeps this package's own colour scheme */}
          <div className="lg:sticky lg:top-24">
            <div className={`relative rounded-3xl p-8 shadow-2xl ${pkg.color} ${pkg.border}`}>
              <h3 className={`text-2xl font-black mb-2 ${pkg.textColor}`}>{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.descColor}`}>{pkg.desc}</p>

              <div className={`text-4xl font-black mb-8 ${pkg.textColor}`}>
                {pkg.price} <span className={`text-lg font-medium ${pkg.popular ? 'text-indigo-300' : 'text-gray-400'}`}>/ event</span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 ${pkg.popular ? 'text-indigo-300' : 'text-indigo-600'}`} />
                    <span className={`text-sm font-semibold ${pkg.popular ? 'text-indigo-50' : 'text-gray-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md ${pkg.btn}`}>
                Select Package
              </button>

              <p className={`text-xs font-medium text-center mt-6 ${pkg.descColor}`}>
                No payment is taken at this step.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
