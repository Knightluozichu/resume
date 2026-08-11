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
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "call", caption: "进入对象方法调用，记录接收者" },
  { label: "dynamic", caption: "普通函数按调用点确定 this" },
  { label: "arrow", caption: "创建箭头函数，不建立自己的 this" },
  { label: "capture", caption: "箭头捕获外层 this 绑定" },
  { label: "later", caption: "异步回调稍后执行，仍读取原接收者" },
  { label: "choose", caption: "判断方法、回调和构造器的适用边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 进入对象方法调用",
    "先记录调用表达式的接收者、函数定义位置和稍后执行的回调，不把它们混为一个状态。",
    "输出：call-site receiver + function value",
  ],
  [
    "2 · 普通函数按调用点绑定",
    "普通函数的 this 由调用方式决定；同一个函数被不同对象调用时，接收者可以变化。",
    "输出：dynamic this + call-site rule",
  ],
  [
    "3 · 创建箭头函数",
    "箭头函数不创建自己的 this，也不适合被当作需要动态接收者的方法或构造器。",
    "输出：arrow function + no own this",
  ],
  [
    "4 · 捕获外层 this",
    "箭头在普通方法内部创建时，捕获创建位置的 this；之后如何调用它不会重新绑定。",
    "输出：lexical this + outer receiver",
  ],
  [
    "5 · 异步回调稍后执行",
    "定时器或事件回调稍后运行，箭头仍能读到原对象；普通函数则需显式 bind 或重新提供接收者。",
    "输出：later callback + stable context",
  ],
  [
    "6 · 选择适用边界",
    "需要动态接收者用普通方法，需要保留外层上下文用箭头；构造器场景不能把箭头当作可 new 的函数。",
    "输出：binding choice + failure boundary",
  ],
] as const;

type Mode = "arrow" | "method" | "detached" | "constructor";

export function YdkScopeAppendixCLexicalThisLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("arrow");

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
  const detached = mode === "detached";
  const constructorMode = mode === "constructor";
  const methodMode = mode === "method";
  const modeLabel = {
    arrow: "箭头回调捕获外层 this",
    method: "普通方法动态接收者",
    detached: "脱离对象调用",
    constructor: "构造器边界",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("arrow");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-appendix-c-lexical-this"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope Appendix C
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              箭头函数如何把外层 this 带进稍后执行的回调
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换箭头、普通方法、脱离调用和构造器样本，逐步观察 this 的绑定规则与适用边界。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">this 绑定样本</span>
          <select
            aria-label="选择词法 this 绑定样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="arrow">箭头回调 · 捕获外层 this</option>
            <option value="method">普通方法 · 动态接收者</option>
            <option value="detached">脱离对象调用 · 接收者丢失</option>
            <option value="constructor">构造器边界 · 箭头不可 new</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS this 词法附录 C 专属教学时间线：覆盖 Appendix C: Lexical-this。展示普通函数、箭头函数、动态 this、外层绑定、调用接收者、异步回调和构造器边界。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-lexical-this-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-lexical-this-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            call-site this → arrow capture → later callback → binding choice
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Appendix C: Lexical-this · ordinary function vs arrow function · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="150" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={detached || constructorMode ? C.danger : C.accent}>
            绑定合同：{detached ? "脱离调用会丢失普通函数的接收者" : constructorMode ? "箭头函数没有构造器内部机制" : "箭头保留外层上下文，普通函数接受调用点"}
          </text>

          <rect x="52" y="124" width="364" height="82" rx="10" fill={detached || constructorMode ? C.danger : C.accent} fillOpacity="0.1" stroke={detached || constructorMode ? C.danger : C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={detached || constructorMode ? C.danger : C.accent}>
            {constructorMode ? "arrow · no [[Construct]]" : methodMode ? "ordinary · dynamic this" : "arrow · lexical this"}
          </text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>
            {detached ? "run() · no obj receiver" : constructorMode ? "new arrow() · TypeError" : methodMode ? "obj.method() · obj" : "setTimeout(() => ...) · obj"}
          </text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>
            {detached ? "first divergence = receiver missing" : constructorMode ? "use class or ordinary constructor" : "record function kind before reading output"}
          </text>

          <line x1="432" y1="166" x2="500" y2="166" stroke={detached || constructorMode ? C.danger : C.border} strokeWidth={detached || constructorMode ? 3 : 2} markerEnd={detached || constructorMode ? "url(#ydk-lexical-this-fault-arrow)" : "url(#ydk-lexical-this-arrow)"} />
          <rect x="520" y="124" width="328" height="82" rx="10" fill={detached || constructorMode ? C.danger : C.success} fillOpacity="0.1" stroke={detached || constructorMode ? C.danger : C.success} strokeWidth="1.5" />
          <text x="684" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={detached || constructorMode ? C.danger : C.success}>
            {detached ? "receiver lost" : constructorMode ? "construction failed" : "context result"}
          </text>
          <text x="684" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>
            {detached ? "undefined / global this" : constructorMode ? "TypeError" : methodMode ? "this = obj" : "this = obj later"}
          </text>
          <text x="684" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>
            {detached || constructorMode ? "choose the correct function kind" : "same binding evidence"}
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = (detached || constructorMode) && index >= 4;
            const tone = failed ? C.danger : selected ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="250" width="840" height="146" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.1 : 1} stroke={tone} strokeWidth={selected || failed ? 2.5 : 1.5} />
                <text x="52" y="280" fontSize="13" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="310" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="340" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="374" fontSize="11" fill={failed ? C.danger : C.secondary}>
                  {failed ? "故障注入：调用方式与函数类型不匹配，先停止并记录 receiver 或 construct 的偏离" : index === 5 && methodMode ? "方法交接：动态接收者是需求，不要用箭头替代普通方法" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {(detached || constructorMode) && activeIndex >= 4 && (
            <g>
              <path d="M 790 232 C 750 262, 710 294, 668 328" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-lexical-this-fault-arrow)" />
              <rect x="182" y="408" width="536" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="200" y="428" fontSize="11" fontWeight="700" fill={C.danger}>边界故障：普通函数需要接收者，箭头函数不能承担构造器职责</text>
            </g>
          )}

          <line x1="76" y1="466" x2="824" y2="466" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-lexical-this-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="466" x2={x2} y2="466" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-lexical-this-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = (detached || constructorMode) && index >= 4;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="482" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="506" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="510" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="510" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="544" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "stop" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="568" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="614" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测回调里的 this 会指向谁，再推进箭头捕获、脱离调用和构造器边界。"
          reset={{ label: "重置实验", ariaLabel: "重置词法 this 证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        箭头函数保留定义位置的 this；普通函数接受调用点的接收者，构造器则需要可构造的函数类型。
      </figcaption>
    </figure>
  );
}
