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
  { label: "enter", caption: "进入 read 函数，准备解析 value" },
  { label: "miss", caption: "当前函数没有 value，记录一次未命中" },
  { label: "caller", caption: "观察 caller 帧是否拥有同名绑定" },
  { label: "climb", caption: "沿运行时调用栈向调用者环境检查" },
  { label: "stop", caption: "动态模型在最近绑定处停止查找" },
  { label: "compare", caption: "与 JavaScript 按定义位置查找的结果对照" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 进入 read 函数",
    "read 执行时需要解析 value；先把函数帧、调用者和定义位置分开记录。",
    "输出：read frame + lookup request",
  ],
  [
    "2 · 当前环境未命中",
    "read 自身没有 value，动态模型会继续看运行时调用栈；词法模型则回到定义环境。",
    "输出：local miss + lookup rule",
  ],
  [
    "3 · 检查 caller 帧",
    "caller 创建了同名 value；它能影响假设的动态查找，却不改变 read 的词法绑定。",
    "输出：caller binding + competing value",
  ],
  [
    "4 · 沿调用栈向上",
    "动态作用域按谁调用谁向上检查；这正是它与源码嵌套关系的差异。",
    "输出：runtime stack path",
  ],
  [
    "5 · 在最近绑定处停止",
    "动态模型会在 caller 的 value 停止；实际 JavaScript 不采用这条变量查找路径。",
    "输出：dynamic result = caller",
  ],
  [
    "6 · 对照词法结果",
    "JavaScript 按 read 定义时的环境解析 value，所以示例仍得到 global；this 则另按调用点决定。",
    "输出：lexical result + call-site note",
  ],
] as const;

type Mode = "lexical" | "dynamic" | "caller" | "this";

export function YdkScopeAppendixADynamicScopeLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("lexical");

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
  const dynamicMode = mode === "dynamic";
  const callerMode = mode === "caller";
  const thisMode = mode === "this";
  const modeLabel = {
    lexical: "JavaScript 词法作用域",
    dynamic: "假设动态作用域",
    caller: "更换调用者",
    this: "this 调用点对照",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("lexical");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-appendix-a-dynamic-scope"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope Appendix A
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              运行时调用栈与源码嵌套不是同一条查找路径
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换词法、动态和调用点样本，逐步观察同名 value 在不同查找规则下为何得到不同结论。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">作用域对照样本</span>
          <select
            aria-label="选择动态作用域与词法作用域样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="lexical">JavaScript 词法作用域 · global</option>
            <option value="dynamic">假设动态作用域 · caller</option>
            <option value="caller">更换调用者 · 运行时路径变化</option>
            <option value="this">this 调用点 · 接收者变化</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 动态作用域附录 A 专属教学时间线：覆盖 Appendix A: Dynamic Scope。展示函数帧、当前环境未命中、调用者环境、运行时调用栈、最近动态绑定、JavaScript 词法绑定和 this 调用点。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-dynamic-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-dynamic-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            read(value) → local miss → caller frame → rule comparison
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Appendix A: Dynamic Scope · lexical vs dynamic lookup · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="150" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={dynamicMode ? C.danger : C.accent}>
            查找合同：{dynamicMode ? "这是对比用的假设模型，不是 JavaScript 的实际规则" : "先区分定义位置、调用位置与接收者"}
          </text>

          <rect x="52" y="124" width="364" height="82" rx="10" fill={dynamicMode ? C.danger : C.accent} fillOpacity="0.1" stroke={dynamicMode ? C.danger : C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={dynamicMode ? C.danger : C.accent}>
            {dynamicMode ? "dynamic lookup" : thisMode ? "this · call-site receiver" : "lexical binding"}
          </text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>
            {dynamicMode ? "read → caller.value" : thisMode ? "receiver follows the call expression" : "read → definition environment"}
          </text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>
            {callerMode ? "caller changed · runtime path is different" : dynamicMode ? "nearest runtime binding wins" : "same source definition · value stays global"}
          </text>

          <line x1="432" y1="166" x2="500" y2="166" stroke={dynamicMode ? C.danger : C.border} strokeWidth={dynamicMode ? 3 : 2} markerEnd={dynamicMode ? "url(#ydk-dynamic-fault-arrow)" : "url(#ydk-dynamic-arrow)"} />
          <rect x="520" y="124" width="328" height="82" rx="10" fill={dynamicMode ? C.danger : C.success} fillOpacity="0.1" stroke={dynamicMode ? C.danger : C.success} strokeWidth="1.5" />
          <text x="684" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={dynamicMode ? C.danger : C.success}>
            {dynamicMode ? "hypothetical result" : thisMode ? "receiver selected" : "JavaScript result"}
          </text>
          <text x="684" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>
            {dynamicMode ? "caller" : thisMode ? "this is not lexical value lookup" : callerMode ? "still global for read()" : "global"}
          </text>
          <text x="684" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>
            {dynamicMode ? "use only as a contrast model" : "record rule before reading output"}
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = dynamicMode && index >= 3;
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
                  {failed ? "对照模式：动态查找会命中 caller，但 JavaScript 变量仍按定义环境解析" : index === 5 && thisMode ? "this 由调用表达式的接收者决定，不要把它当作词法自由变量" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {dynamicMode && activeIndex >= 3 && (
            <g>
              <path d="M 790 232 C 750 262, 710 294, 668 328" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-dynamic-fault-arrow)" />
              <rect x="182" y="408" width="536" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="200" y="428" fontSize="11" fontWeight="700" fill={C.danger}>反例注入：假设动态查找命中 caller；回到词法规则才得到 JavaScript 的 global</text>
            </g>
          )}

          <line x1="76" y1="466" x2="824" y2="466" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-dynamic-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="466" x2={x2} y2="466" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-dynamic-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = dynamicMode && index >= 3;
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
          caption="先预测 read 会拿到 global 还是 caller，再推进动态模型与 this 调用点对照。"
          reset={{ label: "重置实验", ariaLabel: "重置动态作用域证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动态作用域是按运行时调用链查找名称的对照模型；JavaScript 的变量仍按词法定义位置解析，this 则另看调用点。
      </figcaption>
    </figure>
  );
}
