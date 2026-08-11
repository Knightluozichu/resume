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
  { label: "contract", caption: "确认 undirected、connected 与 edge weight 合同" },
  { label: "cut", caption: "选一个 respecting cut，观察 crossing edges" },
  { label: "safe", caption: "取 cut 的 light edge，保持 extendable forest" },
  { label: "kruskal", caption: "按 weight 扫描，用 DSU 跳过成环边" },
  { label: "prim", caption: "从 frontier key 取下一条 light edge" },
  { label: "verify", caption: "检查 V−1、无环、连通和 safe-choice trace" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "cut" | "kruskal" | "prim" | "failure";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  cut: {
    title: "割性质",
    field: "light crossing edge = 2",
    result: "safe",
    claim: "存在一棵包含当前 forest 的 MST",
  },
  kruskal: {
    title: "Kruskal",
    field: "DSU components",
    result: "accept / skip",
    claim: "跨 component 才能加入，成环边必须跳过",
  },
  prim: {
    title: "Prim",
    field: "frontier key[v]",
    result: "next light edge",
    claim: "当前 tree 与外部的 cut 每步都被扩展",
  },
  failure: {
    title: "错误贪心",
    field: "global minimum only",
    result: "cycle / forest",
    claim: "不检查 cut 与 components，便没有安全证书",
  },
};

