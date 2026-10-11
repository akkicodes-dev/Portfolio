import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { damp } from 'maath/easing';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { siteContent } from '../../data/content';

// Shard Geometry Generator with CPU-sampled Alpha Silhouette
function createShatterGeometry(image: HTMLImageElement, isMobile: boolean) {
  const cols = isMobile ? 18 : 28;
  const rows = isMobile ? 26 : 40;

  // Render image to canvas to sample alpha
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(image, 0, 0);
  }
  const imgData = ctx?.getImageData(0, 0, image.width, image.height).data;

  const aspect = image.width / image.height;
  const height = 4.2; // in Three.js world units (~80vh in fov 35)
  const width = height * aspect;

  const positions: number[] = [];
  const uvs: number[] = [];
  const centroids: number[] = [];
  const randomDirs: number[] = [];
  const rotAxes: number[] = [];
  const randomSpeeds: number[] = [];
  const delays: number[] = [];

  const dx = width / cols;
  const dy = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Quad corners in local coordinates [-width/2..width/2, -height/2..height/2]
      const x0 = -width / 2 + c * dx;
      const x1 = x0 + dx;
      const y0 = -height / 2 + r * dy;
      const y1 = y0 + dy;

      const u0 = c / cols;
      const u1 = (c + 1) / cols;
      const v0 = r / rows;
      const v1 = (r + 1) / rows;

      // Triangle 1: (x0, y0), (x1, y0), (x0, y1)
      const uMid1 = (u0 + u1 + u0) / 3;
      const vMid1 = (v0 + v0 + v1) / 3;
      const px1 = Math.floor(uMid1 * image.width);
      const py1 = Math.floor((1 - vMid1) * image.height);
      const idx1 = (py1 * image.width + px1) * 4 + 3;
      const alpha1 = imgData ? imgData[idx1] : 255;

      if (alpha1 > 25) {
        addTriangle(
          [x0, y0, 0], [x1, y0, 0], [x0, y1, 0],
          [u0, v0], [u1, v0], [u0, v1]
        );
      }

      // Triangle 2: (x1, y0), (x1, y1), (x0, y1)
      const uMid2 = (u1 + u1 + u0) / 3;
      const vMid2 = (v0 + v1 + v1) / 3;
      const px2 = Math.floor(uMid2 * image.width);
      const py2 = Math.floor((1 - vMid2) * image.height);
      const idx2 = (py2 * image.width + px2) * 4 + 3;
      const alpha2 = imgData ? imgData[idx2] : 255;

      if (alpha2 > 25) {
        addTriangle(
          [x1, y0, 0], [x1, y1, 0], [x0, y1, 0],
          [u1, v0], [u1, v1], [u0, v1]
        );
      }
    }
  }

  function addTriangle(
    p0: number[], p1: number[], p2: number[],
    uv0: number[], uv1: number[], uv2: number[]
  ) {
    const cx = (p0[0] + p1[0] + p2[0]) / 3;
    const cy = (p0[1] + p1[1] + p2[1]) / 3;
    const cz = (p0[2] + p1[2] + p2[2]) / 3;

    // Outward vector from vertical center axis with z-scatter
    const dirX = cx + (Math.random() - 0.5) * 1.5;
    const dirY = (Math.random() - 0.2) * 2.0;
    const dirZ = (Math.random() - 0.5) * 3.5;
    const dirLen = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ) || 1;

    // Random rotation axis
    const rx = (Math.random() - 0.5) * 2;
    const ry = (Math.random() - 0.5) * 2;
    const rz = (Math.random() - 0.5) * 2;
    const rLen = Math.sqrt(rx * rx + ry * ry + rz * rz) || 1;

    const speed = 0.8 + Math.random() * 0.9;
    const delay = Math.random();

    for (let i = 0; i < 3; i++) {
      centroids.push(cx, cy, cz);
      randomDirs.push(dirX / dirLen, dirY / dirLen, dirZ / dirLen);
      rotAxes.push(rx / rLen, ry / rLen, rz / rLen);
      randomSpeeds.push(speed);
      delays.push(delay);
    }

    positions.push(...p0, ...p1, ...p2);
    uvs.push(...uv0, ...uv1, ...uv2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('aCentroid', new THREE.Float32BufferAttribute(centroids, 3));
  geometry.setAttribute('aRandomDir', new THREE.Float32BufferAttribute(randomDirs, 3));
  geometry.setAttribute('aRotAxis', new THREE.Float32BufferAttribute(rotAxes, 3));
  geometry.setAttribute('aSpeed', new THREE.Float32BufferAttribute(randomSpeeds, 1));
  geometry.setAttribute('aDelay', new THREE.Float32BufferAttribute(delays, 1));

  return { geometry, width, height };
}

