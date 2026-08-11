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
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "iterator", caption: "先实现 next 与可迭代入口，明确消费协议" },
  { label: "generator", caption: "用 yield 暂停生产，观察恢复与完成状态" },
  { label: "module", caption: "用 export 暴露稳定绑定和模块边界" },
  { label: "import", caption: "由导入方建立静态依赖与活绑定关系" },
  { label: "class", caption: "用 class 组织实例方法和构造过程" },
  { label: "prototype", caption: "回到底层协议，检查原型链接与身份" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · Iterators",
    "迭代器以 next() 签发 value 和 done；消费方只依赖协议，不必知道数据如何生成。",
    "证据：next + done",
  ],
  [
    "2 · Generators",
    "生成器把生产逻辑写成可暂停函数，yield 保存局部状态，next() 再次恢复执行。",
    "证据：yield + resume",
  ],
  [
    "3 · Modules",
    "模块导出绑定和模块作用域，依赖关系在执行前可被工具分析，边界更容易审计。",
    "证据：export + boundary",
  ],
  [
    "4 · Imports",
    "导入方获得的是静态绑定关系；导出值更新时，导入方读取的是同一条活绑定。",
    "证据：live binding",
  ],
  [
    "5 · Classes",
    "class 提供构造器、实例方法和 extends 的声明式表面，方法仍通常位于原型上。",
    "证据：constructor + prototype",
  ],
  [
    "6 · 底层协议",
    "最后检查迭代器身份、模块边界、原型链接和资源清理，确认表面语法没有遮蔽机制。",
    "证据：protocol + identity",
  ],
] as const;

type Mode = "iterator" | "generator" | "module" | "class" | "prototype";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  iterator: {
    title: "迭代器协议",
    input: "iterator.next()",
    state: "value + done",
    result: "consumable sequence",
    detail: "消费方只依赖 next() 的结果；可迭代入口与迭代器对象是相关但不同的角色。",
  },
  generator: {
    title: "生成器",
    input: "yield value → next()",
    state: "paused frame",
    result: "resumable producer",
    detail: "yield 保存局部执行状态；return、throw 和提前结束都会改变后续 next()。",
  },
  module: {
    title: "ES 模块",
    input: "export const value",
    state: "module scope",
    result: "explicit boundary",
    detail: "模块拥有自己的作用域和导出表；依赖可以被静态分析，不等于运行时没有错误。",
  },
  class: {
    title: "class 表面",
    input: "new Record(id)",
    state: "instance + prototype",
    result: "organized object",
    detail: "class 组织构造和方法，但实例方法通常仍共享在原型上，不能当成新对象系统。",
  },
  prototype: {
    title: "原型链接",
    input: "instance.method()",
    state: "own → prototype",
    result: "delegated behavior",
    detail: "回到底层检查自有属性、原型方法和 this 接收者，避免被 class 语法隐藏。",
  },
};

export function YdkEs603OrganizationLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("iterator");

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
  const faultIndex = mode === "generator" ? 1 : mode === "module" ? 2 : mode === "class" ? 4 : 0;

  function reset() {
    timeline.goToStep(0);
    setMode("iterator");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-03-organization"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 3
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              代码组织地图：协议、模块与原型
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换组织机制并沿时间线推进，观察序列生产、模块绑定、class 表面和原型底层如何各自承担不同的所有权。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择组织机制样本</span>
          <select
            aria-label="选择 Iterators、Generators、Modules、Classes 或原型链接样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="iterator">Iterators · protocol</option>
            <option value="generator">Generators · pause</option>
            <option value="module">Modules · boundary</option>
            <option value="class">Classes · instance</option>
            <option value="prototype">原型链接 · delegation</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 3 专属教学时间线，覆盖 Chapter 3: Organization、Iterators、Generators、Modules、Classes。展示迭代器协议、生成器暂停、ES 模块静态绑定、导入关系、class 构造器、实例方法与原型链接，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es603-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es603-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es603-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            iterator → generator → module → import → class → prototype
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 3: Organization · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>组织输入</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先确认生产、依赖或实例</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>再追踪底层协议</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es603-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "generator" || mode === "module" ? C.warning : C.elevated} fillOpacity={mode === "generator" || mode === "module" ? 0.1 : 1} stroke={mode === "generator" || mode === "module" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "generator" || mode === "module" ? C.warning : C.accent}>组织状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>证据：协议、绑定或原型</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "iterator" || mode === "class" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "iterator" || mode === "class" ? "url(#ydk-es603-success-arrow)" : "url(#ydk-es603-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "iterator" || mode === "class" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "iterator" || mode === "class" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "iterator" || mode === "class" ? C.success : C.warning}>组织结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>表面语法不能替代协议</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把协议、绑定和原型分开记录" : isActive ? "当前阶段：沿组织机制证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es603-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="386"
                x2={x2}
                y2="386"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-es603-success-arrow)" : "url(#ydk-es603-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="104" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "next" : index === 1 ? "yield" : index === 2 ? "export" : index === 3 ? "import" : index === 4 ? "new" : "link"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看协议，再看表面</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 next、yield、导出绑定、实例原型和模块边界，再推进时间线验证 ES6 组织机制如何连接。"
          reset={{ label: "重置实验", ariaLabel: "重置 ES6 代码组织地图实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        代码组织不是把语法换成 class 或模块，而是明确序列、依赖、暂停、实例方法和原型协议各自的所有权。
      </figcaption>
    </figure>
  );
}
