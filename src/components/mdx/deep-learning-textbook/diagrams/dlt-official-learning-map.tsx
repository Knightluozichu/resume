"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第1部分 应用数学与机器学习基础",
  "第2部分 深度网络：现代实践",
  "第3部分 深度学习研究",
  "第1章 引言",
  "第2章 线性代数",
  "第3章 概率与信息论",
  "第4章 数值计算",
  "第5章 机器学习基础",
] as const;
export function DltOfficialLearningMapMapLab() {
  return (
    <OfficialDeepLearningLab
      title="《深度学习》权威学习地图"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function DltOfficialLearningMapExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="《深度学习》权威学习地图"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function DltOfficialLearningMapEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="《深度学习》权威学习地图"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
