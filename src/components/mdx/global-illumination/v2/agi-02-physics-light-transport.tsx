"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "The Physics of Light Transport";
const nodes = [
  {
    label: "radiometry",
    unit: "The Physics of Light Transport",
    mechanism:
      "radiometry 定义辐射通量、辐照度与辐亮度，rendering equation 把出射辐亮度写成自发光与反射入射光之和，importance 提供从传感器反向理解贡献的伴随视角。",
    probe: "量纲、方向、半球域、BRDF与能量守恒",
  },
  {
    label: "rendering equation",
    unit: "The Physics of Light Transport",
    mechanism:
      "radiometry 定义辐射通量、辐照度与辐亮度，rendering equation 把出射辐亮度写成自发光与反射入射光之和，importance 提供从传感器反向理解贡献的伴随视角。",
    probe: "量纲、方向、半球域、BRDF与能量守恒",
  },
  {
    label: "importance",
    unit: "The Physics of Light Transport",
    mechanism:
      "radiometry 定义辐射通量、辐照度与辐亮度，rendering equation 把出射辐亮度写成自发光与反射入射光之和，importance 提供从传感器反向理解贡献的伴随视角。",
    probe: "量纲、方向、半球域、BRDF与能量守恒",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用辐射度量和渲染方程描述表面光能交换",
  formula:
    "L_o(x,\\omega_o)=L_e(x,\\omega_o)+\\int_{\\Omega}f_r L_i(x,\\omega_i)|n\\cdot\\omega_i|d\\omega_i",
  invariant:
    "The Physics of Light Transport的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "遗漏余弦或立体角测度，或把radiance与irradiance单位混用",
  evidence: "量纲、方向、半球域、BRDF与能量守恒",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi02PhysicsLightTransportTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi02PhysicsLightTransportEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi02PhysicsLightTransportEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
