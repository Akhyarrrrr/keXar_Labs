import type { Locale } from './types';
export const publicConfig = {
  siteUrl: (import.meta.env.PUBLIC_SITE_URL || '').replace(/\/+$/, ''),
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || '',
  whatsapp: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '',
  turnstile: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
};
export function whatsappUrl(locale: Locale) {
  const message =
    locale === 'id'
      ? 'Halo keXar Labs, saya ingin membahas kebutuhan website.'
      : 'Hello keXar Labs, I would like to discuss a website project.';
  return `https://wa.me/${publicConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
