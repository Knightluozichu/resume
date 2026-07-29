import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 14 章 Light Transport II: Volume Rendering",
  unitTitle: "14 Light Transport II: Volume Rendering",
  focus: "把表面路径扩展为含介质自由飞行、体散射与分层材质的传输估计",
  concepts: [
    "equation of transfer",
    "volume integrator",
    "free-flight sampling",
    "null collision",
    "layered material",
  ],
  fault: "穿过介质边界后未更新MediumInterface，或null collision被当作真实散射",
  evidence:
    "medium stack、segment t、event type、Tmaj、sigma values、phase pdf、beta与radiance",
  formula: "L(b)=T_r(a,b)L(a)+\\int_a^bT_r(t,b)L_s(t)dt",
} satisfies PbrtExperimentModel;

export function PbtCh14VolumeTransportPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh14VolumeTransportEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh14VolumeTransportEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
