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
  { label: "syntax", caption: "class 只提供更整洁的声明外壳" },
  { label: "instance", caption: "new 创建实例并连接 Child.prototype" },
  { label: "state", caption: "constructor 把每个实例的状态写入 this" },
  { label: "extends", caption: "extends 建立 Child 与 Parent 两层原型关系" },
  { label: "super", caption: "super 找到父级方法但保留当前接收者" },
  { label: "descriptor", caption: "方法仍是原型属性且默认不可枚举" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 读 class 声明",
    "class Parent 与 class Child 描述构造器和方法；这里是语法入口，不是复制所有方法。",
    "输出：类定义 + prototype 方法槽",
  ],
  [
    "2 · 用 new 创建实例",
    "new Child() 生成 child，并把 child 的原型指向 Child.prototype；class 构造器必须用 new。",
    "输出：child → Child.prototype",
  ],
  [
    "3 · constructor 保存状态",
    "constructor 中的 this.name 写入实例自身；状态属于 child，而不是共享的 prototype。",
    "输出：child.name = &quot;Ada&quot;",
  ],
  [
    "4 · extends 建立两层链接",
    "Child.prototype 的原型指向 Parent.prototype；继承是可观察的链接，不是源码复制。",
    "输出：Child.prototype → Parent.prototype",
  ],
  [
    "5 · super 解析父级方法",
    "super.speak() 从父级方法槽取函数，再用当前 child 作为接收者继续执行。",
    "输出：parent:child",
  ],
  [
    "6 · 查看方法描述符",
    "Object.getOwnPropertyDescriptor(Parent.prototype, &quot;speak&quot;) 显示方法在原型上且 enumerable 为 false。",
    "输出：共享行为 + 不可枚举",
  ],
] as const;

type Mode = "class" | "prototype" | "descriptor" | "boundary";

type ModeInfo = {
  title: string;
  expression: string;
  relation: string;
  lookup: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  class: {
    title: "class 主路径",
    expression: "new Child().speak()",
    relation: "child → Child.prototype → Parent.prototype",
    lookup: "Child.prototype.speak → super.speak",
    result: "parent:child",
    detail: "语法更整洁，但运行时仍沿原型链接查找方法。",
  },
  prototype: {
    title: "原型关系",
    expression: "Object.getPrototypeOf(child)",
    relation: "child → Child.prototype",
    lookup: "再向上 → Parent.prototype",
    result: "两层链接可被直接观察",
    detail: "用内省验证关系，不用类名猜测行为来源。",
  },
  descriptor: {
    title: "方法描述符",
    expression: "Object.getOwnPropertyDescriptor(Parent.prototype, &quot;speak&quot;)",
    relation: "Parent.prototype.speak",
    lookup: "value = function · enumerable = false",
    result: "方法没有被复制到实例",
    detail: "class 方法默认不可枚举，行为共享，实例只保存自己的状态。",
  },
  boundary: {
    title: "边界故障",
    expression: "Child()",
    relation: "class 构造器缺少 new",
    lookup: "调用在构造阶段停止",
    result: "TypeError",
    detail: "class 构造器不能像普通函数一样直接调用；先修正调用方式再比较链接。",
  },
};

