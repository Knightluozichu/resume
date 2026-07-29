import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 11 章 Volume Scattering",
  unitTitle: "11 Volume Scattering",
  focus: "用吸收、外散射、内散射与相函数描述参与介质中的路径事件",
  concepts: [
    "volume scattering",
    "transmittance",
    "phase function",
    "medium",
    "majorant",
  ],
  fault: "把相函数乘上表面余弦，或majorant低于真实消光系数",
  evidence:
    "segment、sigma_a、sigma_s、sigma_t、majorant、null/real event与transmittance",
  formula: "T_r(a\\to b)=\\exp(-\\int_a^b\\sigma_t(s)ds)",
} satisfies PbrtExperimentModel;

export function PbtCh11VolumeScatteringPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh11VolumeScatteringEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh11VolumeScatteringEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
