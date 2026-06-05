"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  SCENE_COLORS,
  useInView,
  useReducedMotion,
} from "./sharedScene";

type Props = { className?: string };

const PLANE_W = 3;
const PLANE_H = 1.8;
const BASE_Z = [-0.6, -0.2, 0.2, 0.6] as const;
const OPACITIES = [0.08, 0.12, 0.16, 0.22] as const;

function seededScatter(seed: number) {
  // Deterministic-ish pseudo-random points within plane bounds.
  const pts: [number, number][] = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < 3; i++) {
    s = (s * 9301 + 49297) % 233280;
    const x = (s / 233280 - 0.5) * (PLANE_W - 0.4);
    s = (s * 9301 + 49297) % 233280;
    const y = (s / 233280 - 0.5) * (PLANE_H - 0.4);
    pts.push([x, y]);
  }
  return pts;
}

function LayersRig() {
  const group = useRef<THREE.Group>(null!);
  const planeRefs = useRef<(THREE.Group | null)[]>([]);
  const { pointer } = useThree();

  const scatters = useMemo(
    () => BASE_Z.map((_, i) => seededScatter(i + 1)),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.04;
    const t = state.clock.elapsedTime;
    group.current.rotation.x = Math.sin(t * 0.5) * 0.05;

    // Mouse parallax: separate planes along Z by pointer.x.
    const spread = 1 + pointer.x * 0.3;
    BASE_Z.forEach((z, i) => {
      const g = planeRefs.current[i];
      if (!g) return;
      const targetZ = z * spread;
      g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, 0.06);
    });
  });

  return (
    <group ref={group}>
      {BASE_Z.map((z, i) => (
        <group
          key={i}
          ref={(el) => {
            planeRefs.current[i] = el;
          }}
          position={[0, 0, z]}
        >
          {/* solid translucent plane */}
          <mesh>
            <planeGeometry args={[PLANE_W, PLANE_H]} />
            <meshBasicMaterial
              color={SCENE_COLORS.paper}
              transparent
              opacity={OPACITIES[i]}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* oxblood thin border */}
          <mesh>
            <planeGeometry args={[PLANE_W, PLANE_H]} />
            <meshBasicMaterial
              color={SCENE_COLORS.oxblood}
              wireframe
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* 3 product markers */}
          {scatters[i].map(([px, py], k) => (
            <mesh key={k} position={[px, py, 0.01]}>
              <octahedronGeometry args={[0.05, 0]} />
              <meshBasicMaterial
                color={SCENE_COLORS.paper}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function StaticAltLayers({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", display: "flex" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
      >
        {[0, 1, 2, 3].map((i) => {
          const offset = i * 18;
          const w = 360;
          const h = 200;
          const x = 100 + offset;
          const y = 60 + offset;
          const fillOp = 0.08 + i * 0.05;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={SCENE_COLORS.paper}
                fillOpacity={fillOp}
                stroke={SCENE_COLORS.oxblood}
                strokeOpacity={0.3}
                strokeWidth={1}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function AltLayers({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticAltLayers className={className} />;

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
        <LayersRig />
      </Canvas>
    </div>
  );
}
