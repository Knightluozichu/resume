"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第5章 神经网络",
  "前馈网络",
  "反向传播",
  "Jacobian",
  "Hessian",
  "混合密度网络",
  "贝叶斯神经网络",
  "5.1 Feed-forward Network Functions",
] as const;
export function Prl05NeuralNetworksMapLab() {
  return (
    <OfficialPrmlLab
      title="第5章 神经网络"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Prl05NeuralNetworksExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第5章 神经网络"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Prl05NeuralNetworksEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第5章 神经网络"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
