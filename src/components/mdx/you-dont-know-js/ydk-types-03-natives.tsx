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
  { label: "convert", caption: "原生函数调用可以把输入转换成原始值" },
  { label: "class", caption: "运行时分类描述当前值，不等于包装对象" },
  { label: "box", caption: "原始值访问属性时临时获得对象行为" },
  { label: "lookup", caption: "方法沿临时对象的原型链查找" },
  { label: "unbox", caption: "valueOf 或显式转换可以取回原始值" },
  { label: "construct", caption: "带 new 调用原生函数会留下包装对象" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 取得原始值",
    "String(value)、Number(value) 和 Boolean(value) 作为普通调用时主要承担转换职责，结果仍是原始值。",
    "输出：primitive value",
  ],
  [
    "2 · 观察内部分类",
    "原始字符串与 new String 产生的包装对象不是同一种运行时形状；typeof 与 valueOf 要分别记录。",
    "输出：value + runtime class",
  ],
  [
    "3 · 属性访问触发装箱",
    "primitive.length 或 primitive.toUpperCase() 可以工作，是因为运行时提供了短暂的包装对象语义。",
    "输出：temporary wrapper",
  ],
  [
    "4 · 在原型上解析方法",
    "方法通常来自 String.prototype、Number.prototype 或 Boolean.prototype，而不是每个原始值都保存一份。",
    "输出：prototype method",
  ],
  [
    "5 · 需要时拆箱",
    "valueOf() 或显式 String、Number 调用把包装对象转换回可比较、可传递的原始值。",
    "输出：primitive again",
  ],
  [
    "6 · 区分构造器路径",
    "new String(value) 会创建包装对象；长期保存它会引入身份和比较差异，通常不如保存原始值清晰。",
    "输出：wrapper identity",
  ],
] as const;

type Mode = "convert" | "string" | "number" | "construct";

type ModeInfo = {
  title: string;
  expression: string;
  source: string;
  result: string;
  lookup: string;
  check: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  convert: {
    title: "普通转换",
    expression: "String(42)",
    source: "number primitive",
    result: "&quot;42&quot; · typeof = string",
    lookup: "无需持久 wrapper",
    check: "result === &quot;42&quot;",
    detail: "普通调用优先理解为转换，不会留下包装对象。",
  },
  string: {
    title: "原始字符串访问方法",
    expression: "&quot;hello&quot;.toUpperCase()",
    source: "string primitive",
    result: "&quot;HELLO&quot; · 原字符串不变",
    lookup: "String.prototype.toUpperCase",
    check: "valueOf() → &quot;hello&quot;",
    detail: "属性访问的对象行为是短暂的，不等于变量变成对象。",
  },
  number: {
    title: "数字包装拆箱",
    expression: "Number(&quot;3.14&quot;)",
    source: "string input",
    result: "3.14 · typeof = number",
    lookup: "Number.prototype.valueOf",
    check: "Object.is(value, 3.14)",
    detail: "转换调用返回原始数字；valueOf 用于从包装对象取回它。",
  },
  construct: {
    title: "构造器路径",
    expression: "new String(&quot;hello&quot;)",
    source: "constructor call",
    result: "object · identity retained",
    lookup: "String.prototype → valueOf",
    check: "boxed.valueOf() === &quot;hello&quot;",
    detail: "new 留下包装对象，比较和属性身份因此不同。",
  },
};

export function YdkTypes03NativesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("convert");

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
  const faultIndex = mode === "construct" ? 5 : mode === "string" ? 2 : 0;

  function reset() {
    timeline.goToStep(0);
    setMode("convert");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-types-03-natives"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Types · Chapter 3
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              原生函数：转换值、临时装箱与构造器
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个原生函数样本，再沿六步时间线追踪原始值、原型方法、valueOf 和 new 的差异。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择原生函数样本</span>
          <select
            aria-label="选择普通转换、原始字符串访问、数字包装拆箱或构造器样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="convert">普通转换 · String(42)</option>
            <option value="string">原始字符串访问 · toUpperCase</option>
            <option value="number">数字包装拆箱 · Number(&quot;3.14&quot;)</option>
            <option value="construct">构造器路径 · new String(&quot;hello&quot;)</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Chapter 3: Natives 专属教学时间线，覆盖 Internal [[Class]]、Boxing Wrappers、Unboxing、Natives as Constructors。展示 String、Number、Boolean 的转换调用、临时装箱、原型方法查找、valueOf 拆箱和 new 构造器留下的包装对象。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-types03-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-types03-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-types03-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            native call → primitive / temporary box → prototype → unbox
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="190" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入</text>
          <text x="50" y="134" fontSize="12" fill={C.primary}>{selected.source}</text>
          <text x="50" y="160" fontSize="11" fill={C.secondary}>原生函数收到值</text>
          <text x="50" y="182" fontSize="11" fill={mode === "construct" ? C.warning : C.secondary}>{mode === "construct" ? "new：保留对象身份" : "普通调用：先看转换"}</text>

          <line x1="232" y1="138" x2="260" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types03-success-arrow)" />

          <rect x="270" y="78" width="194" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="290" y="106" fontSize="13" fontWeight="700" fill={C.accent}>结果值</text>
          <text x="290" y="134" fontSize="12" fill={C.primary}>{selected.result}</text>
          <text x="290" y="160" fontSize="11" fill={C.secondary}>先区分原始值和对象</text>
          <text x="290" y="182" fontSize="11" fill={C.secondary}>typeof 只是第一证据</text>

          <line x1="476" y1="138" x2="504" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types03-success-arrow)" />

          <rect x="514" y="78" width="174" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="534" y="106" fontSize="13" fontWeight="700" fill={C.accent}>方法来源</text>
          <text x="534" y="134" fontSize="11" fill={C.primary}>{selected.lookup}</text>
          <text x="534" y="160" fontSize="11" fill={C.secondary}>临时盒或持久盒</text>
          <text x="534" y="182" fontSize="11" fill={C.secondary}>决定身份是否留下</text>

          <line x1="700" y1="138" x2="728" y2="138" stroke={mode === "construct" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "construct" ? "url(#ydk-types03-warning-arrow)" : "url(#ydk-types03-success-arrow)"} />

          <rect x="738" y="78" width="132" height="120" rx="12" fill={mode === "construct" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "construct" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="804" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "construct" ? C.warning : C.success}>断言</text>
          <text x="804" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.check}</text>
          <text x="804" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>转换与构造分开</text>
          <text x="804" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex && (mode === "string" || mode === "construct");
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 4 ? C.success : C.border;
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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：比较临时装箱与 new 后身份的差异" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="76" y1="386" x2="824" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-types03-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="386"
                x2={x2}
                y2="386"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-types03-success-arrow)" : "url(#ydk-types03-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex && (mode === "string" || mode === "construct");
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="110" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 55} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "call" : index === 1 ? "class" : index === 2 ? "box" : index === 3 ? "lookup" : index === 4 ? "unbox" : "new"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先区分调用方式，再判断对象身份</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测原生函数的返回形状，再推进临时装箱、原型查找、valueOf 拆箱和 new 构造器证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 JavaScript 原生函数实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原生函数既能转换值也能构造包装对象；属性访问的临时装箱不等于变量永久变成对象。
      </figcaption>
    </figure>
  );
}
