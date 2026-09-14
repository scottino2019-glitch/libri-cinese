import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CalligraphyNav } from './components/CalligraphyNav';
import { RealBookItem } from './components/RealBookItem';
import { ScrollReaderModal } from './components/ScrollReaderModal';
import { Book, BookCategory } from './types';
import { IMPERIAL_BOOKS } from './data/defaultBooks';
import { BookOpen } from 'lucide-react';

export function App() {
  const [currentCategory, setCurrentCategory] = useState<BookCategory>('tutti');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  // Filter books based on category and search query
  const filteredBooks = useMemo(() => {
    return IMPERIAL_BOOKS.filter((book) => {
      // Category filter
      if (currentCategory !== 'tutti' && book.category !== currentCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesChinese = book.chineseTitle.includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesDynasty = book.dynastyOrPeriod.toLowerCase().includes(q);
        const matchesDesc = book.description.toLowerCase().includes(q);
        return matchesTitle || matchesChinese || matchesAuthor || matchesDynasty || matchesDesc;
      }
      return true;
    });
  }, [currentCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<BookCategory, number> = {
      tutti: IMPERIAL_BOOKS.length,
      fiabe: 0,
      classici: 0,
      filosofia: 0,
      strategia: 0,
      letteratura: 0,
      storia: 0,
    };
    IMPERIAL_BOOKS.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Split books into shelves (groups of 3 books per shelf)
  const shelves = useMemo(() => {
    const chunks: Book[][] = [];
    for (let i = 0; i < filteredBooks.length; i += 3) {
      chunks.push(filteredBooks.slice(i, i + 3));
    }
    return chunks;
  }, [filteredBooks]);

  return (
    <div className="min-h-screen wooden-library-room flex flex-col selection:bg-[#801414] selection:text-white text-[#ede4d3]">
      {/* 1. Grand Imperial Pavilion Masthead */}
      <Header />

      {/* 2. Main Wooden Library Hall (Biblioteca / Scaffali in Legno Pregiato) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col">
        {/* Navigation Categories & Quick Search */}
        <CalligraphyNav
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={categoryCounts}
        />

        {/* 3. The Library Bookcase Shelves (Palchetto Libreria in Legno Scuro) */}
        <section className="mt-4 mb-16">
          {/* Subtle Shelf Status Note */}
          <div className="flex items-center justify-between mb-8 text-xs font-serif text-[#a69279]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c99732]"></span>
              <span>Scaffalatura Orientale in Palissandro e Cedro</span>
            </div>
            <span>
              {filteredBooks.length} {filteredBooks.length === 1 ? 'volume esposto' : 'volumi esposti'} • Tocca un volume per sfogliarlo
            </span>
          </div>

          {/* Shelves Layout */}
          {shelves.length > 0 ? (
            <div className="flex flex-col gap-12 sm:gap-16">
              {shelves.map((shelfBooks, shelfIndex) => (
                <div key={shelfIndex} className="relative flex flex-col">
                  {/* Books Standing on Shelf */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 px-6 sm:px-12 items-end z-10">
                    {shelfBooks.map((book) => (
                      <RealBookItem
                        key={book.id}
                        book={book}
                        onOpenBook={(selectedBook) => setReadingBook(selectedBook)}
                      />
                    ))}
                  </div>

                  {/* The Physical Wooden Shelf Plank */}
                  <div className="wooden-shelf-plank w-full mt-4 rounded-xs"></div>

                  {/* Shadow Cast Beneath the Shelf */}
                  <div className="h-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#180e07] border border-[#3b2414] rounded-md my-8 shadow-2xl">
              <div className="cinnabar-seal-stamp w-12 h-12 mx-auto mb-3 font-calligraphy text-2xl font-bold flex items-center justify-center">
                無
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#f2e7d0]">
                Nessun volume su questo scaffale
              </h3>
              <p className="font-serif text-[#9e8870] text-sm mt-1 max-w-md mx-auto">
                Nessun'opera corrisponde ai filtri impostati. Prova a selezionare un'altra categoria o azzerare la ricerca.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentCategory('tutti');
                }}
                className="mt-5 px-5 py-2 bg-[#801414] hover:bg-[#a31a1a] text-white font-serif font-semibold text-sm rounded-xs shadow-md cursor-pointer transition-all active:scale-95"
              >
                Ripristina Scaffali
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Embedded Full-Screen Reading Chamber */}
      <ScrollReaderModal
        book={readingBook}
        onClose={() => setReadingBook(null)}
      />

      {/* Antique Library Footer */}
      <footer className="w-full bg-[#120a06] text-[#b8a68e] border-t border-[#3d2716] py-10 px-4 text-center mt-auto">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-2.5">
          <div className="cinnabar-seal-stamp w-8 h-8 font-calligraphy text-base font-bold flex items-center justify-center">
            藏
          </div>
          <div className="font-calligraphy text-2xl text-[#f7e096] tracking-widest select-none">
            文 淵 藏 書 • 墨 香 千 載
          </div>
          <p className="font-cinzel text-[11px] text-[#7d6750] tracking-wider uppercase">
            Biblioteca Tradizionale dei Grandi Canoni • Collezione Storica Integrale
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
