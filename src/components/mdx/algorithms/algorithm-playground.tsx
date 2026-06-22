"use client";

import { useCallback, useState, type ReactNode } from "react";

type AlgorithmMode =
  | "binary-search" | "selection-sort" | "recursion" | "quicksort"
  | "hash" | "bfs" | "dijkstra" | "greedy" | "dynamic-programming"
  | "knn" | "trees" | "balanced-trees" | "next-steps";

type Props = {
  mode: AlgorithmMode;
  title?: string;
  focus?: string;
  /** Stepper 外部控制当前步 (1-4)，传入时替换内部 state */
  currentStep?: number;
  /** 自定义每步的 SVG 子内容（可选，替换默认的柱状图/图节点） */
  stepVisuals?: ReactNode[];
};

/* ---- mode labels ---- */
const MODE_LABELS: Record<AlgorithmMode, string> = {
  "binary-search": "二分查找", "selection-sort": "选择排序",
  recursion: "递归", quicksort: "快速排序",
  hash: "散列表", bfs: "广度优先搜索",
  dijkstra: "狄克斯特拉算法", greedy: "贪心算法",
  "dynamic-programming": "动态规划", knn: "K 近邻",
  trees: "树", "balanced-trees": "平衡树", "next-steps": "下一步",
};

/* ---- step labels ---- */
const STEPS: Record<AlgorithmMode, string[]> = {
  "binary-search": ["看数组", "取中点", "砍半搜索", "命中目标"],
  "selection-sort": ["全量扫描", "挑最小值", "交换到前面", "重复直到有序"],
  recursion: ["基线条件", "压栈递进", "逐层返回", "合并答案"],
  quicksort: ["选枢轴(pivot)", "分区partition", "递归左右子数组", "拼接结果"],
  hash: ["计算哈希值", "落入桶", "处理冲突", "O(1) 读取"],
  bfs: ["起点入队", "逐层出队扩散", "标记已访问", "找到最短边数"],
  dijkstra: ["从起点开始", "挑最近未处理点", "松弛(relax)边", "锁定最短路径"],
  greedy: ["局部最优选择", "覆盖最多未覆盖", "删除已覆盖", "近似全局最优"],
  "dynamic-programming": ["拆分子问题", "建表填值", "复用最优子结构", "回溯答案"],
  knn: ["计算距离", "找 k 个最近邻", "投票/平均", "预测新点"],
  trees: ["比较节点键值", "走左/右子树", "递归缩小范围", "O(log n) 插入"],
  "balanced-trees": ["插入导致失衡", "判断旋转类型", "执行 AVL/RB 旋转", "恢复 log n 高度"],
  "next-steps": ["识别问题结构", "匹配算法家族", "估算复杂度", "编码练习"],
};

/* Design-token colours for nodes */
const TONE: Record<string, string> = {
  accent: "var(--accent)", success: "var(--success)",
  warning: "var(--warning)", danger: "var(--danger)",
  info: "var(--accent)", mute: "var(--text-secondary)",
};

/* ---- graph nodes (only for modes that have actual graph data) ---- */
type GNode = { id: string; label: string; x: number; y: number; val: number; tone: string };

const BFS_NODES: GNode[] = [
  { id: "you", label: "你", x: 120, y: 100, val: 0, tone: TONE.warning },
  { id: "A", label: "A", x: 250, y: 52, val: 1, tone: TONE.info },
  { id: "B", label: "B", x: 250, y: 148, val: 1, tone: TONE.info },
  { id: "C", x: 380, y: 42, val: 2, tone: TONE.mute, label: "C" },
  { id: "D", x: 390, y: 148, val: 2, tone: TONE.mute, label: "D" },
  { id: "goal", label: "目标", x: 520, y: 100, val: 3, tone: TONE.success },
];

const DIJKSTRA_NODES: GNode[] = [
  { id: "S", label: "S 0", x: 115, y: 100, val: 0, tone: TONE.warning },
  { id: "A", label: "A 2", x: 245, y: 52, val: 2, tone: TONE.info },
  { id: "B", label: "B 5", x: 245, y: 148, val: 5, tone: TONE.info },
  { id: "C", label: "C 6", x: 390, y: 72, val: 6, tone: TONE.mute },
  { id: "F", label: "终 8", x: 525, y: 112, val: 8, tone: TONE.success },
];

const TREE_NODES: GNode[] = [
  { id: "50", label: "50", x: 320, y: 38, val: 50, tone: TONE.warning },
  { id: "25", label: "25", x: 205, y: 112, val: 25, tone: TONE.info },
  { id: "75", label: "75", x: 435, y: 112, val: 75, tone: TONE.info },
  { id: "12", label: "12", x: 145, y: 188, val: 12, tone: TONE.mute },
  { id: "35", label: "35", x: 260, y: 188, val: 35, tone: TONE.mute },
  { id: "62", label: "62", x: 380, y: 188, val: 62, tone: TONE.mute },
  { id: "90", label: "90", x: 495, y: 188, val: 90, tone: TONE.mute },
];

