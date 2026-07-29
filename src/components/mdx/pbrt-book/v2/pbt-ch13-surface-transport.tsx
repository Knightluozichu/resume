import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 13 章 Light Transport I: Surface Reflection",
  unitTitle: "13 Light Transport I: Surface Reflection",
  focus: "从光传输方程推导路径追踪、下一事件估计与多重重要性采样",
  concepts: [
    "light transport equation",
    "path tracing",
    "next event estimation",
    "multiple importance sampling",
    "Russian roulette",
  ],
  fault:
    "直接光和BSDF命中光源被重复累加，或Russian roulette终止后未补偿存活概率",
  evidence:
    "path vertices、beta、emission、BSDF pdf、light pdf、MIS weight、rr probability与L",
  formula: "L_o=L_e+\\int_{\\Omega}f_sL_i|n\\cdot\\omega_i|d\\omega_i",
} satisfies PbrtExperimentModel;

export function PbtCh13SurfaceTransportPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh13SurfaceTransportEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh13SurfaceTransportEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
