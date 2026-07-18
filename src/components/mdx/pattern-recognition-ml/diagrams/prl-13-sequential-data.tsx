"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第13章 序列数据",
  "马尔可夫模型",
  "隐马尔可夫模型",
  "前向后向",
  "Viterbi",
  "线性动态系统",
  "粒子滤波",
  "13.1 Markov Models",
] as const;
export function Prl13SequentialDataMapLab() {
  return (
    <OfficialPrmlLab
      title="第13章 序列数据"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Prl13SequentialDataExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第13章 序列数据"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Prl13SequentialDataEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第13章 序列数据"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
