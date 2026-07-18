import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "原始论文",
  "版本记录",
  "实验设置",
  "基准数据",
  "复现状态",
  "证据等级",
] as const;

export function LlmReferencesModelLab() {
  return (
    <OfficialLlmBookLab
      title="参考文献与研究复核"
      concepts={concepts}
      accent="#9f1239"
      view="model"
    />
  );
}
export function LlmReferencesExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="参考文献与研究复核"
      concepts={concepts}
      accent="#9f1239"
      view="experiment"
    />
  );
}
export function LlmReferencesEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="参考文献与研究复核"
      concepts={concepts}
      accent="#9f1239"
      view="evidence"
    />
  );
}
