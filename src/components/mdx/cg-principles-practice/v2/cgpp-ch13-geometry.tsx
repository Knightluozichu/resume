"use client";

import { useMemo, useState } from "react";

type View = "transform" | "clip" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "transform",
    label: "坐标变换",
    detail: "旋转几何，比较对象坐标与裁剪空间坐标的差异。",
  },
  {
    id: "clip",
    label: "裁剪与透视",
    detail: "移动裁剪边界，观察哪些顶点和三角形仍有资格进入光栅化。",
  },
  {
    id: "throughput",
    label: "顶点吞吐",
    detail: "增加顶点批次并改变访问等待，比较几何并行与内存瓶颈。",
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

function TransformView({ rotation }: { rotation: number }) {
  const angle = (rotation * Math.PI) / 180;
  const points = [
    [0, -48],
    [54, 42],
    [-54, 42],
  ];
  const transformed = points.map(([x, y]) => [
    200 + x * Math.cos(angle) - y * Math.sin(angle),
    190 + x * Math.sin(angle) + y * Math.cos(angle),
  ]);
  const path = transformed.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        坐标变换：几何在管线中逐步换坐标系
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
        对象空间
      </text>
      <line x1="200" y1="126" x2="200" y2="264" stroke={COLORS.border} />
      <line x1="86" y1="190" x2="314" y2="190" stroke={COLORS.border} />
      <path
        d="M200 142 L254 232 L146 232 Z"
        fill="var(--accent)"
        opacity="0.2"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
        旋转角：{rotation}°
      </text>
      <line
        x1="382"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch13-arrow)"
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
        裁剪空间结果
      </text>
      <path
        d={`M${path} Z`}
        fill="var(--success)"
        opacity="0.24"
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <text x="476" y="238" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）
      </text>
      <text x="476" y="266" fontSize="13" fill={COLORS.secondary}>
        Light（光）等待法线和位置完成变换。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        模型、观察和投影矩阵改变坐标语义，不会凭空改变几何拓扑。
      </text>
    </g>
  );
}

function ClipView({ boundary }: { boundary: number }) {
  const clipX = 160 + boundary * 90;
  const visible = boundary > 0.42;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        裁剪与透视：只把可见几何交给下一阶段
      </text>
      <rect
        x="34"
        y="76"
        width="334"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        视锥截面
      </text>
      <path
        d="M92 246 L200 126 L308 246 Z"
        fill="var(--accent)"
        opacity="0.18"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <line
        x1={clipX}
        y1="120"
        x2={clipX}
        y2="260"
        stroke={COLORS.warning}
        strokeWidth="4"
      />
      <text x="58" y="280" fontSize="13" fill={COLORS.secondary}>
        裁剪边界：{boundary.toFixed(2)}
      </text>
      <line
        x1="386"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch13-arrow)"
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
        阶段判定
      </text>
      <circle
        cx="492"
        cy="148"
        r="9"
        fill={visible ? COLORS.success : COLORS.warning}
      />
      <text
        x="516"
        y="154"
        fontSize="14"
        fill={visible ? COLORS.success : COLORS.warning}
      >
        {visible ? "部分顶点进入透视除法" : "几何被裁剪在视锥外"}
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        先裁剪，再做屏幕映射。
      </text>
      <text x="476" y="224" fontSize="13" fill={COLORS.secondary}>
        深度和法线仍需保持一致。
      </text>
      <text x="476" y="254" fontSize="13" fill={COLORS.secondary}>
        反射率不决定顶点是否可见。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        裁剪减少无效几何，透视除法再把齐次坐标变成规范化坐标。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  vertices,
}: {
  latency: number;
  vertices: number;
}) {
  const active = Math.min(12, Math.max(4, vertices));
  const waiting = Math.min(active, Math.max(1, Math.round(latency * 8)));
  const completed = active - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        顶点吞吐：Parallelism 遇到 memory latency
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
        顶点批次
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const enabled = index < active;
        const blocked = enabled && index >= completed;
        const x = 58 + (index % 4) * 62;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`vertex-task-${index}`}
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
      <line
        x1="364"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch13-arrow)"
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
        已完成顶点：{completed}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待访问：{waiting}
      </text>
      <text x="476" y="214" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）推进独立顶点。
      </text>
      <text x="476" y="274" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）暴露尾部。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        先减少无效顶点和访问等待，再考虑扩大并行批次。
      </text>
    </g>
  );
}

export function CgppCh13GeometryLab() {
  const [view, setView] = useState<View>("transform");
  const [rotation, setRotation] = useState(25);
  const [boundary, setBoundary] = useState(0.55);
  const [vertices, setVertices] = useState(8);
  const [latency, setLatency] = useState(0.35);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("transform");
    setRotation(25);
    setBoundary(0.55);
    setVertices(8);
    setLatency(0.35);
  }

  return (
    <section
      aria-label="几何管线专属坐标与吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch13-geometry-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 GeometryViz · 变换、裁剪与吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个顶点说明它如何换坐标、被裁剪、并行处理
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变旋转、裁剪边界或访存等待时，哪一段几何证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置几何管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择几何管线观察视角">
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
            label="旋转角"
            min={-45}
            max={45}
            step={1}
            value={rotation}
            onChange={setRotation}
          />
          <RangeControl
            label="裁剪边界"
            min={0.1}
            max={0.9}
            step={0.01}
            value={boundary}
            onChange={setBoundary}
          />
          <RangeControl
            label="顶点批次"
            min={4}
            max={12}
            step={1}
            value={vertices}
            onChange={setVertices}
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
                id="cgpp-ch13-arrow"
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
            {view === "transform" ? (
              <TransformView rotation={rotation} />
            ) : view === "clip" ? (
              <ClipView boundary={boundary} />
            ) : (
              <ThroughputView latency={latency} vertices={vertices} />
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
