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
  { label: "parse", caption: "源码先被解析成表达式、语句和控制流结构" },
  { label: "tree", caption: "运算符优先级与结合性决定表达式树" },
  { label: "asi", caption: "受限产生式决定换行是否触发自动分号插入" },
  { label: "errors", caption: "异常改变完成记录并沿控制流传播" },
  { label: "args", caption: "函数参数在调用入口建立绑定与默认值" },
  { label: "finally", caption: "finally 可以覆盖先前的 return 或 throw" },
  { label: "switch", caption: "switch 按匹配结果分派并可能继续贯穿" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 把源码解析为语法结构",
    "表达式产生值，语句组织控制流；先确定语法边界，才能解释后续求值和完成记录。",
    "输出：AST-like structure",
  ],
  [
    "2 · 按优先级建立表达式树",
    "`1 + 2 * 3` 先把乘法放入加法右侧；结合性决定同级运算从哪一边组织。",
    "输出：grouped expression",
  ],
  [
    "3 · 在受限产生式处理换行",
    "return、break、continue 等位置的换行可能改变语法；ASI 不是任意换行都补分号。",
    "输出：statement boundary",
  ],
  [
    "4 · 执行语句并产生完成记录",
    "正常值、return、throw 和 break 都会留下不同完成类型；异常不是普通的字符串结果。",
    "输出：completion record",
  ],
  [
    "5 · 由函数入口绑定参数",
    "调用时按位置建立参数绑定，默认值、剩余参数和 arguments 观察的是同一次入口事件。",
    "输出：parameter bindings",
  ],
  [
    "6 · 进入 finally 修改完成记录",
    "finally 总会执行；若其中再次 return 或 throw，它可能覆盖 try/catch 先前产生的完成记录。",
    "输出：final completion",
  ],
  [
    "7 · 由 switch 分派控制流",
    "switch 先匹配 case，再按 break 或贯穿规则继续执行；分支结构是语句控制流的一部分。",
    "输出：branch + fallthrough",
  ],
] as const;

type Mode = "precedence" | "asi" | "finally" | "args" | "switch";

type ModeInfo = {
  title: string;
  expression: string;
  syntax: string;
  group: string;
  completion: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  precedence: {
    title: "优先级与结合性",
    expression: "1 + 2 * 3",
    syntax: "expression + expression",
    group: "1 + (2 * 3)",
    completion: "value = 7",
    detail: "树的分组先于求值，括号可以显式改变意图。",
  },
  asi: {
    title: "ASI 换行边界",
    expression: "return\\n{ value: 1 }",
    syntax: "return statement + line terminator",
    group: "return; { value: 1 }",
    completion: "value = undefined",
    detail: "return 后换行可能提前结束语句，不能凭缩进猜语法。",
  },
  finally: {
    title: "finally 覆盖结果",
    expression: "try { return 1 } finally { return 2 }",
    syntax: "try statement + finally statement",
    group: "try completion → finally completion",
    completion: "value = 2",
    detail: "finally 的新完成记录覆盖了 try 里的 return。",
  },
  args: {
    title: "函数参数绑定",
    expression: "function f(a = 1, ...rest) {}",
    syntax: "call arguments → parameter list",
    group: "a binding + rest binding",
    completion: "bindings = [1, 2, 3]",
    detail: "参数入口先建立绑定，再进入函数体执行。",
  },
  switch: {
    title: "switch 分派",
    expression: "switch (token) { case \"ok\": ... }",
    syntax: "discriminant + case clauses",
    group: "match → statement list",
    completion: "break = exit switch",
    detail: "没有 break 时会继续贯穿到后续 case。",
  },
};

