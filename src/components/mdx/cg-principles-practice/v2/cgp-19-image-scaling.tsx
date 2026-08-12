"use client";

import { useMemo, useState, type ReactNode } from "react";

type FilterKind = "nearest" | "linear" | "cubic";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="360" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function ImageGrid({
  x,
  y,
  size,
  scale = 1,
  filter,
}: {
  x: number;
  y: number;
  size: number;
  scale?: number;
  filter: FilterKind;
}) {
  const pattern = [
    COLORS.accent,
    COLORS.success,
    COLORS.warning,
    COLORS.secondary,
    COLORS.accent,
    COLORS.warning,
    COLORS.success,
    COLORS.secondary,
    COLORS.warning,
  ];
  const cols = 3;
  const outCols = Math.max(3, Math.round(cols * scale));
  const outRows = Math.max(3, Math.round(cols * scale));
  return (
    <g>
      {Array.from({ length: outCols * outRows }, (_, index) => {
        const sourceIndex =
          filter === "nearest"
            ? Math.min(
                pattern.length - 1,
                Math.floor(index / Math.max(1, scale)) % pattern.length,
              )
            : (index + Math.floor(index / outCols)) % pattern.length;
        const opacity =
          filter === "nearest"
            ? 0.78
            : filter === "linear"
              ? 0.6
              : 0.48 + (index % 4) * 0.08;
        const width = size / outCols;
        const height = size / outRows;
        return (
          <rect
            key={`scaled-${index}`}
            x={x + (index % outCols) * width}
            y={y + Math.floor(index / outCols) * height}
            width={width + (filter === "linear" ? 0.5 : 0)}
            height={height + (filter === "linear" ? 0.5 : 0)}
            fill={pattern[sourceIndex]}
            fillOpacity={opacity}
            stroke={COLORS.border}
            strokeWidth={filter === "nearest" ? "1.5" : "0.6"}
          />
        );
      })}
    </g>
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
  const size = 8;
  const left = {
    x: x2 - size * Math.cos(angle - Math.PI / 6),
    y: y2 - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: x2 - size * Math.cos(angle + Math.PI / 6),
    y: y2 - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={`${x2},${y2} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

export function Cgp19ScalingConceptDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="图像缩放概念图：目标像素通过重建规则从源图像邻域获得，放大与缩小的采样方向不同">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            enlarging images / shrinking images：目标像素从哪里来
          </text>
          <rect
            x="38"
            y="78"
            width="184"
            height="200"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="130"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.secondary}
          >
            源图像
          </text>
          <ImageGrid x={70} y={138} size={120} filter="nearest" />
          <text
            x="130"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            已知采样点
          </text>
          <Arrow x1={240} y1={178} x2={286} y2={178} color={COLORS.accent} />
          <rect
            x="306"
            y="78"
            width="164"
            height="200"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="388"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            reconstruction
          </text>
          <text
            x="388"
            y="154"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.accent}
          >
            邻域 + 权重
          </text>
          <text
            x="388"
            y="188"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            推断目标像素
          </text>
          <text
            x="388"
            y="222"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            处理边界
          </text>
          <Arrow x1={488} y1={178} x2={534} y2={178} color={COLORS.success} />
          <rect
            x="554"
            y="78"
            width="128"
            height="200"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="618"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            输出
          </text>
          <text
            x="618"
            y="154"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            更大
          </text>
          <text
            x="618"
            y="188"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            或更小
          </text>
          <text
            x="618"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            带误差的估计
          </text>
          <text
            x="360"
            y="320"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            缩放不是复制像素，而是重新估计目标采样
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图像缩放的核心是重建：根据源邻域和滤波规则估计目标像素。
      </figcaption>
    </figure>
  );
}

export function Cgp19FilterComparisonDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="缩放滤波对照：nearest 保持硬边，linear 在邻域间插值，cubic 使用更宽邻域获得更平滑结果">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            三种 reconstruction 规则的取舍
          </text>
          {[
            ["nearest", "最近邻", "硬边 / 可能锯齿", COLORS.warning],
            ["linear", "双线性", "平滑 / 可能变软", COLORS.accent],
            ["cubic", "三次", "更宽邻域 / 成本高", COLORS.success],
          ].map(([kind, title, detail, color], index) => {
            const x = 36 + index * 228;
            return (
              <g key={kind}>
                <rect
                  x={x}
                  y="76"
                  width="204"
                  height="216"
                  rx="14"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <text
                  x={x + 22}
                  y="112"
                  fontSize="14"
                  fontWeight="700"
                  fill={color}
                >
                  {title}
                </text>
                <ImageGrid
                  x={x + 36}
                  y={132}
                  size={132}
                  scale={1.55}
                  filter={kind as FilterKind}
                />
                <text x={x + 22} y="274" fontSize="12" fill={COLORS.secondary}>
                  {detail}
                </text>
              </g>
            );
          })}
          <text
            x="360"
            y="326"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            滤波器选择要和放大倍数、边缘保真及预算一起判断
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        没有普遍最好的缩放滤波器，只有与任务和资源相匹配的重建规则。
      </figcaption>
    </figure>
  );
}

export function Cgp19SamplingDirectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="缩小与放大对照：缩小时多个源像素汇聚到一个目标像素，放大时一个源区域扩展到多个目标像素">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            enlarging 与 shrinking 的采样方向
          </text>
          <rect
            x="38"
            y="76"
            width="294"
            height="218"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="185"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            shrinking images
          </text>
          <ImageGrid x={64} y={146} size={84} filter="nearest" />
          <Arrow x1={164} y1={188} x2={214} y2={188} color={COLORS.warning} />
          <ImageGrid x={226} y={158} size={66} scale={0.68} filter="linear" />
          <text
            x="185"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            多个源样本 → 一个目标样本
          </text>
          <rect
            x="388"
            y="76"
            width="294"
            height="218"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="535"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.accent}
          >
            enlarging images
          </text>
          <ImageGrid x={414} y={158} size={66} scale={0.68} filter="linear" />
          <Arrow x1={498} y1={188} x2={548} y2={188} color={COLORS.accent} />
          <ImageGrid x={560} y={146} size={84} filter="linear" />
          <text
            x="535"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            一个源区域 → 多个目标样本
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        缩小时要防止高频混叠，放大时要管理插值带来的平滑与虚构细节。
      </figcaption>
    </figure>
  );
}

function ScaleScene({
  scale,
  filter,
  checker,
}: {
  scale: number;
  filter: FilterKind;
  checker: boolean;
}) {
  const safeScale = Math.max(0.5, Math.min(3, scale));
  const outputSize = 126 * safeScale;
  return (
    <SvgFrame label="可调图像缩放实验：改变缩放倍数、重建滤波和棋盘格边缘，观察输出细节与混叠风险">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live scale：把重建误差变成屏幕证据
      </text>
      <rect
        x="42"
        y="70"
        width="360"
        height="240"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="64" y="106" fontSize="14" fontWeight="700" fill={COLORS.text}>
        源 → 目标
      </text>
      <ImageGrid x={64} y={142} size={96} filter="nearest" />
      <Arrow x1={178} y1={190} x2={212} y2={190} color={COLORS.accent} />
      <rect
        x="226"
        y="112"
        width="150"
        height="150"
        fill={checker ? "var(--bg)" : "transparent"}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <g
        transform={`translate(${226 + (150 - outputSize) / 2} ${112 + (150 - outputSize) / 2})`}
      >
        <ImageGrid
          x={0}
          y={0}
          size={outputSize}
          scale={safeScale}
          filter={filter}
        />
      </g>
      <text x="64" y="274" fontSize="12" fill={COLORS.secondary}>
        源：3 × 3 采样
      </text>
      <text x="226" y="284" fontSize="12" fill={COLORS.accent}>
        输出：{filter} / {scale.toFixed(1)}×
      </text>
      <rect
        x="432"
        y="70"
        width="254"
        height="226"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="456" y="108" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前规格
      </text>
      <text x="456" y="142" fontSize="13" fill={COLORS.accent}>
        重建：{filter}
      </text>
      <text x="456" y="174" fontSize="13" fill={COLORS.secondary}>
        缩放：{scale.toFixed(1)}×
      </text>
      <text x="456" y="206" fontSize="13" fill={COLORS.warning}>
        边缘：{checker ? "高频棋盘格" : "平滑区域"}
      </text>
      <text x="456" y="238" fontSize="13" fill={COLORS.success}>
        {scale < 1 ? "注意：缩小需抗混叠" : "注意：放大需重建"}
      </text>
      <text
        x="559"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        先看任务，再选滤波
      </text>
      <text
        x="360"
        y="338"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        一次只改变一个条件，才能解释细节变化
      </text>
    </SvgFrame>
  );
}

export function Cgp19ImageScalingLab() {
  const [scale, setScale] = useState(1.5);
  const [filter, setFilter] = useState<FilterKind>("linear");
  const [checker, setChecker] = useState(true);
  const filterLabel = { nearest: "nearest", linear: "linear", cubic: "cubic" }[
    filter
  ];

  function reset() {
    setScale(1.5);
    setFilter("linear");
    setChecker(true);
  }

  return (
    <section
      aria-label="图像放大与缩小专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-19-image-scaling"
      data-unit-id="cgp-19"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ScaleViz · reconstruction lab
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让缩放方向与重建规则同时可见
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：同一个滤波器用于 enlarging images 和 shrinking images
            时，边缘与细节会怎样变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图像缩放实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择重建滤波">
          <button
            type="button"
            aria-pressed={filter === "nearest"}
            onClick={() => setFilter("nearest")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${filter === "nearest" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            nearest
          </button>
          <button
            type="button"
            aria-pressed={filter === "linear"}
            onClick={() => setFilter("linear")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${filter === "linear" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            linear
          </button>
          <button
            type="button"
            aria-pressed={filter === "cubic"}
            onClick={() => setFilter("cubic")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${filter === "cubic" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            cubic
          </button>
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>缩放倍数</span>
              <span className="font-mono text-primary">
                {scale.toFixed(1)}×
              </span>
            </span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 items-center gap-3 pt-5 text-sm text-secondary">
            <input
              type="checkbox"
              checked={checker}
              onChange={(event) => setChecker(event.target.checked)}
              className="size-5 accent-accent"
            />
            <span>显示高频棋盘格</span>
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <ScaleScene scale={scale} filter={filter} checker={checker} />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前重建：{filterLabel}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {scale < 1
              ? "当前是 shrinking images 场景：先考虑抗混叠，再比较输出细节。"
              : "当前是 enlarging images 场景：输出像素需要通过 reconstruction 从源邻域估计。"}
          </p>
        </div>
      </div>
    </section>
  );
}
