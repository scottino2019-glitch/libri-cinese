import React from 'react';
import { BookOpen } from 'lucide-react';
import { Book } from '../types';

interface RealBookItemProps {
  book: Book;
  onOpenBook: (book: Book) => void;
}

export const RealBookItem: React.FC<RealBookItemProps> = ({ book, onOpenBook }) => {
  const { theme } = book;

  return (
    <div
      className="group flex flex-col items-center cursor-pointer w-full max-w-[270px] mx-auto py-2"
      onClick={() => onOpenBook(book)}
    >
      {/* 1. 3D REALISTIC VOLUME (Con spessore pagine dorate, riflessi di luce e costola) */}
      <div className="book-3d-wrapper w-full flex justify-center pb-2">
        <div
          id={`book-volume-${book.id}`}
          className="book-3d-volume book-3d-shadow relative w-[210px] sm:w-[230px] h-[300px] sm:h-[330px] p-4 flex flex-col justify-between overflow-hidden"
          style={{
            backgroundColor: theme.primary,
            backgroundImage: `
              radial-gradient(ellipse at 85% 15%, rgba(255, 255, 255, 0.22) 0%, transparent 55%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.45) 100%),
              repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 6px)
            `,
          }}
        >
          {/* Taglio delle pagine di carta sul bordo destro (Realistic Paper Block) */}
          <div className="absolute top-0 bottom-0 right-0 w-[5px] bg-gradient-to-l from-white/20 to-black/20 pointer-events-none"></div>

          {/* Costola a sinistra con legatura a filo di seta (Authentic Xian Zhuang) */}
          <div className="book-spine-silk-strip">
            <div className="silk-stitch"></div>
            <div className="silk-stitch"></div>
            <div className="silk-stitch"></div>
            <div className="silk-stitch"></div>
          </div>

          {/* Solco della cerniera di piega della copertina */}
          <div className="book-spine-crease"></div>

          {/* Angolare dorato in alto a destra */}
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#f0d48f]/40 pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#f0d48f]/40 pointer-events-none"></div>

          {/* ETICHETTA DI CATEGORIA ELEGANTE (Cucita in alto a destra) */}
          <div className="self-end z-10 pl-2">
            <span className="px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-xs border border-white/20 text-[#fcedb3] text-[11px] font-italian-body tracking-wider shadow-sm uppercase font-semibold">
              {book.categoryName}
            </span>
          </div>

          {/* STRISCIA TITOLO CALLIGRAFICA IN CARTA DI RISO (Tíqiān) */}
          <div className="ml-8 self-start authentic-tiqian-slip px-3.5 py-4 rounded-sm flex flex-col items-center shadow-2xl z-10 group-hover:scale-105 transition-transform duration-300">
            {/* Piccolo ornamento superiore */}
            <div className="w-5 h-1 bg-[#b39b70] rounded-full mb-1"></div>

            {/* GRANDI CARATTERI CINESI CALLIGRAFICI AD ALTO CONTRASTO */}
            <div className="font-calligraphy text-4xl sm:text-[42px] text-[#140f0a] font-black vertical-chinese my-1.5 leading-none select-none">
              {book.chineseTitle}
            </div>

            {/* TIMBRO IN CERALACCA ROSSA VIVA */}
            <div className="wax-cinnabar-seal w-7 h-7 rounded-sm flex items-center justify-center font-calligraphy text-base font-bold shadow-md mt-2">
              {book.sealCharacter}
            </div>
          </div>

          {/* DETTAGLI IMPRESSI SULLA COPERTINA DEL LIBRO */}
          <div className="ml-8 z-10 pt-2 border-t border-white/15 text-[#f5ebd9]">
            <div className="text-[13px] font-italian-body font-bold text-[#fcedb3] truncate">
              {book.author}
            </div>
            <div className="text-[11px] font-italian-body text-white/70">
              {book.dynastyOrPeriod}
            </div>
          </div>

          {/* OVERLAY SOTTILE AL PASSAGGIO DEL MOUSE (Invito alla lettura) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-5 text-center z-20 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-[#9e1a1a] text-[#fff6e6] flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-italian-title text-base font-bold text-white tracking-wide">
              Sfoglia il volume
            </span>
          </div>
        </div>
      </div>

      {/* 2. TARGHETTA DEL TITOLO IN ITALIANO AD ALTA LEGGIBILITÀ (Pedistallo espositivo) */}
      <div className="w-full mt-2 book-stand-pedestal rounded-sm py-2.5 px-3 text-center transition-all duration-300 group-hover:border-[#c99732] group-hover:bg-[#332014]">
        <h3 className="font-italian-title text-lg sm:text-xl font-bold text-[#fbf4e6] tracking-wide leading-tight group-hover:text-[#ffd67a] transition-colors">
          {book.title}
        </h3>
        <p className="font-italian-body text-sm text-[#c7b399] mt-0.5">
          {book.author} • <span className="font-calligraphy text-base text-[#e5b358]">{book.chineseTitle}</span>
        </p>
      </div>
    </div>
  );
};
