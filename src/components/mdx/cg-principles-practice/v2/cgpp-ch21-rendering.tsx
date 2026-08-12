"use client";

import { useMemo, useRef, useState } from "react";

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

type View = "pipeline" | "sampling" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "渲染流程",
    detail: "逐步打开几何、可见性、光照与输出阶段，观察每一步的输入和证据。",
  },
  {
    id: "sampling",
    label: "采样与光照",
    detail: "改变采样密度、光能量和反射率，区分覆盖不足与材质响应。",
  },
  {
    id: "throughput",
    label: "硬件吞吐",
    detail: "改变任务数量和访问等待，比较并行执行与内存延迟的关系。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "geometry",
    caption:
      "先提交几何输入：顶点、法线和材质引用必须带着可追踪的空间语义进入管线。",
  },
  {
    label: "visibility",
    caption: "再判断可见性：深度、遮挡和采样覆盖决定哪些片段值得继续计算。",
  },
  {
    label: "shading",
    caption: "随后解释光照：把光能量、表面反射率与当前片段放到同一空间中。",
  },
  {
    label: "present",
    caption: "最后输出并测量：完成帧不等于高效帧，还要检查并行任务和访问等待。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY: Record<
  (typeof STEPS)[number]["label"],
  { title: string; input: string; evidence: string }
> = {
  geometry: {
    title: "几何输入",
    input: "顶点 · 法线 · 材质引用",
    evidence: "坐标空间与拓扑",
  },
  visibility: {
    title: "可见性",
    input: "深度 · 遮挡 · 覆盖",
    evidence: "有效片段数量",
  },
  shading: {
    title: "光照与反射",
    input: "Light（光）· Reflectance（反射率）",
    evidence: "能量与表面响应",
  },
  present: {
    title: "输出与测量",
    input: "片段颜色 · 任务队列",
    evidence: "帧结果与等待比例",
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

function PipelineView({
  activeStep,
  nodeRefs,
}: {
  activeStep: number;
  nodeRefs: React.MutableRefObject<Record<string, SVGGElement | null>>;
}) {
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Graphics Pipeline（图形管线）：一次输出是四段证据的接力
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        单步查看每个阶段；当前阶段高亮，前置阶段保留为可复核输入。
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
                markerEnd="url(#cgpp-ch21-rendering-arrow)"
              />
            )}
          </g>
        );
      })}
      <text x="28" y="314" fontSize="13" fill={COLORS.secondary}>
        可见性减少无效片段，光照解释保留下来的片段；两者都不能替代最终的吞吐测量。
      </text>
      <text x="28" y="344" fontSize="13" fill={COLORS.accent}>
        预测：跳过可见性阶段会让光照计算变快，还是让无效工作进入后续阶段？
      </text>
    </g>
  );
}

