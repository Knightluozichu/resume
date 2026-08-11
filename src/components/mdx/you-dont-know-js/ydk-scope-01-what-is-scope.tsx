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
  { label: "tokens", caption: "把源码拆成可供编译器观察的标识符与表达式" },
  { label: "declare", caption: "在对应作用域登记声明，建立名称到绑定的关系" },
  { label: "execute", caption: "引擎执行赋值或取值，决定查询方向" },
  { label: "lhs", caption: "LHS 查询寻找写入目标，未命中时判断严格模式边界" },
  { label: "rhs", caption: "RHS 查询读取当前绑定，并沿作用域链向外查找" },
  { label: "result", caption: "返回值或抛出 ReferenceError，保留首个偏离点" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 分词并形成语法结构",
    "识别声明、赋值和标识符使用；这一步还没有读取变量值。",
    "输出：token stream + 语法结构",
  ],
  [
    "2 · 编译器登记声明",
    "把 name 登记到函数、块或全局作用域，绑定所有权先于执行发生。",
    "输出：binding table + owner",
  ],
  [
    "3 · 引擎执行赋值或取值",
    "执行阶段才沿查询方向寻找目标或读取值，不能用语法外观代替调用轨迹。",
    "输出：查询类型 + call-site",
  ],
  [
    "4 · LHS 查询写入目标",
    "赋值左侧寻找要写入的绑定；严格模式下未登记的目标会产生错误。",
    "输出：write target 或 ReferenceError",
  ],
  [
    "5 · RHS 查询读取值",
    "读取右侧标识符，当前作用域未命中就向外层查找，直到全局边界。",
    "输出：resolved value + lookup path",
  ],
  [
    "6 · 产生结果或错误",
    "正常样本返回值，边界样本暴露未绑定名称；记录第一个不一致而不是只看最后输出。",
    "输出：value / ReferenceError + first divergence",
  ],
] as const;

type Sample = "normal" | "nested" | "unbound" | "recovery";

export function YdkScope01WhatIsScopeLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<Sample>("normal");
  const [strictMode, setStrictMode] = useState(false);

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
  const unbound = sample === "unbound";
  const nested = sample === "nested";
  const sampleLabel = {
    normal: "正常样本",
    nested: "嵌套样本",
    unbound: "未绑定样本",
    recovery: "恢复样本",
  }[sample];

  function reset() {
    timeline.goToStep(0);
    setSample("normal");
    setStrictMode(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-01-what-is-scope"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope 01
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一个标识符如何从声明走到查询结果
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择样本并推进编译到执行的六阶段链；未绑定开关会让 LHS/RHS 的错误边界显形。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">查询样本</span>
            <select
              aria-label="选择作用域查询样本"
              value={sample}
              onChange={(event) => setSample(event.target.value as Sample)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="normal">正常样本 · 同一作用域</option>
              <option value="nested">嵌套样本 · 向外查找</option>
              <option value="unbound">未绑定样本 · 查询失败</option>
              <option value="recovery">恢复样本 · 重新登记后执行</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={strictMode}
              onChange={(event) => setStrictMode(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">严格模式</strong>
              <br />
              未登记的 LHS 目标直接报错
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 作用域第1章专属教学时间线：展示源码分词、声明登记、引擎执行、LHS 写入、RHS 读取、作用域链查找和结果错误七个关系。支持正常、嵌套、未绑定、恢复样本，严格模式开关，播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-scope-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-scope-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            tokens → declarations → LHS / RHS → scope chain → result
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            当前样本：{sampleLabel} · {strictMode ? "strict" : "非 strict"} · {unbound ? "可能抛出 ReferenceError" : "预期可解析"}
          </text>

          <rect x="30" y="78" width="840" height="136" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={unbound && activeIndex >= 3 ? C.danger : C.accent}>
            查询上下文：{unbound && activeIndex >= 3 ? "未绑定名称进入错误边界" : "binding table 可追踪"}
          </text>

          <rect x="52" y="124" width="238" height="68" rx="10" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
          <text x="72" y="148" fontSize="12" fontWeight="700" fill={C.accent}>当前作用域</text>
          <text x="72" y="172" fontSize="12" fill={C.primary}>{nested ? "inner: x = 2" : unbound ? "inner: missing" : "local: x = 2"}</text>

          <line x1="302" y1="158" x2="354" y2="158" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-scope-arrow)" />
          <rect x="370" y="124" width="238" height="68" rx="10" fill={nested ? C.success : C.elevated} fillOpacity={nested ? 0.12 : 1} stroke={nested ? C.success : C.border} strokeWidth="1.5" />
          <text x="390" y="148" fontSize="12" fontWeight="700" fill={nested ? C.success : C.primary}>外层作用域</text>
          <text x="390" y="172" fontSize="12" fill={C.primary}>{nested ? "outer: x = 1" : "outer: base = 1"}</text>

          <line x1="620" y1="158" x2="672" y2="158" stroke={unbound ? C.danger : C.border} strokeWidth={unbound ? 3 : 2} markerEnd={unbound ? "url(#ydk-scope-fault-arrow)" : "url(#ydk-scope-arrow)"} />
          <rect x="688" y="124" width="160" height="68" rx="10" fill={unbound ? C.danger : C.success} fillOpacity="0.1" stroke={unbound ? C.danger : C.success} strokeWidth="1.5" />
          <text x="768" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill={unbound ? C.danger : C.success}>{unbound ? "ReferenceError" : "resolved"}</text>
          <text x="768" y="172" textAnchor="middle" fontSize="11" fill={C.secondary}>{unbound ? "stop at first divergence" : "value = 2"}</text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = unbound && index >= 4;
            const tone = failed ? C.danger : selected ? C.accent : index === 4 ? C.success : C.border;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="236" width="840" height="146" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.1 : 1} stroke={tone} strokeWidth={selected || failed ? 2.5 : 1.5} />
                <text x="52" y="266" fontSize="13" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="296" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="326" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="360" fontSize="11" fill={failed ? C.danger : C.secondary}>
                  {failed ? "故障注入：查询停止，先记录缺失名称和作用域边界" : index === 5 && sample === "recovery" ? "恢复样本：重新登记 binding 后用同一输入重放" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {unbound && activeIndex >= 4 && (
            <g>
              <path d="M 786 218 C 748 248, 712 280, 674 312" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-scope-fault-arrow)" />
              <rect x="194" y="394" width="512" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="212" y="414" fontSize="11" fontWeight="700" fill={C.danger}>RHS 未命中：记录 first divergence，不能把未定义当成普通值</text>
            </g>
          )}

          <line x1="76" y1="454" x2="824" y2="454" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-scope-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="454" x2={x2} y2="454" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-scope-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = unbound && index >= 4;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="470" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="494" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="498" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="532" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "stop" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="556" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="606" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 LHS 或 RHS 的查找路径，再推进嵌套与未绑定样本。"
          reset={{ label: "重置实验", ariaLabel: "重置作用域查询证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作用域不是变量盒子，而是管理绑定的规则；只有沿声明、查询方向和作用域链追踪，才能解释值或错误从哪里产生。
      </figcaption>
    </figure>
  );
}
