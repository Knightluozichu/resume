"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤2 最大似然估计",
  "2.1 生成式模型的基础知识",
  "2.1.1 什么是生成式模型",
  "2.1.2 总体和样本",
  "2.2 使用真实数据实现生成式模型",
  "2.2.1 读取身高数据集",
  "2.2.2 基于正态分布的生成式模型",
  "2.3 最大似然估计的理论知识",
] as const;
export function Dlg02MaximumLikelihoodMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤2 最大似然估计"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlg02MaximumLikelihoodExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤2 最大似然估计"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlg02MaximumLikelihoodEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤2 最大似然估计"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
