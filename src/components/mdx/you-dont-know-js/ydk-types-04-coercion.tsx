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
  { label: "operands", caption: "先记录运算符、操作数和值的原始类型" },
  { label: "primitive", caption: "对象先通过 ToPrimitive 提供原始值" },
  { label: "target", caption: "抽象操作决定目标是字符串、数字还是布尔值" },
  { label: "explicit", caption: "显式转换把意图写在代码里" },
  { label: "implicit", caption: "运算符可能在幕后触发同一套规则" },
  { label: "equality", caption: "宽松相等会递归应用转换规则，严格相等不会" },
  { label: "relational", caption: "关系比较也要保留转换前后的证据" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 读取运算符与操作数类型",
    "先记录运算符、左右操作数和值的当前类型；同样的字面结果可能来自不同的转换路径。",
    "输出：operator + operand types",
  ],
  [
    "2 · 必要时把对象转为原始值",
    "对象参与运算时先经历 ToPrimitive；valueOf 或 toString 的返回值会成为下一步输入。",
    "输出：primitive candidate",
  ],
  [
    "3 · 按抽象操作转换目标类型",
    "ToString、ToNumber 和 ToBoolean 分别服务于不同目标；不能用一个标签解释全部结果。",
    "输出：target type + converted value",
  ],
  [
    "4 · 执行显式转换",
    "String、Number、Boolean 和一元加号把转换意图写在代码中，适合先单独观察每条规则。",
    "输出：explicit result",
  ],
  [
    "5 · 观察隐式转换",
    "加法、减法、乘法或布尔位置可能自动触发转换；运算符决定幕后调用哪条抽象规则。",
    "输出：operator result",
  ],
  [
    "6 · 对宽松相等递归应用规则",
    "== 可能把一侧转换后再比较；=== 不做这类隐式转换，应该把两种问题分开验收。",
    "输出：== / === evidence",
  ],
  [
    "7 · 保留关系比较证据",
    "小于、大于等关系比较也有抽象比较步骤；记录转换后的值，避免只凭最终布尔值猜路径。",
    "输出：relational trace",
  ],
] as const;

type Mode = "explicit" | "addition" | "equality" | "relational";

type ModeInfo = {
  title: string;
  expression: string;
  operands: string;
  primitive: string;
  target: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  explicit: {
    title: "显式转换",
    expression: "Number(\"42\")",
    operands: "string: \"42\"",
    primitive: "\"42\"",
    target: "ToNumber",
    result: "42 · number",
    detail: "意图明确，先单独检查转换结果。",
  },
  addition: {
    title: "隐式加法",
    expression: "1 + \"2\"",
    operands: "number: 1 + string: \"2\"",
    primitive: "1 / \"2\"",
    target: "ToPrimitive → string path",
    result: "\"12\"",
    detail: "加法遇到字符串时可能走拼接，而不是数值相加。",
  },
  equality: {
    title: "相等比较",
    expression: "\"42\" == 42",
    operands: "string: \"42\" / number: 42",
    primitive: "两边保留原始值",
    target: "== may coerce · === no coerce",
    result: "true / false",
    detail: "宽松与严格相等回答的是不同问题。",
  },
  relational: {
    title: "关系比较",
    expression: "\"2\" < \"10\"",
    operands: "string: \"2\" / string: \"10\"",
    primitive: "两边都是 primitive",
    target: "Abstract Relational Comparison",
    result: "false · lexicographic",
    detail: "都是字符串时可能按字典序比较，不是数值大小。",
  },
};

export function YdkTypes04CoercionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("explicit");

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
  const faultIndex = mode === "equality" ? 5 : mode === "relational" ? 6 : mode === "addition" ? 4 : 3;

  function reset() {
    timeline.goToStep(0);
    setMode("explicit");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-types-04-coercion"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Types · Chapter 4
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              强制类型转换：把幕后规则变成可追踪路径
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个转换样本，再沿七步时间线追踪 ToPrimitive、目标类型、隐式运算和相等比较。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择转换样本</span>
          <select
            aria-label="选择显式转换、隐式加法、相等比较或关系比较样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="explicit">显式转换 · Number(&quot;42&quot;)</option>
            <option value="addition">隐式加法 · 1 + &quot;2&quot;</option>
            <option value="equality">相等比较 · &quot;42&quot; == 42</option>
            <option value="relational">关系比较 · &quot;2&quot; &lt; &quot;10&quot;</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Chapter 4: Coercion 专属教学时间线，覆盖 Converting Values、Abstract Value Operations、Explicit Coercion、Implicit Coercion、Loose Equals vs Strict Equals、Abstract Relational Comparison。展示 ToPrimitive、ToString、ToNumber、ToBoolean、显式转换、隐式转换、宽松相等、严格相等和关系比较。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-types04-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-types04-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-types04-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            operands → ToPrimitive → target coercion → operator result
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="190" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>操作数</text>
          <text x="50" y="134" fontSize="11" fill={C.primary}>{selected.operands}</text>
          <text x="50" y="160" fontSize="11" fill={C.secondary}>先记录原始类型</text>
          <text x="50" y="182" fontSize="11" fill={C.secondary}>运算符决定路径</text>

          <line x1="232" y1="138" x2="260" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types04-success-arrow)" />

          <rect x="270" y="78" width="194" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="290" y="106" fontSize="13" fontWeight="700" fill={C.accent}>ToPrimitive</text>
          <text x="290" y="134" fontSize="11" fill={C.primary}>{selected.primitive}</text>
          <text x="290" y="160" fontSize="11" fill={C.secondary}>对象先提供原始值</text>
          <text x="290" y="182" fontSize="11" fill={C.secondary}>primitive 是中间证据</text>

          <line x1="476" y1="138" x2="504" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types04-success-arrow)" />

          <rect x="514" y="78" width="174" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="534" y="106" fontSize="13" fontWeight="700" fill={C.accent}>目标类型</text>
          <text x="534" y="134" fontSize="11" fill={C.primary}>{selected.target}</text>
          <text x="534" y="160" fontSize="11" fill={C.secondary}>ToString / ToNumber</text>
          <text x="534" y="182" fontSize="11" fill={C.secondary}>ToBoolean 也有规则</text>

          <line x1="700" y1="138" x2="728" y2="138" stroke={mode === "equality" || mode === "relational" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "equality" || mode === "relational" ? "url(#ydk-types04-warning-arrow)" : "url(#ydk-types04-success-arrow)"} />

          <rect x="738" y="78" width="132" height="120" rx="12" fill={mode === "equality" || mode === "relational" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "equality" || mode === "relational" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="804" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "equality" || mode === "relational" ? C.warning : C.success}>结果</text>
          <text x="804" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="804" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>保留前后证据</text>
          <text x="804" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex && (mode === "addition" || mode === "equality" || mode === "relational");
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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：区分显式意图与运算符幕后规则" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-types04-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-types04-success-arrow)" : "url(#ydk-types04-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 116;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex && (mode === "addition" || mode === "equality" || mode === "relational");
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="96" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 20} cy="426" r="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 20} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 57} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 48} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 48} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 48} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "types" : index === 1 ? "primitive" : index === 2 ? "target" : index === 3 ? "explicit" : index === 4 ? "implicit" : index === 5 ? "equals" : "relation"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先写意图，再解释幕后转换</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测运算结果，再推进 ToPrimitive、目标类型、隐式转换、相等和关系比较的证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 JavaScript 强制类型转换实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        显式和隐式转换共享抽象规则；把中间值和运算符写出来，才能解释为什么最终结果如此。
      </figcaption>
    </figure>
  );
}
