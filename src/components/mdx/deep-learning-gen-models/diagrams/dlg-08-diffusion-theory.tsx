"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤8 扩散模型的理论",
  "8.1 从VAE到扩散模型",
  "8.1.1 VAE的复习",
  "8.1.2 潜变量的层级化",
  "8.1.3 进入扩散模型",
  "8.2 扩散过程和逆扩散过程",
  "8.2.1 扩散过程",
  "8.2.2 逆扩散过程",
] as const;
export function Dlg08DiffusionTheoryMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤8 扩散模型的理论"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlg08DiffusionTheoryExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤8 扩散模型的理论"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlg08DiffusionTheoryEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤8 扩散模型的理论"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
