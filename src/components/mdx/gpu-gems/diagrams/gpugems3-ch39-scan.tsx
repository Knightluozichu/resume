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
  height = 438,
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
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeDasharray={dashed ? "7 6" : undefined} strokeWidth="3" />
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

const SAMPLE_INPUT = [3, 1, 7, 0, 4, 1, 6, 3];
const SAMPLE_EXCLUSIVE = [0, 3, 4, 11, 11, 15, 16, 22];
const SAMPLE_INCLUSIVE = [3, 4, 11, 11, 15, 16, 22, 25];

function ValueLane({
  color,
  compact = false,
  label,
  values,
  x,
  y,
}: {
  color: string;
  compact?: boolean;
  label: string;
  values: readonly number[];
  x: number;
  y: number;
}) {
  const labelWidth = compact ? 48 : 116;
  const step = compact ? 36 : 57;
  const cellWidth = compact ? 28 : 44;
  return (
    <g>
      <text x={x} y={y + 20} fontSize="13" fontWeight="700" fill={color}>{label}</text>
      {values.map((value, index) => (
        <g key={`${label}-${index}`}>
          <rect x={x + labelWidth + index * step} y={y} width={cellWidth} height="36" rx="7" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2" />
          <text x={x + labelWidth + cellWidth / 2 + index * step} y={y + 24} textAnchor="middle" fontSize="14" fontFamily="monospace" fill={C.text}>{value}</text>
        </g>
      ))}
    </g>
  );
}

function ScanLane({
  color,
  offset,
  values,
  x,
  y,
}: {
  color: string;
  offset: number;
  values: readonly number[];
  x: number;
  y: number;
}) {
  return (
    <g>
      {values.map((value, index) => (
        <g key={`scan-${offset}-${index}`}>
          <rect x={x + index * 55} y={y} width="42" height="34" rx="7" fill={index >= offset ? color : C.surface} fillOpacity={index >= offset ? 0.18 : 1} stroke={index >= offset ? color : C.border} strokeWidth="2" />
          <text x={x + 21 + index * 55} y={y + 23} textAnchor="middle" fontSize="13" fontFamily="monospace" fill={index >= offset ? C.text : C.secondary}>{value}</text>
        </g>
      ))}
    </g>
  );
}

