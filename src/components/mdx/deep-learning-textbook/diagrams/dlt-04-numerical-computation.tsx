"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第4章 数值计算",
  "4.1 上溢和下溢",
  "4.2 病态条件",
  "4.3 基于梯度的优化方法",
  "4.4 约束优化",
  "4.5 示例：线性最小二乘",
] as const;
export function Dlt04NumericalComputationMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第4章 数值计算"
      concepts={concepts}
      accent="#7c3aed"
      view="map"
    />
  );
}
export function Dlt04NumericalComputationExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第4章 数值计算"
      concepts={concepts}
      accent="#7c3aed"
      view="experiment"
    />
  );
}
export function Dlt04NumericalComputationEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第4章 数值计算"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
