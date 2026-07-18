"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "附录C 层级VAE的理论和实现",
  "C.1 两层VAE的构成要素",
  "C.2 ELBO的数学式展开",
  "C.3 利用蒙特卡罗方法近似ELBO",
  "C.4 两层VAE的实现",
  "C.5 实现代码",
] as const;
export function DlgAppendixCHierarchicalVaeMapLab() {
  return (
    <OfficialGenerativeLab
      title="附录C 层级VAE的理论和实现"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function DlgAppendixCHierarchicalVaeExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="附录C 层级VAE的理论和实现"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function DlgAppendixCHierarchicalVaeEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="附录C 层级VAE的理论和实现"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
