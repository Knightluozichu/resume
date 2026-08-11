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
  { label: "represent", caption: "先声明 directed、weighted 与 adjacency 语义" },
  { label: "frontier", caption: "BFS 用 FIFO frontier 展开距离层" },
  { label: "discover", caption: "DFS 首次发现 vertex 并记录 parent" },
  { label: "finish", caption: "DFS 完成 vertex，形成嵌套时间区间" },
  { label: "order", caption: "DAG 按 reverse finish order 排出拓扑序" },
  { label: "transpose", caption: "在 transpose 上第二遍 DFS 提取 SCC" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "representation" | "bfs" | "dfs" | "topo" | "scc";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  representation: {
    title: "图的表示",
    field: "adjacency list / matrix",
    result: "space = V + E",
    claim: "先固定边的语义，再讨论遍历成本",
  },
  bfs: {
    title: "广度优先搜索",
    field: "distance + FIFO queue",
    result: "layers 0 → 1 → 2",
    claim: "首次发现即得到无权最短距离",
  },
  dfs: {
    title: "深度优先搜索",
    field: "discover / finish time",
    result: "nested intervals",
    claim: "GRAY ancestor 暗示 back edge",
  },
  topo: {
    title: "拓扑排序",
    field: "DAG + reverse finish",
    result: "A → B → C",
    claim: "每条有向边都从前指向后",
  },
  scc: {
    title: "强连通分量",
    field: "G then transpose Gᵀ",
    result: "2 DFS passes",
    claim: "condensation graph 必为 DAG",
  },
};

