"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
  type TeachingTimeline,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";

// 仅规范化绘制坐标，绝不四舍五入数学结果本身。
const geo = (n: number) => (Number.isFinite(n) ? Number(n.toFixed(9)) : 0);

/** 确定性 PRNG（mulberry32 f32 变体，与 body.py 同公式同种子）。 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED = 7;

function rewind(t: TeachingTimeline) {
  t.pause();
  t.seek(0);
}

function useDomainTimeline(labels: readonly string[]) {
  const labelsKey = labels.join("|");
  const steps: TeachingStep[] = useMemo(
    () => labels.map((label) => ({ label })),
    // labels 由调用方以 join 后的 key 保证稳定
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labelsKey],
  );
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      labels.forEach((label, i) => tl.label(label, i * 800));
      tl.add(
        clock,
        {
          value: 1,
          duration: Math.max(800, (labels.length - 1) * 800),
          ease: "linear",
        },
        0,
      );
    },
  });
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return timeline;
}

function Lab({
  id,
  title,
  caption,
  children,
}: {
  id: string;
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      aria-label={title}
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-bg p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11"
    >
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">{caption}</p>
      {children}
    </section>
  );
}

function Choice({
  name,
  label,
  value,
  options,
  change,
}: {
  name: string;
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  change: (value: string) => void;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}
      <select
        data-param={name}
        data-control={name}
        aria-label={label}
        value={value}
        onChange={(e) => change(e.target.value)}
        className={`${control} mt-1 block w-full`}
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function Fault({
  name,
  active,
  change,
  children,
}: {
  name: string;
  active: boolean;
  change: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={name}
      aria-pressed={active}
      onClick={change}
      className={`${control} my-3 w-full whitespace-normal text-left ${
        active ? "border-danger text-danger" : ""
      }`}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}

function Transport({ t, reset }: { t: TeachingTimeline; reset: () => void }) {
  return (
    <div
      data-control="transport"
      data-timeline={t.currentStep}
      data-progress={t.progress}
      data-playing={String(t.isPlaying)}
      data-reduced-motion={String(t.reducedMotion)}
    >
      <TimelineControls timeline={t} />
      <button
        type="button"
        data-reset="full"
        aria-label="完全重置实验"
        className={`${control} mt-3 w-full`}
        onClick={reset}
      >
        完全重置实验
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- 公共机制

type PartitionFrame = {
  a: number[];
  i: number;
  j: number | null;
  swapped: boolean;
  note: string;
};

type LomutoTrace = {
  pivot: number;
  q: number;
  comparisons: number;
  swaps: number;
  frames: PartitionFrame[];
};

/** Lomuto 划分帧序列：frames[0]=主元就绪，其后每轮 j 一帧，末帧为主元归位。 */
function lomutoTrace(
  values: readonly number[],
  policy: "last" | "median3" | "random",
  fault: boolean,
): LomutoTrace {
  const a = [...values];
  const p = 0;
  const r = a.length - 1;
  let swaps = 0;
  const rng = mulberry32(SEED);
  if (policy === "median3") {
    const m = (p + r) >> 1;
    const trio = [
      { v: a[p], k: p },
      { v: a[m], k: m },
      { v: a[r], k: r },
    ].sort((x, y) => x.v - y.v);
    a[m] = a[trio[1].k];
    a[trio[1].k] = a[r];
    a[r] = trio[1].v;
    swaps += 1;
  } else if (policy === "random") {
    const k = p + Math.floor(rng() * (r - p + 1));
    const tmp = a[k];
    a[k] = a[r];
    a[r] = tmp;
    swaps += 1;
  }
  const x = a[r];
  const frames: PartitionFrame[] = [
    {
      a: [...a],
      i: p - 1,
      j: null,
      swapped: false,
      note: `选定主元 x = A[r] = ${x}`,
    },
  ];
  let i = p - 1;
  let comparisons = 0;
  for (let j = p; j < r; j++) {
    comparisons += 1;
    const aj = a[j];
    if (aj <= x) {
      i += 1;
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
      swaps += 1;
      frames.push({
        a: [...a],
        i,
        j,
        swapped: true,
        note: `j=${j}：A[${j}]=${aj} ≤ x → i=${i}，交换 A[${i}]↔A[${j}]`,
      });
    } else {
      frames.push({
        a: [...a],
        i,
        j,
        swapped: false,
        note: `j=${j}：A[${j}]=${aj} > x，未知区边界右移，不交换`,
      });
    }
  }
  const q = fault ? Math.max(i, p) : i + 1;
  const tmp = a[q];
  a[q] = a[r];
  a[r] = tmp;
  swaps += 1;
  frames.push({
    a: [...a],
    i,
    j: r,
    swapped: false,
    note: fault
      ? `故障归位：主元被放到 A[${q}]（应为 A[${i + 1}]）`
      : `归位：交换 A[${i + 1}]↔A[${r}]，q = ${i + 1}`,
  });
  return { pivot: x, q, comparisons, swaps, frames };
}

/** 验证帧：返回每个下标的判定（true=符合不变式）。 */
function verifyCells(
  a: readonly number[],
  q: number,
): { ok: boolean[]; violationCount: number } {
  const x = a[q];
  const ok = a.map((v, k) => (k < q ? v <= x : k > q ? v > x : true));
  return { ok, violationCount: ok.filter((v, k) => !v && k !== q).length };
}

type HoareEvent = { type: "swap" | "cross"; i: number; j: number; a: number[] };

function hoareTrace(values: readonly number[]) {
  const a = [...values];
  const p = 0;
  const r = a.length - 1;
  const x = a[p];
  let i = p - 1;
  let j = r + 1;
  let swaps = 0;
  const events: HoareEvent[] = [];
  for (;;) {
    for (;;) {
      j -= 1;
      if (a[j] <= x) break;
    }
    for (;;) {
      i += 1;
      if (a[i] >= x) break;
    }
    if (i < j) {
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
      swaps += 1;
      events.push({ type: "swap", i, j, a: [...a] });
    } else {
      events.push({ type: "cross", i, j, a: [...a] });
      return { pivot: x, j, swaps, events };
    }
  }
}

