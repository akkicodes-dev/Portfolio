import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Floating Particles Component
interface ParticlesProps {
  count: number;
}

const Particles = ({ count }: ParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color('#00d9ff');
    const color2 = new THREE.Color('#9333ea');
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Spread across 3D space
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const mixed = Math.random();
      const c = mixed < 0.4 ? color1 : mixed < 0.7 ? color2 : color3;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Transmission Glass Crystal Icosahedron
interface CrystalProps {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
}

const Crystal = ({ isLowEnd, prefersReducedMotion }: CrystalProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);
  const { pointer } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      scrollOffset.current = window.scrollY * 0.002;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (!prefersReducedMotion) {
      // Smooth lerp mouse reaction
      targetRotation.current.x = pointer.y * 0.5;
      targetRotation.current.y = pointer.x * 0.7;

      // Idle rotation + mouse tilt + scroll interaction
      const idleSpeed = delta * 0.35;
      meshRef.current.rotation.y += idleSpeed;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x + scrollOffset.current * 0.6,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -targetRotation.current.y * 0.3,
        0.05
      );

      // Parallax position shift on scroll
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        -scrollOffset.current * 0.8,
        0.05
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.5;
      coreRef.current.rotation.y -= delta * 0.6;
    }
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 2}
      rotationIntensity={prefersReducedMotion ? 0 : 0.4}
      floatIntensity={prefersReducedMotion ? 0 : 0.6}
    >
      <group position={[0, 0, 0]}>
        {/* Outer Glass Icosahedron */}
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 0]} />
          {isLowEnd ? (
            <meshPhysicalMaterial
              roughness={0.1}
              transmission={0.6}
              thickness={1.2}
              ior={1.4}
              color="#00d9ff"
              emissive="#002b3d"
              transparent
              opacity={0.8}
            />
          ) : (
            <MeshTransmissionMaterial
              samples={6}
              resolution={384}
              thickness={1.4}
              roughness={0.08}
              ior={1.45}
              chromaticAberration={0.06}
              anisotropy={0.1}
              distortion={0.2}
              distortionScale={0.3}
              temporalDistortion={0.1}
              color="#e0f9ff"
              attenuationColor="#00d9ff"
              attenuationDistance={1.2}
              background={new THREE.Color('#0b0f1a')}
            />
          )}
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={coreRef} scale={0.75}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#00d9ff"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Ambient Point Light inside crystal */}
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#00d9ff" distance={6} />
      </group>
    </Float>
  );
};

export const Hero3DScene = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    // Check low-end device specifications
    const lowCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;
    const isMobileWidth = window.innerWidth < 768;
    setIsLowEnd(lowCores || isMobileWidth);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Pause rendering when tab is hidden to conserve GPU/battery
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const particleCount = isLowEnd ? 200 : 800;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, Math.min(1.75, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)]}
        frameloop={isTabVisible ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-6, -4, 2]} intensity={2} color="#2c0454" />
        <pointLight position={[6, 4, 3]} intensity={2.5} color="#00d9ff" />

        {/* Floating Particles (~800 on desktop, 200 on low-end) */}
        <Particles count={particleCount} />

        {/* Transmission Crystal Centerpiece */}
        <Crystal isLowEnd={isLowEnd} prefersReducedMotion={prefersReducedMotion} />

        {/* Subtle Postprocessing Bloom */}
        {!isLowEnd && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.35}
              luminanceThreshold={0.75}
              luminanceSmoothing={0.25}
              radius={0.5}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