// Custom Shatter Shader Material with Signature Cursor Ripple Interaction
const ShatterShader = {
  vertexShader: `
    uniform float uProgress;
    uniform float uTime;
    uniform float uHeight;
    uniform float uReassemble;
    uniform vec2 uPointerPos;
    uniform float uRippleStrength;

    attribute vec3 aCentroid;
    attribute vec3 aRandomDir;
    attribute vec3 aRotAxis;
    attribute float aSpeed;
    attribute float aDelay;

    varying vec2 vUv;
    varying float vShardProgress;
    varying float vAlphaFade;

    // Rodrigues' rotation formula
    vec3 rotateAroundAxis(vec3 v, vec3 axis, float angle) {
      return v * cos(angle) + cross(axis, v) * sin(angle) + axis * dot(axis, v) * (1.0 - cos(angle));
    }

    float easeOutCubic(float x) {
      return 1.0 - pow(1.0 - x, 3.0);
    }

    void main() {
      vUv = uv;

      // Shatter travels FROM FEET (bottom, normY=0) UPWARD (head, normY=1)
      float normY = clamp((aCentroid.y + (uHeight * 0.5)) / uHeight, 0.0, 1.0);
      float breakThreshold = normY * 0.65 + aDelay * 0.35;

      // Local progress for this shard (0..1)
      float activeProg = 0.0;

      // Handling bidirectional scatter and end reassembly
      if (uProgress > 0.75 && uReassemble > 0.5) {
        float reassembleT = clamp((uProgress - 0.75) / 0.25, 0.0, 1.0);
        float peakScatter = clamp((0.75 - breakThreshold) / 0.35, 0.0, 1.0);
        activeProg = mix(peakScatter, 0.0, easeOutCubic(reassembleT));
      } else {
        if (uProgress > breakThreshold) {
          activeProg = clamp((uProgress - breakThreshold) / 0.35, 0.0, 1.0);
        }
      }

      vShardProgress = activeProg;
      float easedP = easeOutCubic(activeProg);

      // Rotation around shard's own centroid
      float rotAngle = easedP * 3.14159 * 2.5 * aSpeed;
      vec3 localPos = position - aCentroid;
      vec3 rotatedLocal = rotateAroundAxis(localPos, aRotAxis, rotAngle);

      // Slight shrink near end of scatter
      rotatedLocal *= mix(1.0, 0.7, easedP);

      // Curl drift and outward displacement
      vec3 displacement = (aRandomDir * 4.5 + vec3(0.5, 1.2, 0.0)) * easedP * aSpeed;

      // Signature Interaction: Subtle shader refraction ripple on shards near pointer
      vec2 shardPos = aCentroid.xy;
      float pointerDist = length(shardPos - uPointerPos);
      float rippleWave = sin(pointerDist * 6.0 - uTime * 3.5) * exp(-pointerDist * 2.2);
      vec3 rippleOffset = vec3(0.0, 0.0, rippleWave * 0.12 * uRippleStrength * (1.0 - easedP));

      vec3 finalPos = aCentroid + rotatedLocal + displacement + rippleOffset;

      // Low-opacity ambient debris in middle scroll sections (0.35..0.75)
      float midFade = smoothstep(0.15, 0.35, uProgress) * (1.0 - smoothstep(0.70, 0.85, uProgress));
      vAlphaFade = mix(1.0, 0.22, midFade);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform vec3 uPlaidColor;
    uniform vec3 uCherryColor;
    uniform vec3 uCreamColor;

    varying vec2 vUv;
    varying float vShardProgress;
    varying float vAlphaFade;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      if (texColor.a < 0.08) discard;

      // Color transition: original -> plaid #5b8def -> cherry #9a0002 as shards drift
      vec3 tinted = mix(texColor.rgb, uPlaidColor, clamp(vShardProgress * 1.4, 0.0, 1.0));
      tinted = mix(tinted, uCherryColor, clamp((vShardProgress - 0.35) * 1.8, 0.0, 1.0));

      float alpha = texColor.a * vAlphaFade;
      gl_FragColor = vec4(tinted, alpha);
    }
  `,
};

// Companion Dust System
interface CompanionDustProps {
  uProgress: number;
  isMobile: boolean;
}

