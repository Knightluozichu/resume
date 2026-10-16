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

/** 绘制坐标统一出口：finite 守卫 + 9 位定点，数学结果本身不取整。 */
function fx(n: number): number {
  return Number.isFinite(n) ? Number(n.toFixed(9)) : 0;
}

/** 确定性千分位格式，避免 toLocaleString 的 SSR/客户端区域差异。 */
function fmt(n: number): string {
  const neg = n < 0 ? "-" : "";
  const s = Math.abs(Math.trunc(n)).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return neg + out;
}

/* ---------- 共享 oracle：递归树逐层账本 ---------- */

const TREE_N = 16;

type TreeLevel = {
  index: number;
  size: number;
  count: number;
  work: number;
};

function treeLevels(a: number, b: number, d: number): TreeLevel[] {
  const levels: TreeLevel[] = [];
  let size = TREE_N;
  let i = 0;
  while (size > 1 && i < 8) {
    levels.push({
      index: i,
      size,
      count: Math.pow(a, i),
      work: Math.pow(a, i) * Math.pow(size, d),
    });
    size /= b;
    i += 1;
  }
  return levels;
}

function treeTotals(a: number, b: number, d: number, rootOnly: boolean) {
  const levels = treeLevels(a, b, d);
  const leafCount = Math.pow(a, levels.length);
  const total =
    levels.reduce(
      (sum, level) => sum + (rootOnly && level.index > 0 ? 0 : level.work),
      0,
    ) + leafCount;
  return { levels, leafCount, depth: levels.length, total };
}

function masterCase(a: number, b: number, d: number) {
  const critical = Math.log(a) / Math.log(b);
  if (d > critical) return { case: "case1", growth: `Θ(n^${d})`, critical };
  if (d === critical)
    return { case: "case2", growth: `Θ(n^${d} log n)`, critical };
  return { case: "case3", growth: `Θ(n^${logb(a, b)})`, critical };
}

function logb(a: number, b: number): string {
  const v = Math.log(a) / Math.log(b);
  return String(fx(Math.round(v * 1000) / 1000));
}

/* ---------- Lab 1：递归树逐层工作量账本 ---------- */

const TREE_STEPS: readonly TeachingStep[] = [
  {
    label: "levels",
    caption: "递归树逐层展开：第 i 层有 a^i 个规模为 n/b^i 的子问题",
  },
  { label: "ledger", caption: "每层账本：层内代价 a^i·(n/b^i)^d 逐条累计" },
  { label: "verdict", caption: "总量对照主方法情形，检查故障账本的塌缩" },
];

const TREE_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  TREE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const TREE_CASE_COPY: Record<string, string> = {
  case1: "情形 1：toll 阶 d 大于临界指数，总量由根层 toll 主导",
  case2: "情形 2：toll 阶 d 等于临界指数，总量 = Θ(n^d log n)",
  case3: "情形 3：toll 阶 d 小于临界指数，总量由叶子层主导",
};

const MAX_DRAWN_NODES = 48;

