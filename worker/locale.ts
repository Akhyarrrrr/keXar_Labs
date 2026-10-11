export function preferredLocale(cookie: string | null, acceptLanguage: string | null): 'id' | 'en' {
  const saved = cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => /^kexar-language=(id|en)$/.test(part));
  if (saved) return saved.endsWith('=id') ? 'id' : 'en';
  const languages = (acceptLanguage || '')
    .split(',')
    .map((part, index) => {
      const [tag, quality] = part.trim().toLowerCase().split(';');
      const q = quality ? Number(quality.trim().replace(/^q=/, '')) : 1;
      return { tag: tag.split('-')[0], q, index };
    })
    .filter(({ tag, q }) => (tag === 'id' || tag === 'en') && q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  return languages[0]?.tag === 'id' ? 'id' : 'en';
}
