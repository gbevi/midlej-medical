"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  SCENE_COLORS,
  useInView,
  useReducedMotion,
} from "./sharedScene";

type Props = { className?: string };

const RADIUS = 1.6;

const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "NY", lat: 40.7, lon: -74.0 },
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "Frankfurt", lat: 50.1, lon: 8.7 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "HongKong", lat: 22.3, lon: 114.2 },
  { name: "SaoPaulo", lat: -23.5, lon: -46.6 },
];

const CONNECTIONS: [string, string][] = [
  ["NY", "London"],
  ["London", "Frankfurt"],
  ["NY", "SaoPaulo"],
  ["London", "Singapore"],
  ["Singapore", "HongKong"],
  ["Frankfurt", "Singapore"],
];

function latLonToVec(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeRig() {
  const group = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  const cityVecs = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    CITIES.forEach((c) => map.set(c.name, latLonToVec(c.lat, c.lon, RADIUS)));
    return map;
  }, []);

  const arcPoints = useMemo(() => {
    return CONNECTIONS.map(([a, b]) => {
      const va = cityVecs.get(a)!;
      const vb = cityVecs.get(b)!;
      const mid = va.clone().add(vb).multiplyScalar(0.5).multiplyScalar(1.4);
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      return curve.getPoints(40).map((p) => [p.x, p.y, p.z] as [number, number, number]);
    });
  }, [cityVecs]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    const targetX = pointer.y * 0.3;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.04,
    );
  });

  return (
    <group ref={group}>
      {/* Outer wireframe globe */}
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 24]} />
        <meshBasicMaterial
          color={SCENE_COLORS.paper}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
      {/* Inner faint shell */}
      <mesh>
        <sphereGeometry args={[0.85, 24, 18]} />
        <meshBasicMaterial
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Arcs */}
      {arcPoints.map((pts, i) => (
        <Line
          key={`arc-${i}`}
          points={pts}
          color={SCENE_COLORS.oxblood}
          transparent
          opacity={0.7}
          lineWidth={1.5}
        />
      ))}

      {/* City markers */}
      {CITIES.map((c) => {
        const v = cityVecs.get(c.name)!;
        return (
          <mesh key={c.name} position={[v.x, v.y, v.z]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshBasicMaterial color={SCENE_COLORS.paper} />
          </mesh>
        );
      })}
    </group>
  );
}

function StaticGlobe({ className }: { className?: string }) {
  // Approximate screen-projected dots for the 6 cities on a 600x600 canvas.
  const cx = 300;
  const cy = 300;
  const r = 180;
  const dots = [
    { x: cx - 100, y: cy - 50 }, // NY
    { x: cx + 30, y: cy - 70 }, // London
    { x: cx + 80, y: cy - 50 }, // Frankfurt
    { x: cx + 150, y: cy + 30 }, // Singapore
    { x: cx + 170, y: cy + 5 }, // HK
    { x: cx - 70, y: cy + 110 }, // SP
  ];
  const lines: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 5],
    [1, 3],
    [3, 4],
    [2, 3],
  ];
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
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={SCENE_COLORS.paper}
          strokeOpacity={0.45}
          strokeWidth={1}
        />
        {lines.slice(0, 5).map(([a, b], i) => (
          <line
            key={`l-${i}`}
            x1={dots[a].x}
            y1={dots[a].y}
            x2={dots[b].x}
            y2={dots[b].y}
            stroke={SCENE_COLORS.paper}
            strokeOpacity={0.4}
            strokeDasharray="4 4"
            strokeWidth={1}
          />
        ))}
        {/* one oxblood dashed accent arc */}
        <path
          d={`M ${dots[0].x} ${dots[0].y} Q ${cx} ${cy - 220} ${dots[1].x} ${dots[1].y}`}
          fill="none"
          stroke={SCENE_COLORS.oxblood}
          strokeOpacity={0.75}
          strokeDasharray="5 4"
          strokeWidth={1.5}
        />
        {dots.map((d, i) => (
          <circle
            key={`d-${i}`}
            cx={d.x}
            cy={d.y}
            r={4}
            fill={SCENE_COLORS.paper}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Globe({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticGlobe className={className} />;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView ? "always" : "never"}
        style={{ width: "100%", height: "100%" }}
      >
        <GlobeRig />
      </Canvas>
    </div>
  );
}
