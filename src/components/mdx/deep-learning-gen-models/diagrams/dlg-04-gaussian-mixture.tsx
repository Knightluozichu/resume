"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤4 高斯混合模型",
  "4.1 我们身边的多峰分布",
  "4.1.1 多峰分布的数据集",
  "4.2 高斯混合模型的数据生成",
  "4.2.1 利用GMM生成数据",
  "4.2.2 生成数据的代码",
  "4.3 GMM的数学式",
  "4.3.1 概率的复习",
] as const;
export function Dlg04GaussianMixtureMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤4 高斯混合模型"
      concepts={concepts}
      accent="#7c3aed"
      view="map"
    />
  );
}
export function Dlg04GaussianMixtureExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤4 高斯混合模型"
      concepts={concepts}
      accent="#7c3aed"
      view="experiment"
    />
  );
}
export function Dlg04GaussianMixtureEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤4 高斯混合模型"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
