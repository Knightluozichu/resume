"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第3章 概率与信息论",
  "3.1 为什么要使用概率",
  "3.2 随机变量",
  "3.3 概率分布",
  "3.4 边缘概率",
  "3.5 条件概率",
  "3.6 条件概率的链式法则",
  "3.7 独立性和条件独立性",
] as const;
export function Dlt03ProbabilityInformationMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第3章 概率与信息论"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function Dlt03ProbabilityInformationExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第3章 概率与信息论"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Dlt03ProbabilityInformationEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第3章 概率与信息论"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
