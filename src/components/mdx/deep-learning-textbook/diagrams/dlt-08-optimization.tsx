"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第8章 深度模型中的优化",
  "8.1 学习和纯优化有何不同",
  "8.2 神经网络优化中的挑战",
  "8.3 基本算法",
  "8.4 参数初始化策略",
  "8.5 自适应学习率算法",
  "8.6 二阶近似方法",
  "8.7 优化策略和元算法",
] as const;
export function Dlt08OptimizationMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第8章 深度模型中的优化"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlt08OptimizationExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第8章 深度模型中的优化"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlt08OptimizationEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第8章 深度模型中的优化"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
