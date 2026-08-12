"use client";

import { useMemo, useState, type ReactNode } from "react";

type FilterKind = "nearest" | "linear" | "anisotropic";

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

function TextureGrid({
  x,
  y,
  size,
  rows = 6,
  cols = 6,
  filter,
  lod = 0,
}: {
  x: number;
  y: number;
  size: number;
  rows?: number;
  cols?: number;
  filter: FilterKind;
  lod?: number;
}) {
  const cellWidth = size / cols;
  const cellHeight = size / rows;
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const stripe = (row + col + lod) % 4;
        const color =
          stripe === 0
            ? COLORS.warning
            : stripe === 1
              ? COLORS.accent
              : stripe === 2
                ? COLORS.success
                : COLORS.secondary;
        const opacity =
          filter === "nearest"
            ? 0.8
            : filter === "linear"
              ? 0.6
              : 0.48 + ((row + col) % 3) * 0.1;
        return (
          <rect
            key={`tex-${index}`}
            x={x + col * cellWidth}
            y={y + row * cellHeight}
            width={cellWidth + (filter === "linear" ? 0.5 : 0)}
            height={cellHeight + (filter === "linear" ? 0.5 : 0)}
            fill={color}
            fillOpacity={opacity}
            stroke={COLORS.border}
            strokeWidth={filter === "nearest" ? "1.2" : "0.6"}
          />
        );
      })}
    </g>
  );
}

export function Cgp20TextureMappingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="纹理映射图：模型表面上的 UV 坐标经过采样，查找纹理图像并得到材质颜色">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            texture mapping：UV 把表面接到图像
          </text>
          <rect
            x="38"
            y="76"
            width="188"
            height="212"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="132"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            几何表面
          </text>
          <polygon
            points="72,238 132,130 194,238"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <text x="88" y="226" fontSize="12" fill={COLORS.secondary}>
            u=0
          </text>
          <text x="170" y="226" fontSize="12" fill={COLORS.secondary}>
            u=1
          </text>
          <text
            x="132"
            y="152"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            v=1
          </text>
          <text
            x="132"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            顶点携带 UV
          </text>
          <Arrow x1={244} y1={178} x2={286} y2={178} color={COLORS.accent} />
          <rect
            x="306"
            y="76"
            width="126"
            height="212"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="369"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            sampling
          </text>
          <text
            x="369"
            y="152"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            UV → texel
          </text>
          <text
            x="369"
            y="188"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            邻域
          </text>
          <text
            x="369"
            y="224"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            filtering
          </text>
          <Arrow x1={450} y1={178} x2={492} y2={178} color={COLORS.success} />
          <rect
            x="512"
            y="76"
            width="170"
            height="212"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="597"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            材质颜色
          </text>
          <TextureGrid
            x={540}
            y={136}
            size={112}
            filter="linear"
            rows={4}
            cols={4}
          />
          <text
            x="597"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            返回片段阶段
          </text>
          <text
            x="360"
            y="326"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            坐标、采样和滤波共同决定表面外观
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        纹理映射不是贴图复制，而是对每个表面样本执行坐标查找与滤波。
      </figcaption>
    </figure>
  );
}

