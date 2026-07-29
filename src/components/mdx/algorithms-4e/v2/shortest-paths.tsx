"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-4.4",
  title: "4.4 · Shortest Paths",
  focus:
    "以松弛为统一操作，按非负权、DAG 或一般权重前提选择 Dijkstra、拓扑序或 Bellman-Ford",
  formula:
    "relax(v→w)：若 dist[w] > dist[v]+weight(v,w)，同时更新 dist[w] 与 edgeTo[w]",
  invariant:
    "所有边满足三角不等式，edgeTo 紧边链从可达顶点回到源点且路径权重等于 dist",
  fault:
    "在存在可达负权边时仍把 Dijkstra 出队顶点永久 settle，或只更新 dist 不更新 edgeTo",
  evidence:
    "图与源点、distTo、edgeTo、松弛次序、优先队列、负环证书与全边校验器",
  concepts: [
    "shortest paths",
    "最短路径",
    "edge-weighted digraphs",
    "加权有向图",
    "relaxation",
    "松弛",
    "Dijkstra's algorithm",
    "Dijkstra算法",
    "acyclic shortest paths",
    "无环图最短路径",
    "Bellman-Ford algorithm and negative cycles",
    "Bellman-Ford算法与负权环",
  ],
  trace: [
    "初始化源点标签",
    "选择待松弛顶点",
    "计算候选距离",
    "更新标签与前驱",
    "验证路径或负环",
  ],
  scenarios: [
    {
      label: "非负权图",
      input: "s→a=2、s→b=5、a→b=1",
      expected: "Dijkstra 先 settle a，再把 b 从 5 改进为 3",
    },
    {
      label: "负权边界",
      input: "加入 b→a=-4 并检查可达负环",
      expected: "先拒绝 Dijkstra 前提，再由 Bellman-Ford 给出距离或负环证书",
    },
  ],
} satisfies Algs4SectionModel;

export function ShortestPathsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function ShortestPathsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function ShortestPathsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