// ---------------------------------------------------------------- Lab 1

const LAB1_INPUTS = {
  reversed: [9, 7, 5, 3, 8, 6, 4, 2],
  sorted: [2, 3, 4, 5, 6, 7, 8, 9],
  mixed: [4, 1, 8, 3, 9, 2, 7, 6],
  duplicates: [3, 1, 3, 2, 3, 4, 3, 5],
} as const;

type Lab1Input = keyof typeof LAB1_INPUTS;
type PivotPolicy = "last" | "median3" | "random";

const LAB1_STEPS: TeachingStep[] = [
  "主元",
  "扫描1",
  "扫描2",
  "扫描3",
  "扫描4",
  "扫描5",
  "扫描6",
  "扫描7",
  "归位",
  "验证",
].map((label, i) => ({
  label,
  caption:
    i === 0
      ? "选定主元 x = A[r]"
      : i < 8
        ? `扫描 A[${i - 1}]`
        : i === 8
          ? "主元归位到最终位置"
          : "逐格验证四区不变式",
}));

const LAB1_CELL_X = (k: number) => 40 + k * 98;
const LAB1_CELL_W = 86;
const LAB1_CELL_Y = 150;
const LAB1_CELL_H = 64;

export function Clrs4Chapter07QuicksortPartitionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [input, setInput] = useState<Lab1Input>("reversed");
  const [policy, setPolicy] = useState<PivotPolicy>("last");
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LAB1_STEPS,
    build: (tl) => {
      LAB1_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: 400, ease: "out(2)" },
          index * 800,
        );
        tl.label(step.label, index * 800);
      });
    },
  });
  useEffect(() => {
    if (timeline.reducedMotion) timeline.pause();
  }, [timeline]);

  const trace = useMemo(
    () => lomutoTrace(LAB1_INPUTS[input], policy, fault),
    [input, policy, fault],
  );
  const step = timeline.currentStep;
  const frame = trace.frames[Math.min(step, trace.frames.length - 1)];
  const placed = step >= 8;
  const verifying = step >= 9;
  const verify = placed ? verifyCells(frame.a, trace.q) : null;

  function cellRegion(k: number): "left" | "right" | "unknown" | "pivot" {
    const r = frame.a.length - 1;
    if (k === r) return "pivot";
    if (placed) return k < trace.q ? "left" : "right";
    if (frame.j === null) return "unknown";
    if (k <= frame.i) return "left";
    if (k === frame.j) return frame.swapped ? "left" : "right";
    if (k < frame.j) return "right";
    return "unknown";
  }

  function cellCaption(k: number, region: string): string {
    if (placed) return regionText[region as keyof typeof regionText];
    if (frame.j === null) return "";
    if (k <= frame.i) return "≤ x";
    if (k === frame.j) return frame.swapped ? "≤ x" : "> x";
    if (k < frame.j) return "> x";
    return "";
  }

  const regionFill = {
    left: C.success,
    right: C.warning,
    unknown: C.elevated,
    pivot: C.accent,
  };
  const regionText = {
    left: "≤ x",
    right: "> x",
    unknown: "未扫描",
    pivot: "主元",
  };

  function reset() {
    rewind(timeline);
    setInput("reversed");
    setPolicy("last");
    setFault(false);
  }

  return (
    <Lab
      id="partition-invariant"
      title="实验一：Lomuto 划分的四区不变式扫描"
      caption="先预测：逆序输入配末位主元，归位后主元会停在哪个位置？再切换输入形状与主元策略，逐帧核对不变式。"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="input-shape"
          label="输入形状（自造样本）"
          value={input}
          options={[
            ["reversed", "逆序 · 9 7 5 3 8 6 4 2"],
            ["sorted", "升序 · 2 3 4 5 6 7 8 9"],
            ["mixed", "杂乱 · 4 1 8 3 9 2 7 6"],
            ["duplicates", "重复键 · 3 1 3 2 3 4 3 5"],
          ]}
          change={(v) => {
            rewind(timeline);
            setInput(v as Lab1Input);
          }}
        />
        <Choice
          name="pivot-policy"
          label="主元策略"
          value={policy}
          options={[
            ["last", "末元素 A[r]"],
            ["median3", "三点中位数（首/中/末）"],
            ["random", "随机下标（固定种子可复现）"],
          ]}
          change={(v) => {
            rewind(timeline);
            setPolicy(v as PivotPolicy);
          }}
        />
      </div>
      <Fault
        name="pivot-off-by-one"
        active={fault}
        change={() => {
          rewind(timeline);
          setFault(!fault);
        }}
      >
        归位时下标差一：把主元与 A[i]（而非 A[i+1]）交换
      </Fault>
      <svg
        viewBox="0 0 900 560"
        role="img"
        aria-label="CLRS 4e Chapter 7 Quicksort 专属 Lomuto 划分实验。覆盖 quicksort、快速排序、PARTITION、划分、Lomuto、循环不变式、pivot、主元，展示四区不变式、i 与 j 指针扫描、主元归位与逐格验证，并支持输入形状、主元策略、故障注入、播放、暂停、单步、拖进度和重置。"
        className="mx-auto mt-2 block h-auto w-full"
      >
        <rect x="0" y="0" width="900" height="560" rx="14" fill={C.bg} />
        <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
          PARTITION：四区不变式 → 归位 → 验证
        </text>
        <text x="30" y="60" fontSize="12" fill={C.secondary}>
          输入 {LAB1_INPUTS[input].join(" ")} · 主元 x = {trace.pivot} · 第{" "}
          {Math.min(step + 1, 10)} / 10 帧
        </text>

        <text x="30" y="118" fontSize="12" fontWeight="700" fill={C.secondary}>
          数组状态（绿 ≤ x · 琥珀 &gt; x · 灰 未扫描 · 蓝 主元）
        </text>

        {frame.a.map((v, k) => {
          const region = cellRegion(k);
          const bad = verifying && verify ? !verify.ok[k] : false;
          return (
            <g key={`cell-${k}`}>
              <rect
                data-cell={k}
                data-region={region}
                x={geo(LAB1_CELL_X(k))}
                y={LAB1_CELL_Y}
                width={LAB1_CELL_W}
                height={LAB1_CELL_H}
                rx="10"
                fill={bad ? C.danger : regionFill[region]}
                fillOpacity={
                  region === "unknown" || region === "pivot" ? 0.14 : 0.14
                }
                stroke={
                  bad
                    ? C.danger
                    : region === "unknown"
                      ? C.border
                      : regionFill[region]
                }
                strokeWidth={bad ? 3 : 2}
              />
              <text
                x={geo(LAB1_CELL_X(k) + LAB1_CELL_W / 2)}
                y={LAB1_CELL_Y + 30}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill={C.primary}
              >
                {v}
              </text>
              <text
                x={geo(LAB1_CELL_X(k) + LAB1_CELL_W / 2)}
                y={LAB1_CELL_Y + 52}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {bad ? "✗ 违约" : cellCaption(k, region)}
              </text>
              {frame.j !== null && k === frame.j && step < 8 && (
                <path
                  d={`M ${geo(LAB1_CELL_X(k) + LAB1_CELL_W / 2 - 7)} 226 l 7 12 l 7 -12 Z`}
                  fill={C.accent}
                />
              )}
              {k === Math.max(frame.i, 0) && frame.j !== null && step < 8 && (
                <path
                  d={`M ${geo(LAB1_CELL_X(k) + LAB1_CELL_W / 2 - 7)} 246 l 7 -12 l 7 12 Z`}
                  fill={C.success}
                />
              )}
            </g>
          );
        })}
        {frame.j !== null && step < 8 && (
          <>
            <text x="40" y="242" fontSize="11" fill={C.accent}>
              ▽ j 扫描指针
            </text>
            <text x="170" y="242" fontSize="11" fill={C.success}>
              △ i 左区末尾
            </text>
          </>
        )}

        <rect
          x="30"
          y="272"
          width="840"
          height="86"
          rx="12"
          fill={C.elevated}
          stroke={C.border}
          strokeWidth="1.5"
        />
        <text x="52" y="300" fontSize="13" fontWeight="700" fill={C.primary}>
          当前动作
        </text>
        <text x="52" y="326" fontSize="12" fill={C.primary}>
          {frame.note}
        </text>
        <text x="52" y="348" fontSize="11" fill={C.secondary}>
          不变式：A[p..i] 全 ≤ x ；A[i+1..j-1] 全 &gt; x ；A[j..r-1]
          未分类；多重集守恒
        </text>
        <text x="846" y="300" textAnchor="end" fontSize="12" fill={C.secondary}>
          比较 {trace.comparisons} · 交换 {trace.swaps}
        </text>
        <text
          x="846"
          y="326"
          textAnchor="end"
          fontSize="12"
          fontWeight="700"
          fill={
            placed
              ? verify && verify.violationCount > 0
                ? C.danger
                : C.success
              : C.secondary
          }
        >
          {placed
            ? verify && verify.violationCount > 0
              ? `验证失败：${verify.violationCount} 处违约`
              : `验证通过：q = ${trace.q} 为主元最终位置`
            : "推进到归位帧查看 q"}
        </text>

        <g
          ref={(node) => {
            stageRefs.current[8] = node;
          }}
          style={{ opacity: 0 }}
        >
          <rect x="0" y="-560" width="1" height="1" fill="none" />
        </g>
        <g
          ref={(node) => {
            stageRefs.current[9] = node;
          }}
          style={{ opacity: 0 }}
        >
          <rect x="0" y="-560" width="1" height="1" fill="none" />
        </g>

        <rect
          x="30"
          y="376"
          width="840"
          height="160"
          rx="12"
          fill={C.elevated}
          stroke={C.border}
          strokeWidth="1.5"
        />
        <text x="52" y="404" fontSize="13" fontWeight="700" fill={C.primary}>
          不变式账本
        </text>
        <text x="52" y="430" fontSize="11" fill={C.secondary}>
          每轮只把 A[j] 与主元比一次：比较次数恒为 n−1 = 7，与输入形状无关
        </text>
        <text x="52" y="452" fontSize="11" fill={C.secondary}>
          交换次数跟随主元秩：逆序+末主元 1 次但 q=0；升序+末主元 8 次且 q=7 ——
          两种都极不平衡
        </text>
        <text x="52" y="474" fontSize="11" fill={C.secondary}>
          三点中位数把 q 推到 3（中部），随机主元（种子 7）本次取到
          q=3：策略改变轨迹，不变式始终成立
        </text>
        <text x="52" y="502" fontSize="11" fill={C.secondary}>
          已排序 ≠ 好划分：性能结论必须绑定主元策略，不能只说“快速排序平均 n lg
          n”
        </text>
        <text
          x="846"
          y="430"
          textAnchor="end"
          fontSize="11"
          fill={C.accent}
          data-readout-hint="partition"
        >
          data-readout: partition
        </text>
      </svg>
      <output
        data-readout="partition"
        data-input={input}
        data-policy={policy}
        data-fault={String(fault)}
        data-pivot={trace.pivot}
        data-q={trace.q}
        data-comparisons={trace.comparisons}
        data-swaps={trace.swaps}
        data-violations={verify ? verify.violationCount : 0}
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        主元 x={trace.pivot}，归位 q={trace.q}，比较 {trace.comparisons}{" "}
        次，交换 {trace.swaps} 次；
        {verify && verify.violationCount > 0
          ? `验证发现 ${verify.violationCount} 处不变式违约——归位下标差一让主元停错了位置。`
          : placed
            ? "逐格验证通过：左区全 ≤ x，右区全 > x，主元到达最终位置。"
            : "推进时间线到归位帧以验证不变式。"}
      </output>
      <p className="mt-2 text-sm text-secondary">
        本站自造八元素样本，非原书数组。时间线每帧对应算法一次真实状态转移；读数是
        body.py 独立 oracle 的同一公式。
      </p>
      <Transport t={timeline} reset={reset} />
    </Lab>
  );
}

