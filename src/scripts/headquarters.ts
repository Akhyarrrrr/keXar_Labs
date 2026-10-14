import { frameAtScroll, frameURL, headquartersManifest, FRAME_COUNT } from '@/lib/headquarters';

export function initHeadquarters() {
  const root = document.querySelector<HTMLElement>('[data-headquarters]');
  const stage = root?.querySelector<HTMLElement>('.hq-stage');
  const canvas = stage?.querySelector('canvas');
  const poster = stage?.querySelector('img');
  const source = stage?.querySelector('source');
  const context = canvas?.getContext('2d', { alpha: false });
  if (!root || !stage || !canvas || !poster || !context) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const portrait = matchMedia('(max-width: 700px)');
  const cache = new Map<string, ImageBitmap>();
  const pending = new Map<string, AbortController>();
  const failed = new Set<string>();
  let queue: string[] = [],
    desired: string[] = [],
    intervals: { start: number; end: number }[] = [];
  let tick = 0,
    enabled = !reduced.matches,
    currentKey = '',
    currentChapter = 0,
    posterRequest = 0;
  let openingHeight = 0,
    fullHeight = 0;
  let position = frameAtScroll(0, []);
  const MAX_DECODED = 12,
    MAX_REQUESTS = 3;
  const measure = () => {
    const header = document.querySelector('.hq-header')?.getBoundingClientRect().height || 60;
    openingHeight = root.querySelector<HTMLElement>('.hq-arrival')!.offsetHeight;
    fullHeight = innerHeight - header;
    intervals = headquartersManifest.transitions.map((item) => {
      const element = root.querySelector<HTMLElement>(item.scrollElement)!;
      const start = element.getBoundingClientRect().top + scrollY - header;
      return { start, end: start + element.offsetHeight };
    });
    resizeCanvas();
    currentKey = '';
  };
  const resizeCanvas = () => {
    const scale = Math.min(
      1.5,
      devicePixelRatio,
      1600 / stage.clientWidth,
      1200 / stage.clientHeight,
    );
    canvas.width = Math.max(1, Math.round(stage.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(stage.clientHeight * scale));
  };
  const paint = () => {
    const url = frameURL(position.transition, position.frame, portrait.matches);
    const bitmap = cache.get(url);
    stage.dataset.ready = String(Boolean(bitmap && position.moving));
    stage.dataset.moving = String(position.moving);
    stage.dataset.frame = String(position.frame);
    stage.dataset.currentTransition = String(position.transition);
    stage.dataset.decoded = String(cache.size);
    stage.dataset.pending = String(pending.size);
    stage.dataset.failures = String(failed.size);
    if (!bitmap || !position.moving) return;
    const scale = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
    const width = bitmap.width * scale,
      height = bitmap.height * scale;
    context.drawImage(
      bitmap,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height,
    );
  };
  const pump = () => {
    while (enabled && pending.size < MAX_REQUESTS && queue.length) {
      const url = queue.shift()!;
      if (cache.has(url) || pending.has(url) || failed.has(url)) continue;
      const controller = new AbortController();
      pending.set(url, controller);
      fetch(url, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error('Frame unavailable');
          return response.blob();
        })
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          if (!enabled || !desired.includes(url)) {
            bitmap.close();
            return;
          }
          cache.set(url, bitmap);
          while (cache.size > MAX_DECODED) {
            const stale =
              [...cache.keys()].find((key) => !desired.includes(key)) || cache.keys().next().value!;
            cache.get(stale)!.close();
            cache.delete(stale);
          }
          paint();
        })
        .catch((error) => {
          if (error.name !== 'AbortError') failed.add(url);
        })
        .finally(() => {
          pending.delete(url);
          paint();
          pump();
        });
    }
  };
  const update = () => {
    tick = 0;
    if (!enabled || document.hidden) return;
    const openingProgress = Math.max(0, Math.min(1, scrollY / (intervals[0]?.start || 1)));
    stage.style.setProperty(
      '--hq-stage-height',
      `${Math.round(openingHeight + (fullHeight - openingHeight) * openingProgress)}px`,
    );
    position = frameAtScroll(scrollY, intervals);
    if (currentChapter !== position.chapter) {
      currentChapter = position.chapter;
      const chapter = headquartersManifest.chapters[currentChapter];
      stage.dataset.chapter = chapter.id;
      const request = ++posterRequest,
        replacement = new Image();
      replacement.src = portrait.matches ? chapter.posters.mobile : chapter.posters.desktop;
      replacement
        .decode()
        .then(() => {
          if (request !== posterRequest) return;
          poster.src = chapter.posters.desktop;
          if (source) source.srcset = chapter.posters.mobile;
          stage.dataset.poster = chapter.id;
        })
        .catch(() => {
          stage.dataset.posterFallback = 'true';
        });
    }
    const key = `${portrait.matches}/${position.transition}/${position.frame}`;
    if (key !== currentKey) {
      currentKey = key;
      desired = [0, 1, -1, 2, -2, 3, -3, 4, -4]
        .map((offset) => position.frame + offset)
        .filter((frame) => frame >= 0 && frame < FRAME_COUNT)
        .map((frame) => frameURL(position.transition, frame, portrait.matches));
      queue = desired.filter((url) => !cache.has(url) && !pending.has(url) && !failed.has(url));
      for (const [url, request] of pending) if (!desired.includes(url)) request.abort();
      pump();
    }
    paint();
  };
  const schedule = () => {
    if (!tick) tick = requestAnimationFrame(update);
  };
  const toggle = () => {
    enabled = !reduced.matches;
    root.classList.toggle('hq-cinematic', enabled);
    if (!enabled) {
      for (const request of pending.values()) request.abort();
      for (const bitmap of cache.values()) bitmap.close();
      cache.clear();
      queue = [];
      desired = [];
      stage.dataset.ready = 'false';
    }
    measure();
    schedule();
  };
  reduced.addEventListener('change', toggle);
  portrait.addEventListener('change', () => {
    currentKey = '';
    currentChapter = -1;
    measure();
    schedule();
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener(
    'resize',
    () => {
      measure();
      schedule();
    },
    { passive: true },
  );
  document.addEventListener('visibilitychange', schedule);
  new ResizeObserver(() => {
    measure();
    schedule();
  }).observe(root);
  new ResizeObserver(() => {
    resizeCanvas();
    schedule();
  }).observe(stage);
  toggle();
  if (
    enabled &&
    headquartersManifest.chapters.some((chapter) => chapter.anchor === location.hash)
  ) {
    requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
  }
}
