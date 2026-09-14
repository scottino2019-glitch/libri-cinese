import { Book } from '../types';

/**
 * PALETTE COLORI TRADIZIONALI PER COPERTINE (in rotazione automatica se non specificato)
 * 0: Indaco Imperiale (Blu)
 * 1: Lacca Cinabro (Rosso)
 * 2: Seta Giada (Verde)
 * 3: Sandalo & Ambra (Marrone dorato)
 * 4: Porpora Reale (Viola scuro)
 * 5: Oltremare Antico (Blu petrolio)
 */
export const COVER_PALETTE = [
  '#1e385b', // Indaco profondo
  '#801414', // Rosso cinabro
  '#1b4332', // Verde giada
  '#69350d', // Sandalo
  '#4a1c52', // Porpora
  '#0e4450', // Petrolio / Oltremare
  '#2b2b2b', // Nero grafite
  '#854d0e', // Bronzo dorato
];

/**
 * STRUTTURA MINIMA PER AGGIUNGERE UN LIBRO
 * Bastano 3 campi obbligatori:
 * - title: titolo in italiano
 * - chineseTitle: titolo in ideogrammi cinesi (usato anche per la striscia di copertina e il timbro)
 * - fileName: il file html in /public/books/ (oppure se omesso usa il titolo normalizzato + .html)
 *
 * Tutti gli altri campi (author, dynasty, color, seal, category) sono FACOLTATIVI e calcolati in automatico!
 */
export interface SimpleBookInput {
  title: string;
  chineseTitle: string;
  fileName?: string;       // es. "tao-te-ching.html". Se omesso, viene generato da title
  author?: string;         // es. "Laozi" (default: "Autore Classico")
  dynasty?: string;        // es. "Dinastia Tang" (default: "Classico Antico")
  category?: 'fiabe' | 'classici' | 'filosofia' | 'strategia' | 'letteratura' | 'storia'; // default: 'fiabe'
  color?: string;          // es. '#1e385b' (se omesso prende a rotazione un colore nobile)
  seal?: string;           // singolo carattere timbro (se omesso prende il 1° carattere di chineseTitle)
  description?: string;    // facoltativa
}

/**
 * INSERISCI QUI I TUOI LIBRI:
 * È sufficiente aggiungere righe semplici con solo titolo, caratteri cinesi e nome file!
 */
export const RAW_BOOKS: SimpleBookInput[] = [
  {
    title: 'Cappuccetto Rosso',
    chineseTitle: '小红帽',
    fileName: 'cappuccetto_rosso.html',
    author: 'Fiaba Tradizionale',
    dynasty: 'Racconto Popolare',
    category: 'fiabe',
    color: '#801414',
    seal: '红',
  },
  {
    title: 'Tao Te Ching',
    chineseTitle: '道德經',
    fileName: 'tao-te-ching.html',
    author: 'Laozi',
    dynasty: 'Zhou • VI sec. a.C.',
    category: 'filosofia',
  },
  {
    title: "L'Arte della Guerra",
    chineseTitle: '孫子兵法',
    fileName: 'arte-della-guerra.html',
    author: 'Sun Tzu',
    dynasty: 'Stati Combattenti • V sec. a.C.',
    category: 'strategia',
  },
  {
    title: 'I Dialoghi di Confucio',
    chineseTitle: '論語',
    fileName: 'dialoghi-confucio.html',
    author: 'Confucio',
    dynasty: 'Primavere e Autunni',
    category: 'classici',
  },
  {
    title: 'Il Romanzo dei Tre Regni',
    chineseTitle: '三國演義',
    fileName: 'tre-regni.html',
    author: 'Luo Guanzhong',
    dynasty: 'Dinastia Yuan-Ming',
    category: 'storia',
  },
  {
    title: 'Fiori di Poesia Tang',
    chineseTitle: '唐詩三百首',
    fileName: 'poesie-tang.html',
    author: 'Li Bai, Du Fu',
    dynasty: 'Dinastia Tang',
    category: 'letteratura',
  },
  {
    title: 'Zhuangzi',
    chineseTitle: '莊子',
    fileName: 'tao-te-ching.html',
    author: 'Zhuang Zhou',
    dynasty: 'Stati Combattenti',
    category: 'filosofia',
  },
];

const CATEGORY_NAMES: Record<string, string> = {
  fiabe: 'Fiabe & Racconti',
  classici: 'Grandi Classici',
  filosofia: 'Filosofia & Maestri',
  strategia: 'Arte Militare',
  letteratura: 'Lirica & Poesia',
  storia: 'Cronache Storiche',
};

const CATEGORY_SEALS: Record<string, string> = {
  fiabe: '童',
  classici: '經',
  filosofia: '子',
  strategia: '武',
  letteratura: '集',
  storia: '史',
};

// Funzione automatica che trasforma la lista minima nei libri completi pronti per lo scaffale
export function formatBooks(inputs: SimpleBookInput[]): Book[] {
  return inputs.map((item, index) => {
    const id = item.fileName
      ? item.fileName.replace('.html', '')
      : item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const color = item.color || COVER_PALETTE[index % COVER_PALETTE.length];
    const cat = item.category || 'classici';
    const seal = item.seal || item.chineseTitle.charAt(0) || '書';

    return {
      id,
      title: item.title,
      chineseTitle: item.chineseTitle,
      author: item.author || 'Autore Classico',
      dynastyOrPeriod: item.dynasty || 'Canone Tradizionale',
      category: cat,
      categoryName: CATEGORY_NAMES[cat] || 'Testo Classico',
      categorySeal: CATEGORY_SEALS[cat] || '典',
      fileName: item.fileName || `${id}.html`,
      description: item.description || `Volume storico conservato nella biblioteca imperiale.`,
      sealCharacter: seal,
      bindingStyle: 'Edizione a Filo di Seta',
      theme: {
        primary: color,
        spineBorder: '#140e0a',
        lightBg: '#faf6f0',
        badgeBg: '#f2e8dc',
        badgeText: '#3d2516',
        titleColor: '#ffffff',
        sealColor: '#991b1b',
        silkPatternName: 'Seta Orientale',
      },
    };
  });
}

export const IMPERIAL_BOOKS: Book[] = formatBooks(RAW_BOOKS);
