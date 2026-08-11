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
  { label: "input", caption: "明确输入、目标与可观察的输出" },
  { label: "values", caption: "用值与类型表示数据和中间状态" },
  { label: "operators", caption: "用表达式和运算符计算新值" },
  { label: "control", caption: "用条件选择不同的执行路径" },
  { label: "repeat", caption: "用循环和函数封装可重复工作" },
  { label: "practice", caption: "运行、观察、修改并测试契约" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 明确输入与目标",
    "把问题写成输入、目标和可观察输出，先确定程序要证明什么，而不是先挑语法。",
    "输出：problem contract",
  ],
  [
    "2 · 把数据表示为值",
    "选择数字、字符串、布尔值、数组或对象表示状态，并记录类型与边界。",
    "输出：value model",
  ],
  [
    "3 · 用表达式计算中间结果",
    "运算符和函数调用读取当前绑定、产生新值；括号与求值顺序要能被预测。",
    "输出：derived value",
  ],
  [
    "4 · 用分支处理不同情况",
    "条件判断选择路径，分支必须覆盖输入边界，并明确未命中时的默认行为。",
    "输出：control path",
  ],
  [
    "5 · 用循环与函数处理重复工作",
    "循环管理重复状态，函数封装输入输出契约；二者都要有结束条件和可测边界。",
    "输出：reusable process",
  ],
  [
    "6 · 运行、观察、修改并测试",
    "把预测与实际输出对照，记录首个偏离点，修改一个变量后重跑并验证契约。",
    "输出：replayable evidence",
  ],
] as const;

type Mode = "expression" | "types" | "control" | "loop" | "function";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  expression: {
    title: "表达式求值",
    input: "price * (1 + tax)",
    state: "bindings → derived value",
    result: "number",
    detail: "先记录当前绑定和运算符，再预测中间值，避免只背最终输出。",
  },
  types: {
    title: "值与类型",
    input: "value + label",
    state: "number + string",
    result: "explicit conversion",
    detail: "值的类型影响运算和比较；边界实验要主动检查空值与隐式转换。",
  },
  control: {
    title: "条件路径",
    input: "if (total >= limit)",
    state: "true branch / false branch",
    result: "selected path",
    detail: "分支决定后续执行；测试应覆盖命中、未命中和边界条件。",
  },
  loop: {
    title: "循环重复",
    input: "for (const item of items)",
    state: "index → item → next",
    result: "accumulated value",
    detail: "循环需要初始化、推进和结束条件，否则重复工作可能不终止。",
  },
  function: {
    title: "函数契约",
    input: "formatTotal(items, rate)",
    state: "arguments → local bindings",
    result: "return value",
    detail: "函数隔离局部状态并签发返回值；输入、输出和错误边界都应可测试。",
  },
};

export function YdkUp01IntoProgrammingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("expression");

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
  const faultIndex = mode === "types" ? 1 : mode === "control" ? 3 : 4;

  function reset() {
    timeline.goToStep(0);
    setMode("expression");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-up-01-into-programming"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Up &amp; Going · Chapter 1
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              编程语义链：输入、值、控制流与可测试函数
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换表达式、值与类型、条件、循环和函数样本，沿六阶段观察程序如何从问题契约走到可重放的证据。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择语义样本</span>
          <select
            aria-label="选择表达式求值、值与类型、条件路径、循环重复或函数契约样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="expression">表达式 · derived value</option>
            <option value="types">值与类型 · conversion</option>
            <option value="control">条件 · selected path</option>
            <option value="loop">循环 · accumulated value</option>
            <option value="function">函数 · return contract</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Up & Going Chapter 1 专属教学时间线，覆盖 Chapter 1: Into Programming、Code、Try It Yourself、Operators、Values & Types、Code Comments、Variables、Blocks、Conditionals、Loops、Functions、Practice。展示输入目标、值与类型、表达式、分支、循环、函数和练习反馈，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-up01-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-up01-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-up01-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            input → values → operators → control → repeat → practice
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 1: Into Programming · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>程序输入</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>目标：可观察输出</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>先预测，再运行</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-up01-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "types" || mode === "control" ? C.warning : C.elevated} fillOpacity={mode === "types" || mode === "control" ? 0.1 : 1} stroke={mode === "types" || mode === "control" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "types" || mode === "control" ? C.warning : C.accent}>语义状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>绑定：value / variable</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>路径：{selected.result}</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "function" || mode === "loop" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "function" || mode === "loop" ? "url(#ydk-up01-success-arrow)" : "url(#ydk-up01-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "function" || mode === "loop" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "function" || mode === "loop" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "function" || mode === "loop" ? C.success : C.warning}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个语义偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把类型、路径与结果分开记录" : isActive ? "当前阶段：按程序语义推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-up01-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-up01-success-arrow)" : "url(#ydk-up01-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "goal" : index === 1 ? "type" : index === 2 ? "value" : index === 3 ? "path" : index === 4 ? "repeat" : "test"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看绑定，再看输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测值、类型、路径和返回结果，再推进时间线验证程序如何执行。"
          reset={{ label: "重置实验", ariaLabel: "重置深入编程语义链实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编程入门不是记住语法顺序，而是建立输入、绑定、求值、控制流和测试之间可重放的语义模型。
      </figcaption>
    </figure>
  );
}
