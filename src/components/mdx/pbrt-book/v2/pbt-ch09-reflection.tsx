import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 9 章 Reflection Models",
  unitTitle: "9 Reflection Models",
  focus: "让BSDF的求值、采样与PDF在同一半球、测度和光谱约定下闭合",
  concepts: [
    "bsdf",
    "brdf",
    "microfacet",
    "dielectric",
    "conductor",
    "fresnel",
  ],
  fault: "Sample_f返回的方向与PDF测度不一致，或忘记透射事件的折射率因子",
  evidence:
    "wo、wi、hemisphere、flags、f、pdf、eta、roughness与energy integral",
  formula: "f_r=\\frac{F\\,D\\,G}{4|n\\cdot\\omega_i||n\\cdot\\omega_o|}",
} satisfies PbrtExperimentModel;

export function PbtCh09ReflectionPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh09ReflectionEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh09ReflectionEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
