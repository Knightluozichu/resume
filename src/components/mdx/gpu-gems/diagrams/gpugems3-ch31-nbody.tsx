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

function Body({
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
      <circle cx={x} cy={y} r="29" fill={fill} fillOpacity="0.24" stroke={fill} strokeWidth="3" />
      <circle cx={x} cy={y} r="7" fill={fill} />
      <text x={x} y={y + 56} textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>
        {label}
      </text>
    </g>
  );
}

function Tile({
  columns,
  rows,
  x,
  y,
  width,
  height,
  highlight = false,
}: {
  columns: number;
  rows: number;
  x: number;
  y: number;
  width: number;
  height: number;
  highlight?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="9"
        fill={highlight ? C.accent : C.surface}
        fillOpacity={highlight ? 0.15 : 1}
        stroke={highlight ? C.accent : C.border}
        strokeWidth="2"
      />
      {Array.from({ length: columns - 1 }, (_, index) => {
        const px = x + (width / columns) * (index + 1);
        return <line key={`tile-x-${px}`} x1={px} x2={px} y1={y} y2={y + height} stroke={C.border} />;
      })}
      {Array.from({ length: rows - 1 }, (_, index) => {
        const py = y + (height / rows) * (index + 1);
        return <line key={`tile-y-${py}`} x1={x} x2={x + width} y1={py} y2={py} stroke={C.border} />;
      })}
    </g>
  );
}

