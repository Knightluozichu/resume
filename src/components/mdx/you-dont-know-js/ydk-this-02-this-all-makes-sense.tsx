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
  { label: "call-site", caption: "先圈出真正执行函数的调用点" },
  { label: "rules", caption: "把调用点交给 this 规则表" },
  { label: "order", caption: "按 new、显式、隐式、默认顺序检查" },
  { label: "exceptions", caption: "确认绑定丢失、间接引用与装箱" },
  { label: "lexical", caption: "箭头函数改走外层词法 this" },
  { label: "verify", caption: "重放样本并核对最终接收者" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · Call-site",
    "调用点是证据入口：先记录真正执行的表达式，而不是函数定义位置。",
    "输出：调用形式 + 接收者候选",
  ],
  [
    "2 · Nothing But Rules",
    "this 不是猜测题；把调用表达式送进一组可复核的绑定规则。",
    "输出：规则检查清单",
  ],
  [
    "3 · Everything In Order",
    "先检查 new，再查显式绑定，再查隐式绑定，最后才落到默认绑定。",
    "输出：首个命中的优先级",
  ],
  [
    "4 · Binding Exceptions",
    "取出方法、间接引用、软绑定和原始值装箱，都可能让直觉失效。",
    "输出：异常分支与首个偏离点",
  ],
  [
    "5 · Lexical this",
    "箭头函数没有自己的动态 this；它捕获创建时所在的外层词法 this。",
    "输出：外层绑定，不再重算",
  ],
  [
    "6 · Replay",
    "用同一段函数和同一输入重放，确认接收者、输出与规则轨迹一致。",
    "输出：可解释的最终值",
  ],
] as const;

type Sample = "new" | "explicit" | "implicit" | "default" | "arrow";

const SAMPLE_COPY: Record<Sample, {
  title: string;
  expression: string;
  binding: string;
  rule: string;
  detail: string;
}> = {
  new: {
    title: "new 优先",
    expression: "new Box()",
    binding: "新建实例",
    rule: "new binding",
    detail: "即使构造函数也写了显式绑定，new 的实例绑定优先。",
  },
  explicit: {
    title: "显式绑定",
    expression: "read.call(target)",
    binding: "target",
    rule: "call / apply / bind",
    detail: "调用者把接收者直接写进 call、apply 或 bind。",
  },
  implicit: {
    title: "隐式绑定",
    expression: "target.read()",
    binding: "target",
    rule: "点号左侧对象",
    detail: "方法调用从点号左侧取得本次 this。",
  },
  default: {
    title: "默认绑定",
    expression: "read()",
    binding: "undefined / global",
    rule: "严格模式与非严格模式",
    detail: "没有接收者时，先看严格模式，再判定默认结果。",
  },
  arrow: {
    title: "词法例外",
    expression: "() => this.value",
    binding: "外层 this",
    rule: "lexical this",
    detail: "箭头函数忽略 call-site 提供的动态 this，读取外层词法绑定。",
  },
};

