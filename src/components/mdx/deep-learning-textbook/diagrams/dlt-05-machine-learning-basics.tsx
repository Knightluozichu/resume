"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第5章 机器学习基础",
  "5.1 学习算法",
  "5.2 容量、过拟合和欠拟合",
  "5.3 超参数和验证集",
  "5.4 估计、偏差和方差",
  "5.5 最大似然估计",
  "5.6 贝叶斯统计",
  "5.7 监督学习算法",
] as const;
export function Dlt05MachineLearningBasicsMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第5章 机器学习基础"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Dlt05MachineLearningBasicsExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第5章 机器学习基础"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Dlt05MachineLearningBasicsEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第5章 机器学习基础"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
