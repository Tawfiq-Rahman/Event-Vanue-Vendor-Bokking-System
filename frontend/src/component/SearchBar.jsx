import { Search, X } from 'lucide-react';

// Search bar for the public Venues / Vendors pages. Results filter as you type;
// the Search button (or Enter) just confirms and closes the mobile keyboard.
export default function SearchBar({ value, onChange, placeholder }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.querySelector('input').blur();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-2xl md:rounded-full shadow-sm border border-gray-200 max-w-2xl mx-auto flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all"
    >
      <Search className="w-5 h-5 text-indigo-500 ml-3 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 min-w-0 bg-transparent py-2.5 text-sm font-medium text-gray-900 placeholder-gray-400 outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg transition-colors"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 sm:px-6 py-3 rounded-xl md:rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center shrink-0"
      >
        <Search className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
