"use client";

import { useRef, useState, type RefObject } from "react";

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

/** 绘制坐标收敛：仅用于 SVG 绘制坐标，不参与任何数学结果。 */
function px(n: number): number {
  return Number.isFinite(n) ? Number(n.toFixed(9)) : 0;
}

function factorial(n: number): number {
  let out = 1;
  for (let i = 2; i <= n; i += 1) out *= i;
  return out;
}

function permutationStrings(n: number): string[] {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  const out: string[] = [];
  const swap = (i: number, j: number) => {
    const t = a[i]!;
    a[i] = a[j]!;
    a[j] = t;
  };
  const gen = (k: number) => {
    if (k === 1) {
      out.push(a.join(""));
      return;
    }
    gen(k - 1);
    for (let i = 0; i < k - 1; i += 1) {
      swap(k % 2 === 0 ? i : 0, k - 1);
      gen(k - 1);
    }
  };
  gen(n);
  return out;
}

type Chip = { id: string; key: number };

function countingPlacement(chips: readonly Chip[], stable: boolean) {
  const keys = chips.map((c) => c.key);
  const lo = Math.min(...keys);
  const hi = Math.max(...keys);
  const freq = new Map<number, number>();
  for (const c of chips) freq.set(c.key, (freq.get(c.key) ?? 0) + 1);
  const end = new Map<number, number>();
  let acc = 0;
  for (let k = lo; k <= hi; k += 1) {
    acc += freq.get(k) ?? 0;
    end.set(k, acc);
  }
  const cursor = new Map(end);
  const slots: Chip[] = new Array<Chip>(chips.length);
  const scanOrder = stable
    ? chips.map((_, i) => i).reverse()
    : chips.map((_, i) => i);
  for (const j of scanOrder) {
    const c = chips[j]!;
    const pos = (cursor.get(c.key) ?? 1) - 1;
    cursor.set(c.key, pos);
    slots[pos] = c;
  }
  return { slots, freq, end, lo, hi };
}

function digitOf(key: number, place: number): number {
  return Math.floor(key / place) % 10;
}

function radixWalk(
  chips: readonly Chip[],
  stableOnes: boolean,
  stableTens: boolean,
) {
  const byId = new Map(chips.map((c) => [c.id, c]));
  const onesDigits = chips.map((c) => ({ id: c.id, key: digitOf(c.key, 1) }));
  const onesOrder = countingPlacement(onesDigits, stableOnes).slots.map(
    (s) => byId.get(s.id)!,
  );
  const tensDigits = onesOrder.map((c) => ({
    id: c.id,
    key: digitOf(c.key, 10),
  }));
  const tensOrder = countingPlacement(tensDigits, stableTens).slots.map(
    (s) => onesOrder.find((o) => o.id === s.id)!,
  );
  return { onesOrder, tensOrder };
}

function isNondecreasing(values: readonly number[]): boolean {
  return values.every((v, i) => i === 0 || values[i - 1]! <= v);
}

/** 稳定性 oracle：输出中每一对相等键，其输入相对顺序必须保持。 */
function stabilityPreserved(
  input: readonly Chip[],
  output: readonly Chip[],
): boolean {
  const inputIndex = new Map(input.map((c, i) => [c.id, i]));
  for (let i = 0; i < output.length; i += 1) {
    for (let j = i + 1; j < output.length; j += 1) {
      if (output[i]!.key !== output[j]!.key) continue;
      if (
        (inputIndex.get(output[i]!.id) ?? 0) >
        (inputIndex.get(output[j]!.id) ?? 0)
      ) {
        return false;
      }
    }
  }
  return true;
}

type FaultToggleProps = {
  param: string;
  label: string;
  hint: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

function FaultToggle({
  param,
  label,
  hint,
  checked,
  onChange,
}: FaultToggleProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border bg-bg px-3 py-2">
      <input
        type="checkbox"
        data-param={param}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-accent"
      />
      <span className="text-sm font-medium text-primary">{label}</span>
      <span className="text-xs text-secondary">{hint}</span>
    </label>
  );
}

