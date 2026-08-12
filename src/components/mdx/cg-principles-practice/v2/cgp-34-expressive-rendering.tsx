"use client";

import { useMemo, useState, type ReactNode } from "react";

type ExpressiveMode = "line drawing" | "wash" | "stippling" | "debug";

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

export function Cgp34ExpressivePipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="表达性渲染流程图：场景信号经过风格化决策、标记生成和屏幕连贯性得到最终图像">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          expressive rendering：从信号到视觉语言
        </text>
        <rect
          x="34"
          y="90"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="111"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          场景信号
        </text>
        <text
          x="111"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          深度 / 法线
        </text>
        <text
          x="111"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          光照 / 轮廓
        </text>
        <text
          x="111"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          材质 · 视角 · 时间
        </text>
        <Arrow x1={206} y1={188} x2={244} y2={188} color={COLORS.accent} />
        <rect
          x="256"
          y="90"
          width="174"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
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
          风格化决策
        </text>
        <text
          x="343"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          保留什么
        </text>
        <text
          x="343"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          强调什么
        </text>
        <text
          x="343"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          阈值 · 方向 · 密度
        </text>
        <Arrow x1={448} y1={188} x2={486} y2={188} color={COLORS.success} />
        <rect
          x="498"
          y="90"
          width="188"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="592"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          marks and strokes
        </text>
        <text
          x="592"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          线 · 面 · 点
        </text>
        <text
          x="592"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          连贯与节奏
        </text>
        <text
          x="592"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          屏幕空间输出
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          表达性不是随机加噪声，而是有意保留和组织视觉证据
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp34MarksStrokesDiagram() {
  return (
    <Figure>
      <SvgFrame label="笔触与标记图：笔画方向、宽度、长度和间距共同表达表面信号">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          marks and strokes：每个标记都有空间语义
        </text>
        <rect
          x="34"
          y="84"
          width="204"
          height="212"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="136"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          方向 direction
        </text>
        <path
          d="M70 236 Q112 168 190 136"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Arrow x1={112} y1={170} x2={172} y2={146} color={COLORS.success} />
        <text
          x="136"
          y="270"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          沿切线或主方向排列
        </text>
        <rect
          x="258"
          y="84"
          width="204"
          height="212"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          宽度 width
        </text>
        <path
          d="M292 160 Q346 140 426 164"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M292 204 Q346 184 426 208"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <text
          x="360"
          y="270"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          压力或信号强度改变粗细
        </text>
        <rect
          x="482"
          y="84"
          width="204"
          height="212"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="584"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          间距 spacing
        </text>
        {[0, 1, 2, 3, 4].map((index) => (
          <line
            key={`stroke-${index}`}
            x1={520 + index * 30}
            y1="150"
            x2={520 + index * 30}
            y2="226"
            stroke={COLORS.success}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        <text
          x="584"
          y="270"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          密度改变节奏与留白
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          同一深度信号可以用宽度、方向或间距表达出不同风格
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp34CoherenceDiagram() {
  return (
    <Figure>
      <SvgFrame label="屏幕空间连贯性图：相邻帧中的笔触需要保持身份、方向和密度，避免闪烁">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          连贯性：标记要跨空间与时间保持身份
        </text>
        <rect
          x="34"
          y="82"
          width="300"
          height="220"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="184"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          当前帧
        </text>
        <path
          d="M82 226 Q140 150 266 134"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M94 252 Q160 198 286 176"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text
          x="184"
          y="278"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          位置 · 方向 · 宽度 · 密度
        </text>
        <Arrow x1={360} y1={192} x2={402} y2={192} color={COLORS.warning} />
        <rect
          x="426"
          y="82"
          width="260"
          height="220"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="556"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          下一帧
        </text>
        <path
          d="M464 226 Q522 150 648 134"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M478 252 Q542 198 660 176"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle
          cx="556"
          cy="192"
          r="28"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <text
          x="556"
          y="278"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          重投影 / 追踪 / 稳定采样
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          连贯性差会变成闪烁、爬行和断裂，不是单帧颜色问题
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp34StylizationDiagram() {
  return (
    <Figure>
      <SvgFrame label="风格化决策图：连续场景信号经过阈值、量化和方向选择转成离散标记">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          从连续信号到离散标记
        </text>
        <rect
          x="34"
          y="90"
          width="184"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="126"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          连续输入
        </text>
        <path
          d="M64 234 Q104 138 188 172"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <line
          x1="64"
          y1="210"
          x2="188"
          y2="210"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <text
          x="126"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          深度 / 光照 / 曲率
        </text>
        <Arrow x1={234} y1={188} x2={270} y2={188} color={COLORS.accent} />
        <rect
          x="282"
          y="90"
          width="156"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          决策
        </text>
        <text
          x="360"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          阈值
        </text>
        <text
          x="360"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          量化
        </text>
        <text
          x="360"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          方向与密度
        </text>
        <Arrow x1={454} y1={188} x2={490} y2={188} color={COLORS.success} />
        <rect
          x="502"
          y="90"
          width="184"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="594"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          输出
        </text>
        <line
          x1="536"
          y1="230"
          x2="652"
          y2="146"
          stroke={COLORS.accent}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="554" cy="202" r="7" fill={COLORS.success} />
        <circle cx="594" cy="176" r="7" fill={COLORS.success} />
        <circle cx="634" cy="150" r="7" fill={COLORS.success} />
        <text
          x="594"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          可读的 mark / stroke
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          风格化决策应可解释、可调参与可重复，而不是隐藏随机噪声
        </text>
      </SvgFrame>
    </Figure>
  );
}

function ExpressiveScene({
  mode,
  strokeWidth,
  contrast,
  density,
  coherence,
}: {
  mode: ExpressiveMode;
  strokeWidth: number;
  contrast: number;
  density: number;
  coherence: number;
}) {
  const isWash = mode === "wash";
  const isStipple = mode === "stippling";
  const isDebug = mode === "debug";
  const ink = isDebug
    ? COLORS.warning
    : isWash
      ? COLORS.success
      : COLORS.accent;
  const count = Math.max(4, Math.min(14, Math.round(density * 12)));
  const stroke = round(2 + strokeWidth * 6);
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="表达性渲染实验场景：比较线稿、水洗、点描与调试模式的标记输出"
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
        {mode}：标记与连贯性反馈
      </text>
      <path
        d="M70 242 Q360 206 650 242"
        fill="none"
        stroke={COLORS.border}
        strokeWidth="5"
      />
      <path
        d="M70 246 Q360 210 650 246 L650 284 L70 284 Z"
        fill={COLORS.surface}
        fillOpacity="0.55"
      />
      <path
        d="M128 226 Q214 126 302 188 T486 158"
        fill="none"
        stroke={ink}
        strokeWidth={stroke}
        strokeLinecap="round"
        opacity={round(0.5 + contrast * 0.5)}
      />
      <path
        d="M154 242 Q230 174 332 216 T524 184"
        fill="none"
        stroke={ink}
        strokeWidth={Math.max(2, stroke - 1)}
        strokeLinecap="round"
        opacity="0.58"
      />
      {isWash ? (
        <path
          d="M118 224 Q228 130 322 190 T530 170 L536 234 Q420 252 320 226 T118 262 Z"
          fill={COLORS.success}
          fillOpacity={round(0.1 + contrast * 0.18)}
        />
      ) : null}
      {isStipple
        ? Array.from({ length: count * 2 }, (_, index) => {
            const x = 144 + ((index * 47) % 390);
            const y = 156 + ((index * 31) % 78);
            return (
              <circle
                key={`stipple-${index}`}
                cx={x}
                cy={y}
                r={round(1.8 + density * 2.5)}
                fill={COLORS.accent}
                fillOpacity={round(0.35 + contrast * 0.5)}
              />
            );
          })
        : null}
      {isDebug ? (
        <>
          <line
            x1="126"
            y1="132"
            x2="522"
            y2="132"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text
            x="324"
            y="116"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            信号阈值 / 重投影参考
          </text>
        </>
      ) : null}
      <rect
        x="530"
        y="74"
        width="132"
        height="76"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="596"
        y="104"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        输出统计
      </text>
      <text
        x="596"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        marks {count} · width {stroke.toFixed(1)}
      </text>
      <text
        x="360"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        stroke {strokeWidth.toFixed(2)} · contrast {contrast.toFixed(2)} ·
        density {density.toFixed(2)} · coherence {coherence.toFixed(2)}
      </text>
      <text
        x="360"
        y="290"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        {isDebug
          ? "检查阈值、方向和相邻帧身份，不先调颜色"
          : `连贯性 ${coherence.toFixed(2)}：${coherence < 0.5 ? "可能出现闪烁或断裂" : "保持相邻标记的方向与身份"}`}
      </text>
    </svg>
  );
}

export function Cgp34ExpressiveRenderingLab() {
  const [mode, setMode] = useState<ExpressiveMode>("line drawing");
  const [strokeWidth, setStrokeWidth] = useState(0.45);
  const [contrast, setContrast] = useState(0.7);
  const [density, setDensity] = useState(0.55);
  const [coherence, setCoherence] = useState(0.8);

  function reset() {
    setMode("line drawing");
    setStrokeWidth(0.45);
    setContrast(0.7);
    setDensity(0.55);
    setCoherence(0.8);
  }

  const metrics = useMemo(() => {
    const readability = round(Math.min(1, contrast * 0.62 + coherence * 0.38));
    const temporalRisk = round(
      Math.max(0, 1 - coherence) * (0.5 + density * 0.5),
    );
    const markBudget = Math.round(4 + density * 12);
    return { readability, temporalRisk, markBudget };
  }, [coherence, contrast, density]);

  return (
    <section
      aria-label="表达性渲染专属实验"
      data-visual-kind="cgp-34-expressive-rendering"
      data-unit-id="cgp-34"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp34 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            表达性渲染专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定同一场景信号，切换线稿、水洗、点描和
            debug；观察笔触宽度、对比度、密度与跨帧连贯性。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置表达性渲染实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择表达性渲染模式">
        {(["line drawing", "wash", "stippling", "debug"] as const).map(
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
            <span>笔触宽度</span>
            <span className="font-mono text-primary">
              {strokeWidth.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={strokeWidth}
            onChange={(event) => setStrokeWidth(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>对比度</span>
            <span className="font-mono text-primary">
              {contrast.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={contrast}
            onChange={(event) => setContrast(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>标记密度</span>
            <span className="font-mono text-primary">{density.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={density}
            onChange={(event) => setDensity(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>跨帧连贯性</span>
            <span className="font-mono text-primary">
              {coherence.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={coherence}
            onChange={(event) => setCoherence(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <ExpressiveScene
          mode={mode}
          strokeWidth={strokeWidth}
          contrast={contrast}
          density={density}
          coherence={coherence}
        />
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-3"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">可读性</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.readability.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">时间风险</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.temporalRisk.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">标记预算</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.markBudget}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        先预测：提高密度不一定提高可读性；降低 coherence
        会增加跨帧闪烁风险，先修复标记身份再调风格。
      </p>
    </section>
  );
}