function SamplingView({
  light,
  reflectance,
  samples,
}: {
  light: number;
  reflectance: number;
  samples: number;
}) {
  const count = Math.round(samples);
  const visible = Math.max(2, Math.round(count * (0.55 + reflectance * 0.25)));
  const radius = 56 + light * 34;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        采样与光照：Radiometry（辐射度量）进入 Reflectance（反射率）
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        采样决定观测覆盖，光能量和表面反射率决定每个有效样本的响应。
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
      <circle
        cx="188"
        cy="194"
        r={radius}
        fill="var(--accent)"
        fillOpacity="0.12"
      />
      <circle
        cx="188"
        cy="194"
        r="48"
        fill="var(--bg)"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <path
        d={`M188 194 L${188 - radius * 0.74} ${194 - radius * 0.54}`}
        stroke={COLORS.warning}
        strokeWidth="4"
        markerEnd="url(#cgpp-ch21-rendering-arrow)"
      />
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const distance = 48 + (index % 3) * 15;
        const x = 188 + Math.cos(angle) * distance;
        const y = 194 + Math.sin(angle) * distance;
        const isVisible = index < visible;
        return (
          <circle
            key={`sample-${index}`}
            cx={x}
            cy={y}
            r="5"
            fill={isVisible ? COLORS.accent : COLORS.border}
            stroke={isVisible ? COLORS.accent : COLORS.secondary}
          />
        );
      })}
      <text x="52" y="122" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        有效样本：{visible} / {count}
      </text>
      <line
        x1="356"
        y1="194"
        x2="414"
        y2="194"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch21-rendering-arrow)"
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
        能量账本
      </text>
      <text x="460" y="160" fontSize="13" fill={COLORS.warning}>
        Light（光）能量：{light.toFixed(2)}
      </text>
      <text x="460" y="193" fontSize="13" fill={COLORS.accent}>
        Radiometry（辐射度量）：{(light * visible).toFixed(1)}
      </text>
      <text x="460" y="226" fontSize="13" fill={COLORS.primary}>
        Reflectance（反射率）：{reflectance.toFixed(2)}
      </text>
      <text x="460" y="261" fontSize="13" fill={COLORS.secondary}>
        输出响应：{(light * reflectance * visible).toFixed(1)}
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        先固定反射率再增加样本，才能判断亮度变化来自覆盖还是材质响应。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  tasks,
}: {
  latency: number;
  tasks: number;
}) {
  const total = Math.round(tasks);
  const waiting = Math.min(
    total - 1,
    Math.max(1, Math.round(total * latency * 0.72)),
  );
  const completed = total - waiting;
  const parallelism = Math.max(0.1, 1 - latency * 0.58);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware（现代图形硬件）：并行任务仍会等待数据
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个方格是一个片段任务；任务数量增加不等于有效吞吐按同样比例增加。
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
        片段任务队列
      </text>
      {Array.from({ length: total }, (_, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 145 + Math.floor(index / 4) * 35;
        const isWaiting = index >= completed;
        return (
          <rect
            key={`render-task-${index}`}
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
        markerEnd="url(#cgpp-ch21-rendering-arrow)"
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
        吞吐证据
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
        优先检查访问局部性，再扩大任务批次。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行性隐藏一部分计算时间，却不能凭空消除共享纹理和缓冲区的访问等待。
      </text>
    </g>
  );
}

/** 第21章专属实验：把渲染阶段、光照采样与硬件吞吐放进同一条证据链。 */
export function CgppCh21RenderingLab() {
  const [view, setView] = useState<View>("pipeline");
  const [samples, setSamples] = useState(8);
  const [light, setLight] = useState(0.72);
  const [reflectance, setReflectance] = useState(0.58);
  const [tasks, setTasks] = useState(12);
  const [latency, setLatency] = useState(0.34);
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
    setView("pipeline");
    setSamples(8);
    setLight(0.72);
    setReflectance(0.58);
    setTasks(12);
    setLatency(0.34);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="渲染管线专属流程、采样与硬件吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch21-rendering-pipeline"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 RenderViz · 流程、采样与吞吐证据
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个片段展示它如何被看见、被解释并被完成
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变采样、光能量或访问等待时，哪一类渲染证据会先变化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择渲染管线观察视角">
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
            label="采样数量"
            min={4}
            max={16}
            step={1}
            value={samples}
            onChange={setSamples}
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
            label="反射率"
            min={0.1}
            max={0.95}
            step={0.01}
            value={reflectance}
            onChange={setReflectance}
          />
          <RangeControl
            label="片段任务"
            min={8}
            max={20}
            step={1}
            value={tasks}
            onChange={setTasks}
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
                id="cgpp-ch21-rendering-arrow"
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
            {view === "pipeline" ? (
              <PipelineView
                activeStep={timeline.currentStep}
                nodeRefs={nodeRefs}
              />
            ) : view === "sampling" ? (
              <SamplingView
                light={light}
                reflectance={reflectance}
                samples={samples}
              />
            ) : (
              <ThroughputView latency={latency} tasks={tasks} />
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
        {view === "pipeline" && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="先用单步确认阶段输入，再播放整条管线；任何阶段的偏离都应回到它的证据窗口。"
            reset={{
              label: "重置渲染流程",
              ariaLabel: "重置第21章渲染流程时间线",
              onClick: reset,
            }}
          />
        )}
        {view !== "pipeline" && (
          <button
            type="button"
            onClick={reset}
            aria-label="重置第21章渲染实验"
            className="mx-auto block min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            重置实验
          </button>
        )}
      </div>
    </section>
  );
}