export function Clrs4Chapter04DivideAndConquerLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [a, setA] = useState(2);
  const [b, setB] = useState(2);
  const [d, setD] = useState(1);
  const [rootOnly, setRootOnly] = useState(false);

  const timeline = useTeachingTimeline({
    steps: TREE_STEPS,
    build: (tl) => {
      TREE_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const { levels, leafCount, depth, total } = treeTotals(a, b, d, rootOnly);
  const verdict = masterCase(a, b, d);
  const maxWork = Math.max(1, ...levels.map((level) => level.work));
  const currentStep =
    timeline.currentStep >= TREE_STEPS.length
      ? TREE_STEPS.length - 1
      : timeline.currentStep;

  function applyParams(next: { a?: number; b?: number; d?: number }) {
    if (next.a !== undefined) setA(next.a);
    if (next.b !== undefined) setB(next.b);
    if (next.d !== undefined) setD(next.d);
    timeline.seek(0);
  }

  function reset() {
    setA(2);
    setB(2);
    setD(1);
    setRootOnly(false);
    timeline.seek(0);
  }

  const rowYs = levels.map((_, i) => 120 + i * 108);

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="recursion-tree-level-work-ledger"
      data-readout="recursion-tree-ledger"
      data-total-work={fx(total)}
      data-level-count={depth}
      data-leaf-count={leafCount}
      data-master-case={verdict.case}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 4 · Divide-and-Conquer
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              递归树逐层账本：T(n) = aT(n/b) + n^d
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：把分支数 a 从 2 调到
              3，哪一层的账条最长？总账本是变大还是变小？切换参数后推进时间线，逐层核对树形几何与数值轨迹。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              分支数 a
            </span>
            <select
              data-param="branch-factor"
              aria-label="选择递推式分支数 a"
              value={a}
              onChange={(event) =>
                applyParams({ a: Number(event.target.value) })
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={2}>a = 2（merge sort 型）</option>
              <option value={3}>a = 3（三分支）</option>
              <option value={4}>a = 4（四分支）</option>
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              缩小因子 b
            </span>
            <select
              data-param="shrink-factor"
              aria-label="选择子问题缩小因子 b"
              value={b}
              onChange={(event) =>
                applyParams({ b: Number(event.target.value) })
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={2}>b = 2（对半切）</option>
              <option value={3}>b = 3（切三份）</option>
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              层内 toll 阶 d（n^d）
            </span>
            <select
              data-param="toll-exponent"
              aria-label="选择层内代价阶 d"
              value={d}
              onChange={(event) =>
                applyParams({ d: Number(event.target.value) })
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={0}>d = 0（每层常数 toll）</option>
              <option value={1}>d = 1（每层线性 toll）</option>
              <option value={2}>d = 2（每层平方 toll）</option>
            </select>
          </label>
        </div>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="CLRS 4e Chapter 4 分治专属递归树实验。覆盖 divide-and-conquer、分治、递归树法、recursion-tree、主方法、master method，展示 T(n)=aT(n/b)+n^d 的逐层节点几何、每层工作量账条、累计总量与主方法情形判定，支持播放、暂停、单步、拖进度、参数切换、故障注入和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch04-tree-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
            T(n) = {a}T(n/{b}) + n^{d}，n = {TREE_N}
          </text>
          <text x="30" y="60" fontSize="12" fill={C.secondary}>
            levels → ledger → verdict · 临界指数 log_{b}(a) ≈{" "}
            {verdict.critical.toFixed(3)}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            <text x="30" y="96" fontSize="13" fontWeight="700" fill={C.accent}>
              逐层展开：第 i 层 a^i 个、规模 n/b^i
            </text>
            {levels.map((level, li) => {
              const y = rowYs[li] ?? 120;
              const drawNodes = level.count <= MAX_DRAWN_NODES;
              const bandW = 400;
              const nodeW = drawNodes
                ? Math.min(30, bandW / level.count - 4)
                : 0;
              const span = drawNodes ? level.count * (nodeW + 4) - 4 : 0;
              const startX = 40 + (bandW - span) / 2;
              return (
                <g key={`tree-level-${level.index}`}>
                  <text x="30" y={y + 34} fontSize="11" fill={C.secondary}>
                    i={level.index} · {level.count} 个 × 规模{" "}
                    {fx(Math.round(level.size * 100) / 100)}
                  </text>
                  {drawNodes ? (
                    Array.from({ length: level.count }, (_, k) => {
                      const x = fx(startX + k * (nodeW + 4));
                      return (
                        <g key={`node-${level.index}-${k}`}>
                          <rect
                            x={x}
                            y={fx(y)}
                            width={fx(nodeW)}
                            height="22"
                            rx="5"
                            fill={C.elevated}
                            stroke={C.accent}
                            strokeWidth="1.2"
                          />
                          {li > 0 && (
                            <line
                              x1={fx(x + nodeW / 2)}
                              y1={fx(y - 20)}
                              x2={fx(x + nodeW / 2)}
                              y2={fx(y)}
                              stroke={C.border}
                              strokeWidth="1"
                            />
                          )}
                        </g>
                      );
                    })
                  ) : (
                    <g>
                      <rect
                        x="40"
                        y={fx(y)}
                        width="400"
                        height="22"
                        rx="5"
                        fill={C.warning}
                        fillOpacity="0.12"
                        stroke={C.warning}
                        strokeWidth="1.2"
                        strokeDasharray="5 4"
                      />
                      <text
                        x="240"
                        y={fx(y + 16)}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.warning}
                      >
                        a^{level.index} = {fmt(level.count)} 个子问题，聚合显示
                      </text>
                      {li > 0 && (
                        <line
                          x1="240"
                          y1={fx(y - 20)}
                          x2="240"
                          y2={fx(y)}
                          stroke={C.border}
                          strokeWidth="1"
                        />
                      )}
                    </g>
                  )}
                </g>
              );
            })}
            <text
              x="30"
              y={fx((rowYs[depth - 1] ?? 120) + 66)}
              fontSize="11"
              fill={C.success}
            >
              叶子：{fmt(leafCount)} 个基准 T(1)，各计 1
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <text x="500" y="96" fontSize="13" fontWeight="700" fill={C.accent}>
              每层账条：a^i·(n/b^i)^{d}
            </text>
            {levels.map((level, li) => {
              const y = rowYs[li] ?? 120;
              const work = rootOnly && level.index > 0 ? 0 : level.work;
              const barW = fx(300 * (work / maxWork));
              const tone = work === 0 ? C.border : C.accent;
              return (
                <g key={`ledger-${level.index}`}>
                  <rect
                    x="500"
                    y={fx(y)}
                    width={300}
                    height="22"
                    rx="5"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1"
                  />
                  <rect
                    x="500"
                    y={fx(y)}
                    width={barW}
                    height="22"
                    rx="5"
                    fill={tone}
                    fillOpacity="0.28"
                    stroke={tone}
                    strokeWidth="1.2"
                  />
                  <text
                    x="810"
                    y={fx(y + 16)}
                    fontSize="11"
                    fill={work === 0 ? C.secondary : C.primary}
                  >
                    {fmt(fx(Math.round(work * 100) / 100))}
                  </text>
                </g>
              );
            })}
            <rect
              x="500"
              y={fx((rowYs[depth - 1] ?? 120) + 44)}
              width="300"
              height="22"
              rx="5"
              fill={C.success}
              fillOpacity="0.12"
              stroke={C.success}
              strokeWidth="1.2"
            />
            <text
              x="510"
              y={fx((rowYs[depth - 1] ?? 120) + 60)}
              fontSize="11"
              fill={C.success}
            >
              叶子账：+ {fmt(leafCount)}（{fmt(leafCount)} × T(1)）
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="30"
              y="540"
              width="840"
              height="58"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="564"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              总账本：{fmt(fx(Math.round(total * 100) / 100))}（逐层和 + 叶子）
            </text>
            <text x="52" y="586" fontSize="11" fill={C.secondary}>
              {TREE_CASE_COPY[verdict.case]} · 主方法结论 {verdict.growth}
            </text>
            <text
              x="858"
              y="564"
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={rootOnly ? C.danger : C.success}
            >
              {rootOnly
                ? "故障账本：只记根层 toll，总量塌缩"
                : "正确账本：每层 toll 都记账"}
            </text>
            <text
              x="858"
              y="586"
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              {rootOnly
                ? "对照灰色正确值，观察少了哪些层"
                : `当前步骤：${TREE_STEPS[currentStep]?.label ?? "levels"}`}
            </text>
          </g>
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-fault="toll-only-at-root"
            aria-pressed={rootOnly}
            onClick={() => {
              setRootOnly((prev) => !prev);
              timeline.seek(0);
            }}
            className={`min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              rootOnly
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            注入故障：只把 n^{d} 记在根层
          </button>
          <span className="text-xs leading-5 text-secondary">
            现象：递归树看起来一样，总账本立刻塌缩 → 原因：每层都有
            toll，只记根层等于漏掉 log 因子 → 修法：逐层求和，不凭深度猜总量。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={TREE_LABEL_TEXT}
          caption="先预测 a 调大后哪条账条最长，再推进时间线核对逐层账本和主方法判定。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置递归树逐层账本实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        递归树法把递推式翻译成一张逐层账本：层数由 b 决定，每层工作量由 a 与
        toll 阶 d 决定，总量是逐层求和而不是“深度乘常数”。
      </figcaption>
    </figure>
  );
}

/* ---------- Lab 2：代入法归纳残差阶梯 ---------- */

const SUB_STEPS: readonly TeachingStep[] = [
  { label: "hypothesis", caption: "写出归纳假设 T(m) ≤ c·m^k 与要证明的目标" },
  { label: "expand", caption: "代入递推式并展开 a·c(n/2)^k + n" },
  { label: "residual", caption: "看归一残差 r 的符号：非负才可通过" },
];

const SUB_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  SUB_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function substitutionResidual(
  a: number,
  k: number,
  c: number,
  dropToll: boolean,
  n: number,
) {
  const factor = 1 - a / Math.pow(2, k);
  const r = c * factor * Math.pow(n, k - 1) - (dropToll ? 0 : 1);
  return fx(r);
}

function substitutionHint(a: number, k: number): string {
  if (k === 1) return "提示：临界情形，真解带 log 因子——改猜 T(n) ≤ c·n log n";
  if (a === 4 && k === 2)
    return "提示：边界被反推——改猜强化假设 T(n) ≤ c·n² − d·n（要求 d ≥ 1）";
  if (k > 1) return "提示：可通过但未必紧确，用主方法核对真解增长率";
  return "提示：尝试更大的猜测阶 k";
}

export function Clrs4Chapter04SubstitutionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [a, setA] = useState(2);
  const [k, setK] = useState(2);
  const [c, setC] = useState(1);
  const [dropToll, setDropToll] = useState(false);

  const timeline = useTeachingTimeline({
    steps: SUB_STEPS,
    build: (tl) => {
      SUB_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const N = 16;
  const rCorrect = substitutionResidual(a, k, c, false, N);
  const rShown = substitutionResidual(a, k, c, dropToll, N);
  const pass = rCorrect >= 0;
  const shownPass = rShown >= 0;
  const factorPct = fx((a / Math.pow(2, k)) * 100);
  const barW = fx(Math.min(320, Math.abs(rCorrect) * 40 + 40));
  const barWShown = fx(Math.min(320, Math.abs(rShown) * 40 + 40));

  function reset() {
    setA(2);
    setK(2);
    setC(1);
    setDropToll(false);
    timeline.seek(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="substitution-induction-slack-ladder"
      data-readout="substitution-slack-ladder"
      data-residual-coefficient={rCorrect}
      data-verdict={dropToll ? "fault-pass" : pass ? "pass" : "fail"}
      data-hint={pass ? "none" : substitutionHint(a, k)}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 4 · Substitution Method
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              代入法残差阶梯：T(n) = {a}T(n/2) + n，猜 T(n) ≤ c·n^k
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：保持 a={a}，把猜测阶 k 从 {k}{" "}
              调小一档，残差条会变绿还是变红？先写下预测，再切换参数看归纳一步的真实结果。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              分支数 a
            </span>
            <select
              data-param="branch-factor"
              aria-label="选择递推式分支数 a"
              value={a}
              onChange={(event) => {
                setA(Number(event.target.value));
                timeline.seek(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={2}>a = 2</option>
              <option value={3}>a = 3</option>
              <option value={4}>a = 4</option>
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              猜测阶 k
            </span>
            <select
              data-param="guess-exponent"
              aria-label="选择猜测的多项式阶 k"
              value={k}
              onChange={(event) => {
                setK(Number(event.target.value));
                timeline.seek(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={1}>k = 1（猜线性）</option>
              <option value={2}>k = 2（猜平方）</option>
              <option value={3}>k = 3（猜立方）</option>
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              常数 c
            </span>
            <select
              data-param="guess-constant"
              aria-label="选择归纳常数 c"
              value={c}
              onChange={(event) => {
                setC(Number(event.target.value));
                timeline.seek(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={1}>c = 1</option>
              <option value={2}>c = 2</option>
              <option value={4}>c = 4</option>
            </select>
          </label>
        </div>

        <svg
          viewBox="0 0 900 560"
          role="img"
          aria-label="CLRS 4e Chapter 4 代入法专属实验。覆盖 substitution method、代入法、solving recurrences、解递推式，展示对 T(n)=aT(n/2)+n 猜测 T(n)≤cn^k 的归纳展开、归一残差系数条、通过与失败判定和强化假设提示，支持播放、暂停、单步、拖进度、参数切换、丢弃 toll 项故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="560" rx="14" fill={C.bg} />
          <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
            归纳一步：T(n) ≤ {a}·c·(n/2)^{k} +{" "}
            {dropToll ? "0（已丢弃 toll）" : "n"}
          </text>
          <text x="30" y="60" fontSize="12" fill={C.secondary}>
            hypothesis → expand → residual · 系数 a/2^k = {factorPct}%
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="84"
              width="260"
              height="120"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text x="52" y="112" fontSize="13" fontWeight="700" fill={C.accent}>
              归纳假设
            </text>
            <text x="52" y="140" fontSize="12" fill={C.primary}>
              对所有 m &lt; n：T(m) ≤ c·m^{k}
            </text>
            <text x="52" y="164" fontSize="11" fill={C.secondary}>
              目标：T(n) ≤ c·n^{k}
            </text>
            <text x="52" y="188" fontSize="11" fill={C.secondary}>
              初值 n &lt; n0 单独校验
            </text>

            <rect
              x="320"
              y="84"
              width="260"
              height="120"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="342"
              y="112"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              代入展开
            </text>
            <text x="342" y="140" fontSize="12" fill={C.primary}>
              T(n) ≤ c·n^{k}·({a}/2^{k}) + n
            </text>
            <text x="342" y="164" fontSize="11" fill={C.secondary}>
              提取 c·n^{k}：需要余量吸收 +n
            </text>
            <text x="342" y="188" fontSize="11" fill={C.secondary}>
              a/2^k = {fx(Math.round((a / Math.pow(2, k)) * 1000) / 1000)}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="610"
              y="84"
              width="260"
              height="120"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="632"
              y="112"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              归一残差（按 n 除）
            </text>
            <text x="632" y="140" fontSize="12" fill={C.primary}>
              r = c(1 − {a}/2^{k})·n^{k === 1 ? "0" : `k−1`} − 1
            </text>
            <text x="632" y="164" fontSize="11" fill={C.secondary}>
              n = {N} 时 r = {rCorrect}
            </text>
            <text
              x="632"
              y="188"
              fontSize="11"
              fill={pass ? C.success : C.danger}
            >
              r ≥ 0 假设才可通过，与 c 的大小无关时尤其要小心
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <text
              x="30"
              y="248"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              残差阶梯（n = {N}）
            </text>

            <rect
              x="30"
              y="266"
              width="840"
              height="64"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="292"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              正确残差 r = {rCorrect}
            </text>
            <rect
              x="52"
              y="302"
              width={barW}
              height="16"
              rx="5"
              fill={pass ? C.success : C.danger}
              fillOpacity="0.35"
              stroke={pass ? C.success : C.danger}
              strokeWidth="1.2"
            />
            <text
              x={fx(60 + barW)}
              y={fx(315)}
              fontSize="11"
              fill={pass ? C.success : C.danger}
            >
              {pass ? "可通过（取 n ≥ n0 并校初值）" : "被反推：假设不成立"}
            </text>

            <rect
              x="30"
              y="346"
              width="840"
              height="64"
              rx="12"
              fill={dropToll ? C.warning : C.elevated}
              fillOpacity={dropToll ? 0.08 : 1}
              stroke={dropToll ? C.warning : C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="372"
              fontSize="12"
              fontWeight="700"
              fill={dropToll ? C.warning : C.secondary}
            >
              {dropToll
                ? "故障残差（归纳时丢弃 +n）r′ = " + rShown
                : "故障开关关闭：残差含 −1 的 toll 项"}
            </text>
            <rect
              x="52"
              y="382"
              width={dropToll ? barWShown : barW}
              height="16"
              rx="5"
              fill={dropToll ? C.warning : C.border}
              fillOpacity="0.35"
              stroke={dropToll ? C.warning : C.border}
              strokeWidth="1.2"
            />
            <text
              x={fx(60 + (dropToll ? barWShown : barW))}
              y={fx(395)}
              fontSize="11"
              fill={dropToll ? C.warning : C.secondary}
            >
              {dropToll
                ? shownPass
                  ? "误判为通过——假证明"
                  : "仍失败"
                : "对照行：同一参数下的真实残差"}
            </text>

            <rect
              x="30"
              y="430"
              width="840"
              height="96"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="458"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              判定与出口
            </text>
            <text
              x="52"
              y="482"
              fontSize="12"
              fill={pass ? C.success : C.danger}
            >
              {dropToll
                ? "故障模式：丢掉 toll 后一切假设都看似通过——丢项是代入法最常见的假证明来源"
                : pass
                  ? "假设 T(n) ≤ c·n^" + k + " 通过归纳一步（别忘了初值校验）"
                  : substitutionHint(a, k)}
            </text>
            <text x="52" y="506" fontSize="11" fill={C.secondary}>
              边界样本：a=2,k=1 必败（真解 Θ(n log n)）；a=4,k=2 边界必败（改猜
              cn² − dn）
            </text>
          </g>
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-fault="drop-toll-in-induction"
            aria-pressed={dropToll}
            onClick={() => {
              setDropToll((prev) => !prev);
              timeline.seek(0);
            }}
            className={`min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              dropToll
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            注入故障：归纳展开时丢弃 +n
          </button>
          <span className="text-xs leading-5 text-secondary">
            现象：残差条变绿 → 原因：toll 项被丢掉后任何猜测都“成立” →
            修法：展开必须完整保留递推式的非递归部分。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={SUB_LABEL_TEXT}
          caption="先预测 k 调小一档时残差符号，再推进时间线核对归纳展开与残差判定。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置代入法残差阶梯实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        代入法把“猜一个上界”变成可检验的代数不等式：残差非负只是必要条件，临界情形要靠
        log 因子或强化假设（减去低阶项）补位。
      </figcaption>
    </figure>
  );
}

/* ---------- Lab 3：Strassen 块乘积计数与交叉点 ---------- */

const STRASSEN_STEPS: readonly TeachingStep[] = [
  {
    label: "definition",
    caption: "计数递推：8 乘积 vs 7 乘积，加法和乘法分开记账",
  },
  {
    label: "bars",
    caption: "双柱账本：柱高 = log2(次数+1)，数值标注为真实计数",
  },
  { label: "crossover", caption: "交叉点：渐近赢家在小规模可能落后" },
];

const STRASSEN_LABEL_TEXT: Readonly<Record<string, string>> =
  Object.fromEntries(
    STRASSEN_STEPS.map((step) => [step.label, step.caption ?? step.label]),
  );

function strassenCounts(n: number) {
  // mults(1)=1、adds(1)=0；mults(n)=7·mults(n/2)，adds(n)=7·adds(n/2)+18·(n/2)²。
  // 展开得 adds(n)=6·(7^{log2 n} − n²)。
  let mults = 1;
  let adds = 0;
  let size = 1;
  while (size < n) {
    adds = 7 * adds + 18 * size * size;
    mults *= 7;
    size *= 2;
  }
  return { mults, adds };
}

function classicCounts(n: number) {
  return { mults: Math.pow(n, 3), adds: Math.pow(n, 3) - Math.pow(n, 2) };
}

/** 在 2 的幂上扫描总账本交叉点：返回 Strassen 总操作数首次更小的 n。 */
function scanCrossover(): number {
  let size = 2;
  while (size <= 1048576) {
    const c = classicCounts(size);
    const s = strassenCounts(size);
    if (s.mults + s.adds < c.mults + c.adds) return size;
    size *= 2;
  }
  return -1;
}

const CROSSOVER_N = scanCrossover();

const LOG2_7 = Math.log(7) / Math.log(2);

export function Clrs4Chapter04StrassenLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [n, setN] = useState(16);
  const [ignoreAdds, setIgnoreAdds] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STRASSEN_STEPS,
    build: (tl) => {
      STRASSEN_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const classic = classicCounts(n);
  const strassen = strassenCounts(n);
  const totalClassic = classic.mults + classic.adds;
  const totalStrassen = strassen.mults + strassen.adds;
  const maxLog = Math.max(
    Math.log2(totalClassic + 1),
    Math.log2(totalStrassen + 1),
    1,
  );
  const barH = (count: number) => fx(260 * (Math.log2(count + 1) / maxLog));
  const strassenWinsTotal = totalStrassen < totalClassic;
  const strassenWinsMult = strassen.mults < classic.mults;

  function reset() {
    setN(16);
    setIgnoreAdds(false);
    timeline.seek(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="block-product-count-crossover"
      data-readout="strassen-crossover"
      data-mults-classic={classic.mults}
      data-mults-strassen={strassen.mults}
      data-total-classic={totalClassic}
      data-total-strassen={totalStrassen}
      data-crossover={strassenWinsTotal ? "strassen" : "classic"}
      data-crossover-estimate={CROSSOVER_N}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 4 · Strassen Matrix Multiplication
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              块乘积计数账本：n = {n}，8 个乘积 vs Strassen 的 7 个
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：把 n 一路调到 64，渐近指数更低的 Strassen
              在“乘法+加法总账本”上会反超吗？先写下预测，再改参数看两根总柱的相对高度。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              矩阵规模 n（2 的幂）
            </span>
            <select
              data-param="matrix-size"
              aria-label="选择矩阵规模 n"
              value={n}
              onChange={(event) => {
                setN(Number(event.target.value));
                timeline.seek(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value={8}>n = 8</option>
              <option value={16}>n = 16</option>
              <option value={32}>n = 32</option>
              <option value={64}>n = 64</option>
            </select>
          </label>
          <div className="flex items-end text-xs leading-5 text-secondary">
            柱高按 log2(次数+1)
            缩放以便同窗显示，柱上数字是真实计数；加法与乘法分开记账，因为
            Strassen 用更多加减换更少乘除。
          </div>
        </div>

        <svg
          viewBox="0 0 900 600"
          role="img"
          aria-label="CLRS 4e Chapter 4 Strassen 专属实验。覆盖 Strassen matrix multiplication、Strassen 矩阵乘法、multiplying square matrices、方阵相乘，展示 8 乘积分块与 7 乘积 Strassen 的标量乘法和加法计数双柱账本、n 的 8 到 64 变化、只数乘法故障和总账本交叉点估计，支持播放、暂停、单步、拖进度、参数切换和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="600" rx="14" fill={C.bg} />
          <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
            标量乘法 / 加法计数：普通 8 乘积 vs Strassen 7 乘积
          </text>
          <text x="30" y="60" fontSize="12" fill={C.secondary}>
            definition → bars → crossover · log2 7 ≈{" "}
            {fx(Math.round(LOG2_7 * 10000) / 10000)}（Strassen 的渐近指数）
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="84"
              width="410"
              height="92"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text x="52" y="110" fontSize="13" fontWeight="700" fill={C.accent}>
              普通分块：8 个乘积
            </text>
            <text x="52" y="134" fontSize="12" fill={C.primary}>
              mult(n) = 8·mult(n/2) → n³
            </text>
            <text x="52" y="158" fontSize="11" fill={C.secondary}>
              adds(n) = 8·adds(n/2) + n² → n³ − n²
            </text>

            <rect
              x="460"
              y="84"
              width="410"
              height="92"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="482"
              y="110"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              Strassen：7 个乘积
            </text>
            <text x="482" y="134" fontSize="12" fill={C.primary}>
              mult(n) = 7·mult(n/2) → n^(log2 7)
            </text>
            <text x="482" y="158" fontSize="11" fill={C.secondary}>
              adds(n) = 7·adds(n/2) + 18·(n/2)²（加减更频繁）
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <text
              x="235"
              y="222"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              普通 8 乘积
            </text>
            <g>
              <rect
                x="155"
                y={fx(500 - barH(classic.mults))}
                width="160"
                height={barH(classic.mults)}
                rx="6"
                fill={C.accent}
                fillOpacity="0.35"
                stroke={C.accent}
                strokeWidth="1.2"
              />
              <text
                x="235"
                y={fx(490 - barH(classic.mults))}
                textAnchor="middle"
                fontSize="11"
                fill={C.primary}
              >
                乘法 {fmt(classic.mults)}
              </text>
              {!ignoreAdds && (
                <>
                  <rect
                    x="155"
                    y={fx(500 - barH(classic.mults) - barH(classic.adds))}
                    width="160"
                    height={barH(classic.adds)}
                    rx="6"
                    fill={C.accent}
                    fillOpacity="0.16"
                    stroke={C.border}
                    strokeWidth="1"
                  />
                  <text
                    x="235"
                    y={fx(490 - barH(classic.mults) - barH(classic.adds))}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    加法 {fmt(classic.adds)}
                  </text>
                </>
              )}
            </g>
            <text
              x="235"
              y="528"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              总账本 {fmt(ignoreAdds ? classic.mults : totalClassic)}
            </text>

            <text
              x="665"
              y="222"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              Strassen 7 乘积
            </text>
            <g>
              <rect
                x="585"
                y={fx(500 - barH(strassen.mults))}
                width="160"
                height={barH(strassen.mults)}
                rx="6"
                fill={C.success}
                fillOpacity="0.35"
                stroke={C.success}
                strokeWidth="1.2"
              />
              <text
                x="665"
                y={fx(490 - barH(strassen.mults))}
                textAnchor="middle"
                fontSize="11"
                fill={C.primary}
              >
                乘法 {fmt(strassen.mults)}
              </text>
              {!ignoreAdds && (
                <>
                  <rect
                    x="585"
                    y={fx(500 - barH(strassen.mults) - barH(strassen.adds))}
                    width="160"
                    height={barH(strassen.adds)}
                    rx="6"
                    fill={C.success}
                    fillOpacity="0.16"
                    stroke={C.border}
                    strokeWidth="1"
                  />
                  <text
                    x="665"
                    y={fx(490 - barH(strassen.mults) - barH(strassen.adds))}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    加法 {fmt(strassen.adds)}
                  </text>
                </>
              )}
            </g>
            <text
              x="665"
              y="528"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={strassenWinsTotal ? C.success : C.danger}
            >
              总账本 {fmt(ignoreAdds ? strassen.mults : totalStrassen)}
            </text>

            <line
              x1="60"
              y1="500"
              x2="840"
              y2="500"
              stroke={C.border}
              strokeWidth="2"
            />
            {ignoreAdds && (
              <text
                x="450"
                y="470"
                textAnchor="middle"
                fontSize="11"
                fill={C.warning}
              >
                故障模式：加法段已隐藏，只剩乘法柱
              </text>
            )}
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="30"
              y="548"
              width="840"
              height="40"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="573"
              fontSize="12"
              fontWeight="700"
              fill={strassenWinsTotal ? C.success : C.danger}
            >
              {ignoreAdds
                ? "只数乘法时 Strassen 全赢——交叉点被故障藏起来了"
                : strassenWinsTotal
                  ? `Strassen 总账本更低：${fmt(totalStrassen)} < ${fmt(totalClassic)}，渐近优势已兑现`
                  : `n=${n} 时 Strassen 总账本更高：${fmt(totalStrassen)} > ${fmt(totalClassic)}——本计数模型交叉点在 n=${CROSSOVER_N}`}
            </text>
            <text
              x="858"
              y="573"
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              乘法柱对比：
              {strassenWinsMult ? "Strassen 已赢（n≥2 起）" : "普通更低"}
            </text>
          </g>
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-fault="ignore-addition-cost"
            aria-pressed={ignoreAdds}
            onClick={() => {
              setIgnoreAdds((prev) => !prev);
              timeline.seek(0);
            }}
            className={`min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              ignoreAdds
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            注入故障：只数乘法，隐藏加法
          </button>
          <span className="text-xs leading-5 text-secondary">
            现象：Strassen 在每个规模都“赢” → 原因：18
            项块加减被藏起来，只剩乘法柱 →
            修法：乘法与加法分开记账，总账本一起看；本计数模型的交叉点在 n=
            {CROSSOVER_N}。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={STRASSEN_LABEL_TEXT}
          caption="先预测 n 调到 64 时总账本谁更低，再推进时间线核对计数递推与交叉点结论。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置 Strassen 块乘积计数实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Strassen 的核心是减少子问题数量：7 个乘积把乘法指数从 3 压到 log2
        7≈2.807；但按 18 项块加减记账时，总操作数要等 n 超过约 {CROSSOVER_N}{" "}
        才反超——渐近结论与工程阈值必须分开看。
      </figcaption>
    </figure>
  );
}