export function YdkThis02ThisAllMakesSenseLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<Sample>("implicit");

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
  const selected = SAMPLE_COPY[sample];
  const matchedIndex = sample === "new"
    ? 2
    : sample === "explicit"
      ? 3
      : sample === "implicit"
        ? 4
        : sample === "default"
          ? 5
          : 6;

  function reset() {
    timeline.goToStep(0);
    setSample("implicit");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-02-this-all-makes-sense"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this 02
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从 call-site 开始，按优先级判定 this
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个调用样本，先定位调用点，再逐条排除规则；故障分支会显示首个偏离点。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 this 绑定样本</span>
          <select
            aria-label="选择 this 绑定优先级与例外样本"
            value={sample}
            onChange={(event) => setSample(event.target.value as Sample)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="new">new · new Box()</option>
            <option value="explicit">显式 · read.call(target)</option>
            <option value="implicit">隐式 · target.read()</option>
            <option value="default">默认 · read()</option>
            <option value="arrow">箭头例外 · () =&gt; this.value</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 关于 this 第2章专属教学时间线：覆盖 Chapter 2: this All Makes Sense Now!、Call-site、Nothing But Rules、Everything In Order、Binding Exceptions、Lexical this。展示调用点、new 绑定、显式绑定、隐式绑定、默认绑定、绑定丢失、间接引用、装箱、软绑定和箭头函数的词法 this。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this02-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this02-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-this02-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            call-site → priority rules → binding result
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="240" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>1 · 调用点</text>
          <text x="52" y="136" fontSize="13" fill={C.primary}>{selected.expression}</text>
          <text x="52" y="164" fontSize="12" fill={C.secondary}>记录：{selected.rule}</text>
          <text x="52" y="190" fontSize="11" fill={C.secondary}>不要从函数定义位置猜 this</text>

          <line x1="278" y1="145" x2="318" y2="145" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this02-arrow)" />

          <rect x="328" y="78" width="280" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="350" y="106" fontSize="13" fontWeight="700" fill={C.accent}>2 · 规则优先级</text>
          {["new", "explicit", "implicit", "default"].map((rule, index) => {
            const matched = sample !== "arrow" && index + 2 === matchedIndex;
            const skipped = sample !== "arrow" && index + 2 < matchedIndex;
            const tone = matched ? C.success : skipped ? C.secondary : C.border;
            return (
              <g key={`rule-${rule}`}>
                <circle cx="354" cy={128 + index * 19} r="5" fill={matched ? C.success : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x="368" y={132 + index * 19} fontSize="11" fill={matched ? C.success : C.primary}>
                  {index + 1}. {rule}{matched ? " · 命中" : skipped ? " · 已排除" : " · 待检查"}
                </text>
              </g>
            );
          })}
          <text x="350" y="202" fontSize="11" fill={sample === "arrow" ? C.danger : C.secondary}>
            {sample === "arrow" ? "箭头：转交外层词法 this" : "首个命中规则停止继续猜测"}
          </text>

          <line x1="616" y1="145" x2="656" y2="145" stroke={sample === "arrow" ? C.danger : C.success} strokeWidth="2.5" markerEnd={sample === "arrow" ? "url(#ydk-this02-danger-arrow)" : "url(#ydk-this02-success-arrow)"} />

          <rect x="666" y="78" width="204" height="134" rx="12" fill={sample === "arrow" ? C.danger : C.success} fillOpacity="0.1" stroke={sample === "arrow" ? C.danger : C.success} strokeWidth="1.5" />
          <text x="768" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={sample === "arrow" ? C.danger : C.success}>this 结果</text>
          <text x="768" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.primary}>{selected.binding}</text>
          <text x="768" y="170" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="768" y="194" textAnchor="middle" fontSize="11" fill={sample === "arrow" ? C.danger : C.success}>
            {sample === "arrow" ? "动态调用点被忽略" : "函数体现在读取正确上下文"}
          </text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = sample === "arrow" && index === 4;
            const tone = isFailure ? C.danger : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="238" width="840" height="122" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <text x="52" y="266" fontSize="13" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="294" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="322" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="348" fontSize="11" fill={isFailure ? C.danger : C.secondary}>
                  {isFailure ? "故障注入：箭头函数不接受 call-site 的动态绑定" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}
                </text>
              </g>
            );
          })}

          <line x1="76" y1="414" x2="824" y2="414" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this02-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="414"
                x2={x2}
                y2="414"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-this02-success-arrow)" : "url(#ydk-this02-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = sample === "arrow" && index === 4;
            const tone = isFailure ? C.danger : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="430" width="110" height="112" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="454" r="12" fill={isFailure ? C.danger : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="458" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="458" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="486" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="512" textAnchor="middle" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "fault" : "evidence"}</text>
                <text x={x + 55} y="532" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === matchedIndex - 1 ? "binding" : "state"}</text>
              </g>
            );
          })}
          <text x="30" y="584" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="584" textAnchor="end" fontSize="11" fill={C.secondary}>先定位调用点，再解释输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 sample 的 this，再推进优先级；切换箭头样本观察词法例外。"
          reset={{ label: "重置实验", ariaLabel: "重置 this 绑定优先级实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        this 的判定从 call-site 开始；优先级和例外共同解释最终接收者，而不是最后一行输出本身。
      </figcaption>
    </figure>
  );
}
