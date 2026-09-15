import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CalligraphyNav } from './components/CalligraphyNav';
import { RealBookItem } from './components/RealBookItem';
import { ScrollReaderModal } from './components/ScrollReaderModal';
import { Book, BookCategory } from './types';
import { IMPERIAL_BOOKS } from './data/defaultBooks';

export function App() {
  const [currentCategory, setCurrentCategory] = useState<BookCategory>('tutti');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  // Filtra i libri in base a categoria e ricerca
  const filteredBooks = useMemo(() => {
    return IMPERIAL_BOOKS.filter((book) => {
      if (currentCategory !== 'tutti' && book.category !== currentCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesChinese = book.chineseTitle.includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        return matchesTitle || matchesChinese || matchesAuthor;
      }
      return true;
    });
  }, [currentCategory, searchQuery]);

  // Suddivide i libri in ripiani (scaffali da 3 libri ciascuno)
  const shelves = useMemo(() => {
    const chunks: Book[][] = [];
    for (let i = 0; i < filteredBooks.length; i += 3) {
      chunks.push(filteredBooks.slice(i, i + 3));
    }
    return chunks;
  }, [filteredBooks]);

  return (
    <div className="min-h-screen wooden-library-room flex flex-col selection:bg-[#801414] selection:text-white text-[#ede4d3]">
      {/* Testata pulita e suggestiva */}
      <Header />

      {/* Spazio Scaffali della Libreria */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Barra categorie essenziale */}
        <CalligraphyNav
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={{}}
        />

        {/* Gli Scaffali con i Volumi 3D */}
        <section className="mt-2 mb-16">
          {shelves.length > 0 ? (
            <div className="flex flex-col gap-12 sm:gap-14">
              {shelves.map((shelfBooks, shelfIndex) => (
                <div key={shelfIndex} className="relative flex flex-col pt-4">
                  {/* I Libri posizionati sul ripiano */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 px-4 sm:px-8 items-end z-10">
                    {shelfBooks.map((book) => (
                      <RealBookItem
                        key={book.id}
                        book={book}
                        onOpenBook={(selectedBook) => setReadingBook(selectedBook)}
                      />
                    ))}
                  </div>

                  {/* Il ripiano in vero legno spesso massello */}
                  <div className="wooden-shelf-plank w-full mt-3 rounded-xs"></div>

                  {/* Ombra naturale proiettata sotto il ripiano */}
                  <div className="h-6 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#180e07] border border-[#3b2414] rounded-sm my-8 shadow-2xl">
              <div className="wax-cinnabar-seal w-10 h-10 mx-auto mb-3 font-calligraphy text-xl font-bold flex items-center justify-center">
                無
              </div>
              <h3 className="font-italian-title text-xl font-bold text-[#f2e7d0]">
                Nessun volume trovato
              </h3>
              <p className="font-italian-body text-[#9e8870] text-base mt-1 max-w-sm mx-auto">
                Nessun libro corrisponde ai filtri selezionati.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentCategory('tutti');
                }}
                className="mt-4 px-4 py-1.5 bg-[#801414] hover:bg-[#a31a1a] text-white font-italian-body font-semibold text-base rounded-xs shadow-md cursor-pointer transition-all active:scale-95"
              >
                Mostra tutti i libri
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Modale di lettura a tutto schermo */}
      <ScrollReaderModal
        book={readingBook}
        onClose={() => setReadingBook(null)}
      />

      {/* Piede della libreria discreto */}
      <footer className="w-full bg-[#100804] text-[#8a755d] border-t border-[#331e10] py-6 px-4 text-center mt-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="wax-cinnabar-seal w-6 h-6 font-calligraphy text-xs font-bold flex items-center justify-center">
            藏
          </div>
          <span className="font-calligraphy text-lg text-[#d4af37] tracking-wider select-none">
            文 淵 藏 書
          </span>
          <span className="font-italian-body text-sm text-[#735e47]">
            • Biblioteca Tradizionale
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
