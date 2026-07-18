"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "附录A 多维正态分布最大似然估计的推导",
  "A.1 均值向量mu的最大似然估计",
  "A.2 二次型的微分（式(A.4)的证明）",
  "A.3 协方差矩阵Sigma的最大似然估计",
  "A.4 迹和微分（式(A.12)的证明）",
] as const;
export function DlgAppendixAMultivariateMleMapLab() {
  return (
    <OfficialGenerativeLab
      title="附录A 多维正态分布最大似然估计的推导"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function DlgAppendixAMultivariateMleExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="附录A 多维正态分布最大似然估计的推导"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function DlgAppendixAMultivariateMleEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="附录A 多维正态分布最大似然估计的推导"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
