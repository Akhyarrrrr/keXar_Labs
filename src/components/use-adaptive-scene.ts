import { useEffect, useRef, useState } from 'react';
import { canRender3D } from '@/lib/motion-policy';
export function useAdaptiveScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  useEffect(() => {
    const desktop = matchMedia('(min-width:1024px) and (pointer:fine)');
    const reduced = matchMedia('(prefers-reduced-motion:reduce)');
    const update = () => {
      setEligible(canRender3D(navigator.hardwareConcurrency || 4));
      setAutomatic(desktop.matches && !reduced.matches);
    };
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    let intersecting = false;
    const visibility = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      visibility();
    });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return {
    ref,
    eligible,
    visible,
    paused,
    setPaused,
    autoAllowed: automatic,
    automatic: automatic && !paused,
    active: eligible && visible,
  };
}
