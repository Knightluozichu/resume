import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 8 章 Sampling and Reconstruction",
  unitTitle: "8 Sampling and Reconstruction",
  focus: "把样本序列、维度消费与重建滤波器绑定到可复现像素估计",
  concepts: [
    "sampling",
    "sampler",
    "halton",
    "sobol",
    "reconstruction filter",
    "aliasing",
  ],
  fault: "条件分支改变随机维度消费，或滤波时漏掉权重归一化",
  evidence:
    "pixel、sample index、dimension、u values、filter radius、weight sum与pixel estimate",
  formula: "\\hat L_p=\\frac{\\sum_i f_iL_i}{\\sum_i f_i}",
} satisfies PbrtExperimentModel;

export function PbtCh08SamplingPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh08SamplingEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh08SamplingEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
