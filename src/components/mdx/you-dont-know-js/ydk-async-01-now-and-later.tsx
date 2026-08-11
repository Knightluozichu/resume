"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "sync", caption: "当前任务先运行到完成，调用栈不能被外部插队" },
  { label: "schedule", caption: "定时器、网络或 Promise 注册稍后完成的工作" },
  { label: "stack", caption: "调用栈清空，宿主才有机会进入调度边界" },
  { label: "micro", caption: "下一任务前先清空当前检查点产生的微任务" },
  { label: "task", caption: "宿主从任务队列选择下一段可运行代码" },
  { label: "order", caption: "按可观察顺序核对输出，而不是凭注册顺序猜" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 执行当前同步任务",
    "一次任务先运行到完成；当前调用栈中的语句不会被稍后的回调抢占。",
    "输出：A、B 等同步记录",
  ],
  [
    "2 · 注册稍后完成的操作",
    "定时器、网络回调和 Promise 反应都先留下待处理工作，不会立刻执行回调本体。",
    "输出：queued work",
  ],
  [
    "3 · 当前调用栈清空",
    "当前任务返回后，执行上下文才到达调度边界；这也是同步代码与稍后代码的分界。",
    "输出：stack = empty",
  ],
  [
    "4 · 清空微任务队列",
    "在进入下一任务前，当前检查点产生的 Promise job 等微任务会先按队列规则运行。",
    "输出：microtask checkpoint",
  ],
  [
    "5 · 宿主选择下一任务",
    "宿主从任务队列中选择下一段工作；不同任务源的精确选择不应被写成固定时间表。",
    "输出：next task",
  ],
  [
    "6 · 按可观察顺序记录输出",
    "把同步输出、微任务输出和任务输出编号，再用重放样本验证真正的先后关系。",
    "输出：ordered trace",
  ],
] as const;

type Mode = "baseline" | "microtask" | "task" | "concurrency";

type ModeInfo = {
  title: string;
  source: string;
  queue: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  baseline: {
    title: "同步基线",
    source: "console.log(\"A\") → console.log(\"B\")",
    queue: "microtasks = 0 · tasks = 0",
    result: "A → B",
    detail: "先建立当前任务运行至完成的基线，再加入稍后工作。",
  },
  microtask: {
    title: "微任务检查点",
    source: "Promise.resolve().then(job)",
    queue: "microtasks = [job]",
    result: "A → B → job",
    detail: "微任务在下一任务前运行，但不会打断当前同步调用栈。",
  },
  task: {
    title: "任务队列",
    source: "setTimeout(task, 0)",
    queue: "tasks = [task]",
    result: "A → B → task",
    detail: "定时器只表示可调度的稍后工作，不承诺精确的墙上时间。",
  },
  concurrency: {
    title: "并发对照",
    source: "two jobs overlap their waiting",
    queue: "agent 1 + agent 2",
    result: "progress overlaps",
    detail: "并发描述多个工作都在推进；它不自动等于共享线程上的并行执行。",
  },
};

export function YdkAsync01NowLaterLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("baseline");

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];
  const faultIndex = mode === "microtask" ? 3 : mode === "task" ? 4 : mode === "concurrency" ? 2 : -1;

  function reset() {
    timeline.goToStep(0);
    setMode("baseline");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-01-now-and-later"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Chapter 1
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              异步不是跳过当前代码：它是时间片与队列的交接
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换同步、微任务、任务队列和并发样本，沿六步时间线观察调用栈、检查点与可观察输出顺序。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择调度样本</span>
          <select
            aria-label="选择同步基线、微任务检查点、任务队列或并发对照样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="baseline">同步基线 · A → B</option>
            <option value="microtask">微任务 · Promise job</option>
            <option value="task">任务队列 · setTimeout</option>
            <option value="concurrency">并发对照 · 两个工作重叠等待</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Chapter 1 专属教学时间线，覆盖 Chapter 1: Asynchrony: Now & Later、A Program In Chunks、Event Loop、Parallel Threading、Concurrency、Jobs、Statement Ordering。展示当前同步任务、稍后工作、调用栈清空、微任务检查点、宿主任务选择和可观察输出顺序。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async01-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async01-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async01-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            current task → microtask checkpoint → next task → ordered trace
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 1: Asynchrony: Now &amp; Later · {selected.title} · 当前：{selected.source}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>当前任务</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.source}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>调用栈先运行到完成</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>不会被稍后回调抢占</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async01-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "microtask" ? C.warning : C.elevated} fillOpacity={mode === "microtask" ? 0.1 : 1} stroke={mode === "microtask" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "microtask" ? C.warning : C.accent}>微任务检查点</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.queue}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>下一任务前先处理</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>但不打断当前栈</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "baseline" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "baseline" ? "url(#ydk-async01-success-arrow)" : "url(#ydk-async01-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "baseline" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "baseline" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "baseline" ? C.success : C.warning}>可观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个顺序偏离</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="220" width="840" height="110" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <text x="52" y="248" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="276" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="304" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把注册时间与执行时间分开" : isActive ? "当前阶段：按队列证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async01-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="386"
                x2={x2}
                y2="386"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-async01-success-arrow)" : "url(#ydk-async01-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="104" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "stack" : index === 1 ? "queue" : index === 2 ? "empty" : index === 3 ? "job" : index === 4 ? "task" : "order"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看时间片，再看输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测同步代码、微任务和任务回调的相对顺序，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置异步调度证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异步把程序拆成可调度的时间片；当前任务先运行至完成，微任务在检查点清空，宿主再选择下一任务。
      </figcaption>
    </figure>
  );
}
