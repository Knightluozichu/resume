"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第12章 连续潜变量",
  "主成分分析",
  "概率PCA",
  "因子分析",
  "核PCA",
  "独立成分分析",
  "非线性流形",
  "12.1 Principal Component Analysis",
] as const;
export function Prl12ContinuousLatentVariablesMapLab() {
  return (
    <OfficialPrmlLab
      title="第12章 连续潜变量"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Prl12ContinuousLatentVariablesExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第12章 连续潜变量"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Prl12ContinuousLatentVariablesEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第12章 连续潜变量"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
