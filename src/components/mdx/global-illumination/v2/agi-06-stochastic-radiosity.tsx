"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Stochastic Radiosity";
const nodes = [
  {
    label: "stochastic radiosity",
    unit: "Stochastic Radiosity",
    mechanism:
      "stochastic radiosity 把漫反射传输系统转成随机迭代，form factor 描述面片间几何耦合，random walk 在面片图上传播能量。收敛判断应基于残差或独立批次，而非仅看图像变亮。",
    probe: "面片面积、F矩阵、残差、随机路径权重和能量和",
  },
  {
    label: "form factor",
    unit: "Stochastic Radiosity",
    mechanism:
      "stochastic radiosity 把漫反射传输系统转成随机迭代，form factor 描述面片间几何耦合，random walk 在面片图上传播能量。收敛判断应基于残差或独立批次，而非仅看图像变亮。",
    probe: "面片面积、F矩阵、残差、随机路径权重和能量和",
  },
  {
    label: "random walk",
    unit: "Stochastic Radiosity",
    mechanism:
      "stochastic radiosity 把漫反射传输系统转成随机迭代，form factor 描述面片间几何耦合，random walk 在面片图上传播能量。收敛判断应基于残差或独立批次，而非仅看图像变亮。",
    probe: "面片面积、F矩阵、残差、随机路径权重和能量和",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用随机松弛或随机游走求解漫反射面片能量",
  formula: "B=E+RFB,\\qquad B=\\sum_{k=0}^{\\infty}(RF)^kE",
  invariant:
    "Stochastic Radiosity的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "形状因子行和超出物理范围，或随机游走权重与转移概率不匹配",
  evidence: "面片面积、F矩阵、残差、随机路径权重和能量和",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi06StochasticRadiosityTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi06StochasticRadiosityEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi06StochasticRadiosityEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
