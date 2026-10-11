import { canSmoothScroll } from '@/lib/motion-policy';
import { readThemePreference, resolveTheme, themeKey, type ThemePreference } from '@/lib/theme';

export function initStudio() {
  const header = document.querySelector<HTMLElement>('.site-header');
  const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#main-nav');
  document.querySelectorAll<HTMLAnchorElement>('[data-language]').forEach((language) => {
    const syncLocation = () => {
      const target = new URL(language.href);
      target.search = location.search;
      target.hash = location.hash;
      language.href = target.href;
    };
    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    language.addEventListener('click', () => {
      syncLocation();
      const locale = new URL(language.href).pathname.split('/')[1];
      if (locale === 'id' || locale === 'en')
        document.cookie = `kexar-language=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    });
  });
  const colorScheme = matchMedia('(prefers-color-scheme: dark)');
  let preference: ThemePreference;
  try {
    preference = readThemePreference(localStorage);
  } catch {
    preference = 'system';
  }
  const themeControl = document.querySelector<HTMLSelectElement>('[data-theme-control]');
  const applyTheme = () => {
    const theme = resolveTheme(preference, colorScheme.matches);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0B0D10' : '#F7F6F2';
    if (themeControl) themeControl.value = preference;
    if (document.querySelector('.hero-photo')) {
      const width = innerWidth <= 800 ? 800 : 1600;
      document.documentElement.style.setProperty(
        '--hero-image',
        `url("/images/hero-${theme}-${width}.webp")`,
      );
    }
    window.dispatchEvent(new Event('kexar:theme'));
  };
  themeControl?.addEventListener('change', () => {
    preference = themeControl.value as ThemePreference;
    try {
      localStorage.setItem(themeKey, preference);
    } catch {}
    applyTheme();
  });
  colorScheme.addEventListener('change', applyTheme);
  window.addEventListener('storage', (event) => {
    if (event.key === themeKey) {
      try {
        preference = readThemePreference(localStorage);
      } catch {
        preference = 'system';
      }
      applyTheme();
    }
  });
  applyTheme();
  const setMenu = (open: boolean) => {
    menu?.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  };
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.querySelectorAll<HTMLElement>('[data-service-preview]').forEach((row) => {
    const select = () => {
      const image = row
        .closest('.services-display')
        ?.querySelector<HTMLImageElement>('[data-service-image]');
      if (image) image.src = `/images/${row.dataset.servicePreview}-800.webp`;
      row.parentElement?.querySelector('.is-selected')?.classList.remove('is-selected');
      row.classList.add('is-selected');
    };
    row.addEventListener('pointerenter', select);
    row.addEventListener('focusin', select);
    row.querySelector('button')?.addEventListener('click', select);
  });

  const process = document.querySelector('.process-list');
  if (process) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            process.querySelector('.is-current')?.classList.remove('is-current');
            entry.target.classList.add('is-current');
            const photo = document.querySelector<HTMLImageElement>('[data-process-photo]');
            const index = Array.from(process.children).indexOf(entry.target);
            if (photo)
              photo.src = `/images/${['library', 'hero-light', 'corporate-hero', 'litigation-hero', 'private-hero'][index]}-800.webp`;
          }
        }
      },
      { rootMargin: '-30% 0px -40% 0px' },
    );
    process.querySelectorAll('li').forEach((item) => observer.observe(item));
  }

  const desktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let destroyed = false;
  let lenis: import('lenis').default | undefined;
  const start = async () => {
    if (!canSmoothScroll(desktop.matches, reduced.matches)) return;
    const { default: Lenis } = await import('lenis');
    if (destroyed || !canSmoothScroll(desktop.matches, reduced.matches)) return;
    lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      duration: 0.9,
      prevent: (node) => !!node.closest('[data-lenis-prevent]'),
    });
  };
  const idle = window.setTimeout(start, 1000);
  const stop = () => {
    lenis?.destroy();
    lenis = undefined;
  };
  reduced.addEventListener('change', stop);
  desktop.addEventListener('change', stop);
  window.addEventListener(
    'pagehide',
    () => {
      destroyed = true;
      window.clearTimeout(idle);
      stop();
    },
    { once: true },
  );
}
