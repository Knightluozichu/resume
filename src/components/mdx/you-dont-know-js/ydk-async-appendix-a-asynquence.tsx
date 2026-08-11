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
  { label: "create", caption: "创建一个持有完成状态的异步序列" },
  { label: "chain", caption: "追加顺序步骤并传递前一步结果" },
  { label: "gate", caption: "用 gate 等待多个分支汇合" },
  { label: "collect", caption: "聚合分支结果并保留输入顺序" },
  { label: "fail", caption: "把拒绝或异常送入统一错误通道" },
  { label: "bridge", caption: "与原生 Promise 或生成器执行器对照" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 创建异步序列",
    "序列对象持有待定、完成或失败状态，创建者负责签发结果，消费者负责订阅后续步骤。",
    "输出：sequence state",
  ],
  [
    "2 · 追加顺序步骤",
    "每个步骤接收前一步的结果，并把普通值、异步值或错误交给下一段协议。",
    "输出：ordered chain",
  ],
  [
    "3 · 用 gate 并行分支",
    "gate 把多个独立分支的完成信号集中起来，但不自动决定取消、超时或资源上限。",
    "输出：pending branches",
  ],
  [
    "4 · 聚合分支结果",
    "所有分支完成后按约定收集结果，保留请求身份与顺序，避免迟到值覆盖别的任务。",
    "输出：combined value",
  ],
  [
    "5 · 统一进入错误通道",
    "拒绝、回调异常和超时都进入明确的错误消费者；恢复后才允许序列继续签发。",
    "输出：error boundary",
  ],
  [
    "6 · 与原生 Promise 组合对照",
    "把历史库的顺序、并行和错误契约映射到现代 Promise 或生成器执行器，再比较边界差异。",
    "输出：portable contract",
  ],
] as const;

type Mode = "sequence" | "parallel" | "gate" | "failure" | "bridge";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  sequence: {
    title: "顺序链",
    input: "seq.then(stepA).then(stepB)",
    state: "pending → fulfilled",
    result: "ordered result",
    detail: "每一步只消费前一步签发的结果，顺序是协议的一部分。",
  },
  parallel: {
    title: "并行分支",
    input: "branchA + branchB",
    state: "two pending branches",
    result: "combined result",
    detail: "分支可以同时开始，但聚合仍需要请求身份、完成条件和清理策略。",
  },
  gate: {
    title: "gate 汇合",
    input: "gate.wait(2).signal()",
    state: "countdown → released",
    result: "release once",
    detail: "gate 只表达汇合条件；超时、取消和重复 signal 需要额外契约。",
  },
  failure: {
    title: "统一错误",
    input: "step.reject(error)",
    state: "branch → error channel",
    result: "handled or stopped",
    detail: "失败应有唯一消费者；恢复值与原始错误必须在证据中区分。",
  },
  bridge: {
    title: "现代桥接",
    input: "Promise.resolve(value)",
    state: "legacy contract ↔ Promise",
    result: "same observable boundary",
    detail: "桥接要保留顺序、一次完成、错误传播与清理语义，不能只换名称。",
  },
};

export function YdkAsyncAppendixAAsynquenceLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("sequence");

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
  const faultIndex = mode === "failure" ? 4 : mode === "bridge" ? 5 : 2;

  function reset() {
    timeline.goToStep(0);
    setMode("sequence");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-appendix-a-asynquence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Appendix A
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              asynquence 的组合契约：顺序、汇合与错误边界
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换顺序链、并行分支、gate、统一错误和现代桥接，沿六阶段观察历史库如何表达完成、汇合与失败。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择组合样本</span>
          <select
            aria-label="选择顺序链、并行分支、gate 汇合、统一错误或现代 Promise 桥接样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="sequence">顺序链 · ordered chain</option>
            <option value="parallel">并行分支 · combined result</option>
            <option value="gate">gate 汇合 · release once</option>
            <option value="failure">统一错误 · error channel</option>
            <option value="bridge">现代桥接 · Promise contract</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Appendix A 专属教学时间线，覆盖 Appendix A: asynquence Library。展示创建异步序列、追加顺序步骤、gate 并行分支、聚合分支结果、统一错误通道和与原生 Promise 或生成器执行器桥接，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async-apA-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async-apA-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async-apA-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            create → chain → gate → collect → fail → bridge
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Appendix A: asynquence Library · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>序列拥有者</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>状态：{selected.state}</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>一次完成 + 明确清理</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async-apA-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "failure" || mode === "gate" ? C.warning : C.elevated} fillOpacity={mode === "failure" || mode === "gate" ? 0.1 : 1} stroke={mode === "failure" || mode === "gate" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "failure" || mode === "gate" ? C.warning : C.accent}>组合协议</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>分支：顺序 / 并行 / 汇合</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>错误：{selected.result}</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "sequence" || mode === "bridge" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "sequence" || mode === "bridge" ? "url(#ydk-async-apA-success-arrow)" : "url(#ydk-async-apA-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "sequence" || mode === "bridge" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "sequence" || mode === "bridge" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "sequence" || mode === "bridge" ? C.success : C.warning}>边界结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个协议偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：分开记录分支状态与错误消费者" : isActive ? "当前阶段：按组合协议推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async-apA-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-async-apA-success-arrow)" : "url(#ydk-async-apA-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "state" : index === 1 ? "order" : index === 2 ? "wait" : index === 3 ? "join" : index === 4 ? "error" : "bridge"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看协议，再看库名</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测每个分支何时完成、错误在哪里消费、桥接是否保留一次完成，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置 asynquence 组合契约实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        asynquence 的学习重点是组合契约：顺序、并行、gate、错误和清理必须可观察，现代桥接也必须保留这些边界。
      </figcaption>
    </figure>
  );
}
