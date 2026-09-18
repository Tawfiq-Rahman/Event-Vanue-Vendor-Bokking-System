const fs = require('fs');

let code = fs.readFileSync('src/pages/VendorDashboard.jsx', 'utf8');

// 1. Rename 'portfolio' state to 'myVendors' and 'isPortfolioSetup' to 'vendorView'
code = code.replace(
  "const [portfolio, setPortfolio] = useState({ title: '', service_type: 'catering', portfolio_description: '', starting_rate: '', location: '', image_url: '', image_file: null });",
  "const [myVendors, setMyVendors] = useState([]);\n  const [vendorForm, setVendorForm] = useState({ title: '', service_type: 'catering', portfolio_description: '', starting_rate: '', location: '', image_url: '', image_file: null });"
);

code = code.replace(
  "const [isPortfolioSetup, setIsPortfolioSetup] = useState(false);",
  "const [vendorView, setVendorView] = useState('list');"
);

code = code.replace(
  "const [portfolioView, setPortfolioView] = useState('list');",
  ""
);

// 2. Fetch logic changes
const fetchRegex = /\/\/ Fetch Portfolio[\s\S]*?\} catch \(err\) \{/m;

const newFetchLogic = `// Fetch Vendors
        const vendorsResponse = await fetch('http://localhost:5000/api/vendor/vendors', { headers });
        if (vendorsResponse.ok) {
          const vendorsData = await vendorsResponse.json();
          setMyVendors(vendorsData);
        }
      } catch (err) {`;

code = code.replace(fetchRegex, newFetchLogic);

// 3. Save logic changes
const saveRegex = /const handleSavePortfolio = async \(e\) => \{[\s\S]*?\}\s*\};/m;

const newSaveLogic = `const handleSaveVendor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', vendorForm.title || '');
      formData.append('service_type', vendorForm.service_type);
      formData.append('starting_rate', vendorForm.starting_rate);
      formData.append('portfolio_description', vendorForm.portfolio_description);
      formData.append('location', vendorForm.location || 'Available Nationwide');
      if (vendorForm.image_url) formData.append('image_url', vendorForm.image_url);
      if (vendorForm.image_file) formData.append('image_file', vendorForm.image_file);

      const response = await fetch('http://localhost:5000/api/vendor/vendors', {
        method: 'POST',
        headers: { 
          'Authorization': \`Bearer \${localStorage.getItem('token')}\` 
        },
        body: formData
      });
      
      if (response.ok) {
        alert('Vendor profile created successfully!');
        window.location.reload();
      } else {
        alert('Failed to create vendor profile');
      }
    } catch (error) {
      console.error("Error creating vendor:", error);
      alert('Network error while creating vendor.');
    }
  };

  const handleRemoveVendor = async (id) => {
    if (!window.confirm('Are you sure you want to unclaim/remove this vendor profile?')) return;
    
    try {
      const response = await fetch(\`http://localhost:5000/api/vendor/vendors/\${id}/unclaim\`, {
        method: 'PUT',
        headers: { 'Authorization': \`Bearer \${localStorage.getItem('token')}\` }
      });
      if (response.ok) {
        alert('Vendor profile removed successfully!');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to remove vendor');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };`;

code = code.replace(saveRegex, newSaveLogic);

// Remove the old handleUnclaimVendor if it's there
const unclaimRegex = /const handleUnclaimVendor = async \(\) => \{[\s\S]*?catch \(error\) \{[\s\S]*?alert\('Network error.'\);\s*\}\s*\};/m;
code = code.replace(unclaimRegex, "");

// 4. Update UI block for Portfolio tab
const uiStartIndex = code.indexOf("{activeTab === 'portfolio' && (");
const uiEndIndex = code.indexOf("{activeTab === 'messages' && (");