export function Clrs4Chapter21MinimumSpanningTreesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("cut");

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
    setMode("cut");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch21-minimum-spanning-trees"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 21 · Minimum Spanning Trees
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              便宜的边，何时真的安全？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换割性质、Kruskal、Prim 和错误贪心，沿时间线观察 forest、crossing edge、frontier key 与终态证书。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 MST 机制</span>
          <select
            aria-label="选择割性质、Kruskal、Prim 或错误贪心模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="cut">割性质 · light crossing edge</option>
            <option value="kruskal">Kruskal · DSU forest</option>
            <option value="prim">Prim · frontier key</option>
            <option value="failure">错误贪心 · cycle or forest</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 21 专属最小生成树实验。覆盖 minimum spanning trees、最小生成树、growing a minimum spanning tree、生成最小生成树、Kruskal、Kruskal算法、Prim、Prim算法。展示 undirected connected graph、respecting cut、light crossing edge、extendable forest invariant、Kruskal 的 DSU、Prim 的 frontier key 与错误全局最小边故障，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch21-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch21-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch21-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            contract → cut → safe → Kruskal → Prim → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            minimum spanning trees · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>undirected · connected · weighted</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>负权可接受，equal weight 可多解</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch21-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>安全证书</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>每次加入都保持 forest</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>choice 必须能回指某个 cut</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isFailure ? C.warning : C.success} strokeWidth="2.5" markerEnd={isFailure ? "url(#clrs4-ch21-warning-arrow)" : "url(#clrs4-ch21-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isFailure ? C.warning : C.success} fillOpacity="0.1" stroke={isFailure ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isFailure ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isFailure ? "没有 MST 证书" : "edge 是 safe"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={isFailure ? C.warning : C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>终态还需连通与无环</text>

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
                <text x="870" y={258 + index * 52} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "input" : index === 1 ? "cut" : index === 2 ? "light" : index === 3 ? "DSU" : index === 4 ? "key" : "MST"}</text>
              </g>
            );
          })}

          <text x="30" y="548" fontSize="13" fontWeight="700" fill={C.primary}>forest 状态与安全边证据</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一张小图</text>

          {mode === "cut" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>respecting cut：S = {"{A,B}"}，V−S = {"{C,D}"}</text>
              <line x1="142" y1="640" x2="286" y2="640" stroke={C.success} strokeWidth="3" />
              <line x1="286" y1="640" x2="430" y2="640" stroke={C.warning} strokeWidth="3" />
              <line x1="430" y1="640" x2="574" y2="640" stroke={C.border} strokeWidth="2" />
              <line x1="286" y1="640" x2="430" y2="690" stroke={C.border} strokeWidth="2" />
              <circle cx="142" cy="640" r="26" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="286" cy="640" r="26" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="430" cy="640" r="26" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <circle cx="574" cy="640" r="26" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="142" y="646" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>A</text>
              <text x="286" y="646" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>B</text>
              <text x="430" y="646" textAnchor="middle" fontSize="13" fill={C.primary}>C</text>
              <text x="574" y="646" textAnchor="middle" fontSize="13" fill={C.primary}>D</text>
              <text x="630" y="620" fontSize="12" fontWeight="700" fill={C.success}>light crossing edge = B—C (2)</text>
              <text x="630" y="646" fontSize="11" fill={C.secondary}>加入后仍存在一棵包含 forest 的 MST</text>
              <text x="630" y="672" fontSize="11" fill={C.secondary}>cut property 授权 safe choice</text>
            </>
          )}

          {mode === "kruskal" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Kruskal：按 weight 扫描，DSU 只合并不同 component</text>
              <rect x="54" y="604" width="792" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>sorted edges</text>
              <rect x="190" y="612" width="102" height="48" rx="8" fill={C.success} fillOpacity="0.12" stroke={C.success} />
              <rect x="304" y="612" width="102" height="48" rx="8" fill={C.success} fillOpacity="0.12" stroke={C.success} />
              <rect x="418" y="612" width="102" height="48" rx="8" fill={C.warning} fillOpacity="0.12" stroke={C.warning} />
              <rect x="532" y="612" width="102" height="48" rx="8" fill={C.success} fillOpacity="0.12" stroke={C.success} />
              <text x="241" y="642" textAnchor="middle" fontSize="12" fill={C.success}>AB:1 ✓</text>
              <text x="355" y="642" textAnchor="middle" fontSize="12" fill={C.success}>BC:2 ✓</text>
              <text x="469" y="642" textAnchor="middle" fontSize="12" fill={C.warning}>AC:3 skip</text>
              <text x="583" y="642" textAnchor="middle" fontSize="12" fill={C.success}>CD:4 ✓</text>
              <text x="76" y="674" fontSize="11" fill={C.secondary}>AC 的 endpoints 已在同一 component，加入会形成 cycle。</text>
              <text x="820" y="674" textAnchor="end" fontSize="11" fill={C.success}>forest → tree</text>
            </>
          )}

          {mode === "prim" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>Prim：当前 tree 与外部 frontier 的最小 key</text>
              <line x1="142" y1="646" x2="286" y2="646" stroke={C.success} strokeWidth="3" />
              <line x1="286" y1="646" x2="430" y2="646" stroke={C.success} strokeWidth="3" />
              <line x1="430" y1="646" x2="574" y2="646" stroke={C.border} strokeWidth="2" />
              <circle cx="142" cy="646" r="28" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="286" cy="646" r="28" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="430" cy="646" r="28" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="574" cy="646" r="28" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="142" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>r</text>
              <text x="286" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>A</text>
              <text x="430" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>B</text>
              <text x="574" y="652" textAnchor="middle" fontSize="13" fill={C.primary}>C</text>
              <text x="630" y="626" fontSize="12" fontWeight="700" fill={C.success}>key[C] = 2</text>
              <text x="630" y="652" fontSize="11" fill={C.secondary}>取最小 frontier key 加入 tree</text>
              <text x="630" y="678" fontSize="11" fill={C.secondary}>key 不是 root path distance</text>
            </>
          )}

          {mode === "failure" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>故障注入：只拿全局最便宜 edge，不检查 component</text>
              <line x1="142" y1="646" x2="286" y2="646" stroke={C.warning} strokeWidth="3" />
              <line x1="286" y1="646" x2="430" y2="646" stroke={C.warning} strokeWidth="3" />
              <line x1="430" y1="646" x2="574" y2="646" stroke={C.warning} strokeWidth="3" />
              <circle cx="142" cy="646" r="28" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="286" cy="646" r="28" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="430" cy="646" r="28" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <circle cx="574" cy="646" r="28" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="142" y="652" textAnchor="middle" fontSize="13" fill={C.warning}>A</text>
              <text x="286" y="652" textAnchor="middle" fontSize="13" fill={C.warning}>B</text>
              <text x="430" y="652" textAnchor="middle" fontSize="13" fill={C.warning}>C</text>
              <text x="574" y="652" textAnchor="middle" fontSize="13" fill={C.primary}>D</text>
              <text x="630" y="626" fontSize="12" fontWeight="700" fill={C.warning}>AB, BC, AC → cycle</text>
              <text x="630" y="652" fontSize="11" fill={C.secondary}>或在 disconnected graph 中只得到 forest</text>
              <text x="630" y="678" fontSize="11" fill={C.warning}>没有 respecting cut 证书</text>
            </>
          )}

          <rect x="30" y="696" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="709" fontSize="11" fill={C.secondary}>端到端证书：cut property · safe edge · forest · connectivity · V−1 · tie policy</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先声明 graph 合同，再让每一条加入的 edge 回指一个 respecting cut；Kruskal 和 Prim 只是选择 cut 的方式不同。"
          reset={{ label: "重置实验", ariaLabel: "重置最小生成树实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MST 的贪心选择不是“全局最便宜”这么简单，而是由 cut property 授权的 safe edge。
      </figcaption>
    </figure>
  );
}