const BAL_TREE_NODES: GNode[] = [
  { id: "40", label: "40", x: 320, y: 44, val: 40, tone: TONE.warning },
  { id: "20", label: "20", x: 205, y: 118, val: 20, tone: TONE.info },
  { id: "60", label: "60", x: 435, y: 118, val: 60, tone: TONE.info },
  { id: "10", label: "10", x: 145, y: 190, val: 10, tone: TONE.mute },
  { id: "30", label: "30", x: 260, y: 190, val: 30, tone: TONE.mute },
  { id: "50b", label: "50", x: 380, y: 190, val: 50, tone: TONE.mute },
  { id: "70", label: "70", x: 495, y: 190, val: 70, tone: TONE.mute },
];

const GRAPH_NODES: Record<AlgorithmMode, GNode[]> = {
  bfs: BFS_NODES, dijkstra: DIJKSTRA_NODES,
  trees: TREE_NODES, "balanced-trees": BAL_TREE_NODES,
  "binary-search": [], "selection-sort": [], recursion: [], quicksort: [],
  hash: [], greedy: [], "dynamic-programming": [], knn: [], "next-steps": [],
};

const BFS_EDGES: [number, number][] = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]];
const DIJK_EDGES: [number, number, string][] = [[0,1,"2"],[0,2,"5"],[1,3,"4"],[2,3,"1"],[3,4,"2"]];
const TREE_EDGES: [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
const BAL_EDGES: [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];

function edgeList(mode: AlgorithmMode): { from: number; to: number; label?: string }[] {
  const nodes = GRAPH_NODES[mode];
  if (mode === "bfs") return BFS_EDGES.map(([f, t]) => ({ from: f, to: t }));
  if (mode === "dijkstra") return DIJK_EDGES.map(([f, t, l]) => ({ from: f, to: t, label: l }));
  if (mode === "trees" || mode === "balanced-trees") return (mode === "trees" ? TREE_EDGES : BAL_EDGES).map(([f, t]) => ({ from: f, to: t }));
  return Array.from({ length: Math.max(0, nodes.length - 1) }, (_, i) => ({ from: i, to: i + 1 }));
}

/* ---- complexity labels ---- */
const COMPLEXITY: Record<AlgorithmMode, string> = {
  "binary-search": "O(log n)：每步丢掉半个搜索空间",
  "selection-sort": "O(n²)：每轮扫描剩余全部元素",
  recursion: "递归 = 基线条件 + 子问题缩小",
  quicksort: "平均 O(n log n)：好 pivot 让左右接近",
  hash: "平均 O(1)：好哈希均匀落桶",
  bfs: "O(V+E)：队列逐层推进",
  dijkstra: "非负权最短路，反复锁定最低成本点",
  greedy: "局部最优不保证全局最优",
  "dynamic-programming": "表缓存子问题，避免重复计算",
  knn: "惰性学习：预测时才比较距离",
  trees: "平衡时 O(log n)，退化时变链表",
  "balanced-trees": "旋转维持高度，保证 O(log n)",
  "next-steps": "先识别结构，再选算法家族",
};

/* ---- Sample data values for bar chart modes ---- */
const SAMPLE_DATA: Record<AlgorithmMode, number[]> = {
  "binary-search": [3, 8, 13, 21, 34, 55, 89],
  "selection-sort": [29, 14, 37, 10, 25, 8, 13],
  recursion: [1, 2, 6, 24, 120, 720, 5040],
  quicksort: [33, 12, 48, 7, 25, 41, 16],
  hash: [9, 16, 23, 30, 37, 44, 51],
  bfs: [], dijkstra: [], trees: [], "balanced-trees": [],
  greedy: [40, 30, 25, 20, 15, 10, 5],
  "dynamic-programming": [0, 1, 1, 2, 3, 5, 8],
  knn: [2, 4, 5, 7, 8, 10, 11],
  "next-steps": [1, 3, 6, 10, 15, 21, 28],
};

function cardW(text: string) { return Math.max(64, Math.min(120, text.length * 9.5 + 40)); }

export function AlgorithmPlayground({ mode, title, focus, currentStep, stepVisuals }: Props) {
  const [internalStep, setInternalStep] = useState(1);
  const step = currentStep ?? internalStep;
  const nodes = GRAPH_NODES[mode];
  const isGraph = nodes.length > 0;
  const values = SAMPLE_DATA[mode];
  const maxVal = Math.max(...(values.length ? values : [1]));
  const label = title ?? MODE_LABELS[mode];
  const stepText = STEPS[mode]?.[step - 1] ?? label;
  const complexityText = focus ?? COMPLEXITY[mode];
  const edges = isGraph ? edgeList(mode) : [];

  return (
    <section className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="grid gap-0 lg:grid-cols-[1fr_268px]">
        {/* ---- visualisation panel ---- */}
        <div className="border-b border-border bg-bg p-4 lg:border-r lg:border-b-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">Algorithm Lab</p>
              <h3 className="text-lg font-semibold text-primary">{label}</h3>
            </div>
            <span className="rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent">{stepText}</span>
          </div>

          {stepVisuals?.[step - 1] ? (
            <div className="flex items-center justify-center py-6">{stepVisuals[step - 1]}</div>
          ) : isGraph ? (
            <svg viewBox="0 0 640 320" role="img" aria-label={label} className="h-auto w-full">
              {edges.map(({ from, to, label: lbl }, idx) => {
                const a = nodes[from], b = nodes[to];
                if (!a || !b) return null;
                const lit = idx < step;
                return (
                  <g key={`e${from}-${to}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={lit ? "var(--accent)" : "var(--border)"}
                      strokeWidth={lit ? 3 : 1.5} strokeLinecap="round" opacity={lit ? 1 : 0.3} />
                    {lbl ? <text x={(a.x+b.x)/2} y={(a.y+b.y)/2-8} textAnchor="middle" fontSize="12" fontWeight="600" fill={lit ? "var(--accent)" : "var(--text-secondary)"}>{lbl}</text> : null}
                  </g>
                );
              })}
              {nodes.map((n, idx) => {
                const lit = idx < step;
                const r = lit ? 28 : 22;
                return (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={r} fill={lit ? n.tone : "var(--bg-elevated)"} stroke={n.tone} strokeWidth="2.5" opacity={lit ? 1 : 0.35} />
                    <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={lit ? "var(--bg)" : "var(--text-secondary)"}>{n.label}</text>
                  </g>
                );
              })}
              <text x="320" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">{complexityText}</text>
            </svg>
          ) : mode === "dynamic-programming" ? (
            <svg viewBox="0 0 640 300" role="img" aria-label={label} className="h-auto w-full">
              {values.map((v, i) => {
                const x = 58 + i * 76, y = 76 + (i % 2) * 58;
                const lit = i <= Math.round((step / 4) * (values.length - 1));
                return (
                  <g key={i}>
                    <rect x={x} y={y} width="58" height="46" rx="8" fill={lit ? "var(--accent)" : "var(--bg-elevated)"} stroke="var(--border)" strokeWidth="1.5" />
                    <text x={x+29} y={y+29} textAnchor="middle" fontSize="16" fontWeight="bold" fill={lit ? "var(--bg)" : "var(--text-secondary)"}>{v}</text>
                    {i > 0 && <path d={`M ${x-20} ${y+23} C ${x-34} ${y-18}, ${x+16} ${y-34}, ${x+28} ${y-4}`} fill="none" stroke={lit ? "var(--success)" : "var(--border)"} strokeWidth="2.5" opacity={lit ? 0.8 : 0.25} />}
                  </g>
                );
              })}
              <text x="320" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">{complexityText}</text>
            </svg>
          ) : (
            <svg viewBox="0 0 640 300" role="img" aria-label={label} className="h-auto w-full">
              {/* trend line */}
              <path d="M 70 218 C 160 208, 230 174, 306 138 S 475 88, 565 48" fill="none" stroke="var(--border)" strokeDasharray="6 6" strokeWidth="2" opacity="0.5" />
              <text x="542" y="42" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">增长趋势</text>
              {values.map((v, i) => {
                const w = 48, gap = 22, x = 60 + i * (w + gap);
                const h = 34 + (v / maxVal) * 130, y = 246 - h;
                const lit = i <= Math.round((step / 3) * (values.length - 1));
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={w} height={h} rx="8" fill={lit ? "var(--accent)" : "var(--bg-elevated)"} stroke="var(--border)" strokeWidth="1.5" />
                    <text x={x + w/2} y={y - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill={lit ? "var(--accent)" : "var(--text-secondary)"}>{v}</text>
                  </g>
                );
              })}
              <text x="320" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">{complexityText}</text>
            </svg>
          )}
        </div>

        {/* ---- controls ---- */}
        <div className="space-y-4 p-4">
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-primary">
              <span>步骤</span>
              <span className="font-mono tabular-nums text-accent">{step}/4</span>
            </label>
            {currentStep !== undefined ? (
              <div className="flex gap-1">
                {[1,2,3,4].map(s => (
                  <div key={s} className={`h-2 flex-1 rounded-full transition-colors duration-(--duration-hover) ease-standard ${s <= step ? "bg-accent" : "bg-border"}`} />
                ))}
              </div>
            ) : (
              <input type="range" min="1" max="4" value={step} onChange={e => setInternalStep(Number(e.target.value))} className="mdx-range w-full accent-accent" />
            )}
          </div>
          <div className="rounded-control border border-accent/20 bg-accent/5 p-3 text-sm">
            <p className="font-semibold text-accent">{stepText}</p>
            <p className="mt-1 text-xs text-secondary">{complexityText}</p>
          </div>
          <button type="button" onClick={() => setInternalStep(1)}
            className="w-full rounded-control border border-border px-3 py-2 text-sm font-semibold text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary">
            重置演示
          </button>
        </div>
      </div>
    </section>
  );
}
