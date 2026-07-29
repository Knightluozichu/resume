"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "6 Set Intersection",
  focus: "根据集合规模比在归并、相互分割、倍增搜索与块索引间切换",
  formula: "work = O(m log(n/m))，m ≤ n",
  invariant: "结果只包含两边共有元素，保持排序并明确集合与多重集合语义",
  fault: "忽略重复键或越过倍增搜索边界，产生漏报、重复输出或越界访问",
  evidence: "两表长度、探测位置、分割点、比较次数、块访问与朴素求交结果",
  stages: [
    "Merge-Based Approach",
    "Mutual Partitioning",
    "Doubling Search",
    "Two-Level Storage Approach",
  ],
} satisfies AlgorithmEngineeringModel;

export function SetIntersectionCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function SetIntersectionTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function SetIntersectionEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
