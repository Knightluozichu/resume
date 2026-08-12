"use client";

import { useMemo, useRef, useState, type MutableRefObject } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 380;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type View = "exchange" | "solver" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "exchange",
    label: "面片能量交换",
    detail: "观察面片之间的可见能量交换，区分光源输入、形状关系和表面反射。",
  },
  {
    id: "solver",
    label: "方程求解",
    detail:
      "比较迭代辐射度与 Metropolis Light Transport（MLT）的估计路径和收敛证据。",
  },
  {
    id: "throughput",
    label: "硬件吞吐",
    detail: "改变面片任务、样本和访问等待，比较并行求解与内存延迟。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "patches",
    caption: "先把场景拆成面片：每个面片记录面积、法线、可见性和表面属性。",
  },
  {
    label: "formFactor",
    caption:
      "再计算形状关系：面片之间的可见比例决定能量如何从一个位置传到另一个位置。",
  },
  {
    label: "transport",
    caption:
      "随后传播能量：用渲染方程理论解法或随机路径估计每个面片收到的辐射度。",
  },
  {
    label: "converge",
    caption:
      "最后检查收敛：误差、残差和访问成本必须一起记录，不能只看一张亮度图。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY: Record<
  (typeof STEPS)[number]["label"],
  { title: string; input: string; evidence: string }
> = {
  patches: {
    title: "面片输入",
    input: "面积 · 法线 · 材质",
    evidence: "场景离散化",
  },
  formFactor: {
    title: "形状关系",
    input: "可见比例 · 距离",
    evidence: "能量通道",
  },
  transport: {
    title: "能量传播",
    input: "Light（光）· 反射",
    evidence: "面片辐射度",
  },
  converge: {
    title: "估计收敛",
    input: "迭代 · 样本 · 残差",
    evidence: "误差与吞吐",
  },
};

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

function ExchangeView({
  nodeRefs,
  patches,
  reflectance,
}: {
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  patches: number;
  reflectance: number;
}) {
  const energy = (0.62 * reflectance).toFixed(2);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        计算机图形学导论：面片能量交换与 Radiometry（辐射度量）
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        面片数量改变离散精度，反射率改变保留能量；两者都不应偷偷改变光源输入。
      </text>
      <g
        ref={(node) => {
          nodeRefs.current.patches = node;
        }}
        opacity="1"
      >
        <rect
          x="28"
          y="92"
          width="326"
          height="208"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="52"
          y="125"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          面片场景
        </text>
        <polygon
          points="84,250 170,250 142,175"
          fill="var(--accent)"
          fillOpacity="0.18"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <polygon
          points="206,250 304,250 278,168"
          fill="var(--accent)"
          fillOpacity="0.12"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        {Array.from({ length: Math.min(6, patches - 1) }, (_, index) => (
          <line
            key={`patch-edge-${index}`}
            x1={84 + index * 12}
            y1="250"
            x2={206 + index * 12}
            y2="250"
            stroke={COLORS.border}
            strokeWidth="1.5"
          />
        ))}
        <circle cx="142" cy="148" r="10" fill={COLORS.warning} />
        <line
          x1="142"
          y1="158"
          x2="142"
          y2="176"
          stroke={COLORS.warning}
          strokeWidth="3"
          markerEnd="url(#cgpp-ch23-radiosity-arrow)"
        />
        <text x="52" y="278" fontSize="13" fill={COLORS.secondary}>
          光源面片 · 受光面片 · 面片数：{patches}
        </text>
      </g>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch23-radiosity-arrow)"
      />
      <g
        ref={(node) => {
          nodeRefs.current.formFactor = node;
        }}
        opacity="0.35"
      >
        <rect
          x="436"
          y="92"
          width="280"
          height="208"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="460"
          y="126"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          能量账本
        </text>
        <text x="460" y="163" fontSize="13" fill={COLORS.warning}>
          Light（光）输入：0.62
        </text>
        <text x="460" y="196" fontSize="13" fill={COLORS.accent}>
          Reflectance（反射率）：{reflectance.toFixed(2)}
        </text>
        <text x="460" y="229" fontSize="13" fill={COLORS.primary}>
          面片辐射度：{energy}
        </text>
        <text x="460" y="263" fontSize="13" fill={COLORS.secondary}>
          形状关系决定能量通道。
        </text>
      </g>
      <text x="28" y="338" fontSize="13" fill={COLORS.accent}>
        预测：增加面片数量会改变光源能量，还是让形状关系的离散近似更细？
      </text>
    </g>
  );
}

