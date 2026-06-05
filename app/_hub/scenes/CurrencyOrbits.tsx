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

type OrbitDef = {
  rx: number;
  ry: number;
  // Euler rotation (radians) that orients the orbit plane.
  euler: [number, number, number];
  // Initial phase offsets for satellites.
  satellites: number[];
  // Speed multiplier for satellite angular travel per progress unit.
  speed: number;
  // Which axis to rotate the ring by (driven by scroll).
  rotAxis: "x" | "y" | "z";
  // Magnitude factor for that scroll rotation (× π × progress).
  rotFactor: number;
};

const ORBITS: OrbitDef[] = [
  {
    rx: 2.4,
    ry: 1.6,
    euler: [0, 0, 0], // XY plane
    satellites: [0, Math.PI],
    speed: 1.0,
    rotAxis: "z",
    rotFactor: 1.0,
  },
  {
    rx: 2.0,
    ry: 1.6,
    euler: [(35 * Math.PI) / 180, 0, 0],
    satellites: [Math.PI / 3],
    speed: 0.7,
    rotAxis: "x",
    rotFactor: 1.2,
  },
  {
    rx: 2.8,
    ry: 1.4,
    euler: [0, 0, (-25 * Math.PI) / 180],
    satellites: [(2 * Math.PI) / 3],
    speed: 1.3,
    rotAxis: "y",
    rotFactor: 0.8,
  },
];

