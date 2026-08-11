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
  { label: "snapshot", caption: "保存原书提案和当时语境" },
  { label: "status", caption: "查清当前规范与实现状态" },
  { label: "classify", caption: "区分标准化、替代和撤回" },
  { label: "syntax", caption: "用最终语法重写示例" },
  { label: "fallback", caption: "为撤回方案选择现代替代" },
  { label: "verify", caption: "在目标引擎回归并记录版本" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 原书快照",
    "先记录作者在 2015 年看到的候选能力，保留术语、限制与当时的未知部分。",
    "证据：source + date",
  ],
  [
    "2 · 当前状态",
    "查询规范、实现和提案历史，不能用旧书中的 future 词汇代替今天的状态。",
    "证据：spec + runtime",
  ],
  [
    "3 · 状态分类",
    "把能力分为已标准化、已有替代、已撤回或仍依赖环境，决定是否可以直接推荐。",
    "证据：status + decision",
  ],
  [
    "4 · 最终语法",
    "对已进入规范的能力使用最终语法，同时说明 async、指数、展开和 includes 的边界。",
    "证据：syntax + behavior",
  ],
  [
    "5 · 现代替代",
    "撤回方案不能继续假装可用；选择稳定 API、显式循环或项目级工具承接原问题。",
    "证据：replacement + tradeoff",
  ],
  [
    "6 · 目标验证",
    "在目标引擎和版本中运行行为测试，记录支持、降级、错误和未来复查日期。",
    "证据：engine + regression",
  ],
] as const;

type Mode = "async" | "operator" | "spread" | "includes";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  async: {
    title: "async functions",
    input: "async function load() { await task() }",
    state: "proposal → standard",
    result: "Promise result",
    detail: "async 函数已标准化，但 await 仍有 Promise 和错误传播边界，不能被描述成同步 I/O。",
  },
  operator: {
    title: "Exponentiation Operator",
    input: "2 ** 3",
    state: "syntax → runtime",
    result: "8",
    detail: "指数运算符进入最终语法；优先级、负数括号和 BigInt 输入仍要在目标环境回归。",
  },
  spread: {
    title: "Object Properties and ...",
    input: "const copy = { ...source }",
    state: "proposal → standard",
    result: "shallow copy",
    detail: "对象展开已标准化，但仍是浅复制；访问器、属性顺序和嵌套引用需要单独断言。",
  },
  includes: {
    title: "Array#includes(..)",
    input: "[NaN].includes(NaN)",
    state: "proposal → standard",
    result: "true",
    detail: "includes 使用 SameValueZero 语义，可以命中 NaN；它不等于 indexOf，也不能解决所有查找需求。",
  },
};

export function YdkEs608BeyondEs6Lab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("async");

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
  const boundaryIndex = mode === "async" ? 0 : mode === "operator" ? 3 : mode === "spread" ? 4 : 5;

  function reset() {
    timeline.goToStep(0);
    setMode("async");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-08-beyond-es6"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 8
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              ES6 之后：追踪状态，而不是背未来清单
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换 async、指数、对象展开和 includes 样本，沿时间线观察一项提案如何从原书快照走到最终语法、现代替代和目标引擎验证。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择提案状态样本</span>
          <select
            aria-label="选择 async functions、Exponentiation Operator、Object Properties and ... 或 Array includes 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="async">async functions · Promise boundary</option>
            <option value="operator">Exponentiation Operator · precedence</option>
            <option value="spread">Object Properties and ... · shallow copy</option>
            <option value="includes">Array#includes(..) · NaN</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 8 专属提案状态时间线，覆盖 Chapter 8: Beyond ES6、async functions、Object.observe(..)、Exponentiation Operator、Object Properties and ...、Array#includes(..)、SIMD。展示原书快照、当前规范状态、标准化与撤回分类、最终语法、现代替代和目标引擎验证，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es608-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es608-success-arrow" markerWidth="8" height="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es608-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            snapshot → status → classify → syntax → replacement → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 8: Beyond ES6 · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="124" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入快照</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>先写原书年代与候选状态</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>再查今天的规范和引擎</text>

          <line x1="294" y1="140" x2="326" y2="140" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es608-success-arrow)" />

          <rect x="336" y="78" width="252" height="124" rx="12" fill={mode === "spread" || mode === "includes" ? C.warning : C.elevated} fillOpacity={mode === "spread" || mode === "includes" ? 0.1 : 1} stroke={mode === "spread" || mode === "includes" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "spread" || mode === "includes" ? C.warning : C.accent}>状态分类</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>证据：规范、实现、替代</text>

          <line x1="600" y1="140" x2="632" y2="140" stroke={mode === "spread" || mode === "includes" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "spread" || mode === "includes" ? "url(#ydk-es608-warning-arrow)" : "url(#ydk-es608-success-arrow)"} />

          <rect x="642" y="78" width="228" height="124" rx="12" fill={mode === "spread" || mode === "includes" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "spread" || mode === "includes" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "spread" || mode === "includes" ? C.warning : C.success}>验证结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>状态必须可追溯</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="106" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="278" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="306" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="322" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把历史状态与现行能力分开记录" : isActive ? "当前阶段：沿状态证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="382" x2="848" y2="382" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es608-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="382"
                x2={x2}
                y2="382"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-es608-success-arrow)" : "url(#ydk-es608-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="398" width="104" height="116" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="422" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="426" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="426" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="454" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="480" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="502" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "source" : index === 1 ? "status" : index === 2 ? "classify" : index === 3 ? "syntax" : index === 4 ? "replace" : "engine"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先追踪状态，再决定推荐</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测一项能力今天属于标准化、替代还是撤回，再推进时间线验证语法、降级和目标引擎行为。"
          reset={{ label: "重置实验", ariaLabel: "重置 ES6 之后提案状态实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习未来语法的关键不是猜中提案，而是能追溯它的状态、替代方案和目标环境行为。
      </figcaption>
    </figure>
  );
}
