import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows } from "@react-three/drei";

function FloatingShape({ geometry, color, position, speed }) {
  return (
    <Float
      speed={speed} // Animation speed
      rotationIntensity={1} // XYZ rotation intensity
      floatIntensity={2} // Up/down float intensity
      floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="cyan" />

      <group position={[0, -0.5, 0]}>
        {/* Main Center Piece */}
        <FloatingShape
          geometry={<icosahedronGeometry args={[1.4, 0]} />}
          color="#14b8a6" // Teal
          position={[0, 0, 0]}
          speed={1.5}
        />

        {/* Orbiting Shapes */}
        <FloatingShape
          geometry={<torusKnotGeometry args={[0.6, 0.2, 128, 16]} />}
          color="#818cf8" // Indigo
          position={[-2.5, 1, -1]}
          speed={2}
        />

        <FloatingShape
          geometry={<octahedronGeometry args={[0.8]} />}
          color="#f472b6" // Pink
          position={[2.5, -1, 0.5]}
          speed={1.8}
        />

        <FloatingShape
          geometry={<sphereGeometry args={[0.4, 32, 32]} />}
          color="#fbbf24" // Amber/Gold
          position={[1.5, 2, -2]}
          speed={2.5}
        />
      </group>

      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4.5}
      />

      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
      <Environment preset="city" />
    </Canvas>
  );
}
