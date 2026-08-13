"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({
  children,
  height = 420,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height={height} rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeDasharray={dashed ? "7 6" : undefined}
        strokeWidth="3"
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

function Grid({
  color = C.accent,
  columns = 5,
  rows = 4,
  x,
  y,
  width,
  height,
}: {
  color?: string;
  columns?: number;
  rows?: number;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="9" fill={C.surface} stroke={C.border} strokeWidth="2" />
      {Array.from({ length: columns - 1 }, (_, index) => {
        const px = x + (width / columns) * (index + 1);
        return <line key={`grid-x-${px}`} x1={px} x2={px} y1={y} y2={y + height} stroke={C.border} />;
      })}
      {Array.from({ length: rows - 1 }, (_, index) => {
        const py = y + (height / rows) * (index + 1);
        return <line key={`grid-y-${py}`} x1={x} x2={x + width} y1={py} y2={py} stroke={C.border} />;
      })}
      <circle cx={x + width * 0.55} cy={y + height * 0.45} r="17" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
    </g>
  );
}

function VelocityArrow({
  color = C.warning,
  length = 48,
  x,
  y,
}: {
  color?: string;
  length?: number;
  x: number;
  y: number;
}) {
  return <Arrow color={color} x1={x} x2={x + length} y1={y} y2={y - 18} />;
}

