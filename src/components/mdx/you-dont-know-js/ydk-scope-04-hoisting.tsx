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
  { label: "scan", caption: "扫描当前作用域的函数、var 与重复声明" },
  { label: "function", caption: "先登记函数声明，使函数体在执行前可调用" },
  { label: "var", caption: "只建立 var 绑定，初始化值仍等待执行点" },
  { label: "duplicate", caption: "遇到重复 var 时保持已有绑定，函数声明优先" },
  { label: "execute", caption: "按源码顺序执行赋值，登记值而不是移动源码" },
  { label: "read", caption: "在实际读取点观察 undefined、函数值或最终赋值" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 扫描当前作用域声明",
    "编译器先列出本层的函数声明、var 声明和重复登记，源码不会被物理搬动。",
    "输出：declaration table + source order",
  ],
  [
    "2 · 登记函数声明",
    "函数声明整体可用，函数体和名称在执行阶段开始前已经进入绑定表。",
    "输出：function binding + callable value",
  ],
  [
    "3 · 登记变量绑定",
    "var 先建立绑定，初始化仍留在实际赋值语句的位置，读取时可能暂时得到 undefined。",
    "输出：var binding + uninitialized value",
  ],
  [
    "4 · 处理重复登记",
    "重复 var 不会重新创建另一份绑定；同名函数声明按 Functions First 规则保留优先级。",
    "输出：one binding + precedence rule",
  ],
  [
    "5 · 进入执行阶段赋值",
    "引擎沿源码顺序完成 var 初始化和后续赋值，这解释了提升为何不是源码移动。",
    "输出：assignment event + value",
  ],
  [
    "6 · 按执行点读取",
    "比较读取发生在赋值前还是赋值后，保留绑定状态、执行点和最终结果。",
    "输出：undefined / function / final value",
  ],
] as const;

type Mode = "normal" | "var-before-init" | "duplicate" | "function-first";

export function YdkScope04HoistingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("normal");

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
  const earlyRead = mode === "var-before-init";
  const duplicate = mode === "duplicate";
  const functionFirst = mode === "function-first";
  const modeLabel = {
    normal: "正常登记",
    "var-before-init": "var 初始化前读取",
    duplicate: "重复声明",
    "function-first": "函数优先",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("normal");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-04-hoisting"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope 04
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              提升如何把编译登记和执行赋值分开
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择读取时机与声明冲突样本，逐步观察函数声明、var 绑定和执行阶段如何交接。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">提升样本</span>
          <select
            aria-label="选择提升样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="normal">正常登记 · 先编译后执行</option>
            <option value="var-before-init">var 初始化前读取 · undefined</option>
            <option value="duplicate">重复声明 · 保持单一绑定</option>
            <option value="function-first">函数优先 · 整体可调用</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 提升第4章专属教学时间线：覆盖 Chapter 4 Hoisting、Chicken Or The Egg?、The Compiler Strikes Again、Functions First。展示编译扫描、函数声明登记、var 绑定、重复声明规则、执行赋值和读取时机。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-hoist-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-hoist-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            source order → compile registration → execute assignment → read
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 4: Hoisting · Chicken Or The Egg? · The Compiler Strikes Again · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="152" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={earlyRead || duplicate ? C.danger : C.accent}>
            提升合同：{earlyRead ? "绑定存在，但初始化尚未发生" : duplicate ? "重复登记合并为一个绑定" : "函数与变量先登记，再按源码执行"}
          </text>

          <rect x="52" y="124" width="238" height="82" rx="10" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={C.accent}>编译登记</text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>{functionFirst ? "function named() = callable" : "var answer = binding"}</text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>source stays in original order</text>

          <line x1="308" y1="166" x2="368" y2="166" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-hoist-arrow)" />
          <rect x="386" y="124" width="214" height="82" rx="10" fill={duplicate ? C.warning : C.success} fillOpacity="0.1" stroke={duplicate ? C.warning : C.success} strokeWidth="1.5" />
          <text x="493" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={duplicate ? C.warning : C.success}>{duplicate ? "same binding" : "binding ready"}</text>
          <text x="493" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>{duplicate ? "var + var → one name" : functionFirst ? "function body available" : "answer = undefined"}</text>
          <text x="493" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>{duplicate ? "Functions First if present" : "assignment waits"}</text>

          <line x1="618" y1="166" x2="680" y2="166" stroke={earlyRead ? C.danger : C.border} strokeWidth={earlyRead ? 3 : 2} markerEnd={earlyRead ? "url(#ydk-hoist-fault-arrow)" : "url(#ydk-hoist-arrow)"} />
          <rect x="698" y="124" width="150" height="82" rx="10" fill={earlyRead ? C.danger : C.success} fillOpacity="0.1" stroke={earlyRead ? C.danger : C.success} strokeWidth="1.5" />
          <text x="773" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={earlyRead ? C.danger : C.success}>{earlyRead ? "undefined" : "read result"}</text>
          <text x="773" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>{functionFirst ? "callable" : earlyRead ? "before = 赋值前" : "after = 赋值后"}</text>
          <text x="773" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>{earlyRead ? "not moved source" : "execution point matters"}</text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = earlyRead && index >= 5;
            const tone = failed ? C.danger : selected ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="252" width="840" height="146" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.1 : 1} stroke={tone} strokeWidth={selected || failed ? 2.5 : 1.5} />
                <text x="52" y="282" fontSize="13" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="312" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="342" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="376" fontSize="11" fill={failed ? C.danger : C.secondary}>
                  {failed ? "读取时机反例：记录 first divergence，不能解释成源码已移动" : index === 5 && functionFirst ? "Functions First：先登记的函数声明在执行前可调用" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {earlyRead && activeIndex >= 5 && (
            <g>
              <path d="M 790 236 C 750 266, 710 298, 668 332" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-hoist-fault-arrow)" />
              <rect x="184" y="410" width="532" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="202" y="430" fontSize="11" fontWeight="700" fill={C.danger}>单一反例：赋值尚未发生，绑定存在不等于值已初始化</text>
            </g>
          )}

          <line x1="76" y1="468" x2="824" y2="468" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-hoist-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="468" x2={x2} y2="468" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-hoist-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = earlyRead && index >= 5;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="484" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="508" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="512" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="512" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="546" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "stop" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="570" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="616" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测读取点的值，再比较函数声明、var 绑定和实际赋值顺序。"
          reset={{ label: "重置实验", ariaLabel: "重置提升证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提升是编译阶段登记与执行阶段赋值的分离；理解读取点，才能解释 undefined、函数优先和重复声明。
      </figcaption>
    </figure>
  );
}
