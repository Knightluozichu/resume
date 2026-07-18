"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第8章 图模型",
  "贝叶斯网络",
  "条件独立",
  "d-separation",
  "马尔可夫随机场",
  "因子图",
  "sum-product",
  "8.1 Bayesian Networks",
] as const;
export function Prl08GraphicalModelsMapLab() {
  return (
    <OfficialPrmlLab
      title="第8章 图模型"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Prl08GraphicalModelsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第8章 图模型"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Prl08GraphicalModelsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第8章 图模型"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