function SolverView({
  iterations,
  samples,
}: {
  iterations: number;
  samples: number;
}) {
  const iteration = Math.round(iterations);
  const residual = Math.max(0.04, 0.92 - iteration * 0.12);
  const radiosity = 1 - residual;
  const mltNoise = Math.max(0.1, 0.76 - samples * 0.035);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        方程求解：从理论解法到随机路径估计
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        同一能量传输问题可以用迭代辐射度或 Metropolis Light
        Transport（MLT）估计。
      </text>
      <rect
        x="28"
        y="92"
        width="326"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="126" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        迭代辐射度
      </text>
      {Array.from({ length: 7 }, (_, index) => {
        const x = 54 + index * 38;
        const height = 28 + Math.min(106, (index + 1) * iteration * 2.5);
        return (
          <rect
            key={`radiosity-bar-${index}`}
            x={x}
            y={264 - height}
            width="22"
            height={height}
            rx="4"
            fill="var(--accent)"
            fillOpacity={0.3 + index * 0.08}
          />
        );
      })}
      <text x="52" y="286" fontSize="13" fill={COLORS.secondary}>
        迭代：{iteration} · 残差：{residual.toFixed(2)} · 解估计：
        {radiosity.toFixed(2)}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch23-radiosity-arrow)"
      />
      <rect
        x="436"
        y="92"
        width="280"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="126"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        渲染方程理论解法
      </text>
      <text x="460" y="162" fontSize="13" fill={COLORS.accent}>
        radiosity：残差 {residual.toFixed(2)}
      </text>
      <text x="460" y="195" fontSize="13" fill={COLORS.warning}>
        MLT：样本噪声 {mltNoise.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        样本：{samples} · 两者都需估计误差
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        收敛不是只看画面是否变亮。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        迭代次数降低残差，样本数量降低随机噪声；它们解决的是不同误差。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  patches,
  samples,
}: {
  latency: number;
  patches: number;
  samples: number;
}) {
  const total = Math.round(patches * samples * 0.35);
  const waiting = Math.min(
    total - 1,
    Math.max(1, Math.round(total * latency * 0.68)),
  );
  const completed = total - waiting;
  const parallelism = Math.max(0.1, 1 - latency * 0.54);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware（现代图形硬件）：面片求解的并行吞吐
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个方格代表一个面片更新任务；访问等待会限制能量传播的有效进度。
      </text>
      <rect
        x="28"
        y="92"
        width="326"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="126" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        面片更新队列
      </text>
      {Array.from({ length: Math.min(total, 16) }, (_, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 149 + Math.floor(index / 4) * 34;
        const isWaiting = index >= Math.min(completed, 16);
        return (
          <rect
            key={`patch-task-${index}`}
            x={x}
            y={y}
            width="44"
            height="22"
            rx="6"
            fill={isWaiting ? "var(--warning)" : "var(--accent)"}
            fillOpacity="0.84"
            stroke={isWaiting ? COLORS.warning : COLORS.border}
          />
        );
      })}
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        完成：{completed} · 等待：{waiting} · 总任务：{total}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch23-radiosity-arrow)"
      />
      <rect
        x="436"
        y="92"
        width="280"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="126"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        硬件证据
      </text>
      <text x="460" y="162" fontSize="13" fill={COLORS.accent}>
        Parallelism（并行性）：{parallelism.toFixed(2)}
      </text>
      <text x="460" y="195" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        有效吞吐：{(completed / total).toFixed(2)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先改善访问局部性，再扩展面片批次。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行更新可以隐藏部分矩阵计算，却不能消除共享数据的访问等待。
      </text>
    </g>
  );
}

/** 第23章专属实验：把面片交换、理论求解与硬件吞吐串成一条能量证据链。 */
export function CgppCh23RadiosityLab() {
  const [view, setView] = useState<View>("exchange");
  const [patches, setPatches] = useState(8);
  const [reflectance, setReflectance] = useState(0.58);
  const [iterations, setIterations] = useState(4);
  const [samples, setSamples] = useState(12);
  const [latency, setLatency] = useState(0.32);
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.35, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setView("exchange");
    setPatches(8);
    setReflectance(0.58);
    setIterations(4);
    setSamples(12);
    setLatency(0.32);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="辐射度专属面片交换、方程求解与硬件吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch23-radiosity-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-31 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 RadiosityViz · 面片交换、理论求解与并行吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一份能量展示它如何离散、传播并收敛
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：增加面片、迭代或样本时，分别是哪一种误差或成本会先变化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择辐射度观察视角">
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
            label="面片数量"
            min={4}
            max={16}
            step={1}
            value={patches}
            onChange={setPatches}
          />
          <RangeControl
            label="反射率"
            min={0.1}
            max={0.95}
            step={0.01}
            value={reflectance}
            onChange={setReflectance}
          />
          <RangeControl
            label="迭代次数"
            min={1}
            max={8}
            step={1}
            value={iterations}
            onChange={setIterations}
          />
          <RangeControl
            label="求解样本"
            min={4}
            max={24}
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
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch23-radiosity-arrow"
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
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            {view === "exchange" ? (
              <ExchangeView
                nodeRefs={nodeRefs}
                patches={patches}
                reflectance={reflectance}
              />
            ) : view === "solver" ? (
              <SolverView iterations={iterations} samples={samples} />
            ) : (
              <ThroughputView
                latency={latency}
                patches={patches}
                samples={samples}
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
        {view === "exchange" && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="先用单步确认能量交换的阶段顺序，再播放整条求解链；参数变化后用同一输入重放。"
            reset={{
              label: "重置能量流程",
              ariaLabel: "重置第23章辐射度能量流程时间线",
              onClick: reset,
            }}
          />
        )}
        {view !== "exchange" && (
          <button
            type="button"
            onClick={reset}
            aria-label="重置第23章辐射度实验"
            className="mx-auto block min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            重置实验
          </button>
        )}
      </div>
    </section>
  );
}
