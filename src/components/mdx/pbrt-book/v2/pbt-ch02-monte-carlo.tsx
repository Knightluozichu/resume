import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 2 章 Monte Carlo Integration",
  unitTitle: "2 Monte Carlo Integration",
  focus: "用概率密度、估计量、方差与重要性采样解释渲染积分的误差",
  concepts: [
    "monte carlo",
    "estimator",
    "probability density function",
    "importance sampling",
    "variance",
  ],
  fault: "从一个分布采样却用另一个PDF除权，或把低噪声误当成无偏",
  evidence: "seed、sample、f(x)、p(x)、单样本贡献、均值与样本方差",
  formula: "\\hat I_N=\\frac1N\\sum_{i=1}^{N}\\frac{f(X_i)}{p(X_i)}",
} satisfies PbrtExperimentModel;

export function PbtCh02MonteCarloPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh02MonteCarloEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh02MonteCarloEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
