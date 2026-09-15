import React from 'react';
import { Search, X } from 'lucide-react';
import { BookCategory } from '../types';

interface CalligraphyNavProps {
  currentCategory: BookCategory;
  onSelectCategory: (category: BookCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: Record<BookCategory, number>;
}

const CATEGORIES: { id: BookCategory; label: string; seal: string }[] = [
  { id: 'tutti', label: 'Tutti', seal: '全' },
  { id: 'fiabe', label: 'Fiabe', seal: '童' },
  { id: 'classici', label: 'Classici', seal: '經' },
  { id: 'filosofia', label: 'Filosofia', seal: '子' },
  { id: 'strategia', label: 'Strategia', seal: '武' },
  { id: 'letteratura', label: 'Letteratura', seal: '集' },
  { id: 'storia', label: 'Storia', seal: '史' },
];

export const CalligraphyNav: React.FC<CalligraphyNavProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="w-full mb-8 pt-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#3d2716]">
        {/* CATEGORIE PULITE IN STILE LISTELLI D'ARCHIVIO */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full w-full sm:w-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`nav-shelf-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-sm transition-all cursor-pointer shrink-0 border text-base font-italian-body ${
                  isActive
                    ? 'bg-[#801414] text-[#fff6e6] border-[#b02323] shadow-md font-semibold'
                    : 'bg-[#1a1009] hover:bg-[#2e1c10] text-[#cfbeaa] border-[#382212] hover:border-[#54341c]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-xs flex items-center justify-center font-calligraphy text-xs font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'text-[#d4af37]'
                  }`}
                >
                  {cat.seal}
                </span>
                <span className="tracking-wide whitespace-nowrap">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* CAMPO DI RICERCA MINIMAL ED ELEGANTE */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7259]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cerca un libro..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#170e08] text-[#f2e7d0] placeholder-[#7d6750] border border-[#3d2716] focus:border-[#c99732] focus:outline-none rounded-sm font-italian-body text-base transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7d6750] hover:text-[#f2e7d0] cursor-pointer"
              title="Azzera"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
