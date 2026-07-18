"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第1章 引言",
  "1.1 本书面向的读者",
  "1.2 深度学习的历史趋势",
] as const;
export function Dlt01IntroductionMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第1章 引言"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlt01IntroductionExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第1章 引言"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlt01IntroductionEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第1章 引言"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
