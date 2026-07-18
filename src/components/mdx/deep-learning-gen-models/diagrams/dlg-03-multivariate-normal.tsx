"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤3 多维正态分布",
  "3.1 NumPy和多维数组",
  "3.1.1 多维数组",
  "3.1.2 NumPy中的多维数组",
  "3.1.3 逐元素的运算",
  "3.1.4 向量的内积和矩阵积",
  "3.2 多维正态分布",
  "3.2.1 多维正态分布的数学式",
] as const;
export function Dlg03MultivariateNormalMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤3 多维正态分布"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function Dlg03MultivariateNormalExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤3 多维正态分布"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Dlg03MultivariateNormalEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤3 多维正态分布"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
