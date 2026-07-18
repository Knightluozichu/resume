"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第1章 神经网络的复习",
  "1.1 数学和Python的复习",
  "1.1.1 向量和矩阵",
  "1.1.2 矩阵的对应元素的运算",
  "1.1.3 广播",
  "1.1.4 向量内积和矩阵乘积",
  "1.1.5 矩阵的形状检查",
  "1.2 神经网络的推理",
] as const;

export function Dna01NeuralNetworkReviewMapLab() {
  return (
    <OfficialNlpLab
      title="第1章 神经网络的复习"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}

export function Dna01NeuralNetworkReviewExperimentLab() {
  return (
    <OfficialNlpLab
      title="第1章 神经网络的复习"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}

export function Dna01NeuralNetworkReviewEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第1章 神经网络的复习"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
