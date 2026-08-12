"use client";

import { useMemo, useState } from "react";

type View = "layers" | "blend" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "layers",
    label: "图层堆叠",
    detail: "移动前景透明度，观察多个片段如何在图形管线末端形成一个像素。",
  },
  {
    id: "blend",
    label: "混合公式",
    detail:
      "比较普通 Alpha 与预乘 Alpha 的输入责任，保持能量和边缘语义可追踪。",
  },
  {
    id: "throughput",
    label: "合成吞吐",
    detail: "增加合成样本并改变访问等待，比较并行 tile 与共享资源尾延迟。",
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

function LayerCard({
  alpha,
  fill,
  label,
  x,
  y,
}: {
  alpha: number;
  fill: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="184"
        height="68"
        rx="12"
        fill={fill}
        fillOpacity={alpha}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <rect
        x={x + 14}
        y={y + 16}
        width="36"
        height="36"
        rx="8"
        fill="var(--bg)"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x={x + 64}
        y={y + 30}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 64} y={y + 50} fontSize="12" fill={COLORS.secondary}>
        α = {alpha.toFixed(2)}
      </text>
    </g>
  );
}

function LayersView({ alpha, light }: { alpha: number; light: number }) {
  const composite = Math.min(1, 0.18 + alpha * 0.64 + light * 0.12);
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        图层堆叠：每次混合都要有明确的前景与背景
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        前景透明度：{alpha.toFixed(2)} · 光照输入：{light.toFixed(2)} ·
        输出不透明度：{composite.toFixed(2)}
      </text>
      <LayerCard
        alpha={1}
        fill="var(--accent)"
        label="背景片段"
        x={40}
        y={92}
      />
      <LayerCard
        alpha={0.55}
        fill="var(--success)"
        label="中间片段"
        x={74}
        y={150}
      />
      <LayerCard
        alpha={alpha}
        fill="var(--warning)"
        label="前景片段"
        x={108}
        y={208}
      />
      <line
        x1="318"
        y1="184"
        x2="386"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch18-composite-arrow)"
      />
      <rect
        x="410"
        y="92"
        width="308"
        height="204"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="434"
        y="126"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        合成像素
      </text>
      <rect
        x="434"
        y="148"
        width="110"
        height="82"
        rx="12"
        fill="var(--accent)"
        fillOpacity={composite}
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text x="568" y="174" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）
      </text>
      <text x="568" y="204" fontSize="13" fill={COLORS.secondary}>
        按顺序累积片段
      </text>
      <text x="568" y="234" fontSize="13" fill={COLORS.secondary}>
        Light（光）先成为前景能量
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        改变透明度只应影响覆盖比例，不应偷偷改变背景片段或光源单位。
      </text>
    </g>
  );
}

