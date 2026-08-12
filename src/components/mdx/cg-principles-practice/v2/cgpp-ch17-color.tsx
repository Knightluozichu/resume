"use client";

import { useMemo, useState } from "react";

type View = "pipeline" | "space" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "能量到显示",
    detail: "沿着线性能量、颜色模型、传递函数和显示输出追踪一束光。",
  },
  {
    id: "space",
    label: "模型与色域",
    detail: "改变可用色域，观察颜色模型如何裁剪超出显示能力的颜色。",
  },
  {
    id: "throughput",
    label: "硬件吞吐",
    detail: "改变样本数与访问等待，比较并行颜色转换和内存尾部延迟。",
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

function PipelineStage({
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
        height="94"
        rx="12"
        fill={active ? "var(--accent)" : COLORS.elevated}
        fillOpacity={active ? "0.18" : "1"}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth={active ? "3" : "2"}
      />
      <circle
        cx={x + 20}
        cy="150"
        r="7"
        fill={active ? COLORS.accent : COLORS.border}
      />
      <text
        x={x + 36}
        y="156"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="185" fontSize="12" fill={COLORS.secondary}>
        {detail}
      </text>
      <text
        x={x + 16}
        y="206"
        fontSize="12"
        fill={active ? COLORS.accent : COLORS.secondary}
      >
        {active ? "当前观测" : "保持不变"}
      </text>
    </g>
  );
}

function PipelineView({
  exposure,
  radiance,
}: {
  exposure: number;
  radiance: number;
}) {
  const encoded = 1 - Math.exp(-radiance * exposure);
  const activeStage = Math.min(
    3,
    Math.max(0, Math.round((radiance - 0.2) * 3)),
  );
  const stageX = [28, 190, 352, 514];
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        颜色管线：线性能量如何成为显示值
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        当前输出：{encoded.toFixed(2)} · 曝光：{exposure.toFixed(2)} ·
        活跃阶段：{activeStage + 1}
      </text>
      {stageX.slice(0, 3).map((x) => (
        <line
          key={`color-flow-arrow-${x}`}
          x1={x + 136}
          y1="173"
          x2={x + 156}
          y2="173"
          stroke={COLORS.accent}
          strokeWidth="3"
          markerEnd="url(#cgpp-ch17-color-arrow)"
        />
      ))}
      <PipelineStage
        active={activeStage === 0}
        detail="Radiometry（辐射度量）"
        label="线性能量"
        x={stageX[0]}
      />
      <PipelineStage
        active={activeStage === 1}
        detail="RGB 通道与颜色模型"
        label="颜色模型"
        x={stageX[1]}
      />
      <PipelineStage
        active={activeStage === 2}
        detail="曝光与传递函数"
        label="编码"
        x={stageX[2]}
      />
      <PipelineStage
        active={activeStage === 3}
        detail="显示器可表达范围"
        label="输出"
        x={stageX[3]}
      />
      <rect
        x="28"
        y="258"
        width="690"
        height="50"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="289" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）传递数据，Light（光）和
        Reflectance（反射率）决定能量来源与表面响应。
      </text>
      <text x="28" y="340" fontSize="13" fill={COLORS.secondary}>
        混合与曝光应在线性语义中完成，最后才把结果编码给显示设备。
      </text>
    </g>
  );
}

