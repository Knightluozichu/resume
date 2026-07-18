"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第1章 引言",
  "第2章 线性代数",
  "第3章 概率与信息论",
  "第4章 数值计算",
  "第5章 机器学习基础",
  "第6章 深度前馈网络",
  "第7章 深度学习中的正则化",
  "第8章 深度模型中的优化",
] as const;
export function DltOfficialFinalReviewMapLab() {
  return (
    <OfficialDeepLearningLab
      title="《深度学习》全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function DltOfficialFinalReviewExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="《深度学习》全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function DltOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="《深度学习》全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
