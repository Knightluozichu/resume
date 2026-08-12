"use client";

import { useMemo, useState } from "react";

type View = "layout" | "filter" | "color";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "layout",
    label: "像素布局",
    detail: "调整通道数量和图像宽度，观察一个像素怎样落在线性存储中。",
  },
  {
    id: "filter",
    label: "重采样滤波",
    detail: "移动采样位置，比较最近邻和加权滤波如何选择周围像素。",
  },
  {
    id: "color",
    label: "颜色通路",
    detail: "改变对比度与访问等待，区分颜色变换和硬件吞吐的责任。",
  },
];

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

function ViewButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const display = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent"
      />
    </label>
  );
}

function LayoutView({ channels, width }: { channels: number; width: number }) {
  const rows = 3;
  const cells = Array.from({ length: 12 }, (_, index) => {
    const x = index % 6;
    const y = Math.floor(index / 6);
    const selected = x === 2 && y === 1;
    return { selected, x, y };
  });
  const pixelIndex = 1 * width + 2;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        像素布局：图像是有通道的规则存储
      </text>
      <rect
        x="34"
        y="76"
        width="328"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        Image Representation
      </text>
      {cells.map((cell) => (
        <rect
          key={`pixel-${cell.x}-${cell.y}`}
          x={58 + cell.x * 45}
          y={126 + cell.y * 43}
          width="36"
          height="32"
          rx="5"
          fill={cell.selected ? "var(--accent)" : "var(--bg)"}
          opacity={cell.selected ? 0.84 : 1}
          stroke={cell.selected ? COLORS.accent : COLORS.border}
          strokeWidth={cell.selected ? 3 : 1}
        />
      ))}
      <text x="58" y="264" fontSize="13" fill={COLORS.secondary}>
        通道数：{channels} · 宽度：{width}
      </text>
      <line
        x1="380"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch12-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        线性索引
      </text>
      <text x="476" y="150" fontSize="14" fill={COLORS.success}>
        像素位置：x=2，y=1
      </text>
      <text x="476" y="182" fontSize="14" fill={COLORS.warning}>
        pixel index：{pixelIndex}
      </text>
      <text x="476" y="210" fontSize="13" fill={COLORS.secondary}>
        Light（光）写入颜色通道。
      </text>
      <text x="476" y="236" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）交接像素结果。
      </text>
      <text x="476" y="262" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）和 Reflectance（反射率）
      </text>
      <text x="476" y="288" fontSize="13" fill={COLORS.secondary}>
        影响数值，不改变地址规则。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        图像表示先定义像素、通道和步长，后续滤波才能找到正确邻居。
      </text>
    </g>
  );
}

function FilterView({ position }: { position: number }) {
  const center = Math.min(0.9, Math.max(0.1, position));
  const weights = [
    1 - center,
    center,
    0.5 + Math.abs(0.5 - center),
    1 - Math.abs(0.5 - center),
  ];
  const bilinear = weights[1] * 0.62 + weights[3] * 0.38;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        重采样滤波：邻居的权重决定新像素
      </text>
      <rect
        x="34"
        y="76"
        width="330"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        邻域样本
      </text>
      {Array.from({ length: 9 }, (_, index) => {
        const x = index % 3;
        const y = Math.floor(index / 3);
        const value = 0.18 + (index % 3) * 0.25 + y * 0.08;
        return (
          <g key={`filter-cell-${index}`}>
            <rect
              x={62 + x * 72}
              y={130 + y * 39}
              width="56"
              height="28"
              rx="5"
              fill="var(--accent)"
              opacity={Math.min(0.9, value)}
              stroke={COLORS.accent}
            />
            <text
              x={80 + x * 72}
              y={149 + y * 39}
              fontSize="13"
              fill={COLORS.primary}
            >
              {value.toFixed(2)}
            </text>
          </g>
        );
      })}
      <circle
        cx={90 + center * 120}
        cy="220"
        r="8"
        fill={COLORS.warning}
        stroke={COLORS.warning}
      />
      <text x="58" y="276" fontSize="13" fill={COLORS.secondary}>
        采样位置：{center.toFixed(2)}
      </text>
      <line
        x1="382"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch12-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        滤波结果
      </text>
      <text x="476" y="150" fontSize="14" fill={COLORS.success}>
        最近邻：保留一个样本
      </text>
      <text x="476" y="182" fontSize="14" fill={COLORS.warning}>
        加权滤波：{bilinear.toFixed(2)}
      </text>
      <text x="476" y="218" fontSize="13" fill={COLORS.secondary}>
        采样位置改变邻域权重。
      </text>
      <text x="476" y="248" fontSize="13" fill={COLORS.secondary}>
        滤波不是凭空增加细节。
      </text>
      <text x="476" y="278" fontSize="13" fill={COLORS.secondary}>
        选择不同核会改变边缘响应。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        重建的关键是同一坐标系下取邻居，再按覆盖权重汇聚。
      </text>
    </g>
  );
}

