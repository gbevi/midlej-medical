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

const TOTAL_POINTS = 80;
const HAIRLINE_YS = [-1.5, -0.8, -0.1, 0.6] as const;
const MARKER_POSITIONS = [0.33, 0.66, 1.0] as const;
const MARKER_THRESHOLDS = [0.25, 0.5, 0.8] as const;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/**
 * Mapeamento de scroll → reveal da curva.
 *
 * useScrollProgress entrega 0..1 no trajeto completo do elemento pela
 * viewport — só chega em 1 quando o elemento sai por cima. Pra que a
 * curva se complete enquanto o usuário ainda está olhando pra seção,
 * remapeio: progresso "útil" = clamp01((p - 0.05) / 0.7). Assim:
 *   - p < 0.05 (seção entrando) → reveal 0
 *   - p = 0.40 (seção centralizada) → reveal ~50%
 *   - p = 0.75 (seção saindo por cima) → reveal 100%, e fica em 100%
 *     enquanto p continua subindo.
 */
function easeReveal(p: number): number {
  return clamp01((p - 0.05) / 0.7);
}

function CurveRig({ progressRef }: { progressRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const lineRef = useRef<THREE.BufferGeometry>(null);
  const markerCoreRefs = useRef<(THREE.Mesh | null)[]>([]);
  const markerShellRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { pointer } = useThree();

  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-2.5, -1.3, 0),
        new THREE.Vector3(-0.3, -1.2, 0),
        new THREE.Vector3(2.5, 1.7, 0),
      ),
    [],
  );

  const allPoints = useMemo(() => curve.getPoints(TOTAL_POINTS), [curve]);

  // Buffer pré-populado com TODAS as posições da curva uma vez na
  // montagem. O reveal acontece via setDrawRange — não tocamos mais
  // no buffer por frame.
  const positions = useMemo(() => {
    const arr = new Float32Array(allPoints.length * 3);
    allPoints.forEach((pt, i) => {
      arr[i * 3] = pt.x;
      arr[i * 3 + 1] = pt.y;
      arr[i * 3 + 2] = pt.z;
    });
    return arr;
  }, [allPoints]);

  const markerPositions = useMemo(
    () => MARKER_POSITIONS.map((t) => curve.getPoint(t)),
    [curve],
  );

  useFrame(() => {
    if (!group.current) return;
    const rawP = progressRef.current;
    const p = easeReveal(rawP);

    // Mouse parallax sutil.
    const targetX = pointer.y * 0.12;
    const targetY = pointer.x * 0.08;
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

    // Reveal: setDrawRange controla quantos vértices da curva são
    // desenhados. Sempre pelo menos 2 pra não dar buffer underflow.
    const reveal = Math.max(2, Math.floor(p * allPoints.length));
    const count = Math.min(reveal, allPoints.length);
    const geo = lineRef.current;
    if (geo) {
      geo.setDrawRange(0, count);
    }

    // Markers: fade-in conforme a curva chega em cada threshold.
    MARKER_THRESHOLDS.forEach((threshold, i) => {
      // Janela de 0.08 pro fade-in suave.
      const op = clamp01((p - threshold) / 0.08);
      const core = markerCoreRefs.current[i];
      const shell = markerShellRefs.current[i];
      if (core) {
        const m = core.material as THREE.MeshBasicMaterial;
        m.opacity = op;
        m.transparent = true;
        const s = THREE.MathUtils.lerp(0.5, 1, op);
        core.scale.setScalar(s);
      }
      if (shell) {
        const m = shell.material as THREE.MeshBasicMaterial;
        m.opacity = op * 0.55;
        m.transparent = true;
      }
    });
  });

  return (
    <group ref={group}>
      {/* Hairlines horizontais (grid de referência) */}
      {HAIRLINE_YS.map((y, i) => (
        <Line
          key={`hl-${i}`}
          points={[
            [-3, y, 0],
            [3, y, 0],
          ]}
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.1}
          lineWidth={1}
        />
      ))}

      {/* Curva — buffer estático pré-populado, reveal via setDrawRange. */}
      <line>
        <bufferGeometry ref={lineRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={SCENE_COLORS.paper}
          transparent
          opacity={0.85}
        />
      </line>

      {/* Marcadores: paper diamond + oxblood wireframe shell */}
      {markerPositions.map((pos, i) => (
        <group key={`mk-${i}`} position={[pos.x, pos.y, pos.z]}>
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
  // SVG fallback no mesmo "shape language" da cena 3D.
  // Mapeamento de coordenadas 3D → viewBox 600x320.
  // X: [-3,3] → [60,540]; Y: [-2,2] → [280,40]
  const mapX = (x: number) => 60 + ((x + 3) / 6) * 480;
  const mapY = (y: number) => 280 - ((y + 2) / 4) * 240;

  const start = { x: mapX(-2.5), y: mapY(-1.3) };
  const ctrl = { x: mapX(-0.3), y: mapY(-1.2) };
  const end = { x: mapX(2.5), y: mapY(1.7) };

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
        viewBox="0 0 600 320"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
      >
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
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          );
        })}
        <path
          d={`M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`}
          fill="none"
          stroke={SCENE_COLORS.paper}
          strokeOpacity={0.85}
          strokeWidth={1.5}
        />
        {markers.map((m, i) => (
          <g key={`m-${i}`}>
            <circle
              cx={m.x}
              cy={m.y}
              r={11}
              fill="none"
              stroke={SCENE_COLORS.oxblood}
              strokeOpacity={0.55}
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
        camera={{ position: [0, 0.2, 5.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView ? "always" : "never"}
        style={{ width: "100%", height: "100%" }}
      >
        <CurveRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
