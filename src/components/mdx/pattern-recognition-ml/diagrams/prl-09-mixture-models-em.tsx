"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第9章 混合模型与EM",
  "K-means",
  "高斯混合",
  "责任度",
  "潜变量",
  "EM算法",
  "变分下界",
  "9.1 K-means Clustering",
] as const;
export function Prl09MixtureModelsEmMapLab() {
  return (
    <OfficialPrmlLab
      title="第9章 混合模型与EM"
      concepts={concepts}
      accent="#6d28d9"
      view="map"
    />
  );
}
export function Prl09MixtureModelsEmExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第9章 混合模型与EM"
      concepts={concepts}
      accent="#6d28d9"
      view="experiment"
    />
  );
}
export function Prl09MixtureModelsEmEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第9章 混合模型与EM"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
