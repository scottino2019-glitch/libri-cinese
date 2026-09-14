export type BookCategory = 'tutti' | 'fiabe' | 'classici' | 'filosofia' | 'strategia' | 'letteratura' | 'storia';

export interface BookColorTheme {
  primary: string;         // e.g. '#1e385b' (Indigo), '#8b1e1b' (Cinnabar), '#1e3e34' (Jade)
  spineBorder: string;     // e.g. '#142742'
  lightBg: string;         // e.g. '#f4f7fa'
  badgeBg: string;         // e.g. '#e0ebf6'
  badgeText: string;       // e.g. '#1e385b'
  titleColor: string;      // e.g. '#142742'
  sealColor: string;       // e.g. '#991b1b'
  silkPatternName: string; // descriptive name in Italian
}

export interface Book {
  id: string;
  title: string;
  chineseTitle: string;
  pinyin?: string;
  author: string;
  authorChinese?: string;
  dynastyOrPeriod: string;
  yearBceCe?: string;
  category: Exclude<BookCategory, 'tutti'>;
  categoryName: string;
  categorySeal: string;
  fileName: string;
  description: string;
  highlights?: string[];
  sealCharacter: string;
  bindingStyle: string; // e.g. "Edizione a Filo di Seta Indaco", "Legatura Tradizionale Cinabro"
  scrollPreviewExcerpt?: string;
  theme: BookColorTheme;
}