function GridTile({
  color = C.accent,
  columns = 8,
  highlight = -1,
  rows = 5,
  x,
  y,
}: {
  color?: string;
  columns?: number;
  highlight?: number;
  rows?: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      {Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const active = index === highlight;
        return (
          <rect
            key={`grid-${x}-${y}-${index}`}
            x={x + column * 18}
            y={y + row * 18}
            width="14"
            height="14"
            rx="3"
            fill={active ? C.warning : color}
            fillOpacity={active ? 0.9 : 0.22}
            stroke={active ? C.warning : color}
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

export function GpuGems3Ch39ScanDefinitionDiagram() {
  return (
    <Figure>
      <Frame height={442} label="scan 定义示意图：输入 3 1 7 0 4 1 6 3 经过 exclusive scan 和 inclusive scan 得到不同的前缀结果">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>one operation, two boundary conventions</text>
        <rect x="28" y="74" width="704" height="270" rx="14" fill={C.surface} stroke={C.border} />
        <ValueLane x={42} y={102} color={C.accent} label="input" values={SAMPLE_INPUT} />
        <line x1="42" x2="718" y1="166" y2="166" stroke={C.border} strokeWidth="2" />
        <ValueLane x={42} y={192} color={C.warning} label="exclusive" values={SAMPLE_EXCLUSIVE} />
        <text x="42" y="250" fontSize="12" fill={C.secondary}>identity 0 enters first</text>
        <ValueLane x={42} y={272} color={C.success} label="inclusive" values={SAMPLE_INCLUSIVE} />
        <text x="42" y="330" fontSize="12" fill={C.secondary}>current element stays in its own prefix</text>
        <Arrow x1={362} x2={400} y1={154} y2={182} color={C.warning} />
        <Arrow x1={432} x2={470} y1={154} y2={262} color={C.success} />
        <rect x="28" y="372" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="392" textAnchor="middle" fontSize="13" fill={C.secondary}>exclusive scan is the chapter default; inclusive scan is a one-position convention change</text>
      </Frame>
    </Figure>
  );
}

const NAIVE_STEPS: readonly TeachingStep[] = [
  { label: "offset 1", caption: "每个位置读取左侧 1 个元素，第一轮把相邻贡献合并" },
  { label: "offset 2", caption: "下一轮读取左侧 2 个元素，继续把部分和传播开" },
  { label: "offset 4", caption: "继续翻倍 offset；所有轮次合计 O(n log n) 次加法" },
];

const NAIVE_LABELS: Readonly<Record<string, string>> = {
  "offset 1": "每个位置读取左侧 1 个元素，第一轮把相邻贡献合并",
  "offset 2": "下一轮读取左侧 2 个元素，继续把部分和传播开",
  "offset 4": "继续翻倍 offset；所有轮次合计 O(n log n) 次加法",
};

export function GpuGems3Ch39NaiveScanDiagram() {
  const offset1Ref = useRef<SVGGElement>(null);
  const offset2Ref = useRef<SVGGElement>(null);
  const offset4Ref = useRef<SVGGElement>(null);
  const stageRefs = [offset1Ref, offset2Ref, offset4Ref];
  const timeline = useTeachingTimeline({
    steps: NAIVE_STEPS,
    build: (tl) => {
      stageRefs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.45 }, T * index);
        tl.label(NAIVE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={468} label="naive scan 动画：offset 从 1、2、4 逐轮翻倍，每轮都让大量线程重新读取部分和，因此总工作量是 O(n log n)">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>naive scan doubles distance, not efficiency</text>
        <rect x="28" y="70" width="704" height="286" rx="14" fill={C.surface} stroke={C.border} />
        <text x="48" y="106" fontSize="14" fontWeight="700" fill={C.text}>input / output lane</text>
        <ValueLane x={48} y={118} color={C.accent} label="x" values={SAMPLE_INPUT} />
        <g ref={offset1Ref} style={{ opacity: 0.3 }}>
          <text x="48" y="202" fontSize="14" fontWeight="700" fill={C.warning}>offset 1</text>
          <ScanLane x={154} y={182} color={C.warning} offset={1} values={[3, 4, 8, 7, 5, 10, 9, 9]} />
          <Arrow x1={254} x2={281} y1={171} y2={171} color={C.warning} />
        </g>
        <g ref={offset2Ref} style={{ opacity: 0.3 }}>
          <text x="48" y="258" fontSize="14" fontWeight="700" fill={C.success}>offset 2</text>
          <ScanLane x={154} y={238} color={C.success} offset={2} values={[3, 4, 11, 11, 12, 14, 14, 19]} />
          <Arrow x1={364} x2={391} y1={227} y2={227} color={C.success} />
        </g>
        <g ref={offset4Ref} style={{ opacity: 0.3 }}>
          <text x="48" y="314" fontSize="14" fontWeight="700" fill={C.accent}>offset 4</text>
          <ScanLane x={154} y={294} color={C.accent} offset={4} values={[3, 4, 11, 11, 15, 16, 22, 25]} />
          <Arrow x1={474} x2={501} y1={283} y2={283} color={C.accent} />
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>parallel rounds are visible, but the same values are revisited at every log₂ n offset</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={NAIVE_LABELS} caption="逐步查看 naive Hillis–Steele 风格扫描的 offset 如何翻倍，以及为什么工作量多出 log₂ n 因子。" />
    </Figure>
  );
}

const TREE_STEPS: readonly TeachingStep[] = [
  { label: "up-sweep", caption: "从叶子向根节点合并部分和，根节点得到整个数组的总和" },
  { label: "identity", caption: "把根节点清零，放入 exclusive scan 所需的 identity" },
  { label: "down-sweep", caption: "从根向叶子交换并传播前缀，得到每个位置的 exclusive 结果" },
];

const TREE_LABELS: Readonly<Record<string, string>> = {
  "down-sweep": "从根向叶子交换并传播前缀，得到每个位置的 exclusive 结果",
  identity: "把根节点清零，放入 exclusive scan 所需的 identity",
  "up-sweep": "从叶子向根节点合并部分和，根节点得到整个数组的总和",
};

export function GpuGems3Ch39TreeScanDiagram() {
  const upRef = useRef<SVGGElement>(null);
  const identityRef = useRef<SVGGElement>(null);
  const downRef = useRef<SVGGElement>(null);
  const refs = [upRef, identityRef, downRef];
  const timeline = useTeachingTimeline({
    steps: TREE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.45 }, T * index);
        tl.label(TREE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={474} label="work-efficient scan 的平衡树动画：up-sweep 从叶子到根，根节点置为 identity，再通过 down-sweep 从根到叶子生成 exclusive prefix sums">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>build the tree, then sweep the tree</text>
        <g transform="translate(28 70)">
          <rect width="704" height="330" rx="14" fill={C.surface} stroke={C.border} />
          <text x="72" y="32" fontSize="14" fontWeight="700" fill={C.text}>balanced tree for eight leaves</text>
          <g ref={upRef} style={{ opacity: 0.3 }}>
            <line x1="350" x2="220" y1="72" y2="134" stroke={C.warning} strokeWidth="3" />
            <line x1="350" x2="480" y1="72" y2="134" stroke={C.warning} strokeWidth="3" />
            <line x1="220" x2="152" y1="134" y2="198" stroke={C.warning} strokeWidth="3" />
            <line x1="220" x2="288" y1="134" y2="198" stroke={C.warning} strokeWidth="3" />
            <line x1="480" x2="412" y1="134" y2="198" stroke={C.warning} strokeWidth="3" />
            <line x1="480" x2="548" y1="134" y2="198" stroke={C.warning} strokeWidth="3" />
            <text x="350" y="60" textAnchor="middle" fontSize="13" fill={C.warning}>sum = 25</text>
          </g>
          <g ref={identityRef} style={{ opacity: 0.3 }}>
            <circle cx="350" cy="72" r="22" fill={C.accent} fillOpacity="0.18" stroke={C.accent} strokeWidth="3" />
            <text x="350" y="78" textAnchor="middle" fontSize="14" fontFamily="monospace" fill={C.accent}>0</text>
            <text x="350" y="108" textAnchor="middle" fontSize="12" fill={C.accent}>identity</text>
          </g>
          <g ref={downRef} style={{ opacity: 0.3 }}>
            <circle cx="350" cy="72" r="22" fill={C.success} fillOpacity="0.18" stroke={C.success} strokeWidth="3" />
            <circle cx="220" cy="134" r="18" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="2" />
            <circle cx="480" cy="134" r="18" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <g key={`leaf-${index}`}>
                <rect x={68 + index * 84} y="240" width="56" height="36" rx="7" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="2" />
                <text x={96 + index * 84} y="264" textAnchor="middle" fontSize="13" fontFamily="monospace" fill={C.text}>{SAMPLE_EXCLUSIVE[index]}</text>
              </g>
            ))}
            <text x="350" y="306" textAnchor="middle" fontSize="13" fill={C.success}>one add per tree node on each sweep</text>
          </g>
          <text x="72" y="348" fontSize="12" fill={C.secondary}>2n − 2 additions across two traversals: asymptotically work-efficient</text>
        </g>
      </Frame>
      <TimelineControls timeline={timeline} labelText={TREE_LABELS} caption="逐步观察根节点为什么先要清零，以及 down-sweep 怎样把总和变成 exclusive 前缀。" />
    </Figure>
  );
}

export function GpuGems3Ch39LargeArrayScanDiagram() {
  return (
    <Figure>
      <Frame height={446} label="大数组 scan：每个 block 做 local scan，把总和写入 SUMS，扫描 SUMS 得到 INCR，再把每个 block 的 increment 加回局部结果">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>scale beyond one thread block with block increments</text>
        <g transform="translate(28 82)">
          <rect width="192" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="96" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>local blocks</text>
          {[0, 1, 2].map((block) => (
            <g key={`block-${block}`}>
              <rect x="28" y={66 + block * 60} width="136" height="40" rx="8" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <text x="48" y={91 + block * 60} fontSize="13" fill={C.accent}>block {block}</text>
              <text x="132" y={91 + block * 60} textAnchor="end" fontSize="13" fill={C.text}>scan + sum</text>
            </g>
          ))}
          <text x="96" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>one block owns its local prefix</text>
        </g>
        <Arrow x1={244} x2={276} y1={220} y2={220} color={C.warning} />
        <g transform="translate(296 82)">
          <rect width="168" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="84" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>SUMS</text>
          <ValueLane compact x={20} y={76} color={C.warning} label="totals" values={[11, 7, 13]} />
          <Arrow x1={84} x2={84} y1={154} y2={202} color={C.warning} />
          <text x="84" y="232" textAnchor="middle" fontSize="13" fill={C.warning}>scan block totals</text>
          <text x="84" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>produce INCR</text>
        </g>
        <Arrow x1={488} x2={520} y1={220} y2={220} color={C.success} />
        <g transform="translate(540 82)">
          <rect width="192" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="96" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>uniform add</text>
          {[0, 1, 2].map((block) => (
            <g key={`increment-${block}`}>
              <rect x="28" y={66 + block * 60} width="136" height="40" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="96" y={91 + block * 60} textAnchor="middle" fontSize="13" fill={C.success}>local + INCR[{block}]</text>
            </g>
          ))}
          <text x="96" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>global exclusive scan</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>pad to a block multiple so the last block can use the same kernels</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch39BankConflictDiagram() {
  return (
    <Figure>
      <Frame height={438} label="shared memory bank conflict：多个线程访问同一 bank 会串行，padding 或 conflict-free offset 让访问分散到不同 bank">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>work-efficient is not yet hardware-efficient</text>
        <g transform="translate(28 82)">
          <rect width="318" height="276" rx="14" fill={C.surface} stroke={C.danger} strokeWidth="2" />
          <text x="159" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>naive shared access</text>
          {[0, 1, 2, 3].map((row) => (
            <g key={`conflict-row-${row}`}>
              <text x="36" y={86 + row * 42} fontSize="13" fill={C.secondary}>warp {row}</text>
              {[0, 1, 2, 3].map((bank) => (
                <rect key={`conflict-${row}-${bank}`} x={108 + bank * 42} y={64 + row * 42} width="30" height="28" rx="5" fill={bank === 1 ? C.danger : C.surface} stroke={bank === 1 ? C.danger : C.border} strokeWidth="2" />
              ))}
            </g>
          ))}
          <text x="159" y="244" textAnchor="middle" fontSize="13" fill={C.danger}>same bank → serialized access</text>
        </g>
        <Arrow x1={368} x2={400} y1={220} y2={220} color={C.success} />
        <g transform="translate(414 82)">
          <rect width="318" height="276" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="159" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>conflict-free offset</text>
          {[0, 1, 2, 3].map((row) => (
            <g key={`free-row-${row}`}>
              <text x="36" y={86 + row * 42} fontSize="13" fill={C.secondary}>warp {row}</text>
              {[0, 1, 2, 3].map((bank) => (
                <rect key={`free-${row}-${bank}`} x={108 + bank * 42 + (row % 2) * 8} y={64 + row * 42} width="30" height="28" rx="5" fill={C.success} fillOpacity="0.18" stroke={C.success} strokeWidth="2" />
              ))}
            </g>
          ))}
          <text x="159" y="244" textAnchor="middle" fontSize="13" fill={C.success}>padding shifts addresses across banks</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>avoid a memory bottleneck before adding more arithmetic optimization</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch39ApplicationsDiagram() {
  return (
    <Figure>
      <Frame height={444} label="scan 应用：stream compaction 先扫描 predicate 再 scatter，summed-area table 对行和列扫描，radix sort 用 scan 生成位置">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>scan turns a local predicate into a global address</text>
        <g transform="translate(28 82)">
          <rect width="214" height="276" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>stream compaction</text>
          <text x="107" y="72" textAnchor="middle" fontSize="13" fill={C.secondary}>values</text>
          <ValueLane compact x={32} y={82} color={C.accent} label="v" values={[8, 3, 6]} />
          <text x="107" y="160" textAnchor="middle" fontSize="13" fill={C.warning}>mask → scan → scatter</text>
          <Arrow x1={107} x2={107} y1={176} y2={214} color={C.warning} />
          <text x="107" y="248" textAnchor="middle" fontSize="13" fill={C.success}>dense output</text>
          <text x="107" y="274" textAnchor="middle" fontSize="12" fill={C.secondary}>preserve input order</text>
        </g>
        <g transform="translate(272 82)">
          <rect width="214" height="276" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>summed-area table</text>
          <GridTile x={38} y={72} columns={6} rows={5} color={C.warning} highlight={14} />
          <Arrow x1={107} x2={162} y1={172} y2={172} color={C.warning} />
          <Arrow x1={162} x2={162} y1={172} y2={224} color={C.warning} />
          <text x="84" y="222" textAnchor="middle" fontSize="12" fill={C.secondary}>rows</text>
          <text x="162" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>columns</text>
          <text x="107" y="274" textAnchor="middle" fontSize="12" fill={C.warning}>variable-width filter</text>
        </g>
        <g transform="translate(516 82)">
          <rect width="216" height="276" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>radix sort</text>
          <rect x="34" y="72" width="148" height="34" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="108" y="94" textAnchor="middle" fontSize="13" fill={C.success}>predicate positions</text>
          <Arrow x1={108} x2={108} y1={122} y2={164} color={C.success} />
          <rect x="34" y="182" width="148" height="34" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="108" y="204" textAnchor="middle" fontSize="13" fill={C.success}>stable scatter</text>
          <text x="108" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>scan as address builder</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>one primitive supports filtering, filtering tables, sorting and parallel data-structure construction</text>
      </Frame>
    </Figure>
  );
}

type ScanAlgorithm = "naive" | "work-efficient";
type ScanSize = "8" | "128" | "1024" | "4096";
type ConflictMode = "avoided" | "present";
type ValuesPerThread = "2" | "8";
type Application = "prefix" | "compact" | "table";

const DEFAULTS = {
  algorithm: "work-efficient" as ScanAlgorithm,
  application: "prefix" as Application,
  conflict: "avoided" as ConflictMode,
  size: "1024" as ScanSize,
  valuesPerThread: "8" as ValuesPerThread,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch39ScanLab() {
  const [algorithm, setAlgorithm] = useState<ScanAlgorithm>(DEFAULTS.algorithm);
  const [application, setApplication] = useState<Application>(DEFAULTS.application);
  const [conflict, setConflict] = useState<ConflictMode>(DEFAULTS.conflict);
  const [size, setSize] = useState<ScanSize>(DEFAULTS.size);
  const [valuesPerThread, setValuesPerThread] = useState<ValuesPerThread>(DEFAULTS.valuesPerThread);

  const result = useMemo(() => {
    const n = Number(size);
    const levels = Math.log2(n);
    const naiveAdds = Math.round(n * levels - n + 1);
    const efficientAdds = 2 * n - 2;
    const conflictFactor = conflict === "avoided" ? 1 : 0.62;
    const algorithmFactor = algorithm === "work-efficient" ? 1 : 0.55;
    const valuesFactor = valuesPerThread === "8" ? 1.14 : 0.88;
    const applicationFactor = application === "prefix" ? 1 : application === "compact" ? 0.94 : 0.9;
    const throughput = 1.2 * algorithmFactor * conflictFactor * valuesFactor * applicationFactor;
    const note = conflict === "present"
      ? "bank conflicts serialize shared-memory requests"
      : algorithm === "naive"
        ? "extra log₂ n work remains"
        : valuesPerThread === "8"
          ? "register partials hide global-memory latency"
          : "tree scan and conflict-free shared access";
    const applicationLabel = application === "compact" ? "mask + scatter" : application === "table" ? "row + column scan" : "prefix output";
    return { applicationLabel, efficientAdds, levels, naiveAdds, note, throughput };
  }, [algorithm, application, conflict, size, valuesPerThread]);

  const reset = () => {
    setAlgorithm(DEFAULTS.algorithm);
    setApplication(DEFAULTS.application);
    setConflict(DEFAULTS.conflict);
    setSize(DEFAULTS.size);
    setValuesPerThread(DEFAULTS.valuesPerThread);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 39</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">CUDA Scan Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 scan 算法、数组规模、bank conflict、每线程元素数和应用场景，观察 modeled additions、relative throughput 与 scan 的数据流角色。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 416" role="img" aria-label={`scan 实验：${algorithm} algorithm，${size} elements，${conflict} bank conflicts，${valuesPerThread} values per thread，${application} application`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>input → scan → global address</text>
              <rect x="34" y="56" width="662" height="256" rx="12" fill={C.surface} stroke={C.border} />
              <ValueLane x={66} y={94} color={C.accent} label="values" values={[3, 1, 7, 0, 4, 1, 6, 3]} />
              <Arrow x1={210} x2={248} y1={150} y2={150} color={C.accent} />
              <rect x="266" y="98" width="156" height="82" rx="11" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="344" y="126" textAnchor="middle" fontSize="13" fill={C.warning}>{algorithm} tree</text>
              <text x="344" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(Number(size))} elements</text>
              <Arrow x1={440} x2={478} y1={150} y2={150} color={C.warning} />
              <rect x="496" y="98" width="144" height="82" rx="11" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="568" y="126" textAnchor="middle" fontSize="13" fill={C.success}>{result.applicationLabel}</text>
              <text x="568" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>global positions</text>
              <text x="365" y="228" textAnchor="middle" fontSize="13" fill={conflict === "present" ? C.danger : C.secondary}>{result.note}</text>
              <text x="365" y="256" textAnchor="middle" fontSize="13" fill={C.warning}>modeled adds {formatNumber(algorithm === "naive" ? result.naiveAdds : result.efficientAdds)} · levels {result.levels}</text>
              <text x="365" y="284" textAnchor="middle" fontSize="13" fill={C.success}>relative throughput {result.throughput.toFixed(2)} · {valuesPerThread} values / thread</text>
              <text x="365" y="344" textAnchor="middle" fontSize="13" fill={C.secondary}>educational model based on algorithmic and hardware tradeoffs</text>
              <text x="365" y="372" textAnchor="middle" fontSize="13" fill={C.accent}>test correctness and memory behavior separately</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="modeled additions" tone={C.accent} value={formatNumber(algorithm === "naive" ? result.naiveAdds : result.efficientAdds)} />
            <Metric label="tree levels" tone={C.warning} value={formatNumber(result.levels)} />
            <Metric label="relative throughput" tone={C.success} value={result.throughput.toFixed(2)} />
            <Metric label="application" tone={C.secondary} value={result.applicationLabel} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch39-algorithm">algorithm<select id="ch39-algorithm" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as ScanAlgorithm)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="work-efficient">work-efficient tree</option><option value="naive">naive offset doubling</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch39-size">array size<select id="ch39-size" value={size} onChange={(event) => setSize(event.target.value as ScanSize)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="8">8 elements</option><option value="128">128 elements</option><option value="1024">1,024 elements</option><option value="4096">4,096 elements</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch39-conflict">shared-memory access<select id="ch39-conflict" value={conflict} onChange={(event) => setConflict(event.target.value as ConflictMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="avoided">conflict-free padding</option><option value="present">bank conflicts present</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch39-values">values per thread<select id="ch39-values" value={valuesPerThread} onChange={(event) => setValuesPerThread(event.target.value as ValuesPerThread)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="2">2 values</option><option value="8">8 values</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch39-application">application<select id="ch39-application" value={application} onChange={(event) => setApplication(event.target.value as Application)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="prefix">prefix output</option><option value="compact">stream compaction</option><option value="table">summed-area table</option></select></label>
        </div>
      </div>
    </div>
  );
}
