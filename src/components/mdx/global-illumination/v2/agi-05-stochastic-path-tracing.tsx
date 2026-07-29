"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Stochastic Path-Tracing Algorithms";
const nodes = [
  {
    label: "stochastic path tracing",
    unit: "Stochastic Path-Tracing Algorithms",
    mechanism:
      "stochastic path tracing 从传感器逐次采样散射，direct illumination 通常用显式光源连接降低噪声，indirect illumination 则来自后续反弹。吞吐量必须累计BRDF、余弦、PDF和终止概率。",
    probe: "路径顶点、吞吐量、每步PDF、直接项和终止事件",
  },
  {
    label: "direct illumination",
    unit: "Stochastic Path-Tracing Algorithms",
    mechanism:
      "stochastic path tracing 从传感器逐次采样散射，direct illumination 通常用显式光源连接降低噪声，indirect illumination 则来自后续反弹。吞吐量必须累计BRDF、余弦、PDF和终止概率。",
    probe: "路径顶点、吞吐量、每步PDF、直接项和终止事件",
  },
  {
    label: "indirect illumination",
    unit: "Stochastic Path-Tracing Algorithms",
    mechanism:
      "stochastic path tracing 从传感器逐次采样散射，direct illumination 通常用显式光源连接降低噪声，indirect illumination 则来自后续反弹。吞吐量必须累计BRDF、余弦、PDF和终止概率。",
    probe: "路径顶点、吞吐量、每步PDF、直接项和终止事件",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "沿随机路径同时估计直接与间接光",
  formula: "\\beta_{k+1}=\\beta_k\\frac{f_r|n\\cdot\\omega|}{p(\\omega)}",
  invariant:
    "Stochastic Path-Tracing Algorithms的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "显式光源采样与BSDF路径重复计数，或俄罗斯轮盘后不补偿存活概率",
  evidence: "路径顶点、吞吐量、每步PDF、直接项和终止事件",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi05StochasticPathTracingTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi05StochasticPathTracingEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi05StochasticPathTracingEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
