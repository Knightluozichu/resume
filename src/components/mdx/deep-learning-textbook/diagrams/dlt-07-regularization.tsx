"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第7章 深度学习中的正则化",
  "7.1 参数范数惩罚",
  "7.2 作为约束优化的范数惩罚",
  "7.3 正则化和欠约束问题",
  "7.4 数据集增强",
  "7.5 噪声鲁棒性",
  "7.6 半监督学习",
  "7.7 多任务学习",
] as const;
export function Dlt07RegularizationMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第7章 深度学习中的正则化"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlt07RegularizationExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第7章 深度学习中的正则化"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlt07RegularizationEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第7章 深度学习中的正则化"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
