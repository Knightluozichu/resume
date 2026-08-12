"use client";

import { useMemo, useState, type ReactNode } from "react";

type SamplingMode = "uniform" | "importance" | "stratified" | "mismatch";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function Cgp30ProbabilityPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="概率建模流程图：样本空间经过随机变量和概率分布得到可计算的期望">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          probability：从不确定性到可计算的期望
        </text>
        <rect
          x="34"
          y="96"
          width="152"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="110"
          y="132"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          样本空间
        </text>
        <circle cx="88" cy="190" r="12" fill={COLORS.accent} />
        <circle
          cx="126"
          cy="176"
          r="12"
          fill={COLORS.accent}
          fillOpacity="0.65"
        />
        <circle
          cx="112"
          cy="222"
          r="12"
          fill={COLORS.accent}
          fillOpacity="0.35"
        />
        <text
          x="110"
          y="250"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          可能结果 Ω
        </text>
        <Arrow x1={202} y1={185} x2={238} y2={185} color={COLORS.accent} />
        <rect
          x="250"
          y="96"
          width="152"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="326"
          y="132"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          随机变量
        </text>
        <text
          x="326"
          y="182"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          X : Ω → R
        </text>
        <text
          x="326"
          y="226"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          把结果映射为数值
        </text>
        <Arrow x1={418} y1={185} x2={454} y2={185} color={COLORS.success} />
        <rect
          x="466"
          y="96"
          width="220"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="576"
          y="132"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          分布与期望
        </text>
        <text
          x="576"
          y="180"
          textAnchor="middle"
          fontSize="16"
          fill={COLORS.success}
        >
          p(x) · E[g(X)]
        </text>
        <text
          x="576"
          y="226"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          概率决定每个结果的权重
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          不确定性不是噪声借口；必须声明结果、分布与测度
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp30MonteCarloEstimatorDiagram() {
  return (
    <Figure>
      <SvgFrame label="蒙特卡洛积分估计图：用来自概率密度的样本均值估计目标积分">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          monte carlo integration：积分变成样本均值
        </text>
        <rect
          x="34"
          y="88"
          width="174"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="121"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          目标积分
        </text>
        <text
          x="121"
          y="174"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          I = ∫ f(x) dx
        </text>
        <text
          x="121"
          y="220"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          连续区域上的总量
        </text>
        <Arrow x1={226} y1={186} x2={262} y2={186} color={COLORS.accent} />
        <rect
          x="274"
          y="88"
          width="172"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          随机样本
        </text>
        <circle cx="320" cy="174" r="7" fill={COLORS.success} />
        <circle cx="360" cy="202" r="7" fill={COLORS.success} />
        <circle cx="400" cy="158" r="7" fill={COLORS.success} />
        <text
          x="360"
          y="244"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Xᵢ ~ p(x)
        </text>
        <Arrow x1={464} y1={186} x2={500} y2={186} color={COLORS.success} />
        <rect
          x="512"
          y="88"
          width="174"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="599"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          无偏估计量
        </text>
        <text
          x="599"
          y="174"
          textAnchor="middle"
          fontSize="16"
          fill={COLORS.success}
        >
          Î = 1/N Σ f(Xᵢ)/p(Xᵢ)
        </text>
        <text
          x="599"
          y="222"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          期望接近 I，波动由方差描述
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          样本来自谁，权重就必须除以谁的概率密度
        </text>
      </SvgFrame>
    </Figure>
  );
}

function curvePath({
  x,
  y,
  width,
  height,
  variant,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  variant: "target" | "uniform" | "importance";
}) {
  const points = Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    const target = 0.16 + 0.78 * Math.pow(Math.sin(Math.PI * t), 2);
    const value =
      variant === "target"
        ? target
        : variant === "importance"
          ? 0.2 + 0.76 * Math.pow(Math.sin(Math.PI * t), 4)
          : 0.5 + 0.16 * Math.sin(Math.PI * t * 2);
    return [round(x + t * width), round(y + height - value * height)] as const;
  });
  return points
    .map(([px, py], index) => `${index === 0 ? "M" : "L"}${px} ${py}`)
    .join(" ");
}

