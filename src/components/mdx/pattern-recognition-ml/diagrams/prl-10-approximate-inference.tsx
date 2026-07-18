"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第10章 近似推断",
  "变分推断",
  "因子分解",
  "ELBO",
  "变分消息传递",
  "局部变分界",
  "期望传播",
  "10.1 Variational Inference",
] as const;
export function Prl10ApproximateInferenceMapLab() {
  return (
    <OfficialPrmlLab
      title="第10章 近似推断"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Prl10ApproximateInferenceExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第10章 近似推断"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Prl10ApproximateInferenceEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第10章 近似推断"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
