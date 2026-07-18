"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第16章 深度学习中的结构化概率模型",
  "16.1 非结构化建模的挑战",
  "16.2 使用图描述模型结构",
  "16.3 从图模型中采样",
  "16.4 结构化建模的优势",
  "16.5 学习依赖关系",
  "16.6 推断和近似推断",
  "16.7 结构化概率模型的深度学习方法",
] as const;
export function Dlt16StructuredProbabilisticModelsMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第16章 深度学习中的结构化概率模型"
      concepts={concepts}
      accent="#7c3aed"
      view="map"
    />
  );
}
export function Dlt16StructuredProbabilisticModelsExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第16章 深度学习中的结构化概率模型"
      concepts={concepts}
      accent="#7c3aed"
      view="experiment"
    />
  );
}
export function Dlt16StructuredProbabilisticModelsEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第16章 深度学习中的结构化概率模型"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
