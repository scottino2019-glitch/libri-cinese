import React from 'react';
import { BookOpen, Library, Flame } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative w-full border-b border-[#3d2716] shadow-2xl bg-gradient-to-b from-[#180e07] via-[#21140b] to-[#1a0f08]">
      {/* Imperial Vermilion & Gold Border Trim */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#801414] via-[#c99732] to-[#801414]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* LEFT: Grand Imperial Library Plaque (匾額 Biǎn'é) & Title */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* AUTHENTIC IMPERIAL WOOD LACQUER PLAQUE */}
            <div
              id="library-signboard"
              className="bg-[#120a06] text-[#f7e096] px-6 py-4 rounded-xs border-2 border-[#a67926] shadow-[0_8px_24px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center shrink-0 min-w-[150px] relative"
            >
              {/* Corner gold brackets */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#d4af37]"></div>

              {/* Vermilion Seal */}
              <div className="cinnabar-seal-stamp w-7 h-7 rounded-xs flex items-center justify-center font-calligraphy text-sm font-bold mb-1">
                閣
              </div>

              {/* Magnificent Chinese Calligraphy Title */}
              <div className="font-calligraphy text-4xl text-[#ffeb99] font-black tracking-widest leading-none my-1 select-none">
                文淵閣
              </div>
              <div className="text-[10px] font-cinzel tracking-widest text-[#d4af37] uppercase mt-0.5">
                Wényuān Gé
              </div>
            </div>

            {/* Cultural Titles */}
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-2">
                <span className="font-calligraphy text-2xl text-[#d44848] font-bold tracking-widest select-none">
                  四 庫 藏 書 • 汗 牛 充 棟
                </span>
                <span className="text-[11px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#381a1a] text-[#f2b6b6] border border-[#692424]">
                  Archivio Imperiale
                </span>
              </div>

              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7ebd4] tracking-tight leading-tight">
                La Grande Biblioteca Orientale
              </h1>

              <p className="font-serif text-sm sm:text-base text-[#c7b49b] mt-2 max-w-2xl leading-relaxed">
                Antica sala di conservazione dei testi canonici. Seleziona i volumi rilegati a filo di seta posizionati sugli scaffali per aprirli e leggerne il testo originale e commentato.
              </p>
            </div>
          </div>

          {/* RIGHT: Scholarly Atmosphere Indicator */}
          <div className="flex items-center gap-4 bg-[#140b06] px-5 py-3 rounded-md border border-[#3b2414] shadow-inner text-[#d6c4aa]">
            <Library className="w-6 h-6 text-[#c99732] shrink-0" />
            <div className="text-xs font-serif text-left">
              <div className="font-cinzel font-bold text-[#f2e7d0]">
                Sala di Consultazione Classica
              </div>
              <div className="text-[#a18f78]">
                Legature tradizionali • Lettura integrale
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
