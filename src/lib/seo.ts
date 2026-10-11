import { publicConfig, type Locale } from './content';
export function pageMeta(locale: Locale, title: string, description: string, path = '') {
  const origin = publicConfig.siteUrl;
  return {
    title: `${title} | keXar Labs`,
    description,
    canonical: origin ? `${origin}/${locale}/${path}` : undefined,
    alternates: origin
      ? [
          { lang: 'id', href: `${origin}/id/${path}` },
          { lang: 'en', href: `${origin}/en/${path}` },
          { lang: 'x-default', href: `${origin}/en/${path}` },
        ]
      : [],
    image: origin ? `${origin}/brand/share.png` : undefined,
  };
}
