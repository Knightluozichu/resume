"use client";

import { useMemo, useState } from "react";

import { easeInOut } from "../gamemath/animotor";

type AlgorithmMode =
  | "binary-search"
  | "selection-sort"
  | "recursion"
  | "quicksort"
  | "hash"
  | "bfs"
  | "dijkstra"
  | "greedy"
  | "dynamic-programming"
  | "knn"
  | "trees"
  | "balanced-trees"
  | "next-steps";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  value: number;
  group: "hot" | "cool" | "ok" | "warn";
};

type Props = {
  mode: AlgorithmMode;
  title?: string;
  focus?: string;
};

const MODE_LABELS: Record<AlgorithmMode, string> = {
  "binary-search": "二分查找",
  "selection-sort": "选择排序",
  recursion: "递归",
  quicksort: "快速排序",
  hash: "散列表",
  bfs: "广度优先搜索",
  dijkstra: "狄克斯特拉算法",
  greedy: "贪心算法",
  "dynamic-programming": "动态规划",
  knn: "K 近邻",
  trees: "树",
  "balanced-trees": "平衡树",
  "next-steps": "下一步",
};

const ARRAYS: Record<AlgorithmMode, number[]> = {
  "binary-search": [3, 8, 13, 21, 34, 55, 89],
  "selection-sort": [29, 10, 14, 37, 13, 8, 25],
  recursion: [5, 4, 3, 2, 1, 0, 1],
  quicksort: [33, 12, 48, 7, 25, 41, 16],
  hash: [9, 16, 23, 30, 37, 44, 51],
  bfs: [1, 1, 2, 2, 3, 3, 4],
  dijkstra: [0, 2, 5, 6, 8, 9, 12],
  greedy: [40, 30, 25, 20, 15, 10, 5],
  "dynamic-programming": [1, 2, 3, 5, 8, 13, 21],
  knn: [2, 4, 5, 7, 8, 10, 11],
  trees: [50, 25, 75, 12, 35, 62, 90],
  "balanced-trees": [40, 20, 60, 10, 30, 50, 70],
  "next-steps": [1, 3, 6, 10, 15, 21, 28],
};

const STEPS: Record<AlgorithmMode, string[]> = {
  "binary-search": ["取中点", "砍掉一半", "继续折半", "命中目标"],
  "selection-sort": ["扫最小", "交换到前面", "缩小未排序区", "重复"],
  recursion: ["基线条件", "压栈", "返回", "合并答案"],
  quicksort: ["选枢轴", "分区", "递归左右", "拼回结果"],
  hash: ["算哈希", "落桶", "处理冲突", "常数级读取"],
  bfs: ["入队邻居", "先进先出", "按层扩散", "找到最短边数"],
  dijkstra: ["取最近点", "松弛边", "更新父节点", "锁定路径"],
  greedy: ["局部选择", "覆盖最多", "删掉已覆盖", "近似完成"],
  "dynamic-programming": ["拆子问题", "填表", "复用最优值", "回溯答案"],
  knn: ["量距离", "找邻居", "投票/平均", "预测新点"],
  trees: ["比较键", "走左/右", "缩小范围", "插入叶子"],
  "balanced-trees": ["旋转观察", "保持高度", "限制退化", "稳定查询"],
  "next-steps": ["识别图形", "选策略", "估复杂度", "继续练习"],
};

const GRAPH_NODES: Record<AlgorithmMode, Node[]> = {
  "binary-search": [],
  "selection-sort": [],
  recursion: [],
  quicksort: [],
  hash: [],
  bfs: [
    { id: "you", label: "你", x: 120, y: 92, value: 0, group: "hot" },
    { id: "a", label: "A", x: 250, y: 52, value: 1, group: "ok" },
    { id: "b", label: "B", x: 250, y: 132, value: 1, group: "ok" },
    { id: "c", label: "C", x: 380, y: 42, value: 2, group: "cool" },
    { id: "d", label: "D", x: 390, y: 142, value: 2, group: "warn" },
    { id: "goal", label: "目标", x: 515, y: 92, value: 3, group: "hot" },
  ],
  dijkstra: [
    { id: "s", label: "S", x: 115, y: 98, value: 0, group: "hot" },
    { id: "a", label: "A 2", x: 245, y: 52, value: 2, group: "ok" },
    { id: "b", label: "B 5", x: 245, y: 145, value: 5, group: "cool" },
    { id: "c", label: "C 6", x: 390, y: 72, value: 6, group: "ok" },
    { id: "f", label: "终点", x: 525, y: 112, value: 8, group: "hot" },
  ],
  greedy: [],
  "dynamic-programming": [],
  knn: [],
  trees: [
    { id: "50", label: "50", x: 320, y: 38, value: 50, group: "hot" },
    { id: "25", label: "25", x: 205, y: 112, value: 25, group: "ok" },
    { id: "75", label: "75", x: 435, y: 112, value: 75, group: "ok" },
    { id: "12", label: "12", x: 145, y: 188, value: 12, group: "cool" },
    { id: "35", label: "35", x: 260, y: 188, value: 35, group: "cool" },
    { id: "62", label: "62", x: 380, y: 188, value: 62, group: "cool" },
    { id: "90", label: "90", x: 495, y: 188, value: 90, group: "cool" },
  ],
  "balanced-trees": [
    { id: "40", label: "40", x: 320, y: 44, value: 40, group: "hot" },
    { id: "20", label: "20", x: 205, y: 118, value: 20, group: "ok" },
    { id: "60", label: "60", x: 435, y: 118, value: 60, group: "ok" },
    { id: "10", label: "10", x: 145, y: 190, value: 10, group: "cool" },
    { id: "30", label: "30", x: 260, y: 190, value: 30, group: "cool" },
    { id: "50", label: "50", x: 380, y: 190, value: 50, group: "cool" },
    { id: "70", label: "70", x: 495, y: 190, value: 70, group: "cool" },
  ],
  "next-steps": [],
};

