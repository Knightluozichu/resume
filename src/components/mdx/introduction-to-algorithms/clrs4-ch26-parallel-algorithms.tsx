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
  { label: "contract", caption: "声明 DAG、work、span 与 processor 合同" },
  { label: "fork", caption: "spawn 独立 strands，沿 sync 汇合" },
  { label: "ownership", caption: "把 output cell 或 range 分给唯一 writer" },
  { label: "reduce", caption: "用 tree reduction 避免共享累加 race" },
  { label: "merge", caption: "用 median partition 降低 merge span" },
  { label: "verify", caption: "检查 dependency、work、span 与 cutoff" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "forkjoin" | "matrix" | "mergesort" | "race";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  forkjoin: {
    title: "fork-join DAG",
    field: "spawn → ready → sync",
    result: "dependency-safe",
    claim: "漏掉 sync 会读取尚未 ready 的 child result",
  },
  matrix: {
    title: "parallel matrix multiplication",
    field: "C[i][j] ownership",
    result: "race-free cells",
    claim: "不同 output cells 独立写入，dot product 可 tree reduce",
  },
  mergesort: {
    title: "parallel merge sort",
    field: "median + binary search",
    result: "polylog span",
    claim: "merge 也要并行，否则每层 linear merge 堆叠在 critical path",
  },
  race: {
    title: "race injection",
    field: "shared sum += value",
    result: "undefined ordering",
    claim: "并行 iterations 共享写入却没有 dependency，DAG 不再定义结果",
  },
};

