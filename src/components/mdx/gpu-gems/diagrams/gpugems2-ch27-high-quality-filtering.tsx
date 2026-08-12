"use client";

import { useMemo, useState, type ReactNode } from "react";

type FilterMode = "deblur" | "magnify" | "minify";
type KernelMode = "bilinear" | "gaussian" | "sinc";

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

const SIGNAL = [
  0.08, 0.12, 0.1, 0.18, 0.9, 0.94, 0.82, 0.28, 0.16, 0.72, 0.88, 0.22,
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function sinc(value: number) {
  if (Math.abs(value) < 0.000001) return 1;
  const x = Math.PI * value;
  return Math.sin(x) / x;
}

function kernelWeight(distance: number, kernel: KernelMode, radius: number) {
  const x = Math.abs(distance);
  if (kernel === "bilinear") return Math.max(0, 1 - x);
  if (x > radius) return 0;
  const sigma = Math.max(0.7, radius * 0.42);
  const gaussian = Math.exp(-(x * x) / (2 * sigma * sigma));
  return kernel === "gaussian" ? gaussian : sinc(distance) * gaussian;
}

function reconstruct(
  position: number,
  kernel: KernelMode,
  radius: number,
  mode: FilterMode,
  anisotropy: number,
) {
  const effectiveRadius = mode === "minify" ? radius * anisotropy : radius;
  let weighted = 0;
  let sum = 0;
  for (let index = 0; index < SIGNAL.length; index += 1) {
    const weight = kernelWeight(position - index, kernel, effectiveRadius);
    weighted += SIGNAL[index] * weight;
    sum += weight;
  }
  return sum === 0 ? 0 : weighted / sum;
}

function shockProfile(value: number, position: number, passes: number) {
  if (passes === 0) return value;
  const edge =
    0.5 + 0.46 * Math.tanh((position - 5.5) * (0.45 + passes * 0.22));
  return clamp(value * (1 - passes * 0.045) + edge * passes * 0.045);
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
      viewBox="0 0 720 400"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="400" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = COLORS.accent,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const p1 = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const p2 = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </>
  );
}

function Panel({
  height,
  stroke = COLORS.border,
  title,
  width,
  x,
  y,
}: {
  height: number;
  stroke?: string;
  title: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="15"
        fill={COLORS.surface}
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 31}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={stroke === COLORS.border ? COLORS.text : stroke}
      >
        {title}
      </text>
    </>
  );
}

