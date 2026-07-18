"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第1章 引言",
  "多项式拟合",
  "贝叶斯概率",
  "模型选择",
  "维数灾难",
  "决策理论",
  "互信息",
  "1.1 Example: Polynomial Curve Fitting",
] as const;
export function Prl01IntroductionMapLab() {
  return (
    <OfficialPrmlLab
      title="第1章 引言"
      concepts={concepts}
      accent="#b45309"
      view="map"
    />
  );
}
export function Prl01IntroductionExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第1章 引言"
      concepts={concepts}
      accent="#b45309"
      view="experiment"
    />
  );
}
export function Prl01IntroductionEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第1章 引言"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
