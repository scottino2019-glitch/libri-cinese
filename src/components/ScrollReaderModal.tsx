import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  RotateCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  BookOpen,
} from 'lucide-react';
import { Book } from '../types';

interface ScrollReaderModalProps {
  book: Book | null;
  onClose: () => void;
}

export const ScrollReaderModal: React.FC<ScrollReaderModalProps> = ({
  book,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (book) {
      setIsLoading(true);
      setZoomLevel(100);
    }
  }, [book]);

  if (!book) return null;

  const bookUrl = `/books/${book.fileName}`;

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = bookUrl;
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 75), 150));
  };

  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/75 backdrop-blur-xs"
      >
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Modal Window: Refined Reading Pavilion */}
        <motion.div
          id="reader-modal-window"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-6xl h-[92vh] flex flex-col z-10 bg-white rounded-lg shadow-2xl overflow-hidden border border-[#dfd6c5]"
        >
          {/* HEADER BAR: Traditional Vermilion and Gold Trim */}
          <div className="bg-[#1c1917] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#991b1b]">
            {/* Left: Seal, Title & Author */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="cinnabar-seal w-9 h-9 rounded-xs flex items-center justify-center font-calligraphy text-lg font-bold shrink-0">
                {book.sealCharacter}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-italian-title text-base sm:text-lg font-bold text-white truncate">
                    {book.title}
                  </h2>
                  {book.chineseTitle && (
                    <span className="font-calligraphy text-xl text-[#fcedb3] font-bold shrink-0">
                      {book.chineseTitle}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#d6cbba] font-italian-body">
                  {book.author} • {book.dynastyOrPeriod}
                </div>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center bg-[#2d2824] rounded border border-[#4a423b] p-0.5">
                <button
                  onClick={() => handleZoom(-10)}
                  className="p-1 hover:bg-[#3d3732] text-[#d6cbba] hover:text-white rounded cursor-pointer"
                  title="Riduci caratteri"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono font-medium text-[#fcedb3]">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => handleZoom(10)}
                  className="p-1 hover:bg-[#3d3732] text-[#d6cbba] hover:text-white rounded cursor-pointer"
                  title="Ingrandisci caratteri"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                className="p-1.5 bg-[#2d2824] hover:bg-[#3d3732] text-[#d6cbba] hover:text-white rounded border border-[#4a423b] cursor-pointer"
                title="Ricarica testo"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={handleToggleFullscreen}
                className="p-1.5 bg-[#2d2824] hover:bg-[#3d3732] text-[#d6cbba] hover:text-white rounded border border-[#4a423b] cursor-pointer"
                title={isFullscreen ? 'Riduci' : 'Schermo Intero'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* External Link */}
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-[#2d2824] hover:bg-[#3d3732] text-[#d6cbba] hover:text-white rounded border border-[#4a423b]"
                title="Apri in nuova scheda"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-3 py-1 bg-[#991b1b] hover:bg-[#b91c1c] text-white font-serif font-bold text-xs rounded transition-all active:scale-95 cursor-pointer ml-1"
                title="Chiudi lettura"
              >
                <X className="w-4 h-4" />
                <span>Chiudi</span>
              </button>
            </div>
          </div>

          {/* MAIN READING IFRAME */}
          <div className="relative flex-1 w-full bg-[#fdfbf7] overflow-hidden flex flex-col">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#fdfbf7] text-[#1c1917]">
                <div className="cinnabar-seal w-12 h-12 font-calligraphy text-2xl font-bold animate-pulse mb-3 flex items-center justify-center">
                  {book.sealCharacter}
                </div>
                <div className="font-calligraphy text-xl text-[#991b1b] font-bold">
                  Apertura del volume in corso...
                </div>
                <p className="font-serif text-sm text-[#786c5e] mt-1">
                  Caricamento di {book.title}
                </p>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={bookUrl}
              title={book.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-none"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                width: zoomLevel !== 100 ? `${10000 / zoomLevel}%` : '100%',
                height: zoomLevel !== 100 ? `${10000 / zoomLevel}%` : '100%',
              }}
            />
          </div>

          {/* FOOTER BAR: Clean cultural colophon */}
          <div className="bg-[#f7f3ec] border-t border-[#dfd6c5] px-4 py-2 flex items-center justify-between text-xs font-serif text-[#6b5e4f]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>{book.bindingStyle}</span>
            </div>
            <div className="font-calligraphy text-sm text-[#991b1b] font-bold">
              文 淵 藏 書 • 典 藏 善 本
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
