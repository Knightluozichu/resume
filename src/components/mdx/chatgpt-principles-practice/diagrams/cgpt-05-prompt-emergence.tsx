import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "提示模板",
  "答案映射",
  "上下文学习",
  "少样本",
  "思维链",
  "情感分类",
] as const;

export function Cgpt05PromptEmergenceArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第5章 提示学习与大型语言模型的涌现"
      concepts={concepts}
      accent="#15803d"
      view="architecture"
    />
  );
}
export function Cgpt05PromptEmergenceTrainingLab() {
  return (
    <OfficialCgptLab
      title="第5章 提示学习与大型语言模型的涌现"
      concepts={concepts}
      accent="#15803d"
      view="training"
    />
  );
}
export function Cgpt05PromptEmergenceEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第5章 提示学习与大型语言模型的涌现"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
