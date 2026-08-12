"use client";

import { useMemo, useState } from "react";

type View = "flow" | "interpolation" | "occupancy";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "flow",
    label: "管线流转",
    detail: "沿着输入、插值、着色器和输出四个阶段追踪一个片段。",
  },
  {
    id: "interpolation",
    label: "属性插值",
    detail: "改变重心权重，观察顶点属性如何在片段位置汇合。",
  },
  {
    id: "occupancy",
    label: "硬件占用",
    detail: "改变光源、分支分歧和访问等待，比较并行通道与尾部延迟。",
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

function StageCard({
  active,
  detail,
  label,
  x,
}: {
  active: boolean;
  detail: string;
  label: string;
  x: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y="126"
        width="136"
        height="92"
        rx="12"
        fill={active ? "var(--accent)" : COLORS.elevated}
        fillOpacity={active ? "0.18" : "1"}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth={active ? "3" : "2"}
      />
      <circle
        cx={x + 20}
        cy="149"
        r="7"
        fill={active ? COLORS.accent : COLORS.border}
      />
      <text
        x={x + 36}
        y="155"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="184" fontSize="12" fill={COLORS.secondary}>
        {detail}
      </text>
      <text
        x={x + 16}
        y="204"
        fontSize="12"
        fill={active ? COLORS.accent : COLORS.secondary}
      >
        {active ? "当前焦点" : "等待输入"}
      </text>
    </g>
  );
}

function FlowView({
  attribute,
  lights,
}: {
  attribute: number;
  lights: number;
}) {
  const activeStage = Math.min(3, Math.max(0, Math.round(attribute * 3)));
  const stageX = [28, 190, 352, 514];
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        着色管线：属性怎样变成一个片段颜色
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        当前焦点：第 {activeStage + 1} 阶段 · 光源数量：{lights}
      </text>
      {stageX.slice(0, 3).map((x) => (
        <line
          key={`flow-arrow-${x}`}
          x1={x + 136}
          y1="172"
          x2={x + 156}
          y2="172"
          stroke={COLORS.accent}
          strokeWidth="3"
          markerEnd="url(#cgpp-ch16-flow-arrow)"
        />
      ))}
      <StageCard
        active={activeStage === 0}
        detail="位置、法线、UV"
        label="输入属性"
        x={stageX[0]}
      />
      <StageCard
        active={activeStage === 1}
        detail="重心权重汇合"
        label="插值"
        x={stageX[1]}
      />
      <StageCard
        active={activeStage === 2}
        detail="Light + Reflectance"
        label="着色器"
        x={stageX[2]}
      />
      <StageCard
        active={activeStage === 3}
        detail="帧缓冲中的颜色"
        label="输出"
        x={stageX[3]}
      />
      <rect
        x="28"
        y="254"
        width="690"
        height="52"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="285" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）先保证属性契约，着色器再解释
        Radiometry（辐射度量）与 Reflectance（反射率）。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        阶段之间传递的是可检查的数据，不是驱动替你猜出的状态。
      </text>
    </g>
  );
}

function InterpolationView({
  attribute,
  roughness,
}: {
  attribute: number;
  roughness: number;
}) {
  const alpha = Math.max(0.05, attribute);
  const beta = Math.max(0.05, (1 - attribute) * (0.7 + roughness * 0.2));
  const gamma = Math.max(0.05, 1 - alpha - beta);
  const sum = alpha + beta + gamma;
  const weights = [alpha / sum, beta / sum, gamma / sum];
  const fragmentX = 130 + weights[1] * 170 + weights[2] * 42;
  const fragmentY = 236 - weights[2] * 132;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        属性插值：片段继承的是加权证据
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        改变权重不会移动几何；它只改变当前位置收到的法线、颜色与材质参数。
      </text>
      <polygon
        points="130,236 300,236 172,104"
        fill="var(--accent)"
        fillOpacity="0.12"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="130"
        y1="236"
        x2={fragmentX}
        y2={fragmentY}
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <line
        x1="300"
        y1="236"
        x2={fragmentX}
        y2={fragmentY}
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <line
        x1="172"
        y1="104"
        x2={fragmentX}
        y2={fragmentY}
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <circle cx="130" cy="236" r="10" fill={COLORS.warning} />
      <circle cx="300" cy="236" r="10" fill={COLORS.warning} />
      <circle cx="172" cy="104" r="10" fill={COLORS.warning} />
      <circle
        cx={fragmentX}
        cy={fragmentY}
        r="14"
        fill={COLORS.success}
        opacity="0.9"
      />
      <text x="112" y="270" fontSize="13" fill={COLORS.primary}>
        α {weights[0].toFixed(2)}
      </text>
      <text x="284" y="270" fontSize="13" fill={COLORS.primary}>
        β {weights[1].toFixed(2)}
      </text>
      <text x="178" y="86" fontSize="13" fill={COLORS.primary}>
        γ {weights[2].toFixed(2)}
      </text>
      <text
        x={fragmentX + 18}
        y={fragmentY + 5}
        fontSize="13"
        fill={COLORS.success}
      >
        片段
      </text>
      <line
        x1="340"
        y1="172"
        x2="394"
        y2="172"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch16-flow-arrow)"
      />
      <rect
        x="416"
        y="86"
        width="300"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="440"
        y="120"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        着色器输入快照
      </text>
      <text x="440" y="158" fontSize="13" fill={COLORS.secondary}>
        法线：αn₀ + βn₁ + γn₂
      </text>
      <text x="440" y="188" fontSize="13" fill={COLORS.secondary}>
        Light（光）：{(0.65 + weights[2] * 0.2).toFixed(2)}
      </text>
      <text x="440" y="218" fontSize="13" fill={COLORS.secondary}>
        反射率：{(0.35 + (1 - roughness) * 0.35).toFixed(2)}
      </text>
      <text x="440" y="248" fontSize="13" fill={COLORS.secondary}>
        输出 = 光照 × 反射率
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        先确认插值方向，再判断 Radiometry（辐射度量）或材质响应是否异常。
      </text>
    </g>
  );
}

