export const publicConfig = {
  siteUrl: (import.meta.env.PUBLIC_SITE_URL || '').replace(/\/+$/, ''),
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || '',
  whatsapp: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '',
};
export function whatsappUrl() {
  const message = 'Hello keXar Labs, I would like to discuss a project.';
  return `https://wa.me/${publicConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
