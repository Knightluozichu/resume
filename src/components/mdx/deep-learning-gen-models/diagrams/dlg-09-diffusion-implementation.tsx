"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤9 扩散模型的实现",
  "9.1 U-Net",
  "9.1.1 什么是U-Net",
  "9.1.2 U-Net的实现",
  "9.2 正弦波位置编码",
  "9.2.1 什么是正弦波位置编码",
  "9.2.2 正弦波位置编码的实现",
  "9.2.3 组合到U-Net中",
] as const;
export function Dlg09DiffusionImplementationMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤9 扩散模型的实现"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function Dlg09DiffusionImplementationExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤9 扩散模型的实现"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Dlg09DiffusionImplementationEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤9 扩散模型的实现"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
