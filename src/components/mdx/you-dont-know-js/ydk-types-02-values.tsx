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
  { label: "sparse", caption: "数组的 length 不等于实际存在的槽位数量" },
  { label: "string", caption: "字符串按 Unicode 语义读取，不是简单字节数组" },
  { label: "number", caption: "浮点运算会留下精度边界，不能凭显示位数判断" },
  { label: "special", caption: "NaN、正零与负零需要专用断言" },
  { label: "alias", caption: "对象赋值共享引用，原始值赋值复制值" },
  { label: "inspect", caption: "用专用 API 把表面相同的结果拆成可验收证据" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 观察稀疏数组",
    "数组可以有 length，却没有对应的每一个索引槽位；空槽和显式 undefined 必须分开记录。",
    "输出：length + index in array",
  ],
  [
    "2 · 读取字符串值",
    "字符串不可变，索引与 length 遵循 JavaScript 的 UTF-16 语义；视觉上的一个字符不一定是一个 code unit。",
    "输出：code unit + code point",
  ],
  [
    "3 · 检查数字精度",
    "Number 使用浮点表示；看起来简单的十进制加法也可能留下无法用显示结果发现的误差。",
    "输出：calculation + tolerance",
  ],
  [
    "4 · 区分特殊值",
    "NaN 不等于自身，正零与负零用严格相等看不出差异；Object.is 和 Number.isNaN 提供更精确的证据。",
    "输出：special-value assertion",
  ],
  [
    "5 · 观察值与引用",
    "原始值赋值复制值；对象赋值复制引用。修改别名指向的对象时，两个绑定都能观察到变化。",
    "输出：identity + mutation",
  ],
  [
    "6 · 选择专用 API",
    "Array.from、Array.isArray、codePointAt、Number.isNaN 和 Object.is 各自回答一个边界问题。",
    "输出：API + targeted assertion",
  ],
] as const;

type Mode = "sparse" | "unicode" | "precision" | "special" | "reference";

type ModeInfo = {
  title: string;
  expression: string;
  value: string;
  observation: string;
  assertion: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  sparse: {
    title: "稀疏数组",
    expression: "const a = []; a[2] = &quot;x&quot;",
    value: "length = 3",
    observation: "0 in a = false · 2 in a = true",
    assertion: "槽位存在性 ≠ length",
    detail: "空槽不是一个显式 undefined 元素。",
  },
  unicode: {
    title: "Unicode 边界",
    expression: "const s = &quot;😀&quot;",
    value: "s.length = 2",
    observation: "Array.from(s).length = 1",
    assertion: "codePointAt(0) 可追踪码点",
    detail: "UTF-16 code unit 数量与用户感知字符数量不同。",
  },
  precision: {
    title: "浮点精度",
    expression: "0.1 + 0.2 === 0.3",
    value: "false",
    observation: "误差在二进制表示中保留",
    assertion: "Math.abs(a - b) &lt; Number.EPSILON",
    detail: "比较近似值时要声明容差，而不是比较显示字符串。",
  },
  special: {
    title: "特殊值",
    expression: "NaN / -0",
    value: "NaN !== NaN",
    observation: "Object.is(-0, 0) = false",
    assertion: "Number.isNaN + Object.is",
    detail: "特殊值的身份关系不能只靠普通相等判断。",
  },
  reference: {
    title: "值与引用",
    expression: "const b = a",
    value: "object identity shared",
    observation: "b.items.push(1) 也改变 a",
    assertion: "a === b",
    detail: "对象赋值复制引用；原始值赋值复制值。",
  },
};

export function YdkTypes02ValuesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("sparse");

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
  const faultIndex = mode === "sparse" ? 0 : mode === "unicode" ? 1 : mode === "precision" ? 2 : mode === "special" ? 3 : 4;

  function reset() {
    timeline.goToStep(0);
    setMode("sparse");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-types-02-values"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Types · Chapter 2
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              值的边界：形状相似，语义不一定相同
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个边界样本，再沿六步时间线观察槽位、Unicode、精度、特殊值和引用身份。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择值边界样本</span>
          <select
            aria-label="选择稀疏数组、Unicode、浮点精度、特殊值或值与引用样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="sparse">稀疏数组 · length 与槽位</option>
            <option value="unicode">Unicode · code unit 与 code point</option>
            <option value="precision">浮点精度 · 0.1 + 0.2</option>
            <option value="special">特殊值 · NaN 与正负零</option>
            <option value="reference">值与引用 · identity 与 mutation</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Chapter 2: Values 专属教学时间线，覆盖 Arrays、Strings、Numbers、Special Values、Value vs Reference。展示稀疏数组槽位、Unicode code unit、浮点精度、NaN、正负零、原始值复制和对象引用共享。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-types02-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-types02-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-types02-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            value shape → boundary behavior → targeted assertion
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="188" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>值的表面</text>
          <text x="50" y="134" fontSize="12" fill={C.primary}>{selected.value}</text>
          <text x="50" y="160" fontSize="11" fill={C.secondary}>先记录表面结果</text>
          <text x="50" y="182" fontSize="11" fill={C.secondary}>不要替语义下结论</text>

          <line x1="230" y1="138" x2="258" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types02-success-arrow)" />

          <rect x="268" y="78" width="198" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="288" y="106" fontSize="13" fontWeight="700" fill={C.accent}>边界观察</text>
          <text x="288" y="134" fontSize="11" fill={C.primary}>{selected.observation}</text>
          <text x="288" y="160" fontSize="11" fill={C.secondary}>身份、槽位或精度</text>
          <text x="288" y="182" fontSize="11" fill={C.secondary}>决定下一步实验</text>

          <line x1="478" y1="138" x2="506" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types02-success-arrow)" />

          <rect x="516" y="78" width="174" height="120" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="536" y="106" fontSize="13" fontWeight="700" fill={C.accent}>可靠断言</text>
          <text x="536" y="134" fontSize="11" fill={C.primary}>{selected.assertion}</text>
          <text x="536" y="160" fontSize="11" fill={C.secondary}>问题决定 API</text>
          <text x="536" y="182" fontSize="11" fill={C.secondary}>断言要比显示更精确</text>

          <line x1="702" y1="138" x2="730" y2="138" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#ydk-types02-warning-arrow)" />

          <rect x="740" y="78" width="130" height="120" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
          <text x="805" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.warning}>解释</text>
          <text x="805" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.detail}</text>
          <text x="805" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个偏离</text>
          <text x="805" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>再重放样本</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "当前样本边界：把表面结果拆成可验证证据" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="76" y1="386" x2="824" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-types02-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-types02-success-arrow)" : "url(#ydk-types02-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="110" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 55} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "slot" : index === 1 ? "unicode" : index === 2 ? "float" : index === 3 ? "special" : index === 4 ? "alias" : "API"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看值的形状，再确认语义</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测表面结果，再推进槽位、Unicode、数字特殊值、引用身份和专用 API 的证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 JavaScript 值边界实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值的边界不能只看最终显示：稀疏槽位、Unicode、浮点误差、特殊值与引用身份都需要对应的观察 API。
      </figcaption>
    </figure>
  );
}
