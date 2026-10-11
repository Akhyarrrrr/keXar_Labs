export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const serviceIds = ['legal-web', 'redesign', 'web-app', 'seo', 'server', 'ai'] as const;
export type ServiceId = (typeof serviceIds)[number];
export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  intro: string;
  needs: string[];
  deliverables: string[];
  example: string;
};
