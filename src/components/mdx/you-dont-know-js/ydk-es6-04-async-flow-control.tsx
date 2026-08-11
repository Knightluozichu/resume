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
  { label: "promise", caption: "把未来值包装成 pending / fulfilled / rejected" },
  { label: "yield", caption: "让生成器把异步工作交给执行器" },
  { label: "settle", caption: "等待 Promise 结算并保留顺序证据" },
  { label: "next", caption: "把兑现值通过 next 回灌到暂停点" },
  { label: "throw", caption: "把拒绝原因通过 throw 回灌到生成器" },
  { label: "done", caption: "继续到下一暂停点并兑现最终结果" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · Promise 状态",
    "Promise 把未来值表达为 pending、fulfilled 或 rejected，执行器可以等待结算而不丢失错误路径。",
    "证据：state + outcome",
  ],
  [
    "2 · 生成器暂停",
    "生成器 yield 一个 Promise，把继续执行的责任交给执行器，并保存局部绑定和暂停位置。",
    "证据：yield + frame",
  ],
  [
    "3 · 执行器等待",
    "执行器订阅 Promise 的成功和失败，只有结算后才把控制权交还给生成器。",
    "证据：settle + queue",
  ],
  [
    "4 · next 回灌",
    "兑现值作为 next 的输入回到 yield 表达式，生成器可以用顺序代码继续组合下一次异步工作。",
    "证据：value + resume",
  ],
  [
    "5 · throw 回灌",
    "拒绝原因通过 throw 回到暂停点，try/catch/finally 决定错误是否恢复、传播和清理。",
    "证据：error + cleanup",
  ],
  [
    "6 · 完成结果",
    "生成器到达 done 后，执行器兑现总结果；未处理的拒绝必须保持可观察而不是静默丢失。",
    "证据：done + result",
  ],
] as const;

type Mode = "resolve" | "reject" | "sequence" | "cleanup";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  resolve: {
    title: "兑现路径",
    input: "yield Promise.resolve(2)",
    state: "pending → fulfilled",
    result: "next(2)",
    detail: "执行器等待 Promise 兑现，再把值送回 yield；顺序代码仍保留异步边界。",
  },
  reject: {
    title: "拒绝路径",
    input: "yield Promise.reject(error)",
    state: "pending → rejected",
    result: "throw(error)",
    detail: "拒绝不是特殊返回值；它应通过 throw 回到生成器，并由 catch 或调用者消费。",
  },
  sequence: {
    title: "顺序组合",
    input: "yield first(); yield second(value)",
    state: "pause → resume → pause",
    result: "ordered result",
    detail: "执行器把每次结算串起来，下一次任务只消费上一阶段明确签发的值。",
  },
  cleanup: {
    title: "清理路径",
    input: "try { yield task } finally { close() }",
    state: "error + finally",
    result: "released resource",
    detail: "无论 Promise 成功、拒绝还是提前结束，都要验证 finally 和资源释放。",
  },
};

export function YdkEs604AsyncFlowControlLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("resolve");

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
  const faultIndex = mode === "reject" ? 4 : mode === "cleanup" ? 5 : 2;

  function reset() {
    timeline.goToStep(0);
    setMode("resolve");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-04-async-flow-control"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 4
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              异步流程控制：Promise 与生成器回灌
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换兑现、拒绝、顺序和清理样本，沿时间线观察 Promise 如何与生成器暂停、next/throw 回灌和最终结果连接。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择异步流程样本</span>
          <select
            aria-label="选择 Promises 兑现、Generators + Promises 拒绝、顺序组合或清理路径样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="resolve">Promises · fulfill</option>
            <option value="reject">Generators + Promises · reject</option>
            <option value="sequence">顺序组合 · resume</option>
            <option value="cleanup">清理路径 · finally</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 4 专属教学时间线，覆盖 Chapter 4: Async Flow Control、Promises、Generators + Promises。展示 Promise 状态、生成器 yield、执行器等待、next 回灌、throw 回灌、错误清理和 done 最终结果，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es604-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es604-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es604-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            promise → yield → settle → next → throw → done
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 4: Async Flow Control · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>异步输入</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先预测结算与回灌方向</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>再观察队列和清理</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es604-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "reject" || mode === "cleanup" ? C.warning : C.elevated} fillOpacity={mode === "reject" || mode === "cleanup" ? 0.1 : 1} stroke={mode === "reject" || mode === "cleanup" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "reject" || mode === "cleanup" ? C.warning : C.accent}>执行器状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>证据：值、错误、队列和清理</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "resolve" || mode === "sequence" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "resolve" || mode === "sequence" ? "url(#ydk-es604-success-arrow)" : "url(#ydk-es604-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "resolve" || mode === "sequence" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "resolve" || mode === "sequence" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "resolve" || mode === "sequence" ? C.success : C.warning}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>异步边界必须可回放</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把兑现、拒绝与清理分开记录" : isActive ? "当前阶段：沿回灌机制证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es604-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-es604-success-arrow)" : "url(#ydk-es604-arrow)"}
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
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "state" : index === 1 ? "pause" : index === 2 ? "wait" : index === 3 ? "value" : index === 4 ? "error" : "result"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先解释回灌，再看输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 Promise 结算、生成器暂停、next/throw 回灌和清理顺序，再推进时间线验证异步流程如何恢复。"
          reset={{ label: "重置实验", ariaLabel: "重置异步流程控制实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异步流程控制的核心不是隐藏等待，而是让结算、暂停、回灌、错误和清理都成为可重放的状态转换。
      </figcaption>
    </figure>
  );
}
