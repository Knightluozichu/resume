"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

/** 仅用于 SVG 绘制坐标：消除浮点尾差，避免 SSR hydration 失配；数学结果从不舍入。 */
const rd = (n: number) => Number(n.toFixed(9));

const left = (i: number) => 2 * i + 1;
const right = (i: number) => 2 * i + 2;
const parentIdx = (i: number) => (i - 1) >> 1;

function countViolations(a: readonly number[], heapSize = a.length) {
  let bad = 0;
  for (let i = 1; i < heapSize; i++) {
    if (a[parentIdx(i)] < a[i]) bad += 1;
  }
  return bad;
}

function violatingIndices(a: readonly number[], heapSize = a.length) {
  const out: number[] = [];
  for (let i = 1; i < heapSize; i++) {
    if (a[parentIdx(i)] < a[i]) out.push(i);
  }
  return out;
}

type SinkTrace = {
  result: number[];
  swaps: Array<[number, number]>;
  comparisons: number;
  depth: number;
  path: number[];
  violations: number;
};

/** MAX-HEAPIFY（0 基迭代版），与 body.py 的 sink_trace 逐步一致。 */
function sinkTrace(
  values: readonly number[],
  start: number,
  leftOnly: boolean,
): SinkTrace {
  const a = values.slice();
  const n = a.length;
  const swaps: Array<[number, number]> = [];
  const path = [start];
  let comparisons = 0;
  let depth = 0;
  let i = start;
  for (;;) {
    const l = left(i);
    const r = right(i);
    let largest = i;
    if (l < n) {
      comparisons += 1;
      if (a[l] > a[largest]) largest = l;
    }
    if (!leftOnly && r < n) {
      comparisons += 1;
      if (a[r] > a[largest]) largest = r;
    }
    if (largest === i) break;
    const tmp = a[i];
    a[i] = a[largest];
    a[largest] = tmp;
    swaps.push([i, largest]);
    i = largest;
    depth += 1;
    path.push(i);
  }
  return {
    result: a,
    swaps,
    comparisons,
    depth,
    path,
    violations: countViolations(a),
  };
}

