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
  { label: "bindings", caption: "用 let 与 const 固定块级绑定边界" },
  { label: "shape", caption: "用解构、默认值和参数表达数据形状" },
  { label: "sequence", caption: "用展开、剩余和 for..of 追踪可迭代序列" },
  { label: "function", caption: "用对象扩展、模板和箭头函数表达行为" },
  { label: "literals", caption: "用正则、数字字面量和 Unicode 处理文本" },
  { label: "identity", caption: "用 Symbol 建立不与字符串冲突的身份" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 块级声明",
    "先确定 let 与 const 的作用域、初始化时机和不可重新赋值边界，再阅读后续表达式。",
    "证据：binding + block",
  ],
  [
    "2 · 形状与默认值",
    "解构和默认参数把数据形状写进绑定过程；默认值只在 undefined 时触发。",
    "证据：shape + fallback",
  ],
  [
    "3 · 序列协议",
    "展开、剩余和 for..of 都消费可迭代协议；它们的读取边界和求值顺序要单独验证。",
    "证据：iterator + order",
  ],
  [
    "4 · 函数表达",
    "对象字面量扩展、模板字面量和箭头函数压缩了表达式，但不取消 this、求值和副作用规则。",
    "证据：function + context",
  ],
  [
    "5 · 文本与数字",
    "正则扩展、数字字面量和 Unicode 改善表达能力，也带来解析、编码和边界差异。",
    "证据：literal + code point",
  ],
  [
    "6 · 符号身份",
    "Symbol 提供不与字符串键冲突的身份；它能隐藏协议入口，但不会自动让数据不可见。",
    "证据：identity + protocol",
  ],
] as const;

type Mode = "bindings" | "destructure" | "iterator" | "arrow" | "unicode";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  bindings: {
    title: "块级声明",
    input: "let / const in block",
    state: "lexical binding",
    result: "isolated scope",
    detail: "块级声明限制绑定的可见范围；先初始化再读取，const 也不能重新赋值。",
  },
  destructure: {
    title: "解构与默认值",
    input: "{ id, label = \"guest\" }",
    state: "shape + undefined",
    result: "named bindings",
    detail: "解构按属性或迭代位置建立绑定，默认值只替换 undefined，不替换 null。",
  },
  iterator: {
    title: "展开与迭代",
    input: "[...items] / for..of",
    state: "iterator protocol",
    result: "ordered values",
    detail: "展开和 for..of 都依赖可迭代协议；对象没有默认迭代器，不能只看外观。",
  },
  arrow: {
    title: "函数语法",
    input: "({ value, ...rest }) => value",
    state: "lexical this",
    result: "expression result",
    detail: "箭头函数没有自己的 this；对象扩展和模板插值仍按各自求值规则运行。",
  },
  unicode: {
    title: "Unicode 与 Symbol",
    input: "text.normalize() / Symbol()",
    state: "code point + identity",
    result: "explicit key",
    detail: "Unicode 处理字符与码点，Symbol 处理身份；两者都不是“字符串换个写法”。",
  },
};

export function YdkEs602SyntaxLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("bindings");

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
  const faultIndex = mode === "destructure" ? 1 : mode === "iterator" ? 2 : mode === "unicode" ? 4 : 0;

  function reset() {
    timeline.goToStep(0);
    setMode("bindings");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-02-syntax"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 2
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              ES6 语法地图：从绑定到身份
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换语法样本并沿时间线推进，观察每个简写如何改变绑定、数据形状、迭代顺序、函数上下文、文本解析和键身份。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择语法机制样本</span>
          <select
            aria-label="选择 Block-Scoped Declarations、Spread / Rest、Default Parameter Values、Destructuring、Arrow Functions 或 Unicode 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="bindings">Block-Scoped Declarations · binding</option>
            <option value="destructure">Destructuring · shape</option>
            <option value="iterator">Spread / Rest + for..of · iterator</option>
            <option value="arrow">Arrow Functions · context</option>
            <option value="unicode">Unicode + Symbols · identity</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 2 专属教学时间线，覆盖 Chapter 2: Syntax、Block-Scoped Declarations、Spread / Rest、Default Parameter Values、Destructuring、Object Literal Extensions、Template Literals、Arrow Functions、for..of Loops、Regular Expression Extensions、Number Literal Extensions、Unicode、Symbols。展示块级绑定、解构、默认值、展开与剩余、对象和模板扩展、箭头函数、迭代器、正则、数字字面量、Unicode 与 Symbol，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es602-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es602-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es602-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            bindings → shape → sequence → function → literals → identity
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 2: Syntax · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>语法输入</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先预测绑定、顺序与边界</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>再观察求值结果</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es602-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "destructure" || mode === "iterator" ? C.warning : C.elevated} fillOpacity={mode === "destructure" || mode === "iterator" ? 0.1 : 1} stroke={mode === "destructure" || mode === "iterator" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "destructure" || mode === "iterator" ? C.warning : C.accent}>语义状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>证据：求值顺序与协议</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "bindings" || mode === "arrow" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "bindings" || mode === "arrow" ? "url(#ydk-es602-success-arrow)" : "url(#ydk-es602-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "bindings" || mode === "arrow" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "bindings" || mode === "arrow" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "bindings" || mode === "arrow" ? C.success : C.warning}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>简写不能隐藏边界</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把语法糖与运行时协议分开记录" : isActive ? "当前阶段：沿语法语义证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es602-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-es602-success-arrow)" : "url(#ydk-es602-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "scope" : index === 1 ? "shape" : index === 2 ? "iter" : index === 3 ? "func" : index === 4 ? "text" : "key"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看语义，再看简写</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测绑定、数据形状、迭代协议、求值顺序和身份边界，再推进时间线验证 ES6 语法如何执行。"
          reset={{ label: "重置实验", ariaLabel: "重置 ES6 语法地图实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ES6 语法不是更短的写法集合，而是把作用域、数据形状、迭代、函数上下文和身份协议写得更明确。
      </figcaption>
    </figure>
  );
}
