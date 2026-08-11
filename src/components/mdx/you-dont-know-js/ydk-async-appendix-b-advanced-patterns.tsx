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
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "own", caption: "为请求、计时器和资源建立所有权" },
  { label: "launch", caption: "按策略启动竞争或并发分支" },
  { label: "signal", caption: "传播取消、超时和停止信号" },
  { label: "accept", caption: "只接受仍属于当前请求的结果" },
  { label: "late", caption: "丢弃或补偿已经过期的结果" },
  { label: "cleanup", caption: "清理监听器、计时器和底层资源" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 为操作建立所有权",
    "给请求、AbortController、计时器、Worker 和响应状态分配唯一 owner 与 request id。",
    "输出：ownership record",
  ],
  [
    "2 · 启动多个异步分支",
    "根据竞争、超时或并发上限策略启动工作，同时保存仍可接受的分支集合。",
    "输出：active branches",
  ],
  [
    "3 · 传播取消或超时信号",
    "停止信号需要真正抵达底层任务；只把 UI 标记成 cancelled 不等于工作已停止。",
    "输出：stop signal",
  ],
  [
    "4 · 只接受满足策略的结果",
    "结果回到边界时检查 request id、版本、状态和策略，拒绝已经失去所有权的写入。",
    "输出：accepted result",
  ],
  [
    "5 · 丢弃或补偿迟到结果",
    "过期结果可以被静默丢弃、记录诊断或触发补偿，但不能覆盖当前请求的状态。",
    "输出：late-result policy",
  ],
  [
    "6 · 清理计时器监听器和资源",
    "无论成功、失败、超时还是取消，都要清理计时器、监听器、队列和底层执行资源。",
    "输出：closed lifecycle",
  ],
] as const;

type Mode = "race" | "timeout" | "cancel" | "limit" | "stale" | "reactive";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  race: {
    title: "竞争取首个结果",
    input: "Promise.race(requests)",
    state: "many pending → one accepted",
    result: "winner + cancel losers",
    detail: "取胜者后仍需取消或清理落败分支，不能让它们继续写入。",
  },
  timeout: {
    title: "超时边界",
    input: "task + AbortSignal.timeout",
    state: "running → deadline",
    result: "timeout is a policy",
    detail: "超时决定状态与错误，但只有底层任务响应信号才真正停止工作。",
  },
  cancel: {
    title: "主动取消",
    input: "controller.abort(reason)",
    state: "owned → aborting → closed",
    result: "abort + cleanup",
    detail: "取消是从 owner 到资源的传播路径，必须可观察并且幂等。",
  },
  limit: {
    title: "并发上限",
    input: "queue + workers(2)",
    state: "queued → active → released",
    result: "bounded work",
    detail: "队列策略限制同时工作的数量，完成或失败后才释放下一个槽位。",
  },
  stale: {
    title: "迟到结果",
    input: "if (id !== currentId) drop",
    state: "old request → late arrival",
    result: "discard or compensate",
    detail: "请求 id 和版本检查阻止旧结果覆盖新状态，诊断信息可以另行记录。",
  },
  reactive: {
    title: "响应式序列",
    input: "events → switchLatest",
    state: "new event → previous cancelled",
    result: "latest ownership",
    detail: "事件流需要定义背压、取消旧订阅和关闭监听器的边界。",
  },
};

export function YdkAsyncAppendixBAdvancedPatternsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("race");

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
  const faultIndex =
    mode === "timeout" ? 2 : mode === "stale" ? 4 : mode === "cancel" ? 5 : 1;

  function reset() {
    timeline.goToStep(0);
    setMode("race");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-appendix-b-advanced-patterns"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Appendix B
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              高级异步模式：谁拥有结果，谁负责停止
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换竞争、超时、取消、并发上限、迟到结果和响应式序列，沿六阶段观察所有权、停止条件与清理边界。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择异步策略</span>
          <select
            aria-label="选择竞争取首个结果、超时边界、主动取消、并发上限、迟到结果或响应式序列策略"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="race">竞争 · cancel losers</option>
            <option value="timeout">超时 · deadline policy</option>
            <option value="cancel">取消 · abort + cleanup</option>
            <option value="limit">并发上限 · bounded work</option>
            <option value="stale">迟到结果 · request id</option>
            <option value="reactive">响应式序列 · latest ownership</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Appendix B 专属教学时间线，覆盖 Appendix B: Advanced Async Patterns。展示操作所有权、并行分支、取消与超时信号、策略结果、迟到结果处理和资源清理，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async-apB-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async-apB-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async-apB-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            own → launch → signal → accept → late → cleanup
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Appendix B: Advanced Async Patterns · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>当前请求</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>状态：{selected.state}</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>owner：request id</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async-apB-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "timeout" || mode === "stale" ? C.warning : C.elevated} fillOpacity={mode === "timeout" || mode === "stale" ? 0.1 : 1} stroke={mode === "timeout" || mode === "stale" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "timeout" || mode === "stale" ? C.warning : C.accent}>策略边界</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>停止：取消 / deadline</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>结果：{selected.result}</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "cancel" || mode === "limit" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "cancel" || mode === "limit" ? "url(#ydk-async-apB-success-arrow)" : "url(#ydk-async-apB-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "cancel" || mode === "limit" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "cancel" || mode === "limit" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "cancel" || mode === "limit" ? C.success : C.warning}>生命周期结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个所有权偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：分开记录停止信号与迟到工作" : isActive ? "当前阶段：按所有权协议推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async-apB-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-async-apB-success-arrow)" : "url(#ydk-async-apB-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "owner" : index === 1 ? "launch" : index === 2 ? "signal" : index === 3 ? "accept" : index === 4 ? "late" : "close"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看所有权，再看结果</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪个分支拥有写入权、取消是否真的抵达底层，再推进时间线验证迟到结果和清理。"
          reset={{ label: "重置实验", ariaLabel: "重置高级异步模式所有权实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级异步模式的共同问题是生命周期：谁启动、谁取消、谁接受结果、谁处理迟到值，最后谁关闭所有资源。
      </figcaption>
    </figure>
  );
}
