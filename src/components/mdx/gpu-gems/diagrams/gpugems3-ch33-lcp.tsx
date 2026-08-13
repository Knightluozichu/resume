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

function PolyShape({
  fill,
  label,
  x,
  y,
}: {
  fill: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <path d={`M ${x - 54} ${y + 30} L ${x - 40} ${y - 38} L ${x + 24} ${y - 54} L ${x + 58} ${y - 2} L ${x + 28} ${y + 42} Z`} fill={fill} fillOpacity="0.2" stroke={fill} strokeWidth="3" />
      <text x={x} y={y + 76} textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>{label}</text>
    </g>
  );
}

function Matrix({
  columns,
  rows,
  x,
  y,
  width,
  height,
  accentColumn = -1,
}: {
  columns: number;
  rows: number;
  x: number;
  y: number;
  width: number;
  height: number;
  accentColumn?: number;
}) {
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="8" fill={C.surface} stroke={C.border} strokeWidth="2" />
      {Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        return (
          <rect
            key={`matrix-cell-${index}`}
            x={x + column * cellWidth}
            y={y + row * cellHeight}
            width={cellWidth}
            height={cellHeight}
            fill={column === accentColumn ? C.accent : "transparent"}
            fillOpacity={column === accentColumn ? 0.18 : 1}
            stroke={C.border}
          />
        );
      })}
    </g>
  );
}

