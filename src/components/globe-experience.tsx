import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useAdaptiveScene } from './use-adaptive-scene';
import { useStudioTheme } from './use-theme';
import { SceneBoundary } from './scene-boundary';
import type { Locale } from '@/lib/content';
import { regions } from '@/lib/regions';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, MinusIcon } from '@phosphor-icons/react';
const GlobeScene = lazy(() => import('./globe-scene'));
export function GlobeExperience({ locale }: { locale: Locale }) {
  const scene = useAdaptiveScene(),
    theme = useStudioTheme(),
    id = locale === 'id';
  const [failed, setFailed] = useState(false),
    [live, setLive] = useState(false);
  const [yaw, setYaw] = useState(0),
    [zoom, setZoom] = useState(1),
    [reset, setReset] = useState(0);
  const [selected, setSelected] = useState<string>('asia');
  const onReady = useCallback(() => setLive(true), []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setLive(false);
  }, []);
  const onInteract = useCallback(() => scene.setPaused(true), [scene.setPaused]);
  const onSelect = useCallback(
    (region: string) => {
      setSelected(region);
      scene.setPaused(true);
    },
    [scene.setPaused],
  );
  useEffect(() => {
    if (!scene.active) setLive(false);
  }, [scene.active]);
  const region = regions.find((item) => item.id === selected)!;
  return (
    <div ref={scene.ref} className={`globe-experience ${live ? 'is-live' : ''}`}>
      <div className="globe-visual">
        <img
          className="globe-fallback"
          src={`/brand/globe-${theme}.svg`}
          alt=""
          width="800"
          height="560"
          loading="lazy"
        />
        {scene.active && !failed && (
          <SceneBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <GlobeScene
                automatic={scene.automatic}
                yaw={yaw}
                zoom={zoom}
                reset={reset}
                theme={theme}
                selected={selected}
                onSelect={onSelect}
                onInteract={onInteract}
                onReady={onReady}
                onFailure={onFailure}
              />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      <p className="scene-hint">
        {failed
          ? id
            ? 'Mode visual statis. Wilayah tetap dapat dijelajahi di bawah.'
            : 'Static view. You can still explore each region below.'
          : id
            ? 'Geser untuk memutar. Pilih titik atau wilayah untuk menjelajahi.'
            : 'Drag to rotate. Select a point or region to explore.'}
      </p>
      {scene.eligible && !failed && (
        <div className="scene-controls">
          <button
            onClick={() => {
              onInteract();
              setYaw(yaw - 0.4);
            }}
            aria-label={id ? 'Putar globe ke kiri' : 'Rotate globe left'}
          >
            <ArrowLeftIcon size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              onInteract();
              setYaw(yaw + 0.4);
            }}
            aria-label={id ? 'Putar globe ke kanan' : 'Rotate globe right'}
          >
            <ArrowRightIcon size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              onInteract();
              setZoom(Math.max(0.85, zoom - 0.1));
            }}
            aria-label={id ? 'Perbesar globe' : 'Zoom globe in'}
          >
            <PlusIcon size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              onInteract();
              setZoom(Math.min(1.25, zoom + 0.1));
            }}
            aria-label={id ? 'Perkecil globe' : 'Zoom globe out'}
          >
            <MinusIcon size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              setYaw(0);
              setZoom(1);
              setReset(reset + 1);
              onInteract();
            }}
          >
            {id ? 'Atur ulang' : 'Reset'}
          </button>
          <button
            onClick={() => scene.setPaused(!scene.paused)}
            aria-pressed={scene.paused}
            disabled={!scene.autoAllowed}
          >
            {scene.paused
              ? id
                ? 'Rotasi otomatis'
                : 'Auto rotate'
              : id
                ? 'Jeda rotasi'
                : 'Pause rotation'}
          </button>
        </div>
      )}
      <div
        className="region-choices"
        role="group"
        aria-label={id ? 'Wilayah ilustratif' : 'Illustrative regions'}
      >
        {regions.map((item) => (
          <button
            key={item.id}
            aria-pressed={selected === item.id}
            onClick={() => onSelect(item.id)}
          >
            {id ? item.idName : item.en}
          </button>
        ))}
      </div>
      <p className="region-description" aria-live="polite">
        {id ? region.idNote : region.enNote}
      </p>
    </div>
  );
}
