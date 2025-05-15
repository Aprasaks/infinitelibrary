// src/components/LibraryScene.jsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

function SpinningBook() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      {/* 책 형태로 약간 두께 늘리기 */}
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial 
        color="#f5f5f5"    // 약간 아이보리빛
        metalness={0.2}    // 살짝 반짝이게
        roughness={0.7}    // 부드럽지만 광택 살짝
      />
    </mesh>
  );
}

export default function LibraryScene() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* 렌더러 배경 컬러 (검은빛) */}
        <color attach="background" args={['#111111']} />
        
        {/* 조명 */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        {/* 환경 매핑 (공간감) */}
        <Environment preset="warehouse" background={false} />

        {/* 회전하는 책 */}
        <SpinningBook />

        {/* 디버그용 카메라 컨트롤 (나중에 제거 가능) */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}