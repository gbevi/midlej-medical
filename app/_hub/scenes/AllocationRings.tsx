"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  SCENE_COLORS,
  useInView,
  useReducedMotion,
} from "./sharedScene";
import { useScrollProgress } from "../lib/useScrollProgress";

type Props = { className?: string };

type RingDef = {
  radius: number;
  tube: number;
  y: number;
  opacity: number;
  // Scroll rotation magnitude (signed).
  rotMag: number;
};

const RINGS: RingDef[] = [
  { radius: 0.6, tube: 0.06, y: -1.0, opacity: 0.4, rotMag: Math.PI * 0.6 },
  { radius: 1.0, tube: 0.08, y: -0.3, opacity: 0.52, rotMag: -Math.PI * 0.8 },
  { radius: 1.4, tube: 0.1, y: 0.4, opacity: 0.64, rotMag: Math.PI * 1.0 },
  { radius: 1.8, tube: 0.12, y: 1.1, opacity: 0.76, rotMag: -Math.PI * 1.2 },
];

const MARKERS_PER_RING = 3;

function RingsRig({ progressRef }: { progressRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const ringGroups = useRef<(THREE.Group | null)[]>([]);
  const { pointer } = useThree();

  // Pre-compute marker angles uniformly distributed.
  const markerAngles = useMemo(
    () =>
      Array.from(
        { length: MARKERS_PER_RING },
        (_, k) => (k / MARKERS_PER_RING) * Math.PI * 2,
      ),
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    const p = progressRef.current;

    // Group tilt by pointer.
    const targetX = pointer.y * 0.2;
    const targetY = pointer.x * 0.25;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.05,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.05,
    );

    RINGS.forEach((r, i) => {
      const g = ringGroups.current[i];
      if (!g) return;
      g.rotation.y = r.rotMag * p;
    });
  });

  return (
    <group ref={group}>
      {RINGS.map((r, i) => (
        <group
          key={`ring-${i}`}
          ref={(el) => {
            ringGroups.current[i] = el;
          }}
          position={[0, r.y, 0]}
        >
          {/* Paper torus, lying flat (rotated to XZ plane). */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r.radius, r.tube, 12, 64]} />
            <meshBasicMaterial
              color={SCENE_COLORS.paper}
              transparent
              opacity={r.opacity}
            />
          </mesh>
          {/* Slightly larger oxblood wireframe overlay */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r.radius + 0.03, r.tube, 8, 48]} />
            <meshBasicMaterial
              color={SCENE_COLORS.oxblood}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
          {/* Markers along the ring (in XZ plane). */}
          {markerAngles.map((angle, k) => {
            const x = Math.cos(angle) * r.radius;
            const z = Math.sin(angle) * r.radius;
            return (
              <mesh key={`m-${i}-${k}`} position={[x, 0, z]}>
                <octahedronGeometry args={[0.06, 0]} />
                <meshBasicMaterial color={SCENE_COLORS.paper} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function StaticAllocationRings({ className }: { className?: string }) {
  const cx = 300;
  const cy = 320;
  // Four concentric ellipses (compressed Y to suggest perspective).
  const rings = [
    { rx: 80, ry: 22, yOffset: 110, op: 0.4 },
    { rx: 140, ry: 38, yOffset: 40, op: 0.52 },
    { rx: 200, ry: 54, yOffset: -40, op: 0.64 },
    { rx: 260, ry: 70, yOffset: -120, op: 0.76 },
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
        {rings.map((r, i) => {
          const cyR = cy + r.yOffset;
          // 3 markers per ring at 90, 210, 330 deg.
          const marks = [90, 210, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return {
              x: cx + Math.cos(rad) * r.rx,
              y: cyR + Math.sin(rad) * r.ry,
            };
          });
          return (
            <g key={`r-${i}`}>
              <ellipse
                cx={cx}
                cy={cyR}
                rx={r.rx}
                ry={r.ry}
                fill="none"
                stroke={SCENE_COLORS.paper}
                strokeOpacity={r.op}
                strokeWidth={2}
              />
              <ellipse
                cx={cx}
                cy={cyR}
                rx={r.rx + 4}
                ry={r.ry + 2}
                fill="none"
                stroke={SCENE_COLORS.oxblood}
                strokeOpacity={0.3}
                strokeWidth={1}
              />
              {marks.map((m, k) => (
                <polygon
                  key={`mk-${i}-${k}`}
                  points={`${m.x},${m.y - 5} ${m.x + 5},${m.y} ${m.x},${m.y + 5} ${m.x - 5},${m.y}`}
                  fill={SCENE_COLORS.paper}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function AllocationRings({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const progressRef = useScrollProgress(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticAllocationRings className={className} />;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView ? "always" : "never"}
        style={{ width: "100%", height: "100%" }}
      >
        <RingsRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