const EDGES: Record<string, [string, string, string?][]> = {
  bfs: [
    ["you", "a"],
    ["you", "b"],
    ["a", "c"],
    ["b", "d"],
    ["c", "goal"],
    ["d", "goal"],
  ],
  dijkstra: [
    ["s", "a", "2"],
    ["s", "b", "5"],
    ["a", "c", "4"],
    ["b", "c", "1"],
    ["c", "f", "2"],
  ],
  trees: [
    ["50", "25"],
    ["50", "75"],
    ["25", "12"],
    ["25", "35"],
    ["75", "62"],
    ["75", "90"],
  ],
  "balanced-trees": [
    ["40", "20"],
    ["40", "60"],
    ["20", "10"],
    ["20", "30"],
    ["60", "50"],
    ["60", "70"],
  ],
};

function colorFor(group: Node["group"]) {
  if (group === "hot") return "#f97316";
  if (group === "ok") return "#14b8a6";
  if (group === "warn") return "#ef4444";
  return "#64748b";
}

function isGraphMode(mode: AlgorithmMode) {
  return GRAPH_NODES[mode].length > 0;
}

function cellColor(index: number, active: number, mode: AlgorithmMode) {
  if (mode === "binary-search") {
    return index === active
      ? "#f97316"
      : Math.abs(index - active) <= 1
        ? "#14b8a6"
        : "#cbd5e1";
  }
  if (mode === "dynamic-programming")
    return index <= active ? "#14b8a6" : "#dbeafe";
  if (mode === "hash") return index === active ? "#f97316" : "#e2e8f0";
  if (mode === "knn") return index <= active ? "#6366f1" : "#cbd5e1";
  return index <= active ? "#f97316" : "#cbd5e1";
}

function complexityLine(mode: AlgorithmMode) {
  const lines: Record<AlgorithmMode, string> = {
    "binary-search": "O(log n)：每一步丢掉半个搜索空间",
    "selection-sort": "O(n^2)：每轮都要扫一遍剩余元素",
    recursion: "递归 = 基线条件 + 逐层缩小的问题",
    quicksort: "平均 O(n log n)：好枢轴让左右规模接近",
    hash: "平均 O(1)：好哈希把键均匀分散到桶",
    bfs: "O(V + E)：队列按层推进，边数最短",
    dijkstra: "非负权图最短路：反复锁定当前最低成本",
    greedy: "快，但要证明局部选择不会破坏全局目标",
    "dynamic-programming": "用表缓存重叠子问题，避免重复算",
    knn: "惰性学习：预测时才比较距离",
    trees: "平衡时 O(log n)，退化时会变成链表",
    "balanced-trees": "旋转维持高度，避免最坏情况退化",
    "next-steps": "先识别结构，再选择算法家族",
  };
  return lines[mode];
}

