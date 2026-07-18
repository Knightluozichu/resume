"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第19章 近似推断",
  "19.1 把推断视作优化问题",
  "19.2 期望最大化",
  "19.3 MAP推断和稀疏编码",
  "19.4 变分推断和学习",
  "19.5 学习近似推断",
] as const;
export function Dlt19ApproximateInferenceMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第19章 近似推断"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlt19ApproximateInferenceExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第19章 近似推断"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlt19ApproximateInferenceEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第19章 近似推断"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
