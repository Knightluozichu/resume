"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "附录E 拉格朗日乘子",
  "等式约束",
  "拉格朗日函数",
  "可行域",
  "驻点条件",
  "对偶变量",
  "KKT条件",
] as const;
export function PrlAppendixELagrangeMultipliersMapLab() {
  return (
    <OfficialPrmlLab
      title="附录E 拉格朗日乘子"
      concepts={concepts}
      accent="#6d28d9"
      view="map"
    />
  );
}
export function PrlAppendixELagrangeMultipliersExperimentLab() {
  return (
    <OfficialPrmlLab
      title="附录E 拉格朗日乘子"
      concepts={concepts}
      accent="#6d28d9"
      view="experiment"
    />
  );
}
export function PrlAppendixELagrangeMultipliersEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="附录E 拉格朗日乘子"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