export function GpuGems3Ch30EulerianGridDiagram() {
  return (
    <Figure>
      <Frame
        height={440}
        label="欧拉网格流体模拟：固定位置的三维网格单元保存速度、密度和压力，只有数值在单元之间变化"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          a fixed grid carries changing fluid values
        </text>
        <g transform="translate(28 84)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            Eulerian volume
          </text>
          <Grid x={34} y={68} width={146} height={116} color={C.accent} />
          <VelocityArrow x={72} y={136} color={C.warning} />
          <VelocityArrow x={126} y={118} color={C.warning} length={34} />
          <text x="107" y="224" textAnchor="middle" fontSize="13" fill={C.accent}>fixed cell centers</text>
          <text x="107" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>u, density, pressure</text>
        </g>
        <Arrow x1={266} x2={304} y1={222} y2={222} color={C.accent} />
        <g transform="translate(320 84)">
          <rect width="188" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="94" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            3D texture slices
          </text>
          <Grid x={28} y={68} width={132} height={78} color={C.success} />
          <Grid x={38} y={102} width={132} height={78} color={C.accent} />
          <text x="94" y="224" textAnchor="middle" fontSize="13" fill={C.success}>z slice → 2D pass</text>
          <text x="94" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>one kernel per slice</text>
        </g>
        <Arrow x1={532} x2={570} y1={222} y2={222} color={C.success} />
        <g transform="translate(586 84)">
          <rect width="144" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="72" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>next step</text>
          <path d="M 34 190 C 48 118 96 118 110 190" fill="none" stroke={C.warning} strokeWidth="5" opacity="0.72" />
          <circle cx="72" cy="146" r="16" fill={C.accent} fillOpacity="0.52" />
          <Arrow x1={72} x2={106} y1={146} y2={126} color={C.warning} />
          <text x="72" y="224" textAnchor="middle" fontSize="13" fill={C.warning}>values advect</text>
          <text x="72" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>cells stay put</text>
        </g>
        <rect x="28" y="388" width="702" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="409" textAnchor="middle" fontSize="13" fill={C.secondary}>
          fixed connectivity maps naturally to GPU texture reads and writes
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch30AdvectionDiagram() {
  return (
    <Figure>
      <Frame
        height={414}
        label="半拉格朗日平流：从当前网格单元沿反向速度回溯到上一时刻位置，再在旧场中采样并写入当前单元"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          trace backward, then sample the old field
        </text>
        <rect x="32" y="78" width="696" height="222" rx="14" fill={C.surface} stroke={C.border} strokeWidth="2" />
        <Grid x={84} y={112} width={238} height={132} color={C.accent} />
        <Grid x={438} y={112} width={238} height={132} color={C.success} />
        <circle cx="242" cy="166" r="14" fill={C.warning} fillOpacity="0.72" />
        <circle cx="520" cy="196" r="14" fill={C.success} fillOpacity="0.72" />
        <VelocityArrow x={242} y={166} length={-110} color={C.warning} />
        <Arrow x1={242} x2={178} y1={166} y2={210} color={C.warning} dashed />
        <Arrow x1={520} x2={574} y1={196} y2={174} color={C.success} />
        <text x="203" y="98" textAnchor="middle" fontSize="14" fill={C.warning}>backtrace</text>
        <text x="557" y="98" textAnchor="middle" fontSize="14" fill={C.success}>new value</text>
        <text x="203" y="276" textAnchor="middle" fontSize="13" fill={C.secondary}>old velocity / density field</text>
        <text x="557" y="276" textAnchor="middle" fontSize="13" fill={C.secondary}>sample at traced position</text>
        <rect x="164" y="332" width="432" height="38" rx="9" fill={C.accent} fillOpacity="0.12" stroke={C.accent} />
        <text x="380" y="357" textAnchor="middle" fontSize="14" fill={C.accent}>
          xᶰ⁺¹(cell) = sample(xᶰ(cell) − Δt · u)
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch30PressureDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="压力投影：先计算速度散度，用 Jacobi 迭代解压力，再减去压力梯度以恢复不可压缩速度场"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          projection removes the velocity field&apos;s divergence
        </text>
        <g transform="translate(28 84)">
          <rect width="210" height="278" rx="14" fill={C.surface} stroke={C.danger} strokeWidth="2" />
          <text x="105" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · divergence</text>
          <Grid x={36} y={68} width={138} height={110} color={C.danger} />
          <VelocityArrow x={68} y={130} color={C.danger} />
          <VelocityArrow x={126} y={154} color={C.danger} length={30} />
          <text x="105" y="226" textAnchor="middle" fontSize="13" fill={C.danger}>∇ · u*</text>
          <text x="105" y="254" textAnchor="middle" fontSize="12" fill={C.secondary}>compress / expand</text>
        </g>
        <Arrow x1={264} x2={302} y1={223} y2={223} color={C.danger} />
        <g transform="translate(314 84)">
          <rect width="210" height="278" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="105" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · pressure solve</text>
          <Grid x={36} y={68} width={138} height={110} color={C.warning} />
          <circle cx="92" cy="120" r="22" fill={C.warning} fillOpacity="0.28" />
          <circle cx="144" cy="152" r="14" fill={C.warning} fillOpacity="0.52" />
          <text x="105" y="226" textAnchor="middle" fontSize="13" fill={C.warning}>Jacobi iterations</text>
          <text x="105" y="254" textAnchor="middle" fontSize="12" fill={C.secondary}>neighbor pressure</text>
        </g>
        <Arrow x1={550} x2={588} y1={223} y2={223} color={C.warning} />
        <g transform="translate(600 84)">
          <rect width="130" height="278" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="65" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · project</text>
          <Grid x={28} y={68} width={74} height={110} color={C.success} columns={3} />
          <VelocityArrow x={54} y={136} color={C.success} length={25} />
          <text x="65" y="226" textAnchor="middle" fontSize="13" fill={C.success}>u = u* − ∇p</text>
          <text x="65" y="254" textAnchor="middle" fontSize="12" fill={C.secondary}>divergence ≈ 0</text>
        </g>
        <rect x="28" y="392" width="702" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="413" textAnchor="middle" fontSize="13" fill={C.secondary}>
          pressure is the constraint correction, not a visible fluid quantity
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch30ObstacleLevelSetDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="固体障碍物与液体 level set：inside-outside 体素和障碍物速度决定边界条件，零等值面表示水面"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          boundaries and liquid surfaces live in the same grid
        </text>
        <g transform="translate(28 84)">
          <rect width="216" height="260" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="108" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>solid voxelization</text>
          <Grid x={38} y={68} width={140} height={102} color={C.warning} />
          <rect x="92" y="106" width="34" height="48" rx="6" fill={C.warning} fillOpacity="0.76" />
          <VelocityArrow x={108} y={106} color={C.warning} length={30} />
          <text x="108" y="214" textAnchor="middle" fontSize="13" fill={C.warning}>inside / outside</text>
          <text x="108" y="242" textAnchor="middle" fontSize="12" fill={C.secondary}>solid velocity near face</text>
        </g>
        <Arrow x1={270} x2={308} y1={214} y2={214} color={C.warning} />
        <g transform="translate(320 84)">
          <rect width="214" height="260" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>free-slip boundary</text>
          <Grid x={34} y={68} width={146} height={102} color={C.accent} />
          <rect x="96" y="106" width="28" height="48" rx="5" fill={C.warning} fillOpacity="0.62" />
          <VelocityArrow x={74} y={140} color={C.success} length={30} />
          <line x1="74" x2="124" y1="140" y2="140" stroke={C.success} strokeWidth="3" />
          <text x="107" y="214" textAnchor="middle" fontSize="13" fill={C.accent}>u · n = uₛₒₗᵢ𝒹 · n</text>
          <text x="107" y="242" textAnchor="middle" fontSize="12" fill={C.secondary}>no flow through solid</text>
        </g>
        <Arrow x1={560} x2={598} y1={214} y2={214} color={C.success} />
        <g transform="translate(610 84)">
          <rect width="120" height="260" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>water</text>
          <path d="M 28 166 C 48 128 76 178 98 136" fill="none" stroke={C.success} strokeWidth="4" />
          <text x="60" y="214" textAnchor="middle" fontSize="13" fill={C.success}>ϕ = 0 surface</text>
          <text x="60" y="242" textAnchor="middle" fontSize="12" fill={C.secondary}>ϕ &lt; 0 liquid</text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch30RayMarchDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="体积光线行进：预先生成射线入口和穿过体积的距离，沿射线采样密度并进行前到后合成"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          ray marching turns voxels into a composited image
        </text>
        <rect x="34" y="82" width="692" height="232" rx="14" fill={C.surface} stroke={C.border} strokeWidth="2" />
        <rect x="82" y="114" width="118" height="168" rx="10" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="2" />
        <rect x="558" y="114" width="118" height="168" rx="10" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="2" />
        <text x="141" y="102" textAnchor="middle" fontSize="14" fill={C.accent}>entry point</text>
        <text x="617" y="102" textAnchor="middle" fontSize="14" fill={C.success}>exit / scene depth</text>
        <line x1="141" x2="617" y1="198" y2="198" stroke={C.warning} strokeWidth="4" strokeDasharray="9 7" />
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const x = 190 + index * 76;
          return (
            <g key={`ray-sample-${index}`}>
              <circle cx={x} cy={198} r={index === 3 ? 15 : 11} fill={index === 3 ? C.warning : C.accent} fillOpacity={index === 3 ? 0.92 : 0.58} />
              <text x={x} y={203} textAnchor="middle" fontSize="11" fill={C.bg}>{index + 1}</text>
            </g>
          );
        })}
        <Arrow x1={236} x2={300} y1={174} y2={174} color={C.warning} />
        <text x="380" y="252" textAnchor="middle" fontSize="13" fill={C.secondary}>sample density → front-to-back alpha</text>
        <rect x="162" y="340" width="436" height="38" rx="9" fill={C.success} fillOpacity="0.12" stroke={C.success} />
        <text x="380" y="365" textAnchor="middle" fontSize="14" fill={C.success}>stop early when accumulated alpha is saturated</text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "grid", caption: "把体积离散成固定网格，并在三维纹理中保存速度与标量" },
  { label: "advect", caption: "沿速度场反向回溯，采样上一时刻的密度和速度" },
  { label: "project", caption: "解压力约束并减去梯度，使速度近似无散" },
  { label: "render", caption: "生成射线入口，沿体积采样并前到后合成" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  advect: "沿速度场反向回溯，采样上一时刻的密度和速度",
  grid: "把体积离散成固定网格，并在三维纹理中保存速度与标量",
  project: "解压力约束并减去梯度，使速度近似无散",
  render: "生成射线入口，沿体积采样并前到后合成",
};