export function YdkTypes05GrammarLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("precedence");

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
  const faultIndex = mode === "asi" ? 2 : mode === "finally" ? 5 : mode === "switch" ? 6 : mode === "args" ? 4 : 1;

  function reset() {
    timeline.goToStep(0);
    setMode("precedence");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-types-05-grammar"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Types · Chapter 5
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              语法不是表面格式：树、完成记录与控制流
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个语法样本，再沿七步时间线观察分组、换行、异常、参数、finally 和 switch。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择语法与控制流样本</span>
          <select
            aria-label="选择运算符优先级、ASI、finally、函数参数或 switch 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="precedence">运算符优先级 · 1 + 2 * 3</option>
            <option value="asi">ASI 换行 · return 后换行</option>
            <option value="finally">finally 完成值 · 覆盖 return</option>
            <option value="args">函数参数 · 默认值与 rest</option>
            <option value="switch">switch · case 与贯穿</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Chapter 5: Grammar 专属教学时间线，覆盖 Statements & Expressions、Operator Precedence、Automatic Semicolons、Errors、Function Arguments、try..finally、switch。展示语法结构、表达式树、ASI 换行、完成记录、函数参数绑定、finally 覆盖 return 或 throw，以及 switch 分支贯穿。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-types05-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-types05-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-types05-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            source → syntax tree → completion record → control flow
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="190" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>源码</text>
          <text x="50" y="134" fontSize="11" fill={C.primary}>{selected.syntax}</text>
          <text x="50" y="160" fontSize="11" fill={C.secondary}>换行和标点也是证据</text>
          <text x="50" y="182" fontSize="11" fill={C.secondary}>不要只看缩进</text>

          <line x1="232" y1="138" x2="260" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types05-success-arrow)" />

          <rect x="270" y="78" width="194" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="290" y="106" fontSize="13" fontWeight="700" fill={C.accent}>结构</text>
          <text x="290" y="134" fontSize="11" fill={C.primary}>{selected.group}</text>
          <text x="290" y="160" fontSize="11" fill={C.secondary}>优先级 / 产生式</text>
          <text x="290" y="182" fontSize="11" fill={C.secondary}>决定执行组织</text>

          <line x1="476" y1="138" x2="504" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types05-success-arrow)" />

          <rect x="514" y="78" width="174" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="534" y="106" fontSize="13" fontWeight="700" fill={C.accent}>完成记录</text>
          <text x="534" y="134" fontSize="11" fill={C.primary}>{selected.completion}</text>
          <text x="534" y="160" fontSize="11" fill={C.secondary}>return / throw / break</text>
          <text x="534" y="182" fontSize="11" fill={C.secondary}>可能被 finally 改写</text>

          <line x1="700" y1="138" x2="728" y2="138" stroke={mode === "asi" || mode === "finally" || mode === "switch" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "asi" || mode === "finally" || mode === "switch" ? "url(#ydk-types05-warning-arrow)" : "url(#ydk-types05-success-arrow)"} />

          <rect x="738" y="78" width="132" height="120" rx="12" fill={mode === "asi" || mode === "finally" || mode === "switch" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "asi" || mode === "finally" || mode === "switch" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="804" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "asi" || mode === "finally" || mode === "switch" ? C.warning : C.success}>控制流</text>
          <text x="804" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.detail}</text>
          <text x="804" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个偏离</text>
          <text x="804" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>再重放样本</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex && (mode === "asi" || mode === "finally" || mode === "switch");
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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把语法结构与完成记录分开记录" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-types05-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 116 + 96;
            const x2 = 52 + (index + 1) * 116 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="386"
                x2={x2}
                y2="386"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-types05-success-arrow)" : "url(#ydk-types05-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 116;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex && (mode === "asi" || mode === "finally" || mode === "switch");
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="96" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 20} cy="426" r="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 20} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 57} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 48} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 48} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 48} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "parse" : index === 1 ? "tree" : index === 2 ? "ASI" : index === 3 ? "error" : index === 4 ? "args" : index === 5 ? "finally" : "case"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看语法树，再看完成记录</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测语法结构和最终控制流，再推进优先级、ASI、异常、参数、finally 与 switch 的证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 JavaScript 语法与控制流实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        语法的关键是把源码、树、完成记录和控制流分层观察；缩进和最终输出都不能替代解析证据。
      </figcaption>
    </figure>
  );
}
