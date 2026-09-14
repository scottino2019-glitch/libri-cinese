import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { Book } from '../types';

interface RealBookItemProps {
  book: Book;
  onOpenBook: (book: Book) => void;
}

export const RealBookItem: React.FC<RealBookItemProps> = ({ book, onOpenBook }) => {
  const { theme } = book;

  return (
    <div className="flex flex-col items-center group relative cursor-pointer" onClick={() => onOpenBook(book)}>
      {/* 1. THE TRADITIONAL STITCH-BOUND CHINESE BOOK VOLUME */}
      <div
        id={`book-volume-${book.id}`}
        className="xianzhuang-book relative w-full aspect-[3/4.4] max-w-[280px] p-4 flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: theme.primary,
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)
          `,
        }}
      >
        {/* Fine Silk Binding Spine on Left with 4 Imperial Stitches (四針眼裝) */}
        <div className="silk-binding-spine flex flex-col justify-around py-4">
          <div className="stitch-hole"></div>
          <div className="stitch-hole"></div>
          <div className="stitch-hole"></div>
          <div className="stitch-hole"></div>
        </div>

        {/* Top Right: Imperial Category Stamp Ribbon */}
        <div className="self-end z-10">
          <div className="px-2.5 py-0.5 rounded-xs bg-black/40 border border-white/20 text-[#fcedb3] text-[11px] font-serif tracking-wider shadow-sm flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#fcedb3]"></span>
            {book.categoryName}
          </div>
        </div>

        {/* PROMINENT TRADITIONAL CALLIGRAPHIC TITLE SLIP (題簽 Tíqiān) */}
        <div className="ml-7 self-start tiqian-paper px-3 py-4 rounded-xs flex flex-col items-center shadow-xl z-10 group-hover:scale-105 transition-transform duration-300">
          {/* Large, Beautiful Chinese Characters */}
          <div className="font-calligraphy text-3xl sm:text-4xl text-[#120f0c] font-black vertical-chinese my-1 leading-tight select-none">
            {book.chineseTitle}
          </div>

          {/* Authentic Vermilion Seal */}
          <div className="cinnabar-seal-stamp w-6 h-6 rounded-xs flex items-center justify-center font-calligraphy text-sm font-bold shadow-xs mt-2">
            {book.sealCharacter}
          </div>

          {book.pinyin && (
            <span className="text-[9px] font-sans font-bold text-[#6b583f] uppercase mt-1 tracking-wider">
              {book.pinyin}
            </span>
          )}
        </div>

        {/* Bottom Details on Book Cover */}
        <div className="ml-7 z-10 text-[#f5ebd9] mt-auto pt-2 border-t border-white/10">
          <div className="text-xs font-serif font-bold text-[#fcedb3] truncate">
            {book.author} {book.authorChinese && `(${book.authorChinese})`}
          </div>
          <div className="text-[11px] font-serif text-white/70">
            {book.dynastyOrPeriod}
          </div>
        </div>

        {/* Hover Cue: "Sfoglia" */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center z-20">
          <div className="w-10 h-10 rounded-full bg-[#991b1b] text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-cinzel text-sm font-bold text-white tracking-wider">
            Apri e Consulta
          </span>
          <span className="text-xs font-serif text-[#fcedb3] line-clamp-2 px-2">
            {book.title}
          </span>
        </div>
      </div>

      {/* 2. ELEGANT CALLIGRAPHIC LABEL PLATE BELOW BOOK (Like an antique library stand) */}
      <div className="mt-3 text-center w-full px-2">
        <h3 className="font-cinzel text-base font-bold text-[#f2e7d0] group-hover:text-[#e0a84a] transition-colors leading-tight">
          {book.title}
        </h3>
        <p className="text-xs font-serif text-[#b8a68e] mt-0.5 line-clamp-1">
          {book.author} • <span className="text-[#d4af37]">{book.chineseTitle}</span>
        </p>
      </div>
    </div>
  );
};
