"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "2 A Warm-up",
  focus: "用最大子数组和比较从三次方到线性时间的逐步消元",
  formula: "bestEnding(i) = max(a[i], bestEnding(i-1) + a[i])",
  invariant: "任意输入都要返回同一最优区间、端点与和，并与穷举预言机一致",
  fault: "把初值固定为 0，导致全负数组错误地返回空区间",
  evidence: "输入数组、候选端点、前缀和、最优值、穷举结果与操作计数",
  stages: [
    "A Cubic-Time Algorithm",
    "A Quadratic-Time Algorithm",
    "A Linear-Time Algorithm",
    "Another Linear-Time Algorithm",
    "A Few Interesting Variants∞",
  ],
} satisfies AlgorithmEngineeringModel;

export function WarmUpCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function WarmUpTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function WarmUpEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
