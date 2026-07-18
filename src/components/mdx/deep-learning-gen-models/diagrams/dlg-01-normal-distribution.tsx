"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤1 正态分布",
  "1.1 概率的基础知识",
  "1.1.1 随机变量和概率分布",
  "1.1.2 概率分布的类型",
  "1.1.3 期望值和方差",
  "1.2 正态分布",
  "1.2.1 正态分布的概率密度函数",
  "1.2.2 正态分布的代码实现",
] as const;
export function Dlg01NormalDistributionMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤1 正态分布"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlg01NormalDistributionExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤1 正态分布"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlg01NormalDistributionEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤1 正态分布"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
