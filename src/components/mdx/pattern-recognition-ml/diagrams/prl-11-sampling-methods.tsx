"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第11章 采样方法",
  "拒绝采样",
  "重要性采样",
  "MCMC",
  "Metropolis-Hastings",
  "Gibbs采样",
  "HMC",
  "11.1 Basic Sampling Algorithms",
] as const;
export function Prl11SamplingMethodsMapLab() {
  return (
    <OfficialPrmlLab
      title="第11章 采样方法"
      concepts={concepts}
      accent="#b45309"
      view="map"
    />
  );
}
export function Prl11SamplingMethodsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第11章 采样方法"
      concepts={concepts}
      accent="#b45309"
      view="experiment"
    />
  );
}
export function Prl11SamplingMethodsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第11章 采样方法"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
