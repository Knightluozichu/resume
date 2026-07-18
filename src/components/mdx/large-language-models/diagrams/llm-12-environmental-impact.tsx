import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "能源消耗",
  "碳强度",
  "硬件利用率",
  "训练排放",
  "推理排放",
  "系统边界",
] as const;

export function Llm12EnvironmentalImpactModelLab() {
  return (
    <OfficialLlmBookLab
      title="第12章 环境影响"
      concepts={concepts}
      accent="#047857"
      view="model"
    />
  );
}
export function Llm12EnvironmentalImpactExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第12章 环境影响"
      concepts={concepts}
      accent="#047857"
      view="experiment"
    />
  );
}
export function Llm12EnvironmentalImpactEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第12章 环境影响"
      concepts={concepts}
      accent="#047857"
      view="evidence"
    />
  );
}
