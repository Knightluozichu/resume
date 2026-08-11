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
  { label: "expose", caption: "列出模块需要公开的最小能力与内部状态" },
  { label: "function", caption: "用函数作用域把实现和名称冲突隔离起来" },
  { label: "iife", caption: "把函数声明转为立即执行表达式并隐藏临时绑定" },
  { label: "block", caption: "用 let、const 和 catch 缩短临时值生命周期" },
  { label: "tdz", caption: "在遮蔽场景中检查初始化前访问的暂时性死区" },
  { label: "publish", caption: "只返回必要能力，确认边界外无法读取私有状态" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 识别应隐藏的实现",
    "先列出输入、内部状态和公开 API；任何不需要交给调用者的名称都留在边界内。",
    "输出：minimal public surface",
  ],
  [
    "2 · 用函数建立私有边界",
    "函数作用域包住实现，调用者只能拿到显式返回值，内部名称不会污染外层。",
    "输出：function scope + private state",
  ],
  [
    "3 · 把函数转为 IIFE",
    "立即执行表达式把初始化和临时变量一次性封装，留下可交接的结果而不是声明本身。",
    "输出：IIFE result + closed bindings",
  ],
  [
    "4 · 用块缩短生命周期",
    "块让 let、const 或 catch 变量在使用点结束后离开可见范围，减少旧状态被误用。",
    "输出：block binding + cleanup point",
  ],
  [
    "5 · 检查遮蔽与 TDZ",
    "内层同名 let 或 const 会遮蔽外层；初始化前访问进入暂时性死区，不能读取旧值。",
    "输出：shadowing trace + TDZ error",
  ],
  [
    "6 · 只暴露必要能力",
    "重放正常与边界样本，确认函数和块外都无法越过边界读取私有状态。",
    "输出：public API + boundary sign-off",
  ],
] as const;

type Mode = "function" | "block" | "iife" | "tdz";

export function YdkScope03FunctionVsBlockScopeLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("function");

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
  const blockMode = mode === "block" || mode === "tdz";
  const fault = mode === "tdz";
  const modeLabel = {
    function: "函数边界",
    block: "块边界",
    iife: "IIFE 封装",
    tdz: "TDZ 反例",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("function");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-03-function-vs-block-scope"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope 03
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              函数边界与块边界怎样收紧公开面
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择边界类型，逐步观察函数、IIFE、块和 TDZ 如何改变绑定的生命周期与可见范围。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">边界样本</span>
          <select
            aria-label="选择函数与块作用域样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="function">函数边界 · 私有实现</option>
            <option value="block">块边界 · 临时绑定</option>
            <option value="iife">IIFE 封装 · 立即执行</option>
            <option value="tdz">TDZ 反例 · 初始化前访问</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 函数作用域和块作用域第3章专属教学时间线：覆盖 Chapter 3 Function vs. Block Scope、Scope From Functions、Hiding In Plain Scope、Functions As Scopes、Blocks As Scopes。展示函数边界、IIFE、块变量、遮蔽与暂时性死区。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-fbs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-fbs-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            public surface → function scope → block scope → lifecycle
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 3: Function vs. Block Scope · Scope From Functions · Hiding In Plain Scope · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="150" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={fault ? C.danger : C.accent}>
            边界合同：{fault ? "初始化前访问被阻断" : "私有状态不会越界"}
          </text>

          <rect x="52" y="124" width="364" height="82" rx="10" fill={blockMode ? C.success : C.accent} fillOpacity="0.1" stroke={blockMode ? C.success : C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={blockMode ? C.success : C.accent}>{blockMode ? "block scope" : "function scope"}</text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>{blockMode ? "let / const / catch · 生命周期短" : "private state · 调用者不可见"}</text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>{mode === "iife" ? "IIFE：执行后只留下返回结果" : mode === "tdz" ? "shadowed name · before initialization" : "internal binding · minimal capability"}</text>

          <line x1="432" y1="166" x2="500" y2="166" stroke={fault ? C.danger : C.border} strokeWidth={fault ? 3 : 2} markerEnd={fault ? "url(#ydk-fbs-fault-arrow)" : "url(#ydk-fbs-arrow)"} />
          <rect x="520" y="124" width="328" height="82" rx="10" fill={fault ? C.danger : C.success} fillOpacity="0.1" stroke={fault ? C.danger : C.success} strokeWidth="1.5" />
          <text x="684" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={fault ? C.danger : C.success}>{fault ? "ReferenceError" : "boundary passed"}</text>
          <text x="684" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>{fault ? "TDZ：先初始化，再读取" : "public API only"}</text>
          <text x="684" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>{fault ? "first divergence = read before init" : "hidden names remain owned"}</text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = fault && index >= 4;
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
                  {failed ? "TDZ 注入：停止在初始化前读取，不能把外层旧值当作内层绑定" : index === 5 && mode === "iife" ? "IIFE 结果交接：内部名称已离开公开面" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {fault && activeIndex >= 4 && (
            <g>
              <path d="M 790 232 C 750 262, 710 294, 668 328" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-fbs-fault-arrow)" />
              <rect x="182" y="408" width="536" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="200" y="428" fontSize="11" fontWeight="700" fill={C.danger}>单一反例：记录 TDZ 的 first divergence，不继续传播错误状态</text>
            </g>
          )}

          <line x1="76" y1="466" x2="824" y2="466" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-fbs-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="466" x2={x2} y2="466" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-fbs-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = fault && index >= 4;
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
          caption="先预测变量什么时候离开可见范围，再推进 IIFE、块和 TDZ 样本。"
          reset={{ label: "重置实验", ariaLabel: "重置函数与块作用域证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数作用域负责隐藏实现，块作用域负责收紧生命周期；两者共同把公开 API 和内部状态分开。
      </figcaption>
    </figure>
  );
}