export function AlgorithmPlayground({ mode, title, focus }: Props) {
  const [step, setStep] = useState(1);
  const [speed, setSpeed] = useState(55);
  const [detail, setDetail] = useState(60);
  const values = ARRAYS[mode];
  const max = Math.max(...values);
  const progress = easeInOut(step / 4);
  const active = Math.min(
    values.length - 1,
    Math.round(progress * (values.length - 1)),
  );
  const nodes = GRAPH_NODES[mode];
  const nodeById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );
  const graphMode = isGraphMode(mode);
  const modeTitle = title ?? MODE_LABELS[mode];

  return (
    <section className="not-prose my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 border-b border-slate-200 bg-slate-50 p-4 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Algorithm lab
              </p>
              <h3 className="text-lg font-semibold text-slate-950">
                {modeTitle}
              </h3>
            </div>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">
              {STEPS[mode][step - 1]}
            </span>
          </div>

          <svg
            viewBox="0 0 640 300"
            role="img"
            aria-label={`${modeTitle} 可视化`}
            className="h-auto w-full"
          >
            <rect x="0" y="0" width="640" height="300" rx="18" fill="#f8fafc" />
            <line
              x1="42"
              y1="246"
              x2="598"
              y2="246"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {graphMode ? (
              <g>
                {(EDGES[mode] ?? []).map(([from, to, weight], index) => {
                  const a = nodeById.get(from);
                  const b = nodeById.get(to);
                  if (!a || !b) return null;
                  const lit = index <= active;
                  return (
                    <g key={`${from}-${to}`}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={lit ? "#f97316" : "#cbd5e1"}
                        strokeWidth={lit ? 4 : 2}
                        strokeLinecap="round"
                      />
                      {weight ? (
                        <text
                          x={(a.x + b.x) / 2}
                          y={(a.y + b.y) / 2 - 8}
                          textAnchor="middle"
                          className="fill-slate-600 text-[14px] font-semibold"
                        >
                          {weight}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
                {nodes.map((node, index) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={index <= active ? 26 : 22}
                      fill={index <= active ? colorFor(node.group) : "#ffffff"}
                      stroke={colorFor(node.group)}
                      strokeWidth="3"
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
                      textAnchor="middle"
                      className={
                        index <= active
                          ? "fill-white text-[15px] font-bold"
                          : "fill-slate-700 text-[15px] font-bold"
                      }
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </g>
            ) : mode === "dynamic-programming" ? (
              <g>
                {values.map((value, index) => {
                  const x = 58 + index * 76;
                  const y = 76 + (index % 2) * 58;
                  return (
                    <g key={`${value}-${index}`}>
                      <rect
                        x={x}
                        y={y}
                        width="58"
                        height="46"
                        rx="8"
                        fill={cellColor(index, active, mode)}
                      />
                      <text
                        x={x + 29}
                        y={y + 29}
                        textAnchor="middle"
                        className="fill-white text-[16px] font-bold"
                      >
                        {value}
                      </text>
                      {index > 0 ? (
                        <path
                          d={`M ${x - 20} ${y + 23} C ${x - 34} ${y - 18}, ${x + 16} ${y - 34}, ${x + 28} ${y - 4}`}
                          fill="none"
                          stroke={index <= active ? "#14b8a6" : "#cbd5e1"}
                          strokeWidth="3"
                        />
                      ) : null}
                    </g>
                  );
                })}
                <rect
                  x="112"
                  y="205"
                  width={Math.max(48, active * 72)}
                  height="18"
                  rx="9"
                  fill="#14b8a6"
                  opacity="0.85"
                />
                <text
                  x="320"
                  y="230"
                  textAnchor="middle"
                  className="fill-slate-600 text-[14px] font-semibold"
                >
                  表格把已算过的子问题留在原地
                </text>
              </g>
            ) : (
              <g>
                <path
                  d="M 70 218 C 160 208, 230 174, 306 138 S 475 88, 565 48"
                  fill="none"
                  stroke="#94a3b8"
                  strokeDasharray="7 7"
                  strokeWidth="3"
                  opacity="0.75"
                />
                <text
                  x="542"
                  y="42"
                  textAnchor="middle"
                  className="fill-slate-500 text-[12px] font-semibold"
                >
                  增长趋势
                </text>
                {values.map((value, index) => {
                  const width = 54;
                  const gap = 20;
                  const x = 60 + index * (width + gap);
                  const height = 38 + (value / max) * 128;
                  const y = 246 - height;
                  return (
                    <g key={`${value}-${index}`}>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx="8"
                        fill={cellColor(index, active, mode)}
                      />
                      <text
                        x={x + width / 2}
                        y={y - 10}
                        textAnchor="middle"
                        className="fill-slate-700 text-[14px] font-bold"
                      >
                        {value}
                      </text>
                      <text
                        x={x + width / 2}
                        y="270"
                        textAnchor="middle"
                        className="fill-slate-500 text-[12px] font-semibold"
                      >
                        {index}
                      </text>
                    </g>
                  );
                })}
                <path
                  d={`M ${70 + active * 74} 58 l 24 -28 l 24 28`}
                  fill="#f97316"
                  opacity={0.85}
                />
                <text
                  x="320"
                  y="38"
                  textAnchor="middle"
                  className="fill-slate-700 text-[14px] font-semibold"
                >
                  {focus ?? complexityLine(mode)}
                </text>
              </g>
            )}
          </svg>
        </div>

        <div className="space-y-5 p-4">
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>步骤</span>
              <span>{step}/4</span>
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={step}
              onChange={(event) => setStep(Number(event.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>节奏</span>
              <span>{speed}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="w-full accent-teal-500"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>展开</span>
              <span>{detail}%</span>
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={detail}
              onChange={(event) => setDetail(Number(event.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>
          <div className="rounded-md bg-slate-950 p-3 text-sm leading-6 text-slate-100">
            <p className="font-semibold text-orange-200">
              {complexityLine(mode)}
            </p>
            <p className="mt-1 text-slate-300">
              把滑杆推到下一步，只观察一个变量：搜索空间、队列、表格、树高或候选集如何变小。
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setSpeed(55);
              setDetail(60);
            }}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50"
          >
            重置动画
          </button>
        </div>
      </div>
    </section>
  );
}
