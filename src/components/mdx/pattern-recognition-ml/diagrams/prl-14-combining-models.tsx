"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "第14章 模型组合",
  "模型平均",
  "委员会",
  "Boosting",
  "决策树",
  "条件混合",
  "专家混合",
  "14.1 Bayesian Model Averaging",
] as const;
export function Prl14CombiningModelsMapLab() {
  return (
    <OfficialPrmlLab
      title="第14章 模型组合"
      concepts={concepts}
      accent="#6d28d9"
      view="map"
    />
  );
}
export function Prl14CombiningModelsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="第14章 模型组合"
      concepts={concepts}
      accent="#6d28d9"
      view="experiment"
    />
  );
}
export function Prl14CombiningModelsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="第14章 模型组合"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
