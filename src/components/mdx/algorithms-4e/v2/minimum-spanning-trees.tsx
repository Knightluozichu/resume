"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-4.3",
  title: "4.3 · Minimum Spanning Trees",
  focus: "用切分定理统一 Lazy/Eager Prim 与 Kruskal，并给出最优性可检查证书",
  formula: "Kruskal 时间 O(E log E)；带索引堆的 Eager Prim 时间 O(E log V)",
  invariant:
    "已选边始终无环；对每个选择步骤，所取边是某个尊重当前森林切分的最轻跨边",
  fault:
    "没有处理相同权重的合法多解，或 Eager Prim 保留过期 crossing edge 却未 decreaseKey",
  evidence:
    "加权边集、切分、候选队列、森林分量、总权重、环检查与逐边 cut optimality",
  concepts: [
    "minimum spanning trees",
    "最小生成树",
    "edge-weighted graphs",
    "加权无向图",
    "cut property",
    "切分定理",
    "Prim's algorithm",
    "Prim算法",
    "Kruskal's algorithm",
    "Kruskal算法",
    "MST optimality",
    "最小生成树最优性",
  ],
  trace: [
    "建立加权无向图",
    "形成尊重森林的切分",
    "选择最轻跨边",
    "合并分量",
    "验证树与总权重",
  ],
  scenarios: [
    {
      label: "切分安全边",
      input: "切分 A/B 与 C/D 的跨边权重为 2、5、7",
      expected: "权重 2 的最轻跨边可安全加入某棵 MST",
    },
    {
      label: "环边拒绝",
      input: "Kruskal 已连接 A-B-C，随后遇到边 A-C",
      expected: "并查集发现端点已连通，拒绝形成环的边",
    },
  ],
} satisfies Algs4SectionModel;

export function MinimumSpanningTreesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function MinimumSpanningTreesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function MinimumSpanningTreesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
