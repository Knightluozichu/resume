"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第7章 稀疏核机",
  "最大间隔",
  "支持向量",
  "KKT条件",
  "软间隔",
  "RVM",
  "稀疏贝叶斯学习",
  "7.1 Maximum Margin Classifiers",
] as const;
export function Prl07SparseKernelMachinesMapLab() {
  return (
    <OfficialPrmlLab
      title="第7章 稀疏核机"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Prl07SparseKernelMachinesExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第7章 稀疏核机"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Prl07SparseKernelMachinesEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第7章 稀疏核机"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
