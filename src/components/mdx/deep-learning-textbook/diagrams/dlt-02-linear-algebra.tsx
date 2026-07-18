"use client";
import { OfficialDeepLearningLab } from "./official-deep-learning-lab";
const concepts = [
  "第1部分 应用数学与机器学习基础",
  "第2章 线性代数",
  "2.1 标量、向量、矩阵和张量",
  "2.2 矩阵和向量相乘",
  "2.3 单位矩阵和逆矩阵",
  "2.4 线性相关和生成子空间",
  "2.5 范数",
  "2.6 特殊类型的矩阵和向量",
] as const;
export function Dlt02LinearAlgebraMapLab() {
  return (
    <OfficialDeepLearningLab
      title="第2章 线性代数"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlt02LinearAlgebraExperimentLab() {
  return (
    <OfficialDeepLearningLab
      title="第2章 线性代数"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlt02LinearAlgebraEvidenceLab() {
  return (
    <OfficialDeepLearningLab
      title="第2章 线性代数"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