function applySwaps(
  values: readonly number[],
  swaps: ReadonlyArray<readonly [number, number]>,
  count: number,
) {
  const a = values.slice();
  for (let k = 0; k < Math.min(count, swaps.length); k++) {
    const [i, j] = swaps[k];
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

/** 近乎完全二叉树布局：位置由索引与 n 唯一确定（层 + 层内序号），无随机量。 */
function treePos(
  index: number,
  opts: { x0?: number; width?: number; top?: number; levelH?: number } = {},
) {
  const { x0 = 30, width = 840, top = 196, levelH = 84 } = opts;
  const level = Math.floor(Math.log2(index + 1));
  const first = 2 ** level - 1;
  const count = 2 ** level;
  const pos = index - first;
  const spacing = width / count;
  return {
    x: rd(x0 + (pos + 0.5) * spacing),
    y: rd(top + level * levelH),
    level,
  };
}

function treeLevels(n: number) {
  return Math.floor(Math.log2(Math.max(1, n))) + 1;
}

function nodeRadius(n: number, width = 840) {
  const bottom = 2 ** (treeLevels(n) - 1);
  return rd(Math.max(13, Math.min(24, width / 2 / bottom - 6)));
}

function buildMaxHeap(values: readonly number[]) {
  const a = values.slice();
  let totalSwaps = 0;
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    const t = sinkTrace(a, i, false);
    a.splice(0, a.length, ...t.result);
    totalSwaps += t.swaps.length;
  }
  return { array: a, totalSwaps };
}

/* ---------------- Lab 1：MAX-HEAPIFY 下沉轨迹 ---------------- */

type SinkScenarioKey = "default" | "inner" | "deep" | "leaf";

const SINK_SCENARIOS: Record<
  SinkScenarioKey,
  { label: string; values: readonly number[]; start: number; note: string }
> = {
  default: {
    label: "默认 · 右孩子更大",
    values: [10, 13, 17, 2, 9, 11, 4, 1],
    start: 0,
    note: "起点 0 小于右孩子 17：交换后还要继续向下检查",
  },
  inner: {
    label: "内部节点违例",
    values: [17, 5, 13, 9, 11, 4, 2, 1],
    start: 1,
    note: "起点 1 的两棵子树都已成堆，只有起点本身违例",
  },
  deep: {
    label: "深违例 · 根为最小值",
    values: [1, 13, 16, 9, 11, 14, 15, 2, 3, 4, 5, 6, 7, 8, 10],
    start: 0,
    note: "根 1 一路与每层较大孩子交换，沉到最底层",
  },
  leaf: {
    label: "边界 · 叶子起点",
    values: [10, 13, 17, 2, 9, 11, 4, 1],
    start: 7,
    note: "起点 7 是叶子：没有孩子可比较，零交换终止",
  },
};

const SINK_STEPS: readonly TeachingStep[] = [
  { label: "locate", caption: "定位违例：只有起点可能小于孩子" },
  { label: "compare", caption: "比较起点与左右两个孩子" },
  { label: "choose", caption: "选出较大孩子，准备交换" },
  { label: "swap", caption: "逐层交换，违例随之下移" },
  { label: "settle", caption: "到达叶子或恢复堆性质后停止" },
  { label: "verify", caption: "全树校验：残余违例应为 0" },
];

const SINK_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  SINK_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function HeapifySinkTraceLab() {
  const cardRefs = useRef<Array<SVGGElement | null>>([]);
  const [scenario, setScenario] = useState<SinkScenarioKey>("default");
  const [leftOnly, setLeftOnly] = useState(false);

  const timeline = useTeachingTimeline({
    steps: SINK_STEPS,
    build: (tl) => {
      SINK_STEPS.forEach((step, index) => {
        tl.add(
          cardRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const selected = SINK_SCENARIOS[scenario];
  const trace = sinkTrace(selected.values, selected.start, leftOnly);
  const s = timeline.currentStep;
  const shownSwaps =
    s <= 2 ? 0 : s === 3 ? Math.min(1, trace.swaps.length) : trace.swaps.length;
  const display = applySwaps(selected.values, trace.swaps, shownSwaps);
  const n = display.length;
  const activeIdx =
    s <= 2
      ? selected.start
      : shownSwaps < trace.swaps.length
        ? trace.path[shownSwaps]
        : -1;
  const chosenIdx = s >= 2 && trace.path.length > 1 ? trace.path[1] : -1;
  const compareIdxs =
    s === 1
      ? [left(selected.start), right(selected.start)].filter((i) => i < n)
      : [];
  const badIdxs =
    s >= 5 && trace.violations > 0 ? violatingIndices(trace.result) : [];
  const pathSet = new Set(trace.path.slice(0, shownSwaps + 1));
  const cellW = Math.min(72, (840 - (n - 1) * 6) / n);
  const arrayX = rd((900 - (n * cellW + (n - 1) * 6)) / 2);
  const levels = treeLevels(n);
  const r = nodeRadius(n);

  function reset() {
    timeline.goToStep(0);
    setScenario("default");
    setLeftOnly(false);
  }

  const verifyOk = trace.violations === 0;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch06-heapify-sink-trace"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 1 · MAX-HEAPIFY 下沉轨迹
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一个违例怎样沿父子路径沉到叶子
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              数组格与二叉树共享同一份状态。先预测要交换几次，再沿时间线观察“比较
              → 选较大孩子 → 交换”的逐层轨迹，最后看全树校验是否归零。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-3 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">
            选择违例场景
          </span>
          <select
            aria-label="选择 MAX-HEAPIFY 违例场景：默认右孩子更大、内部节点违例、深违例根最小、叶子起点边界"
            data-param="array-scenario"
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value as SinkScenarioKey);
              timeline.goToStep(0);
            }}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            {(Object.keys(SINK_SCENARIOS) as SinkScenarioKey[]).map((key) => (
              <option key={key} value={key}>
                {SINK_SCENARIOS[key].label}
              </option>
            ))}
          </select>
        </label>

        <svg
          viewBox="0 0 900 660"
          role="img"
          aria-label="MAX-HEAPIFY 下沉轨迹实验：数组格与完全二叉树双视图同步展示起点违例、左右孩子比较、较大孩子交换、逐层下沉与全树校验，支持场景切换、故障注入与步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch06-a-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch06-a-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="clrs4-ch06-a-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="660" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            {selected.label} · 起点 {selected.start}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            {s >= 5
              ? verifyOk
                ? "● 校验通过"
                : "● 校验失败"
              : `阶段 ${s + 1} / 6`}
          </text>
          <text x="30" y="54" fontSize="12" fill={C.secondary}>
            {selected.note}
          </text>

          {display.map((value, index) => {
            const x = rd(arrayX + index * (cellW + 6));
            const onPath =
              pathSet.has(index) && s >= 3 && trace.swaps.length > 0;
            const isActive = index === activeIdx;
            const isChosen = index === chosenIdx && s >= 2;
            const isCompare = compareIdxs.includes(index);
            const isBad = badIdxs.includes(index);
            const stroke = isBad
              ? C.danger
              : isActive || isCompare
                ? C.warning
                : onPath || isChosen
                  ? C.accent
                  : C.border;
            return (
              <g key={`cell-${index}`}>
                <rect
                  x={x}
                  y="72"
                  width={rd(cellW)}
                  height="56"
                  rx="9"
                  fill={
                    isBad
                      ? C.danger
                      : isActive || isCompare
                        ? C.warning
                        : onPath
                          ? C.accent
                          : C.elevated
                  }
                  fillOpacity={
                    isBad || isActive || isCompare || onPath ? 0.14 : 1
                  }
                  stroke={stroke}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text
                  x={rd(x + cellW / 2)}
                  y="106"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {value}
                </text>
                <text
                  x={rd(x + cellW / 2)}
                  y="146"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  [{index}]{index === selected.start ? " 起点" : ""}
                </text>
              </g>
            );
          })}

          <line
            x1="30"
            y1="164"
            x2="870"
            y2="164"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd="url(#clrs4-ch06-a-arrow)"
          />
          <text x="30" y="184" fontSize="11" fill={C.secondary}>
            数组前缀即堆：节点 i 的孩子是 2i+1 与 2i+2（0 基）
          </text>

          {display.map((_, index) => {
            if (index === 0) return null;
            const p = treePos(parentIdx(index));
            const c = treePos(index);
            const onPath =
              pathSet.has(index) && pathSet.has(parentIdx(index)) && s >= 3;
            return (
              <line
                key={`edge-${index}`}
                x1={p.x}
                y1={p.y}
                x2={c.x}
                y2={c.y}
                stroke={onPath ? C.accent : C.border}
                strokeWidth={onPath ? 2.5 : 1.5}
                markerEnd={
                  onPath
                    ? "url(#clrs4-ch06-a-accent)"
                    : "url(#clrs4-ch06-a-arrow)"
                }
              />
            );
          })}

          {display.map((value, index) => {
            const pos = treePos(index);
            const isActive = index === activeIdx;
            const isChosen = index === chosenIdx && s >= 2;
            const isCompare = compareIdxs.includes(index);
            const isBad = badIdxs.includes(index);
            const onPath =
              pathSet.has(index) && s >= 3 && trace.swaps.length > 0;
            const stroke = isBad
              ? C.danger
              : isActive || isCompare
                ? C.warning
                : onPath || isChosen
                  ? C.accent
                  : C.border;
            return (
              <g key={`node-${index}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={
                    isBad
                      ? C.danger
                      : isActive || isCompare
                        ? C.warning
                        : onPath
                          ? C.accent
                          : C.elevated
                  }
                  fillOpacity={
                    isBad || isActive || isCompare || onPath ? 0.16 : 1
                  }
                  stroke={stroke}
                  strokeWidth={isActive ? 3 : 1.5}
                />
                <text
                  x={pos.x}
                  y={rd(pos.y + 4)}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {value}
                </text>
                <text
                  x={pos.x}
                  y={rd(pos.y + r + 15)}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index}
                </text>
              </g>
            );
          })}

          {SINK_STEPS.map((step, index) => {
            const isActive = index === s;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x="30"
                  y={rd(196 + levels * 84 + 24)}
                  width="840"
                  height="58"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x="52"
                  y={rd(196 + levels * 84 + 50)}
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text
                  x="52"
                  y={rd(196 + levels * 84 + 72)}
                  fontSize="12"
                  fill={C.primary}
                >
                  {step.caption}
                </text>
                <text
                  x="848"
                  y={rd(196 + levels * 84 + 50)}
                  textAnchor="end"
                  fontSize="11"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index < s ? "◇ 已完成" : index === s ? "▷ 当前" : "· 未开始"}
                </text>
              </g>
            );
          })}

          <rect
            x="30"
            y="618"
            width="840"
            height="30"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="52" y="638" fontSize="12" fill={C.secondary}>
            {leftOnly
              ? "故障注入中：只与左孩子比较 → 右孩子更大时交换错对象，违例留在上层"
              : "每次只和较大孩子交换，原位置同时不小于两个孩子"}
          </text>
        </svg>

        <div
          data-readout="heapify-trace"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          交换 {trace.swaps.length} 次 · 下沉深度 {trace.depth} · 比较{" "}
          {trace.comparisons} 次 · 残余违例{" "}
          <span
            className={
              s >= 5 && !verifyOk
                ? "font-semibold text-[var(--danger)]"
                : "font-semibold text-[var(--success)]"
            }
          >
            {s >= 5 ? trace.violations : "待校验"}
          </span>
          {s >= 5 ? (verifyOk ? " · 堆性质成立" : " · 堆性质未恢复") : ""}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={leftOnly}
            data-fault="left-child-only"
            onClick={() => setLeftOnly((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              leftOnly
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {leftOnly ? "● 故障已注入：只比左孩子" : "◇ 注入故障：只比左孩子"}
          </button>
          <p className="max-w-xl text-xs leading-5 text-secondary">
            现象：校验步残余违例大于
            0，上层节点仍小于右孩子。原因：修复后父节点只保证大于左孩子。修法：必须与左右孩子中的较大者交换。
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={SINK_LABEL_TEXT}
          caption="先预测交换次数，再逐步核对：违例怎样逐层下移，最终停在叶子或提前恢复。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置 MAX-HEAPIFY 下沉轨迹实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MAX-HEAPIFY
        只修复起点子树内的一个违例：与较大孩子交换后，违例移到更深层，直到叶子或提前停止。
      </figcaption>
    </figure>
  );
}

/* ---------------- Lab 2：BUILD-MAX-HEAP 线性时间账本 ---------------- */

const LEDGER_NS = [10, 15, 31] as const;

function ledgerRows(n: number) {
  const hMax = Math.floor(Math.log2(n));
  const rows: Array<{ h: number; nodes: number; work: number }> = [];
  let total = 0;
  for (let h = 0; h <= hMax; h++) {
    const nodes = Math.ceil(n / 2 ** (h + 1));
    rows.push({ h, nodes, work: nodes * h });
    total += nodes * h;
  }
  const naive = Math.floor(n / 2) * hMax;
  return { rows, total, naive, hMax };
}

function simulateBuild(n: number, topDown: boolean) {
  const base = Array.from(
    { length: n },
    (_, i) => ((37 * (i + 1)) % (n + 3)) + (i % 5),
  );
  let actualSwaps = 0;
  if (topDown) {
    for (let i = 0; i < n; i++) {
      const t = sinkTrace(base, i, false);
      base.splice(0, base.length, ...t.result);
    }
  } else {
    const r = buildMaxHeap(base);
    base.splice(0, base.length, ...r.array);
    actualSwaps = r.totalSwaps;
  }
  return { violations: countViolations(base), actualSwaps };
}

const LEDGER_STEPS: readonly TeachingStep[] = [
  { label: "scan", caption: "从最后一个内部节点 ⌊n/2⌋−1 自底向上扫描" },
  { label: "sift", caption: "对每个内部节点做 MAX-HEAPIFY 下沉" },
  {
    label: "bucket",
    caption: "按节点高度记账：高度 h 的节点至多 ⌈n/2^{h+1}⌉ 个",
  },
  { label: "sum", caption: "加权求和 Σ h·⌈n/2^{h+1}⌉，多数节点高度为 0" },
  { label: "bound", caption: "与松上界 ⌊n/2⌋·⌊lg n⌋ 对比：比值远小于 1" },
];

const LEDGER_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  LEDGER_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function BuildHeapLedgerLab() {
  const barsRef = useRef<SVGGElement | null>(null);
  const cardRefs = useRef<Array<SVGGElement | null>>([]);
  const [n, setN] = useState<number>(15);
  const [topDown, setTopDown] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LEDGER_STEPS,
    build: (tl) => {
      tl.add(
        barsRef.current!,
        { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" },
        2 * T,
      );
      LEDGER_STEPS.forEach((step, index) => {
        tl.add(
          cardRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const { rows, total, naive, hMax } = ledgerRows(n);
  const sim = simulateBuild(n, topDown);
  const s = timeline.currentStep;
  const startIdx = Math.floor(n / 2) - 1;
  const base = Array.from(
    { length: n },
    (_, i) => ((37 * (i + 1)) % (n + 3)) + (i % 5),
  );
  const badAfter = topDown && s >= 1 ? violatingIndices(base) : [];
  const r = nodeRadius(n, 440);

  function reset() {
    timeline.goToStep(0);
    setN(15);
    setTopDown(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch06-build-heap-ledger"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 2 · BUILD-MAX-HEAP 线性时间账本
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              为什么建堆是 Θ(n)：按高度翻账本
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              把每个内部节点的下沉成本记在它的高度上。先预测 n
              翻倍时总成本翻几倍，再切换 n
              看分桶账本：靠近叶的节点占大多数，却只能下沉零到一层。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-3 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">
            选择堆规模 n
          </span>
          <select
            aria-label="选择建堆账本的堆规模 n 为 10、15 或 31"
            data-param="heap-size-n"
            value={n}
            onChange={(event) => {
              setN(Number(event.target.value));
              timeline.goToStep(0);
            }}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            {LEDGER_NS.map((value) => (
              <option key={value} value={value}>
                n = {value} · ⌊lg n⌋ = {Math.floor(Math.log2(value))}
              </option>
            ))}
          </select>
        </label>

        <svg
          viewBox="0 0 900 640"
          role="img"
          aria-label="BUILD-MAX-HEAP 线性时间账本实验：近乎完全二叉树按高度着色，右侧按高度分桶展示节点数与下沉工作量，并对比实际加权和与松上界，支持规模切换、自顶向下故障注入与步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch06-b-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="640" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            n = {n} · 树高 ⌊lg n⌋ = {hMax} · 内部节点 ⌊n/2⌋ ={" "}
            {Math.floor(n / 2)}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            {topDown ? "● 故障：自顶向下" : `阶段 ${s + 1} / 5`}
          </text>

          {base.map((value, index) => {
            if (index === 0) return null;
            const p = treePos(parentIdx(index), { x0: 20, width: 440 });
            const c = treePos(index, { x0: 20, width: 440 });
            return (
              <line
                key={`edge-${index}`}
                x1={p.x}
                y1={p.y}
                x2={c.x}
                y2={c.y}
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-ch06-b-arrow)"
              />
            );
          })}

          {base.map((value, index) => {
            const pos = treePos(index, { x0: 20, width: 440 });
            const isInternal = index < Math.floor(n / 2);
            const isStart = index === startIdx && s === 0;
            const isBad = badAfter.includes(index);
            const height = Math.max(0, Math.floor(Math.log2(n / (index + 1))));
            const tone = isBad
              ? C.danger
              : s >= 1 && isInternal
                ? C.accent
                : isStart
                  ? C.warning
                  : C.border;
            const fillOp = isBad
              ? 0.2
              : s >= 1 && isInternal
                ? Math.min(0.2, 0.06 + height * 0.05)
                : isStart
                  ? 0.16
                  : 1;
            const fill = isBad
              ? C.danger
              : s >= 1 && isInternal
                ? C.accent
                : isStart
                  ? C.warning
                  : C.elevated;
            return (
              <g key={`node-${index}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={fill}
                  fillOpacity={fillOp}
                  stroke={tone}
                  strokeWidth={isStart ? 3 : 1.5}
                />
                <text
                  x={pos.x}
                  y={rd(pos.y + 4)}
                  textAnchor="middle"
                  fontSize={r < 16 ? 11 : 13}
                  fontWeight="700"
                  fill={C.primary}
                >
                  {value}
                </text>
                {s >= 2 && isInternal && (
                  <text
                    x={pos.x}
                    y={rd(pos.y + r + 14)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    h{height}
                  </text>
                )}
              </g>
            );
          })}

          <text x="520" y="86" fontSize="13" fontWeight="700" fill={C.primary}>
            按高度分桶
          </text>
          <text
            x="870"
            y="86"
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            ■ 节点数 ■ 下沉工作量
          </text>

          <g
            ref={(node) => {
              barsRef.current = node;
            }}
            style={{ opacity: 0 }}
          >
            {rows.map((row) => {
              const y = rd(120 + (hMax - row.h) * 62);
              const nodeBarH = rd(Math.min(46, row.nodes * 5));
              const workBarH = rd(Math.min(46, row.work * 5));
              return (
                <g key={`bucket-${row.h}`}>
                  <text x="520" y={rd(y + 12)} fontSize="11" fill={C.secondary}>
                    h={row.h}
                  </text>
                  <rect
                    x="560"
                    y={rd(y + 18 - nodeBarH)}
                    width="22"
                    height={nodeBarH}
                    rx="4"
                    fill={C.secondary}
                    fillOpacity="0.55"
                  />
                  <rect
                    x="592"
                    y={rd(y + 18 - workBarH)}
                    width="22"
                    height={workBarH}
                    rx="4"
                    fill={row.work === 0 ? C.border : C.accent}
                    fillOpacity={row.work === 0 ? 0.6 : 0.85}
                  />
                  <text x="628" y={rd(y + 12)} fontSize="11" fill={C.primary}>
                    ⌈n/2^{row.h + 1}⌉ = {row.nodes} 个节点 · 工作量 {row.nodes}×
                    {row.h} = {row.work}
                  </text>
                </g>
              );
            })}
          </g>

          {LEDGER_STEPS.map((step, index) => {
            const isActive = index === s;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x="30"
                  y="560"
                  width="200"
                  height="56"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x="46"
                  y="584"
                  fontSize="12"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text x="46" y="604" fontSize="11" fill={C.secondary}>
                  {step.caption}
                </text>
              </g>
            );
          })}

          <rect
            x="250"
            y="560"
            width="620"
            height="56"
            rx="10"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="268" y="584" fontSize="12" fontWeight="700" fill={C.primary}>
            实际加权和 Σ = {total} · 松上界 ⌊n/2⌋·⌊lg n⌋ = {naive} · 比值{" "}
            {naive ? (total / naive).toFixed(3) : "0"}
          </text>
          <text x="268" y="604" fontSize="11" fill={C.secondary}>
            {topDown
              ? `故障注入中：自顶向下破坏了“孩子先成堆”的前置条件，建堆后违例 ${sim.violations} 处`
              : `模拟实际交换 ${sim.actualSwaps} 次（≤ 2n = ${2 * n}）· 建堆后违例 ${sim.violations} 处`}
          </text>
        </svg>

        <div
          data-readout="build-ledger"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          n={n} · Σ h·⌈n/2^(h+1)⌉ = {total} · 松上界 = {naive} · 比值{" "}
          {naive ? (total / naive).toFixed(3) : "0"} · 建堆后违例{" "}
          <span
            className={
              sim.violations > 0
                ? "font-semibold text-[var(--danger)]"
                : "font-semibold text-[var(--success)]"
            }
          >
            {sim.violations}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={topDown}
            data-fault="top-down-build"
            onClick={() => setTopDown((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              topDown
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {topDown
              ? "● 故障已注入：自顶向下建堆"
              : "◇ 注入故障：自顶向下建堆"}
          </button>
          <p className="max-w-xl text-xs leading-5 text-secondary">
            现象：红色节点处父小于子，堆性质未成立。原因：先处理上层时它的孩子尚未成堆，MAX-HEAPIFY
            的前置条件被破坏。修法：从 ⌊n/2⌋−1 递减到 0，保证处理 i
            时其孩子已是堆。
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LEDGER_LABEL_TEXT}
          caption="先预测 n 翻倍时 Σ 翻几倍，再沿时间线看分桶、求和与界对比；换 n 后账本整体重排。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置建堆线性时间账本实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        建堆成本按高度加权求和后为
        O(n)：叶子层节点占一半却零成本，越靠根的节点越少。读取全部元素已要
        Ω(n)，故 BUILD-MAX-HEAP 是 Θ(n)。
      </figcaption>
    </figure>
  );
}

/* ---------------- Lab 3：堆排序调度台（堆前缀 + 有序后缀） ---------------- */

type SortScenarioKey = "default" | "sorted" | "duplicates";

const SORT_SCENARIOS: Record<
  SortScenarioKey,
  { label: string; values: readonly number[]; note: string }
> = {
  default: {
    label: "默认 · 乱序",
    values: [20, 7, 16, 3, 11, 14, 6, 9],
    note: "出队序列应严格递减，最终数组升序",
  },
  sorted: {
    label: "边界 · 已升序",
    values: [3, 6, 7, 9, 11, 14, 16, 20],
    note: "建堆要花更多下沉，但 extract 轮数与轨迹结构不变",
  },
  duplicates: {
    label: "边界 · 含重复值",
    values: [12, 4, 12, 8, 4, 15, 9, 12],
    note: "排序仍正确，但相等键的相对顺序可能改变（不稳定）",
  },
};

const EXTRACT_STEPS: readonly TeachingStep[] = [
  { label: "build", caption: "BUILD-MAX-HEAP：整个数组先变成最大堆" },
  { label: "swap", caption: "把根（当前最大）与堆末尾交换" },
  { label: "shrink", caption: "heap-size 减一，旧根并入右侧有序后缀" },
  { label: "fix", caption: "新根做一次 MAX-HEAPIFY 修复" },
  { label: "repeat", caption: "重复 extract，后缀自右向左生长" },
  { label: "verify", caption: "校验：数组非降序且多重集保持" },
];

const EXTRACT_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  EXTRACT_STEPS.map((st) => [st.label, st.caption ?? st.label]),
);

type Snapshot = { array: number[]; heapSize: number; extracted: number | null };

function heapsortTrace(values: readonly number[], forgetShrink: boolean) {
  const built = buildMaxHeap(values);
  const a = built.array;
  const n = a.length;
  const snapshots: Snapshot[] = [
    { array: a.slice(), heapSize: n, extracted: null },
  ];
  let hs = n;
  let fixSwapsTotal = 0;
  for (let rnd = 1; rnd <= n - 1; rnd++) {
    const tmp = a[0];
    a[0] = a[hs - 1];
    a[hs - 1] = tmp;
    const extracted = a[hs - 1];
    if (!forgetShrink) hs -= 1;
    const t = sinkTrace(a.slice(0, hs), 0, false);
    a.splice(0, hs, ...t.result);
    fixSwapsTotal += t.swaps.length;
    snapshots.push({ array: a.slice(), heapSize: hs, extracted });
  }
  let firstInversion: number | null = null;
  for (let i = 0; i < n - 1; i++) {
    if (a[i] > a[i + 1]) {
      firstInversion = i;
      break;
    }
  }
  return {
    snapshots,
    buildSwaps: built.totalSwaps,
    fixSwapsTotal,
    sortedOk: firstInversion === null,
    firstInversion,
  };
}

function HeapExtractScheduleLab() {
  const cardRefs = useRef<Array<SVGGElement | null>>([]);
  const [scenario, setScenario] = useState<SortScenarioKey>("default");
  const [forgetShrink, setForgetShrink] = useState(false);

  const timeline = useTeachingTimeline({
    steps: EXTRACT_STEPS,
    build: (tl) => {
      EXTRACT_STEPS.forEach((step, index) => {
        tl.add(
          cardRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const selected = SORT_SCENARIOS[scenario];
  const trace = heapsortTrace(selected.values, forgetShrink);
  const n = selected.values.length;
  const s = timeline.currentStep;
  const snapIdx =
    s === 0 || s === 1
      ? 0
      : s === 2 || s === 3
        ? 1
        : s === 4
          ? Math.min(3, n - 1)
          : n - 1;
  const snap = trace.snapshots[snapIdx];
  const showSwapOverlay = s === 1;
  const cellW = 64;
  const gap = 10;
  const trackX = rd((900 - (n * (cellW + gap) - gap)) / 2);
  const prefixBad =
    s >= 5 && !trace.sortedOk && trace.firstInversion !== null
      ? [trace.firstInversion, trace.firstInversion + 1]
      : [];
  const r = nodeRadius(snap.heapSize);

  function reset() {
    timeline.goToStep(0);
    setScenario("default");
    setForgetShrink(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch06-heap-extract-schedule"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 3 · 堆排序调度台（优先队列出队视角）
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              堆前缀收缩，有序后缀生长
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              把 HEAPSORT 看成对最大优先队列反复
              EXTRACT-MAX：每轮出队的元素自右向左固化。先预测第一轮后哪个元素进入后缀，再逐步核对
              heap-size 边界怎样移动。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-3 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">
            选择输入形状
          </span>
          <select
            aria-label="选择堆排序输入形状：默认乱序、已升序边界或含重复值边界"
            data-param="sort-input"
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value as SortScenarioKey);
              timeline.goToStep(0);
            }}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            {(Object.keys(SORT_SCENARIOS) as SortScenarioKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_SCENARIOS[key].label}
              </option>
            ))}
          </select>
        </label>

        <svg
          viewBox="0 0 900 640"
          role="img"
          aria-label="堆排序调度台实验：数组轨道左侧为最大堆前缀、右侧为自右向左生长的有序后缀，展示建堆、换根尾、缩小 heap-size、下沉修复与最终校验，支持输入切换、忘记缩小 heap-size 的故障注入与步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch06-c-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch06-c-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="640" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            {selected.label} · heap-size {snap.heapSize} / {n}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            {s >= 5
              ? trace.sortedOk
                ? "● 校验通过"
                : "● 校验失败"
              : `阶段 ${s + 1} / 6`}
          </text>
          <text x="30" y="54" fontSize="12" fill={C.secondary}>
            {selected.note}
          </text>

          <line
            x1={trackX}
            y1="122"
            x2={rd(trackX + snap.heapSize * (cellW + gap) - gap)}
            y2="122"
            stroke={C.accent}
            strokeWidth="3"
          />
          <line
            x1={rd(trackX + snap.heapSize * (cellW + gap))}
            y1="122"
            x2={rd(trackX + n * (cellW + gap) - gap)}
            y2="122"
            stroke={C.success}
            strokeWidth="3"
          />
          <text x={trackX} y="142" fontSize="11" fill={C.accent}>
            最大堆前缀 A[0..heap-size)
          </text>
          <text
            x={rd(trackX + n * (cellW + gap))}
            y="142"
            textAnchor="end"
            fontSize="11"
            fill={C.success}
          >
            有序后缀 A[heap-size..n)
          </text>

          {snap.array.map((value, index) => {
            const x = rd(trackX + index * (cellW + gap));
            const inHeap = index < snap.heapSize;
            const isBad = prefixBad.includes(index);
            const isSwapEnd =
              showSwapOverlay && (index === 0 || index === snap.heapSize - 1);
            const stroke = isBad
              ? C.danger
              : isSwapEnd
                ? C.warning
                : inHeap
                  ? C.accent
                  : C.success;
            return (
              <g key={`cell-${index}`}>
                <rect
                  x={x}
                  y="68"
                  width={cellW}
                  height="50"
                  rx="9"
                  fill={
                    isBad
                      ? C.danger
                      : isSwapEnd
                        ? C.warning
                        : inHeap
                          ? C.accent
                          : C.success
                  }
                  fillOpacity={isBad || isSwapEnd || !inHeap ? 0.14 : 1}
                  stroke={stroke}
                  strokeWidth={isSwapEnd || isBad ? 2.5 : 1.5}
                />
                <text
                  x={rd(x + cellW / 2)}
                  y="99"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {value}
                </text>
                <text
                  x={rd(x + cellW / 2)}
                  y="166"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index}
                </text>
              </g>
            );
          })}

          {showSwapOverlay && snap.heapSize > 1 && (
            <path
              d={`M ${rd(trackX + cellW / 2)} 62 C ${rd(trackX + cellW / 2)} 30, ${rd(trackX + (snap.heapSize - 1) * (cellW + gap) + cellW / 2)} 30, ${rd(trackX + (snap.heapSize - 1) * (cellW + gap) + cellW / 2)} 62`}
              fill="none"
              stroke={C.warning}
              strokeWidth="2.5"
              markerEnd="url(#clrs4-ch06-c-warning)"
            />
          )}

          <text x="30" y="200" fontSize="13" fontWeight="700" fill={C.primary}>
            当前堆的树视图（只画堆前缀）
          </text>
          {snap.array.map((_, index) => {
            if (index === 0 || index >= snap.heapSize) return null;
            const p = treePos(parentIdx(index));
            const c = treePos(index);
            return (
              <line
                key={`edge-${index}`}
                x1={p.x}
                y1={p.y}
                x2={c.x}
                y2={c.y}
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-ch06-c-arrow)"
              />
            );
          })}
          {snap.array.map((value, index) => {
            if (index >= snap.heapSize) return null;
            const pos = treePos(index);
            return (
              <g key={`node-${index}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={index === 0 && s >= 1 ? C.warning : C.elevated}
                  fillOpacity={index === 0 && s >= 1 ? 0.16 : 1}
                  stroke={index === 0 && s >= 1 ? C.warning : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={pos.x}
                  y={rd(pos.y + 4)}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {value}
                </text>
              </g>
            );
          })}

          {EXTRACT_STEPS.map((step, index) => {
            const isActive = index === s;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x="30"
                  y="530"
                  width="840"
                  height="56"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x="52"
                  y="554"
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text x="52" y="574" fontSize="12" fill={C.primary}>
                  {step.caption}
                </text>
                <text
                  x="848"
                  y="554"
                  textAnchor="end"
                  fontSize="11"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index < s ? "◇ 已完成" : index === s ? "▷ 当前" : "· 未开始"}
                </text>
              </g>
            );
          })}

          <rect
            x="30"
            y="600"
            width="840"
            height="28"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="52" y="619" fontSize="12" fill={C.secondary}>
            {forgetShrink
              ? "故障注入中：heap-size 未缩小，旧根留在堆前缀里继续参与比较"
              : "循环不变量：前缀是最大堆，后缀非降序，且后缀元素不小于堆内元素"}
          </text>
        </svg>

        <div
          data-readout="extract-schedule"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          heap-size {snap.heapSize} / {n} · 已出队 [
          {snap.array.slice(snap.heapSize).join(", ")}] · extract 第{" "}
          {Math.min(snapIdx, n - 1)} / {n - 1} 轮 · 建堆交换 {trace.buildSwaps}{" "}
          次 · 修复交换累计 {trace.fixSwapsTotal} 次
          {s >= 5 ? (
            <>
              {" "}
              · 校验{" "}
              <span
                className={
                  trace.sortedOk
                    ? "font-semibold text-[var(--success)]"
                    : "font-semibold text-[var(--danger)]"
                }
              >
                {trace.sortedOk
                  ? "通过（非降序 + 多重集保持）"
                  : `失败（首处逆序在索引 ${trace.firstInversion}）`}
              </span>
            </>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={forgetShrink}
            data-fault="forget-shrink"
            onClick={() => setForgetShrink((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              forgetShrink
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {forgetShrink
              ? "● 故障已注入：忘记缩小 heap-size"
              : "◇ 注入故障：忘记缩小 heap-size"}
          </button>
          <p className="max-w-xl text-xs leading-5 text-secondary">
            现象：第一轮后旧根仍留在堆前缀内，越界参与后续比较，校验步出现逆序。原因：heap-size
            是算法状态的一部分，不是只读常量。修法：每次换根尾后立即减一并把新根下沉。
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={EXTRACT_LABEL_TEXT}
          caption="先预测每轮出队值，再逐步核对：根尾交换 → 缩界 → 下沉，后缀怎样一格一格长出来。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置堆排序调度台实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HEAPSORT 与 EXTRACT-MAX
        是同一台机器：堆排序就是对输入本身反复出队。heap-size
        划出了“还在工作的堆”和“已经固化的答案”。
      </figcaption>
    </figure>
  );
}

export function Clrs4Chapter06HeapsortLab() {
  return (
    <div className="not-prose">
      <HeapifySinkTraceLab />
      <BuildHeapLedgerLab />
      <HeapExtractScheduleLab />
    </div>
  );
}
