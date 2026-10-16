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

/* ---------- 钢条切割 DP 共享 oracle ---------- */

const PRICE_PRESETS = {
  classic: {
    label: "CLRS 例（短段先陡后平）",
    prices: [1, 5, 8, 9, 10, 17, 17, 20, 24, 30],
  },
  linear: {
    label: "近线性（整根越长越划算）",
    prices: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  },
  spiky: {
    label: "锯齿（个别长度溢价）",
    prices: [3, 4, 9, 10, 11, 12, 21, 22, 23, 24],
  },
} as const;

type PresetKey = keyof typeof PRICE_PRESETS;

const CUT_COST = 2;
const DEFAULT_N = 7;

type DpCell = {
  length: number;
  best: number;
  first: number;
  candidates: number[];
};

/** naiveCalls(len) = 1 + Σ naiveCalls(len-i)，naiveCalls(0)=1，展开即 2^len。 */
function naiveCalls(len: number): number {
  return Math.pow(2, len);
}

/**
 * bottom-up 钢条切割。
 * chargeEveryPiece = true 是故障模型：连“不切、整根卖”的候选也扣切割成本，
 * 等于把 k 段的合法方案按 k+1 次切割计费。
 */
function computeRodDp(
  prices: readonly number[],
  n: number,
  cutCost: number,
  chargeEveryPiece: boolean,
) {
  const cells: DpCell[] = [{ length: 0, best: 0, first: 0, candidates: [] }];
  for (let len = 1; len <= n; len++) {
    const candidates: number[] = [];
    let best = -Infinity;
    let first = 1;
    for (let i = 1; i <= len; i++) {
      let value = prices[i - 1] + cells[len - i].best;
      if (chargeEveryPiece) {
        value -= cutCost;
      } else if (i < len) {
        value -= cutCost;
      }
      candidates.push(value);
      if (value > best) {
        best = value;
        first = i;
      }
    }
    cells.push({ length: len, best, first, candidates });
  }
  const pieces: number[] = [];
  let remaining = n;
  while (remaining > 0) {
    pieces.push(cells[remaining].first);
    remaining -= cells[remaining].first;
  }
  return { cells, pieces };
}

/* ---------- 教学时间线：价格表 → 调用数爆炸 → 表格填充 → 切法回溯 ---------- */

const ROD_STEPS: readonly TeachingStep[] = [
  {
    label: "price",
    caption: "价格表：长度 i 的整段售价 p_i，先看清输入再谈切法",
  },
  {
    label: "explosion",
    caption: "朴素递归反复请求同一长度，调用数 2^n；记忆化只算 n+1 个不同状态",
  },
  {
    label: "fill",
    caption: "bottom-up 填 r 表：r[l] 枚举第一刀 i，取 p_i + r[l−i] 的最大值",
  },
  {
    label: "reconstruct",
    caption: "choice 表回溯：first_cut 从 n 一步步减出每段长度，交付 witness",
  },
];

const ROD_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  ROD_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CELL_W = 72;
const CELL_H = 56;

