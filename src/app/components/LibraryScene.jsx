// src/components/LibraryScene.jsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SpinningBox() {
  const ref = useRef();
  // 매 프레임마다 조금씩 회전
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function LibraryScene() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SpinningBox />
      </Canvas>
    </div>
  );
}