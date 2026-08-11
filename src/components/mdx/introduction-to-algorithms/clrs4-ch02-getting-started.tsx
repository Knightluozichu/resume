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
  { label: "problem", caption: "定义输入、输出和要保持的多重集" },
  { label: "invariant", caption: "把已排序前缀作为循环不变量" },
  { label: "insert", caption: "从右向左移动更大的元素，再放回 key" },
  { label: "cost", caption: "把比较、移动与输入形状分别记账" },
  { label: "analyze", caption: "从最好、最坏和平均输入推出增长率" },
  { label: "design", caption: "选择增量或分治，并验证正确性与成本" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "sorted" | "reversed" | "nearly" | "duplicates";

type ModeInfo = {
  title: string;
  values: readonly number[];
  shape: string;
  cost: string;
  note: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  sorted: {
    title: "已排序",
    values: [1, 2, 3, 4, 5],
    shape: "每个 key 都不小于前缀末端",
    cost: "最好：每轮一次失败比较",
    note: "右移次数为 0；有序前缀直接扩大。",
  },
  reversed: {
    title: "逆序",
    values: [5, 4, 3, 2, 1],
    shape: "每个 key 都小于已排序前缀",
    cost: "最坏：第 j 轮移动 j 个元素",
    note: "逆序对最多，移动总数达到 n(n−1)/2。",
  },
  nearly: {
    title: "近乎有序",
    values: [1, 2, 5, 3, 4],
    shape: "只有少数 key 需要穿过前缀",
    cost: "参数化：Θ(n + k)，k 为逆序对数",
    note: "算法成本跟随真正需要修复的局部混乱。",
  },
  duplicates: {
    title: "重复值",
    values: [2, 2, 1, 2, 1],
    shape: "相等元素应保持相对顺序",
    cost: "稳定：用 >，不要用 >=",
    note: "左侧相等元素不跨越 key，稳定性来自边界条件。",
  },
};

function insertionState(values: readonly number[], activeIndex: number) {
  const sortedPrefix = values.slice(0, Math.min(values.length, activeIndex + 1));
  const key = sortedPrefix[sortedPrefix.length - 1] ?? values[0] ?? 0;
  const comparisons = activeIndex <= 0 ? 0 : activeIndex;
  const moves = activeIndex <= 1 ? 0 : Math.max(0, activeIndex - 1);
  return { sortedPrefix, key, comparisons, moves };
}

export function Clrs4Chapter02GettingStartedLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("reversed");

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
  const state = insertionState(selected.values, activeIndex + 1);
  const isCostStage = activeIndex >= 3;
  const isDesignStage = activeIndex >= 5;

  function reset() {
    timeline.goToStep(0);
    setMode("reversed");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch02-getting-started"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 2 · Getting Started
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              插入排序的证据链：从一张新牌到算法设计
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换输入形状，再沿时间线推进：问题规格、有序前缀、插入动作、成本账本、算法分析和设计选择如何连成一张可核查的证书。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择输入形状</span>
          <select
            aria-label="选择已排序、逆序、近乎有序或重复值输入形状"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="sorted">已排序 · best case</option>
            <option value="reversed">逆序 · worst case</option>
            <option value="nearly">近乎有序 · inversion parameter</option>
            <option value="duplicates">重复值 · stability boundary</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="CLRS 4e Chapter 2 Getting Started 专属插入排序实验。覆盖 getting started、入门、insertion sort、插入排序、analyzing algorithms、算法分析、designing algorithms、算法设计，展示输入形状、有序前缀不变量、key 插入、比较与移动成本、最好最坏平均分析和增量或分治设计，并支持播放、暂停、单步、拖进度、输入切换和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch02-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch02-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch02-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            problem → invariant → insert → cost → analyze → design
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            getting started · {selected.title} · {selected.shape}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入实例</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>{selected.values.join("  ")}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>形状：{selected.title}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>key：{state.key} · 前缀长度：{state.sortedPrefix.length}</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch02-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={activeIndex === 1 ? C.accent : C.elevated} fillOpacity={activeIndex === 1 ? 0.12 : 1} stroke={activeIndex === 1 ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={activeIndex === 1 ? C.accent : C.primary}>不变量证据</text>
          <text x="358" y="134" fontSize="12" fill={C.primary}>A[0..j) 非降序</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>保持：元素多重集不变</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isCostStage ? C.warning : C.success} strokeWidth="2.5" markerEnd={isCostStage ? "url(#clrs4-ch02-warning-arrow)" : "url(#clrs4-ch02-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isCostStage ? C.warning : C.success} fillOpacity="0.1" stroke={isCostStage ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isCostStage ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isDesignStage ? "增量 ↔ 分治" : selected.cost}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{isDesignStage ? "正确性与成本分开证明" : selected.note}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>不是只看两层循环</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 3;
            const tone = isActive ? C.accent : isBoundary ? C.warning : C.border;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="82" rx="12" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y="250" fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y="278" fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y="278" textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "contract" : index === 1 ? "invariant" : index === 2 ? "transition" : index === 3 ? "cost model" : index === 4 ? "growth" : "choice"}</text>
              </g>
            );
          })}

          <text x="30" y="332" fontSize="13" fontWeight="700" fill={C.primary}>一轮插入的状态轨迹</text>
          <text x="870" y="332" textAnchor="end" fontSize="11" fill={C.secondary}>j = {Math.min(selected.values.length - 1, Math.max(1, activeIndex + 1))}</text>

          {selected.values.map((value, index) => {
            const x = 54 + index * 84;
            const inPrefix = index < state.sortedPrefix.length;
            const isKey = index === state.sortedPrefix.length - 1;
            const tone = isKey && activeIndex >= 2 ? C.warning : inPrefix ? C.success : C.border;
            return (
              <g key={`value-${index}-${value}`}>
                <rect x={x} y="354" width="66" height="66" rx="10" fill={isKey && activeIndex >= 2 ? C.warning : inPrefix ? C.success : C.elevated} fillOpacity={isKey || inPrefix ? 0.14 : 1} stroke={tone} strokeWidth={isKey ? 2.5 : 1.5} />
                <text x={x + 33} y="383" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.primary}>{value}</text>
                <text x={x + 33} y="404" textAnchor="middle" fontSize="11" fill={C.secondary}>{isKey ? "key" : inPrefix ? "sorted" : "待处理"}</text>
              </g>
            );
          })}
          <line x1="54" y1="438" x2="804" y2="438" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch02-arrow)" />
          <text x="54" y="460" fontSize="11" fill={C.secondary}>从右向左比较 → 更大的元素右移 → 把 key 写入空位</text>
          <text x="870" y="460" textAnchor="end" fontSize="11" fill={C.secondary}>比较：{state.comparisons} · 移动：{state.moves}</text>

          <rect x="30" y="480" width="840" height="104" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="508" fontSize="13" fontWeight="700" fill={C.primary}>成本账本</text>
          <text x="52" y="536" fontSize="11" fill={C.secondary}>最好：Θ(n) · 最坏：Θ(n²) · 平均（随机排列）：Θ(n²)</text>
          <text x="52" y="560" fontSize="11" fill={C.secondary}>近乎有序：Θ(n + k)，k = 逆序对数 · 原地插入排序额外空间：Θ(1)</text>
          <text x="870" y="536" textAnchor="end" fontSize="11" fill={isDesignStage ? C.success : C.secondary}>设计出口：{isDesignStage ? "merge sort：2T(n/2)+Θ(n)" : "先把操作和输入分布写清"}</text>
          <text x="870" y="560" textAnchor="end" fontSize="11" fill={C.secondary}>证明正确性 ≠ 证明成本</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测一次插入会改变什么，再用不变量、成本账本和输入形状逐步核对推理。"
          reset={{ label: "重置实验", ariaLabel: "重置插入排序证据链实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        插入排序把入门问题变成可迁移的方法：先定义问题，再证明不变量，最后让输入分布和设计选择解释成本。
      </figcaption>
    </figure>
  );
}
