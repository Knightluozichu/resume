"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "步骤5 EM算法",
  "5.1 KL散度",
  "5.1.1 关于数学式的表示方法",
  "5.1.2 KL散度的定义式",
  "5.1.3 KL散度与最大似然估计之间的关系",
  "5.2 EM算法的推导①",
  "5.2.1 拥有潜变量的模型",
  "5.2.2 任意概率分布q(z)",
] as const;
export function Dlg05EmAlgorithmMapLab() {
  return (
    <OfficialGenerativeLab
      title="步骤5 EM算法"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Dlg05EmAlgorithmExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="步骤5 EM算法"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Dlg05EmAlgorithmEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="步骤5 EM算法"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
