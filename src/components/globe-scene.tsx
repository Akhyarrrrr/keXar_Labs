import { useEffect, useState } from 'react';
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber';
import { Color, MeshPhongMaterial } from 'three';
import ThreeGlobe from 'three-globe';
import { SceneControls } from './orbit-controls';
import { regions } from '@/lib/regions';
import type { Theme } from '@/lib/theme';
type Props = {
  automatic: boolean;
  yaw: number;
  zoom: number;
  reset: number;
  theme: Theme;
  selected: string;
  onSelect: (id: string) => void;
  onInteract: () => void;
  onReady: () => void;
  onFailure: () => void;
};
const position = (lat: number, lng: number, radius = 102): [number, number, number] => {
  const phi = ((90 - lat) * Math.PI) / 180,
    theta = ((lng + 90) * Math.PI) / 180;
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
};
function World({ theme, automatic, selected, onSelect, onReady, onFailure }: Props) {
  const { gl, invalidate } = useThree();
  const [world, setWorld] = useState<ThreeGlobe>();
  useEffect(() => {
    const abort = new AbortController();
    let globe: ThreeGlobe | undefined;
    gl.domElement.addEventListener('webglcontextlost', onFailure);
    fetch('/brand/countries.json', { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw new Error('geography unavailable');
        return response.json();
      })
      .then((countries) => {
        if (abort.signal.aborted) return;
        globe = new ThreeGlobe({ animateIn: false });
        const dark = theme === 'dark';
        const material = globe.globeMaterial() as MeshPhongMaterial;
        material.color = new Color(dark ? '#101721' : '#e0dfd8');
        material.shininess = 25;
        globe
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.5)
          .hexPolygonColor(() => (dark ? '#b0bac8' : '#656e79'))
          .showAtmosphere(dark)
          .atmosphereColor('#afb8c5')
          .atmosphereAltitude(0.06)
          .arcsData(
            regions.map((region, i) => ({
              startLat: region.lat,
              startLng: region.lng,
              endLat: regions[(i + 1) % regions.length].lat,
              endLng: regions[(i + 1) % regions.length].lng,
            })),
          )
          .arcColor(() => (dark ? '#e7e8ec' : '#303c4e'))
          .arcStroke(0.3)
          .arcAltitudeAutoScale(0.35)
          .arcDashLength(0.6)
          .arcDashGap(0.4)
          .arcDashAnimateTime(3000);
        globe.pauseAnimation();
        setWorld(globe);
        invalidate();
        onReady();
      })
      .catch((error) => {
        if (error.name !== 'AbortError') onFailure();
      });
    return () => {
      abort.abort();
      gl.domElement.removeEventListener('webglcontextlost', onFailure);
      globe?.pauseAnimation();
      globe?._destructor();
      globe?.traverse((object) => {
        const mesh = object as typeof object & {
          geometry?: { dispose: () => void };
          material?: { dispose: () => void } | { dispose: () => void }[];
        };
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
        else mesh.material?.dispose();
      });
    };
  }, [theme, gl, invalidate, onReady, onFailure]);
  useEffect(() => {
    if (automatic) world?.resumeAnimation();
    else world?.pauseAnimation();
  }, [world, automatic]);
  const select = (event: ThreeEvent<MouseEvent>, id: string) => {
    event.stopPropagation();
    onSelect(id);
  };
  return (
    <group>
      {world && <primitive object={world} />}
      {regions.map((region) => (
        <mesh
          key={region.id}
          position={position(region.lat, region.lng)}
          onClick={(event) => select(event, region.id)}
        >
          <sphereGeometry args={[selected === region.id ? 2.1 : 1.1, 12, 12]} />
          <meshBasicMaterial color={theme === 'dark' ? '#fff' : '#15223d'} />
        </mesh>
      ))}
    </group>
  );
}
export default function GlobeScene(props: Props) {
  return (
    <div className="globe-canvas" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.35]}
        camera={{ position: [0, 35, 310], fov: 48, near: 1, far: 900 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[-200, 250, 200]} intensity={3} />
        <World {...props} />
        <SceneControls {...props} distance={310} />
      </Canvas>
    </div>
  );
}
