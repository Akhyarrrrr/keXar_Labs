export const headquartersChapters = [
  'arrival',
  'lobby',
  'capabilities',
  'process',
  'showcase',
  'delivery',
  'conversation',
] as const;
export type HeadquartersChapter = (typeof headquartersChapters)[number];
export const FRAME_COUNT = 48;
export const headquartersManifest = {
  fps: 24,
  profiles: { desktop: { width: 960, height: 600 }, mobile: { width: 480, height: 720 } },
  chapters: headquartersChapters.map((id) => ({
    id,
    anchor: `#${id}`,
    posters: {
      desktop: `/media/headquarters/posters/${id}-desktop.webp`,
      mobile: `/media/headquarters/posters/${id}-mobile.webp`,
    },
  })),
  transitions: headquartersChapters
    .slice(0, -1)
    .map((from, index) => ({
      from,
      to: headquartersChapters[index + 1],
      frameCount: FRAME_COUNT,
      scrollElement: `.hq-transition[data-transition="${index}"]`,
      firstFrame: 0,
      lastFrame: FRAME_COUNT - 1,
    })),
};
export function frameURL(transition: number, frame: number, mobile = false) {
  if (
    !Number.isInteger(transition) ||
    transition < 0 ||
    transition > 5 ||
    !Number.isInteger(frame) ||
    frame < 0 ||
    frame >= FRAME_COUNT
  )
    throw new RangeError('Invalid headquarters frame');
  return `/media/headquarters/frames/${mobile ? 'mobile' : 'desktop'}/${String(transition).padStart(2, '0')}-${headquartersChapters[transition]}-${headquartersChapters[transition + 1]}/${String(frame).padStart(4, '0')}.webp`;
}
export function frameAtScroll(scroll: number, intervals: { start: number; end: number }[]) {
  if (!intervals.length) return { transition: 0, frame: 0, chapter: 0, moving: false };
  for (let i = 0; i < intervals.length; i++) {
    const { start, end } = intervals[i];
    if (scroll < start)
      return {
        transition: Math.max(0, i - 1),
        frame: i ? FRAME_COUNT - 1 : 0,
        chapter: i,
        moving: false,
      };
    if (scroll <= end) {
      const phase = end > start ? Math.max(0, Math.min(1, (scroll - start) / (end - start))) : 0;
      const frame = Math.round(phase * (FRAME_COUNT - 1));
      return {
        transition: i,
        frame,
        chapter: phase < 0.5 ? i : i + 1,
        moving: frame > 0 && frame < FRAME_COUNT - 1,
      };
    }
  }
  return {
    transition: Math.max(0, intervals.length - 1),
    frame: FRAME_COUNT - 1,
    chapter: intervals.length,
    moving: false,
  };
}