export function Cgp20FilteringDiagram() {
  const items: Array<[FilterKind, string, string, string]> = [
    ["nearest", "nearest", "单个 texel，硬边", COLORS.warning],
    ["linear", "linear", "局部插值，较平滑", COLORS.accent],
    ["anisotropic", "anisotropic", "沿斜向覆盖更多样本", COLORS.success],
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="纹理过滤对照：最近邻、线性和各向异性过滤对不同采样覆盖范围的处理不同">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            filtering：一个纹理坐标需要看多少邻居
          </text>
          {items.map(([kind, title, detail, color], index) => {
            const x = 36 + index * 228;
            return (
              <g key={kind}>
                <rect
                  x={x}
                  y="76"
                  width="204"
                  height="218"
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
                <TextureGrid
                  x={x + 38}
                  y={136}
                  size={132}
                  filter={kind}
                  rows={6}
                  cols={6}
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
            过滤范围越贴合像素覆盖，斜视和缩小时越稳定
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        过滤器把理想采样点扩展成邻域权重，质量与纹理访问成本需要平衡。
      </figcaption>
    </figure>
  );
}

export function Cgp20MipMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="MipMap 图：同一纹理预先生成多个尺寸层级，远处或缩小时选择更小层级减少高频混叠">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            MipMap：让 shrinking 的纹理先准备好不同尺度
          </text>
          <rect
            x="38"
            y="80"
            width="180"
            height="204"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="128"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            level 0
          </text>
          <TextureGrid
            x={64}
            y={132}
            size={128}
            filter="nearest"
            rows={8}
            cols={8}
          />
          <text
            x="128"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            原始高频
          </text>
          <Arrow x1={238} y1={174} x2={278} y2={174} color={COLORS.accent} />
          <rect
            x="294"
            y="80"
            width="136"
            height="204"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="362"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            level 1
          </text>
          <TextureGrid
            x={322}
            y={142}
            size={80}
            filter="linear"
            rows={4}
            cols={4}
          />
          <text
            x="362"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            较低频
          </text>
          <Arrow x1={450} y1={174} x2={490} y2={174} color={COLORS.success} />
          <rect
            x="506"
            y="80"
            width="176"
            height="204"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="594"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            level 2 / 选择
          </text>
          <rect
            x="536"
            y="144"
            width="116"
            height="56"
            rx="8"
            fill={COLORS.success}
            fillOpacity="0.18"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <text
            x="594"
            y="178"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            按 footprint 选
          </text>
          <text
            x="594"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            减少 aliasing
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MipMap 把缩小时需要的低频版本预先存储，采样时按屏幕 footprint 选择层级。
      </figcaption>
    </figure>
  );
}

function TextureScene({
  filter,
  lod,
  angle,
  repeat,
}: {
  filter: FilterKind;
  lod: number;
  angle: number;
  repeat: boolean;
}) {
  const coverage = Math.max(1, Math.round((90 - angle) / 15));
  const sampleCount =
    filter === "nearest" ? 1 : filter === "linear" ? 4 : 4 + coverage * 2;
  return (
    <SvgFrame label="可调纹理映射实验：切换过滤模式、MipMap 层级、斜视角和重复地址模式，观察采样覆盖与纹理稳定性">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live texture：把纹理访问变成证据
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
      <polygon
        points="64,112 354,154 354,268 64,224"
        fill={COLORS.accent}
        fillOpacity="0.08"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <g transform="skewY(8)">
        <TextureGrid
          x={82}
          y={128}
          size={244}
          filter={filter}
          rows={8}
          cols={8}
          lod={lod}
        />
      </g>
      <text x="64" y="292" fontSize="12" fill={COLORS.secondary}>
        UV：{repeat ? "repeat" : "clamp"}
      </text>
      <text x="230" y="292" fontSize="12" fill={COLORS.accent}>
        纹理 footprint：{coverage}×
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
        当前采样
      </text>
      <text x="456" y="142" fontSize="13" fill={COLORS.accent}>
        filter：{filter}
      </text>
      <text x="456" y="174" fontSize="13" fill={COLORS.secondary}>
        MipMap：level {lod}
      </text>
      <text x="456" y="206" fontSize="13" fill={COLORS.warning}>
        斜视角：{angle}°
      </text>
      <text x="456" y="238" fontSize="13" fill={COLORS.success}>
        估计样本：{sampleCount}
      </text>
      <text
        x="559"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        先看 footprint，再选过滤
      </text>
      <text
        x="360"
        y="338"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        一次只改变一个条件，才能解释纹理变化
      </text>
    </SvgFrame>
  );
}

export function Cgp20TextureMappingLab() {
  const [filter, setFilter] = useState<FilterKind>("linear");
  const [lod, setLod] = useState(0);
  const [angle, setAngle] = useState(45);
  const [repeat, setRepeat] = useState(true);

  function reset() {
    setFilter("linear");
    setLod(0);
    setAngle(45);
    setRepeat(true);
  }

  return (
    <section
      aria-label="纹理映射专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-20-texture-mapping"
      data-unit-id="cgp-20"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 TextureViz · UV and filtering
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让纹理 footprint 与过滤代价同时可见
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：斜视角变大后，linear 和 anisotropic 需要观察多少纹理邻域？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置纹理映射实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择纹理过滤">
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
            aria-pressed={filter === "anisotropic"}
            onClick={() => setFilter("anisotropic")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${filter === "anisotropic" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            anisotropic
          </button>
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>MipMap level</span>
              <span className="font-mono text-primary">{lod}</span>
            </span>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={lod}
              onChange={(event) => setLod(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>斜视角</span>
              <span className="font-mono text-primary">{angle}°</span>
            </span>
            <input
              type="range"
              min="15"
              max="75"
              step="5"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 items-center gap-3 pt-5 text-sm text-secondary">
            <input
              type="checkbox"
              checked={repeat}
              onChange={(event) => setRepeat(event.target.checked)}
              className="size-5 accent-accent"
            />
            <span>repeat UV</span>
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <TextureScene
            filter={filter}
            lod={lod}
            angle={angle}
            repeat={repeat}
          />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前过滤：{filter}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先固定 UV 和几何 footprint，再改变过滤或
            MipMap；如果纹理闪烁，优先检查缩小场景的采样覆盖。
          </p>
        </div>
      </div>
    </section>
  );
}
