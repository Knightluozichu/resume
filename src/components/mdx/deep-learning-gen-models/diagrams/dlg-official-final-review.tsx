"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤1 正态分布",
  "步骤2 最大似然估计",
  "步骤3 多维正态分布",
  "步骤4 高斯混合模型",
  "步骤5 EM算法",
  "步骤6 神经网络",
  "步骤7 变分自动编码器（VAE）",
  "步骤8 扩散模型的理论",
] as const;
export function DlgOfficialFinalReviewMapLab() {
  return (
    <OfficialGenerativeLab
      title="《深度学习入门5：生成模型》全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function DlgOfficialFinalReviewExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="《深度学习入门5：生成模型》全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function DlgOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="《深度学习入门5：生成模型》全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