export function GpuGems3Ch30PipelineDiagram() {
  const gridRef = useRef<SVGGElement>(null);
  const advectRef = useRef<SVGGElement>(null);
  const projectRef = useRef<SVGGElement>(null);
  const renderRef = useRef<SVGGElement>(null);
  const refs = [gridRef, advectRef, projectRef, renderRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.42 }, T * index);
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={454} label="三维流体四阶段管线：固定网格、平流、压力投影、体积光线行进">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          real-time fluid: simulate, constrain, then render
        </text>
        <g ref={gridRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="108" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · grid</text>
          <Grid x={52} y={150} width={112} height={88} color={C.accent} />
          <text x="108" y="282" textAnchor="middle" fontSize="13" fill={C.accent}>u, ρ, p</text>
          <text x="108" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>3D texture</text>
        </g>
        <Arrow x1={208} x2={230} y1={214} y2={214} color={C.accent} />
        <g ref={advectRef} style={{ opacity: 0.3 }}>
          <rect x="242" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="326" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · advect</text>
          <Grid x={270} y={150} width={112} height={88} color={C.warning} />
          <Arrow x1={326} x2={284} y1={194} y2={220} color={C.warning} dashed />
          <text x="326" y="282" textAnchor="middle" fontSize="13" fill={C.warning}>backtrace</text>
          <text x="326" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>semi-Lagrangian</text>
        </g>
        <Arrow x1={426} x2={448} y1={214} y2={214} color={C.warning} />
        <g ref={projectRef} style={{ opacity: 0.3 }}>
          <rect x="460" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="544" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · project</text>
          <Grid x={488} y={150} width={112} height={88} color={C.success} />
          <VelocityArrow x={520} y={204} color={C.success} />
          <text x="544" y="282" textAnchor="middle" fontSize="13" fill={C.success}>∇ · u ≈ 0</text>
          <text x="544" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>pressure solve</text>
        </g>
        <Arrow x1={644} x2={666} y1={214} y2={214} color={C.success} />
        <g ref={renderRef} style={{ opacity: 0.3 }}>
          <rect x="678" y="88" width="56" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="706" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <line x1="690" x2="722" y1="220" y2="178" stroke={C.warning} strokeWidth="4" strokeDasharray="6 5" />
          <circle cx="698" cy="210" r="6" fill={C.warning} />
          <circle cx="713" cy="190" r="6" fill={C.warning} />
          <text x="706" y="282" textAnchor="middle" fontSize="12" fill={C.accent}>ray</text>
          <text x="706" y="310" textAnchor="middle" fontSize="11" fill={C.secondary}>march</text>
        </g>
        <rect x="24" y="376" width="710" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          simulation state and rendering state share the volume, not the same pass
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察速度、压力和密度如何从网格数据变成一幅体积画面。" />
    </Figure>
  );
}

