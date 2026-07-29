"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Hybrid Algorithms";
const nodes = [
  {
    label: "final gathering",
    unit: "Hybrid Algorithms",
    mechanism:
      "final gathering 在粗略间接解上补充观察点附近采样，bidirectional tracing 从光源与相机两端连接子路径，irradiance caching 在平滑区域复用辐照度。混合算法必须说明偏差、权重和缓存有效域。",
    probe: "策略PDF、MIS权重、缓存半径、拒绝条件和参考误差",
  },
  {
    label: "bidirectional tracing",
    unit: "Hybrid Algorithms",
    mechanism:
      "final gathering 在粗略间接解上补充观察点附近采样，bidirectional tracing 从光源与相机两端连接子路径，irradiance caching 在平滑区域复用辐照度。混合算法必须说明偏差、权重和缓存有效域。",
    probe: "策略PDF、MIS权重、缓存半径、拒绝条件和参考误差",
  },
  {
    label: "irradiance caching",
    unit: "Hybrid Algorithms",
    mechanism:
      "final gathering 在粗略间接解上补充观察点附近采样，bidirectional tracing 从光源与相机两端连接子路径，irradiance caching 在平滑区域复用辐照度。混合算法必须说明偏差、权重和缓存有效域。",
    probe: "策略PDF、MIS权重、缓存半径、拒绝条件和参考误差",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "组合互补采样策略以覆盖难采样光路",
  formula:
    "\\hat I=\\sum_s w_s(\\bar x)\\frac{f(\\bar x)}{p_s(\\bar x)},\\qquad \\sum_s w_s=1",
  invariant:
    "Hybrid Algorithms的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "多个策略重复贡献却不做MIS，或缓存跨越几何/法线不连续处",
  evidence: "策略PDF、MIS权重、缓存半径、拒绝条件和参考误差",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi07HybridAlgorithmsTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi07HybridAlgorithmsEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi07HybridAlgorithmsEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
