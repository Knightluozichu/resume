"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "附录B 概率分布",
  "支持域",
  "归一化常数",
  "参数化",
  "期望",
  "协方差",
  "共轭关系",
] as const;
export function PrlAppendixBProbabilityDistributionsMapLab() {
  return (
    <OfficialPrmlLab
      title="附录B 概率分布"
      concepts={concepts}
      accent="#b45309"
      view="map"
    />
  );
}
export function PrlAppendixBProbabilityDistributionsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="附录B 概率分布"
      concepts={concepts}
      accent="#b45309"
      view="experiment"
    />
  );
}
export function PrlAppendixBProbabilityDistributionsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="附录B 概率分布"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
