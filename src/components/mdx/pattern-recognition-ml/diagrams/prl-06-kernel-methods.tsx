"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第6章 核方法",
  "对偶表示",
  "核函数",
  "Gram矩阵",
  "径向基函数",
  "高斯过程",
  "自动相关性确定",
  "6.1 Dual Representations",
] as const;
export function Prl06KernelMethodsMapLab() {
  return (
    <OfficialPrmlLab
      title="第6章 核方法"
      concepts={concepts}
      accent="#b45309"
      view="map"
    />
  );
}
export function Prl06KernelMethodsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第6章 核方法"
      concepts={concepts}
      accent="#b45309"
      view="experiment"
    />
  );
}
export function Prl06KernelMethodsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第6章 核方法"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