function plotPath(
  values: number[],
  left: number,
  top: number,
  width: number,
  height: number,
) {
  return values
    .map((value, index) => {
      const x = left + (index / Math.max(1, values.length - 1)) * width;
      const y = top + (1 - value) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function GpuGems2Ch27TexelAccessDiagram() {
  return (
    <Figure>
      <Frame label="图像滤波坐标图：归一化 texture coordinate 先乘 texture size 并向下取整得到整数 sample coordinate，再加半个 texel 除以尺寸回到 texel center；point sampling 可自动吸附到最近样本">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          连续 texture coordinates 与离散 image samples 必须显式对齐
        </text>
        <Panel
          x={28}
          y={76}
          width={188}
          height={222}
          title="normalized coordinate"
        />
        <text
          x="122"
          y="143"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill={COLORS.accent}
        >
          u = 0.43
        </text>
        <line
          x1="58"
          y1="196"
          x2="186"
          y2="196"
          stroke={COLORS.border}
          strokeWidth="4"
        />
        <circle cx="113" cy="196" r="9" fill={COLORS.accent} />
        <text
          x="122"
          y="246"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          resolution-independent
        </text>
        <Arrow x1={230} y1={187} x2={268} y2={187} />
        <Panel
          x={280}
          y={76}
          width={188}
          height={222}
          title="integer sample"
          stroke={COLORS.warning}
        />
        <text
          x="374"
          y="143"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.warning}
        >
          floor(u · size)
        </text>
        {Array.from({ length: 6 }, (_, index) => (
          <rect
            key={`sample-${index}`}
            x={305 + index * 23}
            y="177"
            width="21"
            height="52"
            fill={index === 3 ? COLORS.warning : COLORS.bg}
            fillOpacity={index === 3 ? 0.3 : 1}
            stroke={COLORS.border}
          />
        ))}
        <text
          x="374"
          y="260"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          sampleCoord = 3
        </text>
        <Arrow x1={482} y1={187} x2={520} y2={187} color={COLORS.success} />
        <Panel
          x={532}
          y={76}
          width={160}
          height={222}
          title="texel center"
          stroke={COLORS.success}
        />
        <text
          x="612"
          y="143"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          (sample + 0.5)
        </text>
        <text
          x="612"
          y="172"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          ÷ texture size
        </text>
        <rect
          x="568"
          y="196"
          width="88"
          height="52"
          fill={COLORS.bg}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <circle cx="612" cy="222" r="9" fill={COLORS.success} />
        <text
          x="612"
          y="275"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          round-off safe
        </text>
        <text
          x="360"
          y="357"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          离散 kernel lookup 用 sample centers；只有 point filter 时才可让
          sampler 自动完成 snapping
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch27NormalizedConvolutionDiagram() {
  const weights = [0.08, 0.25, 0.44, 0.7, 0.96, 0.76, 0.48, 0.28, 0.1];
  return (
    <Figure>
      <Frame label="subpixel normalized convolution 图：连续 kernel 精确居中在非整数纹理位置，对邻域离散 texels 采样；RGB 累积颜色乘权重，alpha 累积权重总和，最后相除保证 steady-state response 为一">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          continuous kernel + discrete samples：每个 subpixel phase
          都要重新归一化
        </text>
        <Panel
          x={28}
          y={70}
          width={412}
          height={252}
          title="kernel centered at fractional coordinate"
          stroke={COLORS.accent}
        />
        <line
          x1="58"
          y1="258"
          x2="410"
          y2="258"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {weights.map((weight, index) => {
          const x = 74 + index * 40;
          const height = weight * 120;
          return (
            <g key={`weight-${index}`}>
              <rect
                x={x - 10}
                y={258 - height}
                width="20"
                height={height}
                rx="4"
                fill={COLORS.accent}
                fillOpacity={0.18 + weight * 0.6}
                stroke={COLORS.border}
              />
              <circle cx={x} cy="269" r="5" fill={COLORS.text} />
            </g>
          );
        })}
        <line
          x1="246"
          y1="104"
          x2="246"
          y2="280"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <text
          x="246"
          y="301"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.warning}
        >
          actual subpixel center
        </text>
        <Arrow x1={454} y1={196} x2={488} y2={196} color={COLORS.success} />
        <Panel
          x={500}
          y={70}
          width={192}
          height={252}
          title="one-pass accumulation"
          stroke={COLORS.success}
        />
        <text
          x="596"
          y="132"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          RGB = Σ color · weight
        </text>
        <text
          x="596"
          y="174"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          A = Σ weight
        </text>
        <line
          x1="532"
          y1="202"
          x2="660"
          y2="202"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="596"
          y="244"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          output = RGB / A
        </text>
        <text
          x="596"
          y="281"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          mean intensity preserved
        </text>
        <text
          x="360"
          y="369"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          连续 kernel 落在离散网格上时权重和随 phase
          改变，不做除法会产生亮度泵动
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch27KernelDecompositionDiagram() {
  return (
    <Figure>
      <Frame label="大卷积核实现图：小型二维 kernel 一次访问方形邻域；separable Gaussian 先逐行再逐列，用两次线性规模 pass 代替平方规模读取；超大非 separable kernel 分 tile 累加到浮点目标，最后统一归一化">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          kernel support 决定读取结构：2D、separable 或 tiled accumulation
        </text>
        <Panel
          x={24}
          y={72}
          width={202}
          height={244}
          title="direct 2D"
          stroke={COLORS.warning}
        />
        {Array.from({ length: 25 }, (_, index) => (
          <rect
            key={`direct-${index}`}
            x={61 + (index % 5) * 26}
            y={125 + Math.floor(index / 5) * 26}
            width="23"
            height="23"
            rx="3"
            fill={index === 12 ? COLORS.warning : COLORS.bg}
            stroke={COLORS.border}
          />
        ))}
        <text
          x="125"
          y="286"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          5×5 = 25 samples
        </text>
        <Arrow x1={240} y1={194} x2={270} y2={194} />
        <Panel
          x={282}
          y={72}
          width={202}
          height={244}
          title="separable"
          stroke={COLORS.success}
        />
        {Array.from({ length: 5 }, (_, index) => (
          <rect
            key={`row-${index}`}
            x={315 + index * 28}
            y="132"
            width="25"
            height="25"
            rx="3"
            fill={index === 2 ? COLORS.success : COLORS.bg}
            stroke={COLORS.border}
          />
        ))}
        <Arrow x1={383} y1={171} x2={383} y2={201} color={COLORS.success} />
        {Array.from({ length: 5 }, (_, index) => (
          <rect
            key={`column-${index}`}
            x="371"
            y={213 + index * 15}
            width="25"
            height="13"
            rx="3"
            fill={index === 2 ? COLORS.success : COLORS.bg}
            stroke={COLORS.border}
          />
        ))}
        <text
          x="383"
          y="297"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          5 + 5 = 10 samples
        </text>
        <Arrow x1={498} y1={194} x2={528} y2={194} />
        <Panel
          x={540}
          y={72}
          width={156}
          height={244}
          title="large tiled"
          stroke={COLORS.accent}
        />
        {[0, 1, 2, 3].map((index) => (
          <rect
            key={`tile-${index}`}
            x={568 + (index % 2) * 50}
            y={126 + Math.floor(index / 2) * 52}
            width="44"
            height="44"
            rx="6"
            fill={COLORS.accent}
            fillOpacity={0.1 + index * 0.08}
            stroke={COLORS.accent}
          />
        ))}
        <text
          x="618"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          float accumulation
        </text>
        <text
          x="618"
          y="282"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          divide once at end
        </text>
        <text
          x="360"
          y="369"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          两 pass 不总更快：小 kernel 要计 render-target 往返；超大 kernel
          才值得拆解或分 tile
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch27FootprintDiagram() {
  return (
    <Figure>
      <Frame label="quasi-optimal antialiasing footprint 图：屏幕空间一个像素的正方形采样区通过局部 texture-coordinate Jacobian 映射为纹理空间四边形；遍历保守 bounding box，并用 inverse Jacobian 把候选 texel 变回像素空间判断是否位于半像素范围内">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          pixel footprint 经 Jacobian 映射后不是轴对齐方块
        </text>
        <Panel x={28} y={74} width={210} height={242} title="screen space" />
        <rect
          x="83"
          y="135"
          width="100"
          height="100"
          fill={COLORS.accent}
          fillOpacity="0.12"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <circle cx="133" cy="185" r="8" fill={COLORS.accent} />
        <text
          x="133"
          y="270"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          pixel area: ±0.5
        </text>
        <Arrow x1={252} y1={194} x2={292} y2={194} />
        <Panel
          x={304}
          y={74}
          width={244}
          height={242}
          title="texture space · J"
          stroke={COLORS.warning}
        />
        <rect
          x="335"
          y="115"
          width="180"
          height="160"
          fill="none"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <polygon
          points="351,236 391,125 502,163 460,267"
          fill={COLORS.warning}
          fillOpacity="0.13"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        {Array.from({ length: 20 }, (_, index) => {
          const x = 350 + (index % 5) * 36;
          const y = 130 + Math.floor(index / 5) * 42;
          const inside = [1, 2, 6, 7, 8, 11, 12, 13, 17].includes(index);
          return (
            <circle
              key={`candidate-${index}`}
              cx={x}
              cy={y}
              r="6"
              fill={inside ? COLORS.success : COLORS.danger}
              fillOpacity={inside ? 0.9 : 0.35}
            />
          );
        })}
        <text
          x="426"
          y="298"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          bbox candidates · quadrilateral test
        </text>
        <Arrow x1={562} y1={194} x2={594} y2={194} color={COLORS.success} />
        <rect
          x="606"
          y="96"
          width="90"
          height="198"
          rx="13"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="651"
          y="130"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          J⁻¹ test
        </text>
        <text
          x="651"
          y="174"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          map back
        </text>
        <text
          x="651"
          y="211"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          |i| ≤ 0.5
        </text>
        <text
          x="651"
          y="241"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          |j| ≤ 0.5
        </text>
        <text
          x="651"
          y="274"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          average
        </text>
        <text
          x="360"
          y="369"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          只平均 fwidth 矩形会纳入 footprint 外
          texels；四边形测试能保留透视方向的锐度
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch27ReconstructionDiagram() {
  const bilinear = Array.from({ length: 45 }, (_, index) =>
    clamp((index - 14) / 16),
  );
  const gaussian = Array.from(
    { length: 45 },
    (_, index) => 0.5 + 0.48 * Math.tanh((index - 22) / 6),
  );
  const ringing = Array.from({ length: 45 }, (_, index) => {
    const x = index - 22;
    const base = x < 0 ? 0.08 : 0.92;
    return clamp(base + Math.sin(x * 1.2) * Math.exp(-Math.abs(x) / 5) * 0.18);
  });
  return (
    <Figure>
      <Frame label="图像放大重建比较图：bilinear 快但边缘模糊；Gaussian 无 ringing 但衰减细节；Gaussian-windowed sinc 更好保留原采样带宽，却会在合成锐边附近出现衰减振铃">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          reconstruction kernel 选择：细节保留与 edge ringing 的取舍
        </text>
        <line
          x1="52"
          y1="309"
          x2="668"
          y2="309"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="52"
          y1="86"
          x2="52"
          y2="309"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <path
          d={plotPath(bilinear, 52, 86, 616, 223)}
          fill="none"
          stroke={COLORS.border}
          strokeWidth="4"
        />
        <path
          d={plotPath(gaussian, 52, 86, 616, 223)}
          fill="none"
          stroke={COLORS.success}
          strokeWidth="4"
        />
        <path
          d={plotPath(ringing, 52, 86, 616, 223)}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <line
          x1="360"
          y1="72"
          x2="360"
          y2="326"
          stroke={COLORS.warning}
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <rect
          x="82"
          y="98"
          width="174"
          height="84"
          rx="11"
          fill={COLORS.surface}
          stroke={COLORS.border}
        />
        <text
          x="102"
          y="124"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.border}
        >
          bilinear · fuzzy
        </text>
        <text
          x="102"
          y="148"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.success}
        >
          Gaussian · no ringing
        </text>
        <text
          x="102"
          y="172"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.accent}
        >
          windowed sinc · detail
        </text>
        <text
          x="360"
          y="347"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          synthetic intensity step
        </text>
        <text
          x="360"
          y="378"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          自然图像常受益于 sinc 带宽保留；硬合成边缘更适合无振铃的 Gaussian
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch27ShockDiagram() {
  return (
    <Figure>
      <Frame label="shock filter 迭代图：五点邻域估计 gradient 与 second derivative 符号；凸区域沿反梯度、凹区域沿梯度搬运颜色，多次小步迭代把宽过渡收紧，但过强会产生 halo 和噪声放大">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          shock filtering：按二阶导数符号把模糊过渡推回陡峭边缘
        </text>
        <Panel
          x={28}
          y={74}
          width={216}
          height={236}
          title="five-sample estimate"
        />
        <circle cx="136" cy="190" r="18" fill={COLORS.accent} />
        {[
          [136, 132],
          [136, 248],
          [78, 190],
          [194, 190],
        ].map(([x, y], index) => (
          <g key={`neighbor-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="13"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="3"
            />
            <Arrow
              x1={x}
              y1={y}
              x2={136 + (x - 136) * 0.35}
              y2={190 + (y - 190) * 0.35}
              color={index % 2 ? COLORS.warning : COLORS.success}
            />
          </g>
        ))}
        <text
          x="136"
          y="286"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          gradient + convexity sign
        </text>
        <Arrow x1={258} y1={192} x2={292} y2={192} />
        <Panel
          x={304}
          y={74}
          width={388}
          height={236}
          title="iterative edge profile"
          stroke={COLORS.success}
        />
        {[
          { y: 132, width: 138, label: "input blur", color: COLORS.border },
          { y: 190, width: 88, label: "4 passes", color: COLORS.accent },
          { y: 248, width: 42, label: "8 passes", color: COLORS.success },
        ].map((profile) => (
          <g key={profile.label}>
            <path
              d={`M338 ${profile.y + 20} C${430 - profile.width / 2} ${profile.y + 20} ${430 - profile.width / 2} ${profile.y - 20} 498 ${profile.y - 20} C${498 + profile.width / 2} ${profile.y - 20} ${498 + profile.width / 2} ${profile.y - 48} 644 ${profile.y - 48}`}
              fill="none"
              stroke={profile.color}
              strokeWidth="4"
            />
            <text
              x="346"
              y={profile.y - 14}
              fontSize="12"
              fontWeight="700"
              fill={profile.color}
            >
              {profile.label}
            </text>
          </g>
        ))}
        <text
          x="498"
          y="291"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          small magnitude · many passes
        </text>
        <text
          x="360"
          y="369"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          shock filter 适合均匀二维模糊；透视场景中的非均匀 anisotropic blur
          需要额外分布信息
        </text>
      </Frame>
    </Figure>
  );
}

function FilteringScene({
  anisotropy,
  kernel,
  mode,
  radius,
  shockPasses,
}: {
  anisotropy: number;
  kernel: KernelMode;
  mode: FilterMode;
  radius: number;
  shockPasses: number;
}) {
  const values = useMemo(() => {
    return Array.from({ length: 96 }, (_, index) => {
      const position = (index / 95) * (SIGNAL.length - 1);
      const reconstructed = reconstruct(
        position,
        kernel,
        radius,
        mode,
        anisotropy,
      );
      return mode === "deblur"
        ? shockProfile(reconstructed, position, shockPasses)
        : clamp(reconstructed);
    });
  }, [anisotropy, kernel, mode, radius, shockPasses]);
  const phase = 4.37;
  let rawWeightSum = 0;
  for (let index = 0; index < SIGNAL.length; index += 1)
    rawWeightSum += kernelWeight(phase - index, kernel, radius);
  const squareTaps = (radius * 2 + 1) ** 2;
  const separableTaps = 2 * (radius * 2 + 1);
  const condition =
    kernel === "sinc" && radius >= 4
      ? "ringing visible near hard edges"
      : kernel === "gaussian"
        ? "smooth cutoff attenuates detail"
        : "fast linear reconstruction";

  return (
    <svg
      viewBox="0 0 720 440"
      role="img"
      aria-label="高级高质量过滤交互实验：在 magnification、minification 和 deblur 任务间切换，调节 bilinear、Gaussian、windowed sinc 核、radius、anisotropy 与 shock passes，观察重建曲线、采样 footprint 和读取规模"
      className="block h-auto w-full"
    >
      <rect width="720" height="440" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        high-quality filter lab · {mode} / {kernel}
      </text>
      <rect
        x="24"
        y="52"
        width="456"
        height="318"
        rx="14"
        fill={COLORS.surface}
        stroke={
          kernel === "sinc"
            ? COLORS.accent
            : kernel === "gaussian"
              ? COLORS.success
              : COLORS.border
        }
        strokeWidth="2"
      />
      <line
        x1="48"
        y1="318"
        x2="452"
        y2="318"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="48"
        y1="90"
        x2="48"
        y2="318"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {SIGNAL.map((value, index) => {
        const x = 48 + (index / (SIGNAL.length - 1)) * 404;
        const y = 90 + (1 - value) * 228;
        return (
          <circle
            key={`signal-${index}`}
            cx={x}
            cy={y}
            r="6"
            fill={COLORS.text}
          />
        );
      })}
      <path
        d={plotPath(values, 48, 90, 404, 228)}
        fill="none"
        stroke={
          kernel === "sinc"
            ? COLORS.accent
            : kernel === "gaussian"
              ? COLORS.success
              : COLORS.warning
        }
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x={206 - anisotropy * 18}
        y="330"
        width={anisotropy * 36}
        height="16"
        rx="5"
        fill={COLORS.warning}
        fillOpacity="0.2"
        stroke={COLORS.warning}
      />
      <text
        x="250"
        y="356"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        sample footprint · anisotropy {anisotropy}:1
      </text>
      <rect
        x="502"
        y="52"
        width="194"
        height="318"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="599"
        y="84"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        filter record
      </text>
      {[
        { label: "radius", value: `${radius} px`, color: COLORS.accent },
        { label: "2D taps", value: `${squareTaps}`, color: COLORS.warning },
        {
          label: "separable taps",
          value: `${separableTaps}`,
          color: COLORS.success,
        },
        {
          label: "raw weight Σ",
          value: rawWeightSum.toFixed(3),
          color:
            Math.abs(rawWeightSum - 1) > 0.05 ? COLORS.warning : COLORS.success,
        },
        {
          label: "shock passes",
          value: `${shockPasses}`,
          color: shockPasses > 6 ? COLORS.danger : COLORS.secondary,
        },
      ].map((metric, index) => (
        <g key={metric.label}>
          <text
            x="522"
            y={125 + index * 42}
            fontSize="12"
            fill={COLORS.secondary}
          >
            {metric.label}
          </text>
          <text
            x="676"
            y={125 + index * 42}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill={metric.color}
          >
            {metric.value}
          </text>
        </g>
      ))}
      <text
        x="599"
        y="342"
        textAnchor="middle"
        fontSize="11"
        fill={shockPasses > 6 ? COLORS.danger : COLORS.secondary}
      >
        {condition}
      </text>
      <text
        x="360"
        y="414"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.warning}
      >
        输出始终除以当前 phase 的 weight sum；kernel、footprint 与 deblur
        必须按任务分开验收
      </text>
    </svg>
  );
}

export function GpuGems2Ch27FilteringLab() {
  const [mode, setMode] = useState<FilterMode>("magnify");
  const [kernel, setKernel] = useState<KernelMode>("sinc");
  const [radius, setRadius] = useState(4);
  const [anisotropy, setAnisotropy] = useState(1);
  const [shockPasses, setShockPasses] = useState(0);

  function reset() {
    setMode("magnify");
    setKernel("sinc");
    setRadius(4);
    setAnisotropy(1);
    setShockPasses(0);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 27 高质量纹理过滤实验"
      data-visual-kind="gpu-gems2-ch27-high-quality-filtering"
      data-unit-id="gpg-v2-27"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Advanced High-Quality Filtering 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          先预测：在硬边上把 sinc radius 加大，再叠加 8 次
          shock，会保留细节，还是把 ringing 与 halo 一起放大？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <FilteringScene
            anisotropy={anisotropy}
            kernel={kernel}
            mode={mode}
            radius={radius}
            shockPasses={shockPasses}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2" aria-label="选择过滤任务">
            {(["minify", "magnify", "deblur"] as FilterMode[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className="min-h-11 rounded-md border border-border px-2 py-2 text-xs font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {value}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2" aria-label="选择重建核">
            {(["bilinear", "gaussian", "sinc"] as KernelMode[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={kernel === value}
                onClick={() => setKernel(value)}
                className="min-h-11 rounded-md border border-border px-1 py-2 text-xs font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {value}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            kernel radius：{radius}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="8"
              step="1"
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            anisotropy：{anisotropy}:1
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="5"
              step="1"
              value={anisotropy}
              onChange={(event) => setAnisotropy(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            shock passes：{shockPasses}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="10"
              step="1"
              value={shockPasses}
              onChange={(event) => setShockPasses(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "minify"
              ? "缩小应按 Jacobian footprint 做面积平均；只加大轴对齐窗口会混入 footprint 外 texels。"
              : mode === "deblur" && shockPasses > 6
                ? "故障观察：过多 shock passes 会强化 ringing、halo 与噪声，应使用小 magnitude 并逐次验收。"
                : kernel === "sinc"
                  ? "windowed sinc 保留采样带宽，但硬合成边缘可能出现衰减振铃。"
                  : kernel === "gaussian"
                    ? "Gaussian 不产生明显 ringing，却会衰减细纹理与高频细节。"
                    : "Bilinear 成本低、support 小，放大时会产生可见 fuzzy edge。"}
          </p>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
