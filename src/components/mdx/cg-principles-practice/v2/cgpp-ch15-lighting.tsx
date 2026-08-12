"use client";

import { useMemo, useState } from "react";

type View = "direct" | "shadow" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "direct",
    label: "直接光照",
    detail: "移动光源方向，观察表面法线与入射方向如何共同决定亮度。",
  },
  {
    id: "shadow",
    label: "阴影遮挡",
    detail: "移动遮挡物，比较光线可达性与材质反射率的不同责任。",
  },
  {
    id: "throughput",
    label: "多光源吞吐",
    detail: "增加光源并改变访问等待，比较并行照明任务和内存瓶颈。",
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

function DirectView({ angle, energy }: { angle: number; energy: number }) {
  const radians = (angle * Math.PI) / 180;
  const intensity = Math.max(0.08, Math.cos(radians) * energy);
  const lightX = 204 + Math.cos(radians) * 112;
  const lightY = 184 - Math.sin(radians) * 72;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        直接光照：法线决定入射能量如何落在表面
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
        表面与光源
      </text>
      <circle
        cx="200"
        cy="206"
        r="64"
        fill="var(--accent)"
        opacity={intensity}
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <line
        x1={lightX}
        y1={lightY}
        x2="200"
        y2="206"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch15-arrow)"
      />
      <circle cx={lightX} cy={lightY} r="10" fill={COLORS.warning} />
      <line
        x1="200"
        y1="206"
        x2="200"
        y2="126"
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch15-arrow)"
      />
      <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
        光角：{angle}° · 强度：{energy.toFixed(2)}
      </text>
      <line
        x1="382"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch15-arrow)"
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
        能量证据
      </text>
      <text x="476" y="150" fontSize="14" fill={COLORS.success}>
        n · l：{Math.cos(radians).toFixed(2)}
      </text>
      <text x="476" y="182" fontSize="14" fill={COLORS.warning}>
        输出：{intensity.toFixed(2)}
      </text>
      <text x="476" y="218" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）提供位置和法线。
      </text>
      <text x="476" y="248" fontSize="13" fill={COLORS.secondary}>
        Light（光）决定入射方向。
      </text>
      <text x="476" y="278" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）解释能量单位。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        法线和光线夹角改变亮度，不能用材质参数代替几何方向。
      </text>
    </g>
  );
}

function ShadowView({ blocker }: { blocker: number }) {
  const blocked = blocker > 0.48;
  const blockerX = 170 + blocker * 120;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        阴影遮挡：光线不可达与表面反射是两件事
      </text>
      <rect
        x="34"
        y="76"
        width="342"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        光线可达性
      </text>
      <circle cx="92" cy="132" r="11" fill={COLORS.warning} />
      <line
        x1="102"
        y1="139"
        x2={blockerX}
        y2="206"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch15-arrow)"
      />
      <rect
        x={blockerX - 18}
        y="176"
        width="36"
        height="60"
        rx="6"
        fill="var(--accent)"
        stroke={COLORS.accent}
      />
      <line
        x1={blockerX + 18}
        y1="206"
        x2="314"
        y2="206"
        stroke={blocked ? COLORS.warning : COLORS.success}
        strokeWidth="4"
      />
      <circle
        cx="314"
        cy="206"
        r="18"
        fill={blocked ? COLORS.warning : COLORS.success}
        opacity="0.75"
      />
      <text x="58" y="274" fontSize="13" fill={COLORS.secondary}>
        遮挡位置：{blocker.toFixed(2)} · {blocked ? "阴影" : "可见"}
      </text>
      <line
        x1="394"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch15-arrow)"
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
        阴影判定
      </text>
      <circle
        cx="492"
        cy="148"
        r="9"
        fill={blocked ? COLORS.warning : COLORS.success}
      />
      <text
        x="516"
        y="154"
        fontSize="14"
        fill={blocked ? COLORS.warning : COLORS.success}
      >
        {blocked ? "光线被遮挡" : "光线到达表面"}
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        反射率只影响到达后的能量比例。
      </text>
      <text x="476" y="224" fontSize="13" fill={COLORS.secondary}>
        遮挡先决定是否有直接光。
      </text>
      <text x="476" y="254" fontSize="13" fill={COLORS.secondary}>
        阴影测试和材质响应要分开调试。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        阴影是可见性证据，不是把反射率调成零的替代方案。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  lights,
}: {
  latency: number;
  lights: number;
}) {
  const active = Math.min(12, Math.max(4, lights));
  const waiting = Math.min(active, Math.max(1, Math.round(latency * 8)));
  const completed = active - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        多光源吞吐：Parallelism 遇到 memory latency
      </text>
      <rect
        x="34"
        y="76"
        width="314"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        光照任务
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const enabled = index < active;
        const blocked = enabled && index >= completed;
        const x = 58 + (index % 4) * 62;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`light-task-${index}`}
            x={x}
            y={y}
            width="44"
            height="26"
            rx="6"
            fill={
              blocked
                ? "var(--warning)"
                : enabled
                  ? "var(--accent)"
                  : "var(--bg)"
            }
            opacity={enabled ? 0.84 : 1}
            stroke={enabled ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
        光源数：{lights} · 等待比例：{latency.toFixed(2)}
      </text>
      <line
        x1="364"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch15-arrow)"
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
        执行证据
      </text>
      <text x="476" y="146" fontSize="14" fill={COLORS.success}>
        已完成光照：{completed}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待访问：{waiting}
      </text>
      <text x="476" y="214" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）推进独立光源。
      </text>
      <text x="476" y="274" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）延长尾部。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        光源越多不一定越快；先看共享数据和访问局部性。
      </text>
    </g>
  );
}

export function CgppCh15LightingLab() {
  const [view, setView] = useState<View>("direct");
  const [angle, setAngle] = useState(35);
  const [energy, setEnergy] = useState(1.2);
  const [blocker, setBlocker] = useState(0.5);
  const [lights, setLights] = useState(8);
  const [latency, setLatency] = useState(0.35);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("direct");
    setAngle(35);
    setEnergy(1.2);
    setBlocker(0.5);
    setLights(8);
    setLatency(0.35);
  }

  return (
    <section
      aria-label="光照管线专属能量与吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch15-lighting-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 LightingViz · 直接光、阴影与吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一束光说明它如何到达、被遮挡、并行计算
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变光角、遮挡位置或访问等待时，哪类光照证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置光照管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择光照管线观察视角">
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
            label="光源角度"
            min={-60}
            max={60}
            step={1}
            value={angle}
            onChange={setAngle}
          />
          <RangeControl
            label="光源能量"
            min={0.2}
            max={2}
            step={0.05}
            value={energy}
            onChange={setEnergy}
          />
          <RangeControl
            label="遮挡位置"
            min={0.1}
            max={0.9}
            step={0.01}
            value={blocker}
            onChange={setBlocker}
          />
          <RangeControl
            label="光源数量"
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
                id="cgpp-ch15-arrow"
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
            {view === "direct" ? (
              <DirectView angle={angle} energy={energy} />
            ) : view === "shadow" ? (
              <ShadowView blocker={blocker} />
            ) : (
              <ThroughputView latency={latency} lights={lights} />
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
