import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function SceneControls({
  automatic,
  yaw,
  zoom = 1,
  reset,
  distance,
  onInteract,
}: {
  automatic: boolean;
  yaw: number;
  zoom?: number;
  reset: number;
  distance: number;
  onInteract: () => void;
}) {
  const { camera, gl, invalidate } = useThree();
  const control = useRef<OrbitControls | null>(null);
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    control.current = controls;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.autoRotateSpeed = 0.4;
    controls.minPolarAngle = 0.2;
    controls.maxPolarAngle = Math.PI - 0.2;
    gl.domElement.style.touchAction = 'pan-y';
    controls.addEventListener('change', () => invalidate());
    controls.addEventListener('start', onInteract);
    return () => {
      controls.dispose();
      control.current = null;
    };
  }, [camera, gl, invalidate, onInteract]);
  useEffect(() => {
    camera.position.set(
      Math.sin(yaw) * distance * zoom,
      distance * 0.12,
      Math.cos(yaw) * distance * zoom,
    );
    control.current?.target.set(0, 0, 0);
    control.current?.update();
    invalidate();
  }, [yaw, zoom, reset, distance, camera, invalidate]);
  useEffect(() => {
    if (control.current) control.current.autoRotate = automatic;
    invalidate();
  }, [automatic, invalidate]);
  useFrame((_, delta) => {
    if (automatic) {
      control.current?.update(delta);
      invalidate();
    }
  });
  return null;
}
