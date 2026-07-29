"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "3 Random Sampling",
  focus: "在磁盘、已知长度流和未知长度流中保持等概率抽样合同",
  formula: "P(item i is retained after n arrivals) = m / n",
  invariant: "每个合法元素的入样概率只由 m 与 n 决定，不依赖到达位置",
  fault: "用有偏取模或错误的替换边界，让早到或晚到元素获得额外概率",
  evidence: "随机种子、到达序号、抽样决策、频数分布、置信区间与磁盘读写",
  stages: [
    "Disk Model and Known Sequence Length",
    "Streaming Model and Known Sequence Length",
    "Streaming Model and Unknown Sequence Length",
  ],
} satisfies AlgorithmEngineeringModel;

export function RandomSamplingCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function RandomSamplingTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function RandomSamplingEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
