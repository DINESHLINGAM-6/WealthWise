import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";

// Simple animated “coin/brain-ish” sphere
function Coin() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <Suspense fallback={null}>
        <Coin />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
