"use client";

import { useState, type ReactNode } from "react";

type MaterialMode = "diffuse" | "glossy" | "metal" | "glass";

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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = {
    x: Math.round((x2 - size * Math.cos(angle - Math.PI / 6)) * 1000) / 1000,
    y: Math.round((y2 - size * Math.sin(angle - Math.PI / 6)) * 1000) / 1000,
  };
  const right = {
    x: Math.round((x2 - size * Math.cos(angle + Math.PI / 6)) * 1000) / 1000,
    y: Math.round((y2 - size * Math.sin(angle + Math.PI / 6)) * 1000) / 1000,
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={
          String(x2) +
          "," +
          String(y2) +
          " " +
          String(left.x) +
          "," +
          String(left.y) +
          " " +
          String(right.x) +
          "," +
          String(right.y)
        }
        fill={color}
      />
    </>
  );
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function lobePoints(
  cx: number,
  cy: number,
  scale: number,
  roughness: number,
): string {
  const count = 18;
  return Array.from({ length: count + 1 }, (_, index) => {
    const angle = Math.PI + (Math.PI * index) / count;
    const width = 0.18 + roughness * 0.8;
    const radius = scale * (0.3 + width * Math.pow(Math.sin(angle), 2));
    const x = round(cx + Math.cos(angle) * radius);
    const y = round(cy - Math.sin(angle) * radius);
    return (index === 0 ? "M" : "L") + x + " " + y;
  }).join(" ");
}

function MaterialSphere({
  mode,
  roughness,
  metallic,
  transmission,
}: {
  mode: MaterialMode;
  roughness: number;
  metallic: number;
  transmission: number;
}) {
  const highlightWidth = Math.round(36 - roughness * 22);
  const baseColor =
    mode === "glass"
      ? COLORS.success
      : mode === "metal"
        ? COLORS.warning
        : COLORS.accent;
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="材质实验场景：粗糙度、金属性与透射率改变反射高光和透射反馈"
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
        {mode}：散射方向与能量反馈
      </text>
      <circle
        cx="238"
        cy="164"
        r="92"
        fill={baseColor}
        fillOpacity="0.2"
        stroke={baseColor}
        strokeWidth="4"
      />
      <ellipse
        cx={210 - roughness * 12}
        cy={132 - roughness * 8}
        rx={highlightWidth}
        ry={Math.max(10, highlightWidth * 0.65)}
        fill={COLORS.success}
        fillOpacity={round(0.32 + metallic * 0.45)}
      />
      <path
        d={lobePoints(238, 164, 104, roughness)}
        fill={baseColor}
        fillOpacity="0.1"
        stroke={baseColor}
        strokeWidth="3"
      />
      <line
        x1="238"
        y1="164"
        x2="238"
        y2="58"
        stroke={COLORS.border}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <Arrow x1={238} y1={164} x2={160} y2={92} color={COLORS.warning} />
      <Arrow x1={238} y1={164} x2={322} y2={88} color={COLORS.accent} />
      <text x="150" y="82" fontSize="13" fill={COLORS.warning}>
        入射
      </text>
      <text x="326" y="78" fontSize="13" fill={COLORS.accent}>
        出射
      </text>
      <text
        x="238"
        y="282"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        高光宽度 {highlightWidth} · 金属 {metallic.toFixed(1)} · 透射{" "}
        {transmission.toFixed(1)}
      </text>
      <rect
        x="418"
        y="58"
        width="268"
        height="218"
        rx="16"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="552"
        y="94"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        观测量
      </text>
      <text
        x="552"
        y="134"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.accent}
      >
        反射峰：{(1 - roughness * 0.6).toFixed(2)}
      </text>
      <text
        x="552"
        y="168"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.success}
      >
        漫反射：{(roughness * 0.7 + 0.15).toFixed(2)}
      </text>
      <text
        x="552"
        y="202"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        透射能量：{transmission.toFixed(2)}
      </text>
      <text
        x="552"
        y="244"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        各通道相加不应超过输入能量
      </text>
    </svg>
  );
}

