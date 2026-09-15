import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative w-full border-b border-[#3d2716] shadow-2xl bg-gradient-to-b from-[#180e07] via-[#21140b] to-[#1a0f08]">
      {/* Nastro superiore in vermiglio e oro */}
      <div className="w-full h-1 bg-gradient-to-r from-[#801414] via-[#c99732] to-[#801414]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Targa Lignea Tradizionale e Titolo Principale */}
          <div className="flex items-center gap-5">
            {/* Targa Laccata Insegna */}
            <div
              id="library-signboard"
              className="bg-[#120a06] text-[#f7e096] px-5 py-3.5 rounded-xs border-2 border-[#a67926] shadow-lg flex flex-col items-center justify-center shrink-0 min-w-[130px] relative"
            >
              <div className="wax-cinnabar-seal w-6 h-6 rounded-xs flex items-center justify-center font-calligraphy text-xs font-bold mb-1">
                閣
              </div>
              <div className="font-calligraphy text-3xl text-[#ffeb99] font-black tracking-widest leading-none my-0.5 select-none">
                文淵閣
              </div>
              <div className="text-[9px] font-italian-body tracking-widest text-[#d4af37] uppercase">
                Wényuān Gé
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-calligraphy text-xl text-[#d44848] font-bold select-none">
                  四 庫 藏 書
                </span>
                <span className="text-[11px] font-italian-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#381a1a] text-[#f2b6b6] border border-[#692424]">
                  Archivio Storico
                </span>
              </div>

              <h1 className="font-italian-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f7ebd4] tracking-normal leading-tight">
                Biblioteca dei Grandi Canoni
              </h1>
            </div>
          </div>

          {/* Sottotitolo discreto ed elegante senza sovraccarico di testo */}
          <div className="text-center sm:text-right text-[#bda78d] font-italian-body text-base italic">
            «Apri un libro per varcare la soglia del tempo»
          </div>
        </div>
      </div>
    </header>
  );
};
