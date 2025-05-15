// src/app/components/LibraryScene.jsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';

// 검색 전 기본 애니메이션: 스피닝 책
function SpinningBook() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial
        color="#f5f5f5"
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  );
}

// 검색 결과 책 컴포넌트
function Book({ startPos, targetPos }) {
  const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current.position,
      { x: startPos[0], y: startPos[1], z: startPos[2] },
      {
        x: targetPos[0],
        y: targetPos[1],
        z: targetPos[2],
        duration: 1,
        ease: 'back.out(1.7)',
      }
    );
  }, [startPos, targetPos]);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial
        color="#f5f5f5"
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  );
}

export default function LibraryScene({ entries = [] }) {
  const [books, setBooks] = useState([]);

  // entries 변경 시 books 배열 갱신
  useEffect(() => {
    const newBooks = entries.map((entry, i) => ({
      id: entry.id,
      startPos: [Math.random() * 10 - 5, Math.random() * 6 - 3, -10],
      targetPos: [ (i - entries.length / 2) * 1.5, 0, 0 ],
    }));
    setBooks(newBooks);
  }, [entries]);

  const hasEntries = books.length > 0;

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* 배경 색 */}
        <color attach="background" args={['#111111']} />

        {/* 조명 */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* 환경 매핑 */}
        <Environment preset="warehouse" background={false} />

        {/* 검색 전/후 렌더링 분기 */}
        {hasEntries
          ? books.map(b => (
              <Book
                key={b.id}
                startPos={b.startPos}
                targetPos={b.targetPos}
              />
            ))
          : <SpinningBook />
        }

        {/* (선택) 디버그용 카메라 컨트롤 */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* 검색 전 안내 메시지 (pointer-events-none로 클릭 방해 없음) */}
      {!hasEntries && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-500 text-lg">
            검색어를 입력하고 엔터를 눌러보세요!
          </p>
        </div>
      )}
    </div>
  );
}