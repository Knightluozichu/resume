"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第3部分 深度学习研究",
  "第13章 线性因子模型",
  "13.1 概率PCA和因子分析",
  "13.2 独立成分分析（ICA）",
  "13.3 慢特征分析",
  "13.4 稀疏编码",
  "13.5 PCA的流形解释",
] as const;
export function Dlt13LinearFactorModelsMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第13章 线性因子模型"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlt13LinearFactorModelsExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第13章 线性因子模型"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlt13LinearFactorModelsEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第13章 线性因子模型"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
