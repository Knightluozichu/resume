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
  { label: "define", caption: "定义可复用函数并记录函数值" },
  { label: "call", caption: "找到真正执行函数的调用表达式" },
  { label: "form", caption: "识别方法、普通、显式或箭头调用形式" },
  { label: "bind", caption: "按调用规则建立本次 this" },
  { label: "read", caption: "在函数体中读取接收者状态" },
  { label: "release", caption: "返回后结束本次执行上下文" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 定义可复用函数",
    "identify 只保存行为，不在定义时决定 this；同一个函数值可以交给多个对象使用。",
    "输出：function value + reusable behavior",
  ],
  [
    "2 · 找到调用表达式",
    "真正决定 this 的位置是调用语法，而不是函数写在哪里或函数名叫什么。",
    "输出：call expression + receiver candidate",
  ],
  [
    "3 · 识别调用形式",
    "区分 obj.identify()、identify()、identify.call(obj) 与箭头对照，规则入口不同。",
    "输出：invocation form + binding rule",
  ],
  [
    "4 · 按规则建立 this",
    "方法调用通常把 obj 作为接收者；普通调用可能得到 undefined 或全局对象；显式绑定直接指定它。",
    "输出：this binding + receiver",
  ],
  [
    "5 · 函数体读取状态",
    "函数体读取 this.name 时，读取的是本次绑定的接收者状态，而不是函数自身属性。",
    "输出：receiver state + observed value",
  ],
  [
    "6 · 返回并释放上下文",
    "本次执行返回后绑定随调用结束；下一次调用可以用另一种调用形式建立另一份 this。",
    "输出：result + next call ready",
  ],
] as const;

type Mode = "method" | "plain" | "explicit" | "arrow";

export function YdkThis01ThisOrThatLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("method");

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
  const plain = mode === "plain";
  const arrow = mode === "arrow";
  const explicit = mode === "explicit";
  const modeLabel = {
    method: "方法调用",
    plain: "普通调用",
    explicit: "显式绑定",
    arrow: "箭头对照",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("method");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-01-this-or-that"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this 01
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              this 由调用点决定，不是函数的固有属性
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换四种调用样本，逐步观察同一个函数值如何获得不同执行上下文与接收者。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">this 调用样本</span>
          <select
            aria-label="选择 this 调用点样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="method">方法调用 · obj.identify()</option>
            <option value="plain">普通调用 · identify()</option>
            <option value="explicit">显式绑定 · identify.call(obj)</option>
            <option value="arrow">箭头对照 · 捕获外层 this</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 关于 this 第1章专属教学时间线：覆盖 Chapter 1: this Or That?、Why this?、Confusions、What's this?。展示可复用函数、调用点、执行上下文、词法作用域、接收者和 this 绑定规则。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this01-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this01-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            function value → call-site → invocation form → this binding
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 1: this Or That? · Why this? · Confusions · What&apos;s this? · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="150" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={plain || arrow ? C.danger : C.accent}>
            调用合同：{plain ? "普通调用没有 obj 接收者" : arrow ? "箭头对照捕获外层 this" : "调用语法提供本次接收者"}
          </text>

          <rect x="52" y="124" width="364" height="82" rx="10" fill={plain || arrow ? C.danger : C.accent} fillOpacity="0.1" stroke={plain || arrow ? C.danger : C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={plain || arrow ? C.danger : C.accent}>
            {arrow ? "arrow · lexical outer this" : explicit ? "call · explicit receiver" : plain ? "plain · no receiver" : "method · obj receiver"}
          </text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>
            {arrow ? "() => this.name" : explicit ? "identify.call(obj)" : plain ? "identify()" : "obj.identify()"}
          </text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>
            {arrow ? "not a dynamic method binding" : plain ? "strict mode may yield undefined" : "record receiver before entering body"}
          </text>

          <line x1="432" y1="166" x2="500" y2="166" stroke={plain || arrow ? C.danger : C.border} strokeWidth={plain || arrow ? 3 : 2} markerEnd={plain || arrow ? "url(#ydk-this01-fault-arrow)" : "url(#ydk-this01-arrow)"} />
          <rect x="520" y="124" width="328" height="82" rx="10" fill={plain || arrow ? C.danger : C.success} fillOpacity="0.1" stroke={plain || arrow ? C.danger : C.success} strokeWidth="1.5" />
          <text x="684" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={plain || arrow ? C.danger : C.success}>
            {plain ? "binding depends on mode" : arrow ? "outer context" : "this established"}
          </text>
          <text x="684" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>
            {plain ? "undefined / global object" : arrow ? "lexical this" : explicit || mode === "method" ? "obj" : "context"}
          </text>
          <text x="684" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>
            {plain || arrow ? "choose rule before reading name" : "function body can reuse behavior"}
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = (plain || arrow) && index >= 3;
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
                  {failed ? "对照样本：this 不是函数自身，先确认调用形式与接收者，再解释函数体输出" : index === 5 && explicit ? "显式交接：call/apply/bind 直接把接收者写进证据" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {(plain || arrow) && activeIndex >= 3 && (
            <g>
              <path d="M 790 232 C 750 262, 710 294, 668 328" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-this01-fault-arrow)" />
              <rect x="182" y="408" width="536" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="200" y="428" fontSize="11" fontWeight="700" fill={C.danger}>绑定对照：普通调用缺少接收者；箭头函数改走外层词法上下文</text>
            </g>
          )}

          <line x1="76" y1="466" x2="824" y2="466" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this01-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="466" x2={x2} y2="466" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-this01-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = (plain || arrow) && index >= 3;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="482" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="506" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="510" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="510" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="544" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "compare" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="568" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="614" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 identify() 会读到哪个 name，再推进调用形式与 this 绑定证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 this 调用点证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一个函数可以复用于不同对象；真正决定 this 的是调用点和调用形式，而不是函数自身。
      </figcaption>
    </figure>
  );
}
