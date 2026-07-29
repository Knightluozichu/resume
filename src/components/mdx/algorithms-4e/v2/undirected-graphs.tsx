"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-4.1",
  title: "4.1 · Undirected Graphs",
  focus: "从邻接表表示出发，用 DFS、BFS、连通分量与符号图回答无向图查询",
  formula: "邻接表空间 Θ(V+E)；DFS/BFS 单次搜索时间 Θ(V+E)",
  invariant:
    "marked 只表示已发现顶点；edgeTo 链必须回到源点，BFS 首次发现给出最少边路径",
  fault:
    "递归 DFS 在标记前访问邻居造成环上重复递归，或 BFS 出队时才标记导致重复入队",
  evidence:
    "V/E、邻接表、marked、edgeTo、队列/栈轨迹、component id 与路径预言机",
  concepts: [
    "undirected graphs",
    "无向图",
    "graph data type and representation",
    "图数据类型与表示",
    "depth-first search",
    "深度优先搜索",
    "breadth-first search",
    "广度优先搜索",
    "connected components",
    "连通分量",
    "symbol graphs",
    "符号图",
  ],
  trace: [
    "建立双向邻接",
    "发现并标记顶点",
    "记录来源边",
    "展开前沿",
    "重建路径或分量",
  ],
  scenarios: [
    {
      label: "路径对照",
      input: "在含环图中从 0 到 5 同时运行 DFS 与 BFS",
      expected: "两者都证明可达，只有 BFS 保证边数最少",
    },
    {
      label: "多个分量",
      input: "图由 0/1/2 与 3/4 两个分量组成",
      expected: "外层扫描从每个未标记顶点启动一次搜索并分配 component id",
    },
  ],
} satisfies Algs4SectionModel;

export function UndirectedGraphsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function UndirectedGraphsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function UndirectedGraphsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
