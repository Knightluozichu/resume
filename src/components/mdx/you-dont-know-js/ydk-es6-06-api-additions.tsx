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
  { label: "array", caption: "让可迭代输入变成数组" },
  { label: "object", caption: "把属性复制成明确的新对象" },
  { label: "math", caption: "用截断表达数值意图" },
  { label: "number", caption: "区分 NaN 判断与全局转换" },
  { label: "string", caption: "按 Unicode 码点迭代字符串" },
  { label: "boundary", caption: "回归边界并锁定旧写法缺口" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · Array",
    "Array.from 把可迭代对象或类数组输入转换成真正的数组，并允许映射每一项。",
    "证据：iterable + length",
  ],
  [
    "2 · Object",
    "Object.assign 把可枚举自有属性复制到目标对象；复制层级和目标所有权要单独记录。",
    "证据：own keys + target",
  ],
  [
    "3 · Math",
    "Math.trunc 只移除小数部分，不等价于向下取整；负数边界必须进入测试。",
    "证据：sign + integer part",
  ],
  [
    "4 · Number",
    "Number.isNaN 只接受真正的 NaN，不会先把字符串强制转换成数字。",
    "证据：type + numeric state",
  ],
  [
    "5 · String",
    "字符串迭代按 Unicode 码点推进，不能用 length 或下标假设每个字符都是一个 UTF-16 单元。",
    "证据：code point + unit",
  ],
  [
    "6 · 边界回归",
    "把旧写法、精确 API 和边界输入并排运行，证明语义差异而不只比较成功样本。",
    "证据：before + after + boundary",
  ],
] as const;

type Mode = "array" | "object" | "numeric" | "unicode";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  array: {
    title: "可迭代输入",
    input: "Array.from('A😀')",
    state: "iterable → array",
    result: "[A, 😀]",
    detail: "映射输入时每一项都经过同一回调，Unicode 码点不会被半个代理项切开。",
  },
  object: {
    title: "浅复制",
    input: "Object.assign({}, source)",
    state: "own enumerable keys",
    result: "new target",
    detail: "只复制一层可枚举自有属性；嵌套对象仍与源对象共享引用。",
  },
  numeric: {
    title: "数值判断",
    input: "Number.isNaN(value) + Math.trunc(value)",
    state: "type + sign",
    result: "explicit intent",
    detail: "先判断类型和值，再选择截断或其他舍入语义，避免全局函数的隐式转换。",
  },
  unicode: {
    title: "Unicode 迭代",
    input: "[...text]",
    state: "code point sequence",
    result: "stable units",
    detail: "展开字符串使用迭代协议，适合按用户可见字符近似处理 Unicode 样本。",
  },
};

export function YdkEs606ApiAdditionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("array");

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
  const boundaryIndex = mode === "array" ? 0 : mode === "object" ? 1 : mode === "numeric" ? 3 : 4;

  function reset() {
    timeline.goToStep(0);
    setMode("array");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-06-api-additions"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 6
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              新增 API：让语义和边界变得可见
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换输入样本，沿时间线观察 Array、Object、Math、Number 和 String 的新增能力如何收紧旧写法的语义缺口。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 API 样本</span>
          <select
            aria-label="选择 Array、Object、Math、Number 或 String 新增 API 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="array">Array · iterable input</option>
            <option value="object">Object · shallow copy</option>
            <option value="numeric">Math + Number · numeric boundary</option>
            <option value="unicode">String · Unicode iteration</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 6 专属 API 时间线，覆盖 Chapter 6: API Additions、Array、Object、Math、Number、String。展示 Array.from、Object.assign、Math.trunc、Number.isNaN、Unicode 字符串迭代和边界回归，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es606-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es606-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es606-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            input → exact API → explicit semantics → boundary regression
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 6: API Additions · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="124" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入样本</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>先预测类型、单位与边界</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>再对照旧写法的缺口</text>

          <line x1="294" y1="140" x2="326" y2="140" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es606-success-arrow)" />

          <rect x="336" y="78" width="252" height="124" rx="12" fill={mode === "numeric" || mode === "unicode" ? C.warning : C.elevated} fillOpacity={mode === "numeric" || mode === "unicode" ? 0.1 : 1} stroke={mode === "numeric" || mode === "unicode" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "numeric" || mode === "unicode" ? C.warning : C.accent}>语义契约</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>证据：类型、单位、顺序</text>

          <line x1="600" y1="140" x2="632" y2="140" stroke={mode === "numeric" || mode === "unicode" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "numeric" || mode === "unicode" ? "url(#ydk-es606-warning-arrow)" : "url(#ydk-es606-success-arrow)"} />

          <rect x="642" y="78" width="228" height="124" rx="12" fill={mode === "numeric" || mode === "unicode" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "numeric" || mode === "unicode" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "numeric" || mode === "unicode" ? C.warning : C.success}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>语义差异必须可复现</text>

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
                <text x="52" y="322" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把转换、复制和迭代单位分开记录" : isActive ? "当前阶段：沿精确 API 证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="382" x2="848" y2="382" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es606-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-es606-success-arrow)" : "url(#ydk-es606-arrow)"}
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
                <text x={x + 52} y="502" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "from" : index === 1 ? "assign" : index === 2 ? "trunc" : index === 3 ? "NaN" : index === 4 ? "unicode" : "regress"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先解释意图，再看输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测转换、复制、数值和 Unicode 的单位，再推进时间线验证新增 API 如何把边界语义写清楚。"
          reset={{ label: "重置实验", ariaLabel: "重置新增 API 实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        新增 API 的价值不是名字更多，而是让输入类型、复制层级、数值意图和 Unicode 单位不再靠猜。
      </figcaption>
    </figure>
  );
}
