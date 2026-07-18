import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "分词器",
  "数据并行",
  "张量并行",
  "流水线并行",
  "LoRA",
  "P-Tuning v2",
] as const;

export function Cgpt06LlmPretrainingArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第6章 大型语言模型预训练"
      concepts={concepts}
      accent="#a16207"
      view="architecture"
    />
  );
}
export function Cgpt06LlmPretrainingTrainingLab() {
  return (
    <OfficialCgptLab
      title="第6章 大型语言模型预训练"
      concepts={concepts}
      accent="#a16207"
      view="training"
    />
  );
}
export function Cgpt06LlmPretrainingEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第6章 大型语言模型预训练"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
