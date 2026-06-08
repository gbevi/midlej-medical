"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const DEFAULT_VERTICALS = [
  "Mentoria full",
  "Mentoria pocket",
  "Investimentos internacionais",
  "Câmbio",
  "Seguros",
  "Produtos alternativos",
  "Previdência privada",
  "Treinamentos e workshops",
];

const COLOR_PAPER = "#F6F2EA";
const COLOR_BRIGHT = "#FFFFFF";
const COLOR_EMPHASIS = "#9B3221";
const RING_RADIUS = 3;

type Props = {
  verticals?: string[];
  onNodeFocus?: (index: number | null) => void;
  className?: string;
};

type NodeProps = {
  index: number;
  position: [number, number, number];
  onFocus?: (index: number | null) => void;
};

function Node({ index, position, onFocus }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);
  const [hovered, setHovered] = useState(false);
  const targetColor = useMemo(() => new THREE.Color(COLOR_PAPER), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    if (!meshRef.current || !wireRef.current) return;
    const s = hovered ? 1.15 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    wireRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    if (matRef.current) {
      tmpColor.set(hovered ? COLOR_BRIGHT : COLOR_PAPER);
      matRef.current.color.lerp(tmpColor, 0.12);
    }
    // gentle individual bob
    const t = performance.now() * 0.001;
    meshRef.current.rotation.y = t * 0.4 + index;
    meshRef.current.rotation.x = Math.sin(t * 0.6 + index) * 0.2;
    wireRef.current.rotation.copy(meshRef.current.rotation);
  });

  // Avoid unused var warning in some TS configs
  void targetColor;

  return (
    <group position={position}>
      <mesh ref={wireRef}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial
          color={COLOR_EMPHASIS}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh
        ref={meshRef}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          onFocus?.(index);
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(false);
          onFocus?.(null);
        }}
      >
        <octahedronGeometry args={[0.18, 0]} />
        <meshBasicMaterial ref={matRef} color={COLOR_PAPER} />
      </mesh>
    </group>
  );
}

function CentralNode() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current || !wireRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x += delta * 0.2;
    wireRef.current.rotation.copy(meshRef.current.rotation);
  });

  return (
    <group>
      <mesh ref={wireRef}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshBasicMaterial
          color={COLOR_EMPHASIS}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color={COLOR_BRIGHT} />
      </mesh>
    </group>
  );
}

function generateParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 1.5 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.cos(phi) * 0.7;
    arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  return arr;
}

function Particles({ count = 12 }: { count?: number }) {
  // Stable per-mount via useState lazy init; positions are decorative,
  // re-randomizing on re-render isn't desired anyway.
  const [positions] = useState(() => generateParticlePositions(count));

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={COLOR_PAPER}
        size={0.025}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

function ConstellationRig({
  verticals,
  onNodeFocus,
}: {
  verticals: string[];
  onNodeFocus?: (index: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  const nodePositions = useMemo<[number, number, number][]>(() => {
    return verticals.map((_, i) => {
      const angle = (i / verticals.length) * Math.PI * 2;
      const x = Math.cos(angle) * RING_RADIUS;
      const z = Math.sin(angle) * RING_RADIUS;
      const y = Math.sin(i * 1.3) * 0.5;
      return [x, y, z];
    });
  }, [verticals]);

  // Initial slow random rotation set-up
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.random() * Math.PI * 2;
    }
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // auto-orbit
    groupRef.current.rotation.y += delta * 0.12;
    // bobbing
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    // mouse parallax (lerped)
    const targetX = pointer.y * 0.18;
    const targetZ = pointer.x * 0.12;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.04,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetZ,
      0.04,
    );
  });

  return (
    <group ref={groupRef}>
      <CentralNode />

      {nodePositions.map((pos, i) => (
        <Node
          key={verticals[i]}
          index={i}
          position={pos}
          onFocus={onNodeFocus}
        />
      ))}

      {/* spokes: central to each vertical */}
      {nodePositions.map((pos, i) => (
        <Line
          key={`spoke-${i}`}
          points={[
            [0, 0, 0],
            pos,
          ]}
          color={COLOR_PAPER}
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}

      {/* perimeter: each vertical to next */}
      {nodePositions.map((pos, i) => {
        const next = nodePositions[(i + 1) % nodePositions.length];
        return (
          <Line
            key={`perim-${i}`}
            points={[pos, next]}
            color={COLOR_PAPER}
            transparent
            opacity={0.14}
            lineWidth={1}
          />
        );
      })}

      <Particles count={12} />
    </group>
  );
}

function StaticConstellation({
  verticals,
  className,
}: {
  verticals: string[];
  className?: string;
}) {
  const cx = 300;
  const cy = 300;
  const ringR = 200;
  const nodeR = 16;
  const centerR = 22;

  const points = verticals.map((_, i) => {
    const angle = (i / verticals.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * ringR,
      y: cy + Math.sin(angle) * ringR,
    };
  });

  const diamond = (x: number, y: number, r: number) =>
    `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", display: "flex" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
      >
        {/* spokes */}
        <g stroke={COLOR_PAPER} strokeOpacity={0.18} strokeWidth={1}>
          {points.map((p, i) => (
            <line key={`s-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} />
          ))}
        </g>
        {/* perimeter */}
        <g stroke={COLOR_PAPER} strokeOpacity={0.14} strokeWidth={1}>
          {points.map((p, i) => {
            const n = points[(i + 1) % points.length];
            return (
              <line key={`p-${i}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} />
            );
          })}
        </g>
        {/* vertical diamonds */}
        {points.map((p, i) => (
          <g key={`d-${i}`}>
            <polygon
              points={diamond(p.x, p.y, nodeR + 4)}
              fill="none"
              stroke={COLOR_EMPHASIS}
              strokeOpacity={0.45}
              strokeWidth={1}
            />
            <polygon points={diamond(p.x, p.y, nodeR)} fill={COLOR_PAPER} />
          </g>
        ))}
        {/* center */}
        <polygon
          points={diamond(cx, cy, centerR + 5)}
          fill="none"
          stroke={COLOR_EMPHASIS}
          strokeOpacity={0.55}
          strokeWidth={1}
        />
        <polygon points={diamond(cx, cy, centerR)} fill={COLOR_BRIGHT} />
      </svg>
    </div>
  );
}

export default function HubConstellation({
  verticals = DEFAULT_VERTICALS,
  onNodeFocus,
  className,
}: Props) {
  // Initialize from current matchMedia value. SSR-safe via lazy init —
  // first render is "no reduce" until the effect fires; the effect then
  // subscribes to changes without an initial setState.
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced) {
    return <StaticConstellation verticals={verticals} className={className} />;
  }

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ConstellationRig verticals={verticals} onNodeFocus={onNodeFocus} />
      </Canvas>
    </div>
  );
}
