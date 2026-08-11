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
  { label: "value", caption: "表达式先产生值，类型跟着值走" },
  { label: "runtime", caption: "值携带运行时类型，变量可以换值" },
  { label: "typeof", caption: "typeof 返回可用于初筛的类型标签" },
  { label: "null", caption: "null 暴露历史特例：typeof null 是 object" },
  { label: "missing", caption: "未声明与已声明但未赋值不是同一状态" },
  { label: "check", caption: "按问题选择 typeof、Array.isArray 或专用检测" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 表达式产生值",
    "42、null、函数和数组都是先作为值出现；变量只是保存或引用当前值的绑定位置。",
    "输出：value + 绑定位置",
  ],
  [
    "2 · 值携带运行时类型",
    "把同一个变量改绑为字符串，不会把原来的数字“转换成字符串类型的变量”；变化发生在值上。",
    "输出：当前 value 的类型",
  ],
  [
    "3 · typeof 执行分类",
    "typeof 对多数内建值提供快速标签，但标签是观察结果，不是完整的类型判定协议。",
    "输出：typeof(value)",
  ],
  [
    "4 · 识别 null 特例",
    "typeof null 返回 object 是历史行为；要判断空值，应直接使用 value === null。",
    "输出：object + null guard",
  ],
  [
    "5 · 区分未声明与未赋值",
    "已声明但没有赋值的变量值是 undefined；typeof 未声明标识符则返回 undefined 字符串而不抛错。",
    "输出：undefined value ≠ undeclared binding",
  ],
  [
    "6 · 按用途选择检测",
    "typeof 适合粗分类，Array.isArray 适合数组，Number.isNaN 适合 NaN；可靠检测必须匹配问题。",
    "输出：检测函数 + 明确断言",
  ],
] as const;

type Mode = "number" | "null" | "function" | "undeclared";

type ModeInfo = {
  title: string;
  expression: string;
  value: string;
  typeofResult: string;
  binding: string;
  check: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  number: {
    title: "普通值",
    expression: "const answer = 42",
    value: "42",
    typeofResult: "number",
    binding: "已声明 + 已赋值",
    check: "typeof answer === \"number\"",
    detail: "typeof 可以完成这类基础分类。",
  },
  null: {
    title: "null 历史特例",
    expression: "const empty = null",
    value: "null",
    typeofResult: "object",
    binding: "已声明 + 明确空值",
    check: "empty === null",
    detail: "不要用 typeof empty === \"object\" 代替 null 判断。",
  },
  function: {
    title: "函数值",
    expression: "const task = () => 1",
    value: "function",
    typeofResult: "function",
    binding: "已声明 + 可调用值",
    check: "typeof task === \"function\"",
    detail: "function 是 typeof 保留的特殊标签。",
  },
  undeclared: {
    title: "未声明标识符",
    expression: "typeof missingName",
    value: "没有可读取的绑定",
    typeofResult: "undefined",
    binding: "binding 不存在",
    check: "typeof 可安全探测；直接读取会抛错",
    detail: "不要把这个结果和 declared = undefined 混为一谈。",
  },
};

export function YdkTypes01TypesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("number");

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
  const faultIndex = mode === "null" ? 3 : mode === "undeclared" ? 4 : 2;

  function reset() {
    timeline.goToStep(0);
    setMode("number");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-types-01-types"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Types · Chapter 1
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              类型跟着值走：从 typeof 到可靠检测
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个值样本，再沿六步时间线分开观察值、绑定、typeof 标签与边界检测。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择值与绑定样本</span>
          <select
            aria-label="选择普通值、null、函数值或未声明标识符样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="number">普通值 · answer = 42</option>
            <option value="null">null 特例 · empty = null</option>
            <option value="function">函数值 · task = () =&gt; 1</option>
            <option value="undeclared">未声明标识符 · typeof missingName</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Chapter 1: Types 专属教学时间线，覆盖 A Type By Any Other Name...、Built-in Types、Values as Types。展示值、变量绑定、typeof、undefined、null 历史特例、未声明标识符与可靠类型检测。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-types01-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-types01-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-types01-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            value → runtime type → typeof label → targeted check
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="184" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>绑定</text>
          <text x="50" y="134" fontSize="12" fill={C.primary}>{selected.binding}</text>
          <text x="50" y="160" fontSize="11" fill={C.secondary}>变量只是保存位置</text>
          <text x="50" y="182" fontSize="11" fill={mode === "undeclared" ? C.danger : C.secondary}>{mode === "undeclared" ? "没有可读取 binding" : "binding 指向一个值"}</text>

          <line x1="226" y1="138" x2="254" y2="138" stroke={mode === "undeclared" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "undeclared" ? "url(#ydk-types01-danger-arrow)" : "url(#ydk-types01-success-arrow)"} />

          <rect x="264" y="78" width="194" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="284" y="106" fontSize="13" fontWeight="700" fill={C.accent}>值</text>
          <text x="284" y="134" fontSize="12" fill={C.primary}>{selected.value}</text>
          <text x="284" y="160" fontSize="11" fill={C.secondary}>类型属于值</text>
          <text x="284" y="182" fontSize="11" fill={C.secondary}>值可以被重新绑定</text>

          <line x1="470" y1="138" x2="498" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types01-success-arrow)" />

          <rect x="508" y="78" width="174" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="528" y="106" fontSize="13" fontWeight="700" fill={C.accent}>typeof</text>
          <text x="528" y="134" fontSize="12" fill={C.primary}>返回：{selected.typeofResult}</text>
          <text x="528" y="160" fontSize="11" fill={C.secondary}>快速分类标签</text>
          <text x="528" y="182" fontSize="11" fill={mode === "null" ? C.warning : C.secondary}>{mode === "null" ? "注意：null 的历史特例" : "先分类，再确认"}</text>

          <line x1="694" y1="138" x2="722" y2="138" stroke={mode === "null" || mode === "undeclared" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "null" || mode === "undeclared" ? "url(#ydk-types01-arrow)" : "url(#ydk-types01-success-arrow)"} />

          <rect x="732" y="78" width="138" height="120" rx="12" fill={mode === "null" || mode === "undeclared" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "null" || mode === "undeclared" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="801" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "null" || mode === "undeclared" ? C.warning : C.success}>检测</text>
          <text x="801" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.check}</text>
          <text x="801" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>问题决定 API</text>
          <text x="801" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "null" || mode === "undeclared");
            const tone = isFailure ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="220" width="840" height="110" rx="12" fill={isFailure ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <text x="52" y="248" fontSize="13" fontWeight="700" fill={isFailure ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="276" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="304" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="324" fontSize="11" fill={isFailure ? C.warning : C.secondary}>{isFailure ? "边界注入：把标签与可靠判定分开记录" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="76" y1="386" x2="824" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-types01-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="386"
                x2={x2}
                y2="386"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-types01-success-arrow)" : "url(#ydk-types01-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "null" || mode === "undeclared");
            const tone = isFailure ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="110" height="112" rx="12" fill={isFailure ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isFailure ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="484" textAnchor="middle" fontSize="11" fill={isFailure ? C.warning : C.secondary}>{isFailure ? "boundary" : "evidence"}</text>
                <text x={x + 55} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 3 ? "null" : index === 4 ? "binding" : index === 5 ? "API" : "value"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先辨认值，再选择检测方式</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 typeof 的标签，再推进 null、undefined、未声明与专用检测的边界证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 JavaScript 类型检测实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JavaScript 的类型属于值而非变量；typeof 是快速分类器，遇到 null、未声明标识符或专用容器时要换成更精确的断言。
      </figcaption>
    </figure>
  );
}
