"use client";

import { useMemo, useState } from "react";

type View = "hierarchy" | "transform" | "batch";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "hierarchy",
    label: "对象层次",
    detail: "展开一个对象的几何、材质和变换，观察谁拥有状态、谁共享资源。",
  },
  {
    id: "transform",
    label: "实例变换",
    detail: "改变实例数量和深度，比较局部坐标、世界坐标与图形管线输入。",
  },
  {
    id: "batch",
    label: "批次执行",
    detail: "把多个对象分成批次，观察光照输入、并行任务和内存等待的边界。",
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
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active
          ? "border-accent bg-accent/10 text-primary"
          : "border-border bg-background text-secondary hover:border-accent hover:text-primary"
      }`}
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
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{value}</span>
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

function HierarchyView({ instances }: { instances: number }) {
  const branches = [
    { y: 116, label: "Mesh", detail: "顶点与索引" },
    { y: 174, label: "Material", detail: "反射率与纹理" },
    { y: 232, label: "Transform", detail: `${instances} 个实例` },
  ];
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        对象层次：拥有关系决定更新范围
      </text>
      <rect
        x="56"
        y="126"
        width="144"
        height="116"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text x="91" y="164" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        Object
      </text>
      <text x="76" y="196" fontSize="13" fill={COLORS.secondary}>
        一个可定位的实体
      </text>
      <text x="76" y="222" fontSize="13" fill={COLORS.secondary}>
        共享资源，独立变换
      </text>
      {branches.map((branch) => (
        <g key={branch.label}>
          <line
            x1="200"
            y1="184"
            x2="302"
            y2={branch.y}
            stroke={COLORS.accent}
            strokeWidth="2"
            markerEnd="url(#cgpp-ch07-arrow)"
          />
          <rect
            x="322"
            y={branch.y - 28}
            width="178"
            height="56"
            rx="10"
            fill={COLORS.elevated}
            stroke={
              branch.label === "Transform" ? COLORS.success : COLORS.border
            }
          />
          <text
            x="344"
            y={branch.y - 3}
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {branch.label}
          </text>
          <text x="344" y={branch.y + 18} fontSize="13" fill={COLORS.secondary}>
            {branch.detail}
          </text>
        </g>
      ))}
      <rect
        x="544"
        y="108"
        width="178"
        height="164"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text
        x="566"
        y="140"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        更新规则
      </text>
      <text x="566" y="174" fontSize="13" fill={COLORS.success}>
        变换：每实例
      </text>
      <text x="566" y="202" fontSize="13" fill={COLORS.warning}>
        材质：可共享
      </text>
      <text x="566" y="230" fontSize="13" fill={COLORS.secondary}>
        几何：少改动
      </text>
      <text x="28" y="316" fontSize="13" fill={COLORS.secondary}>
        对象不是一团数据：层次清楚，才能只更新真正变化的状态。
      </text>
    </g>
  );
}

function TransformView({
  depth,
  instances,
}: {
  depth: number;
  instances: number;
}) {
  const offset = depth * 60;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        实例变换：同一几何可以有多个世界位置
      </text>
      <rect
        x="34"
        y="80"
        width="206"
        height="204"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="58" y="114" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        局部对象
      </text>
      <path
        d="M92 218 L150 138 L208 218 Z"
        fill="var(--accent)"
        opacity="0.28"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text x="68" y="256" fontSize="13" fill={COLORS.secondary}>
        mesh 坐标：固定
      </text>
      <line
        x1="250"
        y1="182"
        x2="326"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch07-arrow)"
      />
      <rect
        x="346"
        y="80"
        width="380"
        height="204"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text
        x="370"
        y="114"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        世界实例
      </text>
      {Array.from({ length: 4 }, (_, index) => {
        const x = 388 + index * 78 + offset * (index % 2 === 0 ? 0.1 : -0.05);
        const y = 168 + (index % 2) * 52;
        return (
          <path
            key={`instance-${index}`}
            d={`M${x} ${y + 34} L${x + 26} ${y} L${x + 52} ${y + 34} Z`}
            fill={index < instances / 3 ? "var(--success)" : "var(--accent)"}
            opacity="0.72"
            stroke={COLORS.border}
          />
        );
      })}
      <text x="370" y="264" fontSize="13" fill={COLORS.secondary}>
        world = model × local；实例数：{instances}
      </text>
      <text x="28" y="322" fontSize="13" fill={COLORS.secondary}>
        改变深度只改变变换后的世界位置；几何、Light（光）和材质规则仍可共享。
      </text>
    </g>
  );
}

function BatchView({ depth, instances }: { depth: number; instances: number }) {
  const active = Math.min(12, Math.max(4, instances));
  const waiting = Math.max(1, Math.round(depth * 3));
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        批次执行：共享资源也有访问代价
      </text>
      <rect
        x="34"
        y="76"
        width="294"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="110" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        实例批次
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const enabled = index < active;
        const blocked = enabled && index < waiting;
        const x = 58 + (index % 4) * 60;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`batch-${index}`}
            x={x}
            y={y}
            width="42"
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
        x1="344"
        y1="182"
        x2="430"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch07-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="110"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        执行证据
      </text>
      <text x="476" y="148" fontSize="14" fill={COLORS.success}>
        并行任务：{active}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待任务：{waiting}
      </text>
      <text x="476" y="216" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）共享几何读取。
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）等待资源。
      </text>
      <text x="476" y="272" fontSize="13" fill={COLORS.secondary}>
        辐射度量 × 反射率：材质输入。
      </text>
      <text x="34" y="324" fontSize="13" fill={COLORS.secondary}>
        批量减少重复准备，但不能跨过资源依赖或访存等待。
      </text>
    </g>
  );
}

export function CgppCh07ObjectLab() {
  const [view, setView] = useState<View>("hierarchy");
  const [instances, setInstances] = useState(6);
  const [depth, setDepth] = useState(0.5);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("hierarchy");
    setInstances(6);
    setDepth(0.5);
  }

  return (
    <section
      aria-label="对象管线专属实例实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch07-object-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ObjectViz · 对象与实例
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让共享与独立各自有证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：增加实例时，几何、材质和变换哪一项应该复制，哪一项应该共享？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置对象管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择对象观察视角">
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
            label="实例数量"
            min={2}
            max={12}
            step={1}
            value={instances}
            onChange={setInstances}
          />
          <RangeControl
            label="资源深度"
            min={0.2}
            max={1.2}
            step={0.1}
            value={depth}
            onChange={setDepth}
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
                id="cgpp-ch07-arrow"
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
            {view === "hierarchy" ? (
              <HierarchyView instances={instances} />
            ) : view === "transform" ? (
              <TransformView depth={depth} instances={instances} />
            ) : (
              <BatchView depth={depth} instances={instances} />
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
