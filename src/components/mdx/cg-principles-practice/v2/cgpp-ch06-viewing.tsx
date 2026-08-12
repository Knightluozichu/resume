"use client";

import { useMemo, useState } from "react";

type Stage = "chain" | "clip" | "cost";

const STAGES: readonly { id: Stage; label: string; detail: string }[] = [
  {
    id: "chain",
    label: "阶段交接",
    detail: "沿着图形管线记录同一个点在观察、裁剪、视口和像素阶段的证据。",
  },
  {
    id: "clip",
    label: "裁剪空间",
    detail: "拖动深度，观察齐次除法和裁剪边界如何决定一个点是否可见。",
  },
  {
    id: "cost",
    label: "执行代价",
    detail: "增加视口任务，比较并行性、光照输入和内存延迟的责任边界。",
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

function StageButton({
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

function ChainView({ depth }: { depth: number }) {
  const stages = [
    { x: 34, label: "世界点", sub: "p" },
    { x: 190, label: "观察", sub: "V p" },
    { x: 346, label: "裁剪", sub: "P V p" },
    { x: 502, label: "视口", sub: "x / y" },
    { x: 658, label: "像素", sub: "color" },
  ];
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        图形管线：每次交接都要留下证据
      </text>
      {stages.slice(0, -1).map((item, index) => (
        <line
          key={`chain-${item.label}`}
          x1={item.x + 108}
          y1="154"
          x2={stages[index + 1].x - 12}
          y2="154"
          stroke={COLORS.accent}
          strokeWidth="3"
          markerEnd="url(#cgpp-ch06-arrow)"
        />
      ))}
      {stages.map((item, index) => (
        <g key={item.label}>
          <rect
            x={item.x}
            y="106"
            width="108"
            height="94"
            rx="12"
            fill={index === 2 ? "var(--accent)" : COLORS.elevated}
            opacity={index === 2 ? 0.2 : 1}
            stroke={index === 4 ? COLORS.success : COLORS.border}
            strokeWidth="2"
          />
          <circle
            cx={item.x + 20}
            cy="130"
            r="8"
            fill={index < 3 ? COLORS.accent : COLORS.success}
          />
          <text
            x={item.x + 36}
            y="136"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {item.label}
          </text>
          <text x={item.x + 20} y="174" fontSize="14" fill={COLORS.secondary}>
            {item.sub}
          </text>
        </g>
      ))}
      <text x="28" y="246" fontSize="14" fill={COLORS.primary}>
        p_ndc = p_clip / w
      </text>
      <text x="28" y="278" fontSize="13" fill={COLORS.secondary}>
        齐次除法把深度带回可比较的范围；w 的符号与大小必须被记录。
      </text>
      <text x="28" y="312" fontSize="13" fill={COLORS.warning}>
        当前深度证据：{depth.toFixed(2)}；先查第一个偏离阶段，再修最终颜色。
      </text>
    </g>
  );
}

function ClipView({ depth }: { depth: number }) {
  const pointX = 160 + depth * 330;
  const pointY = 178 - depth * 64;
  const visible = depth <= 0.82;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        裁剪空间：可见不是由颜色决定的
      </text>
      <rect
        x="82"
        y="70"
        width="470"
        height="206"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <rect
        x="154"
        y="98"
        width="326"
        height="150"
        rx="8"
        fill="var(--bg)"
        stroke={COLORS.accent}
        strokeWidth="3"
        strokeDasharray="8 6"
      />
      <line
        x1="317"
        y1="98"
        x2="317"
        y2="248"
        stroke={COLORS.border}
        strokeWidth="1"
      />
      <line
        x1="154"
        y1="173"
        x2="480"
        y2="173"
        stroke={COLORS.border}
        strokeWidth="1"
      />
      <circle
        cx={pointX}
        cy={pointY}
        r="12"
        fill={visible ? COLORS.success : COLORS.warning}
      />
      <line
        x1="317"
        y1="173"
        x2={pointX}
        y2={pointY}
        stroke={visible ? COLORS.success : COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch06-arrow)"
      />
      <text x="174" y="124" fontSize="13" fill={COLORS.secondary}>
        -1 ≤ x / w ≤ 1
      </text>
      <text x="174" y="228" fontSize="13" fill={COLORS.secondary}>
        -1 ≤ y / w ≤ 1
      </text>
      <text x="318" y="90" fontSize="13" fill={COLORS.accent}>
        裁剪边界
      </text>
      <text
        x={Math.min(492, pointX + 16)}
        y={Math.max(78, pointY - 12)}
        fontSize="13"
        fill={visible ? COLORS.success : COLORS.warning}
      >
        {visible ? "保留" : "裁掉"}
      </text>
      <text x="584" y="104" fontSize="14" fill={COLORS.primary}>
        z / w = {depth.toFixed(2)}
      </text>
      <text x="584" y="140" fontSize="13" fill={COLORS.secondary}>
        w 决定透视除法的尺度。
      </text>
      <text x="584" y="174" fontSize="13" fill={COLORS.secondary}>
        边界外没有片段输入。
      </text>
      <text x="584" y="218" fontSize="13" fill={COLORS.warning}>
        Light（光）只会影响保留后的片段。
      </text>
      <text x="28" y="322" fontSize="13" fill={COLORS.secondary}>
        若点已被裁掉，继续调光照不会让它重新出现。
      </text>
    </g>
  );
}

function CostView({ depth, tiles }: { depth: number; tiles: number }) {
  const taskCount = Math.min(12, Math.max(4, tiles));
  const waitingCount = Math.max(1, Math.round(depth * 3));
  const tasks = Array.from({ length: 12 }, (_, index) => ({
    active: index < taskCount,
    waiting: index < waitingCount,
  }));
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware：阶段可并行，依赖仍会等待
      </text>
      <rect
        x="34"
        y="76"
        width="296"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="110" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        视口任务
      </text>
      {tasks.map((task, index) => {
        const x = 58 + (index % 4) * 60;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`task-${index}`}
            x={x}
            y={y}
            width="42"
            height="26"
            rx="6"
            fill={
              task.waiting
                ? "var(--warning)"
                : task.active
                  ? "var(--accent)"
                  : "var(--bg)"
            }
            opacity={task.active ? 0.84 : 1}
            stroke={task.active ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <line
        x1="346"
        y1="182"
        x2="430"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch06-arrow)"
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
        吞吐与等待
      </text>
      <text x="476" y="148" fontSize="14" fill={COLORS.success}>
        并行任务：{taskCount}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待任务：{waitingCount}
      </text>
      <text x="476" y="216" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）负责填充执行单元。
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）拉长尾部。
      </text>
      <text x="476" y="272" fontSize="13" fill={COLORS.secondary}>
        辐射度量与反射率是片段输入。
      </text>
      <text x="34" y="324" fontSize="13" fill={COLORS.secondary}>
        先区分片段是否存在，再判断光照和硬件是否成为瓶颈。
      </text>
    </g>
  );
}

export function CgppCh06ViewingLab() {
  const [stage, setStage] = useState<Stage>("chain");
  const [depth, setDepth] = useState(0.55);
  const [tiles, setTiles] = useState(8);
  const current = useMemo(
    () => STAGES.find((item) => item.id === stage) ?? STAGES[0],
    [stage],
  );

  function reset() {
    setStage("chain");
    setDepth(0.55);
    setTiles(8);
  }

  return (
    <section
      aria-label="观察管线专属阶段实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch06-viewing-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 PipelineViz · 观察阶段
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            找到第一个偏离，而不是猜最后的颜色
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把深度或任务数调大时，哪一个阶段的证据会先改变？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置观察管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择观察管线视角">
          {STAGES.map((item) => (
            <StageButton
              key={item.id}
              active={stage === item.id}
              onClick={() => setStage(item.id)}
            >
              {item.label}
            </StageButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <RangeControl
            label="深度证据"
            min={0.2}
            max={1.2}
            step={0.05}
            value={depth}
            onChange={setDepth}
          />
          <RangeControl
            label="视口任务"
            min={4}
            max={12}
            step={1}
            value={tiles}
            onChange={setTiles}
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
                id="cgpp-ch06-arrow"
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
            {stage === "chain" ? (
              <ChainView depth={depth} />
            ) : stage === "clip" ? (
              <ClipView depth={depth} />
            ) : (
              <CostView depth={depth} tiles={tiles} />
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
