import { publicConfig } from '@/lib/content';
export const GET = () =>
  new Response(
    `User-agent: *\nDisallow: /id/demo/\nDisallow: /en/demo/\n${publicConfig.siteUrl ? `Sitemap: ${publicConfig.siteUrl}/sitemap.xml\n` : ''}`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
