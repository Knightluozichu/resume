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
export function DlgOfficialLearningMapMapLab() {
  return (
    <OfficialGenerativeLab
      title="《深度学习入门5：生成模型》权威学习地图"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function DlgOfficialLearningMapExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="《深度学习入门5：生成模型》权威学习地图"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function DlgOfficialLearningMapEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="《深度学习入门5：生成模型》权威学习地图"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
