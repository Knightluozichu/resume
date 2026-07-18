"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第15章 表示学习",
  "15.1 贪心逐层无监督预训练",
  "15.2 迁移学习和领域自适应",
  "15.3 半监督解释因果因素",
  "15.4 分布式表示",
  "15.5 得益于深度的指数增益",
  "15.6 提供发现潜在原因的线索",
] as const;
export function Dlt15RepresentationLearningMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第15章 表示学习"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function Dlt15RepresentationLearningExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第15章 表示学习"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Dlt15RepresentationLearningEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第15章 表示学习"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
