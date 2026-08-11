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
  { label: "bytes", caption: "用 TypedArrays 固定二进制视图" },
  { label: "keys", caption: "用 Maps 保留任意键和值的关联" },
  { label: "unique", caption: "用 Sets 表达值唯一性与插入顺序" },
  { label: "weak-map", caption: "用 WeakMaps 绑定对象而不延长生命周期" },
  { label: "weak-set", caption: "用 WeakSets 标记对象成员资格" },
  { label: "boundary", caption: "验证不可枚举、序列化和清理边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · TypedArrays",
    "固定长度的二进制视图把元素类型、字节宽度和缓冲区边界说清楚。",
    "证据：buffer + offset + type",
  ],
  [
    "2 · Maps",
    "Map 以键和值建立关联，键可以是对象；读取时要验证身份和相等规则。",
    "证据：key identity + value",
  ],
  [
    "3 · Sets",
    "Set 只保留唯一值并按插入顺序迭代，重复添加不会制造第二个成员。",
    "证据：unique + insertion order",
  ],
  [
    "4 · WeakMaps",
    "WeakMap 的键必须是对象，适合把私有状态绑定到对象而不持有可枚举索引。",
    "证据：object key + weak reachability",
  ],
  [
    "5 · WeakSets",
    "WeakSet 只记录对象是否加入，不能枚举成员；成员资格必须通过 has 验证。",
    "证据：membership + no enumeration",
  ],
  [
    "6 · 生命周期边界",
    "序列化、回收和清理不是同一个动作，必须分别写出可以观察的契约。",
    "证据：snapshot + ownership",
  ],
] as const;

type Mode = "typed" | "map" | "set" | "weak";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  typed: {
    title: "二进制视图",
    input: "new Uint8Array([1, 2, 3])",
    state: "bytes = 01 02 03",
    result: "固定长度",
    detail: "视图解释同一块缓冲区，元素类型决定读取和写入的边界。",
  },
  map: {
    title: "对象键关联",
    input: "map.set(key, metadata)",
    state: "key identity preserved",
    result: "get(key)",
    detail: "对象键按身份关联；换一个外形相同的对象不会命中同一条记录。",
  },
  set: {
    title: "唯一值序列",
    input: "new Set([1, 1, 2])",
    state: "1 → 2",
    result: "ordered unique",
    detail: "重复值只保留一次，迭代顺序记录首次加入的顺序。",
  },
  weak: {
    title: "对象生命周期",
    input: "weakMap.set(owner, privateState)",
    state: "owner reachable",
    result: "has(owner)",
    detail: "弱集合不提供枚举快照；先验证对象是否仍可达，再决定如何清理外部资源。",
  },
};

export function YdkEs605CollectionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("typed");

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
  const boundaryIndex = mode === "typed" ? 0 : mode === "map" ? 1 : mode === "set" ? 2 : 5;

  function reset() {
    timeline.goToStep(0);
    setMode("typed");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-05-collections"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 5
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              集合：从字节视图到对象生命周期
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换样本，沿证据链观察 TypedArrays、Maps、Sets 与弱集合如何分别表达形状、关联、唯一性和生命周期。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择集合样本</span>
          <select
            aria-label="选择 TypedArrays、Maps、Sets 或 WeakMaps 与 WeakSets 生命周期样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="typed">TypedArrays · bytes</option>
            <option value="map">Maps · object keys</option>
            <option value="set">Sets · unique order</option>
            <option value="weak">WeakMaps + WeakSets · lifecycle</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 5 专属集合机制时间线，覆盖 Chapter 5: Collections、TypedArrays、Maps、WeakMaps、Sets、WeakSets。展示二进制视图、对象键、值唯一性、弱引用成员资格、不可枚举和生命周期边界，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es605-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es605-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es605-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            bytes → keys → unique → weak ownership → boundary
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 5: Collections · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="124" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入形状</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>先预测身份、顺序与边界</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>再观察所有权与清理</text>

          <line x1="294" y1="140" x2="326" y2="140" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es605-success-arrow)" />

          <rect x="336" y="78" width="252" height="124" rx="12" fill={mode === "weak" ? C.warning : C.elevated} fillOpacity={mode === "weak" ? 0.1 : 1} stroke={mode === "weak" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "weak" ? C.warning : C.accent}>集合契约</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>证据：身份、顺序、可达性</text>

          <line x1="600" y1="140" x2="632" y2="140" stroke={mode === "weak" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "weak" ? "url(#ydk-es605-warning-arrow)" : "url(#ydk-es605-success-arrow)"} />

          <rect x="642" y="78" width="228" height="124" rx="12" fill={mode === "weak" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "weak" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "weak" ? C.warning : C.success}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>契约必须可回放</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="106" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="278" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="306" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="322" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把身份、顺序与可达性分开记录" : isActive ? "当前阶段：沿所有权证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="382" x2="848" y2="382" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es605-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="382"
                x2={x2}
                y2="382"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-es605-success-arrow)" : "url(#ydk-es605-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="398" width="104" height="116" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="422" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="426" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="426" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="454" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="480" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="502" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "bytes" : index === 1 ? "keys" : index === 2 ? "unique" : index === 3 ? "weak" : index === 4 ? "member" : "cleanup"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先解释所有权，再看输出</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测集合如何比较键、保留顺序和持有对象，再推进时间线验证强引用与弱引用的生命周期边界。"
          reset={{ label: "重置实验", ariaLabel: "重置集合与生命周期实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        集合不是更短的数组：选择哪一种集合，取决于你要表达的形状、键相等、唯一性和对象所有权。
      </figcaption>
    </figure>
  );
}
