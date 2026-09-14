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

const CATEGORIES: { id: BookCategory; label: string; seal: string; pinyin: string }[] = [
  { id: 'tutti', label: 'Tutti gli Scaffali', seal: '全', pinyin: 'Quán' },
  { id: 'fiabe', label: 'Fiabe & Favole', seal: '童', pinyin: 'Tóng' },
  { id: 'classici', label: 'I Grandi Classici', seal: '經', pinyin: 'Jīng' },
  { id: 'filosofia', label: 'Filosofia & Maestri', seal: '子', pinyin: 'Zǐ' },
  { id: 'strategia', label: 'Arte Militare', seal: '武', pinyin: 'Wǔ' },
  { id: 'letteratura', label: 'Lirica & Poesia', seal: '集', pinyin: 'Jí' },
  { id: 'storia', label: 'Cronache Storiche', seal: '史', pinyin: 'Shǐ' },
];

export const CalligraphyNav: React.FC<CalligraphyNavProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-4 border-b border-[#3d2716]">
        {/* CATEGORY SELECTORS: Like wooden shelf markers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full w-full lg:w-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`nav-shelf-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xs transition-all cursor-pointer shrink-0 border text-sm font-serif ${
                  isActive
                    ? 'bg-[#801414] text-[#fff6e6] border-[#a62b2b] shadow-md font-semibold'
                    : 'bg-[#1a1009] hover:bg-[#2e1c10] text-[#c9b79f] border-[#382212] hover:border-[#54341c]'
                }`}
              >
                {/* Chinese Seal Character */}
                <span
                  className={`w-5 h-5 rounded-xs flex items-center justify-center font-calligraphy text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#fff5e0] text-[#801414]'
                      : 'bg-[#29170c] text-[#d4af37] group-hover:bg-[#382011]'
                  }`}
                >
                  {cat.seal}
                </span>

                <span className="font-cinzel text-xs font-bold tracking-wide whitespace-nowrap">
                  {cat.label}
                </span>

                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : 'bg-[#26150b] text-[#99826a]'
                  }`}
                >
                  {counts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7259]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cerca opera o autore..."
            className="w-full pl-10 pr-9 py-2 bg-[#170e08] text-[#f2e7d0] placeholder-[#7d6750] border border-[#3d2716] focus:border-[#c99732] focus:outline-none rounded-xs font-serif text-sm transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d6750] hover:text-[#f2e7d0] cursor-pointer"
              title="Azzera"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
