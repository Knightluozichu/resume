import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 1 章 Introduction",
  unitTitle: "1 Introduction",
  focus: "把相机样本、射线、场景求交、散射与积分器串成可调试调用链",
  concepts: ["pbrt", "ray tracing", "literate programming", "Integrator"],
  fault: "只看最终图像而不保留像素样本、射线与首个交点",
  evidence: "scene hash、pixel、sample index、ray、intersection与radiance",
  formula: "L=I(Camera,Scene,Sampler)",
} satisfies PbrtExperimentModel;

export function PbtCh01IntroductionPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh01IntroductionEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh01IntroductionEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
