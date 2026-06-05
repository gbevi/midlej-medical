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

const DISC_COUNT = 10;
const SPACING = 0.28;
const DISC_RADIUS = 0.8;

function StackRig({ progressRef }: { progressRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const discRefs = useRef<(THREE.Group | null)[]>([]);
  const { pointer } = useThree();

  const targetYs = useMemo(
    () => Array.from({ length: DISC_COUNT }, (_, i) => i * SPACING),
    [],
  );
  const opacities = useMemo(
    () =>
      Array.from(
        { length: DISC_COUNT },
        (_, i) => 0.85 - (i / (DISC_COUNT - 1)) * 0.3,
      ),
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    const p = progressRef.current;

    const targetY = p * Math.PI * 1.5;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.06,
    );

    // Mouse parallax — tilt X by pointer.y.
    const targetX = pointer.y * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.04,
    );

    // Scroll-driven stagger: disc i activates at p >= i/DISC_COUNT,
    // ramping over a window of 1/DISC_COUNT.
    const window = 1 / DISC_COUNT;
    for (let i = 0; i < DISC_COUNT; i++) {
      const g = discRefs.current[i];
      if (!g) continue;
      const local = Math.max(0, Math.min(1, (p - i * window) / window));
      const eased = 1 - Math.pow(1 - local, 3);
      g.position.y = THREE.MathUtils.lerp(-0.4, targetYs[i], eased);
      g.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.isMesh && m.material) {
          const mat = m.material as THREE.MeshBasicMaterial;
          const baseOp = (m.userData.baseOpacity as number) ?? 1;
          mat.opacity = baseOp * eased;
        }
      });
    }
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {targetYs.map((y, i) => (
        <group
          key={i}
          ref={(el) => {
            discRefs.current[i] = el;
          }}
          position={[0, y, 0]}
        >
          <mesh
            userData={{ baseOpacity: opacities[i] }}
          >
            <cylinderGeometry args={[DISC_RADIUS, DISC_RADIUS, 0.06, 32]} />
            <meshBasicMaterial
              color={SCENE_COLORS.paper}
              transparent
              opacity={opacities[i]}
            />
          </mesh>
          {/* Oxblood ring on top face */}
          <mesh
            position={[0, 0.035, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ baseOpacity: 0.6 }}
          >
            <torusGeometry args={[DISC_RADIUS, 0.012, 8, 64]} />
            <meshBasicMaterial
              color={SCENE_COLORS.oxblood}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StaticPrevidencia({ className }: { className?: string }) {
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
        {Array.from({ length: DISC_COUNT }).map((_, i) => {
          const y = 540 - i * 44;
          const op = 0.85 - (i / (DISC_COUNT - 1)) * 0.3;
          return (
            <g key={i}>
              <line
                x1={160}
                y1={y}
                x2={440}
                y2={y}
                stroke={SCENE_COLORS.paper}
                strokeOpacity={op}
                strokeWidth={2}
              />
              <circle
                cx={444}
                cy={y}
                r={4}
                fill={SCENE_COLORS.oxblood}
                fillOpacity={op}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function PrevidenciaStack({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const progressRef = useScrollProgress(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticPrevidencia className={className} />;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView ? "always" : "never"}
        style={{ width: "100%", height: "100%" }}
      >
        <StackRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
