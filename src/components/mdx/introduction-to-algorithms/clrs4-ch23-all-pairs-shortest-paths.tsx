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
  { label: "contract", caption: "声明 infinity、diagonal 与 negative-cycle 合同" },
  { label: "bound", caption: "按 edge count 建立 min-plus recurrence" },
  { label: "intermediate", caption: "Floyd-Warshall 允许一个新的 intermediate vertex" },
  { label: "reweight", caption: "Johnson 用 potential 把 edge weight 变成 nonnegative" },
  { label: "sources", caption: "对每个 source 运行合适的单源算法" },
  { label: "verify", caption: "检查 triangle inequality 与 path recovery" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "minplus" | "floyd" | "johnson" | "failure";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  minplus: {
    title: "min-plus 乘法",
    field: "L[m] ⊗ W",
    result: "bounded paths",
    claim: "把允许的 edge 数写进 state",
  },
  floyd: {
    title: "Floyd-Warshall",
    field: "d[i][j] via k",
    result: "V³ updates",
    claim: "每个 intermediate set 只扩展一次",
  },
  johnson: {
    title: "Johnson",
    field: "ŵ(u,v) = w + h(u) − h(v)",
    result: "nonnegative edges",
    claim: "reweight 不改变同一对端点的 path 次序",
  },
  failure: {
    title: "负环故障",
    field: "d[i][i] < 0",
    result: "no finite optimum",
    claim: "没有先声明 negative-cycle 合同就不能发布矩阵",
  },
};

