import { Book } from '../types';

/**
 * PALETTE TONALITÀ SETA RICCHE E DISTINTE PER COPERTINE DEI LIBRI
 * Colori saturi e profondi per evitare qualsiasi effetto monocromatico o piatto
 */
export const COVER_PALETTE = [
  '#991b1b', // Rosso Granato Vivo
  '#1e3a8a', // Blu Zaffiro Profondo
  '#14532d', // Verde Giada Smeraldo
  '#78350f', // Ambra Cuoio Dorata
  '#581c87', // Porpora Reale
  '#0f766e', // Turchese Petrolio
  '#831843', // Rubino Damascato
  '#1e293b', // Grafite Ardesia
];

export interface SimpleBookInput {
  title: string;
  chineseTitle: string;
  fileName?: string;
  author?: string;
  dynasty?: string;
  category?: 'fiabe' | 'classici' | 'filosofia' | 'strategia' | 'letteratura' | 'storia';
  color?: string;
  seal?: string;
  description?: string;
}

export const RAW_BOOKS: SimpleBookInput[] = [
  {
    title: 'Cappuccetto Rosso',
    chineseTitle: '小红帽',
    fileName: 'cappuccetto_rosso.html',
    author: 'Fiaba Tradizionale',
    dynasty: 'Racconto Popolare',
    category: 'fiabe',
    color: '#a31515', // Rosso Scarlatto
    seal: '红',
  },
  {
    title: 'La Festa di Primavera',
    chineseTitle: '春节',
    fileName: 'primavera.html',
    author: 'Li Bao',
    dynasty: 'Racconto Popolare',
    category: 'letteratura',
    color: '#581c87', // Porpora Reale
    seal: '春',
  },
   {
    title: 'Il folletto Momo',
    chineseTitle: '末末',
    fileName: 'il_piccolo_folletto_momo.html',
    author: 'Fiaba Tradizionale',
    dynasty: 'Racconto Popolare',
    category: 'fiabe',
    color: '#a31515', // Rosso Scarlatto
    seal: '精灵',
  },
  {
    title: 'Tao Te Ching',
    chineseTitle: '道德經',
    fileName: 'tao-te-ching.html',
    author: 'Laozi',
    dynasty: 'Epoca Zhou',
    category: 'filosofia',
    color: '#1d4ed8', // Blu Zaffiro Brillante
    seal: '道',
  },
  {
    title: "L'Arte della Guerra",
    chineseTitle: '孫子兵法',
    fileName: 'arte-della-guerra.html',
    author: 'Sun Tzu',
    dynasty: 'Stati Combattenti',
    category: 'strategia',
    color: '#15803d', // Verde Foresta Intenso
    seal: '武',
  },
  {
    title: 'I Dialoghi di Confucio',
    chineseTitle: '論語',
    fileName: 'dialoghi-confucio.html',
    author: 'Confucio',
    dynasty: 'Periodo Classico',
    category: 'classici',
    color: '#b45309', // Ambra Dorata Brillante
    seal: '仁',
  },
  {
    title: 'I Tre Regni',
    chineseTitle: '三國演義',
    fileName: 'tre-regni.html',
    author: 'Luo Guanzhong',
    dynasty: 'Epoca Ming',
    category: 'storia',
    color: '#6d28d9', // Viola Porpora Ricco
    seal: '義',
  },
  {
    title: 'Poesie dei Tang',
    chineseTitle: '唐詩三百首',
    fileName: 'poesie-tang.html',
    author: 'Li Bai, Du Fu',
    dynasty: 'Dinastia Tang',
    category: 'letteratura',
    color: '#0e7490', // Blu Pavone / Petrolio
    seal: '詩',
  },
];

const CATEGORY_NAMES: Record<string, string> = {
  fiabe: 'Fiabe',
  classici: 'Classici',
  filosofia: 'Filosofia',
  strategia: 'Strategia',
  letteratura: 'Letteratura',
  storia: 'Storia',
};

const CATEGORY_SEALS: Record<string, string> = {
  fiabe: '童',
  classici: '經',
  filosofia: '子',
  strategia: '武',
  letteratura: '集',
  storia: '史',
};

export function formatBooks(inputs: SimpleBookInput[]): Book[] {
  return inputs.map((item, index) => {
    const id = item.fileName
      ? item.fileName.replace('.html', '')
      : item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const color = item.color || COVER_PALETTE[index % COVER_PALETTE.length];
    const cat = item.category || 'fiabe';
    const seal = item.seal || item.chineseTitle.charAt(0) || '書';

    return {
      id,
      title: item.title,
      chineseTitle: item.chineseTitle,
      author: item.author || 'Autore Classico',
      dynastyOrPeriod: item.dynasty || 'Antico',
      category: cat,
      categoryName: CATEGORY_NAMES[cat] || 'Volume',
      categorySeal: CATEGORY_SEALS[cat] || '典',
      fileName: item.fileName || `${id}.html`,
      description: item.description || '',
      sealCharacter: seal,
      bindingStyle: 'Rilegatura Tradizionale',
      theme: {
        primary: color,
        spineBorder: '#140e0a',
        lightBg: '#faf6f0',
        badgeBg: '#f2e8dc',
        badgeText: '#3d2516',
        titleColor: '#ffffff',
        sealColor: '#991b1b',
        silkPatternName: 'Seta Pregiata',
      },
    };
  });
}

export const IMPERIAL_BOOKS: Book[] = formatBooks(RAW_BOOKS);