function SpaceView({ gamut, radiance }: { gamut: number; radiance: number }) {
  const pointX = 128 + Math.min(1, radiance * 0.62) * 194;
  const pointY = 254 - Math.min(1, radiance * 0.75) * 132;
  const gamutX = 118 + gamut * 100;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Color Model 与 Gamut：可表示不等于可显示
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        颜色模型规定通道如何描述颜色，色域规定设备能可靠表达哪些颜色。
      </text>
      <polygon
        points="118,254 330,254 188,92"
        fill="var(--accent)"
        fillOpacity="0.14"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <polygon
        points={`${gamutX},238 ${gamutX + 118},238 ${gamutX + 38},136`}
        fill="var(--success)"
        fillOpacity="0.16"
        stroke={COLORS.success}
        strokeWidth="2"
      />
      <circle
        cx={pointX}
        cy={pointY}
        r="12"
        fill={pointX > gamutX + 40 ? COLORS.warning : COLORS.success}
      />
      <text x="104" y="278" fontSize="13" fill={COLORS.primary}>
        颜色模型
      </text>
      <text x={gamutX + 8} y="270" fontSize="13" fill={COLORS.success}>
        Gamut（色域）
      </text>
      <text
        x={pointX + 18}
        y={pointY + 5}
        fontSize="13"
        fill={pointX > gamutX + 40 ? COLORS.warning : COLORS.success}
      >
        {pointX > gamutX + 40 ? "超出" : "可表达"}
      </text>
      <line
        x1="370"
        y1="174"
        x2="414"
        y2="174"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch17-color-arrow)"
      />
      <rect
        x="436"
        y="88"
        width="280"
        height="216"
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
        颜色证据
      </text>
      <text x="460" y="158" fontSize="13" fill={COLORS.secondary}>
        目标能量：{radiance.toFixed(2)}
      </text>
      <text x="460" y="190" fontSize="13" fill={COLORS.secondary}>
        可用色域：{gamut.toFixed(2)}
      </text>
      <text x="460" y="222" fontSize="13" fill={COLORS.secondary}>
        {pointX > gamutX + 40 ? "需要裁剪或映射" : "保持颜色关系"}
      </text>
      <text x="460" y="258" fontSize="13" fill={COLORS.secondary}>
        先区分模型错误与设备范围限制。
      </text>
      <text x="28" y="340" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）说明有多少能量，Gamut（色域）说明设备能保留多少颜色关系。
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
        颜色转换吞吐：Parallelism 遇到 memory latency
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        每个方格代表一个颜色样本；样本越多，访问与转换的工作量越大。
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
            key={`sample-lane-${index}`}
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
        完成：{completed} · 等待：{waiting} · 每片段样本：{samples}
      </text>
      <line
        x1="370"
        y1="178"
        x2="414"
        y2="178"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch17-color-arrow)"
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
        Parallelism（并行性）：{(1 - latency * 0.35).toFixed(2)}
      </text>
      <text x="460" y="194" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        颜色样本：{samples} · 访问批次：{Math.ceil(samples / 2)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先确认局部性，再提高样本数。
      </text>
      <text x="28" y="340" fontSize="13" fill={COLORS.secondary}>
        并行转换可以隐藏部分等待，但无法消除共享颜色表或纹理的访问依赖。
      </text>
    </g>
  );
}

export function CgppCh17ColorLab() {
  const [view, setView] = useState<View>("pipeline");
  const [radiance, setRadiance] = useState(0.72);
  const [exposure, setExposure] = useState(1.15);
  const [gamut, setGamut] = useState(0.62);
  const [samples, setSamples] = useState(6);
  const [latency, setLatency] = useState(0.32);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("pipeline");
    setRadiance(0.72);
    setExposure(1.15);
    setGamut(0.62);
    setSamples(6);
    setLatency(0.32);
  }

  return (
    <section
      aria-label="颜色管线专属能量与色域实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch17-color-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-28 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ColorViz · 能量、色域与吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一束光说明它如何被编码、限制并并行送到显示器
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只改变曝光、色域或访问等待时，哪一类颜色证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置颜色管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择颜色管线观察视角">
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
            label="入射能量"
            min={0.1}
            max={1.4}
            step={0.01}
            value={radiance}
            onChange={setRadiance}
          />
          <RangeControl
            label="曝光"
            min={0.4}
            max={2}
            step={0.01}
            value={exposure}
            onChange={setExposure}
          />
          <RangeControl
            label="可用色域"
            min={0.25}
            max={0.95}
            step={0.01}
            value={gamut}
            onChange={setGamut}
          />
          <RangeControl
            label="颜色样本"
            min={2}
            max={12}
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
                id="cgpp-ch17-color-arrow"
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
            {view === "pipeline" ? (
              <PipelineView exposure={exposure} radiance={radiance} />
            ) : view === "space" ? (
              <SpaceView gamut={gamut} radiance={radiance} />
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
