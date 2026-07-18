"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第4章 线性分类模型",
  "判别函数",
  "Fisher判别",
  "感知机",
  "逻辑回归",
  "IRLS",
  "Laplace近似",
  "4.1 Discriminant Functions",
] as const;
export function Prl04LinearClassificationMapLab() {
  return (
    <OfficialPrmlLab
      title="第4章 线性分类模型"
      concepts={concepts}
      accent="#6d28d9"
      view="map"
    />
  );
}
export function Prl04LinearClassificationExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第4章 线性分类模型"
      concepts={concepts}
      accent="#6d28d9"
      view="experiment"
    />
  );
}
export function Prl04LinearClassificationEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第4章 线性分类模型"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
