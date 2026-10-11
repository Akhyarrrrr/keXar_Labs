export const conceptIds = ['corporate', 'litigation', 'private-client'] as const;
export type ConceptId = (typeof conceptIds)[number];
export interface Practice {
  slug: string;
  title: string;
  short: string;
  intro: string;
  work: string[];
  sections: [string, string][];
}
export interface Professional {
  slug: string;
  name: string;
  role: string;
  portrait: string;
  intro: string;
  bio: [string, string][];
  focus: string[];
}
export interface Article {
  slug: string;
  title: string;
  category: string;
  intro: string;
  sections: [string, string][];
  image: string;
}
export interface DemoContent {
  name: string;
  descriptor: string;
  hero: string;
  heroNote: string;
  image: string;
  statement: string;
  statementNote: string;
  approach: [string, string][];
  practices: Practice[];
  people: Professional[];
  articles: Article[];
  contactNote: string;
}