const newUI = `{activeTab === 'portfolio' && (
          <div className="space-y-8">
            
            {vendorView === 'list' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white drop-shadow-md">Your Vendors ({myVendors.length})</h3>
                  <button 
                    onClick={() => setVendorView('claim')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    Add Vendor
                  </button>
                </div>
                
                {myVendors.length === 0 ? (
                  <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-12 text-center">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No vendors added yet</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first vendor profile.</p>
                    <button 
                      onClick={() => setVendorView('claim')}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-indigo-700"
                    >
                      Add Vendor Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myVendors.map(v => (
                      <div key={v.id} className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl overflow-hidden group hover:shadow-indigo-900/20 transition-all">
                        <div className="h-48 relative overflow-hidden">
                          <img src={v.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-black text-indigo-700 text-sm shadow-md uppercase">
                            {v.service_type}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-black text-gray-900 mb-2">{v.title}</h3>
                          <p className="text-gray-500 text-sm mb-4">Location: {v.location}</p>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{v.portfolio_description}</p>
                          <p className="font-bold text-gray-900 mb-6">Starting at \${v.starting_rate}</p>
                          <button 
                            onClick={() => handleRemoveVendor(v.id)}
                            className="w-full py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-sm font-bold transition-colors border border-red-100"
                          >
                            Remove Vendor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {vendorView === 'claim' && (
              <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setVendorView('list')} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                      <XCircle className="w-6 h-6"/>
                    </button>
                    <h3 className="text-2xl font-black text-gray-900">Available Vendors to Claim</h3>
                  </div>
                  <button 
                    onClick={() => setVendorView('create')}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-indigo-200"
                  >
                    Customize New
                  </button>
                </div>

                {unassignedVendors.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold mb-4">No pre-existing vendors left to claim.</p>
                    <button 
                      onClick={() => setVendorView('create')}
                      className="text-indigo-600 hover:text-indigo-700 font-bold underline"
                    >
                      Create your own custom vendor instead
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unassignedVendors.map(v => (
                      <div key={v.id} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col group">
                        <div className="h-40 relative overflow-hidden">
                          <img src={v.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="font-black text-gray-900 mb-1">{v.title}</h4>
                          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">{v.service_type}</p>
                          <button 
                            onClick={() => handleClaimVendor(v.id)} 
                            className="mt-auto w-full bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all"
                          >
                            Claim Vendor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {vendorView === 'create' && (
              <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setVendorView('claim')} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                      <XCircle className="w-6 h-6"/>
                    </button>
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-2"><Edit3 className="w-5 h-5 text-indigo-600"/> Create Custom Vendor</h3>
                  </div>
                </div>
                
                <form onSubmit={handleSaveVendor} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vendor Name / Title</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={vendorForm.title || ''} 
                        onChange={e => setVendorForm({...vendorForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Available Nationwide"
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={vendorForm.location || ''} 
                        onChange={e => setVendorForm({...vendorForm, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Service Type</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium appearance-none cursor-pointer"
                        value={vendorForm.service_type}
                        onChange={(e) => setVendorForm({...vendorForm, service_type: e.target.value})}
                      >
                        <option value="catering">Catering</option>
                        <option value="decoration">Decoration</option>
                        <option value="photography">Photography</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Starting Package Rate ($)</label>
                      <input 
                        type="number" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                        value={vendorForm.starting_rate} 
                        onChange={e => setVendorForm({...vendorForm, starting_rate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Upload Image from Desktop</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 mb-4" 
                      onChange={e => setVendorForm({...vendorForm, image_file: e.target.files[0]})}
                    />
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">OR Cover Image URL (Unsplash)</label>
                    <input 
                      type="url" 
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium" 
                      value={vendorForm.image_url} 
                      onChange={e => setVendorForm({...vendorForm, image_url: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Portfolio Description & Packages</label>
                    <textarea 
                      rows="6"
                      required
                      placeholder="Describe your services, experience, and the packages you offer..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-900 font-medium resize-none leading-relaxed" 
                      value={vendorForm.portfolio_description}
                      onChange={e => setVendorForm({...vendorForm, portfolio_description: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all w-full mt-6 flex items-center justify-center text-lg"
                  >
                    Save Custom Vendor
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        `;

code = code.substring(0, uiStartIndex) + newUI + code.substring(uiEndIndex);

// Also need to remove the "Set up your portfolio" banner
code = code.replace(
  /\{\!isPortfolioSetup && activeTab \!\=\= 'portfolio' && \([\s\S]*?\)\}/,
  `{myVendors.length === 0 && activeTab !== 'portfolio' && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-lg mb-8 flex items-start gap-4">
            <Settings className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-800 font-bold">Complete Your Portfolio</h3>
              <p className="text-amber-700 text-sm mt-1">You need to add at least one vendor profile before customers can send you requests. Go to the Portfolio tab to get started.</p>
              <button onClick={() => setActiveTab('portfolio')} className="mt-3 text-sm font-bold text-amber-600 hover:text-amber-800 underline">Set up now &rarr;</button>
            </div>
          </div>
        )}`
);

fs.writeFileSync('src/pages/VendorDashboard.jsx', code);
console.log('Update complete!');