export function Clrs4Chapter14DynamicProgrammingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [preset, setPreset] = useState<PresetKey>("classic");
  const [n, setN] = useState(DEFAULT_N);
  const [chargeEveryPiece, setChargeEveryPiece] = useState(false);

  const timeline = useTeachingTimeline({
    steps: ROD_STEPS,
    build: (tl) => {
      ROD_STEPS.forEach((step, index) => {
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

  const prices = PRICE_PRESETS[preset].prices;
  const { cells, pieces } = computeRodDp(prices, n, CUT_COST, chargeEveryPiece);
  const maxPrice = Math.max(...prices);
  const best = cells[n].best;
  const naive = naiveCalls(n);
  const memoized = n + 1;
  const naiveLog = Math.log2(naive);
  const memoLog = Math.log2(memoized + 1);
  const maxLog = Math.max(naiveLog, memoLog, 1);
  const faultDelta = chargeEveryPiece ? CUT_COST : 0;
  const currentStep =
    timeline.currentStep >= ROD_STEPS.length
      ? ROD_STEPS.length - 1
      : timeline.currentStep;

  function applyParams(next: { preset?: PresetKey; len?: number }) {
    if (next.preset !== undefined) setPreset(next.preset);
    if (next.len !== undefined) setN(next.len);
    timeline.seek(0);
  }

  function reset() {
    setPreset("classic");
    setN(DEFAULT_N);
    setChargeEveryPiece(false);
    timeline.seek(0);
  }

  const tableX = 30;
  const tableY = 150;
  const priceBarMaxH = 220;
  const barBaseY = 330;
  const priceSlotW = 78;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="rod-cutting-dp-table-fill-and-traceback"
      data-readout="rod-cutting-dp"
      data-optimal-revenue={best}
      data-first-cut={cells[n].first}
      data-piece-count={pieces.length}
      data-naive-calls={naive}
      data-memoized-states={memoized}
      data-fault={chargeEveryPiece ? "charge-cut-cost-on-whole-rod" : "none"}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 14 · Dynamic Programming
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              钢条切割 DP 账本：状态、转移、choice 表与 witness 回溯
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：把长度 n 从 {n}{" "}
              调大一格，朴素递归的调用数会翻几倍？记忆化的状态数又会增加几个？先写下预测，再推进时间线核对
              2^n 与 n+1 的账本差距。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              价格表预设
            </span>
            <select
              data-param="price-preset"
              aria-label="选择钢条价格表预设"
              value={preset}
              onChange={(event) =>
                applyParams({ preset: event.target.value as PresetKey })
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {(
                Object.entries(PRICE_PRESETS) as Array<
                  [PresetKey, (typeof PRICE_PRESETS)[PresetKey]]
                >
              ).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              钢条长度 n
            </span>
            <select
              data-param="rod-length"
              aria-label="选择钢条长度 n"
              value={n}
              onChange={(event) =>
                applyParams({ len: Number(event.target.value) })
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {[4, 5, 6, 7, 8, 9, 10].map((len) => (
                <option key={len} value={len}>
                  n = {len}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end text-xs leading-5 text-secondary">
            每次切割有固定成本 c = {CUT_COST}
            ：只有真的下刀（第一刀后还有剩余）才扣费；卖整根不切不扣。
          </div>
        </div>

        <svg
          viewBox="0 0 900 660"
          role="img"
          aria-label="CLRS 4e Chapter 14 动态规划专属钢条切割实验。覆盖 dynamic programming、动态规划、rod cutting、钢条切割、optimal substructure、重叠子问题、memoization、choice 表，展示价格表柱状图、朴素递归 2 的 n 次方调用数与记忆化 n+1 个状态对比、bottom-up 填 r 表与候选第一刀明细、first_cut 回溯出的分段 witness，支持播放、暂停、单步、拖进度、价格表切换、长度切换、每段扣切割成本故障注入和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="660" rx="14" fill={C.bg} />
          <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
            钢条切割：r_n = max(p_i + r_(n−i) − 切口成本)，当前 n = {n}
          </text>
          <text x="30" y="60" fontSize="12" fill={C.secondary}>
            price → explosion → fill → reconstruct · 当前步骤：
            {ROD_STEPS[currentStep]?.label ?? "price"}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            <text x="30" y="96" fontSize="13" fontWeight="700" fill={C.accent}>
              价格表：长度 i 的整段售价 p_i（不切也能整根卖）
            </text>
            {prices.map((price, index) => {
              const slotX = 30 + index * priceSlotW;
              const barH = fx((price / maxPrice) * priceBarMaxH);
              return (
                <g key={`price-${index + 1}`}>
                  <rect
                    x={fx(slotX + 12)}
                    y={fx(barBaseY - barH)}
                    width="42"
                    height={barH}
                    rx="5"
                    fill={C.accent}
                    fillOpacity="0.3"
                    stroke={C.accent}
                    strokeWidth="1.2"
                  />
                  <text
                    x={fx(slotX + 33)}
                    y={fx(barBaseY - barH - 8)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.primary}
                  >
                    {price}
                  </text>
                  <text
                    x={fx(slotX + 33)}
                    y={fx(barBaseY + 20)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    i={index + 1}
                  </text>
                </g>
              );
            })}
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <text x="30" y="96" fontSize="13" fontWeight="700" fill={C.accent}>
              调用数账本：朴素递归 vs 记忆化（柱高 = log2，数值为真实调用数）
            </text>
            <rect
              x="80"
              y={fx(340 - (naiveLog / maxLog) * 220)}
              width="180"
              height={fx((naiveLog / maxLog) * 220)}
              rx="8"
              fill={C.danger}
              fillOpacity="0.28"
              stroke={C.danger}
              strokeWidth="1.4"
            />
            <text
              x="170"
              y="368"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              朴素递归 {fmt(naive)} 次
            </text>
            <text
              x="170"
              y="388"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              反复重算同一长度 = 2^{n}
            </text>

            <rect
              x="420"
              y={fx(340 - (memoLog / maxLog) * 220)}
              width="180"
              height={fx((memoLog / maxLog) * 220)}
              rx="8"
              fill={C.success}
              fillOpacity="0.28"
              stroke={C.success}
              strokeWidth="1.4"
            />
            <text
              x="510"
              y="368"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              记忆化 {memoized} 个状态
            </text>
            <text
              x="510"
              y="388"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              每个长度只算一次 = n+1
            </text>

            <rect
              x="700"
              y="130"
              width="170"
              height="210"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="720"
              y="158"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              加速比
            </text>
            <text x="720" y="186" fontSize="12" fill={C.accent}>
              ≈ {fmt(Math.round(naive / memoized))} ×
            </text>
            <text x="720" y="212" fontSize="11" fill={C.secondary}>
              n=10 时约 93 ×
            </text>
            <text x="720" y="236" fontSize="11" fill={C.secondary}>
              重叠子问题越重，
            </text>
            <text x="720" y="258" fontSize="11" fill={C.secondary}>
              缓存收益越大
            </text>
            <text x="720" y="282" fontSize="11" fill={C.secondary}>
              （n=20 约 5×10⁴ ×）
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <text x="30" y="96" fontSize="13" fontWeight="700" fill={C.accent}>
              bottom-up 填 r 表：短长度先算，长长度引用已知的左格
            </text>
            <text x="30" y="252" fontSize="11" fill={C.secondary}>
              r[{cells[n].length}] 的候选明细（第一刀 i → p_i + r[剩余]
              {chargeEveryPiece ? "，故障模式连整根卖也扣 c" : "，下刀才扣 c"}
              ）：
            </text>
            {cells[n].candidates.map((value, index) => {
              const i = index + 1;
              const isWin = cells[n].first === i;
              const slotX = tableX + index * CELL_W;
              return (
                <g key={`candidate-${i}`}>
                  <rect
                    x={fx(slotX)}
                    y="262"
                    width={fx(CELL_W - 8)}
                    height="44"
                    rx="8"
                    fill={isWin ? C.accent : C.elevated}
                    fillOpacity={isWin ? 0.2 : 1}
                    stroke={isWin ? C.accent : C.border}
                    strokeWidth={isWin ? 1.6 : 1.2}
                  />
                  <text
                    x={fx(slotX + (CELL_W - 8) / 2)}
                    y="282"
                    textAnchor="middle"
                    fontSize="11"
                    fill={isWin ? C.accent : C.secondary}
                  >
                    i={i}
                  </text>
                  <text
                    x={fx(slotX + (CELL_W - 8) / 2)}
                    y="298"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isWin ? 700 : 400}
                    fill={isWin ? C.primary : C.secondary}
                  >
                    {value}
                  </text>
                </g>
              );
            })}

            {cells.map((cell) => {
              const slotX = tableX + cell.length * CELL_W;
              const isTarget = cell.length === n;
              const tone = isTarget ? C.accent : C.success;
              return (
                <g key={`cell-${cell.length}`}>
                  <rect
                    x={fx(slotX)}
                    y={fx(tableY)}
                    width={fx(CELL_W - 8)}
                    height={CELL_H}
                    rx="8"
                    fill={isTarget ? C.accent : C.elevated}
                    fillOpacity={isTarget ? 0.16 : 1}
                    stroke={tone}
                    strokeWidth={isTarget ? 1.8 : 1.2}
                  />
                  <text
                    x={fx(slotX + (CELL_W - 8) / 2)}
                    y={fx(tableY + 22)}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    {cell.best}
                  </text>
                  <text
                    x={fx(slotX + (CELL_W - 8) / 2)}
                    y={fx(tableY + 42)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {cell.length === 0 ? "base" : `首段 ${cell.first}`}
                  </text>
                  <text
                    x={fx(slotX + (CELL_W - 8) / 2)}
                    y={fx(tableY + CELL_H + 20)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    r[{cell.length}]
                  </text>
                  {cell.length > 0 && (
                    <line
                      x1={fx(slotX - 8 + (CELL_W - 8) / 2)}
                      y1={fx(tableY + CELL_H / 2)}
                      x2={fx(slotX)}
                      y2={fx(tableY + CELL_H / 2)}
                      stroke={C.border}
                      strokeWidth="1.2"
                      markerEnd="url(#clrs4-ch14-dp-arrow)"
                    />
                  )}
                </g>
              );
            })}
            <defs>
              <marker
                id="clrs4-ch14-dp-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
              </marker>
            </defs>
            <text x="30" y="336" fontSize="11" fill={C.secondary}>
              每个格子依赖左边更短的格子（无环），所以从左到右一次遍历即可；表内“首段”列就是
              choice 表。
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            style={{ opacity: 0 }}
          >
            <text x="30" y="96" fontSize="13" fontWeight="700" fill={C.accent}>
              choice 表回溯：值最优 + witness 一起交付
            </text>
            <text x="30" y="120" fontSize="11" fill={C.secondary}>
              从 r[{n}] 的首段 {cells[n].first}{" "}
              开始，剩余长度反复查首段，直到减到 0：
            </text>
            {pieces.map((piece, index) => {
              const width = piece * 64;
              const offset = pieces
                .slice(0, index)
                .reduce((sum, p) => sum + p * 64, 0);
              return (
                <g key={`piece-${index}`}>
                  <rect
                    x={fx(40 + offset)}
                    y="150"
                    width={fx(width - 4)}
                    height="52"
                    rx="8"
                    fill={C.accent}
                    fillOpacity={index % 2 === 0 ? 0.26 : 0.14}
                    stroke={C.accent}
                    strokeWidth="1.4"
                  />
                  <text
                    x={fx(40 + offset + width / 2 - 2)}
                    y="174"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    长度 {piece}
                  </text>
                  <text
                    x={fx(40 + offset + width / 2 - 2)}
                    y="192"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    售价 {prices[piece - 1]}
                    {index < pieces.length - 1
                      ? ` − 切口 ${CUT_COST}`
                      : "（末段）"}
                  </text>
                </g>
              );
            })}
            <line
              x1="40"
              y1="222"
              x2={fx(40 + n * 64 - 4)}
              y2="222"
              stroke={C.border}
              strokeWidth="2"
            />

            <rect
              x="30"
              y="250"
              width="840"
              height="52"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="274"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              最优收益 r[{n}] = {best}
              {faultDelta > 0 ? `（故障模型偏低 ${faultDelta}）` : ""}
              ，共 {pieces.length} 段：
              {pieces.join(" + ")}
            </text>
            <text x="52" y="294" fontSize="11" fill={C.secondary}>
              只存 r 表只能回答“最多赚多少”；存了 choice
              表才能回答“具体怎么切”——两问都是合同的交付物。
            </text>

            <rect
              x="30"
              y="320"
              width="840"
              height="48"
              rx="12"
              fill={chargeEveryPiece ? C.warning : C.elevated}
              fillOpacity={chargeEveryPiece ? 0.1 : 1}
              stroke={chargeEveryPiece ? C.warning : C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="342"
              fontSize="12"
              fontWeight="700"
              fill={chargeEveryPiece ? C.warning : C.secondary}
            >
              {chargeEveryPiece
                ? "故障 witness：每段都扣切割成本，段数与收益同步被扭曲"
                : `正确 witness：仅 ${pieces.length - 1 > 0 ? pieces.length - 1 : 0} 处切口扣费，整段出售不扣`}
            </text>
            <text x="52" y="360" fontSize="11" fill={C.secondary}>
              {chargeEveryPiece
                ? "对照正确账本，找出哪一段被多扣了 c。"
                : "状态、转移、base、依赖顺序与 tie policy 齐全，账本才可复现。"}
            </text>
          </g>

          <g>
            <rect
              x="30"
              y="580"
              width="840"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="604"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              结论：动态规划 = 无环依赖图上每个状态只算一次 + choice 表回溯
              witness
            </text>
            <text x="52" y="626" fontSize="11" fill={C.secondary}>
              状态数 × 每状态候选数 = 复杂度；本实验
              Θ(n²)。切换长度与预设，观察账本与分段如何变化。
            </text>
            <text
              x="858"
              y="604"
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={chargeEveryPiece ? C.danger : C.success}
            >
              {chargeEveryPiece ? "故障模型运行中" : "正确模型运行中"}
            </text>
            <text
              x="858"
              y="626"
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              {chargeEveryPiece
                ? `基准正确 r[${n}] = ${computeRodDp(prices, n, CUT_COST, false).cells[n].best}`
                : `当前步骤：${ROD_STEPS[currentStep]?.label ?? "price"}`}
            </text>
          </g>
        </svg>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-fault="charge-cut-cost-on-whole-rod"
            aria-pressed={chargeEveryPiece}
            onClick={() => {
              setChargeEveryPiece((prev) => !prev);
              timeline.seek(0);
            }}
            className={`min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              chargeEveryPiece
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            注入故障：每段都扣切割成本 c
          </button>
          <span className="text-xs leading-5 text-secondary">
            现象：最优收益整体偏低、分段可能偏多 →
            原因：把“不切整根卖”也算成一次切割，k 段方案被按 k+1 次切口计费 →
            修法：转移式只在 i &lt; l（确实下刀）时减 c。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={ROD_LABEL_TEXT}
          caption="先预测 n 调大后调用数与状态数各自如何增长，再推进时间线核对填表顺序与 witness 回溯。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置钢条切割动态规划实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        钢条切割把动态规划拆成四件可检查的交付物：无环的状态依赖图、bottom-up
        填表顺序、choice 表、以及从 choice 表回溯出的分段 witness。
      </figcaption>
    </figure>
  );
}
