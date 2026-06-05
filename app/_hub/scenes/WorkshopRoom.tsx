"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  SCENE_COLORS,
  useInView,
  useReducedMotion,
} from "./sharedScene";
import { useScrollProgress } from "../lib/useScrollProgress";

type Props = { className?: string };

const COLS = 6;
const ROWS = 4;
const SPEAKER_POS: [number, number, number] = [0, -0.1, -0.8];

function WorkshopRig({ progressRef }: { progressRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const audienceRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { pointer } = useThree();

  const audiencePositions = useMemo<[number, number, number][]>(() => {
    const arr: [number, number, number][] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = -1.8 + (col / (COLS - 1)) * 3.6;
        const z = 0.5 + (row / (ROWS - 1)) * 2.0;
        arr.push([x, -0.7, z]);
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const p = progressRef.current;
    const targetYRot = (p - 0.5) * 0.8;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetYRot,
      0.06,
    );
    // Mouse parallax on X tilt (kept independent of Y sweep).
    const targetXRot = pointer.x * 0.15;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetXRot,
      0.04,
    );

    const t = state.clock.elapsedTime;
    audienceRefs.current.forEach((m, i) => {
      if (!m) return;
      const base = audiencePositions[i][1];
      m.position.y = base + Math.sin(t * 0.5 + i * 0.3) * 0.05;
    });
  });

  return (
    <group ref={group}>
      {/* Lecture plane — wireframe */}
      <mesh position={[0, 0.6, -1.5]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[2.4, 1.4]} />
        <meshBasicMaterial
          color={SCENE_COLORS.paper}
          wireframe
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Lecture plane — back fill */}
      <mesh position={[0, 0.6, -1.5]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[2.4, 1.4]} />
        <meshBasicMaterial
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Speaker node */}
      <group position={SPEAKER_POS}>
        <mesh>
          <octahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial
            color={SCENE_COLORS.oxblood}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.14, 0]} />
          <meshBasicMaterial color={SCENE_COLORS.white} />
        </mesh>
      </group>

      {/* Audience */}
      {audiencePositions.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            audienceRefs.current[i] = el;
          }}
          position={p}
        >
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial
            color={SCENE_COLORS.paper}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}

      {/* Connection lines speaker -> each audience node */}
      {audiencePositions.map((p, i) => (
        <Line
          key={`l-${i}`}
          points={[SPEAKER_POS, p]}
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.08}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function StaticWorkshop({ className }: { className?: string }) {
  const speakerX = 300;
  const speakerY = 460;
  const grid: { x: number; y: number }[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      grid.push({
        x: 120 + (col / (COLS - 1)) * 360,
        y: 320 + row * 32,
      });
    }
  }
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
        {/* Tilted lecture parallelogram */}
        <polygon
          points="170,80 430,100 410,210 150,190"
          fill={SCENE_COLORS.paper}
          fillOpacity={0.06}
          stroke={SCENE_COLORS.paper}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
        {/* Lines from speaker to audience */}
        {grid.map((p, i) => (
          <line
            key={`l-${i}`}
            x1={speakerX}
            y1={speakerY}
            x2={p.x}
            y2={p.y}
            stroke={SCENE_COLORS.oxblood}
            strokeOpacity={0.25}
            strokeWidth={1}
          />
        ))}
        {/* Audience dots */}
        {grid.map((p, i) => (
          <circle
            key={`a-${i}`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={SCENE_COLORS.paper}
            fillOpacity={0.7}
          />
        ))}
        {/* Speaker */}
        <circle
          cx={speakerX}
          cy={speakerY}
          r={9}
          fill={SCENE_COLORS.white}
          stroke={SCENE_COLORS.oxblood}
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
}

export default function WorkshopRoom({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const progressRef = useScrollProgress(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticWorkshop className={className} />;

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
        <WorkshopRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
