"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第18章 直面配分函数",
  "18.1 对数似然梯度",
  "18.2 随机最大似然和对比散度",
  "18.3 伪似然",
  "18.4 得分匹配和比率匹配",
  "18.5 去噪得分匹配",
  "18.6 噪声对比估计",
  "18.7 估计配分函数",
] as const;
export function Dlt18PartitionFunctionMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第18章 直面配分函数"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function Dlt18PartitionFunctionExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第18章 直面配分函数"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function Dlt18PartitionFunctionEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第18章 直面配分函数"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
