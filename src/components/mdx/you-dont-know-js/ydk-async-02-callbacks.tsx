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
  { label: "continue", caption: "把当前函数的后续步骤封装成可交接的延续" },
  { label: "handoff", caption: "把延续交给外部组件，并明确参数与错误通道" },
  { label: "control", caption: "外部组件获得调用时机与调用次数的控制权" },
  { label: "resume", caption: "回调恢复局部流程，继续消费成功或失败结果" },
  { label: "trust", caption: "验证一次性、参数形状和错误优先约定" },
  { label: "contract", caption: "用适配器把不可信边界收敛成可验收契约" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 拆出当前步骤的延续",
    "把“拿到结果后还要做什么”写成函数值；它保存的是后续流程，不是当前结果。",
    "输出：continuation",
  ],
  [
    "2 · 把回调交给外部组件",
    "把延续传给网络、定时器或库函数时，同时写明成功参数、错误参数和完成条件。",
    "输出：handoff contract",
  ],
  [
    "3 · 外部组件控制调用时机",
    "控制权离开当前函数后，外部组件决定何时调用、是否调用以及是否意外调用多次。",
    "输出：inversion boundary",
  ],
  [
    "4 · 回调恢复局部流程",
    "回调收到结果后重新进入原流程；成功和失败都必须有明确的消费路径与状态版本。",
    "输出：resumed branch",
  ],
  [
    "5 · 校验次数参数和错误",
    "检查 once、错误优先参数和数据形状，避免重复完成、吞错或把错误当成功值。",
    "输出：validated completion",
  ],
  [
    "6 · 把不可控边界包装成契约",
    "用适配器、取消标记和版本检查收窄信任边界，再把稳定接口交给业务代码。",
    "输出：safe boundary",
  ],
] as const;

type Mode = "baseline" | "duplicate" | "error" | "late";

type ModeInfo = {
  title: string;
  source: string;
  external: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  baseline: {
    title: "一次成功回调",
    source: "load(id, continuation)",
    external: "call count = 1",
    result: "err = null · value = data",
    detail: "成功和失败通道都在契约内，业务流程可以安全恢复。",
  },
  duplicate: {
    title: "重复调用",
    source: "external calls continuation twice",
    external: "call count = 2",
    result: "first = data · second = stale",
    detail: "一次完成的约定被破坏，once 适配器应拒绝第二次写入。",
  },
  error: {
    title: "错误优先回调",
    source: "continuation(error, value)",
    external: "error channel = explicit",
    result: "err = failure · value = undefined",
    detail: "先处理错误，再消费值；错误不能被当成普通数据吞掉。",
  },
  late: {
    title: "迟到结果",
    source: "request version = 1 → current = 2",
    external: "old callback returns later",
    result: "old = ignored · current = kept",
    detail: "用请求版本或取消标记阻止旧回调覆盖新状态。",
  },
};

export function YdkAsync02CallbacksLab() {
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
  const faultIndex = mode === "duplicate" ? 2 : mode === "error" ? 4 : mode === "late" ? 5 : -1;

  function reset() {
    timeline.goToStep(0);
    setMode("baseline");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-02-callbacks"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Chapter 2
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              回调的真正边界：把后续交出去，也把控制权交出去
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换一次成功、重复调用、错误优先和迟到结果样本，逐步观察延续如何离开当前函数并安全恢复。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择回调信任样本</span>
          <select
            aria-label="选择一次成功回调、重复调用、错误优先或迟到结果样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="baseline">一次成功回调 · err + value</option>
            <option value="duplicate">重复调用 · call count = 2</option>
            <option value="error">错误优先 · error channel</option>
            <option value="late">迟到结果 · version check</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Chapter 2 专属教学时间线，覆盖 Chapter 2: Callbacks、Continuations、Sequential Brain、Trust Issues、Trying To Save Callbacks。展示延续、回调交接、外部控制调用时机、局部流程恢复、次数与错误校验、适配器契约以及重复调用、错误优先和迟到结果故障。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async02-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async02-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async02-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            local continuation → external caller → validated recovery
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 2: Callbacks · {selected.title} · 当前：{selected.source}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>当前函数</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.source}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>后续步骤被封装</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>控制权即将离开这里</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async02-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "baseline" ? C.elevated : C.warning} fillOpacity={mode === "baseline" ? 1 : 0.1} stroke={mode === "baseline" ? C.border : C.warning} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "baseline" ? C.accent : C.warning}>外部组件</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.external}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>它决定何时调用</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>不可信行为在此出现</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "baseline" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "baseline" ? "url(#ydk-async02-success-arrow)" : "url(#ydk-async02-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "baseline" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "baseline" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "baseline" ? C.success : C.warning}>恢复结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个信任偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把外部行为与业务状态分开" : isActive ? "当前阶段：按契约证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async02-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-async02-success-arrow)" : "url(#ydk-async02-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "next" : index === 1 ? "handoff" : index === 2 ? "owner" : index === 3 ? "resume" : index === 4 ? "check" : "wrap"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先验证信任，再消费结果</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测外部组件会调用几次、何时调用、如何报告错误，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置回调信任证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        回调把后续流程交出去，也把调用时机交出去；一次性、错误优先和版本检查把控制反转收敛回可验收契约。
      </figcaption>
    </figure>
  );
}
