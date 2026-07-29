"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Theoretical Analysis of Stochastic Relaxation Radiosity";
const nodes = [
  {
    label: "stochastic relaxation radiosity",
    unit: "Theoretical Analysis of Stochastic Relaxation Radiosity",
    mechanism:
      "stochastic relaxation radiosity 用随机更新近似线性传输系统，variance analysis 判断噪声如何随样本与松弛策略变化。无偏均值并不保证有限时间稳定，还必须检查自相关和谱性质。",
    probe: "期望、方差、自相关、残差曲线和重复试验区间",
  },
  {
    label: "variance analysis",
    unit: "Theoretical Analysis of Stochastic Relaxation Radiosity",
    mechanism:
      "stochastic relaxation radiosity 用随机更新近似线性传输系统，variance analysis 判断噪声如何随样本与松弛策略变化。无偏均值并不保证有限时间稳定，还必须检查自相关和谱性质。",
    probe: "期望、方差、自相关、残差曲线和重复试验区间",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "分析随机松弛radiosity估计器的期望与方差",
  formula: "B_{k+1}=B_k+\\alpha_k(\\widehat{T(B_k)}-B_k)",
  invariant:
    "Theoretical Analysis of Stochastic Relaxation Radiosity的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "只证明期望正确却忽略方差发散，或用相关样本套用独立样本误差",
  evidence: "期望、方差、自相关、残差曲线和重复试验区间",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function AgiCStochasticRelaxationAnalysisTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function AgiCStochasticRelaxationAnalysisEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function AgiCStochasticRelaxationAnalysisEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
