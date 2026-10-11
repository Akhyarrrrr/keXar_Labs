import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useAdaptiveScene } from './use-adaptive-scene';
import { useStudioTheme } from './use-theme';
import { SceneBoundary } from './scene-boundary';
import type { Locale } from '@/lib/content';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
const PortalScene = lazy(() => import('./portal-scene'));
export function CraftExperience({ locale }: { locale: Locale }) {
  const scene = useAdaptiveScene(),
    theme = useStudioTheme(),
    id = locale === 'id';
  const [material, setMaterial] = useState<'stone' | 'platinum'>('stone'),
    [light, setLight] = useState(0.8);
  const [yaw, setYaw] = useState(0),
    [reset, setReset] = useState(0),
    [failed, setFailed] = useState(false),
    [live, setLive] = useState(false);
  const onReady = useCallback(() => setLive(true), []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setLive(false);
  }, []);
  const onInteract = useCallback(() => scene.setPaused(true), [scene.setPaused]);
  useEffect(() => {
    if (!scene.active) setLive(false);
  }, [scene.active]);
  return (
    <div
      id="portal-controls"
      tabIndex={-1}
      ref={scene.ref}
      className={`craft-experience ${live ? 'is-live' : ''}`}
    >
      <div className="craft-visual">
        <img
          className="craft-poster"
          src={`/brand/portal-${theme}.svg`}
          width="700"
          height="560"
          alt=""
          loading="lazy"
        />
        {scene.active && !failed && (
          <SceneBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <PortalScene
                material={material}
                light={light}
                yaw={yaw}
                reset={reset}
                automatic={scene.automatic}
                theme={theme}
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
            ? 'Visual statis: 3D tidak tersedia pada perangkat ini.'
            : 'Static view: 3D is unavailable on this device.'
          : id
            ? 'Geser portal untuk menemukan sudut pandang Anda.'
            : 'Drag the portal to find your perspective.'}
      </p>
      {!failed && scene.eligible && (
        <>
          <div
            className="material-controls"
            role="group"
            aria-label={id ? 'Material portal' : 'Portal material'}
          >
            <button
              aria-pressed={material === 'stone'}
              onClick={() => {
                onInteract();
                setMaterial('stone');
              }}
            >
              {id ? 'Batu' : 'Stone'}
            </button>
            <button
              aria-pressed={material === 'platinum'}
              onClick={() => {
                onInteract();
                setMaterial('platinum');
              }}
            >
              Platinum
            </button>
          </div>
          <label className="light-control">
            {id ? 'Arah cahaya' : 'Light direction'}
            <input
              type="range"
              min="0"
              max="6.28"
              step=".05"
              value={light}
              onChange={(event) => {
                onInteract();
                setLight(Number(event.target.value));
              }}
            />
          </label>
          <div className="scene-controls">
            <button
              onClick={() => {
                onInteract();
                setYaw(yaw - 0.4);
              }}
              aria-label={id ? 'Putar portal ke kiri' : 'Rotate portal left'}
            >
              <ArrowLeftIcon size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                onInteract();
                setYaw(yaw + 0.4);
              }}
              aria-label={id ? 'Putar portal ke kanan' : 'Rotate portal right'}
            >
              <ArrowRightIcon size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                setMaterial('stone');
                setLight(0.8);
                setYaw(0);
                setReset(reset + 1);
                onInteract();
              }}
            >
              {id ? 'Atur ulang' : 'Reset'}
            </button>
            <button
              aria-pressed={scene.paused}
              disabled={!scene.autoAllowed}
              onClick={() => scene.setPaused(!scene.paused)}
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
        </>
      )}
    </div>
  );
}