export function Cgp27MaterialPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="材质散射流程图：入射光、表面材质和出射方向共同决定散射能量">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          materials and scattering：从入射到出射
        </text>
        <rect
          x="34"
          y="88"
          width="160"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="114"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          入射光
        </text>
        <Arrow x1={72} y1={232} x2={150} y2={148} color={COLORS.warning} />
        <text
          x="114"
          y="260"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          方向 wi · 能量 Li
        </text>
        <Arrow x1={214} y1={184} x2={258} y2={184} color={COLORS.accent} />
        <rect
          x="274"
          y="88"
          width="174"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="361"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          材质模型
        </text>
        <text
          x="361"
          y="170"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          BRDF / BSDF
        </text>
        <text
          x="361"
          y="208"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          粗糙度 · 颜色 · 折射
        </text>
        <text
          x="361"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          角度 → 权重
        </text>
        <Arrow x1={468} y1={184} x2={512} y2={184} color={COLORS.accent} />
        <rect
          x="528"
          y="88"
          width="158"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="607"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          出射光
        </text>
        <Arrow x1={607} y1={232} x2={607} y2={146} color={COLORS.success} />
        <text
          x="607"
          y="260"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          方向 wo · 能量 Lo
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          材质不是颜色贴纸，而是方向相关的能量分配规则
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp27BrdfLobeDiagram() {
  return (
    <Figure>
      <SvgFrame label="BRDF 反射瓣图：粗糙度增大时高光峰变宽，镜面反射能量分布到更大角度范围">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          brdf：同一材质对不同出射方向给不同权重
        </text>
        <g>
          <rect
            x="34"
            y="84"
            width="204"
            height="204"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="136"
            y="118"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            光滑表面
          </text>
          <line
            x1="136"
            y1="246"
            x2="136"
            y2="142"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path
            d={lobePoints(136, 246, 94, 0.08)}
            fill={COLORS.accent}
            fillOpacity="0.12"
            stroke={COLORS.accent}
            strokeWidth="4"
          />
          <circle cx="136" cy="246" r="6" fill={COLORS.warning} />
          <text
            x="136"
            y="272"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            窄峰：方向集中
          </text>
        </g>
        <g>
          <rect
            x="258"
            y="84"
            width="204"
            height="204"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="118"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            中等粗糙
          </text>
          <line
            x1="360"
            y1="246"
            x2="360"
            y2="142"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path
            d={lobePoints(360, 246, 94, 0.45)}
            fill={COLORS.success}
            fillOpacity="0.12"
            stroke={COLORS.success}
            strokeWidth="4"
          />
          <circle cx="360" cy="246" r="6" fill={COLORS.warning} />
          <text
            x="360"
            y="272"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            中峰：方向分散
          </text>
        </g>
        <g>
          <rect
            x="482"
            y="84"
            width="204"
            height="204"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="584"
            y="118"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            粗糙表面
          </text>
          <line
            x1="584"
            y1="246"
            x2="584"
            y2="142"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path
            d={lobePoints(584, 246, 94, 0.88)}
            fill={COLORS.warning}
            fillOpacity="0.12"
            stroke={COLORS.warning}
            strokeWidth="4"
          />
          <circle cx="584" cy="246" r="6" fill={COLORS.warning} />
          <text
            x="584"
            y="272"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            宽峰：能量更分散
          </text>
        </g>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          BRDF 不是一个固定颜色，而是入射方向与出射方向的函数
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp27BsdfDiagram() {
  return (
    <Figure>
      <SvgFrame label="BSDF 反射透射图：入射能量按材质分配到反射与透射两条方向分支">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          bsdf：反射与透射放进同一个散射接口
        </text>
        <circle cx="360" cy="202" r="12" fill={COLORS.warning} />
        <line
          x1="360"
          y1="202"
          x2="360"
          y2="82"
          stroke={COLORS.border}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <Arrow x1={360} y1={202} x2={276} y2={118} color={COLORS.warning} />
        <text x="252" y="108" fontSize="14" fill={COLORS.warning}>
          入射 wi
        </text>
        <Arrow x1={360} y1={202} x2={474} y2={112} color={COLORS.accent} />
        <text x="480" y="102" fontSize="14" fill={COLORS.accent}>
          反射 wo
        </text>
        <Arrow x1={360} y1={202} x2={416} y2={310} color={COLORS.success} />
        <text x="426" y="312" fontSize="14" fill={COLORS.success}>
          透射 wt
        </text>
        <rect
          x="72"
          y="92"
          width="174"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="159"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          BRDF
        </text>
        <text
          x="159"
          y="174"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          只描述表面反射
        </text>
        <text
          x="159"
          y="218"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          Lo 反射分支
        </text>
        <Arrow x1={264} y1={180} x2={300} y2={180} color={COLORS.accent} />
        <rect
          x="474"
          y="92"
          width="174"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="561"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          BSDF
        </text>
        <text
          x="561"
          y="174"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          统一反射与透射
        </text>
        <text
          x="561"
          y="218"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          Lo + Lt
        </text>
        <text
          x="360"
          y="353"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          透明材质的难点是能量分配与方向变化，不只是降低 alpha
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp27EnergyDiagram() {
  return (
    <Figure>
      <SvgFrame label="材质能量守恒图：输入光能被反射、透射或吸收，输出总能量不能凭空增加">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          能量守恒：散射只是重新分配光
        </text>
        <rect
          x="34"
          y="92"
          width="164"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="116"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          输入
        </text>
        <rect
          x="72"
          y="164"
          width="88"
          height="32"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="116"
          y="186"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          100%
        </text>
        <text
          x="116"
          y="230"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Li · 入射能量
        </text>
        <Arrow x1={216} y1={180} x2={260} y2={180} color={COLORS.accent} />
        <rect
          x="276"
          y="92"
          width="168"
          height="178"
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
          材质
        </text>
        <text
          x="360"
          y="172"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          反射
        </text>
        <text
          x="360"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          透射
        </text>
        <text
          x="360"
          y="236"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          吸收
        </text>
        <Arrow x1={462} y1={180} x2={506} y2={180} color={COLORS.accent} />
        <rect
          x="522"
          y="92"
          width="164"
          height="178"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="604"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          输出
        </text>
        <text
          x="604"
          y="172"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          Lr + Lt
        </text>
        <text
          x="604"
          y="214"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          ≤ Li
        </text>
        <text
          x="604"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          不能凭空增光
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          BRDF 或 BSDF 的积分必须尊重输入能量上限
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp27MaterialsLab() {
  const [mode, setMode] = useState<MaterialMode>("diffuse");
  const [roughness, setRoughness] = useState(0.55);
  const [metallic, setMetallic] = useState(0.15);
  const [transmission, setTransmission] = useState(0.05);

  function reset() {
    setMode("diffuse");
    setRoughness(0.55);
    setMetallic(0.15);
    setTransmission(0.05);
  }

  return (
    <section
      aria-label="材质与散射专属实验"
      data-visual-kind="cgp-27-materials-and-scattering"
      data-unit-id="cgp-27"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp27 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            材质与散射专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定入射方向后切换材质；观察粗糙度、金属性和透射率如何改变方向分布与能量读数。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置材质与散射实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择材质模型">
        {(["diffuse", "glossy", "metal", "glass"] as const).map((option) => (
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
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-3">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>粗糙度</span>
            <span className="font-mono text-primary">
              {roughness.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={roughness}
            onChange={(event) => setRoughness(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>金属性</span>
            <span className="font-mono text-primary">
              {metallic.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={metallic}
            onChange={(event) => setMetallic(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>透射率</span>
            <span className="font-mono text-primary">
              {transmission.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={transmission}
            onChange={(event) => setTransmission(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <MaterialSphere
          mode={mode}
          roughness={roughness}
          metallic={metallic}
          transmission={transmission}
        />
      </div>
      <div
        className="mt-4 rounded-card border border-border bg-background p-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-primary">
          当前材质：{mode} · 粗糙度 {roughness.toFixed(2)} · 透射{" "}
          {transmission.toFixed(2)}
        </p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          先预测高光会变窄还是变宽，再只改变一个参数；如果总能量读数异常，检查反射、透射与吸收的分配。
        </p>
      </div>
    </section>
  );
}