// ---------------------------------------------------------------- Lab 2

const LAB2_INPUTS = {
  mixed: [4, 1, 8, 3, 9, 2, 7, 6],
  reversed: [9, 7, 5, 3, 8, 6, 4, 2],
  duplicates: [3, 1, 3, 2, 3, 4, 3, 5],
} as const;

type Lab2Input = keyof typeof LAB2_INPUTS;

const LAB2_STEPS: TeachingStep[] = [
  { label: "契约", caption: "两路使用同一数组但返回不同语义" },
  ...[1, 2, 3, 4, 5, 6, 7].map((k) => ({
    label: `扫描${k}`,
    caption: `第 ${k} 个扫描节拍`,
  })),
  { label: "返回值", caption: "Lomuto 返回主元最终位置，Hoare 返回分界" },
  { label: "递归区间", caption: "各自契约对应的递归范围" },
  { label: "覆盖验证", caption: "检查每个下标都被某个递归区间接管" },
];

const LAB2_CELL_X = (k: number) => 60 + k * 96;
const LAB2_CELL_W = 78;

export function Clrs4Chapter07QuicksortHoareContractLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [input, setInput] = useState<Lab2Input>("mixed");
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LAB2_STEPS,
    build: (tl) => {
      LAB2_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: 400, ease: "out(2)" },
          index * 800,
        );
        tl.label(step.label, index * 800);
      });
    },
  });
  useEffect(() => {
    if (timeline.reducedMotion) timeline.pause();
  }, [timeline]);

  const values = LAB2_INPUTS[input];
  const n = values.length;
  const lomuto = useMemo(() => lomutoTrace(values, "last", false), [values]);
  const hoare = useMemo(() => hoareTrace(values), [values]);

  const step = timeline.currentStep;
  const lomutoFrame =
    lomuto.frames[Math.min(Math.max(step, 0), lomuto.frames.length - 1)];
  const shownEvents = Math.min(Math.max(step - 1, 0), hoare.events.length);
  const hoareFrame = shownEvents > 0 ? hoare.events[shownEvents - 1] : null;

  const coverageStage = step >= 10;
  const hoareJ = hoare.j;
  const hole = fault ? hoareJ : -1;
  const coverage = fault ? n - 1 : n;
  const leftSize = fault ? hoareJ : hoareJ + 1;
  const rightSize = n - hoareJ - 1;

  function reset() {
    rewind(timeline);
    setInput("mixed");
    setFault(false);
  }

  return (
    <Lab
      id="hoare-contract"
      title="实验二：Lomuto 与 Hoare 的返回契约对比"
      caption="先预测：两种划分返回同一个值吗？它们各自返回的索引，放进递归区间会发生什么？"
    >
      <div className="grid gap-3 sm:grid-cols-1">
        <Choice
          name="contract-input"
          label="输入样本（两路共享同一数组）"
          value={input}
          options={[
            ["mixed", "杂乱 · 4 1 8 3 9 2 7 6"],
            ["reversed", "逆序 · 9 7 5 3 8 6 4 2"],
            ["duplicates", "重复键 · 3 1 3 2 3 4 3 5"],
          ]}
          change={(v) => {
            rewind(timeline);
            setInput(v as Lab2Input);
          }}
        />
      </div>
      <Fault
        name="mixed-contract"
        active={fault}
        change={() => {
          rewind(timeline);
          setFault(!fault);
        }}
      >
        契约混用：把 Lomuto 的递归界 [p,q−1],[q+1,r] 套到 Hoare 返回值上
      </Fault>
      <svg
        viewBox="0 0 900 640"
        role="img"
        aria-label="CLRS 4e Chapter 7 Quicksort 专属 Lomuto 与 Hoare 划分对比实验。覆盖 Hoare partition、Hoare 划分、双指针、返回契约、递归区间、覆盖验证，展示同一输入上单向扫描与双指针收敛的轨迹差异、返回值语义差异、契约混用导致的覆盖空洞故障，并支持输入切换、故障注入、播放、暂停、单步、拖进度和重置。"
        className="mx-auto mt-2 block h-auto w-full"
      >
        <rect x="0" y="0" width="900" height="640" rx="14" fill={C.bg} />
        <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
          同输入 · 双方案：扫描轨迹与返回契约
        </text>
        <text x="30" y="60" fontSize="12" fill={C.secondary}>
          输入 {values.join(" ")} · 第 {Math.min(step + 1, 11)} / 11 帧
        </text>

        <text x="30" y="108" fontSize="13" fontWeight="700" fill={C.accent}>
          Lomuto · x = A[r] = {lomuto.pivot}（i、j 从左向右）
        </text>
        {lomutoFrame.a.map((v, k) => {
          const isPivot = k === n - 1 && step < 8;
          const isI =
            k === Math.max(lomutoFrame.i, 0) &&
            lomutoFrame.j !== null &&
            step < 8;
          const isJ = k === lomutoFrame.j && step < 8;
          return (
            <g key={`lom-${k}`}>
              <rect
                data-cell={k}
                x={geo(LAB2_CELL_X(k))}
                y="120"
                width={LAB2_CELL_W}
                height="56"
                rx="10"
                fill={isPivot ? C.accent : isI ? C.success : C.elevated}
                fillOpacity={isPivot || isI ? 0.14 : 1}
                stroke={
                  isJ
                    ? C.accent
                    : isPivot
                      ? C.accent
                      : isI
                        ? C.success
                        : C.border
                }
                strokeWidth={isJ || isI ? 2.5 : 1.5}
              />
              <text
                x={geo(LAB2_CELL_X(k) + LAB2_CELL_W / 2)}
                y="145"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.primary}
              >
                {v}
              </text>
              <text
                x={geo(LAB2_CELL_X(k) + LAB2_CELL_W / 2)}
                y="165"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {isPivot ? "x" : isJ ? "j" : isI ? "i" : ""}
              </text>
            </g>
          );
        })}
        <text x="30" y="200" fontSize="11" fill={C.secondary}>
          {step < 8
            ? lomutoFrame.note
            : `返回 q = ${lomuto.q}：主元已就位，q 两侧都不含主元`}
        </text>

        <text x="30" y="248" fontSize="13" fontWeight="700" fill={C.warning}>
          Hoare · x = A[p] = {hoare.pivot}（i、j 从两端向中间收敛）
        </text>
        {(hoareFrame?.a ?? values).map((v, k) => {
          const showPtr = hoareFrame && step >= 1 && step < 8;
          return (
            <g key={`hoa-${k}`}>
              <rect
                data-cell={k}
                x={geo(LAB2_CELL_X(k))}
                y="260"
                width={LAB2_CELL_W}
                height="56"
                rx="10"
                fill={C.elevated}
                stroke={
                  showPtr && (k === hoareFrame.i || k === hoareFrame.j)
                    ? C.warning
                    : C.border
                }
                strokeWidth={
                  showPtr && (k === hoareFrame.i || k === hoareFrame.j)
                    ? 2.5
                    : 1.5
                }
              />
              <text
                x={geo(LAB2_CELL_X(k) + LAB2_CELL_W / 2)}
                y="285"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.primary}
              >
                {v}
              </text>
              <text
                x={geo(LAB2_CELL_X(k) + LAB2_CELL_W / 2)}
                y="305"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {showPtr && k === hoareFrame.i
                  ? "i"
                  : showPtr && k === hoareFrame.j
                    ? "j"
                    : ""}
              </text>
            </g>
          );
        })}
        <text x="30" y="340" fontSize="11" fill={C.secondary}>
          {step < 1
            ? "两路共享同一数组；Hoare 用首元素作主元值，但主元值不移动到数组末端"
            : hoareFrame
              ? hoareFrame.type === "swap"
                ? `发现逆序对：交换 A[${hoareFrame.i}]↔A[${hoareFrame.j}]（第 ${shownEvents}/${hoare.events.length} 个事件）`
                : `指针交叉于 i=${hoareFrame.i}、j=${hoareFrame.j}：返回 j = ${hoare.j}`
              : ""}
          {step >= 1 && shownEvents >= hoare.events.length && step < 8
            ? " · Hoare 已收敛"
            : ""}
        </text>

        <rect
          x="30"
          y="360"
          width="410"
          height="120"
          rx="12"
          fill={C.elevated}
          stroke={C.border}
          strokeWidth="1.5"
        />
        <text x="52" y="388" fontSize="13" fontWeight="700" fill={C.accent}>
          Lomuto 契约
        </text>
        <text x="52" y="412" fontSize="12" fill={C.primary}>
          返回 q = {lomuto.q}（主元最终位置）
        </text>
        <text x="52" y="434" fontSize="11" fill={C.secondary}>
          递归 [p, q−1] 与 [q+1, r]，主元不再参与
        </text>
        <text x="52" y="458" fontSize="11" fill={C.secondary}>
          扫描一次、交换较多；归位后主元两侧即分区
        </text>

        <rect
          x="460"
          y="360"
          width="410"
          height="120"
          rx="12"
          fill={C.elevated}
          stroke={C.border}
          strokeWidth="1.5"
        />
        <text x="482" y="388" fontSize="13" fontWeight="700" fill={C.warning}>
          Hoare 契约
        </text>
        <text x="482" y="412" fontSize="12" fill={C.primary}>
          返回 j = {hoareJ}（分界，主元未必就位）
        </text>
        <text x="482" y="434" fontSize="11" fill={C.secondary}>
          递归 [p, j] 与 [j+1, r]，分界本身归入左段
        </text>
        <text x="482" y="458" fontSize="11" fill={C.secondary}>
          交换次数通常更少；相等键多时划分更均衡
        </text>

        <text x="30" y="512" fontSize="13" fontWeight="700" fill={C.primary}>
          递归区间接管的下标（覆盖验证）
        </text>
        {values.map((_, k) => {
          const isHole = coverageStage && k === hole;
          const covered = coverageStage && k !== hole;
          return (
            <g key={`cov-${k}`}>
              <rect
                data-coverage-cell={k}
                x={geo(LAB2_CELL_X(k))}
                y="526"
                width={LAB2_CELL_W}
                height="40"
                rx="8"
                fill={isHole ? C.danger : covered ? C.success : C.elevated}
                fillOpacity={isHole || covered ? 0.16 : 1}
                stroke={isHole ? C.danger : covered ? C.success : C.border}
                strokeWidth="1.5"
              />
              <text
                x={geo(LAB2_CELL_X(k) + LAB2_CELL_W / 2)}
                y="551"
                textAnchor="middle"
                fontSize="12"
                fill={isHole ? C.danger : C.primary}
              >
                {isHole ? "洞" : covered ? `${k}` : `${k}`}
              </text>
            </g>
          );
        })}
        <text
          x="30"
          y="596"
          fontSize="11"
          fill={coverageStage ? (fault ? C.danger : C.success) : C.secondary}
        >
          {coverageStage
            ? fault
              ? `契约混用：左界 [p, j−1] 与右界 [j+1, r] 漏掉下标 ${hole} —— 该元素永远不会被排序（覆盖 ${coverage}/${n}）`
              : `契约正确：左 [p, j]（${leftSize} 项）∪ 右 [j+1, r]（${rightSize} 项）= ${coverage}/${n} 全覆盖`
            : "推进到覆盖验证帧，检查递归界是否接管每个下标"}
        </text>
        <text x="846" y="596" textAnchor="end" fontSize="11" fill={C.secondary}>
          Hoare 交换 {hoare.swaps} 次 · Lomuto 交换 {lomuto.swaps} 次
        </text>
      </svg>
      <output
        data-readout="hoare-contract"
        data-input={input}
        data-fault={String(fault)}
        data-lomuto-q={lomuto.q}
        data-hoare-j={hoareJ}
        data-hoare-swaps={hoare.swaps}
        data-left-size={leftSize}
        data-right-size={rightSize}
        data-coverage={coverage}
        data-hole-index={hole}
        data-mismatch={String(fault)}
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        Lomuto 返回 q={lomuto.q}（交换 {lomuto.swaps} 次）；Hoare 返回 j=
        {hoareJ}（交换 {hoare.swaps} 次，左 {leftSize} 项 / 右 {rightSize}{" "}
        项），覆盖 {coverage}/{n}。
        {fault
          ? ` 契约混用漏掉下标 ${hole}：Hoare 的分界必须留在左段递归里。`
          : " 两种契约各自自洽，但不能互换。"}
      </output>
      <p className="mt-2 text-sm text-secondary">
        样本与轨迹均为本站独立构造。Hoare 采用含等值测试的通行实现（j 寻 ≤x、i
        寻 ≥x），与公开文献描述一致。
      </p>
      <Transport t={timeline} reset={reset} />
    </Lab>
  );
}

