"use client";

import { useMemo, useState } from "react";

type View = "mesh" | "transform" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "mesh",
    label: "网格结构",
    detail: "改变细分级别，观察顶点、边和面如何共同描述一个模型。",
  },
  {
    id: "transform",
    label: "空间变换",
    detail: "移动缩放模型，区分局部空间、世界空间与法线方向的责任。",
  },
  {
    id: "throughput",
    label: "顶点吞吐",
    detail: "增加顶点任务并改变访问等待，比较并行变换与共享资源延迟。",
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

function MeshView({
  detail,
  subdivisions,
}: {
  detail: number;
  subdivisions: number;
}) {
  const count = Math.min(5, Math.max(2, Math.round(subdivisions)));
  const size = 190 + detail * 40;
  const startX = 116 - detail * 18;
  const startY = 104 + detail * 9;
  const cells = Array.from({ length: count + 1 }, (_, index) => index);
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        网格结构：模型由可检查的顶点、边和面组成
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        细分级别：{count} · 网格尺寸：{size.toFixed(0)} · 顶点数据保持可追踪
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
      <polygon
        points={`${startX},${startY + size} ${startX + size},${startY + size} ${startX + size * 0.55},${startY}`}
        fill="var(--accent)"
        fillOpacity="0.12"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      {cells.map((index) => {
        const x = startX + (size * index) / count;
        const y = startY + size - (size * index) / count;
        return (
          <g key={`mesh-grid-${index}`}>
            <line
              x1={x}
              y1={startY + size}
              x2={startX + size * 0.55 + (x - startX) * 0.45}
              y2={startY}
              stroke={COLORS.border}
              strokeWidth="1.5"
            />
            <line
              x1={startX}
              y1={startY + size - (size * index) / count}
              x2={startX + size}
              y2={startY + size - (size * index) / count}
              stroke={COLORS.border}
              strokeWidth="1.5"
            />
            <circle cx={x} cy={startY + size} r="4" fill={COLORS.warning} />
            <circle
              cx={startX + ((size * index) / count) * 0.55}
              cy={startY + size - (size * index) / count}
              r="4"
              fill={COLORS.warning}
            />
            <circle
              cx={startX + size}
              cy={startY + size - (size * index) / count}
              r="4"
              fill={COLORS.warning}
            />
          </g>
        );
      })}
      <line
        x1="372"
        y1="184"
        x2="414"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch20-modeling-arrow)"
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
        模型契约
      </text>
      <text x="460" y="158" fontSize="13" fill={COLORS.secondary}>
        顶点：位置、法线、材质坐标
      </text>
      <text x="460" y="190" fontSize="13" fill={COLORS.secondary}>
        边：连接关系与方向
      </text>
      <text x="460" y="222" fontSize="13" fill={COLORS.secondary}>
        面：可供 Graphics Pipeline（图形管线）处理
      </text>
      <text x="460" y="258" fontSize="13" fill={COLORS.secondary}>
        细分增加细节，也增加变换成本。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        先检查拓扑和法线，再判断 Light（光）或材质响应是否异常。
      </text>
    </g>
  );
}

function TransformView({ light, scale }: { light: number; scale: number }) {
  const modelX = 152 + scale * 70;
  const modelY = 214 - scale * 32;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        空间变换：局部坐标如何进入世界与相机
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        缩放：{scale.toFixed(2)} · 光照能量：{light.toFixed(2)} ·
        变换只改变位置与方向语义
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
      <line
        x1="72"
        y1="250"
        x2="310"
        y2="250"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="118"
        y1="274"
        x2="118"
        y2="118"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <polygon
        points="150,230 224,230 184,156"
        fill="var(--accent)"
        fillOpacity="0.2"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <line
        x1={modelX}
        y1={modelY}
        x2={modelX + 44}
        y2={modelY - 24}
        stroke={COLORS.warning}
        strokeWidth="4"
        markerEnd="url(#cgpp-ch20-modeling-arrow)"
      />
      <text x="74" y="112" fontSize="13" fill={COLORS.primary}>
        局部空间
      </text>
      <text x="226" y="274" fontSize="13" fill={COLORS.primary}>
        世界空间
      </text>
      <line
        x1="356"
        y1="184"
        x2="414"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch20-modeling-arrow)"
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
        变换证据
      </text>
      <text x="460" y="158" fontSize="13" fill={COLORS.secondary}>
        位置：M × p
      </text>
      <text x="460" y="190" fontSize="13" fill={COLORS.secondary}>
        法线：逆转置矩阵
      </text>
      <text x="460" y="222" fontSize="13" fill={COLORS.secondary}>
        Reflectance（反射率）：材质属性
      </text>
      <text x="460" y="258" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）：能量语义
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        缩放模型时，法线不能简单照搬位置变换；空间契约必须一起更新。
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
  const total = 12;
  const waiting = Math.min(total, Math.max(1, Math.round(latency * 8)));
  const completed = total - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        顶点吞吐：Parallelism 遇到 memory latency
      </text>
      <text x="28" y="62" fontSize="13" fill={COLORS.secondary}>
        每个方格代表一个顶点变换任务；模型越密，访问和变换工作越多。
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
            key={`vertex-task-${index}`}
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
        完成：{completed} · 等待：{waiting} · 模型顶点：{vertices}
      </text>
      <line
        x1="370"
        y1="178"
        x2="414"
        y2="178"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch20-modeling-arrow)"
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
        顶点批次：{Math.ceil(vertices / 120)} · 读取量：
        {Math.round(vertices * 0.4)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先查数据局部性，再增加模型细节。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行变换能隐藏部分计算，但无法消除共享顶点或材质数据的访问等待。
      </text>
    </g>
  );
}

export function CgppCh20ModelingLab() {
  const [view, setView] = useState<View>("mesh");
  const [subdivisions, setSubdivisions] = useState(3);
  const [scale, setScale] = useState(0.62);
  const [light, setLight] = useState(0.72);
  const [vertices, setVertices] = useState(480);
  const [latency, setLatency] = useState(0.32);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("mesh");
    setSubdivisions(3);
    setScale(0.62);
    setLight(0.72);
    setVertices(480);
    setLatency(0.32);
  }

  return (
    <section
      aria-label="建模管线专属网格与顶点吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch20-modeling-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ModelViz · 网格、变换与顶点吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个模型展示它如何描述、变换并进入图形管线
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只改变细分、缩放或访问等待时，哪类建模证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置建模管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择建模管线观察视角">
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
            label="细分级别"
            min={2}
            max={5}
            step={1}
            value={subdivisions}
            onChange={setSubdivisions}
          />
          <RangeControl
            label="模型缩放"
            min={0.2}
            max={1.3}
            step={0.01}
            value={scale}
            onChange={setScale}
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
            label="模型顶点"
            min={120}
            max={1200}
            step={20}
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
            viewBox="0 0 760 380"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch20-modeling-arrow"
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
            {view === "mesh" ? (
              <MeshView detail={scale} subdivisions={subdivisions} />
            ) : view === "transform" ? (
              <TransformView light={light} scale={scale} />
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