type QuantityMode = "fire" | "smoke" | "water";
type SolverMode = "stable" | "maccormack";
type ObstacleMode = "none" | "paddle";

const DEFAULTS = {
  iterations: 24,
  obstacle: "paddle" as ObstacleMode,
  quantity: "smoke" as QuantityMode,
  raySteps: 32,
  solver: "stable" as SolverMode,
};

export function GpuGems3Ch30FluidLab() {
  const [iterations, setIterations] = useState(DEFAULTS.iterations);
  const [obstacle, setObstacle] = useState<ObstacleMode>(DEFAULTS.obstacle);
  const [quantity, setQuantity] = useState<QuantityMode>(DEFAULTS.quantity);
  const [raySteps, setRaySteps] = useState(DEFAULTS.raySteps);
  const [solver, setSolver] = useState<SolverMode>(DEFAULTS.solver);

  const result = useMemo(() => {
    const solverGain = solver === "maccormack" ? 1.18 : 1;
    const pressureQuality = Math.min(0.98, 0.42 + iterations * 0.018);
    const divergence = Math.max(0.02, Math.round((1 - pressureQuality) * 100) / 100);
    const detail = Math.round((quantity === "fire" ? 0.9 : quantity === "water" ? 0.78 : 0.62) * solverGain * 100) / 100;
    const memory = quantity === "water" ? 48 : 41;
    const samples = obstacle === "paddle" ? raySteps + 8 : raySteps;
    const stability = solver === "stable" ? "robust" : "detail-preserving";
    return { detail, divergence, memory, pressureQuality, samples, stability };
  }, [iterations, obstacle, quantity, raySteps, solver]);

  const reset = () => {
    setIterations(DEFAULTS.iterations);
    setObstacle(DEFAULTS.obstacle);
    setQuantity(DEFAULTS.quantity);
    setRaySteps(DEFAULTS.raySteps);
    setSolver(DEFAULTS.solver);
  };

  const fluidTone = quantity === "fire" ? C.warning : quantity === "water" ? C.accent : C.secondary;
  const plumeHeight = quantity === "fire" ? 132 : quantity === "water" ? 78 : 110;
  const plumeOpacity = solver === "maccormack" ? 0.82 : 0.62;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 30</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">Real-Time 3D Fluid Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换烟、火和水的标量场，调整压力迭代、平流方案、障碍物和光线步数，观察稳定性、细节与成本。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 398" role="img" aria-label={`三维流体实验：${quantity}，${solver} 平流，压力迭代 ${iterations}，${obstacle} 障碍物，${raySteps} 光线步`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>grid → velocity → pressure → volume ray</text>
              <rect x="34" y="56" width="662" height="242" rx="12" fill={C.surface} stroke={C.border} />
              <Grid x={56} y={108} width={190} height={120} color={C.accent} />
              <VelocityArrow x={100} y={184} color={C.success} />
              <VelocityArrow x={160} y={166} color={C.success} length={34} />
              <path d={`M 386 244 C 334 ${244 - plumeHeight * 0.35} 406 ${244 - plumeHeight * 0.72} 382 ${244 - plumeHeight}`} fill="none" stroke={fluidTone} strokeWidth="28" opacity={plumeOpacity} />
              <path d={`M 402 244 C 452 ${244 - plumeHeight * 0.28} 416 ${244 - plumeHeight * 0.68} 436 ${244 - plumeHeight * 0.9}`} fill="none" stroke={fluidTone} strokeWidth="18" opacity={plumeOpacity * 0.72} />
              {obstacle === "paddle" && <rect x="346" y="184" width="76" height="16" rx="6" fill={C.warning} transform="rotate(-16 384 192)" />}
              <line x1="560" x2="662" y1="96" y2="248" stroke={C.warning} strokeWidth="4" strokeDasharray="8 6" />
              {[0, 1, 2, 3].map((index) => <circle key={`lab-ray-${index}`} cx={574 + index * 24} cy={116 + index * 34} r="7" fill={C.warning} fillOpacity="0.76" />)}
              <text x="150" y="270" textAnchor="middle" fontSize="12" fill={C.accent}>3D texture slices</text>
              <text x="384" y="270" textAnchor="middle" fontSize="12" fill={fluidTone}>density / level set</text>
              <text x="612" y="270" textAnchor="middle" fontSize="12" fill={C.warning}>ray samples</text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>detail {result.detail} · divergence {result.divergence} · pressure quality {Math.round(result.pressureQuality * 100)}%</text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={result.stability === "robust" ? C.success : C.warning}>{result.stability} · {result.samples} ray samples · {result.memory} bytes/cell budget</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="散度残差" tone={C.danger} value={`${result.divergence}`} />
            <Metric label="压力质量" tone={C.success} value={`${Math.round(result.pressureQuality * 100)}%`} />
            <Metric label="渲染采样" tone={C.warning} value={`${result.samples}`} />
            <Metric label="状态内存" tone={C.secondary} value={`${result.memory} B/cell`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch30-quantity">fluid quantity<select id="ch30-quantity" value={quantity} onChange={(event) => setQuantity(event.target.value as QuantityMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="smoke">smoke density</option><option value="fire">fire temperature</option><option value="water">water level set</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch30-solver">advection solver<select id="ch30-solver" value={solver} onChange={(event) => setSolver(event.target.value as SolverMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="stable">stable semi-Lagrangian</option><option value="maccormack">MacCormack detail</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch30-obstacle">solid obstacle<select id="ch30-obstacle" value={obstacle} onChange={(event) => setObstacle(event.target.value as ObstacleMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="none">empty domain</option><option value="paddle">moving paddle</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch30-iterations">pressure iterations: {iterations}<input id="ch30-iterations" type="range" min="4" max="48" step="4" value={iterations} onChange={(event) => setIterations(Number(event.target.value))} className="mt-3 block w-full accent-[var(--accent)]" /></label>
          <label className="block text-sm text-secondary" htmlFor="ch30-ray">ray steps: {raySteps}<input id="ch30-ray" type="range" min="16" max="64" step="8" value={raySteps} onChange={(event) => setRaySteps(Number(event.target.value))} className="mt-3 block w-full accent-[var(--accent)]" /></label>
        </div>
      </div>
    </div>
  );
}