function OccupancyView({
  divergence,
  latency,
  lights,
}: {
  divergence: number;
  latency: number;
  lights: number;
}) {
  const total = 12;
  const waiting = Math.min(
    total,
    Math.max(1, Math.round(latency * 7 + divergence * 4)),
  );
  const divergent = Math.round(divergence * total);
  const completed = total - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        硬件占用：Parallelism 遇到 memory latency
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        每个方格代表一个片段通道；分支分歧让同一批通道走不同路径。
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
        const isDivergent = index < divergent;
        return (
          <rect
            key={`lane-${index}`}
            x={x}
            y={y}
            width="44"
            height="25"
            rx="6"
            fill={
              isWaiting
                ? "var(--warning)"
                : isDivergent
                  ? "var(--accent)"
                  : "var(--success)"
            }
            fillOpacity="0.82"
            stroke={isWaiting ? COLORS.warning : COLORS.border}
          />
        );
      })}
      <text x="52" y="276" fontSize="13" fill={COLORS.secondary}>
        完成：{completed} · 等待：{waiting} · 分歧：{divergent}
      </text>
      <line
        x1="370"
        y1="178"
        x2="414"
        y2="178"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch16-flow-arrow)"
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
      <text x="460" y="160" fontSize="13" fill={COLORS.success}>
        Parallelism（并行性）：{(1 - divergence * 0.45).toFixed(2)}
      </text>
      <text x="460" y="194" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        光源任务：{lights} · 分支分歧：{divergence.toFixed(2)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先减等待，再谈增加并行批次。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        更高的并行度不能消除共享数据访问的尾部等待。
      </text>
    </g>
  );
}

export function CgppCh16ShadingLab() {
  const [view, setView] = useState<View>("flow");
  const [attribute, setAttribute] = useState(0.42);
  const [roughness, setRoughness] = useState(0.35);
  const [lights, setLights] = useState(8);
  const [latency, setLatency] = useState(0.35);
  const [divergence, setDivergence] = useState(0.25);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("flow");
    setAttribute(0.42);
    setRoughness(0.35);
    setLights(8);
    setLatency(0.35);
    setDivergence(0.25);
  }

  return (
    <section
      aria-label="着色管线专属插值与硬件占用实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch16-shading-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ShadingViz · 管线、插值与占用
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个片段展示它从哪里来、如何被着色、为何会等待
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变属性权重、分支分歧或访问等待时，哪一层证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置着色管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择着色管线观察视角">
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
            label="属性权重"
            min={0.05}
            max={0.95}
            step={0.01}
            value={attribute}
            onChange={setAttribute}
          />
          <RangeControl
            label="材质粗糙度"
            min={0.05}
            max={0.95}
            step={0.01}
            value={roughness}
            onChange={setRoughness}
          />
          <RangeControl
            label="光源任务"
            min={4}
            max={12}
            step={1}
            value={lights}
            onChange={setLights}
          />
          <RangeControl
            label="访问等待"
            min={0.1}
            max={0.9}
            step={0.01}
            value={latency}
            onChange={setLatency}
          />
          <RangeControl
            label="分支分歧"
            min={0.05}
            max={0.9}
            step={0.01}
            value={divergence}
            onChange={setDivergence}
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
                id="cgpp-ch16-flow-arrow"
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
            {view === "flow" ? (
              <FlowView attribute={attribute} lights={lights} />
            ) : view === "interpolation" ? (
              <InterpolationView attribute={attribute} roughness={roughness} />
            ) : (
              <OccupancyView
                divergence={divergence}
                latency={latency}
                lights={lights}
              />
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
