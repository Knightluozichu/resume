"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第7章 神经网络和Q学习",
  "7.1 DeZero简介",
  "7.1.1 使用DeZero",
  "7.1.2 多维数组（张量）和函数",
  "7.1.3 最优化",
  "7.2 线性回归",
  "7.2.1 玩具数据集",
  "7.2.2 线性回归的理论知识",
] as const;
export function Dlr07NeuralQLearningMapLab() {
  return (
    <OfficialRlLab
      title="第7章 神经网络和Q学习"
      concepts={concepts}
      accent="#0369a1"
      view="map"
    />
  );
}
export function Dlr07NeuralQLearningExperimentLab() {
  return (
    <OfficialRlLab
      title="第7章 神经网络和Q学习"
      concepts={concepts}
      accent="#0369a1"
      view="experiment"
    />
  );
}
export function Dlr07NeuralQLearningEvidenceLab() {
  return (
    <OfficialRlLab
      title="第7章 神经网络和Q学习"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
