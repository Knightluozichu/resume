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
  { label: "write", caption: "冻结函数的源码位置，记录 name 出现在哪个作用域" },
  { label: "bind", caption: "按 Lex-time 规则为每层登记词法绑定" },
  { label: "bubble", caption: "把内层函数包在声明时可见的 scope bubble 中" },
  { label: "resolve", caption: "调用时沿源码形成的作用域链解析引用" },
  { label: "cheat", caption: "注入 eval 或 with，观察运行时改写查找环境" },
  { label: "verify", caption: "恢复纯词法路径，核对静态分析和重放证据" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 冻结源码位置",
    "先看函数写在哪里，而不是先看它从哪里被调用；源码坐标决定可见的外层环境。",
    "输出：source position + outer scope",
  ],
  [
    "2 · 建立 Lex-time 绑定",
    "编译阶段为每一层登记名称，形成可追踪的 binding table 与 owner。",
    "输出：lexical bindings + owner",
  ],
  [
    "3 · 形成 scope bubble",
    "函数携带声明时的词法环境；调用者只能改变调用点，不能替换这只气泡。",
    "输出：bubble boundary + lookup path",
  ],
  [
    "4 · 按词法链解析",
    "执行时从当前层向外查找，首个命中决定读取值，调用位置不会重排这条链。",
    "输出：resolved value + first hit",
  ],
  [
    "5 · 注入运行时作弊",
    "eval 或 with 让名称解析依赖运行时字符串或对象属性，静态工具无法稳定预测。",
    "输出：dynamic lookup + analysis boundary",
  ],
  [
    "6 · 恢复可分析性",
    "移除作弊入口，用同一输入重放并确认词法绑定、查找路径和优化假设重新稳定。",
    "输出：static evidence + recovery sign-off",
  ],
] as const;

type Mode = "lexical" | "call-site" | "eval" | "with";

export function YdkScope02LexicalScopeLab() {
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
  const cheating = mode === "eval" || mode === "with";
  const callSiteTrap = mode === "call-site";
  const modeLabel = {
    lexical: "纯词法路径",
    "call-site": "调用位置假设",
    eval: "eval 注入",
    with: "with 注入",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("lexical");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-02-lexical-scope"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope 02
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              书写位置如何固定 scope bubble
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择调用位置假设或运行时作弊入口，逐步比较纯词法查找与动态环境的证据差异。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">查找模式</span>
          <select
            aria-label="选择词法作用域查找模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="lexical">纯词法路径 · 按源码位置</option>
            <option value="call-site">调用位置假设 · 错误模型</option>
            <option value="eval">eval 注入 · 动态名称</option>
            <option value="with">with 注入 · 对象环境</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 词法作用域第2章专属教学时间线：覆盖 Chapter 2 Lexical Scope、Lex-time、Cheating Lexical。展示源码位置、词法绑定、scope bubble、调用时解析，以及 eval 和 with 如何制造动态查找。支持模式切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-lexical-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-lexical-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            source position → lexical binding → scope bubble → lookup
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 2: Lexical Scope · Lex-time · Cheating Lexical · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="146" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={cheating || callSiteTrap ? C.danger : C.accent}>
            查找合同：{cheating ? "运行时环境可改写" : callSiteTrap ? "调用位置不能替换词法链" : "绑定由源码位置固定"}
          </text>

          <rect x="52" y="124" width="300" height="76" rx="10" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={C.accent}>源码位置：outer → inner</text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>inner 书写在 outer 内，绑定 captured = lexical</text>

          <line x1="366" y1="162" x2="430" y2="162" stroke={cheating ? C.danger : C.border} strokeWidth={cheating ? 3 : 2} markerEnd={cheating ? "url(#ydk-lexical-fault-arrow)" : "url(#ydk-lexical-arrow)"} />
          <rect x="448" y="124" width="192" height="76" rx="10" fill={cheating ? C.danger : C.success} fillOpacity="0.1" stroke={cheating ? C.danger : C.success} strokeWidth="1.5" />
          <text x="544" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={cheating ? C.danger : C.success}>{cheating ? "dynamic env" : "scope bubble"}</text>
          <text x="544" y="176" textAnchor="middle" fontSize="11" fill={C.secondary}>{cheating ? (mode === "eval" ? "字符串改变可见名称" : "对象改变查找环境") : "outer binding stays visible"}</text>

          <line x1="656" y1="162" x2="718" y2="162" stroke={callSiteTrap ? C.danger : C.border} strokeWidth={callSiteTrap ? 3 : 2} markerEnd={callSiteTrap ? "url(#ydk-lexical-fault-arrow)" : "url(#ydk-lexical-arrow)"} />
          <rect x="736" y="124" width="112" height="76" rx="10" fill={callSiteTrap ? C.danger : C.success} fillOpacity="0.1" stroke={callSiteTrap ? C.danger : C.success} strokeWidth="1.5" />
          <text x="792" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={callSiteTrap ? C.danger : C.success}>{callSiteTrap ? "误判" : "resolved"}</text>
          <text x="792" y="176" textAnchor="middle" fontSize="11" fill={C.secondary}>{callSiteTrap ? "not dynamic" : "value = lexical"}</text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = (cheating && index >= 4) || (callSiteTrap && index >= 3);
            const tone = failed ? C.danger : selected ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="246" width="840" height="146" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.1 : 1} stroke={tone} strokeWidth={selected || failed ? 2.5 : 1.5} />
                <text x="52" y="276" fontSize="13" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="306" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="336" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="370" fontSize="11" fill={failed ? C.danger : C.secondary}>
                  {failed ? (cheating ? "动态入口：记录分析边界，不能把运行时名称当作静态绑定" : "调用位置陷阱：记录 first divergence，不能改写源码形成的气泡") : index === 5 && mode === "lexical" ? "恢复样本：移除动态入口并用同一输入重放" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {(cheating || callSiteTrap) && activeIndex >= 3 && (
            <g>
              <path d="M 794 226 C 756 256, 712 288, 670 322" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-lexical-fault-arrow)" />
              <rect x="176" y="404" width="548" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="194" y="424" fontSize="11" fontWeight="700" fill={C.danger}>单一反例：运行时作弊或调用位置假设改变了错误的证据层</text>
            </g>
          )}

          <line x1="76" y1="462" x2="824" y2="462" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-lexical-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="462" x2={x2} y2="462" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-lexical-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = (cheating && index >= 4) || (callSiteTrap && index >= 3);
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="478" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="502" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="506" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="506" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="540" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "check" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="564" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="612" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测函数会带走哪一个绑定，再注入调用位置、eval 或 with 反例。"
          reset={{ label: "重置实验", ariaLabel: "重置词法作用域证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        词法作用域由源码位置固定；运行时入口可以改变查找环境，却不能把动态结果伪装成稳定的静态绑定。
      </figcaption>
    </figure>
  );
}
