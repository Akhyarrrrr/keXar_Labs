import { publicConfig } from '@/lib/config';
export const GET = () =>
  new Response(
    `User-agent: *\nAllow: /\n${publicConfig.siteUrl ? `Sitemap: ${publicConfig.siteUrl}/sitemap.xml\n` : ''}`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
