import { corporate } from './corporate';
import { litigation } from './litigation';
import { privateClient } from './private-client';
import type { ConceptId, DemoContent } from './types';
import type { Locale } from '@/lib/content';
export { conceptIds, type ConceptId, type DemoContent } from './types';
export const demos: Record<ConceptId, Record<Locale, DemoContent>> = {
  corporate,
  litigation,
  'private-client': privateClient,
};
export const demoPages = (content: DemoContent) => [
  undefined,
  'practices',
  ...content.practices.map((item) => `practices/${item.slug}`),
  'people',
  ...content.people.map((item) => `people/${item.slug}`),
  'insights',
  ...content.articles.map((item) => `insights/${item.slug}`),
  'contact',
];
export const demoLabels = {
  en: {
    fiction: 'Demonstration concept; all identities and content are fictional.',
    back: 'Back to keXar',
    home: 'Home',
    practices: 'Our expertise',
    people: 'Our people',
    insights: 'Perspectives',
    contact: 'Contact',
    conversation: 'Start a conversation',
    explore: 'Explore our expertise',
    learn: 'Read more',
    profile: 'View profile',
    synthetic: 'Fictional identity · Synthetic portrait',
    areas: 'Areas of focus',
    scope: 'How we can help',
    related: 'Related expertise',
    approach: 'Our approach',
    articleNote: 'Fictional editorial example. General discussion only; not legal advice.',
    next: 'A conversation is a useful beginning.',
  },
  id: {
    fiction: 'Konsep demonstrasi; seluruh identitas dan konten fiktif.',
    back: 'Kembali ke keXar',
    home: 'Beranda',
    practices: 'Bidang praktik',
    people: 'Profesional',
    insights: 'Perspektif',
    contact: 'Kontak',
    conversation: 'Mulai percakapan',
    explore: 'Jelajahi bidang praktik',
    learn: 'Baca selengkapnya',
    profile: 'Lihat profil',
    synthetic: 'Identitas fiktif · Potret sintetis',
    areas: 'Bidang fokus',
    scope: 'Bagaimana kami membantu',
    related: 'Bidang terkait',
    approach: 'Pendekatan kami',
    articleNote: 'Contoh editorial fiktif. Pembahasan umum; bukan nasihat hukum.',
    next: 'Percakapan adalah awal yang berguna.',
  },
} as const;