function ColorView({
  contrast,
  latency,
}: {
  contrast: number;
  latency: number;
}) {
  const input = 0.45;
  const output = Math.min(0.95, Math.max(0.08, 0.5 + (input - 0.5) * contrast));
  const waiting = Math.round(latency * 8);
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        颜色通路：数值变换与硬件访问各有责任
      </text>
      <rect
        x="34"
        y="76"
        width="202"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        线性图像
      </text>
      <rect
        x="58"
        y="132"
        width="154"
        height="72"
        rx="10"
        fill="var(--accent)"
        opacity={input}
      />
      <text x="78" y="174" fontSize="14" fill={COLORS.primary}>
        L = {input.toFixed(2)}
      </text>
      <text x="58" y="240" fontSize="13" fill={COLORS.secondary}>
        Image Pipeline 输入
      </text>
      <text x="58" y="270" fontSize="13" fill={COLORS.secondary}>
        通道与像素保持对齐
      </text>
      <line
        x1="250"
        y1="184"
        x2="332"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch12-arrow)"
      />
      <rect
        x="352"
        y="76"
        width="178"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="376"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        变换与访存
      </text>
      <path
        d="M378 220 C412 176 470 176 506 136"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="4"
      />
      <text x="376" y="246" fontSize="13" fill={COLORS.secondary}>
        对比度：{contrast.toFixed(2)}
      </text>
      <text x="376" y="274" fontSize="13" fill={COLORS.secondary}>
        等待块：{waiting}
      </text>
      <line
        x1="548"
        y1="184"
        x2="584"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch12-arrow)"
      />
      <rect
        x="602"
        y="76"
        width="124"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="620"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        输出
      </text>
      <rect
        x="620"
        y="132"
        width="88"
        height="72"
        rx="10"
        fill="var(--success)"
        opacity={output}
      />
      <text x="620" y="240" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      <text x="620" y="268" fontSize="13" fill={COLORS.secondary}>
        Parallelism / memory latency
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        颜色改变不等于访问变快；通道布局和缓存局部性同样重要。
      </text>
    </g>
  );
}

export function CgppCh12ImageLab() {
  const [view, setView] = useState<View>("layout");
  const [width, setWidth] = useState(6);
  const [channels, setChannels] = useState(4);
  const [position, setPosition] = useState(0.5);
  const [contrast, setContrast] = useState(1.2);
  const [latency, setLatency] = useState(0.35);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("layout");
    setWidth(6);
    setChannels(4);
    setPosition(0.5);
    setContrast(1.2);
    setLatency(0.35);
  }

  return (
    <section
      aria-label="图像管线专属像素与滤波实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch12-image-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ImageViz · 表示、滤波与颜色
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个像素说明它如何存储、重建、传递
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变通道、采样位置或访问等待时，哪一种图像证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图像管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择图像管线观察视角">
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <RangeControl
            label="图像宽度"
            min={4}
            max={8}
            step={1}
            value={width}
            onChange={setWidth}
          />
          <RangeControl
            label="通道数量"
            min={1}
            max={4}
            step={1}
            value={channels}
            onChange={setChannels}
          />
          <RangeControl
            label="采样位置"
            min={0.1}
            max={0.9}
            step={0.05}
            value={position}
            onChange={setPosition}
          />
          <RangeControl
            label="对比度"
            min={0.6}
            max={1.8}
            step={0.05}
            value={contrast}
            onChange={setContrast}
          />
          <RangeControl
            label="访问等待"
            min={0.1}
            max={0.9}
            step={0.01}
            value={latency}
            onChange={setLatency}
          />
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 760 350"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch12-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width="760"
              height="350"
              rx="12"
              fill="var(--bg)"
            />
            {view === "layout" ? (
              <LayoutView channels={channels} width={width} />
            ) : view === "filter" ? (
              <FilterView position={position} />
            ) : (
              <ColorView contrast={contrast} latency={latency} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