export function Clrs4Chapter20ElementaryGraphAlgorithmsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("representation");

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
  const isScc = mode === "scc";

  function reset() {
    timeline.goToStep(0);
    setMode("representation");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch20-elementary-graph-algorithms"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 20 · Elementary Graph Algorithms
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              同一张图，遍历策略如何改变证明对象？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换表示、BFS、DFS、拓扑排序和 SCC，沿时间线观察 frontier、timestamp、finish order 与 transpose 如何各自授权一个结论。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择图算法机制</span>
          <select
            aria-label="选择图的表示、广度优先搜索、深度优先搜索、拓扑排序或强连通分量"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="representation">图的表示 · list or matrix</option>
            <option value="bfs">广度优先搜索 · FIFO layers</option>
            <option value="dfs">深度优先搜索 · timestamps</option>
            <option value="topo">拓扑排序 · reverse finish</option>
            <option value="scc">强连通分量 · transpose passes</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 760"
          role="img"
          aria-label="CLRS 4e Chapter 20 专属 elementary graph algorithms 实验。覆盖 elementary graph algorithms、基本图算法、representations of graphs、图的表示、breadth-first search、广度优先搜索、depth-first search、深度优先搜索、topological sort、拓扑排序、strongly connected components、强连通分量。展示 adjacency list 与 matrix、BFS FIFO layers、DFS discovery finish timestamps、topological reverse finish order、transpose 上的两遍 DFS 与故障证据，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch20-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch20-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch20-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="760" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            represent → frontier → discover → finish → order → transpose
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            elementary graph algorithms · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>directed · weighted · parallel edges</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>每个 adjacency entry 只被扫描有限次</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch20-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>证明载体</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>状态改变后才能授权结论</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>时间、距离与组件要分开解释</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isScc ? C.accent : C.success} strokeWidth="2.5" markerEnd={isScc ? "url(#clrs4-ch20-arrow)" : "url(#clrs4-ch20-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isScc ? C.accent : C.success} fillOpacity="0.1" stroke={isScc ? C.accent : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isScc ? C.accent : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.title}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>结论必须匹配状态证据</text>

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
                <rect x="30" y={222 + index * 56} width="840" height="48" rx="10" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y={244 + index * 56} fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y={244 + index * 56} fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y={261 + index * 56} fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y={261 + index * 56} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "contract" : index === 1 ? "distance" : index === 2 ? "parent" : index === 3 ? "interval" : index === 4 ? "DAG" : "SCC"}</text>
              </g>
            );
          })}

          <text x="30" y="570" fontSize="13" fontWeight="700" fill={C.primary}>图状态与证明证据</text>
          <text x="870" y="570" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一张小图</text>

          {mode === "representation" && (
            <>
              <text x="54" y="600" fontSize="13" fontWeight="700" fill={C.primary}>同一张图的两种存储合同</text>
              <rect x="54" y="620" width="360" height="82" rx="12" fill={C.elevated} stroke={C.accent} strokeWidth="1.5" />
              <text x="76" y="648" fontSize="12" fontWeight="700" fill={C.accent}>adjacency list</text>
              <text x="76" y="674" fontSize="11" fill={C.secondary}>空间 Θ(V+E) · 枚举邻居 Θ(deg(u))</text>
              <rect x="474" y="620" width="372" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="496" y="648" fontSize="12" fontWeight="700" fill={C.primary}>adjacency matrix</text>
              <text x="496" y="674" fontSize="11" fill={C.secondary}>空间 Θ(V²) · 查询 edge membership 为 O(1)</text>
            </>
          )}

          {mode === "bfs" && (
            <>
              <text x="54" y="600" fontSize="13" fontWeight="700" fill={C.primary}>BFS：FIFO frontier 让距离分层可证</text>
              <line x1="142" y1="650" x2="286" y2="650" stroke={C.border} strokeWidth="2" />
              <line x1="286" y1="650" x2="430" y2="650" stroke={C.border} strokeWidth="2" />
              <line x1="286" y1="650" x2="286" y2="708" stroke={C.border} strokeWidth="2" />
              <circle cx="142" cy="650" r="26" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="286" cy="650" r="26" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <circle cx="430" cy="650" r="26" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <circle cx="286" cy="708" r="26" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="142" y="655" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>s·0</text>
              <text x="286" y="655" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.success}>a·1</text>
              <text x="430" y="655" textAnchor="middle" fontSize="13" fill={C.primary}>b·2</text>
              <text x="286" y="713" textAnchor="middle" fontSize="13" fill={C.primary}>c·2</text>
              <text x="548" y="648" fontSize="12" fontWeight="700" fill={C.success}>queue：a, b, c</text>
              <text x="548" y="674" fontSize="11" fill={C.secondary}>首次发现时设置 parent 和 distance</text>
              <text x="548" y="698" fontSize="11" fill={C.secondary}>每个 vertex 只入队一次 → O(V+E)</text>
            </>
          )}

          {mode === "dfs" && (
            <>
              <text x="54" y="600" fontSize="13" fontWeight="700" fill={C.primary}>DFS：discover / finish 形成嵌套区间</text>
              <rect x="54" y="624" width="792" height="76" rx="12" fill={C.elevated} stroke={C.accent} strokeWidth="1.5" />
              <line x1="92" y1="650" x2="808" y2="650" stroke={C.border} strokeWidth="1.5" />
              <rect x="126" y="635" width="548" height="30" rx="8" fill={C.accent} fillOpacity="0.12" stroke={C.accent} />
              <rect x="226" y="642" width="300" height="16" rx="6" fill={C.success} fillOpacity="0.16" stroke={C.success} />
              <text x="140" y="655" fontSize="11" fontWeight="700" fill={C.accent}>u: d=1</text>
              <text x="238" y="654" fontSize="11" fill={C.success}>v: d=2 · f=5</text>
              <text x="686" y="655" fontSize="11" fontWeight="700" fill={C.accent}>u: f=6</text>
              <text x="92" y="688" fontSize="11" fill={C.secondary}>完整包含关系 = ancestor；遇到 GRAY ancestor = back edge</text>
              <text x="808" y="688" textAnchor="end" fontSize="11" fill={C.success}>2|V| timestamps</text>
            </>
          )}

          {mode === "topo" && (
            <>
              <text x="54" y="600" fontSize="13" fontWeight="700" fill={C.primary}>拓扑排序：DAG 的 reverse finish order</text>
              <line x1="154" y1="654" x2="300" y2="654" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch20-success-arrow)" />
              <line x1="372" y1="654" x2="518" y2="654" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch20-success-arrow)" />
              <circle cx="118" cy="654" r="32" fill={C.elevated} stroke={C.accent} strokeWidth="2" />
              <circle cx="336" cy="654" r="32" fill={C.elevated} stroke={C.accent} strokeWidth="2" />
              <circle cx="554" cy="654" r="32" fill={C.elevated} stroke={C.accent} strokeWidth="2" />
              <text x="118" y="660" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.primary}>A</text>
              <text x="336" y="660" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.primary}>B</text>
              <text x="554" y="660" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.primary}>C</text>
              <text x="648" y="642" fontSize="12" fontWeight="700" fill={C.success}>order = [A, B, C]</text>
              <text x="648" y="668" fontSize="11" fill={C.secondary}>每条 edge 都从前指向后</text>
              <text x="54" y="708" fontSize="11" fill={C.secondary}>若遇到 GRAY vertex，出现 back edge，图不是 DAG，不能输出拓扑序。</text>
            </>
          )}

          {mode === "scc" && (
            <>
              <text x="54" y="600" fontSize="13" fontWeight="700" fill={C.primary}>SCC：在 transpose 上重放第二遍 DFS</text>
              <rect x="54" y="620" width="330" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="646" fontSize="12" fontWeight="700" fill={C.primary}>G · first pass</text>
              <text x="76" y="674" fontSize="11" fill={C.secondary}>finish order：component A 先完成</text>
              <line x1="408" y1="661" x2="480" y2="661" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#clrs4-ch20-arrow)" />
              <rect x="504" y="620" width="342" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <text x="526" y="646" fontSize="12" fontWeight="700" fill={C.accent}>Gᵀ · second pass</text>
              <text x="526" y="674" fontSize="11" fill={C.secondary}>按递减 finish 顺序，每棵树 = 一个 SCC</text>
              <text x="54" y="728" fontSize="11" fill={C.secondary}>condensation graph 是 DAG；转置只反向组件之间的边，不破坏组件内部互达。</text>
            </>
          )}

          <rect x="30" y="735" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="748" fontSize="11" fill={C.secondary}>端到端证书：representation · frontier/time · parenthesis · edge direction · transpose</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先声明图和边的合同，再选择 frontier 或 timestamp；每个结论都必须能指回一种状态证据。"
          reset={{ label: "重置实验", ariaLabel: "重置基本图算法实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        基本图算法共享 O(V+E) 的扫描骨架，却分别用距离层、时间区间、完成顺序和转置图证明不同结论。
      </figcaption>
    </figure>
  );
}
