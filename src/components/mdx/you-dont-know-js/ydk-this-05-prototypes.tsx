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
  { label: "receiver", caption: "从接收对象开始查找属性" },
  { label: "link", caption: "读取对象的内部原型链接" },
  { label: "traverse", caption: "未命中时沿原型链继续委托" },
  { label: "hit", caption: "遇到首个命中属性立即返回" },
  { label: "shadow", caption: "写入时判断是否形成自有属性遮蔽" },
  { label: "null", caption: "抵达 null 后结束查找并报告缺失" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 从接收对象查找属性",
    "每次读取都先从接收对象开始；this 或变量名不会跳过当前对象。",
    "输出：receiver + property key",
  ],
  [
    "2 · 读取内部原型链接",
    "对象内部的 [[Prototype]] 链接指向另一个对象，不是属性复制，也不是类实例表。",
    "输出：next object link",
  ],
  [
    "3 · 沿链逐级委托",
    "当前对象没有命中时，查询继续向上；每一步都保留查找路径和接收对象。",
    "输出：lookup path + candidate",
  ],
  [
    "4 · 遇到首个命中返回",
    "原型链上第一个同名属性结束读取；更远对象的同名属性不会再参与本次结果。",
    "输出：first hit + value",
  ],
  [
    "5 · 写入时判断遮蔽规则",
    "给继承来的普通属性赋值，通常会在接收对象上创建自有属性，形成遮蔽而非修改原型。",
    "输出：own property or setter",
  ],
  [
    "6 · 抵达 null 时结束",
    "链条最终到 null；仍未命中就是缺失，不能把 undefined 当成来自某一层的证据。",
    "输出：missing + terminal null",
  ],
] as const;

type Mode = "inherited" | "shadowed" | "write" | "missing";

type ModeInfo = {
  title: string;
  key: string;
  receiver: string;
  chain: string;
  result: string;
  write: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  inherited: {
    title: "继承属性命中",
    key: "kind",
    receiver: "child",
    chain: "child → parent → null",
    result: "parent.kind = shared",
    write: "读取，不创建 child.kind",
    detail: "child 自身未命中，沿 [[Prototype]] 找到 parent 的首个属性。",
  },
  shadowed: {
    title: "自有属性遮蔽",
    key: "kind",
    receiver: "child",
    chain: "child(kind=local) → parent(kind=shared)",
    result: "child.kind = local",
    write: "首个命中在 child",
    detail: "自有属性在更近位置命中，parent 的同名属性不会覆盖本次读取。",
  },
  write: {
    title: "写入形成遮蔽",
    key: "name",
    receiver: "child",
    chain: "child → parent(name=template)",
    result: "child.name = Ada",
    write: "赋值后新增 child.name",
    detail: "对继承来的可写数据属性赋值，通常在接收对象上建立自己的属性。",
  },
  missing: {
    title: "链末缺失",
    key: "unknown",
    receiver: "child",
    chain: "child → parent → null",
    result: "undefined · 未命中",
    write: "没有首个命中",
    detail: "查找抵达 null 仍未找到属性；undefined 是结果，不是原型层。",
  },
};

export function YdkThis05PrototypesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("inherited");

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
  const faultIndex = mode === "missing" ? 5 : mode === "write" ? 4 : 3;

  function reset() {
    timeline.goToStep(0);
    setMode("inherited");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-05-prototypes"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this 05
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              原型不是复制：它是一条可追踪的对象链接
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择查找样本，沿着 child 到 parent 的链路观察首个命中、遮蔽和链末缺失。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择原型查找样本</span>
          <select
            aria-label="选择原型链属性查找和遮蔽样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="inherited">继承属性命中 · child.kind</option>
            <option value="shadowed">自有属性遮蔽 · child.kind</option>
            <option value="write">写入形成遮蔽 · child.name</option>
            <option value="missing">链末缺失 · child.unknown</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 关于 this 第5章专属教学时间线：覆盖 Chapter 5: Prototypes、[[Prototype]]、&quot;Class&quot;、&quot;(Prototypal) Inheritance&quot;、Object Links。展示接收对象、内部原型链接、原型链、属性查找、首个命中、属性遮蔽、prototype 属性和抵达 null。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this05-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this05-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-this05-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            receiver → [[Prototype]] link → first hit or null
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 查找 key：{selected.key}
          </text>

          <rect x="30" y="78" width="226" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>接收对象</text>
          <text x="50" y="136" fontSize="12" fill={C.primary}>{selected.receiver}.{selected.key}</text>
          <text x="50" y="164" fontSize="12" fill={C.secondary}>自有属性：{mode === "shadowed" ? "kind" : "无命中"}</text>
          <text x="50" y="190" fontSize="11" fill={C.secondary}>先查当前位置，不先猜父对象</text>

          <line x1="264" y1="145" x2="296" y2="145" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#ydk-this05-arrow)" />

          <rect x="306" y="78" width="286" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="328" y="106" fontSize="13" fontWeight="700" fill={C.accent}>对象链接</text>
          <text x="328" y="136" fontSize="12" fill={C.primary}>{selected.chain}</text>
          <text x="328" y="164" fontSize="11" fill={C.secondary}>未命中 → 沿 [[Prototype]] 继续</text>
          <text x="328" y="190" fontSize="11" fill={mode === "missing" ? C.danger : C.secondary}>{selected.write}</text>

          <line x1="600" y1="145" x2="632" y2="145" stroke={mode === "missing" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "missing" ? "url(#ydk-this05-danger-arrow)" : "url(#ydk-this05-success-arrow)"} />

          <rect x="642" y="78" width="228" height="134" rx="12" fill={mode === "missing" ? C.danger : C.success} fillOpacity="0.1" stroke={mode === "missing" ? C.danger : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "missing" ? C.danger : C.success}>查找结果</text>
          <text x="756" y="136" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.result}</text>
          <text x="756" y="164" textAnchor="middle" fontSize="11" fill={mode === "missing" ? C.danger : C.secondary}>{selected.detail}</text>
          <text x="756" y="192" textAnchor="middle" fontSize="11" fill={mode === "missing" ? C.danger : C.success}>{mode === "missing" ? "terminal: null" : "first hit ends lookup"}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "write" || mode === "missing");
            const tone = isFailure ? C.danger : isActive ? C.accent : index === 3 ? C.success : C.border;
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
                  {isFailure ? "故障注入：改变写入或终止条件，定位首个偏离点" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}
                </text>
              </g>
            );
          })}

          <line x1="76" y1="414" x2="824" y2="414" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this05-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-this05-success-arrow)" : "url(#ydk-this05-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "write" || mode === "missing");
            const tone = isFailure ? C.danger : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="430" width="110" height="112" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="454" r="12" fill={isFailure ? C.danger : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="458" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="458" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="486" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="512" textAnchor="middle" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "fault" : "evidence"}</text>
                <text x={x + 55} y="532" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 3 ? "first hit" : index === 4 ? "shadow" : "link"}</text>
              </g>
            );
          })}
          <text x="30" y="584" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="584" textAnchor="end" fontSize="11" fill={C.secondary}>先追踪链接，再解释结果</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 child.key 的来源，再推进链路、首个命中、遮蔽和 null 终止。"
          reset={{ label: "重置实验", ariaLabel: "重置原型链查找实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原型关系是对象之间的链接；读取沿链查找，写入可能在接收对象上形成属性遮蔽。
      </figcaption>
    </figure>
  );
}