// ---------------------------------------------------------------- Lab 3

type Lab3Shape = "sorted" | "reversed" | "random" | "all-equal";
type Lab3Policy = "first" | "last" | "median3" | "random";

type TreeNode = {
  id: number;
  size: number;
  depth: number;
  parent: number;
  left: number | null;
  right: number | null;
  x: number;
  y: number;
  w: number;
};

function makeLab3Input(shape: Lab3Shape, n: number): number[] {
  if (shape === "sorted") return Array.from({ length: n }, (_, i) => i + 1);
  if (shape === "reversed") return Array.from({ length: n }, (_, i) => n - i);
  if (shape === "all-equal") return Array.from({ length: n }, () => 7);
  const a = Array.from({ length: n }, (_, i) => i + 1);
  const rng = mulberry32(SEED);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function pickPivot(
  a: readonly number[],
  p: number,
  r: number,
  policy: Lab3Policy,
  rng: () => number,
) {
  if (policy === "first") return p;
  if (policy === "median3") {
    const m = (p + r) >> 1;
    const trio = [
      { v: a[p], k: p },
      { v: a[m], k: m },
      { v: a[r], k: r },
    ].sort((x, y) => x.v - y.v);
    return trio[1].k;
  }
  if (policy === "random") return p + Math.floor(rng() * (r - p + 1));
  return r;
}

/** 确定性建树；与 body.py build_tree 同公式（子种子 SEED + 节点创建序）。 */
function buildLab3Tree(
  arr: readonly number[],
  policy: Lab3Policy,
  threeWay: boolean,
): TreeNode[] {
  const nodes: TreeNode[] = [];
  function rec(a: number[], depth: number, parent: number): number | null {
    const size = a.length;
    if (size === 0) return null;
    const id = nodes.length;
    nodes.push({
      id,
      size,
      depth,
      parent,
      left: null,
      right: null,
      x: 0,
      y: 0,
      w: 0,
    });
    if (size < 2) return id;
    const rng = mulberry32(SEED + id);
    const pi = pickPivot(a, 0, size - 1, policy, rng);
    const x = a[pi];
    let left: number[];
    let right: number[];
    if (threeWay) {
      left = a.filter((v) => v < x);
      right = a.filter((v) => v > x);
    } else {
      const lo = a.filter((v) => v <= x);
      lo.splice(lo.indexOf(x), 1);
      left = lo;
      right = a.filter((v) => v > x);
    }
    nodes[id].left = rec(left, depth + 1, id);
    nodes[id].right = rec(right, depth + 1, id);
    return id;
  }
  rec([...arr], 0, -1);

  // 布局：中序叶子槽位；宽度 ∝ 槽位跨度，x = 跨度中心。
  const UNIT = 26;
  const span = new Array<number>(nodes.length).fill(0);
  const start = new Array<number>(nodes.length).fill(0);
  let cursor = 0;
  function measure(id: number | null): { s: number; c: number } {
    if (id === null) return { s: 0, c: 0 };
    const node = nodes[id];
    if (node.size < 2 || (node.left === null && node.right === null)) {
      span[id] = 1;
      start[id] = cursor;
      cursor += 1;
      return { s: 1, c: start[id] };
    }
    const l = measure(node.left);
    const r = measure(node.right);
    span[id] = l.s + r.s;
    start[id] = l.c;
    return { s: span[id], c: start[id] };
  }
  measure(0);
  const maxDepth = Math.max(...nodes.map((n) => n.depth)) + 1;
  const levelH = Math.min(
    56,
    Math.max(18, Math.floor(430 / Math.max(maxDepth, 1))),
  );
  const x0 = 30;
  const y0 = 96;
  for (const node of nodes) {
    node.w = geo(Math.max(18, Math.min(150, span[node.id] * UNIT - 8)));
    node.x = geo(x0 + (start[node.id] + span[node.id] / 2) * UNIT);
    node.y = geo(y0 + node.depth * levelH);
  }
  return nodes;
}

export function Clrs4Chapter07QuicksortRecursionDepthLab() {
  const [n, setN] = useState(15);
  const [shape, setShape] = useState<Lab3Shape>("sorted");
  const [policy, setPolicy] = useState<Lab3Policy>("last");
  const [tail, setTail] = useState(true);
  const [fault, setFault] = useState(false);

  const configKey = `${n}|${shape}|${policy}|${String(!fault)}`;
  const tree = useMemo(
    () => buildLab3Tree(makeLab3Input(shape, n), policy, !fault),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configKey],
  );

  const maxDepth = Math.max(...tree.map((t) => t.depth)) + 1;
  const totalWork = tree.reduce((s, t) => s + Math.max(0, t.size - 1), 0);
  const byId = new Map(tree.map((t) => [t.id, t]));
  function smallerChain(id: number): number {
    const node = byId.get(id)!;
    if (node.size < 2) return 1;
    const lc = node.left === null ? 0 : byId.get(node.left)!.size;
    const rc = node.right === null ? 0 : byId.get(node.right)!.size;
    const smaller = Math.min(lc, rc);
    if (smaller === 0) return 1;
    const next = lc === smaller ? node.left : node.right;
    return next === null ? 1 : 1 + smallerChain(next);
  }
  const stackDepth = tail ? smallerChain(0) : maxDepth;
  const balanceDepth = Math.ceil(Math.log2(Math.max(2, n)));
  const maxWork = (n * (n - 1)) / 2;

  const stepLabels = useMemo(
    () => [
      "策略与输入",
      ...Array.from({ length: maxDepth }, (_, i) => `第${i + 1}层`),
      "读数对照",
    ],
    [maxDepth],
  );
  const timeline = useDomainTimeline(stepLabels);
  const step = timeline.currentStep;
  const visibleDepth = step <= 0 ? -1 : step > maxDepth ? maxDepth : step - 1;

  const shownNodes = tree.filter((t) => t.depth <= visibleDepth);
  const shownIds = new Set(shownNodes.map((t) => t.id));

  function reset() {
    rewind(timeline);
    setN(15);
    setShape("sorted");
    setPolicy("last");
    setTail(true);
    setFault(false);
  }

  return (
    <Lab
      id="recursion-tree-depth"
      title="实验三：主元策略决定递归树深度"
      caption="先预测：有序输入配末位主元，树的形状是矮胖还是细长？切换主元策略，看深度、工作量与栈深三个读数如何联动。"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Choice
          name="tree-size"
          label="数组规模 n"
          value={String(n)}
          options={[
            ["7", "n = 7"],
            ["15", "n = 15"],
            ["31", "n = 31"],
          ]}
          change={(v) => {
            rewind(timeline);
            setN(Number(v));
          }}
        />
        <Choice
          name="tree-shape"
          label="输入形状"
          value={shape}
          options={[
            ["sorted", "升序 1..n"],
            ["reversed", "逆序 n..1"],
            ["random", "固定种子随机排列"],
            ["all-equal", "全部相等"],
          ]}
          change={(v) => {
            rewind(timeline);
            setShape(v as Lab3Shape);
          }}
        />
        <Choice
          name="tree-policy"
          label="主元策略"
          value={policy}
          options={[
            ["last", "末元素"],
            ["first", "首元素"],
            ["median3", "三点中位数"],
            ["random", "随机下标（种子 7）"],
          ]}
          change={(v) => {
            rewind(timeline);
            setPolicy(v as Lab3Policy);
          }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          data-param="tail-recursion"
          data-control="tail-recursion"
          aria-pressed={tail}
          onClick={() => {
            rewind(timeline);
            setTail(!tail);
          }}
          className={`${control} ${tail ? "border-accent text-accent" : ""}`}
        >
          尾递归优化（只递归较小一侧）：{tail ? "开" : "关"}
        </button>
      </div>
      <Fault
        name="two-way-on-ties"
        active={fault}
        change={() => {
          rewind(timeline);
          setFault(!fault);
        }}
      >
        用二路划分处理全等键（放弃三路划分的等值归位）
      </Fault>
      <svg
        viewBox="0 0 900 620"
        role="img"
        aria-label="CLRS 4e Chapter 7 Quicksort 专属递归树深度实验。覆盖 quicksort 性能、划分均衡、递归树、recursion tree、栈深、尾递归、随机化快速排序，展示主元策略如何改变子问题尺寸树的形状、递归深度、总工作量与调用栈深度，以及全等键下二路划分的连锁退化故障，并支持规模、输入、策略、故障注入、播放、暂停、单步、拖进度和重置。"
        className="mx-auto mt-2 block h-auto w-full"
      >
        <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
        <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
          递归树：{shape} · {policy} 主元 · n = {n}
          {fault ? " · 二路划分" : " · 三路划分"}
        </text>
        <text x="30" y="60" fontSize="12" fill={C.secondary}>
          节点宽 ∝ 子问题尺寸 · 逐层生长 · 均衡参照深度 ⌈lg n⌉ = {balanceDepth}
        </text>

        {tree.map((node) => {
          if (!shownIds.has(node.id)) return null;
          const parent = node.parent >= 0 ? byId.get(node.parent) : null;
          return (
            <g key={`tree-node-${node.id}`}>
              {parent && shownIds.has(parent.id) && (
                <line
                  x1={parent.x}
                  y1={geo(parent.y + 11)}
                  x2={node.x}
                  y2={geo(node.y - 11)}
                  stroke={C.border}
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}
        {tree.map((node) => {
          if (!shownIds.has(node.id)) return null;
          const skewed = maxDepth > balanceDepth + 1 && node.size >= 2;
          return (
            <g key={`tree-box-${node.id}`}>
              <rect
                data-node={node.id}
                data-node-size={node.size}
                data-node-depth={node.depth}
                x={geo(node.x - node.w / 2)}
                y={geo(node.y - 11)}
                width={node.w}
                height="22"
                rx="6"
                fill={skewed ? C.danger : C.accent}
                fillOpacity={node.size < 2 ? 0.3 : skewed ? 0.12 : 0.14}
                stroke={skewed ? C.danger : node.size < 2 ? C.border : C.accent}
                strokeWidth="1.5"
              />
              {node.w >= 20 && (
                <text
                  x={node.x}
                  y={geo(node.y + 4)}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={skewed ? C.danger : C.primary}
                >
                  {node.size}
                </text>
              )}
            </g>
          );
        })}

        <line
          x1="24"
          x2="24"
          y1="96"
          y2={geo(
            96 +
              (balanceDepth - 1) *
                Math.min(
                  56,
                  Math.max(18, Math.floor(430 / Math.max(maxDepth, 1))),
                ),
          )}
          stroke={C.success}
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="34" y="92" fontSize="11" fill={C.success}>
          ⌈lg n⌉ 均衡参照
        </text>

        <rect
          x="640"
          y="80"
          width="240"
          height="470"
          rx="12"
          fill={C.elevated}
          stroke={C.border}
          strokeWidth="1.5"
        />
        <text x="660" y="108" fontSize="13" fontWeight="700" fill={C.primary}>
          三个读数
        </text>

        <text x="660" y="140" fontSize="11" fill={C.secondary}>
          递归深度
        </text>
        <rect x="660" y="148" width="180" height="14" rx="7" fill={C.border} />
        <rect
          x="660"
          y="148"
          width={geo((180 * maxDepth) / Math.max(n, 1))}
          height="14"
          rx="7"
          fill={C.accent}
        />
        <text x="852" y="160" fontSize="12" fontWeight="700" fill={C.primary}>
          {maxDepth}
        </text>

        <text x="660" y="196" fontSize="11" fill={C.secondary}>
          总工作量 Σ(size−1)
        </text>
        <rect x="660" y="204" width="180" height="14" rx="7" fill={C.border} />
        <rect
          x="660"
          y="204"
          width={geo((180 * totalWork) / Math.max(maxWork, 1))}
          height="14"
          rx="7"
          fill={C.warning}
        />
        <text x="852" y="216" fontSize="12" fontWeight="700" fill={C.primary}>
          {totalWork}
        </text>

        <text x="660" y="252" fontSize="11" fill={C.secondary}>
          调用栈深度{tail ? "（尾递归）" : "（朴素）"}
        </text>
        <rect x="660" y="260" width="180" height="14" rx="7" fill={C.border} />
        <rect
          x="660"
          y="260"
          width={geo((180 * stackDepth) / Math.max(n, 1))}
          height="14"
          rx="7"
          fill={stackDepth > balanceDepth + 1 ? C.danger : C.success}
        />
        <text x="852" y="272" fontSize="12" fontWeight="700" fill={C.primary}>
          {stackDepth}
        </text>

        <text x="660" y="312" fontSize="11" fill={C.secondary}>
          划分节点数
        </text>
        <text
          x="852"
          y="312"
          textAnchor="end"
          fontSize="12"
          fontWeight="700"
          fill={C.primary}
        >
          {tree.length}
        </text>
        <text x="660" y="340" fontSize="11" fill={C.secondary}>
          最坏工作量 n(n−1)/2
        </text>
        <text x="852" y="340" textAnchor="end" fontSize="12" fill={C.secondary}>
          {maxWork}
        </text>

        <text x="660" y="386" fontSize="12" fontWeight="700" fill={C.primary}>
          {maxDepth <= balanceDepth + 1 ? "接近均衡" : "深度超标"}
        </text>
        <text x="660" y="410" fontSize="11" fill={C.secondary}>
          {maxDepth <= balanceDepth + 1
            ? `深度 ${maxDepth} ≈ ⌈lg n⌉+1，工作量 ${totalWork} 为 Θ(n lg n) 量级`
            : `深度 ${maxDepth} ≫ ⌈lg n⌉ = ${balanceDepth}，工作量 ${totalWork} 接近最坏 ${maxWork}`}
        </text>
        <text x="660" y="438" fontSize="11" fill={C.secondary}>
          {tail
            ? `尾递归只压栈不省时：栈深 ${stackDepth}，时间仍由划分序列决定`
            : `朴素递归栈深 = 递归深度 ${stackDepth}；打开尾递归开关对比`}
        </text>
        <text x="660" y="466" fontSize="11" fill={C.secondary}>
          {shape === "all-equal" && fault
            ? "全等键 + 二路划分：每趟只归位主元，连锁退化成链"
            : shape === "all-equal"
              ? "全等键 + 三路划分：一趟归位全部等值块"
              : "随机化降低持续坏划分概率，但不删除最坏路径"}
        </text>
      </svg>
      <output
        data-readout="recursion-tree"
        data-n={n}
        data-shape={shape}
        data-policy={policy}
        data-tail-recursion={String(tail)}
        data-fault={String(fault)}
        data-max-depth={maxDepth}
        data-total-work={totalWork}
        data-stack-depth={stackDepth}
        data-nodes={tree.length}
        data-balance-depth={balanceDepth}
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        n={n}（{shape}，{policy} 主元{fault ? "，二路划分" : ""}）：递归深度{" "}
        {maxDepth}，总工作量 {totalWork}，调用栈深度 {stackDepth}（
        {tail ? "尾递归" : "朴素"}），划分节点 {tree.length}； 均衡参照 ⌈lg n⌉ ={" "}
        {balanceDepth}。
        {shape === "all-equal" && fault
          ? " 故障生效：二路划分把全等键全部塞进左段，树退化为链。"
          : shape === "all-equal"
            ? " 三路划分让等值块一次归位。"
            : ""}
      </output>
      <p className="mt-2 text-sm text-secondary">
        全部轨迹由固定种子确定性生成；随机排列与随机主元的每次结果都可由 body.py
        复算。
      </p>
      <Transport t={timeline} reset={reset} />
    </Lab>
  );
}
