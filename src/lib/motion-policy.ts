export const canSmoothScroll = (desktop: boolean, reducedMotion: boolean) =>
  desktop && !reducedMotion;
export const canRender3D = (cores = 4) => cores >= 4;