const CompanionDust: React.FC<CompanionDustProps> = ({ uProgress, isMobile }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? 1200 : 4000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime * 0.5;
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.025 : 0.035}
        color="#5b8def"
        transparent
        opacity={Math.max(0, Math.min(uProgress * 1.5, 0.55))}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Main Avatar Shatter Mesh
interface AvatarShatterProps {
  texture: THREE.Texture;
  image: HTMLImageElement;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const AvatarShatter: React.FC<AvatarShatterProps> = ({
  texture,
  image,
  isMobile,
  prefersReducedMotion,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const progressDamped = useRef(0);
  const rippleDamped = useRef(0.6);
  const { pointer, viewport } = useThree();

  const { geometry, height } = useMemo(() => {
    return createShatterGeometry(image, isMobile);
  }, [image, isMobile]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uHeight: { value: height },
      uReassemble: { value: 1.0 },
      uPointerPos: { value: new THREE.Vector2(0, 0) },
      uRippleStrength: { value: 0.6 },
      uPlaidColor: { value: new THREE.Color('#5b8def') },
      uCherryColor: { value: new THREE.Color('#9a0002') },
      uCreamColor: { value: new THREE.Color('#efe6dd') },
    }),
    [texture, height]
  );

  useFrame((state, delta) => {
    const globalProgress = usePortfolioStore.getState().scrollProgress;

    // Smoothly damp uProgress with maath damp (lambda 4)
    if (!prefersReducedMotion) {
      damp(progressDamped, 'current', globalProgress, 4, delta);
    } else {
      progressDamped.current = 0;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progressDamped.current;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Update pointer position in shard space
      const ptrX = pointer.x * (viewport.width * 0.4);
      const ptrY = pointer.y * (viewport.height * 0.4);
      materialRef.current.uniforms.uPointerPos.value.set(ptrX, ptrY);

      // Damp ripple strength
      damp(rippleDamped, 'current', prefersReducedMotion ? 0 : 0.8, 5, delta);
      materialRef.current.uniforms.uRippleStrength.value = rippleDamped.current;
    }

    if (meshRef.current && !prefersReducedMotion) {
      // Rotation fades to zero as shatter progress rises
      const rotFade = Math.max(0, 1.0 - progressDamped.current * 3.5);

      targetRotation.current.y = pointer.x * 0.22 * rotFade;
      targetRotation.current.x = -pointer.y * 0.12 * rotFade;

      damp(meshRef.current.rotation, 'y', targetRotation.current.y, 6, delta);
      damp(meshRef.current.rotation, 'x', targetRotation.current.x, 6, delta);

      // Subtle idle breathing sine wave
      const breathing = Math.sin(state.clock.elapsedTime * 1.5) * 0.008;
      meshRef.current.position.y = breathing;
      meshRef.current.scale.setScalar(1 + breathing * 0.5);
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Soft Cherry Planar Contact Glow under feet */}
      <mesh position={[0, -height / 2, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.2]} />
        <meshBasicMaterial
          color="#9a0002"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Shatter Shards Mesh */}
      <mesh ref={meshRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={ShatterShader.vertexShader}
          fragmentShader={ShatterShader.fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Companion Ash Dust */}
      {!isMobile && <CompanionDust uProgress={progressDamped.current} isMobile={isMobile} />}
    </group>
  );
};

// Canvas Wrapper Component
export const ShatterAvatarScene: React.FC = () => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const isSmall = window.innerWidth < 768 || (navigator.hardwareConcurrency || 4) <= 4;
    setIsMobile(isSmall);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Preload texture
    const loader = new THREE.TextureLoader();
    loader.load(
      siteContent.personal.avatarWebp,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTex);
        const img = loadedTex.image as HTMLImageElement;
        setImageObj(img);
      },
      undefined,
      () => {
        // Fallback to PNG if WebP fails
        loader.load(siteContent.personal.avatarPng, (fallbackTex) => {
          fallbackTex.colorSpace = THREE.SRGBColorSpace;
          setTexture(fallbackTex);
          setImageObj(fallbackTex.image as HTMLImageElement);
        });
      }
    );

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 35 }}
        dpr={isMobile ? [1, 1.25] : [1, Math.min(1.75, window.devicePixelRatio || 1)]}
        frameloop={isTabVisible ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} />

        {texture && imageObj && (
          <AvatarShatter
            texture={texture}
            image={imageObj}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </Canvas>
    </div>
  );
};

export default ShatterAvatarScene;