export function Clrs4Chapter26ParallelAlgorithmsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("forkjoin");

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

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];
  const isProofStage = activeIndex >= 2;
  const isWarningMode = mode === "race";

  function reset() {
    timeline.goToStep(0);
    setMode("forkjoin");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch26-parallel-algorithms"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 26 · Parallel Algorithms
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              更多 cores，为什么不等于线性加速？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换 fork-join、矩阵 cell ownership、parallel merge 和 data race，沿时间线观察 work、span、DAG 与 scheduler 约束。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择并行机制</span>
          <select
            aria-label="选择 fork-join 并行、并行矩阵乘法、并行归并排序或 data race 模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="forkjoin">fork-join 并行 · DAG dependency</option>
            <option value="matrix">并行矩阵乘法 · output ownership</option>
            <option value="mergesort">并行归并排序 · median partition</option>
            <option value="race">故障注入 · shared reduction race</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 26 专属并行算法实验。覆盖 parallel algorithms、并行算法、fork-join parallelism、fork-join并行、parallel matrix multiplication、并行矩阵乘法、parallel merge sort、并行归并排序。展示 computation DAG、spawn、sync、work、span、output ownership、tree reduction、median partition、race failure 与 processor bound，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch26-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch26-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch26-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            contract → fork → ownership → reduce → merge → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            parallel algorithms · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>DAG · work · span · P processors</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>ownership 与 dependency 必须明确</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch26-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>状态证据</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>每个 task 都要有 ready 条件</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>性能与正确性共同受 DAG 约束</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isWarningMode ? C.warning : C.success} strokeWidth="2.5" markerEnd={isWarningMode ? "url(#clrs4-ch26-warning-arrow)" : "url(#clrs4-ch26-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isWarningMode ? C.warning : C.success} fillOpacity="0.1" stroke={isWarningMode ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isWarningMode ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isWarningMode ? "DAG 有 race" : "bound 可复核"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={isWarningMode ? C.warning : C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>不要只报告 core 数量</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 3;
            const tone = isActive ? C.accent : isBoundary ? C.warning : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y={222 + index * 52} width="840" height="44" rx="10" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y={242 + index * 52} fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y={242 + index * 52} fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y={258 + index * 52} fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y={258 + index * 52} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "input" : index === 1 ? "DAG" : index === 2 ? "write" : index === 3 ? "tree" : index === 4 ? "split" : "bound"}</text>
              </g>
            );
          })}

          <text x="30" y="548" fontSize="13" fontWeight="700" fill={C.primary}>并行状态与性能证据</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一组小图</text>

          {mode === "forkjoin" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>fork-join 并行：spawn 两条 ready strand，在 sync 汇合</text>
              <circle cx="126" cy="646" r="25" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="324" cy="616" r="25" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <circle cx="324" cy="676" r="25" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <circle cx="522" cy="646" r="25" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="720" cy="646" r="25" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <line x1="151" y1="638" x2="299" y2="620" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch26-success-arrow)" />
              <line x1="151" y1="654" x2="299" y2="672" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch26-success-arrow)" />
              <line x1="349" y1="616" x2="497" y2="638" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch26-success-arrow)" />
              <line x1="349" y1="676" x2="497" y2="654" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch26-success-arrow)" />
              <line x1="547" y1="646" x2="695" y2="646" stroke={C.warning} strokeWidth="3" markerEnd="url(#clrs4-ch26-warning-arrow)" />
              <text x="126" y="652" textAnchor="middle" fontSize="12" fill={C.accent}>call</text>
              <text x="324" y="622" textAnchor="middle" fontSize="12" fill={C.success}>left</text>
              <text x="324" y="682" textAnchor="middle" fontSize="12" fill={C.success}>right</text>
              <text x="522" y="652" textAnchor="middle" fontSize="12" fill={C.warning}>sync</text>
              <text x="720" y="652" textAnchor="middle" fontSize="12" fill={C.primary}>sum</text>
              <text x="606" y="606" fontSize="11" fill={C.secondary}>两条 child result ready 后才能 combine</text>
              <text x="606" y="682" fontSize="12" fontWeight="700" fill={C.success}>Tₚ ≤ T₁/P + T∞</text>
            </>
          )}

          {mode === "matrix" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>parallel matrix multiplication：每个 C[i][j] 只有一个 writer</text>
              <rect x="54" y="604" width="260" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="338" y="604" width="180" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="542" y="604" width="304" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>A, B read-only</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>不同 iteration 不写同一 cell</text>
              <text x="360" y="632" fontSize="12" fontWeight="700" fill={C.accent}>C[i][j]</text>
              <text x="360" y="660" fontSize="11" fill={C.secondary}>唯一 owner</text>
              <text x="564" y="632" fontSize="12" fontWeight="700" fill={C.success}>dot product</text>
              <text x="564" y="658" fontSize="11" fill={C.secondary}>k 维度可 tree reduce</text>
              <text x="564" y="680" fontSize="11" fill={C.success}>work Θ(n³), span Θ(log n)</text>
            </>
          )}

          {mode === "mergesort" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>parallel merge sort：median partition + binary search</text>
              <rect x="54" y="604" width="188" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="276" y="604" width="188" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="498" y="604" width="168" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <rect x="700" y="604" width="146" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>sorted runs</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>choose longer median</text>
              <text x="298" y="632" fontSize="12" fontWeight="700" fill={C.accent}>binary search</text>
              <text x="298" y="660" fontSize="11" fill={C.secondary}>find split rank</text>
              <text x="520" y="632" fontSize="12" fontWeight="700" fill={C.success}>lower ranges</text>
              <text x="520" y="660" fontSize="11" fill={C.secondary}>parallel submerge</text>
              <text x="722" y="632" fontSize="12" fontWeight="700" fill={C.success}>upper</text>
              <text x="722" y="660" fontSize="11" fill={C.secondary}>disjoint output</text>
              <text x="520" y="698" fontSize="11" fill={C.success}>work Θ(n), span Θ(log² n)</text>
            </>
          )}

          {mode === "race" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>故障注入：parallel for 中共享 sum += value</text>
              <circle cx="126" cy="646" r="25" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="324" cy="616" r="25" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="324" cy="676" r="25" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="522" cy="646" r="25" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <line x1="151" y1="638" x2="299" y2="620" stroke={C.warning} strokeWidth="3" markerEnd="url(#clrs4-ch26-warning-arrow)" />
              <line x1="151" y1="654" x2="299" y2="672" stroke={C.warning} strokeWidth="3" markerEnd="url(#clrs4-ch26-warning-arrow)" />
              <line x1="349" y1="616" x2="497" y2="638" stroke={C.warning} strokeWidth="3" markerEnd="url(#clrs4-ch26-warning-arrow)" />
              <line x1="349" y1="676" x2="497" y2="654" stroke={C.warning} strokeWidth="3" markerEnd="url(#clrs4-ch26-warning-arrow)" />
              <text x="126" y="652" textAnchor="middle" fontSize="12" fill={C.warning}>tasks</text>
              <text x="324" y="622" textAnchor="middle" fontSize="12" fill={C.warning}>write</text>
              <text x="324" y="682" textAnchor="middle" fontSize="12" fill={C.warning}>write</text>
              <text x="522" y="652" textAnchor="middle" fontSize="12" fill={C.primary}>sum</text>
              <text x="606" y="620" fontSize="12" fontWeight="700" fill={C.warning}>data race</text>
              <text x="606" y="646" fontSize="11" fill={C.secondary}>two writes have no order edge</text>
              <text x="606" y="672" fontSize="11" fill={C.secondary}>应改用 private partials + tree combine</text>
            </>
          )}

          <rect x="30" y="696" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="709" fontSize="11" fill={C.secondary}>端到端证书：DAG dependency · output ownership · work · span · scheduler bound · grain cutoff</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先写出 computation DAG，再分别检查 race-free ownership、work/span bound 与 practical cutoff。"
          reset={{ label: "重置实验", ariaLabel: "重置并行算法实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并行算法的加速来自可调度的 DAG，而不是线程数量；正确性、work、span 与 grain 必须一起交付。
      </figcaption>
    </figure>
  );
}
