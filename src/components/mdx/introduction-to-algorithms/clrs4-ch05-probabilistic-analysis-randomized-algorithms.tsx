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
  { label: "sample-space", caption: "先声明输入顺序与概率模型" },
  { label: "indicator", caption: "把每次雇用写成 0/1 事件" },
  { label: "linearity", caption: "用期望线性性相加，不要求独立" },
  { label: "randomize", caption: "让算法主动生成均匀随机排列" },
  { label: "collision", caption: "把碰撞、空箱和 streak 改写成指示器" },
  { label: "online", caption: "面对不可召回输入，权衡探索与选择" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "random-order" | "increasing" | "best-first" | "online";

type ModeInfo = {
  title: string;
  values: readonly number[];
  model: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  "random-order": {
    title: "随机到达",
    values: [2, 5, 1, 4, 3],
    model: "所有排名排列等概率",
    detail: "每个位置成为前缀最佳者的概率是 1/i。",
  },
  increasing: {
    title: "递增到达",
    values: [1, 2, 3, 4, 5],
    model: "最坏排列：每人都打破纪录",
    detail: "每次都雇用，雇用成本主导总成本。",
  },
  "best-first": {
    title: "最佳先到",
    values: [5, 1, 2, 3, 4],
    model: "最好排列：第一人就是当前最佳",
    detail: "只雇用第一人，后续记录事件全部失败。",
  },
  online: {
    title: "在线候选",
    values: [3, 1, 5, 2, 4],
    model: "先观察，再对不可召回输入作一次选择",
    detail: "观察窗口 k 改变成功概率与过早选择风险。",
  },
};

function recordFlags(values: readonly number[]) {
  let best = Number.NEGATIVE_INFINITY;
  return values.map((value) => {
    const isRecord = value > best;
    if (isRecord) best = value;
    return isRecord;
  });
}

export function Clrs4Chapter05ProbabilisticLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("random-order");

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
  const flags = recordFlags(selected.values);
  const visibleCount = Math.min(
    selected.values.length,
    Math.max(1, activeIndex + 1),
  );
  const recordTotal = flags
    .slice(0, visibleCount)
    .filter(Boolean).length;
  const isRandomized = activeIndex >= 3;
  const isOnline = mode === "online" || activeIndex >= 5;

  function reset() {
    timeline.goToStep(0);
    setMode("random-order");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch05-probabilistic-analysis-randomized-algorithms"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 5 · Probability
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从一次雇用到一条随机性证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换候选人到达形状，再沿时间线把样本空间、指示器、期望线性性、随机化、碰撞和在线选择连成可核查的推理。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择输入与决策模型</span>
          <select
            aria-label="选择随机到达、递增到达、最佳先到或在线候选模型"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="random-order">随机到达 · probabilistic analysis</option>
            <option value="increasing">递增到达 · worst order</option>
            <option value="best-first">最佳先到 · best order</option>
            <option value="online">在线候选 · one-way decision</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="CLRS 4e Chapter 5 专属概率分析与随机算法实验。覆盖 probabilistic analysis and randomized algorithms、概率分析与随机算法、hiring problem、雇用问题、indicator random variables、指示器随机变量、randomized algorithms、随机算法、further uses of indicator random variables、指示器随机变量的进一步应用。展示样本空间、雇用记录、期望线性性、均匀随机排列、生日碰撞、球入箱、连续正面和在线选择，并支持输入切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch05-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch05-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch05-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            sample space → indicator → linearity → randomize → collision → online
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            probabilistic analysis · {selected.title} · {selected.model}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入与样本空间</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>{selected.values.join("  ")}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>模型：{selected.model}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>当前前缀：{visibleCount} · 记录：{recordTotal}</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch05-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={activeIndex === 1 || activeIndex === 2 ? C.accent : C.elevated} fillOpacity={activeIndex === 1 || activeIndex === 2 ? 0.12 : 1} stroke={activeIndex === 1 || activeIndex === 2 ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={activeIndex === 1 || activeIndex === 2 ? C.accent : C.primary}>随机变量证据</text>
          <text x="358" y="134" fontSize="12" fill={C.primary}>Xᵢ = 是否打破记录</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>期望：E[X] = Σ E[Xᵢ]</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isRandomized ? C.warning : C.success} strokeWidth="2.5" markerEnd={isRandomized ? "url(#clrs4-ch05-warning-arrow)" : "url(#clrs4-ch05-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isRandomized ? C.warning : C.success} fillOpacity="0.1" stroke={isRandomized ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isRandomized ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isOnline ? "探索 ↔ 选择" : selected.detail}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{isRandomized ? "固定输入上的内部随机位" : "输入分布必须写清楚"}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>概率不是模糊免责条款</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 3 || index === 5;
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
                <text x="870" y="278" textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "model" : index === 1 ? "event" : index === 2 ? "expectation" : index === 3 ? "permutation" : index === 4 ? "collision" : "decision"}</text>
              </g>
            );
          })}

          <text x="30" y="332" fontSize="13" fontWeight="700" fill={C.primary}>记录事件的可视化前缀</text>
          <text x="870" y="332" textAnchor="end" fontSize="11" fill={C.secondary}>best-so-far · Xᵢ ∈ {"{0,1}"}</text>

          {selected.values.map((value, index) => {
            const x = 54 + index * 162;
            const barHeight = value * 24;
            const isVisible = index < visibleCount;
            const isRecord = flags[index];
            const tone = isRecord && isVisible ? C.warning : isVisible ? C.success : C.border;
            return (
              <g key={"candidate-" + index + "-" + value} opacity={isVisible ? 1 : 0.35}>
                <rect x={x} y={430 - barHeight} width="76" height={barHeight} rx="8" fill={isRecord && isVisible ? C.warning : C.success} fillOpacity={isVisible ? 0.22 : 0.08} stroke={tone} strokeWidth={isRecord && isVisible ? 2.5 : 1.5} />
                <text x={x + 38} y={450} textAnchor="middle" fontSize="16" fontWeight="700" fill={C.primary}>{value}</text>
                <text x={x + 38} y={470} textAnchor="middle" fontSize="11" fill={C.secondary}>{isRecord ? "record" : "below best"}</text>
                <text x={x + 38} y={490} textAnchor="middle" fontSize="11" fill={C.secondary}>i = {index + 1}</text>
              </g>
            );
          })}
          <line x1="54" y1="510" x2="848" y2="510" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch05-arrow)" />
          <text x="54" y="532" fontSize="11" fill={C.secondary}>每个记录事件贡献一个指示器：期望记录数 = 1 + 1/2 + … + 1/n</text>
          <text x="870" y="532" textAnchor="end" fontSize="11" fill={C.secondary}>当前记录：{recordTotal}</text>

          <rect x="30" y="550" width="840" height="54" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="582" fontSize="11" fill={C.secondary}>进一步应用：生日碰撞 · 球入箱 · 连续正面 · 在线雇用</text>
          <text x="870" y="582" textAnchor="end" fontSize="11" fill={isOnline ? C.success : C.secondary}>{isOnline ? "先观察 k，再选择第一个超过阈值者" : "期望计数 ≠ 至少一次事件概率"}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测随机性来自输入还是算法，再用指示器和期望线性性把整体问题拆成可相加的小事件。"
          reset={{ label: "重置实验", ariaLabel: "重置概率分析与随机算法实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        概率分析先写清模型，随机算法再把随机位纳入过程；两条路线都要保留可复核的期望、概率与失败边界。
      </figcaption>
    </figure>
  );
}
