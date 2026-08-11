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
  { label: "template", caption: "定义共享行为模板与不变量" },
  { label: "instance", caption: "创建独立实例状态" },
  { label: "relation", caption: "选择复制还是原型链接" },
  { label: "lookup", caption: "沿实例或原型路径查找方法" },
  { label: "override", caption: "观察覆盖、super 或 mixin 冲突" },
  { label: "coupling", caption: "检查重复状态和变更传播成本" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 定义共享行为模板",
    "先定义 speak 这类行为，并明确它读取哪个接收者状态；模板本身不等于实例。",
    "输出：行为模板 + 不变量",
  ],
  [
    "2 · 创建实例状态",
    "实例保存 name 等自己的数据；共享行为是否复制到实例，必须单独记录。",
    "输出：实例身份 + 自有状态",
  ],
  [
    "3 · 选择复制还是原型链接",
    "复制让每个实例拥有一份方法；链接让查找沿原型边走，变更传播路径不同。",
    "输出：复制边 / 原型边",
  ],
  [
    "4 · 沿路径查找方法",
    "调用时先查实例，再按链接查找；复制与委托可能得到同样输出，但证据路径不同。",
    "输出：method lookup + receiver",
  ],
  [
    "5 · 处理覆盖与 super",
    "子对象覆盖方法或 mixin 写入同名属性时，顺序会改变结果，也会增加脆弱的伪多态。",
    "输出：覆盖点 + 冲突来源",
  ],
  [
    "6 · 评估耦合与重复状态",
    "最后检查共享行为是否真的共享、状态是否重复，以及一次修改会传播到哪些对象。",
    "输出：传播范围 + 维护成本",
  ],
] as const;

type Mode = "copy" | "delegate" | "mixin" | "override";

type ModeInfo = {
  title: string;
  expression: string;
  relation: string;
  lookup: string;
  mutation: string;
  coupling: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  copy: {
    title: "复制式伪类",
    expression: "Object.assign(instance, behavior)",
    relation: "instance.speak ← copy",
    lookup: "先在 instance 找到 speak",
    mutation: "改 behavior 不会回写旧副本",
    coupling: "方法重复，状态边界清晰",
    detail: "复制得到独立方法值；后续模板修改不会自动传播。",
  },
  delegate: {
    title: "原型委托",
    expression: "Object.create(behavior)",
    relation: "instance → behavior",
    lookup: "instance 没有时沿原型链接查找",
    mutation: "改 behavior 可影响委托者",
    coupling: "行为共享，查找路径可观察",
    detail: "对象默认支持委托；方法放在原型路径上而不是复制每份。",
  },
  mixin: {
    title: "mixin 合并",
    expression: "Object.assign(instance, mixin)",
    relation: "mixin → instance",
    lookup: "同名键按合并顺序覆盖",
    mutation: "再次合并可能覆盖旧行为",
    coupling: "来源多，冲突难追踪",
    detail: "mixin 是属性复制组合，不是自动形成的原型层级。",
  },
  override: {
    title: "覆盖与 super",
    expression: "child.speak = () => super.speak()",
    relation: "child → parent",
    lookup: "先命中 child，再决定是否 super",
    mutation: "覆盖点改变调用链",
    coupling: "伪多态和顺序耦合增加",
    detail: "覆盖可复用父行为，但每层都引入新的查找和维护关系。",
  },
};

export function YdkThis04MixingClassObjectsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("delegate");

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
  const faultIndex = mode === "mixin" ? 4 : mode === "override" ? 5 : 3;

  function reset() {
    timeline.goToStep(0);
    setMode("delegate");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-04-mixing-class-objects"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this 04
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              “类”只是组织方式：比较复制、委托与 mixin
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一种组合方式，观察方法到底被复制、沿原型链接查找，还是被 mixin 覆盖。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择对象组合策略</span>
          <select
            aria-label="选择类对象复制原型委托或 mixin 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="copy">复制式伪类 · Object.assign</option>
            <option value="delegate">原型委托 · Object.create</option>
            <option value="mixin">mixin 合并 · 覆盖属性</option>
            <option value="override">覆盖与 super · 父子调用链</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 关于 this 第4章专属教学时间线：覆盖 Chapter 4: Mixing (Up) &quot;Class&quot; Objects、Class Theory、Class Mechanics、Class Inheritance、Mixins。展示共享行为模板、实例状态、复制、原型链接、方法查找、覆盖、super、mixin 冲突、伪多态和耦合传播。支持策略切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this04-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this04-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-this04-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            behavior template → instance → lookup path → propagation
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="234" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>行为模板</text>
          <text x="50" y="136" fontSize="12" fill={C.primary}>behavior.speak()</text>
          <text x="50" y="164" fontSize="12" fill={C.secondary}>读取 this.name</text>
          <text x="50" y="190" fontSize="11" fill={C.secondary}>共享行为，不等于实例状态</text>

          <line x1="272" y1="145" x2="304" y2="145" stroke={mode === "copy" || mode === "mixin" ? C.success : C.accent} strokeWidth="2.5" markerEnd="url(#ydk-this04-success-arrow)" />

          <rect x="314" y="78" width="278" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="336" y="106" fontSize="13" fontWeight="700" fill={C.accent}>实例状态</text>
          <text x="336" y="136" fontSize="12" fill={C.primary}>instance.name = &quot;Ada&quot;</text>
          <text x="336" y="164" fontSize="12" fill={C.primary}>{selected.relation}</text>
          <text x="336" y="192" fontSize="11" fill={mode === "mixin" || mode === "override" ? C.danger : C.secondary}>{selected.lookup}</text>

          <line x1="600" y1="145" x2="632" y2="145" stroke={mode === "mixin" || mode === "override" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "mixin" || mode === "override" ? "url(#ydk-this04-danger-arrow)" : "url(#ydk-this04-success-arrow)"} />

          <rect x="642" y="78" width="228" height="134" rx="12" fill={mode === "mixin" || mode === "override" ? C.danger : C.success} fillOpacity="0.1" stroke={mode === "mixin" || mode === "override" ? C.danger : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "mixin" || mode === "override" ? C.danger : C.success}>传播结果</text>
          <text x="756" y="136" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.mutation}</text>
          <text x="756" y="164" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.coupling}</text>
          <text x="756" y="192" textAnchor="middle" fontSize="11" fill={mode === "mixin" || mode === "override" ? C.danger : C.success}>{selected.detail}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "mixin" || mode === "override");
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
                  {isFailure ? "故障注入：复制或覆盖改变了方法来源与传播路径" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}
                </text>
              </g>
            );
          })}

          <line x1="76" y1="414" x2="824" y2="414" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this04-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-this04-success-arrow)" : "url(#ydk-this04-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "mixin" || mode === "override");
            const tone = isFailure ? C.danger : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="430" width="110" height="112" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="454" r="12" fill={isFailure ? C.danger : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="458" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="458" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="486" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="512" textAnchor="middle" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "fault" : "evidence"}</text>
                <text x={x + 55} y="532" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 2 ? "relation" : index === 5 ? "coupling" : "state"}</text>
              </g>
            );
          })}
          <text x="30" y="584" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="584" textAnchor="end" fontSize="11" fill={C.secondary}>先追踪查找路径，再评价类比</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 speak 的来源和变更传播范围，再推进复制、委托与覆盖。"
          reset={{ label: "重置实验", ariaLabel: "重置类对象组合策略实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JavaScript 对象默认通过原型链接委托；复制和 mixin 可以模拟类，却会改变共享行为与耦合边界。
      </figcaption>
    </figure>
  );
}
