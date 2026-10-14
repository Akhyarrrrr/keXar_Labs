import { publicConfig, type Locale } from './content';
export function pageMeta(locale: Locale, title: string, description: string, path = '') {
  const origin = publicConfig.siteUrl;
  const demo = path.startsWith('demo/');
  const language = demo ? locale : 'en';
  return {
    title: `${title} | keXar Labs`,
    description,
    canonical: origin ? `${origin}/${language}/${path}` : undefined,
    alternates: origin
      ? [
          ...(demo ? [{ lang: 'id', href: `${origin}/id/${path}` }] : []),
          { lang: 'en', href: `${origin}/en/${path}` },
          { lang: 'x-default', href: `${origin}/en/${path}` },
        ]
      : [],
    image: origin ? `${origin}/brand/share.png` : undefined,
  };
}
