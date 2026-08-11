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
  { label: "scope", caption: "先沿作用域链定位名称与闭包状态" },
  { label: "this", caption: "再从调用形式解释 this 与原型接收者" },
  { label: "types", caption: "把值、类型、语法和转换规则分开验证" },
  { label: "async", caption: "沿任务队列观察时间顺序与资源边界" },
  { label: "es6", caption: "辨认新语法、新 API 与版本兼容条件" },
  { label: "synthesis", caption: "用同一段程序贯通六册机制证据" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · Scope & Closures",
    "先追踪名称解析、词法环境和闭包持有的状态，区分同名绑定与共享数据。",
    "证据：lookup + lifetime",
  ],
  [
    "2 · this & Object Prototypes",
    "再记录调用点、接收者和原型查找，分开解释绑定规则与委托关系。",
    "证据：receiver + lookup",
  ],
  [
    "3 · Types & Grammar",
    "把值、类型、语法和隐式转换拆开，避免用一个输出替代多层语义。",
    "证据：value + rule",
  ],
  [
    "4 · Async & Performance",
    "观察任务何时排队、何时执行、谁持有资源，再谈性能数字和并发顺序。",
    "证据：queue + cost",
  ],
  [
    "5 · ES6 & Beyond",
    "用版本、转译和宿主条件解释新能力，区分语言语义与环境可用性。",
    "证据：version + host",
  ],
  [
    "6 · 贯通六册",
    "让同一段程序经过六层观察，形成能预测、故障注入、恢复和重放的机制地图。",
    "证据：replayable model",
  ],
] as const;

type Mode = "scope" | "this" | "types" | "async" | "es6";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  scope: {
    title: "作用域与闭包",
    input: "makeCounter() → next()",
    state: "lexical environment",
    result: "private state",
    detail: "闭包保留的是词法环境；两个计数器应拥有独立绑定，不能把名字当成状态所有权。",
  },
  this: {
    title: "this 与原型",
    input: "obj.read() / read.call(obj)",
    state: "receiver + prototype",
    result: "call-site binding",
    detail: "调用形式决定普通函数的 this，属性缺失时才沿原型查找；绑定与委托是两条证据。",
  },
  types: {
    title: "类型与语法",
    input: "1 + \"2\" / Number(\"2\")",
    state: "number + string",
    result: "explicit rule",
    detail: "先记录类型和语法规则，再判断转换；最终输出不能遮蔽中间值的差异。",
  },
  async: {
    title: "异步与性能",
    input: "queueMicrotask(() => report())",
    state: "sync → microtask",
    result: "ordered work",
    detail: "先解释何时发生，再测量快慢；调度顺序、取消和清理比单次数字更重要。",
  },
  es6: {
    title: "ES6 及以后",
    input: "const / Promise / module",
    state: "language + host",
    result: "supported boundary",
    detail: "新语法和 API 需要版本、转译和宿主条件；可编译不等于运行时契约成立。",
  },
};

export function YdkUp03IntoYdkjsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("scope");

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
  const faultIndex = mode === "async" ? 3 : mode === "es6" ? 4 : mode === "this" ? 1 : 2;

  function reset() {
    timeline.goToStep(0);
    setMode("scope");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-up-03-into-ydkjs"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Up &amp; Going · Chapter 3
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              YDKJS 机制地图：从作用域到语言演进
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换样本并沿时间线推进，把六册看成同一条证据链：名称、接收者、类型、队列、版本和可重放的综合模型。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择六册机制样本</span>
          <select
            aria-label="选择 Scope & Closures、this & Object Prototypes、Types & Grammar、Async & Performance 或 ES6 & Beyond 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="scope">Scope &amp; Closures · lookup</option>
            <option value="this">this &amp; Object Prototypes · receiver</option>
            <option value="types">Types &amp; Grammar · conversion</option>
            <option value="async">Async &amp; Performance · queue</option>
            <option value="es6">ES6 &amp; Beyond · boundary</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Up & Going Chapter 3 专属教学时间线，覆盖 Chapter 3: Into YDKJS、Scope & Closures、this & Object Prototypes、Types & Grammar、Async & Performance、ES6 & Beyond。展示作用域与闭包、this 与原型、类型与语法、异步与性能、ES6 及以后和六册综合模型，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-up03-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-up03-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-up03-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            scope → this → types → async → es6 → synthesis
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 3: Into YDKJS · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>程序样本</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先预测名称、接收者与队列</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>再记录跨册证据</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-up03-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "this" || mode === "async" ? C.warning : C.elevated} fillOpacity={mode === "this" || mode === "async" ? 0.1 : 1} stroke={mode === "this" || mode === "async" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "this" || mode === "async" ? C.warning : C.accent}>运行时轨迹</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>证据所有权：{activeStep.caption}</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "scope" || mode === "es6" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "scope" || mode === "es6" ? "url(#ydk-up03-success-arrow)" : "url(#ydk-up03-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "scope" || mode === "es6" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "scope" || mode === "es6" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "scope" || mode === "es6" ? C.success : C.warning}>综合结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>不要用单次输出替代模型</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把作用域、队列与版本分开记录" : isActive ? "当前阶段：沿六册机制证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-up03-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-up03-success-arrow)" : "url(#ydk-up03-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "lookup" : index === 1 ? "receiver" : index === 2 ? "rule" : index === 3 ? "queue" : index === 4 ? "host" : "replay"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先建立模型，再测量结果</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测名称、接收者、类型、队列和版本边界，再推进时间线验证六册机制如何互相连接。"
          reset={{ label: "重置实验", ariaLabel: "重置深入 YDKJS 机制地图实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入 YDKJS 不是收集技巧黑名单，而是把六册中的作用域、对象、类型、异步和语言演进放进一张可重放的机制地图。
      </figcaption>
    </figure>
  );
}