function OrbitsRig({ progressRef }: { progressRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const orbitGroups = useRef<(THREE.Group | null)[]>([]);
  const satelliteRefs = useRef<(THREE.Mesh | null)[][]>(
    ORBITS.map(() => []),
  );
  const lineGroupRefs = useRef<(THREE.Group | null)[][]>(
    ORBITS.map(() => []),
  );
  const { pointer } = useThree();

  // Build base ring point arrays for the connection lines (recomputed per frame).
  const lineRefs = useRef<(THREE.BufferGeometry | null)[][]>(
    ORBITS.map(() => []),
  );

  // Pre-compute orbit ellipse sample geometries via TorusGeometry.
  const ringArgs = useMemo(
    () =>
      ORBITS.map((o) => {
        // We render an ellipse by scaling the torus group in X/Y.
        // Use base unit torus radius 1, tube 0.008.
        return {
          scaleX: o.rx,
          scaleY: o.ry,
        };
      }),
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    const p = progressRef.current;

    // Mouse parallax overall tilt.
    const targetTiltX = pointer.y * 0.25;
    const targetTiltY = pointer.x * 0.25;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetTiltX,
      0.05,
    );
    // Combine auto-rotate Y with parallax.
    const autoY = (p - 0.5) * 0.4;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      autoY + targetTiltY,
      0.05,
    );

    // Per-orbit rotation driven by scroll.
    ORBITS.forEach((o, i) => {
      const g = orbitGroups.current[i];
      if (!g) return;
      // Reset to base euler then add scroll rotation on axis.
      g.rotation.set(o.euler[0], o.euler[1], o.euler[2]);
      const add = p * Math.PI * o.rotFactor;
      if (o.rotAxis === "x") g.rotateX(add);
      else if (o.rotAxis === "y") g.rotateY(add);
      else g.rotateZ(add);

      // Update satellite positions along the ellipse (local XY plane of orbit group).
      o.satellites.forEach((base, k) => {
        const angle = base + p * Math.PI * o.speed;
        const x = Math.cos(angle) * o.rx;
        const y = Math.sin(angle) * o.ry;
        const mesh = satelliteRefs.current[i][k];
        if (mesh) {
          mesh.position.set(x, y, 0);
        }

        // Update connecting line: from world-space satellite to central node.
        const geo = lineRefs.current[i][k];
        if (geo && mesh) {
          // Convert satellite local position to world, then back to group-local.
          const worldPos = new THREE.Vector3(x, y, 0);
          mesh.parent?.localToWorld(worldPos);
          group.current!.worldToLocal(worldPos);
          const arr = new Float32Array([
            0,
            0,
            0,
            worldPos.x,
            worldPos.y,
            worldPos.z,
          ]);
          geo.setAttribute(
            "position",
            new THREE.BufferAttribute(arr, 3),
          );
          geo.attributes.position.needsUpdate = true;
          geo.computeBoundingSphere();
        }
      });
    });
  });

  return (
    <group ref={group}>
      {/* Central anchor: white octahedron + oxblood wireframe shell */}
      <mesh>
        <octahedronGeometry args={[0.18, 0]} />
        <meshBasicMaterial color={SCENE_COLORS.white} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.24, 16, 12]} />
        <meshBasicMaterial
          color={SCENE_COLORS.oxblood}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbits */}
      {ORBITS.map((o, i) => (
        <group
          key={`orbit-${i}`}
          ref={(el) => {
            orbitGroups.current[i] = el;
          }}
          rotation={o.euler}
        >
          {/* Ellipse ring — torus scaled X/Y */}
          <mesh
            scale={[ringArgs[i].scaleX, ringArgs[i].scaleY, 1]}
          >
            <torusGeometry args={[1, 0.008, 4, 96]} />
            <meshBasicMaterial
              color={SCENE_COLORS.paper}
              transparent
              opacity={0.22}
            />
          </mesh>

          {/* Satellites */}
          {o.satellites.map((_, k) => (
            <mesh
              key={`sat-${i}-${k}`}
              ref={(el) => {
                satelliteRefs.current[i][k] = el;
              }}
            >
              <octahedronGeometry args={[0.08, 0]} />
              <meshBasicMaterial color={SCENE_COLORS.paper} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Connection lines (group-local; updated per frame) */}
      {ORBITS.map((o, i) =>
        o.satellites.map((_, k) => (
          <line
            key={`conn-${i}-${k}`}
            ref={(el) => {
              lineGroupRefs.current[i][k] = el as unknown as THREE.Group;
            }}
          >
            <bufferGeometry
              ref={(el) => {
                lineRefs.current[i][k] = el as unknown as THREE.BufferGeometry | null;
              }}
            >
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, 0, 0, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={SCENE_COLORS.oxblood}
              transparent
              opacity={0.4}
            />
          </line>
        )),
      )}
    </group>
  );
}

function StaticCurrencyOrbits({ className }: { className?: string }) {
  const cx = 300;
  const cy = 300;
  // Three ellipses at different rotations.
  const ellipses = [
    { rx: 220, ry: 140, rot: 0 },
    { rx: 180, ry: 150, rot: 35 },
    { rx: 250, ry: 120, rot: -25 },
  ];
  // Satellite positions (precomputed approximations).
  const sats = [
    { x: cx + 220, y: cy },
    { x: cx - 220, y: cy },
    { x: cx + 120, y: cy - 130 },
    { x: cx - 200, y: cy + 70 },
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
        {ellipses.map((e, i) => (
          <ellipse
            key={`e-${i}`}
            cx={cx}
            cy={cy}
            rx={e.rx}
            ry={e.ry}
            fill="none"
            stroke={SCENE_COLORS.paper}
            strokeOpacity={0.22}
            strokeWidth={1}
            transform={`rotate(${e.rot} ${cx} ${cy})`}
          />
        ))}
        {/* lines from center to satellites */}
        {sats.map((s, i) => (
          <line
            key={`l-${i}`}
            x1={cx}
            y1={cy}
            x2={s.x}
            y2={s.y}
            stroke={SCENE_COLORS.oxblood}
            strokeOpacity={0.4}
            strokeWidth={1}
          />
        ))}
        {/* satellites: small diamonds */}
        {sats.map((s, i) => (
          <polygon
            key={`s-${i}`}
            points={`${s.x},${s.y - 7} ${s.x + 7},${s.y} ${s.x},${s.y + 7} ${s.x - 7},${s.y}`}
            fill={SCENE_COLORS.paper}
          />
        ))}
        {/* central oxblood ring */}
        <circle
          cx={cx}
          cy={cy}
          r={22}
          fill="none"
          stroke={SCENE_COLORS.oxblood}
          strokeOpacity={0.7}
          strokeWidth={1.2}
        />
        {/* central white diamond */}
        <polygon
          points={`${cx},${cy - 14} ${cx + 14},${cy} ${cx},${cy + 14} ${cx - 14},${cy}`}
          fill={SCENE_COLORS.white}
        />
      </svg>
    </div>
  );
}

export default function CurrencyOrbits({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const progressRef = useScrollProgress(wrapRef);
  const reduced = useReducedMotion();

  if (reduced) return <StaticCurrencyOrbits className={className} />;

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
        <OrbitsRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
