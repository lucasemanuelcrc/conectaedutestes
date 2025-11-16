// components/dashboard/SearchBar.tsx
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Procurar..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </div>
    </div>
  );
}