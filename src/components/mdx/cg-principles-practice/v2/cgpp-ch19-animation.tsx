"use client";

import { useMemo, useState } from "react";

type View = "timeline" | "interpolation" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "timeline",
    label: "时间轴",
    detail: "移动时间参数，观察关键帧如何定义运动阶段以及管线需要更新什么。",
  },
  {
    id: "interpolation",
    label: "姿态插值",
    detail: "在两个姿态之间插值，区分平滑的路径与错误的角度跳变。",
  },
  {
    id: "throughput",
    label: "采样吞吐",
    detail: "增加动画采样和访问等待，比较并行更新与共享数据延迟。",
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

function TimelineView({ light, time }: { light: number; time: number }) {
  const playheadX = 70 + time * 590;
  const poseX = 122 + time * 260;
  const poseY = 210 - Math.sin(time * Math.PI) * 68;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        时间轴：运动由阶段和时间参数共同定义
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        当前时间：{time.toFixed(2)} · 光照更新：{light.toFixed(2)} ·
        播放头从关键帧 A 走向 B
      </text>
      <rect
        x="28"
        y="92"
        width="690"
        height="104"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="70"
        y1="148"
        x2="660"
        y2="148"
        stroke={COLORS.border}
        strokeWidth="4"
      />
      <circle cx="70" cy="148" r="12" fill={COLORS.accent} />
      <circle cx="365" cy="148" r="12" fill={COLORS.accent} />
      <circle cx="660" cy="148" r="12" fill={COLORS.accent} />
      <line
        x1={playheadX}
        y1="108"
        x2={playheadX}
        y2="178"
        stroke={COLORS.warning}
        strokeWidth="4"
      />
      <text x="52" y="126" fontSize="13" fill={COLORS.primary}>
        关键帧 A
      </text>
      <text x="336" y="126" fontSize="13" fill={COLORS.primary}>
        中间事件
      </text>
      <text x="632" y="126" fontSize="13" fill={COLORS.primary}>
        关键帧 B
      </text>
      <text x="28" y="226" fontSize="13" fill={COLORS.secondary}>
        Motion（运动）先改变对象姿态，Graphics
        Pipeline（图形管线）再用新姿态生成片段。
      </text>
      <circle
        cx={poseX}
        cy={poseY}
        r="22"
        fill={COLORS.success}
        opacity="0.86"
      />
      <line
        x1={poseX}
        y1={poseY}
        x2={poseX + 42}
        y2={poseY - 26}
        stroke={COLORS.warning}
        strokeWidth="5"
      />
      <text x="28" y="276" fontSize="13" fill={COLORS.secondary}>
        当前姿态：位置随时间变化 · Light（光）仍应在当前姿态上重新评估。
      </text>
      <rect
        x="28"
        y="300"
        width="690"
        height="30"
        rx="8"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="44" y="321" fontSize="12" fill={COLORS.secondary}>
        只移动播放头不应改变关键帧数据；它改变的是采样时刻与姿态输出。
      </text>
    </g>
  );
}

function InterpolationView({ curve, time }: { curve: number; time: number }) {
  const eased = time * time * (3 - 2 * time) * (0.7 + curve * 0.3);
  const pointX = 88 + Math.min(1, eased) * 246;
  const pointY = 238 - Math.sin(Math.min(1, eased) * Math.PI) * 124;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        姿态插值：连续路径比逐帧跳变更容易验证
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        时间参数：{time.toFixed(2)} · 平滑曲线：{curve.toFixed(2)} · 插值结果：
        {eased.toFixed(2)}
      </text>
      <line
        x1="88"
        y1="238"
        x2="334"
        y2="238"
        stroke={COLORS.border}
        strokeWidth="3"
      />
      <path
        d="M88 238 C150 236 150 108 210 112 C270 116 268 238 334 238"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="4"
      />
      <circle cx="88" cy="238" r="11" fill={COLORS.warning} />
      <circle cx="334" cy="238" r="11" fill={COLORS.warning} />
      <circle cx={pointX} cy={pointY} r="13" fill={COLORS.success} />
      <text x="70" y="274" fontSize="13" fill={COLORS.primary}>
        姿态 A
      </text>
      <text x="316" y="274" fontSize="13" fill={COLORS.primary}>
        姿态 B
      </text>
      <text x={pointX + 16} y={pointY + 5} fontSize="13" fill={COLORS.success}>
        当前姿态
      </text>
      <line
        x1="364"
        y1="174"
        x2="414"
        y2="174"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch19-animation-arrow)"
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
        姿态输入
      </text>
      <text x="460" y="158" fontSize="13" fill={COLORS.secondary}>
        Pose Interpolation（姿态插值）
      </text>
      <text x="460" y="190" fontSize="13" fill={COLORS.secondary}>
        位置：路径上的点
      </text>
      <text x="460" y="222" fontSize="13" fill={COLORS.secondary}>
        旋转：连续的朝向
      </text>
      <text x="460" y="254" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）随姿态更新
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        插值只生成姿态；光照和可见性仍要在新的姿态上重新计算。
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
        采样吞吐：Parallelism 遇到 memory latency
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        每个方格代表一个动画采样任务；采样越密，姿态更新与资源读取越多。
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
            key={`animation-sample-${index}`}
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
        完成：{completed} · 等待：{waiting} · 每帧采样：{samples}
      </text>
      <line
        x1="370"
        y1="178"
        x2="414"
        y2="178"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch19-animation-arrow)"
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
        Parallelism（并行性）：{(1 - latency * 0.34).toFixed(2)}
      </text>
      <text x="460" y="194" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        采样间隔：{(1 / samples).toFixed(2)} · 资源批次：
        {Math.ceil(samples / 2)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先查共享姿态数据，再加采样密度。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行采样可以提高吞吐，但不能消除骨骼、纹理或光照数据的访问等待。
      </text>
    </g>
  );
}

export function CgppCh19AnimationLab() {
  const [view, setView] = useState<View>("timeline");
  const [time, setTime] = useState(0.42);
  const [curve, setCurve] = useState(0.56);
  const [light, setLight] = useState(0.72);
  const [samples, setSamples] = useState(6);
  const [latency, setLatency] = useState(0.32);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("timeline");
    setTime(0.42);
    setCurve(0.56);
    setLight(0.72);
    setSamples(6);
    setLatency(0.32);
  }

  return (
    <section
      aria-label="动画管线专属时间轴与采样吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch19-animation-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-35 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MotionViz · 关键帧、姿态与采样
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个运动对象展示它何时变化、如何插值、为何等待
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只改变时间参数、插值曲线或访问等待时，哪类动画证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置动画管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择动画管线观察视角">
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
            label="时间参数"
            min={0.05}
            max={0.95}
            step={0.01}
            value={time}
            onChange={setTime}
          />
          <RangeControl
            label="插值曲线"
            min={0.05}
            max={0.95}
            step={0.01}
            value={curve}
            onChange={setCurve}
          />
          <RangeControl
            label="光照更新"
            min={0.2}
            max={1.3}
            step={0.01}
            value={light}
            onChange={setLight}
          />
          <RangeControl
            label="每帧采样"
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
                id="cgpp-ch19-animation-arrow"
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
            {view === "timeline" ? (
              <TimelineView light={light} time={time} />
            ) : view === "interpolation" ? (
              <InterpolationView curve={curve} time={time} />
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
