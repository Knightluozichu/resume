"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Hemispherical Coordinates";
const nodes = [
  {
    label: "hemispherical coordinates",
    unit: "Hemispherical Coordinates",
    mechanism:
      "hemispherical coordinates 用极角θ与方位角φ表示法线上方方向，solid angle 的面积元为sinθ dθ dφ，hemisphere integration 因而不能把θ与φ都均匀采样后直接平均。",
    probe: "采样分布、PDF、单位向量长度和半球积分常数",
  },
  {
    label: "solid angle",
    unit: "Hemispherical Coordinates",
    mechanism:
      "hemispherical coordinates 用极角θ与方位角φ表示法线上方方向，solid angle 的面积元为sinθ dθ dφ，hemisphere integration 因而不能把θ与φ都均匀采样后直接平均。",
    probe: "采样分布、PDF、单位向量长度和半球积分常数",
  },
  {
    label: "hemisphere integration",
    unit: "Hemispherical Coordinates",
    mechanism:
      "hemispherical coordinates 用极角θ与方位角φ表示法线上方方向，solid angle 的面积元为sinθ dθ dφ，hemisphere integration 因而不能把θ与φ都均匀采样后直接平均。",
    probe: "采样分布、PDF、单位向量长度和半球积分常数",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "在半球方向域中正确表达立体角与积分测度",
  formula:
    "d\\omega=\\sin\\theta\\,d\\theta\\,d\\phi,\\qquad \\int_{\\Omega^+}d\\omega=2\\pi",
  invariant:
    "Hemispherical Coordinates的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "遗漏sinθ雅可比，或把余弦加权半球样本当成均匀样本",
  evidence: "采样分布、PDF、单位向量长度和半球积分常数",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function AgiBHemisphericalCoordinatesTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function AgiBHemisphericalCoordinatesEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function AgiBHemisphericalCoordinatesEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
