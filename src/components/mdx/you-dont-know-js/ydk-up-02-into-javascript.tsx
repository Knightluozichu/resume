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
  { label: "values", caption: "先辨认值与类型，再建立可观察的绑定" },
  { label: "bindings", caption: "让变量绑定、函数值和词法环境保持可追踪" },
  { label: "conditionals", caption: "用真假值和严格模式解释控制流边界" },
  { label: "this", caption: "从调用点判断 this，而不是从函数名字猜" },
  { label: "prototypes", caption: "沿原型链查找共享行为，不把它误认为复制" },
  { label: "boundaries", caption: "区分旧写法、新能力与非 JavaScript 宿主边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 先确认值与类型",
    "JavaScript 的值带着类型语义进入表达式；先记录值、类型和可能的转换，再预测结果。",
    "证据：value + type",
  ],
  [
    "2 · 追踪变量与函数值",
    "变量是绑定，函数也是可以保存、传递和返回的值；词法环境决定名称如何被解析。",
    "证据：binding + closure",
  ],
  [
    "3 · 解释条件与严格模式",
    "条件消费真假值，严格模式把部分隐式行为变成更早、更明确的错误。",
    "证据：branch + error",
  ],
  [
    "4 · 依据调用点建立 this",
    "同一个函数值可以被不同调用点使用；this 的默认、隐式、显式和构造调用要分开验证。",
    "证据：call-site",
  ],
  [
    "5 · 沿原型链查找行为",
    "对象先查自己的属性，再沿原型委托；共享方法来自查找，不是把属性复制到每个对象。",
    "证据：lookup path",
  ],
  [
    "6 · 放回版本与宿主边界",
    "旧语法、新语法和宿主 API 解决不同问题；可运行不代表它们属于同一层能力。",
    "证据：language boundary",
  ],
] as const;

type Mode = "values" | "strict" | "this" | "prototype" | "legacy";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  values: {
    title: "值与类型",
    input: "1 + \"2\"",
    state: "number + string",
    result: '"12"',
    detail: "先辨认操作数类型，再解释转换；相同外观不代表相同值语义。",
  },
  strict: {
    title: "严格模式",
    input: "function f() { x = 1 }",
    state: "undeclared binding",
    result: "TypeError",
    detail: "严格模式让隐式创建全局绑定变成显式失败，错误更靠近根因。",
  },
  this: {
    title: "this 调用点",
    input: "obj.read() / read()",
    state: "method / plain call",
    result: "obj / undefined",
    detail: "this 由调用形式决定；把方法取出后，函数值仍在，但调用点已改变。",
  },
  prototype: {
    title: "原型查找",
    input: "child.read()",
    state: "own → prototype",
    result: "shared method",
    detail: "对象找不到自己的属性时才沿原型委托，方法没有被复制到 child。",
  },
  legacy: {
    title: "旧与新",
    input: "var / let / const",
    state: "historical syntax",
    result: "scope boundary",
    detail: "旧写法仍可能运行，但应把历史兼容性与现代语义边界写清楚。",
  },
};

export function YdkUp02IntoJavaScriptLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("values");

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
  const faultIndex = mode === "strict" ? 2 : mode === "this" ? 3 : mode === "prototype" ? 4 : 1;

  function reset() {
    timeline.goToStep(0);
    setMode("values");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-up-02-into-javascript"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Up &amp; Going · Chapter 2
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              JavaScript 语义链：值、调用点、原型与边界
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换样本并沿时间线推进，观察值与类型怎样进入绑定、条件、this、原型查找，最后回到版本和宿主边界。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 JavaScript 语义样本</span>
          <select
            aria-label="选择 Values & Types、Strict Mode、this Keyword、Prototypes 或 Old & New 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="values">Values &amp; Types · conversion</option>
            <option value="strict">Strict Mode · explicit error</option>
            <option value="this">this Keyword · call-site</option>
            <option value="prototype">Prototypes · lookup</option>
            <option value="legacy">Old &amp; New · boundary</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Up & Going Chapter 2 专属教学时间线，覆盖 Chapter 2: Into JavaScript、Values & Types、Variables、Conditionals、Strict Mode、Functions As Values、this Keyword、Prototypes、Old & New、Non-JavaScript。展示值与类型、变量绑定、条件、严格模式、函数值、this 调用点、原型查找、旧新语法和宿主边界，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-up02-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-up02-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-up02-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            values → bindings → conditions → this → prototypes → boundaries
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 2: Into JavaScript · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>运行输入</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先预测值、类型与调用点</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>再记录首个偏离</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-up02-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "strict" || mode === "this" ? C.warning : C.elevated} fillOpacity={mode === "strict" || mode === "this" ? 0.1 : 1} stroke={mode === "strict" || mode === "this" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "strict" || mode === "this" ? C.warning : C.accent}>运行时状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>查找路径：先自身，再边界</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "values" || mode === "prototype" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "values" || mode === "prototype" ? "url(#ydk-up02-success-arrow)" : "url(#ydk-up02-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "values" || mode === "prototype" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "values" || mode === "prototype" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "values" || mode === "prototype" ? C.success : C.warning}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>不要把结果当成唯一证据</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把语义层与宿主层分开记录" : isActive ? "当前阶段：按调用与查找路径推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-up02-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-up02-success-arrow)" : "url(#ydk-up02-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "type" : index === 1 ? "scope" : index === 2 ? "branch" : index === 3 ? "call" : index === 4 ? "lookup" : "host"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看路径，再看输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测类型、绑定、调用点和查找路径，再推进时间线验证 JavaScript 如何执行。"
          reset={{ label: "重置实验", ariaLabel: "重置深入 JavaScript 语义链实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入 JavaScript 不是背诵孤立语法，而是建立值、绑定、调用点、原型查找和语言边界之间可重放的模型。
      </figcaption>
    </figure>
  );
}
