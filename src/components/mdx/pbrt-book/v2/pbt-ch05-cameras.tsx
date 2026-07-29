import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 5 章 Cameras and Film",
  unitTitle: "5 Cameras and Film",
  focus: "把Film上的离散样本反投影为带权射线并记录传感器响应",
  concepts: [
    "camera",
    "CameraSample",
    "projective camera",
    "film",
    "ray differential",
  ],
  fault: "混淆raster、camera与world空间，或丢掉镜头权重和射线微分",
  evidence:
    "film sample、lens sample、time、transform chain、ray differential与weight",
  formula: "(ray,w)=Camera(sample,\\lambda)",
} satisfies PbrtExperimentModel;

export function PbtCh05CamerasPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh05CamerasEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh05CamerasEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
