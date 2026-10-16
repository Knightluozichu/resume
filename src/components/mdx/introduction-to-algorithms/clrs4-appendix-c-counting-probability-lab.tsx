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
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  {
    label: "sample-space",
    caption: "n 次独立试验 ⇒ 2ⁿ 个结果序列；先数清样本空间",
  },
  {
    label: "counting",
    caption: "C(n,k) 选出 k 个成功位置，系数乘上概率因子",
  },
  {
    label: "probability",
    caption: "等可能时 P(A)=|A|/|Ω|；条件概率把空间缩小",
  },
  {
    label: "expectation",
    caption: "随机变量是 outcome 的函数；期望线性不需要独立",
  },
  {
    label: "binomial",
    caption: "成功次数服从 Bin(n,p)：均值 np、方差 np(1−p)",
  },
  {
    label: "tails",
    caption: "马尔可夫 / 切比雪夫 / 切尔诺夫把均值变成尾界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_TITLES: readonly string[] = [
  "样本空间：先数有多少种结果",
  "计数：二项系数在数什么",
  "概率：等可能与条件化",
  "期望：outcome 的函数与线性性",
  "二项分布：成功次数的分布",
  "尾界：从均值到高概率保证",
];

// 每个阶段右侧面板的讲解行（全部确定性文案，无随机数）。
const STAGE_NOTES: Readonly<Record<string, readonly string[]>> = {
  "sample-space": [
    "样本空间 Ω：一次实验全部可能结果的集合。",
    "事件 A：Ω 的一个子集（例如“成功次数 ≥ t”）。",
    "必须先声明 Ω 与“等可能”假设，概率才有定义。",
  ],
  counting: [
    "有序无放回：n·(n−1)⋯；无序再除以 k!。",
    "二项系数 C(n,k)：为 k 次成功挑选位置的方式数。",
    "Pascal：C(n,k) = C(n−1,k−1) + C(n−1,k)。",
  ],
  probability: [
    "等可能时 P(A) = |A| / |Ω|：分子分母同数一遍。",
    "条件概率 P(A|B)：把样本空间缩小到 B 再归一化。",
    "不放回抽样中每一步的概率都在变——这是条件概率在工作。",
  ],
  expectation: [
    "随机变量 X：给每个 outcome 赋一个数的确定函数。",
    "X = Σ Iᵢ：成功次数是 n 个指示变量之和。",
    "E[X] = Σ x·P(X=x) = np；线性性不要求独立。",
    "先预测：把 p 调大，均值线往哪边移动？",
  ],
  binomial: [
    "P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ。",
    "柱子高度 = 精确概率；系数选位置，幂给联合概率。",
    "σ² = np(1−p)：p=0.5 时分布最宽。",
  ],
  tails: [
    "尾事件 {X ≥ t}：坏情况发生的概率。",
    "Markov 只要求非负；Chebyshev 用方差；",
    "Chernoff 用独立性换指数衰减 δ²μ。",
    "界可以松，但前提一条都不能少。",
  ],
};

// 深度 3 的伯努利树：根 → SS/SF/FS/FF → 8 个叶子序列，固定坐标。
const TREE_DEPTH3: readonly (readonly [number, number, string])[] = [
  [700, 216, "SSS"],
  [724, 216, "SSF"],
  [748, 216, "SFS"],
  [772, 216, "SFF"],
  [796, 216, "FSS"],
  [820, 216, "FSF"],
  [844, 216, "FFS"],
  [868, 216, "FFF"],
];

function computePmf(n: number, p: number): number[] {
  const q = 1 - p;
  const pmf = new Array<number>(n + 1).fill(0);
  pmf[0] = Math.pow(q, n);
  for (let k = 0; k < n; k++) {
    pmf[k + 1] = ((pmf[k] * (n - k)) / (k + 1)) * (p / q);
  }
  const total = pmf.reduce((sum, v) => sum + v, 0);
  return pmf.map((v) => v / total);
}

function binom(n: number, k: number): number {
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 0; i < k; i++) {
    r = Math.round((r * (n - i)) / (i + 1));
  }
  return r;
}

function pct(x: number): string {
  return (x * 100).toFixed(1) + "%";
}

const CHART = { x0: 50, x1: 610, yTop: 210, yBase: 520 } as const;

export function Clrs4AppendixCCountingProbabilityLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [n, setN] = useState(8);
  const [p, setP] = useState(0.5);
  const [t, setT] = useState(6);
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        // 首步在 t=0 必须可见：stage 0 用 [1,1]，其余从 0 淡入。
        const opacity = index === 0 ? ([1, 1] as const) : ([0, 1] as const);
        tl.add(
          stageRefs.current[index]!,
          { opacity, duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 打在该步动画的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);

  const pmf = computePmf(n, p);
  const mu = n * p;
  const variance = n * p * (1 - p);
  const maxPmf = Math.max(...pmf);
  const tailUp = pmf.reduce((s, v, k) => (k >= t ? s + v : s), 0);
  const tailDown = pmf.reduce((s, v, k) => (k <= t ? s + v : s), 0);
  const markov = Math.min(1, mu / t);
  const dev = t - mu;
  const cheby = dev > 0 ? Math.min(1, variance / (dev * dev)) : 1;
  const delta = (t - mu) / mu;
  const chernoffOk = delta > 0 && delta <= 1;
  const chernoff = chernoffOk
    ? Math.min(1, Math.exp(-((delta * delta * mu) / 3)))
    : null;

  const slot = (CHART.x1 - CHART.x0) / (n + 1);
  const barW = Math.min(slot * 0.62, 30);
  const barX = (k: number) => CHART.x0 + slot * k + (slot - barW) / 2;
  const barH = (v: number) => (v / maxPmf) * (CHART.yBase - CHART.yTop - 20);
  const muX = CHART.x0 + slot * (mu + 0.5);
  const thrX = CHART.x0 + slot * t;
  const showMean = activeIndex >= 3;
  const showTail = activeIndex >= 4;
  const labelEvery = n <= 12 ? 1 : 2;

  function reset() {
    timeline.goToStep(0);
    setN(8);
    setP(0.5);
    setT(6);
    setFault(false);
  }

  const ariaLabel = `二项分布计数与概率实验台：${n} 次独立试验，成功概率 ${p.toFixed(
    2,
  )}，阈值 ${t}。当前阶段：${STAGE_TITLES[activeIndex]}。${
    fault ? "已注入故障：把上尾事件数成了下尾。" : ""
  } 横轴为成功次数 k，纵轴为精确概率，阴影区域为阈值之外的尾部。`;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-appendix-c-counting-probability"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Appendix C · Counting and Probability
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从“有多少种结果”到“坏情况多罕见”：一枚硬币抛 n 次
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿时间线走一遍随机分析的完整证据链：数清样本空间、数出二项系数、定义概率与期望、
              得到 Bin(n,p)
              分布，最后用尾界把均值升级成高概率保证。拖动参数，看分布与三个界如何联动。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block min-h-11 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              试验次数 n = {n}
            </span>
            <input
              type="range"
              min={4}
              max={20}
              step={1}
              value={n}
              aria-label="试验次数 n"
              onChange={(event) => {
                const next = Number(event.target.value);
                setN(next);
                setT((prev) => Math.min(prev, next));
              }}
              className="w-full accent-accent"
            />
          </label>
          <label className="block min-h-11 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              成功概率 p = {p.toFixed(2)}
            </span>
            <input
              type="range"
              min={0.05}
              max={0.95}
              step={0.05}
              value={p}
              aria-label="单次成功概率 p"
              onChange={(event) => setP(Number(event.target.value))}
              className="w-full accent-accent"
            />
          </label>
          <label className="block min-h-11 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              阈值 t = {t}
            </span>
            <input
              type="range"
              min={1}
              max={n}
              step={1}
              value={t}
              aria-label="尾界阈值 t"
              onChange={(event) => setT(Number(event.target.value))}
              className="w-full accent-accent"
            />
          </label>
          <label className="flex min-h-11 cursor-pointer select-none items-center gap-2 self-end rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={fault}
              onChange={(event) => setFault(event.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            注入故障：数错尾巴方向
          </label>
        </div>

        <svg
          viewBox="0 0 900 640"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="640" rx="14" fill={C.bg} />

          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            counting → probability → random variable → binomial → tail bounds
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            当前阶段：{activeIndex + 1} · {STAGE_TITLES[activeIndex]}
            {fault ? " · 故障已注入" : ""}
          </text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const x = 30 + index * 142;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x={x}
                  y={76}
                  width="132"
                  height="44"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.14 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text
                  x={x + 14}
                  y="96"
                  fontSize="12"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index + 1} · {step.label}
                </text>
                <text
                  x={x + 14}
                  y="112"
                  fontSize="11"
                  fill={isActive ? C.primary : C.secondary}
                >
                  {(step.caption ?? step.label).length > 16
                    ? (step.caption ?? step.label).slice(0, 16) + "…"
                    : (step.caption ?? step.label)}
                </text>
              </g>
            );
          })}

          {/* PMF 柱图 */}
          <text
            x={CHART.x0}
            y="146"
            fontSize="13"
            fontWeight="700"
            fill={C.primary}
          >
            Bin({n}, {p.toFixed(2)}) 的概率质量函数
          </text>
          <text
            x={CHART.x1}
            y="146"
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            {fault ? "阴影 = 数错的下尾 P(X≤t)" : "阴影 = 上尾 P(X≥t)"}
          </text>

          <line
            x1={CHART.x0}
            y1={CHART.yBase}
            x2={CHART.x1}
            y2={CHART.yBase}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <line
            x1={CHART.x0}
            y1={CHART.yTop - 10}
            x2={CHART.x0}
            y2={CHART.yBase}
            stroke={C.border}
            strokeWidth="1.5"
          />

          {pmf.map((v, k) => {
            const inTail = fault ? k <= t : k >= t;
            const h = barH(v);
            return (
              <g key={"bar-" + k}>
                <rect
                  x={barX(k)}
                  y={CHART.yBase - h}
                  width={barW}
                  height={Math.max(h, 1.5)}
                  rx="3"
                  fill={inTail && showTail ? C.accent : C.elevated}
                  fillOpacity={inTail && showTail ? 0.55 : 1}
                  stroke={inTail && showTail ? C.accent : C.border}
                  strokeWidth="1.2"
                />
                {k % labelEvery === 0 && (
                  <text
                    x={CHART.x0 + slot * (k + 0.5)}
                    y={CHART.yBase + 16}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {k}
                  </text>
                )}
              </g>
            );
          })}
          <text
            x={CHART.x0 - 8}
            y={CHART.yTop}
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            {pct(maxPmf)}
          </text>
          <text
            x={CHART.x0 - 8}
            y={CHART.yBase}
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            0
          </text>
          <text
            x={(CHART.x0 + CHART.x1) / 2}
            y={CHART.yBase + 36}
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            成功次数 k（共 n = {n} 次试验）
          </text>

          {showMean && (
            <g>
              <line
                x1={muX}
                y1={CHART.yTop - 6}
                x2={muX}
                y2={CHART.yBase}
                stroke={C.success}
                strokeWidth="2.5"
                strokeDasharray="7 5"
              />
              <text
                x={muX}
                y={CHART.yTop - 14}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.success}
              >
                μ = np = {mu.toFixed(1)}
              </text>
            </g>
          )}

          <g>
            <line
              x1={thrX}
              y1={CHART.yTop - 6}
              x2={thrX}
              y2={CHART.yBase}
              stroke={fault ? C.warning : C.danger}
              strokeWidth="2.5"
            />
            <text
              x={thrX}
              y={CHART.yBase + 56}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={fault ? C.warning : C.danger}
            >
              t = {t}
            </text>
          </g>

          {/* 右侧面板：阶段讲解 + 实时读数 */}
          <rect
            x="640"
            y="132"
            width="230"
            height="452"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="660" y="160" fontSize="13" fontWeight="700" fill={C.accent}>
            {STAGE_TITLES[activeIndex]}
          </text>
          {STAGE_NOTES[STEPS[activeIndex].label].map((line, i) => (
            <text
              key={"note-" + i}
              x="660"
              y={186 + i * 20}
              fontSize="11"
              fill={C.primary}
            >
              {line.length > 21 ? line.slice(0, 21) + "…" : line}
            </text>
          ))}

          {activeIndex === 0 && (
            <g>
              <line
                x1="755"
                y1="262"
                x2="700"
                y2="300"
                stroke={C.border}
                strokeWidth="1.5"
              />
              <line
                x1="755"
                y1="262"
                x2="810"
                y2="300"
                stroke={C.border}
                strokeWidth="1.5"
              />
              <circle
                cx="755"
                cy="254"
                r="12"
                fill={C.accent}
                fillOpacity="0.15"
                stroke={C.accent}
                strokeWidth="1.5"
              />
              <text
                x="755"
                y="259"
                textAnchor="middle"
                fontSize="11"
                fill={C.accent}
              >
                ·
              </text>
              {(["S", "F"] as const).map((ch, i) => (
                <g key={"l1-" + ch}>
                  <circle
                    cx={i === 0 ? 700 : 810}
                    cy="310"
                    r="13"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={i === 0 ? 700 : 810}
                    y="315"
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.primary}
                  >
                    {ch}
                  </text>
                </g>
              ))}
              {TREE_DEPTH3.map(([x, y, seq], i) => (
                <g key={"leaf-" + seq}>
                  <line
                    x1={i < 4 ? 700 : 810}
                    y1="322"
                    x2={x}
                    y2={y - 14}
                    stroke={C.border}
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill={C.elevated}
                    stroke={seq[2] === "S" ? C.accent : C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.primary}
                  >
                    {seq}
                  </text>
                </g>
              ))}
              <text x="660" y="262" fontSize="11" fill={C.secondary}>
                深度 3 的树：2³ = 8 个序列
              </text>
            </g>
          )}

          {activeIndex === 1 && (
            <g>
              <text
                x="660"
                y="272"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                C({n}, {Math.min(t, n)}) = {binom(n, Math.min(t, n))}
              </text>
              <text x="660" y="294" fontSize="11" fill={C.secondary}>
                为 {Math.min(t, n)} 次成功挑位置的方式数
              </text>
              <text x="660" y="316" fontSize="11" fill={C.secondary}>
                2^{n} = {Math.pow(2, n)} 个序列中占{" "}
                {pct(binom(n, Math.min(t, n)) / Math.pow(2, n))}
              </text>
              <text x="660" y="338" fontSize="11" fill={C.secondary}>
                计数即概率的分母与分子
              </text>
            </g>
          )}

          {activeIndex === 2 && (
            <g>
              <circle
                cx="712"
                cy="300"
                r="42"
                fill={C.accent}
                fillOpacity="0.12"
                stroke={C.accent}
                strokeWidth="2"
              />
              <circle
                cx="782"
                cy="300"
                r="42"
                fill={C.success}
                fillOpacity="0.1"
                stroke={C.success}
                strokeWidth="2"
              />
              <text
                x="692"
                y="272"
                fontSize="12"
                fontWeight="700"
                fill={C.accent}
              >
                A
              </text>
              <text
                x="806"
                y="272"
                fontSize="12"
                fontWeight="700"
                fill={C.success}
              >
                B
              </text>
              <text
                x="712"
                y="296"
                textAnchor="middle"
                fontSize="11"
                fill={C.primary}
              >
                A−B
              </text>
              <text
                x="782"
                y="296"
                textAnchor="middle"
                fontSize="11"
                fill={C.primary}
              >
                B−A
              </text>
              <text
                x="747"
                y="306"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={C.primary}
              >
                ∩
              </text>
              <text x="660" y="368" fontSize="11" fill={C.secondary}>
                P(A∪B) = P(A) + P(B) − P(A∩B)
              </text>
              <text x="660" y="388" fontSize="11" fill={C.secondary}>
                条件化 = 只活在 B 的圆里重新归一化
              </text>
            </g>
          )}

          <text x="660" y="432" fontSize="12" fontWeight="700" fill={C.primary}>
            实时读数
          </text>
          <text x="660" y="454" fontSize="11" fill={C.secondary}>
            μ = np = {mu.toFixed(2)}，σ² = np(1−p) = {variance.toFixed(2)}
          </text>
          <text
            x="660"
            y="476"
            fontSize="11"
            fontWeight="700"
            fill={fault ? C.warning : C.accent}
          >
            {fault
              ? `数错方向：P(X≤${t}) = ${pct(tailDown)}`
              : `精确上尾：P(X≥${t}) = ${pct(tailUp)}`}
          </text>
          <text x="660" y="498" fontSize="11" fill={C.secondary}>
            Markov ≤ {pct(markov)} · Chebyshev ≤ {pct(cheby)}
          </text>
          <text x="660" y="520" fontSize="11" fill={C.secondary}>
            {chernoffOk
              ? `Chernoff ≤ ${pct(chernoff!)}（δ = ${delta.toFixed(2)}）`
              : "Chernoff 前提不满足（需 0<δ≤1）"}
          </text>
          <text x="660" y="542" fontSize="11" fill={C.secondary}>
            界 ≥ 精确值即合法，越贴近越紧
          </text>

          {fault ? (
            <g>
              <text
                x="660"
                y="564"
                fontSize="11"
                fontWeight="700"
                fill={C.warning}
              >
                故障：把 &#123;X≥t&#125; 数成 &#123;X≤t&#125;
              </text>
              <text x="660" y="582" fontSize="11" fill={C.secondary}>
                现象：阴影跑到了阈值左边，概率被低估或高估；
              </text>
              <text x="660" y="600" fontSize="11" fill={C.secondary}>
                修法：先写出事件 &#123;X≥t&#125;，再数它盖住哪些柱子。
              </text>
            </g>
          ) : (
            <text x="660" y="564" fontSize="11" fill={C.success}>
              阴影方向与事件 &#123;X≥t&#125; 一致
            </text>
          )}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="证据链六步：先数结果，再称概率，最后才有资格写“以高概率成立”。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置计数与概率实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一个
        Bin(n,p)：柱子是精确概率，虚线是均值，竖线是阈值，读数是三个尾界——拖动
        n、p、t 看它们如何一起动。
      </figcaption>
    </figure>
  );
}
