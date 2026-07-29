"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "The Quest for Ultimate Realism and Speed";
const nodes = [
  {
    label: "participating media",
    unit: "The Quest for Ultimate Realism and Speed",
    mechanism:
      "participating media 在空间中吸收、发射和散射光，tone mapping 把高动态范围辐亮度映射到显示设备，fast global illumination 用缓存、预计算或硬件加速换取时间。三者优化的误差来源不同，不能只报告帧率。",
    probe: "消光系数、HDR基线、映射参数、缓存版本和时空误差",
  },
  {
    label: "tone mapping",
    unit: "The Quest for Ultimate Realism and Speed",
    mechanism:
      "participating media 在空间中吸收、发射和散射光，tone mapping 把高动态范围辐亮度映射到显示设备，fast global illumination 用缓存、预计算或硬件加速换取时间。三者优化的误差来源不同，不能只报告帧率。",
    probe: "消光系数、HDR基线、映射参数、缓存版本和时空误差",
  },
  {
    label: "fast global illumination",
    unit: "The Quest for Ultimate Realism and Speed",
    mechanism:
      "participating media 在空间中吸收、发射和散射光，tone mapping 把高动态范围辐亮度映射到显示设备，fast global illumination 用缓存、预计算或硬件加速换取时间。三者优化的误差来源不同，不能只报告帧率。",
    probe: "消光系数、HDR基线、映射参数、缓存版本和时空误差",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把体介质、显示感知与快速全局光照纳入同一误差预算",
  formula: "L(s)=T(0,s)L(0)+\\int_0^sT(t,s)[L_e(t)+L_s(t)]dt",
  invariant:
    "The Quest for Ultimate Realism and Speed的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "忽略体透射率、tone mapping改变比较基准，或实时缓存泄漏旧光照",
  evidence: "消光系数、HDR基线、映射参数、缓存版本和时空误差",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi08RealismSpeedTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi08RealismSpeedEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi08RealismSpeedEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