export function Cgp30SamplingVarianceDiagram() {
  const panels = [
    {
      x: 34,
      title: "均匀采样",
      variant: "uniform" as const,
      color: COLORS.accent,
    },
    {
      x: 258,
      title: "重要性采样",
      variant: "importance" as const,
      color: COLORS.success,
    },
    {
      x: 482,
      title: "分层采样",
      variant: "target" as const,
      color: COLORS.warning,
    },
  ];
  return (
    <Figure>
      <SvgFrame label="采样策略比较图：均匀、重要性和分层采样在高贡献区域的样本分布不同">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          方差不是偏差：改变样本分布但保持权重一致
        </text>
        {panels.map(({ x, title, variant, color }) => (
          <g key={title}>
            <rect
              x={x}
              y="80"
              width="204"
              height="222"
              rx="16"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text
              x={x + 102}
              y="114"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.text}
            >
              {title}
            </text>
            <line
              x1={x + 28}
              y1="258"
              x2={x + 178}
              y2="258"
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <line
              x1={x + 28}
              y1="136"
              x2={x + 28}
              y2="258"
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <path
              d={curvePath({
                x: x + 28,
                y: 136,
                width: 150,
                height: 122,
                variant: "target",
              })}
              fill="none"
              stroke={COLORS.secondary}
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d={curvePath({
                x: x + 28,
                y: 136,
                width: 150,
                height: 122,
                variant,
              })}
              fill="none"
              stroke={color}
              strokeWidth="4"
            />
            {Array.from({ length: 7 }, (_, index) => {
              const t = (index + 0.5) / 7;
              const pointY =
                variant === "importance"
                  ? 244 - 76 * Math.pow(Math.sin(Math.PI * t), 2)
                  : variant === "target"
                    ? 244 - 52 * Math.pow(Math.sin(Math.PI * t), 2)
                    : 244 - 12 * Math.sin(Math.PI * t);
              return (
                <circle
                  key={`${title}-${index}`}
                  cx={round(x + 28 + t * 150)}
                  cy={round(pointY)}
                  r="5"
                  fill={color}
                />
              );
            })}
            <text
              x={x + 102}
              y="284"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              虚线：目标函数 · 实线：采样关注区域
            </text>
          </g>
        ))}
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          重要性采样降低高贡献区域的浪费，不能用错误权重换取“更平滑”的假结果
        </text>
      </SvgFrame>
    </Figure>
  );
}

function targetFunction(x: number): number {
  return 0.2 + 0.8 * Math.pow(Math.sin(Math.PI * x), 2);
}

function samplePoint(index: number, count: number, mode: SamplingMode): number {
  const base = (index * 0.61803398875 + 0.1732050807) % 1;
  if (mode === "stratified") {
    return round((index + 0.5 + (base - 0.5) * 0.55) / count);
  }
  if (mode === "importance" || mode === "mismatch") {
    return round(0.5 - 0.5 * Math.cos(Math.PI * base));
  }
  return round(base);
}

function proposalDensity(x: number, mode: SamplingMode): number {
  if (mode === "importance" || mode === "mismatch") {
    return 0.35 + 1.3 * Math.sin(Math.PI * x);
  }
  return 1;
}

