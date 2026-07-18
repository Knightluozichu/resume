"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第3章 线性回归模型",
  "基函数",
  "最小二乘",
  "偏差方差",
  "贝叶斯回归",
  "模型证据",
  "等价核",
  "3.1 Linear Basis Function Models",
] as const;
export function Prl03LinearRegressionMapLab() {
  return (
    <OfficialPrmlLab
      title="第3章 线性回归模型"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Prl03LinearRegressionExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第3章 线性回归模型"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Prl03LinearRegressionEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第3章 线性回归模型"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