export function GpuGems3Ch33PhysicsPipelineDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="刚体物理三阶段：broad phase 生成候选 pair，narrow phase 求精确距离和接触，resolution phase 计算力并积分"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one physics step, three different kinds of work
        </text>
        <g transform="translate(28 86)">
          <rect width="214" height="258" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>broad phase</text>
          <circle cx="76" cy="124" r="18" fill={C.accent} fillOpacity="0.22" stroke={C.accent} strokeWidth="3" />
          <circle cx="140" cy="124" r="18" fill={C.success} fillOpacity="0.22" stroke={C.success} strokeWidth="3" />
          <Arrow x1={96} x2={120} y1={124} y2={124} color={C.warning} />
          <text x="107" y="198" textAnchor="middle" fontSize="13" fill={C.accent}>bounding volume</text>
          <text x="107" y="226" textAnchor="middle" fontSize="12" fill={C.secondary}>candidate pair list</text>
        </g>
        <Arrow x1={264} x2={302} y1={215} y2={215} color={C.accent} />
        <g transform="translate(320 86)">
          <rect width="214" height="258" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>narrow phase</text>
          <PolyShape x={78} y={126} fill={C.accent} label="convex A" />
          <PolyShape x={138} y={126} fill={C.success} label="convex B" />
          <circle cx="108" cy="122" r="7" fill={C.warning} />
          <text x="107" y="220" textAnchor="middle" fontSize="13" fill={C.warning}>distance / contact</text>
          <text x="107" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>points and normals</text>
        </g>
        <Arrow x1={556} x2={594} y1={215} y2={215} color={C.warning} />
        <g transform="translate(612 86)">
          <rect width="120" height="258" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="60" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>resolve</text>
          <Arrow x1={36} x2={84} y1={130} y2={130} color={C.success} />
          <text x="60" y="198" textAnchor="middle" fontSize="13" fill={C.success}>forces</text>
          <text x="60" y="226" textAnchor="middle" fontSize="12" fill={C.secondary}>integrate</text>
        </g>
        <rect x="28" y="374" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="394" textAnchor="middle" fontSize="13" fill={C.secondary}>
          LCP is a narrow-phase solver: it turns convex geometry constraints into a cooperative CUDA workload
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch33ConvexDistanceDiagram() {
  return (
    <Figure>
      <Frame
        height={440}
        label="两个凸多边形的距离查询：把每个形状写成 half-space 约束，寻找两者内部点之间的最小距离"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          distance between two convex shapes is an optimization problem
        </text>
        <g transform="translate(28 84)">
          <rect width="318" height="278" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="159" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>shape constraints</text>
          <PolyShape x={105} y={142} fill={C.accent} label="A" />
          <PolyShape x={220} y={142} fill={C.success} label="B" />
          <line x1="132" x2="194" y1="142" y2="142" stroke={C.warning} strokeWidth="3" strokeDasharray="8 6" />
          <circle cx="132" cy="142" r="6" fill={C.warning} />
          <circle cx="194" cy="142" r="6" fill={C.warning} />
          <text x="159" y="230" textAnchor="middle" fontSize="13" fill={C.warning}>minimize ‖P₀ − P₁‖²</text>
          <text x="159" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>P₀ ∈ A and P₁ ∈ B</text>
        </g>
        <Arrow x1={378} x2={416} y1={222} y2={222} color={C.warning} />
        <g transform="translate(438 84)">
          <rect width="294" height="278" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="147" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>half-space view</text>
          <Matrix x={52} y={70} width={190} height={100} columns={4} rows={3} accentColumn={1} />
          <text x="147" y="204" textAnchor="middle" fontSize="13" fill={C.success}>A x ≤ b,  −x ≤ 0</text>
          <text x="147" y="232" textAnchor="middle" fontSize="12" fill={C.secondary}>each face becomes a constraint</text>
          <text x="147" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>solution keeps the closest points</text>
        </g>
        <rect x="28" y="390" width="704" height="26" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="408" textAnchor="middle" fontSize="13" fill={C.secondary}>
          convexity makes the quadratic objective globally well behaved when a solution exists
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch33ComplementarityDiagram() {
  return (
    <Figure>
      <Frame
        height={426}
        label="线性互补问题：w = Mz + q、w 和 z 非负，并且每一对分量至少有一个为零"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          complementarity chooses one active side of each pair
        </text>
        <rect x="44" y="84" width="672" height="90" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
        <text x="380" y="124" textAnchor="middle" fontSize="18" fill={C.accent}>w = Mz + q</text>
        <text x="380" y="152" textAnchor="middle" fontSize="14" fill={C.secondary}>w ≥ 0, z ≥ 0, and wᵢ · zᵢ = 0</text>
        <g transform="translate(74 224)">
          <rect width="180" height="116" rx="12" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="90" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>pair 0</text>
          <circle cx="58" cy="72" r="18" fill={C.warning} fillOpacity="0.24" stroke={C.warning} strokeWidth="2" />
          <text x="58" y="78" textAnchor="middle" fontSize="14" fill={C.warning}>w₀</text>
          <text x="90" y="78" textAnchor="middle" fontSize="14" fill={C.secondary}>or</text>
          <circle cx="122" cy="72" r="18" fill={C.success} fillOpacity="0.24" stroke={C.success} strokeWidth="2" />
          <text x="122" y="78" textAnchor="middle" fontSize="14" fill={C.success}>z₀</text>
        </g>
        <g transform="translate(290 224)">
          <rect width="180" height="116" rx="12" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="90" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>pair 1</text>
          <circle cx="58" cy="72" r="18" fill={C.accent} fillOpacity="0.24" stroke={C.accent} strokeWidth="2" />
          <text x="58" y="78" textAnchor="middle" fontSize="14" fill={C.accent}>w₁</text>
          <text x="90" y="78" textAnchor="middle" fontSize="14" fill={C.secondary}>or</text>
          <circle cx="122" cy="72" r="18" fill={C.danger} fillOpacity="0.24" stroke={C.danger} strokeWidth="2" />
          <text x="122" y="78" textAnchor="middle" fontSize="14" fill={C.danger}>z₁</text>
        </g>
        <g transform="translate(506 224)">
          <rect width="180" height="116" rx="12" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="90" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>pair i</text>
          <circle cx="58" cy="72" r="18" fill={C.success} fillOpacity="0.24" stroke={C.success} strokeWidth="2" />
          <text x="58" y="78" textAnchor="middle" fontSize="14" fill={C.success}>wᵢ</text>
          <text x="90" y="78" textAnchor="middle" fontSize="14" fill={C.secondary}>or</text>
          <circle cx="122" cy="72" r="18" fill={C.warning} fillOpacity="0.24" stroke={C.warning} strokeWidth="2" />
          <text x="122" y="78" textAnchor="middle" fontSize="14" fill={C.warning}>zᵢ</text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch33PivotDiagram() {
  return (
    <Figure>
      <Frame
        height={446}
        label="Lemke 算法的 complementary pivot：从当前 basis 选择进入变量，用最小比值测试选择离开变量，再更新矩阵列"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          Lemke pivots one basis toward complementarity
        </text>
        <g transform="translate(28 86)">
          <rect width="212" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>current basis</text>
          <Matrix x={42} y={70} width={128} height={126} columns={4} rows={5} accentColumn={1} />
          <text x="106" y="232" textAnchor="middle" fontSize="13" fill={C.accent}>pivot column ready</text>
          <text x="106" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>one variable leaves</text>
        </g>
        <Arrow x1={274} x2={314} y1={224} y2={224} color={C.warning} />
        <g transform="translate(334 86)">
          <rect width="212" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="106" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>minimum ratio</text>
          <line x1="46" x2="166" y1="86" y2="86" stroke={C.border} strokeWidth="3" />
          <circle cx="70" cy="86" r="10" fill={C.warning} />
          <circle cx="106" cy="86" r="10" fill={C.success} />
          <circle cx="142" cy="86" r="10" fill={C.accent} />
          <text x="106" y="132" textAnchor="middle" fontSize="13" fill={C.warning}>smallest valid ratio</text>
          <text x="106" y="180" textAnchor="middle" fontSize="13" fill={C.secondary}>complementary variable</text>
          <Arrow x1={106} x2={106} y1={198} y2={232} color={C.warning} />
          <text x="106" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>choose leaving row</text>
        </g>
        <Arrow x1={580} x2={620} y1={224} y2={224} color={C.success} />
        <g transform="translate(640 86)">
          <rect width="92" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="46" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>next</text>
          <Arrow x1={26} x2={66} y1={118} y2={118} color={C.success} />
          <text x="46" y="180" textAnchor="middle" fontSize="13" fill={C.success}>pivot</text>
          <text x="46" y="208" textAnchor="middle" fontSize="12" fill={C.secondary}>repeat</text>
          <text x="46" y="242" textAnchor="middle" fontSize="12" fill={C.secondary}>or stop</text>
        </g>
        <rect x="28" y="390" width="704" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="409" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the pivot choice is sequential; row updates and ratio scans are the parallel work
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch33CudaBlockDiagram() {
  return (
    <Figure>
      <Frame
        height={450}
        label="CUDA LCP 求解器：每个 collision pair 映射到一个 block，每个线程负责一条方程，pivot column 放入 shared memory 后协同更新"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one collision pair, one cooperative CUDA block
        </text>
        <g transform="translate(28 86)">
          <rect width="218" height="278" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="109" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>collision pair list</text>
          {[0, 1, 2, 3].map((index) => (
            <rect key={`pair-row-${index}`} x="42" y={66 + index * 42} width="134" height="26" rx="7" fill={index === 1 ? C.accent : C.surface} fillOpacity={index === 1 ? 0.18 : 1} stroke={index === 1 ? C.accent : C.border} />
          ))}
          <text x="109" y="84" textAnchor="middle" fontSize="12" fill={C.text}>pair 0</text>
          <text x="109" y="126" textAnchor="middle" fontSize="12" fill={C.accent}>pair 1 → block</text>
          <text x="109" y="168" textAnchor="middle" fontSize="12" fill={C.text}>pair 2</text>
          <text x="109" y="210" textAnchor="middle" fontSize="12" fill={C.text}>pair 3</text>
          <text x="109" y="254" textAnchor="middle" fontSize="13" fill={C.secondary}>independent solutions</text>
        </g>
        <Arrow x1={274} x2={314} y1={224} y2={224} color={C.accent} />
        <g transform="translate(334 86)">
          <rect width="398" height="278" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="199" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>block for one LCP</text>
          <Matrix x={36} y={66} width={164} height={146} columns={4} rows={5} accentColumn={2} />
          <text x="118" y="238" textAnchor="middle" fontSize="13" fill={C.accent}>one thread per equation</text>
          <rect x="236" y="66" width="124" height="72" rx="10" fill={C.warning} fillOpacity="0.14" stroke={C.warning} />
          <text x="298" y="96" textAnchor="middle" fontSize="13" fill={C.warning}>shared pivot</text>
          <text x="298" y="120" textAnchor="middle" fontSize="12" fill={C.secondary}>column + flags</text>
          <Arrow x1={298} x2={298} y1={154} y2={188} color={C.warning} />
          <text x="298" y="222" textAnchor="middle" fontSize="13" fill={C.success}>solve + terminate</text>
          <text x="298" y="250" textAnchor="middle" fontSize="12" fill={C.secondary}>pack P₀ and P₁</text>
        </g>
        <rect x="28" y="394" width="704" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="413" textAnchor="middle" fontSize="13" fill={C.secondary}>
          blocks may have idle threads for variable equation counts, but one kernel handles the whole pair list
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "为一对凸体建立半空间约束、M 与 q，并初始化基本变量" },
  { label: "pivot", caption: "根据互补规则和最小比值测试选出下一 pivot" },
  { label: "solve", caption: "每个线程更新自己负责的方程行，shared memory 保存公共列" },
  { label: "pack", caption: "检查互补解或不可解状态，并打包接触点结果" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  pack: "检查互补解或不可解状态，并打包接触点结果",
  pivot: "根据互补规则和最小比值测试选出下一 pivot",
  setup: "为一对凸体建立半空间约束、M 与 q，并初始化基本变量",
  solve: "每个线程更新自己负责的方程行，shared memory 保存公共列",
};

export function GpuGems3Ch33PipelineDiagram() {
  const setupRef = useRef<SVGGElement>(null);
  const pivotRef = useRef<SVGGElement>(null);
  const solveRef = useRef<SVGGElement>(null);
  const packRef = useRef<SVGGElement>(null);
  const refs = [setupRef, pivotRef, solveRef, packRef];
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
      <Frame height={454} label="CUDA LCP 求解器的四阶段教学管线：setup、pivot、方程更新、结果打包">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          from convex constraints to a packed contact point
        </text>
        <g ref={setupRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="108" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · setup</text>
          <Matrix x={52} y={154} width={112} height={76} columns={4} rows={3} />
          <text x="108" y="282" textAnchor="middle" fontSize="13" fill={C.accent}>M, q, basis</text>
          <text x="108" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>convex constraints</text>
        </g>
        <Arrow x1={208} x2={230} y1={214} y2={214} color={C.accent} />
        <g ref={pivotRef} style={{ opacity: 0.3 }}>
          <rect x="242" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="326" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · pivot</text>
          <Arrow x1={284} x2={368} y1={190} y2={190} color={C.warning} />
          <circle cx="326" cy="190" r="15" fill={C.warning} fillOpacity="0.24" stroke={C.warning} />
          <text x="326" y="282" textAnchor="middle" fontSize="13" fill={C.warning}>ratio test</text>
          <text x="326" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>enter / leave</text>
        </g>
        <Arrow x1={426} x2={448} y1={214} y2={214} color={C.warning} />
        <g ref={solveRef} style={{ opacity: 0.3 }}>
          <rect x="460" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="544" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · solve</text>
          <Matrix x={488} y={154} width={112} height={76} columns={4} rows={3} accentColumn={1} />
          <text x="544" y="282" textAnchor="middle" fontSize="13" fill={C.success}>row updates</text>
          <text x="544" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>shared pivot column</text>
        </g>
        <Arrow x1={644} x2={666} y1={214} y2={214} color={C.success} />
        <g ref={packRef} style={{ opacity: 0.3 }}>
          <rect x="678" y="88" width="56" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="706" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <circle cx="706" cy="190" r="18" fill={C.success} fillOpacity="0.24" stroke={C.success} strokeWidth="3" />
          <path d="M 697 190 L 704 197 L 717 181" fill="none" stroke={C.success} strokeWidth="3" />
          <text x="706" y="282" textAnchor="middle" fontSize="12" fill={C.accent}>pack</text>
          <text x="706" y="310" textAnchor="middle" fontSize="11" fill={C.secondary}>P₀, P₁</text>
        </g>
        <rect x="24" y="376" width="710" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          pivot selection is sequential; matrix rows and pair instances are the parallel surface
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察一对凸体如何从约束矩阵走到接触点结果。" />
    </Figure>
  );
}

type ContactMode = "distance" | "force";
type ObjectComplexity = "complex" | "simple";
type PairCount = "many" | "few";
type SolverMode = "cpu" | "cuda";

const DEFAULTS = {
  contacts: "distance" as ContactMode,
  objects: "complex" as ObjectComplexity,
  pairs: "many" as PairCount,
  pivotLimit: 12,
  solver: "cuda" as SolverMode,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch33LCPLab() {
  const [contacts, setContacts] = useState<ContactMode>(DEFAULTS.contacts);
  const [objects, setObjects] = useState<ObjectComplexity>(DEFAULTS.objects);
  const [pairs, setPairs] = useState<PairCount>(DEFAULTS.pairs);
  const [pivotLimit, setPivotLimit] = useState(DEFAULTS.pivotLimit);
  const [solver, setSolver] = useState<SolverMode>(DEFAULTS.solver);

  const result = useMemo(() => {
    const pairCount = pairs === "many" ? 24000 : 2400;
    const equations = objects === "complex" ? 129 : 10;
    const setupCost = Math.round(pairCount * (objects === "complex" ? 4.8 : 1.5));
    const pivotIterations = Math.min(pivotLimit, Math.max(3, Math.round(equations * (objects === "complex" ? 0.42 : 0.3))));
    const baseQueries = solver === "cuda" ? 69000 : 21000;
    const contactCost = contacts === "force" ? 1.32 : 1;
    const queriesPerSecond = Math.max(1800, Math.round((baseQueries / contactCost) * (objects === "complex" ? 0.72 : 1) * (pairs === "many" ? 1 : 1.42)));
    const sharedReuse = solver === "cuda" ? "shared pivot column" : "host-controlled rows";
    const resultKind = contacts === "distance" ? "P₀ / P₁ contact points" : "constraint force impulse";
    return { equations, pivotIterations, queriesPerSecond, resultKind, setupCost, sharedReuse };
  }, [contacts, objects, pairs, pivotLimit, solver]);

  const reset = () => {
    setContacts(DEFAULTS.contacts);
    setObjects(DEFAULTS.objects);
    setPairs(DEFAULTS.pairs);
    setPivotLimit(DEFAULTS.pivotLimit);
    setSolver(DEFAULTS.solver);
  };

  const matrixColumns = objects === "complex" ? 5 : 4;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 33</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">CUDA LCP Collision Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换距离查询与接触力、凸体复杂度、pair 数和 solver，观察方程数、pivot 迭代和吞吐的变化。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 398" role="img" aria-label={`LCP 实验：${pairs} pair，${objects} 凸体，${solver}，${contacts}，pivot 上限 ${pivotLimit}`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>pair → convex constraints → pivot → contact result</text>
              <rect x="34" y="56" width="662" height="242" rx="12" fill={C.surface} stroke={C.border} />
              <circle cx="116" cy="150" r="28" fill={C.accent} fillOpacity="0.22" stroke={C.accent} strokeWidth="3" />
              <circle cx="174" cy="184" r="28" fill={C.success} fillOpacity="0.22" stroke={C.success} strokeWidth="3" />
              <Arrow x1={144} x2={194} y1={160} y2={172} color={C.warning} />
              <text x="145" y="248" textAnchor="middle" fontSize="12" fill={C.accent}>convex pair</text>
              <Arrow x1={230} x2={282} y1={170} y2={170} color={C.warning} />
              <Matrix x={300} y={100} width={132} height={122} columns={matrixColumns} rows={4} accentColumn={1} />
              <text x="366" y="248" textAnchor="middle" fontSize="12" fill={C.warning}>{result.equations} equations</text>
              <Arrow x1={466} x2={516} y1={170} y2={170} color={C.success} />
              <circle cx="580" cy="150" r="24" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="3" />
              <path d="M 568 150 L 577 159 L 593 139" fill="none" stroke={C.success} strokeWidth="4" />
              <text x="580" y="204" textAnchor="middle" fontSize="12" fill={C.success}>solution</text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>{formatNumber(result.setupCost)} setup units · {result.pivotIterations} pivot iterations · {formatNumber(result.queriesPerSecond)} queries/s</text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={C.success}>{result.resultKind} · {result.sharedReuse} · {solver === "cuda" ? "cooperative block" : "serial control"}</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="equations / pair" tone={C.accent} value={`${result.equations}`} />
            <Metric label="pivot iterations" tone={C.warning} value={`${result.pivotIterations}`} />
            <Metric label="setup units" tone={C.danger} value={formatNumber(result.setupCost)} />
            <Metric label="queries / second" tone={C.success} value={formatNumber(result.queriesPerSecond)} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch33-pairs">collision pairs<select id="ch33-pairs" value={pairs} onChange={(event) => setPairs(event.target.value as PairCount)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="few">few: 2,400</option><option value="many">many: 24,000</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch33-objects">convex complexity<select id="ch33-objects" value={objects} onChange={(event) => setObjects(event.target.value as ObjectComplexity)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="simple">simple: 10 equations</option><option value="complex">complex: 129 equations</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch33-contacts">solver target<select id="ch33-contacts" value={contacts} onChange={(event) => setContacts(event.target.value as ContactMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="distance">distance / contact points</option><option value="force">resting contact force</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch33-solver">execution mode<select id="ch33-solver" value={solver} onChange={(event) => setSolver(event.target.value as SolverMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="cuda">CUDA cooperative block</option><option value="cpu">CPU reference</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch33-pivot">pivot limit: {pivotLimit}<input id="ch33-pivot" type="range" min="4" max="24" step="4" value={pivotLimit} onChange={(event) => setPivotLimit(Number(event.target.value))} className="mt-3 block w-full accent-[var(--accent)]" /></label>
        </div>
      </div>
    </div>
  );
}
