"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第17章 蒙特卡罗方法",
  "17.1 采样和蒙特卡罗方法",
  "17.2 重要采样",
  "17.3 马尔可夫链蒙特卡罗方法",
  "17.4 Gibbs采样",
  "17.5 不同峰值之间混合的挑战",
] as const;
export function Dlt17MonteCarloMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第17章 蒙特卡罗方法"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Dlt17MonteCarloExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第17章 蒙特卡罗方法"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Dlt17MonteCarloEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第17章 蒙特卡罗方法"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
