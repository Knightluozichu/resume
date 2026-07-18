"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第11章 实践方法论",
  "11.1 性能度量",
  "11.2 默认的基准模型",
  "11.3 决定是否收集更多数据",
  "11.4 选择超参数",
  "11.5 调试策略",
  "11.6 示例：多位数字识别",
] as const;
export function Dlt11PracticalMethodologyMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第11章 实践方法论"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Dlt11PracticalMethodologyExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第11章 实践方法论"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Dlt11PracticalMethodologyEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第11章 实践方法论"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
