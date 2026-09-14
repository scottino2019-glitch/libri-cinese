import React from 'react';
import { BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onOpenBook: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onOpenBook }) => {
  const { theme } = book;

  return (
    <div
      id={`book-card-${book.id}`}
      className="group flex flex-col bg-white rounded-lg border border-[#e5dfd3] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
    >
      {/* 1. VISUAL 3D BOOK COVER SECTION */}
      <div
        className="relative h-72 sm:h-80 w-full overflow-hidden flex items-center justify-center p-6 select-none"
        style={{
          backgroundColor: theme.primary,
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 60%),
            linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)
          `,
        }}
      >
        {/* Book Spine 3D Effect on Left Margin */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-black/25 flex items-center justify-center border-r border-white/10">
          <div className="w-[2px] h-full bg-white/20"></div>
        </div>

        {/* Decorative Gold Border on Book Cover */}
        <div className="absolute inset-4 border border-[#d4af37]/40 rounded-xs pointer-events-none"></div>

        {/* Category Badge Floating Top Right */}
        <div className="absolute top-5 right-5 z-10">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-[#fff8ea] border border-white/20 rounded-full text-xs font-serif tracking-wider uppercase shadow-sm">
            {book.categoryName}
          </span>
        </div>

        {/* Historical Period Floating Bottom Right */}
        <div className="absolute bottom-5 right-5 z-10 text-right">
          <span className="text-xs font-serif font-medium text-[#fcedb3] drop-shadow-sm block">
            {book.dynastyOrPeriod}
          </span>
          {book.yearBceCe && (
            <span className="text-[11px] font-sans text-white/80 block">
              {book.yearBceCe}
            </span>
          )}
        </div>

        {/* AUTHENTIC TRADITIONAL CALLIGRAPHIC TITLE SLIP (題簽 Tíqiān) */}
        <div className="relative title-strip-paper px-4 py-5 rounded-xs flex flex-col items-center justify-between min-h-[200px] shadow-2xl transition-transform duration-300 group-hover:scale-105 z-10">
          {/* Top Decorative Knot Accent */}
          <div className="w-4 h-1 bg-[#b59e75] rounded-full mb-1"></div>

          {/* LARGE, CRISP CHINESE CALLIGRAPHY TITLE */}
          <div className="font-calligraphy text-4xl sm:text-5xl text-[#141210] font-black vertical-text my-2 leading-tight select-none">
            {book.chineseTitle}
          </div>

          {/* Vermilion Seal Stamp */}
          <div
            className="imperial-seal w-7 h-7 rounded-xs flex items-center justify-center font-calligraphy text-base font-bold shadow-xs mt-1"
            title={`Sigillo: ${book.sealCharacter}`}
          >
            {book.sealCharacter}
          </div>

          {/* Pinyin Transcription */}
          {book.pinyin && (
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#73634e] uppercase mt-2">
              {book.pinyin}
            </span>
          )}
        </div>
      </div>

      {/* 2. EDITORIAL BOOK INFORMATION BODY */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Main Book Title in Large, Clear Serif */}
          <h3 className="font-cinzel text-2xl font-bold text-[#1a1714] group-hover:text-[#991b1b] transition-colors leading-snug mb-2">
            {book.title}
          </h3>

          {/* Author Info with Chinese Characters */}
          <div className="flex items-center gap-2 font-serif text-base font-semibold text-[#4a3f33] pb-3 mb-4 border-b border-[#ebdccb]">
            <span>{book.author}</span>
            {book.authorChinese && (
              <span className="font-calligraphy text-xl text-[#991b1b] font-bold">
                • {book.authorChinese}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-serif text-[15px] text-[#3d3328] leading-relaxed mb-5">
            {book.description}
          </p>

          {/* Famous Excerpt in Calligraphy */}
          {book.scrollPreviewExcerpt && (
            <div className="mb-5 p-3.5 bg-[#faf7f0] rounded border-l-4 border-[#991b1b] text-[#241f19]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#991b1b] block mb-1">
                Passo Celebre dell'Opera
              </span>
              <p className="font-calligraphy text-xl text-[#1a1612] leading-relaxed">
                「{book.scrollPreviewExcerpt}」
              </p>
            </div>
          )}

          {/* Core Themes Tags */}
          {book.highlights && book.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {book.highlights.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs font-serif bg-[#f5f1e8] text-[#4d4031] px-2.5 py-1 rounded border border-[#dfd6c5]"
                >
                  ✦ {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. CARD ACTION BAR (No Paths, Pure Reading Action) */}
        <div className="pt-4 border-t border-[#f0e9dc] flex items-center justify-between gap-3">
          <button
            id={`btn-read-${book.id}`}
            onClick={() => onOpenBook(book)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#991b1b] hover:bg-[#b91c1c] text-white font-serif font-bold text-base rounded shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Leggi l'Opera</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id={`link-tab-${book.id}`}
            href={`/books/${book.fileName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-[#6e5f4d] hover:text-[#991b1b] hover:bg-[#faf7f0] rounded border border-[#dfd6c5] transition-colors"
            title="Apri in nuova scheda"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
