"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "《模式识别与机器学习》全书总复习",
  "联合分布",
  "后验推断",
  "模型证据",
  "预测分布",
  "决策损失",
  "独立评价",
  "1 Introduction",
] as const;
export function PrlOfficialFinalReviewMapLab() {
  return (
    <OfficialPrmlLab
      title="《模式识别与机器学习》全书总复习"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function PrlOfficialFinalReviewExperimentLab() {
  return (
    <OfficialPrmlLab
      title="《模式识别与机器学习》全书总复习"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function PrlOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="《模式识别与机器学习》全书总复习"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
