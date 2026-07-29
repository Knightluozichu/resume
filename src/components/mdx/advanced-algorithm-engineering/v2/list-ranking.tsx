"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "4 List Ranking",
  focus: "把链式随机访问改写为指针跳跃、排序扫描与分治收缩",
  formula: "rounds = ceil(log2(n))",
  invariant: "每个节点的最终 rank 等于到链尾的真实距离且节点集合不丢失",
  fault: "同一轮原地更新 successor 与 rank，混用新旧状态破坏并行轮次语义",
  evidence:
    "节点 id、successor、每轮 rank、收缩集合、排序/扫描次数与串行预言机",
  stages: [
    "The Pointer-Jumping Technique",
    "Parallel Algorithm Simulation in a Two-Level Memory",
    "A Divide-and-Conquer Approach",
  ],
} satisfies AlgorithmEngineeringModel;

export function ListRankingCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function ListRankingTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function ListRankingEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
