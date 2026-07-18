"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤10 扩散模型的应用",
  "10.1 条件扩散模型",
  "10.1.1 向扩散模型添加条件",
  "10.1.2 条件扩散模型的实现",
  "10.2 分数函数",
  "10.2.1 什么是分数函数",
  "10.2.2 式(10.1)的证明",
  "10.3 分类器引导",
] as const;
export function Dlg10DiffusionApplicationsMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤10 扩散模型的应用"
      concepts={concepts}
      accent="#7c3aed"
      view="map"
    />
  );
}
export function Dlg10DiffusionApplicationsExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤10 扩散模型的应用"
      concepts={concepts}
      accent="#7c3aed"
      view="experiment"
    />
  );
}
export function Dlg10DiffusionApplicationsEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤10 扩散模型的应用"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
