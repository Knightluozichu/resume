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
  { label: "objective", caption: "先固定要最大化或最小化的目标" },
  { label: "choice", caption: "定义局部选择与 tie policy" },
  { label: "exchange", caption: "把任意最优解交换成含该选择的解" },
  { label: "residual", caption: "证明剩余部分仍是同类子问题" },
  { label: "witness", caption: "用可复现 witness 检查可行性" },
  { label: "verify", caption: "找不到交换论证就主动找反例" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "activity" | "huffman" | "cache" | "counterexample";

type ModeInfo = {
  title: string;
  objective: string;
  choice: string;
  evidence: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  activity: {
    title: "活动选择问题",
    objective: "最大化兼容活动数量",
    choice: "选择最早结束的活动",
    evidence: "交换后缀不变小",
  },
  huffman: {
    title: "Huffman 编码",
    objective: "最小化加权路径长度",
    choice: "合并频率最低的两个节点",
    evidence: "低频叶可安全放深",
  },
  cache: {
    title: "离线缓存",
    objective: "最小化 cache miss",
    choice: "淘汰未来最晚使用的页",
    evidence: "保留近用页不会更差",
  },
  counterexample: {
    title: "贪心反例",
    objective: "找出局部规则的失效边界",
    choice: "零钱 {1, 3, 4} 的 largest-first",
    evidence: "金额 6：4+1+1 不如 3+3",
  },
};

const ACTIVITIES = [
  { label: "a1", start: 1, finish: 4 },
  { label: "a2", start: 3, finish: 5 },
  { label: "a3", start: 0, finish: 6 },
  { label: "a4", start: 5, finish: 7 },
  { label: "a5", start: 3, finish: 9 },
  { label: "a6", start: 5, finish: 9 },
  { label: "a7", start: 6, finish: 10 },
  { label: "a8", start: 8, finish: 11 },
  { label: "a9", start: 8, finish: 12 },
  { label: "a10", start: 2, finish: 14 },
  { label: "a11", start: 12, finish: 16 },
  { label: "a12", start: 14, finish: 17 },
] as const;

export function Clrs4Chapter15GreedyAlgorithmsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("activity");

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
  const isProofStage = activeIndex >= 2;
  const isCounterexample = mode === "counterexample";

  function reset() {
    timeline.goToStep(0);
    setMode("activity");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch15-greedy-algorithms"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 15 · Greedy Design
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一个局部选择，怎样获得全局许可证？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换活动选择、Huffman 编码、离线缓存和零钱反例，沿时间线检查目标、选择、交换、归约、见证和反例边界。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择贪心机制</span>
          <select
            aria-label="选择活动选择问题、Huffman 编码、离线缓存或贪心反例"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="activity">活动选择问题 · earliest finish</option>
            <option value="huffman">Huffman 编码 · two minima</option>
            <option value="cache">离线缓存 · farthest in future</option>
            <option value="counterexample">贪心反例 · coin system</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="CLRS 4e Chapter 15 专属贪心算法实验。覆盖 greedy algorithms、贪心算法、activity-selection problem、活动选择问题、elements of the greedy strategy、贪心策略原理、Huffman codes、Huffman编码、offline caching、离线缓存。展示目标、局部选择、交换论证、剩余子问题、可复现见证和反例，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch15-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch15-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch15-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            objective → choice → exchange → residual → witness → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            greedy algorithms · {selected.title} · {selected.objective}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>目标合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>{selected.objective}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>规则：{selected.choice}</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch15-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>证明状态</text>
          <text x="358" y="134" fontSize="12" fill={C.primary}>{selected.evidence}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>{isProofStage ? "交换不会让目标变差" : "先不要把直觉当定理"}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>剩余部分仍需可归约</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isCounterexample ? C.warning : C.success} strokeWidth="2.5" markerEnd={isCounterexample ? "url(#clrs4-ch15-warning-arrow)" : "url(#clrs4-ch15-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isCounterexample ? C.warning : C.success} fillOpacity="0.1" stroke={isCounterexample ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isCounterexample ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isCounterexample ? "需要换 DP / 其他范式" : "choice 获得证明许可证"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{isCounterexample ? selected.evidence : "tie policy 可重放"}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>局部最优不是自动正确</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 2 || index === 5;
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
                <text x="870" y="278" textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "contract" : index === 1 ? "local rule" : index === 2 ? "exchange" : index === 3 ? "subproblem" : index === 4 ? "witness" : "counterexample"}</text>
              </g>
            );
          })}

          <text x="30" y="332" fontSize="13" fontWeight="700" fill={C.primary}>机制证据图</text>
          <text x="870" y="332" textAnchor="end" fontSize="11" fill={C.secondary}>切换样本，保持同一证明框架</text>

          {mode === "activity" && (
            <>
              <line x1="54" y1="430" x2="846" y2="430" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch15-arrow)" />
              {[0, 4, 8, 12, 16].map((tick) => (
                <g key={"tick-" + tick}>
                  <line x1={54 + tick * 49} y1="424" x2={54 + tick * 49} y2="436" stroke={C.border} strokeWidth="1.5" />
                  <text x={54 + tick * 49} y="452" textAnchor="middle" fontSize="11" fill={C.secondary}>{tick}</text>
                </g>
              ))}
              {ACTIVITIES.map((activity, index) => {
                const y = 356 + (index % 6) * 26;
                const chosen = index === 0 || index === 3 || index === 7 || index === 10;
                const tone = chosen ? C.success : C.border;
                return (
                  <g key={"activity-" + activity.label}>
                    <text x="30" y={y + 13} textAnchor="end" fontSize="11" fill={C.secondary}>{activity.label}</text>
                    <rect x={54 + activity.start * 49} y={y} width={(activity.finish - activity.start) * 49} height="16" rx="7" fill={chosen ? C.success : C.elevated} fillOpacity={chosen ? 0.22 : 1} stroke={tone} strokeWidth={chosen ? 2 : 1.2} />
                    <text x={54 + activity.start * 49 + 8} y={y + 13} fontSize="11" fill={C.primary}>{activity.start}–{activity.finish}</text>
                  </g>
                );
              })}
              <text x="54" y="492" fontSize="11" fill={C.secondary}>最早结束的 a1 先被交换进任意最优解；后缀从 4 开始继续选择。</text>
              <text x="846" y="492" textAnchor="end" fontSize="11" fill={C.success}>selected: a1 → a4 → a8 → a11</text>
            </>
          )}

          {mode === "huffman" && (
            <>
              <text x="54" y="370" fontSize="13" fontWeight="700" fill={C.primary}>最低频率合并</text>
              {[
                ["a", "5", 70],
                ["b", "9", 190],
                ["c", "12", 310],
                ["d", "13", 430],
                ["e", "16", 550],
                ["f", "45", 710],
              ].map(([label, frequency, x]) => (
                <g key={"leaf-" + label}>
                  <circle cx={Number(x)} cy="430" r="27" fill={C.elevated} stroke={Number(frequency) <= 9 ? C.warning : C.border} strokeWidth={Number(frequency) <= 9 ? 2.5 : 1.5} />
                  <text x={Number(x)} y="426" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.primary}>{label}</text>
                  <text x={Number(x)} y="446" textAnchor="middle" fontSize="11" fill={C.secondary}>{frequency}</text>
                </g>
              ))}
              <line x1="70" y1="510" x2="190" y2="510" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch15-warning-arrow)" />
              <circle cx="130" cy="552" r="31" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="130" y="548" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.primary}>z</text>
              <text x="130" y="568" textAnchor="middle" fontSize="11" fill={C.secondary}>5+9=14</text>
              <text x="54" y="612" fontSize="11" fill={C.secondary}>最低频率叶放得更深不会增加加权路径长度；收缩后得到 residual alphabet。</text>
            </>
          )}

          {mode === "cache" && (
            <>
              <text x="54" y="370" fontSize="13" fontWeight="700" fill={C.primary}>请求序列与下一次使用</text>
              {["A", "B", "C", "A", "D", "B", "E", "A", "C", "D"].map((page, index) => {
                const x = 54 + index * 78;
                const isRequest = index === 4;
                return (
                  <g key={"request-" + index + "-" + page}>
                    <rect x={x} y="395" width="54" height="44" rx="9" fill={isRequest ? C.warning : C.elevated} fillOpacity={isRequest ? 0.18 : 1} stroke={isRequest ? C.warning : C.border} strokeWidth={isRequest ? 2.5 : 1.2} />
                    <text x={x + 27} y="423" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.primary}>{page}</text>
                    <text x={x + 27} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index}</text>
                  </g>
                );
              })}
              <rect x="54" y="492" width="220" height="54" rx="10" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="70" y="516" fontSize="12" fill={C.primary}>cache: A · B · C</text>
              <text x="70" y="536" fontSize="11" fill={C.secondary}>miss at D: compare next use</text>
              <line x1="280" y1="519" x2="500" y2="519" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch15-warning-arrow)" />
              <text x="520" y="516" fontSize="12" fill={C.warning}>淘汰 C：next use 最远</text>
              <text x="520" y="538" fontSize="11" fill={C.secondary}>Belady 是 offline optimum，LRU 可用它作 benchmark。</text>
            </>
          )}

          {mode === "counterexample" && (
            <>
              <text x="54" y="370" fontSize="13" fontWeight="700" fill={C.primary}>同一金额的两个 witness</text>
              <rect x="54" y="395" width="360" height="120" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <text x="76" y="424" fontSize="12" fontWeight="700" fill={C.warning}>largest-first</text>
              <rect x="76" y="447" width="76" height="38" rx="8" fill={C.warning} fillOpacity="0.22" stroke={C.warning} strokeWidth="1.5" />
              <rect x="166" y="447" width="42" height="38" rx="8" fill={C.warning} fillOpacity="0.22" stroke={C.warning} strokeWidth="1.5" />
              <rect x="222" y="447" width="42" height="38" rx="8" fill={C.warning} fillOpacity="0.22" stroke={C.warning} strokeWidth="1.5" />
              <text x="300" y="471" fontSize="12" fill={C.primary}>4 + 1 + 1 = 6 · 3 枚</text>
              <rect x="444" y="395" width="360" height="120" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="466" y="424" fontSize="12" fontWeight="700" fill={C.success}>optimal witness</text>
              <rect x="466" y="447" width="84" height="38" rx="8" fill={C.success} fillOpacity="0.22" stroke={C.success} strokeWidth="1.5" />
              <rect x="564" y="447" width="84" height="38" rx="8" fill={C.success} fillOpacity="0.22" stroke={C.success} strokeWidth="1.5" />
              <text x="684" y="471" fontSize="12" fill={C.primary}>3 + 3 = 6 · 2 枚</text>
              <text x="54" y="558" fontSize="11" fill={C.secondary}>没有 nonworsening exchange，局部规则就没有全局许可证。</text>
              <text x="846" y="558" textAnchor="end" fontSize="11" fill={C.warning}>switch to DP</text>
            </>
          )}

          <rect x="30" y="584" width="840" height="32" rx="10" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="605" fontSize="11" fill={C.secondary}>证明出口：目标 · choice · exchange · residual · witness · counterexample</text>
          <text x="846" y="605" textAnchor="end" fontSize="11" fill={isCounterexample ? C.warning : C.success}>{isCounterexample ? "反例已击穿规则" : "交换论证仍在保护规则"}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先写目标和选择，再问能否把任意最优解交换过来；若找不到不变差交换，就停下来寻找反例。"
          reset={{ label: "重置实验", ariaLabel: "重置贪心算法证明实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        贪心算法的速度来自删去选择空间，但每一次删减都必须由交换论证或反例边界授权。
      </figcaption>
    </figure>
  );
}
