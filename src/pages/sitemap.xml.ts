import { publicConfig } from '@/lib/config';
const marketingPaths = ['', 'privacy/'];
export const GET = () => {
  const urls = publicConfig.siteUrl
    ? marketingPaths
        .map((path) => `<url><loc>${publicConfig.siteUrl}/${path}</loc></url>`)
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
