import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "偏好数据",
  "KL散度",
  "PPO",
  "分布控制",
  "AI反馈",
  "自我反馈",
] as const;

export function Llm09HumanPreferenceAlignmentModelLab() {
  return (
    <OfficialLlmBookLab
      title="第9章 对齐语言模型与人类偏好"
      concepts={concepts}
      accent="#0e7490"
      view="model"
    />
  );
}
export function Llm09HumanPreferenceAlignmentExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第9章 对齐语言模型与人类偏好"
      concepts={concepts}
      accent="#0e7490"
      view="experiment"
    />
  );
}
export function Llm09HumanPreferenceAlignmentEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第9章 对齐语言模型与人类偏好"
      concepts={concepts}
      accent="#0e7490"
      view="evidence"
    />
  );
}