export function Clrs4Chapter23AllPairsShortestPathsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("minplus");

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
  const isFailure = mode === "failure";

  function reset() {
    timeline.goToStep(0);
    setMode("minplus");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch23-all-pairs-shortest-paths"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 23 · All-Pairs Shortest Paths
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一张 distance matrix，如何保持可证明？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换 min-plus、Floyd-Warshall、Johnson 和负环故障，沿时间线观察 state、intermediate、potential 与 path witness。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 APSP 机制</span>
          <select
            aria-label="选择 min-plus 乘法、Floyd-Warshall、Johnson 或负环故障模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="minplus">min-plus 乘法 · bounded edges</option>
            <option value="floyd">Floyd-Warshall · intermediate k</option>
            <option value="johnson">Johnson · potential reweighting</option>
            <option value="failure">负环故障 · no finite optimum</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 23 专属全点对最短路径实验。覆盖 all-pairs shortest paths、所有结点对最短路径、shortest paths and matrix multiplication、最短路径与矩阵乘法、Floyd-Warshall algorithm、Floyd-Warshall算法、Johnson's algorithm、Johnson算法。展示 min-plus bounded paths、Floyd-Warshall intermediate vertex DP、Johnson potential reweighting、negative cycle 故障与 path recovery，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch23-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch23-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch23-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            contract → bound → intermediate → reweight → sources → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            all-pairs shortest paths · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>directed · weighted · infinity</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>先声明 diagonal 与 negative cycle</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>状态证据</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>每次 update 都扩大可行路径集合</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>distance 与 predecessor 要同步</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isFailure ? C.warning : C.success} strokeWidth="2.5" markerEnd={isFailure ? "url(#clrs4-ch23-warning-arrow)" : "url(#clrs4-ch23-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isFailure ? C.warning : C.success} fillOpacity="0.1" stroke={isFailure ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isFailure ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isFailure ? "没有 finite optimum" : "matrix 可复核"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={isFailure ? C.warning : C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>结果必须保留 path witness</text>

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
                <text x="870" y={258 + index * 52} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "contract" : index === 1 ? "edges" : index === 2 ? "k" : index === 3 ? "h" : index === 4 ? "Dijkstra" : "witness"}</text>
              </g>
            );
          })}

          <text x="30" y="548" fontSize="13" fontWeight="700" fill={C.primary}>distance matrix 与 path 证据</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一组端点</text>

          {mode === "minplus" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>min-plus：把允许的 edge 数写进 state</text>
              <rect x="54" y="604" width="214" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.accent}>L[m−1]</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>至多 m−1 条边</text>
              <line x1="286" y1="645" x2="370" y2="645" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-success-arrow)" />
              <rect x="390" y="604" width="214" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <text x="412" y="632" fontSize="12" fontWeight="700" fill={C.accent}>⊗ W</text>
              <text x="412" y="660" fontSize="11" fill={C.secondary}>选择 intermediate k</text>
              <rect x="626" y="604" width="220" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="648" y="632" fontSize="12" fontWeight="700" fill={C.success}>L[m]</text>
              <text x="648" y="660" fontSize="11" fill={C.secondary}>更长路径的最小值</text>
            </>
          )}

          {mode === "floyd" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Floyd-Warshall：允许 k 作为新的 intermediate</text>
              <rect x="54" y="604" width="250" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>d[i][j]</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>不经过 k 的旧值</text>
              <line x1="326" y1="645" x2="404" y2="645" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-success-arrow)" />
              <rect x="424" y="604" width="190" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <text x="519" y="632" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.accent}>k</text>
              <text x="519" y="660" textAnchor="middle" fontSize="11" fill={C.secondary}>i → k → j</text>
              <line x1="636" y1="645" x2="674" y2="645" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-success-arrow)" />
              <rect x="694" y="604" width="152" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="770" y="632" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.success}>min</text>
              <text x="770" y="660" textAnchor="middle" fontSize="11" fill={C.secondary}>保持较短者</text>
            </>
          )}

          {mode === "johnson" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Johnson：potential 让 negative edge 变 nonnegative</text>
              <rect x="54" y="604" width="232" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>w(u,v) = −2</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>原始 edge weight</text>
              <line x1="308" y1="645" x2="392" y2="645" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-arrow)" />
              <rect x="414" y="604" width="192" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <text x="510" y="632" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.accent}>h(u), h(v)</text>
              <text x="510" y="660" textAnchor="middle" fontSize="11" fill={C.secondary}>Bellman-Ford potentials</text>
              <line x1="628" y1="645" x2="666" y2="645" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-success-arrow)" />
              <rect x="688" y="604" width="158" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="767" y="632" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.success}>ŵ ≥ 0</text>
              <text x="767" y="660" textAnchor="middle" fontSize="11" fill={C.secondary}>再跑 Dijkstra</text>
            </>
          )}

          {mode === "failure" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>故障注入：negative cycle 让某些 pair 没有 finite optimum</text>
              <circle cx="154" cy="646" r="30" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="292" cy="646" r="30" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="430" cy="646" r="30" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <line x1="184" y1="646" x2="262" y2="646" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-warning-arrow)" />
              <line x1="322" y1="646" x2="400" y2="646" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-warning-arrow)" />
              <line x1="430" y1="676" x2="154" y2="676" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch23-warning-arrow)" />
              <text x="154" y="652" textAnchor="middle" fontSize="13" fill={C.warning}>i</text>
              <text x="292" y="652" textAnchor="middle" fontSize="13" fill={C.warning}>j</text>
              <text x="430" y="652" textAnchor="middle" fontSize="13" fill={C.warning}>k</text>
              <text x="512" y="628" fontSize="12" fontWeight="700" fill={C.warning}>d[k][k] 小于 0</text>
              <text x="512" y="654" fontSize="11" fill={C.secondary}>cycle 可反复绕行，路径 weight 无限下降</text>
              <text x="512" y="680" fontSize="11" fill={C.warning}>先 reject 或明确 affected pairs 语义</text>
            </>
          )}

          <rect x="30" y="696" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="709" fontSize="11" fill={C.secondary}>端到端证书：state bound · intermediate · potential · triangle inequality · path witness</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定 negative-cycle 与 infinity 合同，再选择 state；每个 distance 都要能回指 recurrence 或 predecessor witness。"
          reset={{ label: "重置实验", ariaLabel: "重置全点对最短路径实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        APSP 不是孤立的 distance matrix；它需要 state、重权势函数和可复核的 path witness 共同成立。
      </figcaption>
    </figure>
  );
}