export function YdkThisAppendixAEs6ClassLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("class");

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
  const faultIndex = mode === "boundary" ? 1 : mode === "descriptor" ? 5 : 4;

  function reset() {
    timeline.goToStep(0);
    setMode("class");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-appendix-a-es6-class"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this · Appendix A
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              class 语法糖下面，原型链接仍在工作
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个观察样本，再按六步时间线追踪 new、constructor、extends、super 与方法描述符。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 class 运行时样本</span>
          <select
            aria-label="选择 class 主路径、原型关系、方法描述符或边界故障样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="class">class 主路径 · new Child().speak()</option>
            <option value="prototype">原型关系 · Object.getPrototypeOf</option>
            <option value="descriptor">方法描述符 · enumerable = false</option>
            <option value="boundary">边界故障 · Child() 缺少 new</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Appendix A: ES6 class 专属教学时间线：展示 class、constructor、new、extends、super、this、Child.prototype 与 Parent.prototype 的原型链接，以及方法描述符默认不可枚举。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this-appendix-a-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this-appendix-a-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-this-appendix-a-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            class syntax → instance → prototype chain → descriptor
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="190" height="118" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>class 声明</text>
          <text x="50" y="134" fontSize="12" fill={C.primary}>Parent / Child</text>
          <text x="50" y="160" fontSize="11" fill={C.secondary}>方法写入 prototype</text>
          <text x="50" y="182" fontSize="11" fill={C.secondary}>constructor 是入口</text>

          <line x1="232" y1="137" x2="258" y2="137" stroke={mode === "boundary" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "boundary" ? "url(#ydk-this-appendix-a-danger-arrow)" : "url(#ydk-this-appendix-a-success-arrow)"} />

          <rect x="268" y="78" width="216" height="118" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="288" y="106" fontSize="13" fontWeight="700" fill={C.accent}>实例 child</text>
          <text x="288" y="134" fontSize="12" fill={C.primary}>this.name = &quot;Ada&quot;</text>
          <text x="288" y="160" fontSize="11" fill={C.secondary}>own state：name</text>
          <text x="288" y="182" fontSize="11" fill={mode === "boundary" ? C.danger : C.secondary}>{mode === "boundary" ? "没有 new：停止" : "new：创建接收者"}</text>

          <line x1="496" y1="137" x2="522" y2="137" stroke={mode === "boundary" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "boundary" ? "url(#ydk-this-appendix-a-danger-arrow)" : "url(#ydk-this-appendix-a-success-arrow)"} />

          <rect x="532" y="78" width="160" height="118" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="552" y="106" fontSize="13" fontWeight="700" fill={C.accent}>原型链接</text>
          <text x="552" y="134" fontSize="11" fill={C.primary}>child → Child</text>
          <text x="552" y="158" fontSize="11" fill={C.primary}>Child → Parent</text>
          <text x="552" y="182" fontSize="11" fill={C.secondary}>查找沿链向上</text>

          <rect x="708" y="78" width="162" height="118" rx="12" fill={mode === "boundary" ? C.danger : C.success} fillOpacity="0.1" stroke={mode === "boundary" ? C.danger : C.success} strokeWidth="1.5" />
          <text x="789" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "boundary" ? C.danger : C.success}>观察结果</text>
          <text x="789" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.lookup}</text>
          <text x="789" y="158" textAnchor="middle" fontSize="12" fill={mode === "boundary" ? C.danger : C.primary}>{selected.result}</text>
          <text x="789" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "boundary" || mode === "descriptor");
            const tone = isFailure ? C.danger : isActive ? C.accent : index === 4 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="220" width="840" height="110" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <text x="52" y="248" fontSize="13" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="276" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="304" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="324" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "故障注入：记录首个偏离点，再修正调用方式" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="76" y1="386" x2="824" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this-appendix-a-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-this-appendix-a-success-arrow)" : "url(#ydk-this-appendix-a-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "boundary" || mode === "descriptor");
            const tone = isFailure ? C.danger : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="110" height="112" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isFailure ? C.danger : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="484" textAnchor="middle" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "fault" : "evidence"}</text>
                <text x={x + 55} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 3 ? "link" : index === 4 ? "call" : index === 5 ? "inspect" : "state"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先观察原型关系，再谈语法糖</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 new Child().speak() 的查找路径，再推进 constructor、extends、super 和描述符证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 ES6 class 原型链接实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        class 改善了书写方式，却没有抹掉 this、原型链接、super 与属性描述符；逐步观察才能避免把语法外观当成运行时模型。
      </figcaption>
    </figure>
  );
}