function StageStrip({
  steps,
  stageRefs,
  activeIndex,
}: {
  steps: readonly TeachingStep[];
  stageRefs: RefObject<Array<SVGGElement | null>>;
  activeIndex: number;
}) {
  return (
    <g>
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        return (
          <g
            key={`stage-${step.label}`}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x={px(30 + index * 174)}
              y="50"
              width="164"
              height="58"
              rx="10"
              fill={isActive ? C.accent : C.elevated}
              fillOpacity={isActive ? 0.12 : 1}
              stroke={isActive ? C.accent : C.border}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <text
              x={px(30 + index * 174 + 14)}
              y="76"
              fontSize="12"
              fontWeight="700"
              fill={isActive ? C.accent : C.primary}
            >
              {index + 1} · {step.label}
            </text>
            <text
              x={px(30 + index * 174 + 14)}
              y="96"
              fontSize="11"
              fill={C.secondary}
            >
              {step.caption}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 1 · 决策树下界（主实验）                                          */
/* ------------------------------------------------------------------ */

const LOWER_STEPS: readonly TeachingStep[] = [
  { label: "permutations", caption: "n! 种排列待区分" },
  { label: "tree", caption: "一次比较 = 二叉分叉" },
  { label: "bound", caption: "n! ≤ 2^h ⇒ h ≥ lg n!" },
  { label: "escape", caption: "非比较信息逃出模型" },
  { label: "shortcut", caption: "偷懒树让两种排列同叶" },
];

const LOWER_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  LOWER_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const SIZE_OPTIONS = [3, 4, 5, 6] as const;

export function Clrs4Chapter08SortingInLinearTimeLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [size, setSize] = useState<number>(4);
  const [shortcut, setShortcut] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LOWER_STEPS,
    build: (tl) => {
      LOWER_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const stepIndex = Math.min(timeline.currentStep, LOWER_STEPS.length - 1);
  const leaves = factorial(size);
  const minH = Math.ceil(Math.log2(leaves));
  const drawnLevels = Math.min(minH, 4);
  const permRows = size <= 4 ? permutationStrings(size) : [];
  const perRow = size === 3 ? 6 : 12;
  const logApprox = Math.log2(leaves).toFixed(1);

  const nodes: Array<{ x: number; y: number; level: number; index: number }> =
    [];
  for (let level = 0; level < drawnLevels; level += 1) {
    const count = 2 ** level;
    for (let i = 0; i < count; i += 1) {
      nodes.push({
        level,
        index: i,
        x: px(450 + (i - (count - 1) / 2) * (760 / count)),
        y: px(216 + level * 56),
      });
    }
  }
  const leafSquares = Math.min(2 ** drawnLevels, 16);
  const bandWidth = leafSquares * 22 - 6;
  const bandX = px((900 - bandWidth) / 2);

  function reset() {
    timeline.goToStep(0);
    setSize(4);
    setShortcut(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch08-sorting-in-linear-time"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 8 · Lower Bounds for Sorting
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              决策树实验：n! 片叶子如何逼出 Ω(n lg n)
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              改变输入规模 n，观察叶子数 n! 与最小树高 ⌈lg n!⌉
              的数值轨迹；再注入「偷懒树」故障，
              看砍掉一个分叉后哪两种排列被送到同一片叶子、哪个输入因此被排错。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              输入规模 n
            </span>
            <select
              data-param="input-size"
              aria-label="选择待排序键的个数 n"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  n = {n} · {factorial(n)} 种排列
                </option>
              ))}
            </select>
          </label>
          <FaultToggle
            param="leaf-shortcut"
            label="注入故障：偷懒树剪分叉"
            hint="假设『相邻有序即全局有序』，少做一次比较"
            checked={shortcut}
            onChange={setShortcut}
          />
        </div>

        <svg
          viewBox="0 0 900 640"
          role="img"
          aria-label="CLRS 4e Chapter 8 专属决策树下界实验。覆盖 sorting in linear time、线性时间排序、lower bounds for sorting、排序下界、decision tree、决策树、counting sort、计数排序、radix sort、基数排序、bucket sort、桶排序，展示 n 的阶乘种排列、二叉比较分叉、n! 不超过 2 的 h 次方、最小树高、非比较排序逃出模型、偷懒树故障把两种排列送到同一片叶子，并支持播放、暂停、单步、拖进度、改 n、注入故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="640" rx="14" fill={C.bg} />

          <StageStrip
            steps={LOWER_STEPS}
            stageRefs={stageRefs}
            activeIndex={stepIndex}
          />

          {stepIndex === 0 && (
            <g>
              <text
                x="30"
                y="150"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                互异键 1..{size} 的全部排列（决策树必须逐一区分）
              </text>
              {permRows.length > 0 ? (
                permRows.map((p, i) => {
                  const row = Math.floor(i / perRow);
                  const col = i % perRow;
                  const chipW = size === 3 ? 96 : 64;
                  const gap = size === 3 ? 18 : 8;
                  const totalW = perRow * chipW + (perRow - 1) * gap;
                  const x0 = px((900 - totalW) / 2);
                  const x = px(x0 + col * (chipW + gap));
                  const y = px(176 + row * 46);
                  return (
                    <g key={`perm-${p}`}>
                      <rect
                        x={x}
                        y={y}
                        width={chipW}
                        height="34"
                        rx="8"
                        fill={C.elevated}
                        stroke={C.border}
                        strokeWidth="1.5"
                      />
                      <text
                        x={px(x + chipW / 2)}
                        y={px(y + 22)}
                        textAnchor="middle"
                        fontSize="12"
                        fill={C.primary}
                      >
                        {p.split("").join(" ")}
                      </text>
                    </g>
                  );
                })
              ) : (
                <g>
                  <rect
                    x="300"
                    y="180"
                    width="300"
                    height="90"
                    rx="12"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x="450"
                    y="216"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill={C.accent}
                  >
                    {leaves} 种排列
                  </text>
                  <text
                    x="450"
                    y="244"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    手工画不下，换成计数：这正是决策树要管的叶子数
                  </text>
                </g>
              )}
              <text x="30" y="300" fontSize="11" fill={C.secondary}>
                每种排列沿根到叶走一条路径；路径上的每个分叉是一次比较。先预测：n
                增加 1，排列数是加还是乘？
              </text>
            </g>
          )}

          {stepIndex === 1 && (
            <g>
              {nodes
                .filter((node) => node.level > 0)
                .map((node) => {
                  const parent = nodes.find(
                    (n) =>
                      n.level === node.level - 1 &&
                      n.index === Math.floor(node.index / 2),
                  )!;
                  return (
                    <line
                      key={`edge-${node.level}-${node.index}`}
                      x1={parent.x}
                      y1={parent.y}
                      x2={node.x}
                      y2={node.y}
                      stroke={C.border}
                      strokeWidth="1.5"
                    />
                  );
                })}
              {nodes.map((node) => (
                <g key={`node-${node.level}-${node.index}`}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="13"
                    fill={C.elevated}
                    stroke={C.accent}
                    strokeWidth="1.5"
                  />
                  <circle cx={node.x} cy={node.y} r="3.5" fill={C.accent} />
                </g>
              ))}
              <text
                x="450"
                y="200"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                根：第一次比较 · 每层分叉翻倍 · 画出 {drawnLevels} 层（共需{" "}
                {minH} 层）
              </text>
              {Array.from({ length: leafSquares }, (_, i) => (
                <rect
                  key={`leafslot-${i}`}
                  x={px(bandX + i * 22)}
                  y={px(216 + drawnLevels * 56 + 16)}
                  width="16"
                  height="16"
                  rx="3"
                  fill={C.success}
                  fillOpacity="0.25"
                  stroke={C.success}
                  strokeWidth="1.2"
                />
              ))}
              <text
                x="450"
                y={px(216 + drawnLevels * 56 + 56)}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {leafSquares} 片叶槽（示意）：{drawnLevels} 层最多{" "}
                {2 ** drawnLevels} 片，{minH} 层最多 2^{minH} 片
              </text>
            </g>
          )}

          {stepIndex === 2 && (
            <g>
              <text x="30" y="170" fontSize="12" fill={C.primary}>
                正确算法需要的叶子
              </text>
              <rect
                x="200"
                y="152"
                width={px(38 * Math.log2(leaves))}
                height="26"
                rx="6"
                fill={C.accent}
                fillOpacity="0.75"
              />
              <text
                x={px(212 + 38 * Math.log2(leaves))}
                y="170"
                fontSize="12"
                fontWeight="700"
                fill={C.accent}
              >
                n! = {leaves}
              </text>
              <text x="30" y="226" fontSize="12" fill={C.primary}>
                {minH} 次比较能区分的叶子
              </text>
              <rect
                x="200"
                y="208"
                width={px(38 * minH)}
                height="26"
                rx="6"
                fill={C.success}
                fillOpacity="0.35"
                stroke={C.success}
                strokeWidth="1.5"
              />
              <text
                x={px(212 + 38 * minH)}
                y="226"
                fontSize="12"
                fontWeight="700"
                fill={C.success}
              >
                2^{minH} = {2 ** minH}
              </text>
              <text
                x="30"
                y="286"
                fontSize="14"
                fontWeight="700"
                fill={C.primary}
              >
                n! = {leaves} ≤ 2^h ⇒ h ≥ lg(n!) ≈ {logApprox}，因此 h ≥ {minH}
              </text>
              <text x="30" y="314" fontSize="11" fill={C.secondary}>
                Stirling：lg(n!) = n lg n − Θ(n) = Θ(n lg n)——这个下界随 n
                比任何线性函数都快地增长。
              </text>
            </g>
          )}

          {stepIndex === 3 && (
            <g>
              {[
                {
                  x: 30,
                  title: "计数排序",
                  mech: "把键本身当数组索引",
                  note: "一次定位，不是两两比较",
                },
                {
                  x: 315,
                  title: "基数排序",
                  mech: "把键切成位逐位排序",
                  note: "位值给出次序信息",
                },
                {
                  x: 600,
                  title: "桶排序",
                  mech: "把值映射进有序桶",
                  note: "桶号即次序信息",
                },
              ].map((card) => (
                <g key={`escape-${card.title}`}>
                  <rect
                    x={card.x}
                    y="160"
                    width="270"
                    height="120"
                    rx="12"
                    fill={C.elevated}
                    stroke={C.accent}
                    strokeWidth="1.5"
                  />
                  <text
                    x={px(card.x + 20)}
                    y="192"
                    fontSize="14"
                    fontWeight="700"
                    fill={C.accent}
                  >
                    {card.title}
                  </text>
                  <text
                    x={px(card.x + 20)}
                    y="222"
                    fontSize="12"
                    fill={C.primary}
                  >
                    {card.mech}
                  </text>
                  <text
                    x={px(card.x + 20)}
                    y="250"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {card.note}
                  </text>
                </g>
              ))}
              <text x="30" y="330" fontSize="12" fill={C.primary}>
                下界没有被打败：这些算法读取了比较模型拿不到的信息，因此不再受
                2^h 分叉约束。
              </text>
              <text x="30" y="356" fontSize="11" fill={C.secondary}>
                先预测：逃出模型要付出什么代价？（提示：键域范围、位数、分布假设——每个算法都不同。）
              </text>
            </g>
          )}

          {stepIndex === 4 && (
            <g>
              {shortcut ? (
                <g>
                  <circle
                    cx="160"
                    cy="190"
                    r="16"
                    fill={C.elevated}
                    stroke={C.accent}
                    strokeWidth="1.5"
                  />
                  <text
                    x="190"
                    y="184"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    偷懒树：只比 a₁ 与 a₂
                  </text>
                  <text x="190" y="204" fontSize="11" fill={C.secondary}>
                    通过一次比较就宣布「已有序」
                  </text>
                  <line
                    x1="150"
                    y1="203"
                    x2="100"
                    y2="268"
                    stroke={C.danger}
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />
                  <text x="60" y="292" fontSize="11" fill={C.danger}>
                    剪掉：a₁ ≥ a₂ 的分支
                  </text>
                  <text x="60" y="312" fontSize="11" fill={C.danger}>
                    本应继续比较，被省略
                  </text>
                  <line
                    x1="172"
                    y1="203"
                    x2="300"
                    y2="252"
                    stroke={C.danger}
                    strokeWidth="2"
                  />
                  <text x="216" y="222" fontSize="11" fill={C.secondary}>
                    a₁ &lt; a₂
                  </text>
                  <rect
                    x="300"
                    y="238"
                    width="180"
                    height="52"
                    rx="9"
                    fill={C.danger}
                    fillOpacity="0.12"
                    stroke={C.danger}
                    strokeWidth="1.5"
                  />
                  <text
                    x="390"
                    y="260"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.danger}
                  >
                    同一片叶：原样输出
                  </text>
                  <text
                    x="390"
                    y="280"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    一个叶子只能承诺一种结果
                  </text>
                  <rect
                    x="510"
                    y="150"
                    width="360"
                    height="72"
                    rx="10"
                    fill={C.elevated}
                    stroke={C.success}
                    strokeWidth="1.5"
                  />
                  <text
                    x="528"
                    y="178"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.success}
                  >
                    输入 (1,2,3) → 输出 (1,2,3) · 侥幸正确
                  </text>
                  <text x="528" y="202" fontSize="11" fill={C.secondary}>
                    它恰好本来就有序，错误被运气遮住
                  </text>
                  <rect
                    x="510"
                    y="250"
                    width="360"
                    height="72"
                    rx="10"
                    fill={C.elevated}
                    stroke={C.danger}
                    strokeWidth="1.5"
                  />
                  <text
                    x="528"
                    y="278"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.danger}
                  >
                    输入 (1,3,2) → 输出 (1,3,2) · 排错
                  </text>
                  <text x="528" y="302" fontSize="11" fill={C.secondary}>
                    真有序结果是 (1,2,3)，它却原样返回
                  </text>
                  <text x="30" y="400" fontSize="11" fill={C.secondary}>
                    两种排列都满足 a₁ &lt;
                    a₂，于是殊途同叶；叶子只能给出一个固定输出，其中一个输入因此被牺牲。
                  </text>
                  <text x="30" y="424" fontSize="11" fill={C.secondary}>
                    少一次比较 = 少一半区分能力：这就是 n! ≤ 2^h
                    的翻车现场，下界不允许任何偷懒树存在。
                  </text>
                </g>
              ) : (
                <g>
                  <rect
                    x="150"
                    y="170"
                    width="600"
                    height="150"
                    rx="12"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x="450"
                    y="212"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    决策树完整：{leaves} 片叶子各管一种排列
                  </text>
                  <text
                    x="450"
                    y="246"
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.secondary}
                  >
                    打开上方「偷懒树」故障开关，再回到本步，看剪掉一个分叉如何制造错误叶子。
                  </text>
                  <text
                    x="450"
                    y="278"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    下界的含义：任何比较排序都不能比 ⌈lg n!⌉
                    更矮——故障只是让错误更早现形。
                  </text>
                </g>
              )}
            </g>
          )}

          <rect
            x="30"
            y="520"
            width="840"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="52" y="550" fontSize="13" fontWeight="700" fill={C.primary}>
            下界台账
          </text>
          <text x="52" y="576" fontSize="11" fill={C.secondary}>
            merge sort / heap sort：Θ(n lg n)，在比较模型中达到下界，渐近最优
          </text>
          <text x="52" y="598" fontSize="11" fill={C.secondary}>
            下界只数比较，不数数据移动、缓存未命中或比较器成本；非比较算法读取额外信息，不在此模型内
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LOWER_LABEL_TEXT}
          caption="先预测 n 增大时 ⌈lg n!⌉ 的增长速度，再步进核对，最后开故障看偷懒树翻车的确切位置。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置决策树下界实验",
            onClick: reset,
          }}
        />

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-secondary sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">叶子数（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="leaf-count"
            >
              {leaves}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">最小树高 ⌈lg n!⌉（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="min-height"
            >
              {minH}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">图中树高（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="tree-height"
            >
              {minH}（按 ⌈lg n!⌉ 画）
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">故障状态（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="shortcut-state"
            >
              {shortcut ? "偷懒树已注入" : "关"}
            </dd>
          </div>
        </dl>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        决策树把「比较排序至少要多少次比较」翻译成叶子计数：n!
        种输入必须各占一片叶子，二叉分叉的高度自然被 ⌈lg n!⌉ 托住。
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 2 · 计数排序稳定性 + 基数排序位序（辅实验）                        */
/* ------------------------------------------------------------------ */

