"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Monte Carlo Methods";
const nodes = [
  {
    label: "monte carlo integration",
    unit: "Monte Carlo Methods",
    mechanism:
      "monte carlo integration 用样本均值估计积分，sampling random variables 把均匀随机数变换到目标分布，variance reduction 通过重要性采样、分层或控制变量降低噪声而不篡改期望。",
    probe: "PDF、样本、权重、批次均值和经验方差",
  },
  {
    label: "sampling random variables",
    unit: "Monte Carlo Methods",
    mechanism:
      "monte carlo integration 用样本均值估计积分，sampling random variables 把均匀随机数变换到目标分布，variance reduction 通过重要性采样、分层或控制变量降低噪声而不篡改期望。",
    probe: "PDF、样本、权重、批次均值和经验方差",
  },
  {
    label: "variance reduction",
    unit: "Monte Carlo Methods",
    mechanism:
      "monte carlo integration 用样本均值估计积分，sampling random variables 把均匀随机数变换到目标分布，variance reduction 通过重要性采样、分层或控制变量降低噪声而不篡改期望。",
    probe: "PDF、样本、权重、批次均值和经验方差",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把高维积分转换为可估计、可分析方差的随机样本均值",
  formula:
    "\\hat I_N=\\frac1N\\sum_{i=1}^{N}\\frac{f(X_i)}{p(X_i)},\\quad X_i\\sim p",
  invariant:
    "Monte Carlo Methods的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "采样分布与权重不一致，或只比较单张随机结果判断方差",
  evidence: "PDF、样本、权重、批次均值和经验方差",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi03MonteCarloTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi03MonteCarloEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi03MonteCarloEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
