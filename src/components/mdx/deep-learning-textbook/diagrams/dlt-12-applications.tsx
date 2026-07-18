"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第12章 应用",
  "12.1 大规模深度学习",
  "12.2 计算机视觉",
  "12.3 语音识别",
  "12.4 自然语言处理",
  "12.5 其他应用",
] as const;
export function Dlt12ApplicationsMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第12章 应用"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function Dlt12ApplicationsExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第12章 应用"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function Dlt12ApplicationsEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第12章 应用"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
