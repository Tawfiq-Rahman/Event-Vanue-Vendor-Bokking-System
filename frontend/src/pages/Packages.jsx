import { CheckCircle2, Crown } from 'lucide-react';

export default function Packages() {
  const packages = [
    {
      name: 'Silver Bundle',
      price: '$2,500',
      desc: 'Perfect for small gatherings and corporate seminars.',
      features: ['Venue access for 6 hours', 'Basic audio/visual equipment', 'Standard catering (50 guests)', 'Dedicated event manager'],
      color: 'bg-white',
      border: 'border-transparent',
      btn: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      textColor: 'text-gray-900',
      descColor: 'text-gray-500'
    },
    {
      name: 'Gold Wedding',
      price: '$5,800',
      desc: 'The ultimate all-inclusive wedding experience.',
      features: ['Full day venue access (12 hrs)', 'Premium decor & floral setup', 'Gourmet catering (150 guests)', 'Professional photography suite', 'Bridal suite access'],
      color: 'bg-indigo-900',
      border: 'border-indigo-400/30 ring-8 ring-indigo-900/20 border-2',
      btn: 'bg-white text-indigo-900 hover:bg-gray-50',
      textColor: 'text-white',
      descColor: 'text-indigo-200',
      popular: true
    },
    {
      name: 'Platinum Corporate',
      price: '$8,200',
      desc: 'High-end setup for major corporate galas and launches.',
      features: ['Multi-hall access', 'Advanced stage & lighting tech', 'Executive catering (300 guests)', 'Valet parking service', 'Custom branding setup'],
      color: 'bg-white',
      border: 'border-transparent',
      btn: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      textColor: 'text-gray-900',
      descColor: 'text-gray-500'
    }
  ];

  return (
    <div className="min-h-screen relative py-20 flex items-center">
      
      {/* Fixed Dark Elegant Background */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            All-Inclusive <span className="text-indigo-400">Packages</span>
          </h1>
          <p className="text-lg text-gray-300 font-medium drop-shadow-md">
            Save time and money by booking a venue combined with our top-rated vendor services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`relative rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 ${pkg.color} ${pkg.border}`}>
              
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center shadow-lg">
                  <Crown className="w-4 h-4 mr-1.5" /> Most Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-black mb-2 ${pkg.textColor}`}>{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.descColor}`}>{pkg.desc}</p>
              
              <div className={`text-4xl font-black mb-8 ${pkg.textColor}`}>
                {pkg.price} <span className={`text-lg font-medium ${pkg.popular ? 'text-indigo-300' : 'text-gray-400'}`}>/ event</span>
              </div>
              
              <ul className="space-y-4 mb-8 min-h-[220px]">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 ${pkg.popular ? 'text-indigo-300' : 'text-indigo-600'}`} />
                    <span className={`text-sm font-semibold ${pkg.popular ? 'text-indigo-50' : 'text-gray-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md ${pkg.btn}`}>
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}