export function Cgp30MonteCarloLab() {
  const [mode, setMode] = useState<SamplingMode>("uniform");
  const [samples, setSamples] = useState(24);
  const [strata, setStrata] = useState(6);

  function reset() {
    setMode("uniform");
    setSamples(24);
    setStrata(6);
  }

  const points = useMemo(
    () =>
      Array.from({ length: samples }, (_, index) =>
        samplePoint(index, samples, mode),
      ),
    [mode, samples],
  );
  const weights = points.map((x) => {
    const density = proposalDensity(x, mode === "mismatch" ? "uniform" : mode);
    const numerator = targetFunction(x);
    return mode === "mismatch"
      ? numerator / Math.max(0.3, density)
      : numerator / density;
  });
  const estimate = round(
    weights.reduce((sum, value) => sum + value, 0) /
      Math.max(1, weights.length),
  );
  const mean =
    weights.length === 0
      ? 0
      : weights.reduce((sum, value) => sum + value, 0) / weights.length;
  const variance = round(
    weights.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      Math.max(1, weights.length - 1),
  );
  const target = 0.6;
  const error = round(Math.abs(estimate - target));
  const pointColor =
    mode === "mismatch"
      ? COLORS.warning
      : mode === "importance"
        ? COLORS.success
        : COLORS.accent;

  return (
    <section
      aria-label="概率与蒙特卡洛积分专属实验"
      data-visual-kind="cgp-30-probability-and-monte-carlo"
      data-unit-id="cgp-30"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp30 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            概率与蒙特卡洛积分专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            选择样本分布，观察样本点、单样本权重、估计值与经验方差；mismatch
            模式故意使用错配权重。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置概率与蒙特卡洛积分实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择采样策略">
        {(["uniform", "importance", "stratified", "mismatch"] as const).map(
          (option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className={
                "min-h-11 rounded-control border px-3 py-2 text-sm " +
                (mode === option
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary")
              }
            >
              {option}
            </button>
          ),
        )}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-2">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>样本数</span>
            <span className="font-mono text-primary">{samples}</span>
          </span>
          <input
            type="range"
            min="8"
            max="64"
            step="8"
            value={samples}
            onChange={(event) => setSamples(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>分层数量</span>
            <span className="font-mono text-primary">{strata}</span>
          </span>
          <input
            type="range"
            min="2"
            max="12"
            step="2"
            value={strata}
            onChange={(event) => setStrata(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="蒙特卡洛积分实验图：目标函数曲线、随机样本点和样本权重"
          className="block h-auto w-full"
        >
          <rect width="720" height="320" rx="14" fill={COLORS.bg} />
          <text
            x="360"
            y="27"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            {mode}：样本点与估计量
          </text>
          <line
            x1="58"
            y1="252"
            x2="662"
            y2="252"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="58"
            y1="62"
            x2="58"
            y2="252"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path
            d={Array.from({ length: 49 }, (_, index) => {
              const x = index / 48;
              const px = round(58 + x * 604);
              const py = round(252 - targetFunction(x) * 190);
              return `${index === 0 ? "M" : "L"}${px} ${py}`;
            }).join(" ")}
            fill="none"
            stroke={COLORS.secondary}
            strokeWidth="3"
            strokeDasharray="7 5"
          />
          {points.map((x, index) => {
            const px = round(58 + x * 604);
            const py = round(252 - targetFunction(x) * 190);
            const barHeight = round(Math.max(8, weights[index] * 48));
            return (
              <g key={`${mode}-${index}`}>
                <line
                  x1={px}
                  y1="252"
                  x2={px}
                  y2={round(252 - barHeight)}
                  stroke={pointColor}
                  strokeWidth="3"
                  strokeOpacity="0.35"
                />
                <circle cx={px} cy={py} r="5" fill={pointColor} />
              </g>
            );
          })}
          <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
            0
          </text>
          <text
            x="650"
            y="278"
            textAnchor="end"
            fontSize="13"
            fill={COLORS.secondary}
          >
            1
          </text>
          <text
            x="360"
            y="304"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            虚线：目标函数 · 圆点：样本 · 竖线：单样本权重 · 分层 {strata}
          </text>
        </svg>
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-3"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">估计值</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {estimate.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">经验方差</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {variance.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">与基线差值</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {error.toFixed(3)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        先预测：增加样本数通常降低均值的波动；切换到 mismatch
        后，即使图形更平滑，也可能因为 PDF 错配而产生偏差。
      </p>
    </section>
  );
}
