import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "偏见",
  "有害性",
  "群体切片",
  "脱毒",
  "正则化",
  "安全效用权衡",
] as const;

export function Llm10BiasToxicityModelLab() {
  return (
    <OfficialLlmBookLab
      title="第10章 减少偏见和有害性"
      concepts={concepts}
      accent="#6d28d9"
      view="model"
    />
  );
}
export function Llm10BiasToxicityExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第10章 减少偏见和有害性"
      concepts={concepts}
      accent="#6d28d9"
      view="experiment"
    />
  );
}
export function Llm10BiasToxicityEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第10章 减少偏见和有害性"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
