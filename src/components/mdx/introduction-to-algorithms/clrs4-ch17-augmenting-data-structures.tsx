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
  { label: "base", caption: "选择 underlying structure 与 sentinel base" },
  { label: "field", caption: "定义 child-local metadata recurrence" },
  { label: "update", caption: "沿更新路径维护字段语义" },
  { label: "rotate", caption: "用 child-first 顺序修复旋转" },
  { label: "prune", caption: "让查询由 metadata 授权剪枝" },
  { label: "verify", caption: "证明字段、查询与复杂度一致" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "order" | "interval" | "rotation" | "bad-field";

type ModeInfo = {
  title: string;
  field: string;
  query: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  order: {
    title: "动态顺序统计",
    field: "size[x] = size[left] + size[right] + 1",
    query: "OS-SELECT / OS-RANK",
    claim: "沿 root-to-node 路径累计跳过的节点",
  },
  interval: {
    title: "区间树",
    field: "max[x] = max(high[x], max[left], max[right])",
    query: "INTERVAL-SEARCH(query)",
    claim: "left.max 不足时安全剪掉左子树",
  },
  rotation: {
    title: "旋转维护",
    field: "先重算下降节点，再重算上升节点",
    query: "left-rotate / right-rotate",
    claim: "child-local 字段只需常数个节点修复",
  },
  "bad-field": {
    title: "错误扩张字段",
    field: "depth 依赖 ancestors，不是 child-local",
    query: "旋转后 metadata 失真",
    claim: "字段语义不满足定理就不能直接扩张",
  },
};

export function Clrs4Chapter17AugmentingDataStructuresLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("order");

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
  const isProofStage = activeIndex >= 4;
  const isBad = mode === "bad-field";

  function reset() {
    timeline.goToStep(0);
    setMode("order");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch17-augmenting-data-structures"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 17 · Augmented Structures
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              给树加一个字段，如何不破坏原来的保证？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换顺序统计、区间树、旋转维护和错误字段，沿时间线检查 base、字段语义、更新、旋转、剪枝与复杂度证据。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择扩张机制</span>
          <select
            aria-label="选择动态顺序统计、区间树、旋转维护或错误扩张字段"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="order">动态顺序统计 · size field</option>
            <option value="interval">区间树 · max field</option>
            <option value="rotation">旋转维护 · local repair</option>
            <option value="bad-field">错误扩张字段 · depth counterexample</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="CLRS 4e Chapter 17 专属数据结构扩张实验。覆盖 augmenting data structures、数据结构扩张、dynamic order statistics、动态顺序统计、how to augment a data structure、扩张数据结构的方法、interval trees、区间树。展示基础红黑树、size 或 max metadata、更新路径、旋转后的 child-first 修复、查询剪枝和错误 depth 字段，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch17-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch17-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch17-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            base → field → update → rotate → prune → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            augmenting data structures · {selected.title} · {selected.query}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>基础结构</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>red-black tree · height O(log n)</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>sentinel：NIL 基值明确</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch17-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>字段语义</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>child-local：{isBad ? "否" : "是"}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>字段必须授权查询剪枝</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isBad ? C.warning : C.success} strokeWidth="2.5" markerEnd={isBad ? "url(#clrs4-ch17-warning-arrow)" : "url(#clrs4-ch17-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isBad ? C.warning : C.success} fillOpacity="0.1" stroke={isBad ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isBad ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isBad ? "不能直接套用扩张定理" : "查询保持 O(log n)"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>语义与复杂度必须同证</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 3 || index === 4;
            const tone = isActive ? C.accent : isBoundary ? C.warning : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="82" rx="12" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y="250" fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y="278" fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y="278" textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "base" : index === 1 ? "recurrence" : index === 2 ? "path" : index === 3 ? "rotation" : index === 4 ? "pruning" : "certificate"}</text>
              </g>
            );
          })}

          <text x="30" y="332" fontSize="13" fontWeight="700" fill={C.primary}>元数据与查询路径</text>
          <text x="870" y="332" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一端到端证书</text>

          {mode === "order" && (
            <>
              <line x1="180" y1="410" x2="360" y2="470" stroke={C.border} strokeWidth="2" />
              <line x1="360" y1="470" x2="540" y2="410" stroke={C.border} strokeWidth="2" />
              <line x1="360" y1="470" x2="360" y2="550" stroke={C.border} strokeWidth="2" />
              <circle cx="360" cy="390" r="36" fill={C.elevated} stroke={C.accent} strokeWidth="2" />
              <text x="360" y="386" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.primary}>40</text>
              <text x="360" y="406" textAnchor="middle" fontSize="11" fill={C.secondary}>size 7</text>
              <circle cx="180" cy="500" r="32" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="1.5" />
              <text x="180" y="496" textAnchor="middle" fontSize="13" fill={C.primary}>20</text>
              <text x="180" y="516" textAnchor="middle" fontSize="11" fill={C.secondary}>size 3</text>
              <circle cx="540" cy="500" r="32" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="540" y="496" textAnchor="middle" fontSize="13" fill={C.primary}>60</text>
              <text x="540" y="516" textAnchor="middle" fontSize="11" fill={C.secondary}>size 3</text>
              <text x="324" y="580" fontSize="11" fill={C.secondary}>OS-SELECT(40, i)：local rank = left.size + 1</text>
              <text x="846" y="580" textAnchor="end" fontSize="11" fill={C.success}>rank path O(log n)</text>
            </>
          )}

          {mode === "interval" && (
            <>
              <line x1="180" y1="410" x2="360" y2="470" stroke={C.border} strokeWidth="2" />
              <line x1="360" y1="470" x2="540" y2="410" stroke={C.border} strokeWidth="2" />
              <circle cx="360" cy="390" r="36" fill={C.elevated} stroke={C.accent} strokeWidth="2" />
              <text x="360" y="383" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.primary}>[8,18]</text>
              <text x="360" y="405" textAnchor="middle" fontSize="11" fill={C.secondary}>max 30</text>
              <circle cx="180" cy="500" r="32" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="1.5" />
              <text x="180" y="493" textAnchor="middle" fontSize="13" fill={C.primary}>[3,12]</text>
              <text x="180" y="514" textAnchor="middle" fontSize="11" fill={C.secondary}>max 12</text>
              <circle cx="540" cy="500" r="32" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="1.5" />
              <text x="540" y="493" textAnchor="middle" fontSize="13" fill={C.primary}>[24,30]</text>
              <text x="540" y="514" textAnchor="middle" fontSize="11" fill={C.secondary}>query hit</text>
              <text x="54" y="580" fontSize="11" fill={C.secondary}>若 left.max 小于 query.low，左子树不可能 overlap，可安全剪枝。</text>
              <text x="846" y="580" textAnchor="end" fontSize="11" fill={C.success}>INTERVAL-SEARCH</text>
            </>
          )}

          {mode === "rotation" && (
            <>
              <text x="54" y="372" fontSize="13" fontWeight="700" fill={C.primary}>left rotation：先降后升</text>
              <rect x="54" y="398" width="250" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="72" y="424" fontSize="12" fill={C.primary}>before</text>
              <text x="72" y="454" fontSize="11" fill={C.secondary}>x.size 7 · y.size 4</text>
              <text x="72" y="480" fontSize="11" fill={C.secondary}>x.left / x.right 重新连接</text>
              <line x1="324" y1="460" x2="480" y2="460" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#clrs4-ch17-success-arrow)" />
              <rect x="500" y="398" width="300" height="126" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="520" y="424" fontSize="12" fill={C.primary}>after</text>
              <text x="520" y="454" fontSize="11" fill={C.secondary}>recompute x from children</text>
              <text x="520" y="480" fontSize="11" fill={C.secondary}>then recompute y from children</text>
              <text x="54" y="580" fontSize="11" fill={C.secondary}>child-local recurrence 让一次 rotation 只修常数个 node。</text>
              <text x="846" y="580" textAnchor="end" fontSize="11" fill={C.success}>repair O(1)</text>
            </>
          )}

          {mode === "bad-field" && (
            <>
              <text x="54" y="372" fontSize="13" fontWeight="700" fill={C.primary}>depth 字段的旋转反例</text>
              <rect x="54" y="398" width="250" height="126" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <text x="72" y="424" fontSize="12" fill={C.warning}>before</text>
              <text x="72" y="454" fontSize="11" fill={C.secondary}>subtree depth 都正确</text>
              <text x="72" y="480" fontSize="11" fill={C.secondary}>rotation 改变 moved subtree</text>
              <line x1="324" y1="460" x2="480" y2="460" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch17-warning-arrow)" />
              <rect x="500" y="398" width="300" height="126" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <text x="520" y="424" fontSize="12" fill={C.warning}>after</text>
              <text x="520" y="454" fontSize="11" fill={C.secondary}>许多后代 depth 同时失真</text>
              <text x="520" y="480" fontSize="11" fill={C.secondary}>不是 child-local，不能 O(1) repair</text>
              <text x="54" y="580" fontSize="11" fill={C.secondary}>扩张定理不是“任何 cache 字段都能加”：先验证字段语义。</text>
              <text x="846" y="580" textAnchor="end" fontSize="11" fill={C.warning}>certificate rejected</text>
            </>
          )}

          <rect x="30" y="604" width="840" height="20" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="619" fontSize="11" fill={C.secondary}>端到端证书：field semantics · sentinel base · update · rotation repair · pruning · complexity</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先定义字段语义和 NIL 基值，再证明更新与旋转维护；最后让查询剪枝由字段语义而不是直觉授权。"
          reset={{ label: "重置实验", ariaLabel: "重置数据结构扩张实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据结构扩张不是随手缓存答案，而是让字段、更新、旋转、查询和复杂度共享一份可验证证书。
      </figcaption>
    </figure>
  );
}
