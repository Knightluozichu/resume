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

type View = "roadmap" | "quality" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "roadmap",
    label: "能力路线",
    detail:
      "逐步检查输入、可编程阶段、光照证据和输出契约，观察未来能力如何接入管线。",
  },
  {
    id: "quality",
    label: "质量与成本",
    detail: "改变保真度、采样和光能量，比较视觉收益、误差证据与计算成本。",
  },
  {
    id: "throughput",
    label: "硬件吞吐",
    detail:
      "改变任务规模和访问等待，判断未来算法是否把瓶颈转移到并行执行或内存。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "contract",
    caption: "先写清输入契约：几何、材质、光照和误差预算必须能被新阶段复核。",
  },
  {
    label: "programmable",
    caption:
      "再引入可编程能力：新算法应替换明确阶段，而不是让责任藏在不可解释的黑盒里。",
  },
  {
    label: "quality",
    caption: "随后测量质量：保真度、噪声、延迟和能量守恒需要同时进入验收窗口。",
  },
  {
    label: "scale",
    caption:
      "最后评估规模化：并行执行、内存局部性和可重放测试决定能力能否稳定交付。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY: Record<
  (typeof STEPS)[number]["label"],
  { title: string; input: string; evidence: string }
> = {
  contract: {
    title: "输入契约",
    input: "几何 · 材质 · 光",
    evidence: "单位与边界",
  },
  programmable: {
    title: "可编程阶段",
    input: "算法 · 状态",
    evidence: "可解释替换",
  },
  quality: {
    title: "质量验收",
    input: "保真度 · 噪声",
    evidence: "误差预算",
  },
  scale: {
    title: "规模化交付",
    input: "批次 · 访问",
    evidence: "吞吐与重放",
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

function RoadmapView({
  activeStep,
  nodeRefs,
  maturity,
}: {
  activeStep: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  maturity: number;
}) {
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        未来路线：把新能力接入 Graphics Pipeline（图形管线）
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        未来不是跳过契约，而是让更多阶段可编程、可测量、可回放。
      </text>
      {STEPS.map((step, index) => {
        const copy = STAGE_COPY[step.label];
        const x = 28 + index * 182;
        const isActive = index === activeStep;
        const isDone = index < activeStep;
        return (
          <g
            key={step.label}
            ref={(node) => {
              nodeRefs.current[step.label] = node;
            }}
            opacity={index === 0 ? 1 : 0.35}
          >
            <rect
              x={x}
              y="99"
              width="154"
              height="172"
              rx="12"
              fill={isActive ? "var(--accent)" : COLORS.elevated}
              fillOpacity={isActive ? 0.14 : 1}
              stroke={isActive ? COLORS.accent : COLORS.border}
              strokeWidth={isActive ? 3 : 2}
            />
            <circle
              cx={x + 23}
              cy="125"
              r="10"
              fill={
                isDone
                  ? COLORS.success
                  : isActive
                    ? COLORS.accent
                    : COLORS.border
              }
            />
            <text
              x={x + 43}
              y="131"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {copy.title}
            </text>
            <text x={x + 16} y="169" fontSize="13" fill={COLORS.secondary}>
              输入
            </text>
            <text x={x + 16} y="193" fontSize="13" fill={COLORS.primary}>
              {copy.input}
            </text>
            <text x={x + 16} y="226" fontSize="13" fill={COLORS.secondary}>
              证据
            </text>
            <text x={x + 16} y="250" fontSize="13" fill={COLORS.primary}>
              {copy.evidence}
            </text>
            {index < STEPS.length - 1 && (
              <line
                x1={x + 157}
                y1="185"
                x2={x + 177}
                y2="185"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#cgpp-ch25-future-arrow)"
              />
            )}
          </g>
        );
      })}
      <text x="28" y="314" fontSize="13" fill={COLORS.secondary}>
        能力成熟度：{maturity.toFixed(2)} · 先锁定契约，再扩大可编程范围。
      </text>
      <text x="28" y="344" fontSize="13" fill={COLORS.accent}>
        预测：增加可编程阶段会自动消除验证需求，还是增加需要被记录的边界？
      </text>
    </g>
  );
}

function QualityView({
  fidelity,
  light,
  samples,
}: {
  fidelity: number;
  light: number;
  samples: number;
}) {
  const noise = Math.max(0.05, 0.92 - samples * 0.055 - fidelity * 0.12);
  const quality = Math.min(
    0.98,
    fidelity * 0.64 + samples * 0.018 + light * 0.08,
  );
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        质量与成本：未来能力也要接受同一套证据
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        保真度、采样、Light（光）能量和噪声是不同旋钮，不能用一个总分互相遮盖。
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
        保真度预算
      </text>
      {Array.from({ length: 8 }, (_, index) => {
        const x = 54 + index * 34;
        const height =
          24 + Math.min(116, fidelity * 66 + index * samples * 0.7);
        return (
          <rect
            key={`quality-bar-${index}`}
            x={x}
            y={264 - height}
            width="20"
            height={height}
            rx="4"
            fill="var(--accent)"
            fillOpacity={0.3 + index * 0.075}
          />
        );
      })}
      <text x="52" y="286" fontSize="13" fill={COLORS.secondary}>
        保真度：{fidelity.toFixed(2)} · 光能量：{light.toFixed(2)}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch25-future-arrow)"
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
        验收窗口
      </text>
      <text x="460" y="162" fontSize="13" fill={COLORS.accent}>
        视觉质量：{quality.toFixed(2)}
      </text>
      <text x="460" y="195" fontSize="13" fill={COLORS.warning}>
        估计噪声：{noise.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        样本：{samples} · 能量守恒：需单独核对
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        质量提升必须能重放和解释。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        采样降低估计噪声，保真度增加细节；两者都不能修复坐标或单位错误。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  tasks,
  waves,
}: {
  latency: number;
  tasks: number;
  waves: number;
}) {
  const total = Math.round(tasks * waves * 0.28);
  const waiting = Math.min(
    total - 1,
    Math.max(1, Math.round(total * latency * 0.7)),
  );
  const completed = total - waiting;
  const parallelism = Math.max(0.1, 1 - latency * 0.58);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware（现代图形硬件）：未来任务仍有访问瓶颈
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个方格是一项未来渲染任务；算法更复杂时，任务规模和数据依赖都会增长。
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
        任务波次
      </text>
      {Array.from({ length: Math.min(total, 16) }, (_, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 149 + Math.floor(index / 4) * 34;
        const isWaiting = index >= Math.min(completed, 16);
        return (
          <rect
            key={`future-task-${index}`}
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
        完成：{completed} · 等待：{waiting} · 波次：{waves}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch25-future-arrow)"
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
        吞吐证据
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
        先测局部性，再扩大未来任务规模。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行性可以扩展工作，却不能让共享内存访问变成零成本。
      </text>
    </g>
  );
}

/** 第25章专属实验：把未来图形能力、质量证据与硬件规模化串成一条路线。 */
export function CgppCh25FutureLab() {
  const [view, setView] = useState<View>("roadmap");
  const [maturity, setMaturity] = useState(0.62);
  const [fidelity, setFidelity] = useState(0.68);
  const [light, setLight] = useState(0.72);
  const [samples, setSamples] = useState(10);
  const [tasks, setTasks] = useState(16);
  const [waves, setWaves] = useState(4);
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
    setView("roadmap");
    setMaturity(0.62);
    setFidelity(0.68);
    setLight(0.72);
    setSamples(10);
    setTasks(16);
    setWaves(4);
    setLatency(0.32);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="未来图形系统专属能力路线、质量证据与硬件吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch25-future-graphics"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 FutureGraphicsViz · 能力路线、质量证据与规模化吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个未来能力展示它如何被接入、验收并规模化
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只提高保真度、样本或并行任务时，哪种证据会先暴露成本？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择未来图形观察视角">
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
            label="能力成熟度"
            min={0.2}
            max={1}
            step={0.01}
            value={maturity}
            onChange={setMaturity}
          />
          <RangeControl
            label="保真度"
            min={0.2}
            max={1}
            step={0.01}
            value={fidelity}
            onChange={setFidelity}
          />
          <RangeControl
            label="光能量"
            min={0.2}
            max={1.3}
            step={0.01}
            value={light}
            onChange={setLight}
          />
          <RangeControl
            label="样本数量"
            min={4}
            max={20}
            step={1}
            value={samples}
            onChange={setSamples}
          />
          <RangeControl
            label="任务数量"
            min={8}
            max={24}
            step={1}
            value={tasks}
            onChange={setTasks}
          />
          <RangeControl
            label="任务波次"
            min={2}
            max={8}
            step={1}
            value={waves}
            onChange={setWaves}
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
                id="cgpp-ch25-future-arrow"
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
            {view === "roadmap" ? (
              <RoadmapView
                activeStep={timeline.currentStep}
                maturity={maturity}
                nodeRefs={nodeRefs}
              />
            ) : view === "quality" ? (
              <QualityView
                fidelity={fidelity}
                light={light}
                samples={samples}
              />
            ) : (
              <ThroughputView latency={latency} tasks={tasks} waves={waves} />
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
        {view === "roadmap" && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="先用单步审查未来能力的责任边界，再播放完整路线；改变参数后用同一输入重放。"
            reset={{
              label: "重置能力路线",
              ariaLabel: "重置第25章未来图形能力路线时间线",
              onClick: reset,
            }}
          />
        )}
        {view !== "roadmap" && (
          <button
            type="button"
            onClick={reset}
            aria-label="重置第25章未来图形实验"
            className="mx-auto block min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            重置实验
          </button>
        )}
      </div>
    </section>
  );
}
