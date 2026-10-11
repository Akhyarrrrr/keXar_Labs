import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { SceneControls } from './orbit-controls';
import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PMREMGenerator,
  SRGBColorSpace,
  TextureLoader,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { Theme } from '@/lib/theme';
type Props = {
  material: 'stone' | 'platinum';
  light: number;
  yaw: number;
  reset: number;
  automatic: boolean;
  theme: Theme;
  onInteract: () => void;
  onReady: () => void;
  onFailure: () => void;
};
function Portal({ material, light, theme, onReady, onFailure }: Props) {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    gl.domElement.addEventListener('webglcontextlost', onFailure);
    return () => gl.domElement.removeEventListener('webglcontextlost', onFailure);
  }, [gl, onFailure]);
  useEffect(() => invalidate(), [material, light, theme, invalidate]);
  useEffect(() => {
    let disposed = false;
    const previous = scene.environment;
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    let environment = pmrem.fromScene(room);
    scene.environment = environment.texture;
    onReady();
    const texture = new TextureLoader().load(
      '/images/hero-light-800.webp',
      (photo) => {
        if (disposed) return;
        photo.colorSpace = SRGBColorSpace;
        const accent = new Mesh(
          new PlaneGeometry(7, 4),
          new MeshBasicMaterial({ map: photo, color: '#777777' }),
        );
        accent.position.set(-8, 3, -12);
        room.add(accent);
        environment.dispose();
        environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        invalidate();
      },
      undefined,
      onFailure,
    );
    return () => {
      disposed = true;
      scene.environment = previous;
      texture.dispose();
      environment.dispose();
      room.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, invalidate, onReady, onFailure]);
  const metal = material === 'platinum';
  return (
    <>
      <ambientLight intensity={metal ? 0.5 : 1.1} />
      <directionalLight
        castShadow
        position={[Math.cos(light) * 6, 7, Math.sin(light) * 6]}
        intensity={4}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-5, 1, -4]} intensity={metal ? 3 : 0.8} color="#ced8e7" />
      <group position={[0, -0.3, 0]} rotation={[0, -0.3, 0]}>
        {[
          { p: [-1.5, 0, 0], s: [0.55, 4.6, 0.85] },
          { p: [1.5, 0, 0], s: [0.55, 4.6, 0.85] },
          { p: [0, 2.05, 0], s: [3.55, 0.55, 0.85] },
          { p: [0, -2.4, 0], s: [4.4, 0.2, 2] },
        ].map((part, i) => (
          <mesh key={i} castShadow receiveShadow position={part.p as [number, number, number]}>
            <boxGeometry args={part.s as [number, number, number]} />
            <meshPhysicalMaterial
              color={metal ? '#e0e3e7' : '#d6d1c5'}
              metalness={metal ? 1 : 0.02}
              roughness={metal ? 0.16 : 0.88}
              clearcoat={metal ? 0.35 : 0}
              envMapIntensity={0.65}
            />
          </mesh>
        ))}
        {[0.3, 0.6, 0.9].map((z, i) => (
          <group key={z} position={[0, 0, -z]} scale={1 - (i + 1) * 0.07}>
            <mesh position={[-1.5, 0, 0]}>
              <boxGeometry args={[0.12, 4.5, 0.12]} />
              <meshStandardMaterial
                color={metal ? '#a9adb6' : '#bdb6a9'}
                metalness={metal ? 0.7 : 0.05}
                roughness={metal ? 0.2 : 0.85}
              />
            </mesh>
            <mesh position={[1.5, 0, 0]}>
              <boxGeometry args={[0.12, 4.5, 0.12]} />
              <meshStandardMaterial
                color={metal ? '#a9adb6' : '#bdb6a9'}
                metalness={metal ? 0.7 : 0.05}
                roughness={metal ? 0.2 : 0.85}
              />
            </mesh>
            <mesh position={[0, 2.05, 0]}>
              <boxGeometry args={[3.1, 0.12, 0.12]} />
              <meshStandardMaterial
                color={metal ? '#a9adb6' : '#bdb6a9'}
                metalness={metal ? 0.7 : 0.05}
                roughness={metal ? 0.2 : 0.85}
              />
            </mesh>
          </group>
        ))}
      </group>
      <mesh receiveShadow position={[0, -2.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={theme === 'dark' ? 0.45 : 0.16} />
      </mesh>
    </>
  );
}
export default function PortalScene(props: Props) {
  return (
    <div className="craft-canvas" aria-hidden="true">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 1.35]}
        camera={{ position: [0, 1, 8.8], fov: 43 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <Portal {...props} />
        <SceneControls {...props} distance={8.8} />
      </Canvas>
    </div>
  );
}
