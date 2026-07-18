"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤7 变分自动编码器（VAE）",
  "7.1 VAE和解码器",
  "7.1.1 一个正态分布",
  "7.1.2 高斯混合模型（GMM）",
  "7.1.3 VAE",
  "7.1.4 EM算法的问题",
  "7.2 VAE和编码器",
  "7.2.1 从EM算法到VAE",
] as const;
export function Dlg07VaeMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤7 变分自动编码器（VAE）"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlg07VaeExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤7 变分自动编码器（VAE）"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlg07VaeEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤7 变分自动编码器（VAE）"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
