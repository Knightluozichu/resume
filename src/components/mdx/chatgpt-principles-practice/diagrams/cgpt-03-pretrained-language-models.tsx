import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "自注意力",
  "Encoder",
  "Decoder",
  "掩码目标",
  "UniLM",
  "生成评测",
] as const;

export function Cgpt03PretrainedLanguageModelsArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第3章 预训练语言模型"
      concepts={concepts}
      accent="#be123c"
      view="architecture"
    />
  );
}
export function Cgpt03PretrainedLanguageModelsTrainingLab() {
  return (
    <OfficialCgptLab
      title="第3章 预训练语言模型"
      concepts={concepts}
      accent="#be123c"
      view="training"
    />
  );
}
export function Cgpt03PretrainedLanguageModelsEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第3章 预训练语言模型"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
