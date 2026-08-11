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
  { label: "contract", caption: "先声明 cardinality、preference 或 weight 目标" },
  { label: "alternate", caption: "沿 unmatched 与 matched edges 交替行走" },
  { label: "phase", caption: "Hopcroft-Karp 同时找最短增广路" },
  { label: "stable", caption: "Gale-Shapley 让 proposer 延迟确定" },
  { label: "labels", caption: "Hungarian 用 label 与 slack 扩展 equality graph" },
  { label: "verify", caption: "用目标对应的独立 witness 验证结果" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "hopcroft" | "stable" | "hungarian";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  hopcroft: {
    title: "Hopcroft-Karp",
    field: "shortest augmenting paths",
    result: "maximum cardinality",
    claim: "Berge theorem：无增广路才是 maximum 的证书",
  },
  stable: {
    title: "Gale-Shapley",
    field: "proposal / hold / reject",
    result: "stable matching",
    claim: "不存在 blocking pair，但目标不是最大 total rank",
  },
  hungarian: {
    title: "Hungarian",
    field: "label slack = 0",
    result: "optimal assignment",
    claim: "feasible labels 与 perfect tight matching 形成 dual certificate",
  },
};

export function Clrs4Chapter25MatchingsInBipartiteGraphsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("hopcroft");

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

  function reset() {
    timeline.goToStep(0);
    setMode("hopcroft");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch25-matchings-in-bipartite-graphs"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 25 · Matchings in Bipartite Graphs
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              同一张二分图，为什么需要三种最优性证书？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换最大基数匹配、稳定婚姻和加权指派，沿时间线观察 alternating path、blocking pair、label 与 slack。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择匹配目标</span>
          <select
            aria-label="选择 Hopcroft-Karp、Gale-Shapley 或 Hungarian 匹配模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="hopcroft">Hopcroft-Karp · maximum cardinality</option>
            <option value="stable">Gale-Shapley · stable matching</option>
            <option value="hungarian">Hungarian · optimal assignment</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 25 专属二分图匹配实验。覆盖 matchings in bipartite graphs、二分图匹配、maximum bipartite matching revisited、重新审视最大二分匹配、stable-marriage problem、稳定婚姻问题、Hungarian algorithm、匈牙利算法、assignment problem、指派问题。展示 alternating path、Hopcroft-Karp shortest phases、Gale-Shapley proposal 与 blocking pair、Hungarian feasible labels、equality graph、slack 和 matching witness，并支持模式切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch25-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch25-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch25-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            contract → alternate → phase → stable → labels → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            matchings in bipartite graphs · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>目标合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>left · right · no shared endpoint</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>cardinality / preference / weight</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch25-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>状态证据</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>每一步都保留可回溯 witness</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>目标改变，证书也随之改变</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch25-success-arrow)" />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.result}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>不能用另一种目标的证书代替</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 4;
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
                <text x="870" y={258 + index * 52} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "input" : index === 1 ? "path" : index === 2 ? "phase" : index === 3 ? "pair" : index === 4 ? "slack" : "proof"}</text>
              </g>
            );
          })}

          <text x="30" y="548" fontSize="13" fontWeight="700" fill={C.primary}>匹配状态与目标证书</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一组小图</text>

          {mode === "hopcroft" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Hopcroft-Karp：同一 phase 内并行翻转最短增广路</text>
              <circle cx="122" cy="620" r="24" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="122" cy="680" r="24" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="356" cy="620" r="24" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <circle cx="356" cy="680" r="24" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <circle cx="588" cy="620" r="24" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <circle cx="588" cy="680" r="24" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <line x1="146" y1="620" x2="332" y2="620" stroke={C.success} strokeWidth="4" markerEnd="url(#clrs4-ch25-success-arrow)" />
              <line x1="146" y1="680" x2="332" y2="680" stroke={C.success} strokeWidth="4" markerEnd="url(#clrs4-ch25-success-arrow)" />
              <line x1="380" y1="620" x2="564" y2="620" stroke={C.success} strokeWidth="4" markerEnd="url(#clrs4-ch25-success-arrow)" />
              <line x1="380" y1="680" x2="564" y2="680" stroke={C.success} strokeWidth="4" markerEnd="url(#clrs4-ch25-success-arrow)" />
              <text x="122" y="626" textAnchor="middle" fontSize="12" fill={C.accent}>u₁</text>
              <text x="122" y="686" textAnchor="middle" fontSize="12" fill={C.accent}>u₂</text>
              <text x="356" y="626" textAnchor="middle" fontSize="12" fill={C.success}>v₁</text>
              <text x="356" y="686" textAnchor="middle" fontSize="12" fill={C.success}>v₂</text>
              <text x="588" y="626" textAnchor="middle" fontSize="12" fill={C.primary}>w₁</text>
              <text x="588" y="686" textAnchor="middle" fontSize="12" fill={C.primary}>w₂</text>
              <text x="650" y="620" fontSize="12" fontWeight="700" fill={C.accent}>BFS layer = 1</text>
              <text x="650" y="646" fontSize="11" fill={C.secondary}>两条 shortest augmenting paths</text>
              <text x="650" y="672" fontSize="11" fill={C.secondary}>vertex-disjoint 才能同时 flip</text>
              <text x="650" y="698" fontSize="11" fill={C.success}>phase 后 matching +2</text>
            </>
          )}

          {mode === "stable" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Gale-Shapley：proposal、hold、reject 直到没有 blocking pair</text>
              <rect x="54" y="600" width="260" height="92" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="338" y="600" width="260" height="92" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="622" y="600" width="224" height="92" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="628" fontSize="12" fontWeight="700" fill={C.accent}>proposer m₁</text>
              <text x="76" y="654" fontSize="11" fill={C.secondary}>按 preference 顺序 proposal</text>
              <text x="76" y="680" fontSize="11" fill={C.secondary}>被 reject 才继续下一个</text>
              <text x="360" y="628" fontSize="12" fontWeight="700" fill={C.primary}>receiver w₁</text>
              <text x="360" y="654" fontSize="11" fill={C.secondary}>暂存更偏好的 proposal</text>
              <text x="360" y="680" fontSize="11" fill={C.secondary}>hold 不是 final</text>
              <text x="644" y="628" fontSize="12" fontWeight="700" fill={C.success}>stable</text>
              <text x="644" y="654" fontSize="11" fill={C.secondary}>不存在 blocking pair</text>
              <text x="644" y="680" fontSize="11" fill={C.secondary}>目标不是最大 total rank</text>
            </>
          )}

          {mode === "hungarian" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Hungarian：feasible labels 产生 equality graph 的 tight edge</text>
              <rect x="54" y="604" width="220" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="308" y="604" width="220" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="562" y="604" width="284" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>label l(x), l(y)</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>l(x)+l(y) ≥ w(x,y)</text>
              <text x="330" y="632" fontSize="12" fontWeight="700" fill={C.accent}>slack = 0</text>
              <text x="330" y="660" fontSize="11" fill={C.secondary}>equality edge 进入 E_l</text>
              <text x="584" y="632" fontSize="12" fontWeight="700" fill={C.success}>perfect tight matching</text>
              <text x="584" y="660" fontSize="11" fill={C.secondary}>matching weight = label sum</text>
              <text x="584" y="682" fontSize="11" fill={C.success}>primal 与 dual 同时 tight</text>
            </>
          )}

          <rect x="30" y="696" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="709" fontSize="11" fill={C.secondary}>端到端证书：augmenting path · no blocking pair · feasible labels · equality graph · assignment witness</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先确定 matching 的目标，再选择对应算法；cardinality、stability 与 weight optimality 需要不同证书。"
          reset={{ label: "重置实验", ariaLabel: "重置二分图匹配实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        匹配共享“不重复 endpoint”的结构，但 maximum、stable 和 assignment 的最优性不能用同一份 witness 证明。
      </figcaption>
    </figure>
  );
}
