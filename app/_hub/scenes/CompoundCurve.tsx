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

const TOTAL_POINTS = 60;
const HAIRLINE_YS = [-1.5, -0.8, -0.1, 0.6] as const;
const MARKER_POSITIONS = [0.33, 0.66, 1.0] as const;
const MARKER_THRESHOLDS = [0.3, 0.63, 0.96] as const;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function CurveRig({ progressRef }: { progressRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const lineRef = useRef<THREE.BufferGeometry>(null);
  const markerGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const markerCoreRefs = useRef<(THREE.Mesh | null)[]>([]);
  const markerShellRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { pointer } = useThree();

  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-2.5, -1.5, 0),
        new THREE.Vector3(0, -1.0, 0),
        new THREE.Vector3(2.5, 1.8, 0),
      ),
    [],
  );

  const allPoints = useMemo(() => curve.getPoints(TOTAL_POINTS), [curve]);
  const markerPositions = useMemo(
    () => MARKER_POSITIONS.map((t) => curve.getPoint(t)),
    [curve],
  );


  useFrame(() => {
    if (!group.current) return;
    const p = progressRef.current;

    // Mouse parallax + sutle auto-rotate Y.
    const targetX = pointer.y * 0.15;
    const targetY = pointer.x * 0.1;
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

    // Reveal curve points based on scroll.
    const reveal = Math.max(2, Math.floor(p * (TOTAL_POINTS + 1)));
    const count = Math.min(reveal, allPoints.length);
    const geo = lineRef.current;
    if (geo) {
      const attr = geo.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (attr) {
        const arr = attr.array as Float32Array;
        for (let i = 0; i < count; i++) {
          arr[i * 3] = allPoints[i].x;
          arr[i * 3 + 1] = allPoints[i].y;
          arr[i * 3 + 2] = allPoints[i].z;
        }
        attr.needsUpdate = true;
      }
      geo.setDrawRange(0, count);
      geo.computeBoundingSphere();
    }

    // Marker reveal fades.
    MARKER_THRESHOLDS.forEach((threshold, i) => {
      const op = clamp01((p - threshold) / 0.08);
      const core = markerCoreRefs.current[i];
      const shell = markerShellRefs.current[i];
      if (core && core.material) {
        const m = core.material as THREE.MeshBasicMaterial;
        m.opacity = op;
        m.transparent = true;
      }
      if (shell && shell.material) {
        const m = shell.material as THREE.MeshBasicMaterial;
        m.opacity = op * 0.5;
        m.transparent = true;
      }
    });
  });

  return (
    <group ref={group}>
      {/* Hairlines (grid de referência) */}
      {HAIRLINE_YS.map((y, i) => (
        <Line
          key={`hl-${i}`}
          points={[
            [-3, y, 0],
            [3, y, 0],
          ]}
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.12}
          lineWidth={1}
        />
      ))}

      {/* Curve — manually drawn line so we can control reveal via setDrawRange. */}
      <line>
        <bufferGeometry ref={lineRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array((TOTAL_POINTS + 1) * 3), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.7}
        />
      </line>

      {/* Markers */}
      {markerPositions.map((pos, i) => (
        <group
          key={`mk-${i}`}
          ref={(el) => {
            markerGroupRefs.current[i] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
        >
          <mesh
            ref={(el) => {
              markerCoreRefs.current[i] = el;
            }}
          >
            <octahedronGeometry args={[0.14, 0]} />
            <meshBasicMaterial
              color={SCENE_COLORS.paper}
              transparent
              opacity={0}
            />
          </mesh>
          <mesh
            ref={(el) => {
              markerShellRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.18, 12, 8]} />
            <meshBasicMaterial
              color={SCENE_COLORS.oxblood}
              wireframe
              transparent
              opacity={0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StaticCompoundCurve({ className }: { className?: string }) {
  // Map 3D coords to viewBox 600x400. X: [-3,3]→[60,540]; Y: [-2,2]→[340,60]
  const mapX = (x: number) => 60 + ((x + 3) / 6) * 480;
  const mapY = (y: number) => 340 - ((y + 2) / 4) * 280;

  const start = { x: mapX(-2.5), y: mapY(-1.5) };
  const ctrl = { x: mapX(0), y: mapY(-1.0) };
  const end = { x: mapX(2.5), y: mapY(1.8) };

  // Quadratic Bezier sample at t.
  const sampleBezier = (t: number) => {
    const mt = 1 - t;
    const x = mt * mt * start.x + 2 * mt * t * ctrl.x + t * t * end.x;
    const y = mt * mt * start.y + 2 * mt * t * ctrl.y + t * t * end.y;
    return { x, y };
  };

  const markers = MARKER_POSITIONS.map((t) => sampleBezier(t));

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
        {/* Hairlines */}
        {HAIRLINE_YS.map((y, i) => {
          const sy = mapY(y);
          return (
            <line
              key={`hl-${i}`}
              x1={mapX(-3)}
              y1={sy}
              x2={mapX(3)}
              y2={sy}
              stroke={SCENE_COLORS.paper}
              strokeOpacity={0.12}
              strokeWidth={1}
            />
          );
        })}
        {/* Curve */}
        <path
          d={`M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`}
          fill="none"
          stroke={SCENE_COLORS.paper}
          strokeOpacity={0.7}
          strokeWidth={1.5}
        />
        {/* Markers: diamond + oxblood ring */}
        {markers.map((m, i) => (
          <g key={`m-${i}`}>
            <circle
              cx={m.x}
              cy={m.y}
              r={11}
              fill="none"
              stroke={SCENE_COLORS.oxblood}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <polygon
              points={`${m.x},${m.y - 8} ${m.x + 8},${m.y} ${m.x},${m.y + 8} ${m.x - 8},${m.y}`}
              fill={SCENE_COLORS.paper}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function CompoundCurve({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const progressRef = useScrollProgress(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticCompoundCurve className={className} />;

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
        <CurveRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
