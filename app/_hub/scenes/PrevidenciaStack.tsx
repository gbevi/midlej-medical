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

const DISC_COUNT = 10;
const SPACING = 0.28;
const DISC_RADIUS = 0.8;

function StackRig({ inView }: { inView: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const discRefs = useRef<(THREE.Group | null)[]>([]);
  const { pointer } = useThree();
  const startRef = useRef<number | null>(null);

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

  useFrame((state, delta) => {
    if (!group.current) return;
    // Start the entrance animation when first in view (inside frame loop to keep render pure).
    if (inView && startRef.current === null) {
      startRef.current = state.clock.elapsedTime;
    }
    group.current.rotation.y += delta * 0.06;

    // Mouse parallax — tilt X by pointer.y.
    const targetX = pointer.y * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.04,
    );

    // Entrance animation — discs rise from below with stagger.
    if (startRef.current !== null) {
      const elapsed = state.clock.elapsedTime - startRef.current;
      for (let i = 0; i < DISC_COUNT; i++) {
        const g = discRefs.current[i];
        if (!g) continue;
        const delay = i * 0.08;
        const local = Math.max(0, elapsed - delay);
        const k = Math.min(1, local / 0.6);
        const eased = 1 - Math.pow(1 - k, 3);
        g.position.y = THREE.MathUtils.lerp(-0.4, targetYs[i], eased);
        // Fade in by scaling the material opacity via userData approach: just lerp opacity on children's materials.
        g.traverse((obj) => {
          const m = obj as THREE.Mesh;
          if (m.isMesh && m.material) {
            const mat = m.material as THREE.MeshBasicMaterial;
            const baseOp = (m.userData.baseOpacity as number) ?? 1;
            mat.opacity = baseOp * eased;
          }
        });
      }
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
        <StackRig inView={inView} />
      </Canvas>
    </div>
  );
}
