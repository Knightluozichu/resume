"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "《模式识别与机器学习》权威学习地图",
  "概率建模",
  "贝叶斯观点",
  "监督学习",
  "潜变量",
  "近似推断",
  "模型组合",
  "1 Introduction",
] as const;
export function PrlOfficialLearningMapMapLab() {
  return (
    <OfficialPrmlLab
      title="《模式识别与机器学习》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function PrlOfficialLearningMapExperimentLab() {
  return (
    <OfficialPrmlLab
      title="《模式识别与机器学习》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function PrlOfficialLearningMapEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="《模式识别与机器学习》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
