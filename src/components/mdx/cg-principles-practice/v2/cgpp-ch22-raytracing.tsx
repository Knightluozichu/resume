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

type View = "path" | "acceleration" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "path",
    label: "光线路径",
    detail:
      "逐步追踪相机光线、交点、着色与累积，观察一条样本如何成为像素贡献。",
  },
  {
    id: "acceleration",
    label: "加速结构",
    detail: "调整结构深度、候选节点和反射次数，比较遍历成本与命中证据。",
  },
  {
    id: "throughput",
    label: "射线吞吐",
    detail: "调整射线任务、样本数量和访问等待，区分并行执行与内存延迟。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "launch",
    caption: "从像素发出相机光线：方向、起点和采样位置构成可复核的几何输入。",
  },
  {
    label: "intersect",
    caption: "遍历空间结构并求交：先缩小候选范围，再确认射线与表面的真实交点。",
  },
  {
    label: "shade",
    caption: "在交点解释光照：把入射能量、法线和反射率放到同一坐标语义中。",
  },
  {
    label: "accumulate",
    caption: "把样本贡献累积到像素：更多样本减少估计噪声，但也增加射线任务。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY: Record<
  (typeof STEPS)[number]["label"],
  { title: string; input: string; evidence: string }
> = {
  launch: {
    title: "发出光线",
    input: "像素 · 起点 · 方向",
    evidence: "采样位置",
  },
  intersect: {
    title: "求交遍历",
    input: "层次结构 · 候选面",
    evidence: "命中距离",
  },
  shade: {
    title: "交点着色",
    input: "法线 · Light（光）",
    evidence: "能量与反射",
  },
  accumulate: {
    title: "累积输出",
    input: "样本贡献 · 帧缓冲",
    evidence: "噪声与吞吐",
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

function PathView({
  activeStep,
  nodeRefs,
  samples,
}: {
  activeStep: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  samples: number;
}) {
  const rayLength = 86 + samples * 4;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Graphics Pipeline（图形管线）：一条光线如何成为像素贡献
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        用单步回放阶段边界；每个交点都应能追溯到几何、光照与采样输入。
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
                markerEnd="url(#cgpp-ch22-raytracing-arrow)"
              />
            )}
          </g>
        );
      })}
      <path
        d={`M90 314 C170 294, 220 294, ${250 + rayLength} 314`}
        fill="none"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch22-raytracing-arrow)"
      />
      <text x="28" y="344" fontSize="13" fill={COLORS.accent}>
        预测：增加样本会改变单条光线的命中位置，还是改变像素对多条光线的平均？
      </text>
    </g>
  );
}

