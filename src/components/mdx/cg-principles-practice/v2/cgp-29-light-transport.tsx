"use client";

import { useState, type ReactNode } from "react";

type TransportMode = "direct" | "indirect" | "occluded" | "emissive";

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
  const left = {
    x: round(x2 - size * Math.cos(angle - Math.PI / 6)),
    y: round(y2 - size * Math.sin(angle - Math.PI / 6)),
  };
  const right = {
    x: round(x2 - size * Math.cos(angle + Math.PI / 6)),
    y: round(y2 - size * Math.sin(angle + Math.PI / 6)),
  };
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
        points={`${x2},${y2} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

function PathLine({
  points,
  color,
  dashed = false,
}: {
  points: Array<[number, number]>;
  color: string;
  dashed?: boolean;
}) {
  return (
    <polyline
      points={points.map(([x, y]) => `${x},${y}`).join(" ")}
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "10 8" : undefined}
    />
  );
}

export function Cgp29TransportPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="光传输路径图：相机从表面接收出射辐亮度，表面连接直接光与间接光路径">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          light transport：从光源到相机的可解释路径
        </text>
        <rect
          x="34"
          y="92"
          width="160"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="114"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          相机 / 传感器
        </text>
        <circle
          cx="114"
          cy="202"
          r="24"
          fill={COLORS.accent}
          fillOpacity="0.18"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <Arrow x1={144} y1={202} x2={194} y2={202} color={COLORS.accent} />
        <text
          x="114"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          读取 Lₒ(点, wo)
        </text>
        <rect
          x="258"
          y="92"
          width="204"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          表面散射点
        </text>
        <circle cx="360" cy="202" r="10" fill={COLORS.warning} />
        <line
          x1="360"
          y1="202"
          x2="360"
          y2="146"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <Arrow x1={360} y1={202} x2={302} y2={148} color={COLORS.success} />
        <Arrow x1={360} y1={202} x2={418} y2={148} color={COLORS.accent} />
        <text x="292" y="140" fontSize="13" fill={COLORS.success}>
          间接路径
        </text>
        <text x="424" y="140" fontSize="13" fill={COLORS.accent}>
          直接路径
        </text>
        <text
          x="360"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          fᵣ / fₛ · 方向 · 可见性
        </text>
        <Arrow x1={478} y1={202} x2={528} y2={202} color={COLORS.warning} />
        <rect
          x="528"
          y="92"
          width="158"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="607"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          光源与环境
        </text>
        <circle
          cx="607"
          cy="198"
          r="25"
          fill={COLORS.warning}
          fillOpacity="0.18"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <path
          d="M607 158 L607 140 M607 238 L607 256 M567 198 L549 198 M647 198 L665 198"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text
          x="607"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Lᵢ、Lₑ 与入射方向
        </text>
        <PathLine
          points={[
            [528, 180],
            [458, 154],
            [414, 176],
          ]}
          color={COLORS.success}
          dashed
        />
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          同一个像素可以由许多条路径贡献；必须记录首个分叉
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp29RenderingEquationDiagram() {
  return (
    <Figure>
      <SvgFrame label="渲染方程分解图：出射辐亮度由自发光和半球上反射入射辐亮度的积分组成">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          rendering equation：把一个像素拆成可验证的项
        </text>
        <rect
          x="34"
          y="86"
          width="182"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="125"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          出射辐亮度
        </text>
        <text
          x="125"
          y="170"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          Lₒ(x, wo)
        </text>
        <text
          x="125"
          y="218"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          相机最终接收的量
        </text>
        <Arrow x1={234} y1={185} x2={270} y2={185} color={COLORS.accent} />
        <rect
          x="282"
          y="86"
          width="156"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          两个来源
        </text>
        <text
          x="360"
          y="166"
          textAnchor="middle"
          fontSize="15"
          fill={COLORS.warning}
        >
          自发光 Lₑ
        </text>
        <text
          x="360"
          y="204"
          textAnchor="middle"
          fontSize="15"
          fill={COLORS.success}
        >
          反射积分
        </text>
        <text
          x="360"
          y="248"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          对半球 Ω 求和
        </text>
        <Arrow x1={456} y1={185} x2={492} y2={185} color={COLORS.success} />
        <rect
          x="504"
          y="86"
          width="182"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="595"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          每个采样方向
        </text>
        <text
          x="595"
          y="164"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          fᵣ(x, wi, wo)
        </text>
        <text
          x="595"
          y="198"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          Lᵢ(x, wi)
        </text>
        <text
          x="595"
          y="232"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          cos θ · dω
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          遗漏任一因子，结果可能仍像图像，却不再是同一个物理量
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp29EstimatorDiagram() {
  return (
    <Figure>
      <SvgFrame label="路径估计图：每次散射更新路径吞吐量，采样方向并累加可见光源贡献">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          路径估计：沿散射顶点维护贡献与吞吐量
        </text>
        <line
          x1="66"
          y1="188"
          x2="654"
          y2="188"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="8 7"
        />
        <circle
          cx="92"
          cy="188"
          r="24"
          fill={COLORS.accent}
          fillOpacity="0.18"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <text
          x="92"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          相机
        </text>
        <Arrow x1={120} y1={188} x2={190} y2={188} color={COLORS.accent} />
        <circle
          cx="226"
          cy="188"
          r="24"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="226"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          x₀
        </text>
        <Arrow x1={254} y1={188} x2={324} y2={188} color={COLORS.success} />
        <circle
          cx="360"
          cy="188"
          r="24"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="360"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          x₁
        </text>
        <Arrow x1={388} y1={188} x2={458} y2={188} color={COLORS.success} />
        <circle
          cx="494"
          cy="188"
          r="24"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="494"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          x₂
        </text>
        <Arrow x1={522} y1={188} x2={592} y2={188} color={COLORS.success} />
        <circle
          cx="628"
          cy="188"
          r="24"
          fill={COLORS.success}
          fillOpacity="0.2"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        <text
          x="628"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          光源
        </text>
        <rect
          x="174"
          y="76"
          width="104"
          height="54"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="226"
          y="99"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          采样 wi
        </text>
        <text
          x="226"
          y="119"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          β₁ = β₀ × 权重
        </text>
        <Arrow
          x1={226}
          y1={136}
          x2={226}
          y2={158}
          color={COLORS.border}
          dashed
        />
        <rect
          x="308"
          y="262"
          width="104"
          height="54"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="285"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          继续路径
        </text>
        <text
          x="360"
          y="305"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          β₂ 累计
        </text>
        <Arrow
          x1={360}
          y1={218}
          x2={360}
          y2={258}
          color={COLORS.border}
          dashed
        />
        <rect
          x="474"
          y="76"
          width="104"
          height="54"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="526"
          y="99"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          可见性
        </text>
        <text
          x="526"
          y="119"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          贡献是否到达
        </text>
        <Arrow
          x1={494}
          y1={158}
          x2={526}
          y2={136}
          color={COLORS.border}
          dashed
        />
        <text
          x="360"
          y="352"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          每次采样都要同时记录方向、PDF、吞吐量与终止原因
        </text>
      </SvgFrame>
    </Figure>
  );
}

function LightTransportScene({
  mode,
  samples,
  bounces,
  albedo,
}: {
  mode: TransportMode;
  samples: number;
  bounces: number;
  albedo: number;
}) {
  const isOccluded = mode === "occluded";
  const isIndirect = mode === "indirect";
  const isEmissive = mode === "emissive";
  const pathColor = isOccluded
    ? COLORS.secondary
    : isIndirect
      ? COLORS.success
      : COLORS.accent;
  const pathOpacity = round(0.38 + Math.min(samples / 160, 0.48));
  const glowOpacity = round(0.16 + albedo * 0.24);

  return (
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="光传输实验场景：相机、散射点和光源之间的直接或间接路径"
      className="block h-auto w-full"
    >
      <rect width="720" height="300" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode}：路径、可见性与辐亮度估计
      </text>
      <path
        d="M70 236 Q360 198 650 236"
        fill="none"
        stroke={COLORS.border}
        strokeWidth="5"
      />
      <path
        d="M70 240 Q360 202 650 240 L650 282 L70 282 Z"
        fill={COLORS.surface}
        fillOpacity="0.55"
      />
      <rect
        x="74"
        y="138"
        width="102"
        height="68"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="125"
        y="168"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        相机
      </text>
      <text
        x="125"
        y="191"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        读取 Lₒ
      </text>
      <path
        d="M258 231 L306 158 L372 224 L430 136"
        fill={COLORS.accent}
        fillOpacity={glowOpacity}
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <circle cx="306" cy="158" r="11" fill={COLORS.warning} />
      <circle cx="372" cy="224" r="9" fill={COLORS.warning} />
      <circle cx="430" cy="136" r="11" fill={COLORS.success} />
      <PathLine
        points={[
          [176, 174],
          [252, 226],
          [306, 158],
        ]}
        color={pathColor}
        dashed={isOccluded}
      />
      <PathLine
        points={[
          [306, 158],
          [372, 224],
          [430, 136],
          [566, 174],
        ]}
        color={pathColor}
        dashed={isOccluded}
      />
      {isOccluded ? (
        <>
          <rect
            x="330"
            y="112"
            width="58"
            height="34"
            rx="8"
            fill={COLORS.secondary}
            fillOpacity="0.22"
            stroke={COLORS.secondary}
            strokeWidth="2"
          />
          <text
            x="359"
            y="134"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            遮挡
          </text>
        </>
      ) : null}
      {isEmissive ? (
        <circle
          cx="566"
          cy="174"
          r="40"
          fill={COLORS.warning}
          fillOpacity="0.15"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
      ) : null}
      <rect
        x="522"
        y="138"
        width="122"
        height="68"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="583"
        y="168"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        光源
      </text>
      <text
        x="583"
        y="191"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        {isEmissive ? "Lₑ 自发光" : "Lᵢ 入射"}
      </text>
      <text
        x="360"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        samples {samples} · bounces {bounces} · albedo {albedo.toFixed(2)}
      </text>
      <text
        x="360"
        y="288"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        {isIndirect
          ? "增加路径深度，观察间接光的累计贡献"
          : isOccluded
            ? "遮挡只应削弱可见贡献，不应改变材质定义"
            : "固定输入后比较估计量与路径证据"}
      </text>
    </svg>
  );
}

export function Cgp29LightTransportLab() {
  const [mode, setMode] = useState<TransportMode>("direct");
  const [samples, setSamples] = useState(32);
  const [bounces, setBounces] = useState(3);
  const [albedo, setAlbedo] = useState(0.65);

  function reset() {
    setMode("direct");
    setSamples(32);
    setBounces(3);
    setAlbedo(0.65);
  }

  const visibility =
    mode === "occluded" ? 0.18 : mode === "indirect" ? 0.62 : 0.84;
  const source = mode === "emissive" ? 0.72 : mode === "indirect" ? 0.44 : 0.58;
  const estimate = round(
    Math.min(
      0.98,
      source * visibility * (0.55 + albedo * 0.45) * (1 + bounces * 0.08),
    ),
  );
  const spread = round(Math.max(0.04, 0.28 / Math.sqrt(samples)));
  const throughput = round(
    Math.pow(0.55 + albedo * 0.3, Math.max(1, bounces - 1)),
  );

  return (
    <section
      aria-label="光传输专属实验"
      data-visual-kind="cgp-29-light-transport"
      data-unit-id="cgp-29"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp29 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            光传输专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定一个散射点，切换路径状态并调整样本数、反弹次数和反射率；同时观察路径图与估计量反馈。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置光传输实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择光传输路径模式">
        {(["direct", "indirect", "occluded", "emissive"] as const).map(
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
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-3">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>样本数</span>
            <span className="font-mono text-primary">{samples}</span>
          </span>
          <input
            type="range"
            min="8"
            max="128"
            step="8"
            value={samples}
            onChange={(event) => setSamples(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>最大反弹</span>
            <span className="font-mono text-primary">{bounces}</span>
          </span>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={bounces}
            onChange={(event) => setBounces(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>反射率</span>
            <span className="font-mono text-primary">{albedo.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.2"
            max="0.95"
            step="0.05"
            value={albedo}
            onChange={(event) => setAlbedo(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <LightTransportScene
          mode={mode}
          samples={samples}
          bounces={bounces}
          albedo={albedo}
        />
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-3"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">估计辐亮度</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {estimate.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">采样波动</p>
          <p className="mt-1 font-mono text-lg text-primary">
            ±{spread.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">路径吞吐量</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {throughput.toFixed(3)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        先预测：增加样本数应降低波动，增加反弹次数可能带来更多间接贡献但也会降低路径吞吐量；若遮挡模式仍与直接模式相同，优先检查
        visibility。
      </p>
    </section>
  );
}
