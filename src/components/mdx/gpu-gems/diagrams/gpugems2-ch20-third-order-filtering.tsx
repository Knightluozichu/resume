"use client";

import { useMemo, useState, type ReactNode } from "react";

type FilterMode = "third order" | "linear baseline" | "kernel debug";

const COLORS = {
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

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = COLORS.accent,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
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

export function GpuGems2Ch20FilteringPipelineDiagram() {
  return (
    <Figure>
      <Frame label="三阶纹理过滤流程：纹理采样、三阶核重建、可分离的水平与垂直过滤，最后输出连续颜色">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Fast Third-Order Texture Filtering：从 texel 到连续重建
        </text>
        <rect
          x="30"
          y="92"
          width="154"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="107"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          纹理输入
        </text>
        <text
          x="107"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          texel grid
        </text>
        <text
          x="107"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          UV · footprint
        </text>
        <text
          x="107"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          phase · mip
        </text>
        <Arrow x1={202} y1={186} x2={240} y2={186} />
        <rect
          x="252"
          y="92"
          width="182"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="343"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          kernel 重建
        </text>
        <text
          x="343"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          third-order basis
        </text>
        <text
          x="343"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          four support texels
        </text>
        <text
          x="343"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          bilinear fusion
        </text>
        <Arrow x1={452} y1={186} x2={490} y2={186} color={COLORS.success} />
        <rect
          x="502"
          y="92"
          width="188"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="596"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          输出颜色
        </text>
        <text
          x="596"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          horizontal pass
        </text>
        <text
          x="596"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          vertical pass
        </text>
        <text
          x="596"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          smooth result
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          快速的关键不是少算权重，而是让硬件线性采样承担一部分三阶组合
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch20KernelDiagram() {
  return (
    <Figure>
      <Frame label="一维三阶核图：四个相邻 texel 参与重建，优化形式把权重配成两个线性采样位置">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          third-order kernel：四个邻居，两个硬件线性 fetch
        </text>
        <line
          x1="74"
          y1="226"
          x2="646"
          y2="226"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {[0, 1, 2, 3].map((index) => {
          const x = 142 + index * 136;
          return (
            <g key={`texel-${index}`}>
              <circle
                cx={x}
                cy={226}
                r="17"
                fill={
                  index === 1 || index === 2 ? COLORS.accent : COLORS.secondary
                }
                fillOpacity="0.25"
                stroke={
                  index === 1 || index === 2 ? COLORS.accent : COLORS.border
                }
                strokeWidth="3"
              />
              <text
                x={x}
                y="272"
                textAnchor="middle"
                fontSize="13"
                fill={COLORS.text}
              >
                f{index}
              </text>
              <text
                x={x}
                y="184"
                textAnchor="middle"
                fontSize="13"
                fill={COLORS.secondary}
              >
                w{index}
              </text>
            </g>
          );
        })}
        <rect
          x="154"
          y="96"
          width="180"
          height="44"
          rx="12"
          fill={COLORS.surface}
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <text
          x="244"
          y="124"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          linear fetch A ≈ f0 + f1
        </text>
        <Arrow x1={244} y1={146} x2={210} y2={204} color={COLORS.warning} />
        <rect
          x="386"
          y="96"
          width="180"
          height="44"
          rx="12"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="476"
          y="124"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          linear fetch B ≈ f2 + f3
        </text>
        <Arrow x1={476} y1={146} x2={482} y2={204} color={COLORS.success} />
        <path
          d="M244 316 C310 292 410 292 476 316"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <text
          x="360"
          y="350"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          再用两个组合权重混合 A、B；相位改变时仍需保证 support 不越界
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch20SeparableDiagram() {
  return (
    <Figure>
      <Frame label="可分离三阶过滤图：先沿水平方向重建中间结果，再沿垂直方向重建最终像素">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          separable filtering：二维核拆成两个一维 pass
        </text>
        <rect
          x="46"
          y="84"
          width="168"
          height="202"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="130"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          二维 texel
        </text>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((column) => (
            <rect
              key={`source-${row}-${column}`}
              x={76 + column * 27}
              y={144 + row * 27}
              width="21"
              height="21"
              rx="4"
              fill={row === 1 && column === 2 ? COLORS.warning : COLORS.accent}
              fillOpacity="0.18"
              stroke={COLORS.border}
            />
          )),
        )}
        <Arrow x1={234} y1={185} x2={276} y2={185} />
        <rect
          x="288"
          y="84"
          width="168"
          height="202"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="372"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          horizontal
        </text>
        <path
          d="M318 164 H426 M318 191 H426 M318 218 H426"
          stroke={COLORS.accent}
          strokeWidth="5"
          strokeOpacity="0.35"
        />
        <text
          x="372"
          y="257"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每行一维重建
        </text>
        <Arrow x1={476} y1={185} x2={518} y2={185} color={COLORS.success} />
        <rect
          x="530"
          y="84"
          width="144"
          height="202"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="602"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          vertical
        </text>
        <path
          d="M565 150 V234 M592 150 V234 M619 150 V234"
          stroke={COLORS.success}
          strokeWidth="5"
          strokeOpacity="0.35"
        />
        <text
          x="602"
          y="257"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每列一维重建
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          separable 假设把乘法与访存拆开管理，但仍要检查两个 pass 的边界和 mip
          一致性
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch20FootprintDiagram() {
  return (
    <Figure>
      <Frame label="纹理 footprint 与过滤误差图：屏幕像素覆盖范围决定采样级别，过窄或过宽的核都会造成 aliasing 或过度模糊">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          texture footprint：核宽度必须匹配屏幕覆盖
        </text>
        <path
          d="M52 278 H668 M52 278 V74"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        <text
          x="360"
          y="315"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          screen-space footprint →
        </text>
        <text
          x="26"
          y="170"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
          transform="rotate(-90 26 170)"
        >
          detail retained
        </text>
        <path
          d="M70 250 C160 206 218 228 292 166 S420 146 486 102 S588 94 650 80"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <path
          d="M70 246 L116 214 L162 250 L208 196 L254 244 L300 182 L346 224 L392 146 L438 212 L484 118 L530 176 L576 100 L622 140 L650 80"
          fill="none"
          stroke={COLORS.danger}
          strokeWidth="3"
          strokeDasharray="5 7"
        />
        <rect
          x="84"
          y="88"
          width="182"
          height="52"
          rx="12"
          fill={COLORS.surface}
          stroke={COLORS.danger}
          strokeWidth="2"
        />
        <text
          x="175"
          y="110"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.danger}
        >
          kernel too narrow
        </text>
        <text
          x="175"
          y="129"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          aliasing / shimmer
        </text>
        <rect
          x="454"
          y="214"
          width="182"
          height="52"
          rx="12"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="545"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          matched footprint
        </text>
        <text
          x="545"
          y="255"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          detail without ringing
        </text>
        <text
          x="360"
          y="350"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          三阶重建提高连续性，但不会凭空恢复已经被 minification 丢失的频率
        </text>
      </Frame>
    </Figure>
  );
}

type SignalPoint = { x: number; y: number };

const SOURCE_SIGNAL = Array.from({ length: 18 }, (_, index) =>
  round(
    0.48 +
      Math.sin(index * 0.72) * 0.23 +
      Math.cos(index * 1.71) * 0.13 +
      (index % 4 === 0 ? 0.08 : 0),
  ),
);

function linearSample(values: number[], position: number): number {
  const clamped = Math.max(0, Math.min(values.length - 1, position));
  const left = Math.floor(clamped);
  const right = Math.min(values.length - 1, left + 1);
  const fraction = clamped - left;
  return values[left] * (1 - fraction) + values[right] * fraction;
}

function cubicSample(
  values: number[],
  position: number,
  support: number,
): number {
  const base = Math.floor(position);
  const fraction = position - base;
  const p0 = values[Math.max(0, base - 1)] ?? values[0];
  const p1 =
    values[Math.max(0, Math.min(values.length - 1, base))] ?? values[0];
  const p2 =
    values[Math.max(0, Math.min(values.length - 1, base + 1))] ??
    values[values.length - 1];
  const p3 =
    values[Math.max(0, Math.min(values.length - 1, base + 2))] ??
    values[values.length - 1];
  const tension = 0.35 + support * 0.04;
  const a =
    -tension * p0 + (2 - tension) * p1 + (tension - 2) * p2 + tension * p3;
  const b =
    2 * tension * p0 +
    (tension - 3) * p1 +
    (3 - 2 * tension) * p2 -
    tension * p3;
  const c = -tension * p0 + tension * p2;
  return round(a * fraction ** 3 + b * fraction ** 2 + c * fraction + p1);
}

function FilteringScene({
  mode,
  phase,
  support,
  resolution,
}: {
  mode: FilterMode;
  phase: number;
  support: number;
  resolution: number;
}) {
  const samples = useMemo<SignalPoint[]>(() => {
    const count = Math.max(12, Math.round(resolution));
    return Array.from({ length: count }, (_, index) => {
      const position = (index / (count - 1)) * (SOURCE_SIGNAL.length - 1);
      const value =
        mode === "linear baseline"
          ? linearSample(SOURCE_SIGNAL, position)
          : cubicSample(SOURCE_SIGNAL, position, support);
      return {
        x: round(48 + (index / (count - 1)) * 466),
        y: round(286 - value * 190),
      };
    });
  }, [mode, resolution, support]);
  const targetPosition = (phase / 100) * (SOURCE_SIGNAL.length - 1);
  const targetValue =
    mode === "linear baseline"
      ? linearSample(SOURCE_SIGNAL, targetPosition)
      : cubicSample(SOURCE_SIGNAL, targetPosition, support);
  const targetX = round(48 + (phase / 100) * 466);
  const targetY = round(286 - targetValue * 190);
  const path = samples
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const fetches =
    mode === "linear baseline" ? 1 : mode === "kernel debug" ? 4 : 2;
  const label =
    mode === "linear baseline"
      ? "linear baseline：一次线性采样"
      : mode === "kernel debug"
        ? "kernel debug：显示 support 与权重"
        : "third order：优化三阶重建";

  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label="三阶纹理过滤交互实验：对比线性基线与快速三阶重建的连续曲线、采样数量和相位"
      className="block h-auto w-full"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        {label}
      </text>
      <rect
        x="28"
        y="52"
        width="500"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d="M48 286 H514 M48 96 V286"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d="M48 191 H514"
        stroke={COLORS.border}
        strokeWidth="1"
        strokeDasharray="5 5"
      />
      {SOURCE_SIGNAL.map((value, index) => {
        const x = round(48 + (index / (SOURCE_SIGNAL.length - 1)) * 466);
        const y = round(286 - value * 190);
        return (
          <circle
            key={`source-${index}`}
            cx={x}
            cy={y}
            r="4"
            fill={COLORS.secondary}
            fillOpacity="0.7"
          />
        );
      })}
      <path
        d={path}
        fill="none"
        stroke={mode === "linear baseline" ? COLORS.warning : COLORS.accent}
        strokeWidth="4"
      />
      {mode === "kernel debug" && (
        <path
          d={`M${targetX - 54} 286 V${targetY} M${targetX + 54} 286 V${targetY}`}
          stroke={COLORS.success}
          strokeWidth="2"
          strokeDasharray="7 5"
        />
      )}
      <circle
        cx={targetX}
        cy={targetY}
        r="8"
        fill={COLORS.success}
        stroke={COLORS.bg}
        strokeWidth="3"
      />
      <text x="50" y="315" fontSize="12" fill={COLORS.secondary}>
        source texels
      </text>
      <text
        x="410"
        y="315"
        fontSize="12"
        fill={mode === "linear baseline" ? COLORS.warning : COLORS.accent}
      >
        {phase}% phase
      </text>
      <rect
        x="546"
        y="52"
        width="144"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="618"
        y="82"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        查询记录
      </text>
      <text x="560" y="120" fontSize="12" fill={COLORS.secondary}>
        filter
      </text>
      <text
        x="676"
        y="120"
        textAnchor="end"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {mode === "linear baseline" ? "linear" : "third"}
      </text>
      <text x="560" y="153" fontSize="12" fill={COLORS.secondary}>
        fetches
      </text>
      <text
        x="676"
        y="153"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {fetches}
      </text>
      <text x="560" y="186" fontSize="12" fill={COLORS.secondary}>
        support
      </text>
      <text
        x="676"
        y="186"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {support}
      </text>
      <text x="560" y="219" fontSize="12" fill={COLORS.secondary}>
        resolution
      </text>
      <text
        x="676"
        y="219"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        {resolution}
      </text>
      <text
        x="618"
        y="265"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        绿色 = 查询点
      </text>
      <text
        x="618"
        y="287"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        灰点 = 原 texel
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        改变 phase 观察重建连续性；改变 resolution 观察过滤与细节保留的交换
      </text>
    </svg>
  );
}

export function GpuGems2Ch20ThirdOrderFilteringLab() {
  const [mode, setMode] = useState<FilterMode>("third order");
  const [phase, setPhase] = useState(43);
  const [support, setSupport] = useState(2);
  const [resolution, setResolution] = useState(18);

  function reset() {
    setMode("third order");
    setPhase(43);
    setSupport(2);
    setResolution(18);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 20 快速三阶纹理过滤实验"
      data-visual-kind="gpu-gems2-ch20-third-order-filtering"
      data-unit-id="gpg-v2-20"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Fast third-order filtering 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          对比线性基线与三阶重建，观察 phase、kernel support
          和纹理分辨率如何影响连续性与采样成本。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <FilteringScene
            mode={mode}
            phase={phase}
            support={support}
            resolution={resolution}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            {(
              ["third order", "linear baseline", "kernel debug"] as FilterMode[]
            ).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                aria-pressed={mode === nextMode}
                onClick={() => setMode(nextMode)}
                className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {nextMode === "third order"
                  ? "三阶重建"
                  : nextMode === "linear baseline"
                    ? "线性基线"
                    : "Kernel 调试"}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            sample phase：{phase}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="1"
              value={phase}
              onChange={(event) => setPhase(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            kernel support：{support}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="4"
              step="1"
              value={support}
              onChange={(event) => setSupport(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            texture resolution：{resolution}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="12"
              max="32"
              step="2"
              value={resolution}
              onChange={(event) => setResolution(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "linear baseline"
              ? "线性过滤成本低，但 phase 穿过 texel 时只有一阶连续性；它不是三阶核的等价物。"
              : mode === "kernel debug"
                ? "调试模式突出 support 与查询点；优化三阶形式可用更少硬件 fetch，但边界仍需单独处理。"
                : "三阶重建更平滑，但必须结合 footprint、mip 与 ringing 检查，不能只看单点曲线。"}
          </p>
          <button
            type="button"
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            onClick={reset}
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
