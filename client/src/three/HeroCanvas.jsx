import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function FloatingCube() {
  const cubeRef = useRef();

  useFrame(() => {
    cubeRef.current.rotation.y += 0.01; // smooth rotation
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls enableZoom={false} />
      <FloatingCube />
    </Canvas>
  );
}
