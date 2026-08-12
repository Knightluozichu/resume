"use client";

import { useMemo, useState } from "react";

type View = "depth" | "blend" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "depth",
    label: "深度测试",
    detail: "调节新片段深度，观察深度缓冲如何决定哪个片段留下。",
  },
  {
    id: "blend",
    label: "混合输出",
    detail: "调节源片段的覆盖率，观察它如何与目标颜色合成。",
  },
  {
    id: "throughput",
    label: "吞吐与等待",
    detail: "增加片段批次并改变访存等待，比较并行任务和有效输出。",
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
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{value.toFixed(2)}</span>
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

function DepthView({ depth }: { depth: number }) {
  const bufferDepth = 0.56;
  const passes = depth < bufferDepth;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        深度测试：先到达的片段占据像素
      </text>
      <rect
        x="34"
        y="76"
        width="294"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        深度缓冲
      </text>
      <rect
        x="64"
        y="136"
        width="232"
        height="60"
        rx="10"
        fill="var(--accent)"
        opacity="0.22"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text x="84" y="172" fontSize="14" fill={COLORS.primary}>
        已存深度：{bufferDepth.toFixed(2)}
      </text>
      <line
        x1="178"
        y1="214"
        x2="178"
        y2="248"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch09-arrow)"
      />
      <text x="76" y="276" fontSize="14" fill={COLORS.secondary}>
        新片段：{depth.toFixed(2)}
      </text>
      <line
        x1="344"
        y1="184"
        x2="424"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch09-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="218"
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
        判定
      </text>
      <circle
        cx="492"
        cy="148"
        r="9"
        fill={passes ? COLORS.success : COLORS.warning}
      />
      <text
        x="516"
        y="154"
        fontSize="15"
        fill={passes ? COLORS.success : COLORS.warning}
      >
        {passes ? "通过：写入新深度" : "拒绝：保留旧片段"}
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        条件：新深度小于缓冲深度
      </text>
      <text x="476" y="226" fontSize="13" fill={COLORS.secondary}>
        遮挡先由深度规则裁掉。
      </text>
      <text x="476" y="258" fontSize="13" fill={COLORS.secondary}>
        之后才值得讨论光照能量。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        图形管线：片段 → 深度测试 → 输出；遮挡不是混合造成的。
      </text>
    </g>
  );
}

function BlendView({ alpha }: { alpha: number }) {
  const destination = 0.28;
  const output = alpha * 0.86 + (1 - alpha) * destination;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        混合输出：覆盖率决定两种颜色的权重
      </text>
      <rect
        x="34"
        y="76"
        width="202"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        源片段
      </text>
      <rect
        x="58"
        y="132"
        width="154"
        height="64"
        rx="10"
        fill="var(--warning)"
        opacity="0.86"
      />
      <text x="76" y="172" fontSize="14" fill={COLORS.primary}>
        Cₛ = 0.86
      </text>
      <text x="58" y="232" fontSize="13" fill={COLORS.secondary}>
        α = {alpha.toFixed(2)}
      </text>
      <text x="58" y="264" fontSize="13" fill={COLORS.secondary}>
        覆盖率 / 不透明度
      </text>
      <line
        x1="250"
        y1="184"
        x2="332"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch09-arrow)"
      />
      <rect
        x="352"
        y="76"
        width="178"
        height="218"
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
        目标片段
      </text>
      <rect
        x="376"
        y="132"
        width="130"
        height="64"
        rx="10"
        fill="var(--accent)"
        opacity="0.28"
      />
      <text x="394" y="172" fontSize="14" fill={COLORS.primary}>
        Cᵈ = {destination.toFixed(2)}
      </text>
      <text x="376" y="232" fontSize="13" fill={COLORS.secondary}>
        保留背景能量
      </text>
      <line
        x1="548"
        y1="184"
        x2="584"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch09-arrow)"
      />
      <rect
        x="602"
        y="76"
        width="124"
        height="218"
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
        height="64"
        rx="10"
        fill="var(--success)"
        opacity={Math.max(0.25, output)}
      />
      <text x="630" y="232" fontSize="13" fill={COLORS.secondary}>
        Cₒ = {output.toFixed(2)}
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        Light（光）与反射率影响源片段能量，混合决定输出如何保留背景。
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
  const active = Math.min(12, Math.max(4, samples));
  const waiting = Math.min(
    active,
    Math.max(1, Math.round((latency - 0.1) * 10)),
  );
  const completed = active - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        片段吞吐：Parallelism 遇到 memory latency
      </text>
      <rect
        x="34"
        y="76"
        width="304"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        并行片段批次
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const enabled = index < active;
        const blocked = enabled && index >= completed;
        const x = 58 + (index % 4) * 62;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`fragment-task-${index}`}
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
        x1="354"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch09-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="218"
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
        已完成：{completed}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待访存：{waiting}
      </text>
      <text x="476" y="214" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）扩大同时工作的数量。
      </text>
      <text x="476" y="274" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）决定等待尾部。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        采样更多不一定更快；先改善访问局部性，再扩大执行批次。
      </text>
    </g>
  );
}

export function CgppCh09FragmentLab() {
  const [view, setView] = useState<View>("depth");
  const [depth, setDepth] = useState(0.42);
  const [alpha, setAlpha] = useState(0.62);
  const [samples, setSamples] = useState(8);
  const [latency, setLatency] = useState(0.35);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("depth");
    setDepth(0.42);
    setAlpha(0.62);
    setSamples(8);
    setLatency(0.35);
  }

  return (
    <section
      aria-label="片段管线专属输出实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch09-fragment-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 FragmentViz · 深度、混合与吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个片段说明它为何留下、如何合成、何时等待
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变深度、覆盖率或访存等待时，哪一类输出证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置片段管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择片段管线观察视角">
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
            label="新片段深度"
            min={0.1}
            max={0.9}
            step={0.01}
            value={depth}
            onChange={setDepth}
          />
          <RangeControl
            label="源片段覆盖率"
            min={0.1}
            max={1}
            step={0.01}
            value={alpha}
            onChange={setAlpha}
          />
          <RangeControl
            label="片段批次"
            min={4}
            max={12}
            step={1}
            value={samples}
            onChange={setSamples}
          />
          <RangeControl
            label="访存等待"
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
                id="cgpp-ch09-arrow"
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
            {view === "depth" ? (
              <DepthView depth={depth} />
            ) : view === "blend" ? (
              <BlendView alpha={alpha} />
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
