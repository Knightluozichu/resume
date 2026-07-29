"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-4.2",
  title: "4.2 · Directed Graphs",
  focus: "用有向可达、环检测、拓扑序与强连通分量区分方向性结构问题",
  formula: "DFS/BFS、拓扑排序与 Kosaraju-Sharir SCC 都可在线性 Θ(V+E) 时间完成",
  invariant:
    "拓扑序要求每条边 v→w 都满足 order(v) 小于 order(w)；同一 SCC 内顶点两两可达",
  fault:
    "检测有向环时递归返回后未清除 onStack，或 SCC 第一遍没有在反向图上取逆后序",
  evidence:
    "原图/反向图、marked、onStack、edgeTo、逆后序、component id 与可达矩阵预言机",
  concepts: [
    "directed graphs",
    "有向图",
    "digraph representation",
    "有向图表示",
    "directed reachability",
    "有向可达性",
    "cycles and DAGs",
    "环与有向无环图",
    "topological order",
    "拓扑顺序",
    "strong connectivity",
    "强连通性",
  ],
  trace: [
    "建立有向邻接",
    "执行可达搜索",
    "检测回边或生成逆后序",
    "分配 SCC",
    "验证拓扑或互达",
  ],
  scenarios: [
    {
      label: "拓扑前提",
      input: "加入边 0→1、1→2、2→0",
      expected: "检测到有向环后拒绝输出拓扑序",
    },
    {
      label: "强连通",
      input: "0↔1、1→2、2↔3",
      expected: "得到 0/1 与 2/3 两个 SCC，并保留缩点图方向",
    },
  ],
} satisfies Algs4SectionModel;

export function DirectedGraphsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function DirectedGraphsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function DirectedGraphsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