function BlendView({ alpha, light }: { alpha: number; light: number }) {
  const source = 0.35 + light * 0.35;
  const destination = 0.28;
  const normal = source * alpha + destination * (1 - alpha);
  const premultiplied = source * alpha + destination * (1 - alpha);
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        混合公式：颜色与 Alpha 必须使用同一种约定
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        源能量：{source.toFixed(2)} · 目标能量：{destination.toFixed(2)} ·
        Alpha：{alpha.toFixed(2)}
      </text>
      <rect
        x="28"
        y="88"
        width="306"
        height="212"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="122" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        输入责任
      </text>
      <text x="52" y="162" fontSize="13" fill={COLORS.secondary}>
        Cₛ：源颜色与光照
      </text>
      <text x="52" y="194" fontSize="13" fill={COLORS.secondary}>
        Cᵈ：已有背景结果
      </text>
      <text x="52" y="226" fontSize="13" fill={COLORS.secondary}>
        α：覆盖或可见比例
      </text>
      <text x="52" y="264" fontSize="13" fill={COLORS.accent}>
        Radiometry（辐射度量）先定义能量语义
      </text>
      <line
        x1="350"
        y1="184"
        x2="394"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch18-composite-arrow)"
      />
      <rect
        x="416"
        y="88"
        width="302"
        height="212"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="440"
        y="122"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        输出对照
      </text>
      <text x="440" y="160" fontSize="13" fill={COLORS.success}>
        普通 Alpha：{normal.toFixed(2)}
      </text>
      <text x="440" y="194" fontSize="13" fill={COLORS.success}>
        预乘 Alpha：{premultiplied.toFixed(2)}
      </text>
      <text x="440" y="230" fontSize="13" fill={COLORS.secondary}>
        Reflectance（反射率）不等于 α
      </text>
      <text x="440" y="262" fontSize="13" fill={COLORS.secondary}>
        先统一输入约定，再比较边缘。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        预乘 Alpha 把颜色和覆盖比例一起保存，能减少透明边缘的解释歧义。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  samples,
}: {
  latency: number;
  samples: number;
}) {
  const total = 12;
  const waiting = Math.min(total, Math.max(1, Math.round(latency * 8)));
  const completed = total - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        合成吞吐：Parallelism 遇到 memory latency
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        每个方格代表一个 tile；tile 越多，合成读写与颜色转换的工作量越大。
      </text>
      <rect
        x="28"
        y="88"
        width="326"
        height="212"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="120" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      {Array.from({ length: total }, (_, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 146 + Math.floor(index / 4) * 42;
        const isWaiting = index >= completed;
        return (
          <rect
            key={`composite-tile-${index}`}
            x={x}
            y={y}
            width="44"
            height="25"
            rx="6"
            fill={isWaiting ? "var(--warning)" : "var(--accent)"}
            fillOpacity="0.82"
            stroke={isWaiting ? COLORS.warning : COLORS.border}
          />
        );
      })}
      <text x="52" y="276" fontSize="13" fill={COLORS.secondary}>
        完成：{completed} · 等待：{waiting} · 每 tile 层数：{samples}
      </text>
      <line
        x1="370"
        y1="178"
        x2="414"
        y2="178"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch18-composite-arrow)"
      />
      <rect
        x="436"
        y="88"
        width="280"
        height="212"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="122"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        吞吐证据
      </text>
      <text x="460" y="160" fontSize="13" fill={COLORS.accent}>
        Parallelism（并行性）：{(1 - latency * 0.32).toFixed(2)}
      </text>
      <text x="460" y="194" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        合成层数：{samples} · 写回批次：{Math.ceil(samples / 2)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先查共享读写，再扩大批次。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行 tile 能隐藏部分等待，但不能消除同一背景资源的访问依赖。
      </text>
    </g>
  );
}

export function CgppCh18CompositingLab() {
  const [view, setView] = useState<View>("layers");
  const [alpha, setAlpha] = useState(0.62);
  const [light, setLight] = useState(0.72);
  const [samples, setSamples] = useState(4);
  const [latency, setLatency] = useState(0.34);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("layers");
    setAlpha(0.62);
    setLight(0.72);
    setSamples(4);
    setLatency(0.34);
  }

  return (
    <section
      aria-label="图层合成专属透明度与吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch18-compositing-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CompositeViz · 图层、Alpha 与 tile 吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个像素展示它如何叠加、解释并写回
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只改变透明度、输入约定或访问等待时，哪一种合成证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图层合成实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择图层合成观察视角">
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
            label="前景透明度"
            min={0.05}
            max={0.95}
            step={0.01}
            value={alpha}
            onChange={setAlpha}
          />
          <RangeControl
            label="光照能量"
            min={0.2}
            max={1.3}
            step={0.01}
            value={light}
            onChange={setLight}
          />
          <RangeControl
            label="合成层数"
            min={2}
            max={10}
            step={1}
            value={samples}
            onChange={setSamples}
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
            viewBox="0 0 760 380"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch18-composite-arrow"
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
              height="380"
              rx="12"
              fill="var(--bg)"
            />
            {view === "layers" ? (
              <LayersView alpha={alpha} light={light} />
            ) : view === "blend" ? (
              <BlendView alpha={alpha} light={light} />
            ) : (
              <ThroughputView latency={latency} samples={samples} />
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
