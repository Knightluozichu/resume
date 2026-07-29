"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "12 Statistical Coding",
  focus: "从频率模型推导 Huffman、算术编码与 PPM 的码长和状态",
  formula: "H0 = -sum_x p(x) log2 p(x)",
  invariant: "编码器与解码器使用同一概率模型，码流可逆且码长与模型预测可核对",
  fault: "更新频率的时点不同，导致算术区间或 PPM escape 状态在两端分叉",
  evidence: "符号频率、码长/区间、重归一化事件、escape、总位数与 round-trip",
  stages: [
    "Huffman Coding",
    "Arithmetic Coding",
    "Prediction by Partial Matching∞",
  ],
} satisfies AlgorithmEngineeringModel;

export function StatisticalCodingCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function StatisticalCodingTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function StatisticalCodingEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