export function GpuGems3Ch31ForceDiagram() {
  return (
    <Figure>
      <Frame
        height={432}
        label="N 体问题的单体交互：从两个带位置和质量的 body 计算距离、软化后的引力，再累加到目标加速度"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one body-body interaction, one reusable kernel
        </text>
        <Body x={154} y={184} fill={C.accent} label="body i" />
        <Body x={606} y={184} fill={C.success} label="body j" />
        <line x1="184" x2="576" y1="184" y2="184" stroke={C.border} strokeWidth="2" strokeDasharray="8 7" />
        <Arrow x1={202} x2={300} y1={154} y2={126} color={C.warning} />
        <Arrow x1={558} x2={460} y1={214} y2={242} color={C.success} dashed />
        <text x="380" y="142" textAnchor="middle" fontSize="15" fill={C.warning}>
          rᵢⱼ = xⱼ − xᵢ
        </text>
        <text x="380" y="232" textAnchor="middle" fontSize="15" fill={C.success}>
          aᵢ ← aᵢ + mⱼ · rᵢⱼ / (|rᵢⱼ|² + ε²)³ᐟ²
        </text>
        <rect x="116" y="306" width="528" height="70" rx="12" fill={C.surface} stroke={C.accent} strokeWidth="2" />
        <text x="380" y="334" textAnchor="middle" fontSize="14" fill={C.text}>
          softening ε prevents a near-zero distance from exploding the force
        </text>
        <text x="380" y="358" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the same pair kernel can represent gravity, electrostatics, or other mutual forces
        </text>
        <rect x="28" y="394" width="704" height="26" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="412" textAnchor="middle" fontSize="13" fill={C.secondary}>
          each target body accumulates N interactions before integration
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch31TileReuseDiagram() {
  return (
    <Figure>
      <Frame
        height={452}
        label="all-pairs N 体计算的 tile 复用：p 个目标 body 与 p 个 shared memory body 产生 p 乘 p 次交互，读取的数据只加载一次"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          p bodies in shared memory produce p² interactions
        </text>
        <g transform="translate(28 86)">
          <rect width="190" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="95" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            global memory
          </text>
          <Tile x={37} y={64} width={116} height={134} columns={4} rows={5} />
          <Arrow x1={95} x2={95} y1={218} y2={248} color={C.warning} />
          <text x="95" y="270" textAnchor="middle" fontSize="13" fill={C.warning}>
            load p positions
          </text>
        </g>
        <Arrow x1={244} x2={282} y1={220} y2={220} color={C.warning} />
        <g transform="translate(294 86)">
          <rect width="208" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="104" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            shared tile
          </text>
          <Tile x={38} y={64} width={132} height={132} columns={4} rows={4} highlight />
          <text x="104" y="226" textAnchor="middle" fontSize="13" fill={C.accent}>
            reuse p values
          </text>
          <text x="104" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>
            one load per body
          </text>
        </g>
        <Arrow x1={528} x2={566} y1={220} y2={220} color={C.accent} />
        <g transform="translate(578 86)">
          <rect width="154" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="77" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            p threads
          </text>
          <Tile x={27} y={64} width={100} height={132} columns={4} rows={4} />
          <text x="77" y="226" textAnchor="middle" fontSize="13" fill={C.success}>
            p² pair forces
          </text>
          <text x="77" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>
            update p accelerations
          </text>
        </g>
        <rect x="28" y="388" width="704" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="410" textAnchor="middle" fontSize="13" fill={C.secondary}>
          2p body descriptions feed p² interactions; the saved bandwidth is the optimization
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch31BlockDiagram() {
  return (
    <Figure>
      <Frame
        height={454}
        label="CUDA all-pairs kernel：每个线程块负责 p 个目标 body，循环加载 N 除以 p 个 tile；两次同步保护 shared memory"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one block owns p rows and walks across N / p tiles
        </text>
        <g transform="translate(34 84)">
          <rect width="270" height="288" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="135" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            block: p threads
          </text>
          <Tile x={42} y={66} width={186} height={88} columns={6} rows={3} highlight />
          <text x="135" y="182" textAnchor="middle" fontSize="13" fill={C.accent}>
            tile 0: load → sync → interact
          </text>
          <Tile x={42} y={206} width={186} height={48} columns={6} rows={2} />
          <text x="135" y="278" textAnchor="middle" fontSize="13" fill={C.secondary}>
            repeat for tile 1 … N / p
          </text>
        </g>
        <Arrow x1={334} x2={374} y1={228} y2={228} color={C.warning} />
        <g transform="translate(396 84)">
          <rect width="330" height="288" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="165" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            synchronization boundaries
          </text>
          <line x1="34" x2="296" y1="92" y2="92" stroke={C.border} strokeWidth="3" />
          <circle cx="72" cy="92" r="12" fill={C.warning} />
          <circle cx="165" cy="92" r="12" fill={C.accent} />
          <circle cx="258" cy="92" r="12" fill={C.success} />
          <text x="72" y="126" textAnchor="middle" fontSize="13" fill={C.warning}>load</text>
          <text x="165" y="126" textAnchor="middle" fontSize="13" fill={C.accent}>sync</text>
          <text x="258" y="126" textAnchor="middle" fontSize="13" fill={C.success}>compute</text>
          <Arrow x1={165} x2={165} y1={150} y2={204} color={C.accent} />
          <text x="165" y="234" textAnchor="middle" fontSize="13" fill={C.text}>
            second sync before overwrite
          </text>
          <text x="165" y="262" textAnchor="middle" fontSize="12" fill={C.secondary}>
            next tile may reuse the same shared array
          </text>
        </g>
        <rect x="28" y="396" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="416" textAnchor="middle" fontSize="13" fill={C.secondary}>
          grid size N / p gives one thread per target body and N total target updates
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch31OptimizationDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="N 体性能取舍：增大 tile 减少全局内存读取，循环展开减少控制开销，但 tile 过大或 N 过小会降低占用率"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          performance is a balance: reuse, occupancy, and instruction flow
        </text>
        <line x1="86" x2="86" y1="344" y2="84" stroke={C.border} strokeWidth="2" />
        <line x1="86" x2="690" y1="344" y2="344" stroke={C.border} strokeWidth="2" />
        <text x="74" y="96" textAnchor="end" fontSize="13" fill={C.secondary}>throughput</text>
        <text x="690" y="370" textAnchor="end" fontSize="13" fill={C.secondary}>tile p / unroll factor</text>
        <path d="M 104 314 C 190 260 246 190 332 150 C 414 112 478 140 546 182 C 604 220 646 266 676 312" fill="none" stroke={C.accent} strokeWidth="5" />
        <circle cx="332" cy="150" r="10" fill={C.success} />
        <line x1="332" x2="332" y1="150" y2="344" stroke={C.success} strokeDasharray="7 6" strokeWidth="2" />
        <text x="332" y="126" textAnchor="middle" fontSize="14" fill={C.success}>sweet spot</text>
        <rect x="104" y="94" width="168" height="58" rx="10" fill={C.surface} stroke={C.warning} />
        <text x="188" y="120" textAnchor="middle" fontSize="13" fill={C.warning}>small p</text>
        <text x="188" y="141" textAnchor="middle" fontSize="12" fill={C.secondary}>more global loads</text>
        <rect x="480" y="94" width="188" height="58" rx="10" fill={C.surface} stroke={C.danger} />
        <text x="574" y="120" textAnchor="middle" fontSize="13" fill={C.danger}>large p or tiny N</text>
        <text x="574" y="141" textAnchor="middle" fontSize="12" fill={C.secondary}>idle multiprocessors</text>
        <rect x="98" y="394" width="564" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="413" textAnchor="middle" fontSize="13" fill={C.secondary}>
          unrolling cuts loop overhead; it cannot repair a launch with too little parallel work
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "force", caption: "对当前目标 body 与一个 tile 中的 body 计算 pair force" },
  { label: "tile", caption: "把 p 个 body 载入 shared memory，并在 p 个线程间复用" },
  { label: "grid", caption: "用 N / p 个 block 覆盖所有目标 body，每个线程累加 N 次交互" },
  { label: "tune", caption: "用 tile 大小、循环展开和小规模 N 的多线程策略调节吞吐" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  force: "对当前目标 body 与一个 tile 中的 body 计算 pair force",
  grid: "用 N / p 个 block 覆盖所有目标 body，每个线程累加 N 次交互",
  tile: "把 p 个 body 载入 shared memory，并在 p 个线程间复用",
  tune: "用 tile 大小、循环展开和小规模 N 的多线程策略调节吞吐",
};

export function GpuGems3Ch31PipelineDiagram() {
  const forceRef = useRef<SVGGElement>(null);
  const tileRef = useRef<SVGGElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const tuneRef = useRef<SVGGElement>(null);
  const refs = [forceRef, tileRef, gridRef, tuneRef];
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
      <Frame height={454} label="CUDA N 体算法的四阶段教学管线：单体力核、tile 复用、thread block 网格和性能调优">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          from one interaction to a tuned all-pairs kernel
        </text>
        <g ref={forceRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="108" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · force</text>
          <Body x={78} y={184} fill={C.accent} label="i" />
          <Body x={138} y={184} fill={C.success} label="j" />
          <Arrow x1={96} x2={120} y1={166} y2={166} color={C.warning} />
          <text x="108" y="282" textAnchor="middle" fontSize="13" fill={C.accent}>20 flops / pair</text>
          <text x="108" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>softened force</text>
        </g>
        <Arrow x1={208} x2={230} y1={214} y2={214} color={C.accent} />
        <g ref={tileRef} style={{ opacity: 0.3 }}>
          <rect x="242" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="326" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · tile</text>
          <Tile x={270} y={150} width={112} height={88} columns={4} rows={4} highlight />
          <text x="326" y="282" textAnchor="middle" fontSize="13" fill={C.warning}>shared memory</text>
          <text x="326" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>p × p reuse</text>
        </g>
        <Arrow x1={426} x2={448} y1={214} y2={214} color={C.warning} />
        <g ref={gridRef} style={{ opacity: 0.3 }}>
          <rect x="460" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="544" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · grid</text>
          <Tile x={488} y={150} width={112} height={88} columns={4} rows={3} />
          <text x="544" y="282" textAnchor="middle" fontSize="13" fill={C.success}>N / p blocks</text>
          <text x="544" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>N targets × N pairs</text>
        </g>
        <Arrow x1={644} x2={666} y1={214} y2={214} color={C.success} />
        <g ref={tuneRef} style={{ opacity: 0.3 }}>
          <rect x="678" y="88" width="56" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="706" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <path d="M 690 230 C 696 180 712 180 722 150" fill="none" stroke={C.accent} strokeWidth="4" />
          <text x="706" y="282" textAnchor="middle" fontSize="12" fill={C.accent}>tune</text>
          <text x="706" y="310" textAnchor="middle" fontSize="11" fill={C.secondary}>occupy</text>
        </g>
        <rect x="24" y="376" width="710" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the algorithm stays O(N²); the GPU wins by exposing reuse and hiding latency
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察一对 body 如何扩展成 tile、thread block 和可调优的全局 kernel。" />
    </Figure>
  );
}

type BodyCount = "large" | "small";
type ThreadMode = "one" | "two";
type UnrollMode = "four" | "one" | "eight";
type TileMode = "sixteen" | "thirtyTwo" | "eight";

const DEFAULTS = {
  bodies: "large" as BodyCount,
  threads: "one" as ThreadMode,
  tile: "sixteen" as TileMode,
  unroll: "four" as UnrollMode,
};

export function GpuGems3Ch31NBodyLab() {
  const [bodies, setBodies] = useState<BodyCount>(DEFAULTS.bodies);
  const [threads, setThreads] = useState<ThreadMode>(DEFAULTS.threads);
  const [tile, setTile] = useState<TileMode>(DEFAULTS.tile);
  const [unroll, setUnroll] = useState<UnrollMode>(DEFAULTS.unroll);

  const result = useMemo(() => {
    const bodyCount = bodies === "large" ? 16384 : 1024;
    const tileSize = tile === "eight" ? 8 : tile === "sixteen" ? 16 : 32;
    const unrollFactor = unroll === "one" ? 1 : unroll === "four" ? 4 : 8;
    const threadFactor = threads === "two" ? 1.24 : bodyCount < 4096 ? 0.78 : 1;
    const interactions = bodyCount * bodyCount;
    const globalLoads = Math.ceil(interactions / tileSize);
    const occupancy = Math.max(38, Math.round((bodyCount / tileSize) * 16 * threadFactor));
    const throughput = Math.round(120 * threadFactor * (1 + Math.min(unrollFactor, 8) * 0.045) * (tileSize === 32 ? 0.94 : tileSize === 8 ? 0.82 : 1));
    const memoryMode = tileSize === 32 ? "low traffic / fewer blocks" : tileSize === 8 ? "more traffic / more blocks" : "balanced reuse";
    return { bodyCount, globalLoads, interactions, memoryMode, occupancy, throughput, tileSize, unrollFactor };
  }, [bodies, threads, tile, unroll]);

  const reset = () => {
    setBodies(DEFAULTS.bodies);
    setThreads(DEFAULTS.threads);
    setTile(DEFAULTS.tile);
    setUnroll(DEFAULTS.unroll);
  };

  const bodyDots = bodies === "large" ? 9 : 5;
  const tileColumns = tile === "eight" ? 3 : tile === "sixteen" ? 4 : 5;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 31</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">CUDA All-Pairs N-Body Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换粒子规模、tile 大小、循环展开和小规模 N 的多线程策略，观察交互数、全局读取量与估算吞吐。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 398" role="img" aria-label={`N 体实验：${result.bodyCount} 个 body，tile ${result.tileSize}，展开 ${result.unrollFactor}，${threads === "two" ? "两个线程每 body" : "一个线程每 body"}`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>global bodies → shared tile → pairwise force → acceleration</text>
              <rect x="34" y="56" width="662" height="242" rx="12" fill={C.surface} stroke={C.border} />
              <g opacity={bodies === "large" ? 0.46 : 0.82}>
                {Array.from({ length: bodyDots }, (_, index) => {
                  const x = 88 + (index % 3) * 48;
                  const y = 128 + Math.floor(index / 3) * 46;
                  return <circle key={`lab-body-${index}`} cx={x} cy={y} r="12" fill={C.accent} />;
                })}
              </g>
              <Arrow x1={236} x2={286} y1={164} y2={164} color={C.warning} />
              <Tile x={304} y={96} width={132} height={132} columns={tileColumns} rows={tileColumns} highlight />
              <text x="370" y="252" textAnchor="middle" fontSize="12" fill={C.warning}>p = {result.tileSize}</text>
              <Arrow x1={466} x2={516} y1={164} y2={164} color={C.success} />
              <g>
                <circle cx="574" cy="136" r="19" fill={C.accent} fillOpacity="0.74" />
                <circle cx="624" cy="192" r="19" fill={C.success} fillOpacity="0.74" />
                <Arrow x1={590} x2={608} y1={150} y2={174} color={C.warning} />
              </g>
              <text x="145" y="270" textAnchor="middle" fontSize="12" fill={C.accent}>N body descriptions</text>
              <text x="370" y="270" textAnchor="middle" fontSize="12" fill={C.warning}>shared memory reuse</text>
              <text x="600" y="270" textAnchor="middle" fontSize="12" fill={C.success}>accumulate aᵢ</text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>{result.interactions.toLocaleString()} pair interactions · {result.globalLoads.toLocaleString()} normalized global loads</text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={C.success}>{result.memoryMode} · occupancy {result.occupancy}% · {result.throughput} relative throughput</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="pair interactions" tone={C.accent} value={result.interactions.toLocaleString()} />
            <Metric label="global loads / tile" tone={C.warning} value={result.globalLoads.toLocaleString()} />
            <Metric label="occupancy proxy" tone={C.success} value={`${result.occupancy}%`} />
            <Metric label="relative throughput" tone={C.secondary} value={`${result.throughput}`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch31-bodies">body count<select id="ch31-bodies" value={bodies} onChange={(event) => setBodies(event.target.value as BodyCount)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="small">small N: 1,024</option><option value="large">large N: 16,384</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch31-tile">tile size p<select id="ch31-tile" value={tile} onChange={(event) => setTile(event.target.value as TileMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="eight">p = 8</option><option value="sixteen">p = 16</option><option value="thirtyTwo">p = 32</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch31-unroll">loop unrolling<select id="ch31-unroll" value={unroll} onChange={(event) => setUnroll(event.target.value as UnrollMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="one">1 interaction / loop</option><option value="four">4 interactions / loop</option><option value="eight">8 interactions / loop</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch31-threads">threads per body<select id="ch31-threads" value={threads} onChange={(event) => setThreads(event.target.value as ThreadMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="one">one thread per body</option><option value="two">two threads for small N</option></select></label>
        </div>
      </div>
    </div>
  );
}
