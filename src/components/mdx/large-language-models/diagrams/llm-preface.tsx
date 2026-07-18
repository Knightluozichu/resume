import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "阅读合同",
  "论文证据",
  "版本边界",
  "复现实验",
  "比较矩阵",
  "未知项",
] as const;

export function LlmPrefaceModelLab() {
  return (
    <OfficialLlmBookLab
      title="前言"
      concepts={concepts}
      accent="#0f766e"
      view="model"
    />
  );
}
export function LlmPrefaceExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="前言"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function LlmPrefaceEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="前言"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
