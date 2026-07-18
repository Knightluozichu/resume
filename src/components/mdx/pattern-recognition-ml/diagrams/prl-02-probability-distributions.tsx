"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第2章 概率分布",
  "共轭先验",
  "充分统计量",
  "指数族",
  "高斯分布",
  "核密度估计",
  "最近邻",
  "2.1 Binary Variables",
] as const;
export function Prl02ProbabilityDistributionsMapLab() {
  return (
    <OfficialPrmlLab
      title="第2章 概率分布"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Prl02ProbabilityDistributionsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第2章 概率分布"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Prl02ProbabilityDistributionsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第2章 概率分布"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
