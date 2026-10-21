const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
function smoothRange(value: number, start: number, end: number) {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}
export function journeyProgress(
  scroll: number,
  top: number,
  height: number,
  viewport: number,
) {
  return clamp((scroll - top) / Math.max(1, height - viewport));
}
// All motion is derived from scroll; revisiting a position restores the same composition.
export function journeyPose(progress: number) {
  const p = clamp(progress);
  return {
    push: smoothRange(p, 0, 0.4),
    frame: smoothRange(p, 0.32, 0.82),
    hero: 1 - smoothRange(p, 0.2, 0.38),
    preview: smoothRange(p, 0.42, 0.63),
    copy: smoothRange(p, 0.64, 0.86),
  };
}