const COUNT_STEPS: readonly TeachingStep[] = [
  { label: "frequency", caption: "C[key] 统计频数" },
  { label: "prefix", caption: "前缀和给出每键最右空位" },
  { label: "place", caption: "从右向左放置芯片" },
  { label: "verify", caption: "oracle 三查：有序/排列/稳定" },
  { label: "radix", caption: "LSD 两遍：稳定性即正确性" },
];

const COUNT_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  COUNT_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const DUP_CHIPS: readonly Chip[] = [
  { id: "p1", key: 2 },
  { id: "p2", key: 1 },
  { id: "p3", key: 2 },
  { id: "p4", key: 1 },
];

const RADIX_CHIPS: readonly Chip[] = [
  { id: "A", key: 12 },
  { id: "B", key: 11 },
  { id: "C", key: 13 },
];

export function Clrs4Chapter08CountingRadixLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [recordSet, setRecordSet] = useState<"dup" | "radix">("dup");
  const [unstable, setUnstable] = useState(false);

  const timeline = useTeachingTimeline({
    steps: COUNT_STEPS,
    build: (tl) => {
      COUNT_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const stepIndex = Math.min(timeline.currentStep, COUNT_STEPS.length - 1);
  const chips = recordSet === "dup" ? DUP_CHIPS : RADIX_CHIPS;
  const placement = countingPlacement(chips, !unstable);
  const placedIds = placement.slots.map((c) => c.id).join(" · ");
  const keys = placement.slots.map((c) => c.key);
  const orderedOk = isNondecreasing(keys);
  const walk = radixWalk(RADIX_CHIPS, true, !unstable);
  const radixKeys = walk.tensOrder.map((c) => c.key);
  const radixOk = isNondecreasing(radixKeys);
  const radixOnesIds = walk.onesOrder.map((c) => c.id).join(" · ");
  const radixTensIds = walk.tensOrder.map((c) => c.id).join(" · ");
  const hasDuplicateKeys = new Set(chips.map((c) => c.key)).size < chips.length;
  const stableOk = stabilityPreserved(chips, placement.slots);

  const keyRange: number[] = [];
  for (let k = placement.lo; k <= placement.hi; k += 1) keyRange.push(k);

  function reset() {
    timeline.goToStep(0);
    setRecordSet("dup");
    setUnstable(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch08-counting-radix-stability"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 8 · Counting Sort &amp; Radix Sort
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              稳定性实验：一枚芯片的落位如何决定基数排序的生死
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              改变记录组、注入「正向扫描」故障，观察相等键芯片的落位顺序如何反转，以及
              LSD 第二遍排序
              为什么必须复用稳定性——不稳定时高位同键组保序被破坏，最终序列按键序出错。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              记录组
            </span>
            <select
              data-param="record-set"
              aria-label="选择重复键记录组或三位键基数排序组"
              value={recordSet}
              onChange={(event) =>
                setRecordSet(event.target.value as "dup" | "radix")
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="dup">重复键组 p1..p4（看稳定性）</option>
              <option value="radix">两位键组 A=12 B=11 C=13（看 LSD）</option>
            </select>
          </label>
          <FaultToggle
            param="unstable-placement"
            label="注入故障：正向扫描放置"
            hint="等价于不稳定排序，相等键顺序反转"
            checked={unstable}
            onChange={setUnstable}
          />
        </div>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 8 专属计数排序稳定性与基数排序实验。覆盖 counting sort、计数排序、stable sort、稳定排序、radix sort、基数排序、least significant digit、低位优先，展示频数数组、前缀和、从右向左放置芯片、oracle 三查、LSD 按位次序走查、正向扫描故障反转相等键顺序、第二遍不稳定导致最终键序错误，并支持播放、暂停、单步、拖进度、切换记录组、注入故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />

          <StageStrip
            steps={COUNT_STEPS}
            stageRefs={stageRefs}
            activeIndex={stepIndex}
          />

          <text x="30" y="146" fontSize="12" fontWeight="700" fill={C.primary}>
            输入传送带（
            {recordSet === "dup"
              ? "重复键记录，稳定性可见"
              : "两位键记录，LSD 走查"}
            ）
          </text>
          {chips.map((c, i) => (
            <g key={`in-${c.id}`}>
              <rect
                x={px(60 + i * 110)}
                y="158"
                width="88"
                height="48"
                rx="10"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x={px(60 + i * 110 + 44)}
                y="180"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.primary}
              >
                {c.id}:{c.key}
              </text>
              <text
                x={px(60 + i * 110 + 44)}
                y="198"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                位置 {i + 1}
              </text>
            </g>
          ))}

          <text x="30" y="248" fontSize="12" fontWeight="700" fill={C.primary}>
            频数与前缀和（键域 {placement.lo}..{placement.hi}）
          </text>
          {keyRange.map((k, i) => (
            <g key={`cnt-${k}`}>
              <rect
                x={px(60 + i * 150)}
                y="260"
                width="130"
                height="80"
                rx="10"
                fill={stepIndex >= 1 ? C.accent : C.elevated}
                fillOpacity={stepIndex >= 1 ? 0.1 : 1}
                stroke={stepIndex >= 1 ? C.accent : C.border}
                strokeWidth="1.5"
              />
              <text
                x={px(60 + i * 150 + 65)}
                y="284"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                键 {k}
              </text>
              <text
                x={px(60 + i * 150 + 65)}
                y="306"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                频数 {placement.freq.get(k) ?? 0}
              </text>
              <text
                x={px(60 + i * 150 + 65)}
                y="328"
                textAnchor="middle"
                fontSize="11"
                fill={stepIndex >= 1 ? C.accent : C.secondary}
              >
                {stepIndex >= 1
                  ? `最右空位+1 = ${placement.end.get(k) ?? 0}`
                  : "前缀和待计算"}
              </text>
            </g>
          ))}

          <text x="30" y="388" fontSize="12" fontWeight="700" fill={C.primary}>
            输出槽位（
            {unstable ? "正向扫描：相等键反转" : "从右向左：相等键保序"}）
          </text>
          {placement.slots.map((c, i) => (
            <g key={`slot-${i}-${c.id}`}>
              <rect
                x={px(60 + i * 110)}
                y="400"
                width="88"
                height="48"
                rx="10"
                fill={C.success}
                fillOpacity="0.12"
                stroke={hasDuplicateKeys && !stableOk ? C.danger : C.success}
                strokeWidth="1.5"
              />
              <text
                x={px(60 + i * 110 + 44)}
                y="422"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.primary}
              >
                {c.id}:{c.key}
              </text>
              <text
                x={px(60 + i * 110 + 44)}
                y="440"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                槽 {i}
              </text>
            </g>
          ))}

          <rect
            x="30"
            y="470"
            width="840"
            height="84"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="52" y="496" fontSize="13" fontWeight="700" fill={C.primary}>
            oracle 三查
          </text>
          <text
            x="52"
            y="518"
            fontSize="11"
            fill={orderedOk ? C.success : C.danger}
          >
            有序性：{orderedOk ? "通过" : "失败"}（输出按键非降序）
          </text>
          <text x="300" y="518" fontSize="11" fill={C.success}>
            排列性：通过（芯片多重集不变）
          </text>
          <text
            x="560"
            y="518"
            fontSize="11"
            fill={stableOk ? C.success : C.danger}
          >
            稳定性：
            {hasDuplicateKeys
              ? stableOk
                ? "通过（相等键保序）"
                : "失败（相等键被反转）"
              : "本组无相等键，被掩盖"}
          </text>
          <text x="52" y="542" fontSize="11" fill={C.secondary}>
            先预测：正向扫描只影响稳定性，不影响有序性——它交换的是同键芯片的内部顺序，不是键的分布。
          </text>

          <text x="30" y="590" fontSize="12" fontWeight="700" fill={C.primary}>
            LSD 走查（固定 A=12 B=11 C=13；ones 稳定，tens 沿用上方开关）
          </text>
          <text x="30" y="618" fontSize="11" fill={C.secondary}>
            ones-pass 后：{radixOnesIds}（按键个位：1, 2, 3）
          </text>
          <text
            x="30"
            y="646"
            fontSize="11"
            fill={radixOk ? C.success : C.danger}
          >
            tens-pass 后：{radixTensIds}（键序列 {radixKeys.join(", ")}）→{" "}
            {radixOk ? "按键有序，通过" : "按键序错误：高位同键组保序被破坏"}
          </text>
          <text x="30" y="690" fontSize="11" fill={C.secondary}>
            因果链：tens 位全为 1，第二遍若不稳定，ones 排好的次序被洗牌，最终
            13 排在 12 前面。
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={COUNT_LABEL_TEXT}
          caption="先预测正向扫描会破坏三查中的哪一条，再步进放置过程，最后看 LSD 第二遍如何放大稳定性错误。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置计数排序稳定性实验",
            onClick: reset,
          }}
        />

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-secondary sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">放置模式（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="placement-mode"
            >
              {unstable ? "正向扫描（不稳定）" : "从右向左（稳定）"}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">输出芯片顺序（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="stable-order"
            >
              {placedIds}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">LSD 最终键序（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="radix-result"
            >
              {radixKeys.join(", ")}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">LSD verdict（读回）</dt>
            <dd
              className={`text-sm font-semibold ${radixOk ? "text-primary" : "text-[var(--danger)]"}`}
              data-readout="radix-verdict"
            >
              {radixOk ? "通过" : "失败"}
            </dd>
          </div>
        </dl>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        计数排序的「从右向左」不是实现洁癖：它保证相等键的原始次序，而 LSD
        基数排序每一遍都在消费上一遍的次序。
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 3 · 桶排序均匀性前提（辅实验）                                     */
/* ------------------------------------------------------------------ */

const BUCKET_STEPS: readonly TeachingStep[] = [
  { label: "scatter", caption: "散点撒入 [0,1) 数轴" },
  { label: "index", caption: "x ↦ ⌊nx⌋ 落入桶槽" },
  { label: "local-sort", caption: "桶内排序成本 ∝ Σn_i²" },
  { label: "concat", caption: "按桶号连接即全局有序" },
  { label: "assumption", caption: "均匀独立 ⟹ 期望 Θ(n)" },
];

const BUCKET_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  BUCKET_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const N_BUCKETS = 8;

const UNIFORM_VALUES = [0.08, 0.12, 0.31, 0.47, 0.55, 0.61, 0.79, 0.92];
const CLUSTERED_VALUES = [0.48, 0.5, 0.51, 0.52, 0.49, 0.5, 0.53, 0.08];
const BOUNDARY_VALUES = [0.08, 0.12, 0.31, 0.47, 0.55, 0.61, 0.79, 1.0];

export function Clrs4Chapter08BucketUniformityLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [distribution, setDistribution] = useState<
    "uniform" | "clustered" | "boundary"
  >("uniform");
  const [allowOne, setAllowOne] = useState(false);

  const timeline = useTeachingTimeline({
    steps: BUCKET_STEPS,
    build: (tl) => {
      BUCKET_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const stepIndex = Math.min(timeline.currentStep, BUCKET_STEPS.length - 1);
  const values =
    distribution === "uniform"
      ? UNIFORM_VALUES
      : distribution === "clustered"
        ? CLUSTERED_VALUES
        : BOUNDARY_VALUES;
  const hasOne = values.some((v) => v >= 1);
  const outOfRange = hasOne && allowOne;
  const loads = new Array<number>(N_BUCKETS).fill(0);
  for (const v of values) {
    const idx = Math.min(Math.floor(v * N_BUCKETS), N_BUCKETS - 1);
    loads[idx] = (loads[idx] ?? 0) + 1;
  }
  const maxLoad = Math.max(...loads);
  const pairCost = loads.reduce((acc, l) => acc + l * l, 0);
  const localComparisons = loads.reduce((acc, l) => acc + (l * (l - 1)) / 2, 0);
  const expectedCost = 2 * values.length - 1;
  const worstCost = values.length * values.length;
  const barWidth = (v: number) => px((v / worstCost) * 420);

  function reset() {
    timeline.goToStep(0);
    setDistribution("uniform");
    setAllowOne(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch08-bucket-uniformity"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 8 · Bucket Sort
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              均匀性实验：同一组散点，换分布就换成本
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              改变输入分布，观察桶槽负载条形与 Σn_i² 成本轨迹：均匀抽样贴近期望
              2n−1，聚簇反例让单桶 吃满并退化为 Θ(n²)；边界故障展示 x=1.0 时
              ⌊nx⌋=n 的越界与修法。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              输入分布
            </span>
            <select
              data-param="distribution"
              aria-label="选择均匀、聚簇或含 1.0 的边界分布"
              value={distribution}
              onChange={(event) =>
                setDistribution(
                  event.target.value as "uniform" | "clustered" | "boundary",
                )
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="uniform">均匀抽样（一次固定实例）</option>
              <option value="clustered">聚簇反例（挤在 0.5 附近）</option>
              <option value="boundary">边界输入（含 x = 1.0）</option>
            </select>
          </label>
          <FaultToggle
            param="allow-one"
            label="注入故障：允许 1.0 不做夹紧"
            hint="⌊8×1.0⌋ = 8 = n，索引越界"
            checked={allowOne}
            onChange={setAllowOne}
          />
        </div>

        <svg
          viewBox="0 0 900 700"
          role="img"
          aria-label="CLRS 4e Chapter 8 专属桶排序均匀性实验。覆盖 bucket sort、桶排序、uniform distribution、均匀分布，展示 [0,1) 数轴散点、x 映射到 floor(n x) 号桶、桶槽负载条形、桶内插入排序成本、按桶号连接成全局有序、均匀独立假设下期望 Sigma n_i 平方等于 2n 减 1、聚簇反例退化为平方成本、1.0 越界故障与夹紧修法，并支持播放、暂停、单步、拖进度、切换分布、注入故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="700" rx="14" fill={C.bg} />

          <StageStrip
            steps={BUCKET_STEPS}
            stageRefs={stageRefs}
            activeIndex={stepIndex}
          />

          <line
            x1="60"
            y1="196"
            x2="840"
            y2="196"
            stroke={C.border}
            strokeWidth="2"
          />
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
            <g key={`tick-${tick}`}>
              <line
                x1={px(60 + tick * 780)}
                y1="190"
                x2={px(60 + tick * 780)}
                y2="202"
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x={px(60 + tick * 780)}
                y="224"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {tick}
              </text>
            </g>
          ))}
          {values.map((v, i) => {
            const rawIndex = Math.floor(v * N_BUCKETS);
            const isBoundaryPoint = v >= 1;
            const tone = isBoundaryPoint
              ? outOfRange
                ? C.danger
                : C.warning
              : C.accent;
            return (
              <g key={`pt-${i}`}>
                <line
                  x1={px(60 + v * 780)}
                  y1="150"
                  x2={px(60 + v * 780)}
                  y2="188"
                  stroke={tone}
                  strokeWidth="1.2"
                  strokeDasharray={isBoundaryPoint ? "4 3" : undefined}
                />
                <circle
                  cx={px(60 + v * 780)}
                  cy="150"
                  r="7"
                  fill={tone}
                  fillOpacity={isBoundaryPoint ? 1 : 0.85}
                />
                <text
                  x={px(60 + v * 780)}
                  y="140"
                  textAnchor="middle"
                  fontSize="11"
                  fill={tone}
                >
                  {isBoundaryPoint
                    ? outOfRange
                      ? `越界 ⌊8×1⌋=${rawIndex}`
                      : `夹紧 → ${N_BUCKETS - 1} 号桶`
                    : `x${i + 1}`}
                </text>
              </g>
            );
          })}

          {loads.map((load, b) => {
            const x = px(60 + b * 97.5);
            const h = px(46 + load * 32);
            const hot = load === maxLoad && maxLoad > 2;
            return (
              <g key={`bucket-${b}`}>
                <rect
                  x={x}
                  y="300"
                  width="88"
                  height={h}
                  rx="9"
                  fill={hot ? C.warning : C.elevated}
                  fillOpacity={hot ? 0.25 : 1}
                  stroke={hot ? C.warning : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={px(60 + b * 97.5 + 44)}
                  y="322"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={hot ? C.warning : C.primary}
                >
                  桶 {b} · n_{b}={load}
                </text>
                <text
                  x={px(60 + b * 97.5 + 44)}
                  y={px(340 + load * 32)}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {load * load} 对
                </text>
              </g>
            );
          })}

          <rect
            x="30"
            y="560"
            width="840"
            height="110"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="52" y="586" fontSize="13" fontWeight="700" fill={C.primary}>
            成本对照（Σn_i² 与局部比较数）
          </text>
          <text x="52" y="612" fontSize="11" fill={C.secondary}>
            本实例 Σn_i²
          </text>
          <rect
            x="200"
            y="598"
            width={barWidth(pairCost)}
            height="18"
            rx="5"
            fill={C.accent}
            fillOpacity="0.7"
          />
          <text
            x={px(210 + (pairCost / worstCost) * 420)}
            y="612"
            fontSize="11"
            fontWeight="700"
            fill={C.accent}
          >
            {pairCost}
          </text>
          <text x="52" y="640" fontSize="11" fill={C.secondary}>
            均匀期望 2n−1
          </text>
          <rect
            x="200"
            y="626"
            width={barWidth(expectedCost)}
            height="18"
            rx="5"
            fill={C.success}
            fillOpacity="0.3"
            stroke={C.success}
            strokeWidth="1.2"
          />
          <text
            x={px(210 + (expectedCost / worstCost) * 420)}
            y="640"
            fontSize="11"
            fill={C.success}
          >
            {expectedCost}
          </text>
          <text x="52" y="660" fontSize="11" fill={C.secondary}>
            单桶最坏 n²
          </text>
          <rect
            x="200"
            y="648"
            width={barWidth(worstCost)}
            height="18"
            rx="5"
            fill={C.danger}
            fillOpacity="0.15"
            stroke={C.danger}
            strokeWidth="1.2"
          />
          <text x={px(210 + 420)} y="662" fontSize="11" fill={C.danger}>
            {worstCost}
          </text>

          <text x="620" y="612" fontSize="11" fill={C.secondary}>
            局部比较数：{localComparisons}
          </text>
          <text
            x="620"
            y="640"
            fontSize="11"
            fill={outOfRange ? C.danger : C.secondary}
          >
            {outOfRange
              ? "越界：索引 n 不存在，必须夹紧或拒绝"
              : hasOne
                ? "已夹紧到末桶：正确性保住，但要写进合同"
                : maxLoad > 2
                  ? "聚簇：单桶吃满，期望线性不再成立"
                  : "均匀：期望 Θ(n) 的前提被满足"}
          </text>
          <text x="620" y="660" fontSize="11" fill={C.secondary}>
            {stepIndex >= 3
              ? "桶区间有序：连接后全局有序"
              : "先预测：聚簇会把成本推向哪条 bar？"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={BUCKET_LABEL_TEXT}
          caption="先预测聚簇对 Σn_i² 的影响，再步进散点→入桶→局部排序→连接，最后换边界输入看越界故障。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置桶排序均匀性实验",
            onClick: reset,
          }}
        />

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-secondary sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">最大桶负载（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="max-load"
            >
              {maxLoad}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">Σn_i²（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="pair-cost"
            >
              {pairCost}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">均匀期望 2n−1（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="expected-cost"
            >
              {expectedCost}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">索引状态（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="index-status"
            >
              {outOfRange
                ? "越界 ⌊nx⌋=n"
                : hasOne
                  ? "1.0 已夹紧"
                  : "正常 [0,1)"}
            </dd>
          </div>
        </dl>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        桶排序的线性是「带条件的线性」：⌊nx⌋
        给出免费的全局次序，而均匀独立假设负责把每个桶的负载压小。
      </figcaption>
    </figure>
  );
}
