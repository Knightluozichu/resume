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

function ObjectDot({
  fill,
  label,
  x,
  y,
}: {
  fill: string;
  label?: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={fill} fillOpacity="0.22" stroke={fill} strokeWidth="3" />
      <circle cx={x} cy={y} r="6" fill={fill} />
      {label ? (
        <text x={x} y={y + 38} textAnchor="middle" fontSize="13" fill={C.text}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function CellGrid({
  columns,
  rows,
  x,
  y,
  width,
  height,
  active = [],
}: {
  columns: number;
  rows: number;
  x: number;
  y: number;
  width: number;
  height: number;
  active?: number[];
}) {
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="9" fill={C.surface} stroke={C.border} strokeWidth="2" />
      {Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        return (
          <rect
            key={`cell-${index}`}
            x={x + column * cellWidth}
            y={y + row * cellHeight}
            width={cellWidth}
            height={cellHeight}
            fill={active.includes(index) ? C.accent : "transparent"}
            fillOpacity={active.includes(index) ? 0.18 : 1}
            stroke={C.border}
          />
        );
      })}
    </g>
  );
}

export function GpuGems3Ch32BroadNarrowDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="碰撞检测的 broad phase 和 narrow phase：先用保守包围体筛出潜在碰撞对，再对少量候选计算精确接触"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          reject cheaply, then test precisely
        </text>
        <g transform="translate(32 86)">
          <rect width="300" height="262" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="150" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>
            broad phase
          </text>
          <ObjectDot x={80} y={116} fill={C.accent} label="AABB / sphere" />
          <ObjectDot x={192} y={116} fill={C.success} label="AABB / sphere" />
          <line x1="102" x2="170" y1="116" y2="116" stroke={C.warning} strokeWidth="3" strokeDasharray="8 6" />
          <text x="150" y="206" textAnchor="middle" fontSize="14" fill={C.accent}>conservative overlap</text>
          <text x="150" y="234" textAnchor="middle" fontSize="13" fill={C.secondary}>fast candidate pair list</text>
        </g>
        <Arrow x1={356} x2={404} y1={217} y2={217} color={C.warning} />
        <g transform="translate(428 86)">
          <rect width="300" height="262" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="150" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>
            narrow phase
          </text>
          <ObjectDot x={96} y={116} fill={C.accent} label="shape A" />
          <ObjectDot x={204} y={116} fill={C.success} label="shape B" />
          <Arrow x1={122} x2={178} y1={116} y2={116} color={C.danger} />
          <text x="150" y="206" textAnchor="middle" fontSize="14" fill={C.success}>exact contact</text>
          <text x="150" y="234" textAnchor="middle" fontSize="13" fill={C.secondary}>points, normals, response</text>
        </g>
        <rect x="28" y="376" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="396" textAnchor="middle" fontSize="13" fill={C.secondary}>
          broad phase trades false positives for a much smaller exact-test workload
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch32SortSweepDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="sort and sweep：把每个包围体投影成 begin 和 end 标记，排序后用 active list 只测试当前仍重叠的对象"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          sort endpoints, sweep one active list
        </text>
        <line x1="76" x2="684" y1="196" y2="196" stroke={C.border} strokeWidth="4" />
        <g>
          <line x1="142" x2="272" y1="142" y2="142" stroke={C.accent} strokeWidth="10" strokeLinecap="round" />
          <circle cx="142" cy="142" r="12" fill={C.accent} />
          <circle cx="272" cy="142" r="12" fill={C.accent} />
          <text x="207" y="116" textAnchor="middle" fontSize="14" fill={C.accent}>object A</text>
        </g>
        <g>
          <line x1="224" x2="418" y1="250" y2="250" stroke={C.success} strokeWidth="10" strokeLinecap="round" />
          <circle cx="224" cy="250" r="12" fill={C.success} />
          <circle cx="418" cy="250" r="12" fill={C.success} />
          <text x="321" y="286" textAnchor="middle" fontSize="14" fill={C.success}>object B</text>
        </g>
        <g>
          <line x1="474" x2="632" y1="142" y2="142" stroke={C.warning} strokeWidth="10" strokeLinecap="round" />
          <circle cx="474" cy="142" r="12" fill={C.warning} />
          <circle cx="632" cy="142" r="12" fill={C.warning} />
          <text x="553" y="116" textAnchor="middle" fontSize="14" fill={C.warning}>object C</text>
        </g>
        <g>
          <circle cx="142" cy="196" r="9" fill={C.accent} />
          <circle cx="224" cy="196" r="9" fill={C.success} />
          <circle cx="272" cy="196" r="9" fill={C.accent} />
          <circle cx="418" cy="196" r="9" fill={C.success} />
          <circle cx="474" cy="196" r="9" fill={C.warning} />
          <circle cx="632" cy="196" r="9" fill={C.warning} />
        </g>
        <text x="142" y="224" textAnchor="middle" fontSize="13" fill={C.accent}>begin A</text>
        <text x="224" y="224" textAnchor="middle" fontSize="13" fill={C.success}>begin B</text>
        <text x="272" y="224" textAnchor="middle" fontSize="13" fill={C.accent}>end A</text>
        <text x="418" y="224" textAnchor="middle" fontSize="13" fill={C.success}>end B</text>
        <rect x="140" y="334" width="480" height="46" rx="10" fill={C.surface} stroke={C.warning} />
        <text x="380" y="363" textAnchor="middle" fontSize="14" fill={C.warning}>
          when begin B arrives, active = {"{A}"} → test A–B; end A removes A
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch32SpatialGridDiagram() {
  return (
    <Figure>
      <Frame
        height={452}
        label="空间细分：用均匀网格把包围体复制到它相交的 cell，home cell 与 phantom cell 控制候选对和重复测试"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one object, one home cell, and possible phantom cells
        </text>
        <g transform="translate(30 84)">
          <rect width="316" height="288" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="158" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>uniform spatial grid</text>
          <CellGrid x={54} y={64} width={208} height={174} columns={4} rows={3} active={[5, 6, 9, 10]} />
          <circle cx="158" cy="178" r="52" fill={C.warning} fillOpacity="0.16" stroke={C.warning} strokeWidth="3" />
          <circle cx="158" cy="178" r="7" fill={C.warning} />
          <text x="158" y="272" textAnchor="middle" fontSize="13" fill={C.accent}>bounding volume intersects 4 cells</text>
        </g>
        <Arrow x1={382} x2={420} y1={228} y2={228} color={C.warning} />
        <g transform="translate(442 84)">
          <rect width="286" height="288" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="143" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>candidate rule</text>
          <rect x="42" y="70" width="202" height="56" rx="10" fill={C.accent} fillOpacity="0.14" stroke={C.accent} />
          <text x="143" y="104" textAnchor="middle" fontSize="14" fill={C.accent}>same cell + one home cell</text>
          <rect x="42" y="148" width="202" height="56" rx="10" fill={C.success} fillOpacity="0.14" stroke={C.success} />
          <text x="143" y="182" textAnchor="middle" fontSize="14" fill={C.success}>emit potential pair</text>
          <text x="143" y="236" textAnchor="middle" fontSize="13" fill={C.secondary}>skip P–P duplicate paths</text>
          <text x="143" y="262" textAnchor="middle" fontSize="12" fill={C.secondary}>grid cell ≥ largest volume</text>
        </g>
        <rect x="28" y="396" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="416" textAnchor="middle" fontSize="13" fill={C.secondary}>
          3D overlap can touch up to eight cells, so replication is bounded but not free
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch32RadixSortDiagram() {
  return (
    <Figure>
      <Frame
        height={446}
        label="并行稳定 radix sort：每一轮依次做 tabulate、prefix sum 和 reorder，cell ID 与 object ID 同步交换"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          stable radix sort turns cell IDs into contiguous runs
        </text>
        <g transform="translate(28 86)">
          <rect width="204" height="276" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="102" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · tabulate</text>
          <rect x="32" y="74" width="140" height="38" rx="8" fill={C.warning} fillOpacity="0.16" stroke={C.warning} />
          <text x="102" y="99" textAnchor="middle" fontSize="13" fill={C.warning}>count radix digits</text>
          <text x="102" y="158" textAnchor="middle" fontSize="13" fill={C.secondary}>per block / group</text>
          <text x="102" y="208" textAnchor="middle" fontSize="13" fill={C.secondary}>shared counters</text>
          <Arrow x1={102} x2={102} y1={226} y2={250} color={C.warning} />
        </g>
        <Arrow x1={252} x2={292} y1={224} y2={224} color={C.warning} />
        <g transform="translate(304 86)">
          <rect width="204" height="276" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="102" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · prefix sum</text>
          <rect x="32" y="74" width="140" height="38" rx="8" fill={C.accent} fillOpacity="0.16" stroke={C.accent} />
          <text x="102" y="99" textAnchor="middle" fontSize="13" fill={C.accent}>turn counts into offsets</text>
          <text x="102" y="158" textAnchor="middle" fontSize="13" fill={C.secondary}>global positions</text>
          <text x="102" y="208" textAnchor="middle" fontSize="13" fill={C.secondary}>stable ordering</text>
          <Arrow x1={102} x2={102} y1={226} y2={250} color={C.accent} />
        </g>
        <Arrow x1={528} x2={568} y1={224} y2={224} color={C.accent} />
        <g transform="translate(580 86)">
          <rect width="152" height="276" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="76" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · reorder</text>
          <rect x="26" y="74" width="100" height="38" rx="8" fill={C.success} fillOpacity="0.16" stroke={C.success} />
          <text x="76" y="99" textAnchor="middle" fontSize="13" fill={C.success}>write by offset</text>
          <text x="76" y="158" textAnchor="middle" fontSize="13" fill={C.secondary}>same cell IDs</text>
          <text x="76" y="208" textAnchor="middle" fontSize="13" fill={C.secondary}>become a run</text>
          <Arrow x1={76} x2={76} y1={226} y2={250} color={C.success} />
        </g>
        <rect x="28" y="390" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="410" textAnchor="middle" fontSize="13" fill={C.secondary}>
          swapping input and output arrays after each pass keeps the sort GPU-friendly
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch32PassScheduleDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="并行空间细分的 pass 调度：同一 cell type 的二维四类或三维八类 cell 可以并行处理，隔开后不会同时更新同一对象"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          separate cell types before updating shared objects
        </text>
        <g transform="translate(76 78)">
          <text x="130" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2D: four passes</text>
          <CellGrid x={20} y={50} width={220} height={220} columns={4} rows={4} active={[0, 2, 8, 10]} />
          {[0, 2, 8, 10].map((index) => {
            const column = index % 4;
            const row = Math.floor(index / 4);
            return <text key={`pass-2d-${index}`} x={47 + column * 55} y={92 + row * 55} textAnchor="middle" fontSize="13" fill={C.accent}>{index === 0 ? "1" : index === 2 ? "2" : index === 8 ? "3" : "4"}</text>;
          })}
        </g>
        <Arrow x1={368} x2={410} y1={214} y2={214} color={C.warning} />
        <g transform="translate(442 78)">
          <text x="130" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3D: eight passes</text>
          <CellGrid x={20} y={50} width={220} height={220} columns={4} rows={4} active={[0, 2, 5, 7, 8, 10, 13, 15]} />
          <text x="130" y="304" textAnchor="middle" fontSize="13" fill={C.success}>one parity class per pass</text>
        </g>
        <rect x="28" y="358" width="704" height="48" rx="10" fill={C.surface} stroke={C.border} />
        <text x="380" y="386" textAnchor="middle" fontSize="13" fill={C.secondary}>
          when only testing is needed, passes can collapse; when updating state, separate passes prevent write conflicts
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "bounds", caption: "从对象包围体生成 home cell 与 phantom cell 的 cell ID" },
  { label: "sort", caption: "稳定 radix sort 把相同 cell ID 排成连续区间" },
  { label: "cells", caption: "扫描排序结果，生成带 H/P 计数的 collision cell list" },
  { label: "pairs", caption: "按 cell type pass 调度候选对，交给 narrow phase" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  bounds: "从对象包围体生成 home cell 与 phantom cell 的 cell ID",
  cells: "扫描排序结果，生成带 H/P 计数的 collision cell list",
  pairs: "按 cell type pass 调度候选对，交给 narrow phase",
  sort: "稳定 radix sort 把相同 cell ID 排成连续区间",
};

export function GpuGems3Ch32PipelineDiagram() {
  const boundsRef = useRef<SVGGElement>(null);
  const sortRef = useRef<SVGGElement>(null);
  const cellsRef = useRef<SVGGElement>(null);
  const pairsRef = useRef<SVGGElement>(null);
  const refs = [boundsRef, sortRef, cellsRef, pairsRef];
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
      <Frame height={454} label="CUDA broad phase 的四阶段教学管线：构造 cell ID、排序、建立 collision cell list、调度候选对">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          from moving bounds to a narrow-phase work queue
        </text>
        <g ref={boundsRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="108" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · bounds</text>
          <CellGrid x={52} y={150} width={112} height={88} columns={4} rows={3} active={[5, 6]} />
          <text x="108" y="282" textAnchor="middle" fontSize="13" fill={C.accent}>H + P cell IDs</text>
          <text x="108" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>object replication</text>
        </g>
        <Arrow x1={208} x2={230} y1={214} y2={214} color={C.accent} />
        <g ref={sortRef} style={{ opacity: 0.3 }}>
          <rect x="242" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="326" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · sort</text>
          <rect x="270" y="154" width="112" height="76" rx="8" fill={C.warning} fillOpacity="0.14" stroke={C.warning} />
          <text x="326" y="184" textAnchor="middle" fontSize="13" fill={C.warning}>stable radix</text>
          <text x="326" y="210" textAnchor="middle" fontSize="12" fill={C.secondary}>same IDs together</text>
          <text x="326" y="282" textAnchor="middle" fontSize="13" fill={C.warning}>cell runs</text>
          <text x="326" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>contiguous memory</text>
        </g>
        <Arrow x1={426} x2={448} y1={214} y2={214} color={C.warning} />
        <g ref={cellsRef} style={{ opacity: 0.3 }}>
          <rect x="460" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="544" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · cells</text>
          <rect x="488" y="154" width="112" height="76" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} />
          <text x="544" y="184" textAnchor="middle" fontSize="13" fill={C.success}>H / P counts</text>
          <text x="544" y="210" textAnchor="middle" fontSize="12" fill={C.secondary}>start + size</text>
          <text x="544" y="282" textAnchor="middle" fontSize="13" fill={C.success}>collision cells</text>
          <text x="544" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>candidate ranges</text>
        </g>
        <Arrow x1={644} x2={666} y1={214} y2={214} color={C.success} />
        <g ref={pairsRef} style={{ opacity: 0.3 }}>
          <rect x="678" y="88" width="56" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="706" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <circle cx="696" cy="190" r="8" fill={C.accent} />
          <circle cx="718" cy="218" r="8" fill={C.success} />
          <Arrow x1={701} x2={713} y1={194} y2={212} color={C.danger} />
          <text x="706" y="282" textAnchor="middle" fontSize="12" fill={C.accent}>pairs</text>
          <text x="706" y="310" textAnchor="middle" fontSize="11" fill={C.secondary}>narrow</text>
        </g>
        <rect x="24" y="376" width="710" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the broad phase changes a geometric search into sorted, schedulable ranges
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察对象包围体如何变成可供精确碰撞阶段消费的候选队列。" />
    </Figure>
  );
}

type ObjectCount = "large" | "small";
type StrategyMode = "brute" | "grid" | "sweep";
type CellMode = "large" | "tight";
type PassMode = "parallel" | "serial";
type RadixMode = "four" | "eight";

const DEFAULTS = {
  cells: "large" as CellMode,
  objects: "large" as ObjectCount,
  passes: "parallel" as PassMode,
  radix: "eight" as RadixMode,
  strategy: "grid" as StrategyMode,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch32BroadPhaseLab() {
  const [cells, setCells] = useState<CellMode>(DEFAULTS.cells);
  const [objects, setObjects] = useState<ObjectCount>(DEFAULTS.objects);
  const [passes, setPasses] = useState<PassMode>(DEFAULTS.passes);
  const [radix, setRadix] = useState<RadixMode>(DEFAULTS.radix);
  const [strategy, setStrategy] = useState<StrategyMode>(DEFAULTS.strategy);

  const result = useMemo(() => {
    const objectCount = objects === "large" ? 12000 : 1500;
    const brutePairs = Math.round((objectCount * (objectCount - 1)) / 2);
    const cellFactor = cells === "large" ? 0.024 : 0.013;
    const gridCandidates = Math.round(objectCount * objectCount * cellFactor);
    const candidatePairs = strategy === "brute" ? brutePairs : strategy === "sweep" ? Math.round(objectCount * objectCount * 0.018) : gridCandidates;
    const sortPasses = radix === "eight" ? 4 : 8;
    const collisionCells = Math.max(18, Math.round(candidatePairs / (cells === "large" ? 54 : 32)));
    const scheduledPairs = passes === "parallel" ? Math.round(candidatePairs * 0.86) : candidatePairs;
    const throughput = Math.max(22, Math.round((strategy === "brute" ? 38 : strategy === "sweep" ? 112 : 156) * (objects === "small" ? 1.35 : 1) * (passes === "parallel" ? 1.18 : 0.74) * (radix === "eight" ? 1.12 : 0.92)));
    const verdict = strategy === "brute" ? "quadratic candidate storm" : cells === "tight" ? "more replication, fewer candidates" : "balanced grid reuse";
    return { brutePairs, candidatePairs, collisionCells, objectCount, scheduledPairs, sortPasses, throughput, verdict };
  }, [cells, objects, passes, radix, strategy]);

  const reset = () => {
    setCells(DEFAULTS.cells);
    setObjects(DEFAULTS.objects);
    setPasses(DEFAULTS.passes);
    setRadix(DEFAULTS.radix);
    setStrategy(DEFAULTS.strategy);
  };

  const dots = objects === "large" ? 9 : 5;
  const activeCells = cells === "large" ? [5, 6, 9, 10] : [5, 6];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 32</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">CUDA Broad-Phase Collision Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 brute force、sort and sweep 和空间网格，观察候选对、排序轮数、collision cell 与并行调度的变化。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 398" role="img" aria-label={`Broad phase 实验：${result.objectCount} 个对象，${strategy} 策略，${cells} cell，${passes} passes，${radix} radix`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>bounds → cell IDs → sorted runs → candidate pairs</text>
              <rect x="34" y="56" width="662" height="242" rx="12" fill={C.surface} stroke={C.border} />
              <CellGrid x={48} y={104} width={190} height={130} columns={5} rows={3} active={activeCells} />
              {Array.from({ length: dots }, (_, index) => {
                const x = 72 + (index % 3) * 50;
                const y = 136 + Math.floor(index / 3) * 42;
                return <circle key={`lab-object-${index}`} cx={x} cy={y} r="10" fill={C.accent} fillOpacity="0.78" />;
              })}
              <Arrow x1={262} x2={310} y1={170} y2={170} color={C.warning} />
              <rect x="326" y="108" width="118" height="104" rx="10" fill={C.warning} fillOpacity="0.13" stroke={C.warning} />
              <text x="385" y="142" textAnchor="middle" fontSize="13" fill={C.warning}>stable radix</text>
              <text x="385" y="168" textAnchor="middle" fontSize="12" fill={C.secondary}>H / P runs</text>
              <text x="385" y="194" textAnchor="middle" fontSize="12" fill={C.secondary}>{result.sortPasses} passes</text>
              <Arrow x1={468} x2={516} y1={170} y2={170} color={C.success} />
              <circle cx="566" cy="136" r="18" fill={C.accent} fillOpacity="0.72" />
              <circle cx="616" cy="188" r="18" fill={C.success} fillOpacity="0.72" />
              <Arrow x1={580} x2={602} y1={150} y2={174} color={C.danger} />
              <text x="590" y="248" textAnchor="middle" fontSize="13" fill={C.success}>candidate pair</text>
              <text x="145" y="270" textAnchor="middle" fontSize="12" fill={C.accent}>spatial cells</text>
              <text x="385" y="248" textAnchor="middle" fontSize="12" fill={C.warning}>cell list</text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>{formatNumber(result.candidatePairs)} candidate pairs · {formatNumber(result.collisionCells)} collision cells</text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={C.success}>{result.verdict} · {formatNumber(result.scheduledPairs)} scheduled · {result.throughput} relative throughput</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="brute-force pairs" tone={C.danger} value={formatNumber(result.brutePairs)} />
            <Metric label="candidate pairs" tone={C.warning} value={formatNumber(result.candidatePairs)} />
            <Metric label="collision cells" tone={C.success} value={formatNumber(result.collisionCells)} />
            <Metric label="radix passes" tone={C.secondary} value={`${result.sortPasses}`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch32-objects">object count<select id="ch32-objects" value={objects} onChange={(event) => setObjects(event.target.value as ObjectCount)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="small">small: 1,500</option><option value="large">large: 12,000</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch32-strategy">broad-phase strategy<select id="ch32-strategy" value={strategy} onChange={(event) => setStrategy(event.target.value as StrategyMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="grid">spatial subdivision</option><option value="sweep">sort and sweep</option><option value="brute">brute force</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch32-cells">cell sizing<select id="ch32-cells" value={cells} onChange={(event) => setCells(event.target.value as CellMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="large">at least largest volume</option><option value="tight">tighter cells</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch32-radix">radix digit width<select id="ch32-radix" value={radix} onChange={(event) => setRadix(event.target.value as RadixMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="eight">8-bit digits</option><option value="four">4-bit digits</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch32-passes">collision scheduling<select id="ch32-passes" value={passes} onChange={(event) => setPasses(event.target.value as PassMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="parallel">parallel separated passes</option><option value="serial">single serial pass</option></select></label>
        </div>
      </div>
    </div>
  );
}