function AccelerationView({
  bounces,
  structure,
}: {
  bounces: number;
  structure: number;
}) {
  const depth = Math.round(structure);
  const candidates = Math.max(1, Math.round(13 - depth * 1.8 + bounces * 0.5));
  const nodes = depth * 3 + 2;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        求交加速：先筛候选，再确认真实交点
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        空间结构减少无关几何测试，但结构深度、反射次数和更新成本需要一起观察。
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
      <text x="52" y="122" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        层次结构
      </text>
      {Array.from({ length: nodes }, (_, index) => {
        const level = index % depth;
        const x = 62 + level * 42;
        const y = 152 + Math.floor(index / depth) * 32;
        return (
          <g key={`node-${index}`}>
            <rect
              x={x}
              y={y}
              width="28"
              height="18"
              rx="5"
              fill={index < candidates ? "var(--accent)" : COLORS.border}
              fillOpacity="0.8"
              stroke={index < candidates ? COLORS.accent : COLORS.secondary}
            />
            {index > 0 && (
              <line
                x1={x - 14}
                y1={y + 9}
                x2={x}
                y2={y + 9}
                stroke={COLORS.border}
                strokeWidth="2"
              />
            )}
          </g>
        );
      })}
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        候选节点：{candidates} · 反射次数：{bounces}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch22-raytracing-arrow)"
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
        y="123"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        遍历证据
      </text>
      <text x="460" y="160" fontSize="13" fill={COLORS.accent}>
        结构深度：{depth}
      </text>
      <text x="460" y="193" fontSize="13" fill={COLORS.primary}>
        求交测试：{candidates * bounces}
      </text>
      <text x="460" y="226" fontSize="13" fill={COLORS.secondary}>
        命中候选：先由结构筛选，再由几何确认
      </text>
      <text x="460" y="260" fontSize="13" fill={COLORS.secondary}>
        结构越深不代表更新代价越低。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        调整结构时，同时记录候选节点和真实求交次数，避免只看最终颜色。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  rays,
  samples,
}: {
  latency: number;
  rays: number;
  samples: number;
}) {
  const total = Math.round(rays * samples * 0.25);
  const waiting = Math.min(
    total - 1,
    Math.max(1, Math.round(total * latency * 0.7)),
  );
  const completed = total - waiting;
  const parallelism = Math.max(0.1, 1 - latency * 0.56);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware（现代图形硬件）：射线并行仍受访问等待约束
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个方格是一个射线任务；样本与反射次数增加会同时增加计算和内存访问。
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
      <text x="52" y="122" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        射线任务队列
      </text>
      {Array.from({ length: Math.min(total, 16) }, (_, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 145 + Math.floor(index / 4) * 35;
        const isWaiting = index >= Math.min(completed, 16);
        return (
          <rect
            key={`ray-task-${index}`}
            x={x}
            y={y}
            width="44"
            height="23"
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
        markerEnd="url(#cgpp-ch22-raytracing-arrow)"
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
        y="123"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        硬件证据
      </text>
      <text x="460" y="160" fontSize="13" fill={COLORS.accent}>
        Parallelism（并行性）：{parallelism.toFixed(2)}
      </text>
      <text x="460" y="193" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="226" fontSize="13" fill={COLORS.secondary}>
        有效吞吐：{(completed / total).toFixed(2)}
      </text>
      <text x="460" y="260" fontSize="13" fill={COLORS.secondary}>
        先减无效候选，再扩大射线批次。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行执行可以隐藏部分求交计算，却不能消除层次结构和纹理访问的等待。
      </text>
    </g>
  );
}

/** 第22章专属实验：把射线路径、求交结构与硬件吞吐串成可回放的证据链。 */
export function CgppCh22RaytracingLab() {
  const [view, setView] = useState<View>("path");
  const [bounces, setBounces] = useState(2);
  const [samples, setSamples] = useState(8);
  const [structure, setStructure] = useState(3);
  const [rays, setRays] = useState(16);
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
    setView("path");
    setBounces(2);
    setSamples(8);
    setStructure(3);
    setRays(16);
    setLatency(0.32);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="光线追踪专属光线路径、加速结构与硬件吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch22-raytracing-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 RayTraceViz · 光线路径、求交结构与射线吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一条射线展示它如何命中、反射并汇入像素
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：增加反射、采样或访问等待时，哪一项证据会先恶化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择光线追踪观察视角">
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
            label="反射次数"
            min={1}
            max={5}
            step={1}
            value={bounces}
            onChange={setBounces}
          />
          <RangeControl
            label="像素采样"
            min={4}
            max={16}
            step={1}
            value={samples}
            onChange={setSamples}
          />
          <RangeControl
            label="结构深度"
            min={2}
            max={5}
            step={1}
            value={structure}
            onChange={setStructure}
          />
          <RangeControl
            label="射线数量"
            min={8}
            max={24}
            step={1}
            value={rays}
            onChange={setRays}
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
                id="cgpp-ch22-raytracing-arrow"
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
            {view === "path" ? (
              <PathView
                activeStep={timeline.currentStep}
                nodeRefs={nodeRefs}
                samples={samples}
              />
            ) : view === "acceleration" ? (
              <AccelerationView bounces={bounces} structure={structure} />
            ) : (
              <ThroughputView latency={latency} rays={rays} samples={samples} />
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
        {view === "path" && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="先用单步验证一条射线的阶段顺序，再播放整条路径；每次改参数后都回到同一输入重放。"
            reset={{
              label: "重置光线路径",
              ariaLabel: "重置第22章光线路径时间线",
              onClick: reset,
            }}
          />
        )}
        {view !== "path" && (
          <button
            type="button"
            onClick={reset}
            aria-label="重置第22章光线追踪实验"
            className="mx-auto block min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            重置实验
          </button>
        )}
      </div>
    </section>
  );
}
