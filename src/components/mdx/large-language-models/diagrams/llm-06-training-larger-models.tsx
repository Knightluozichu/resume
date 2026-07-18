import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "扩大尺度法则",
  "涌现",
  "数据并行",
  "流水线并行",
  "张量并行",
  "低精度训练",
] as const;

export function Llm06TrainingLargerModelsModelLab() {
  return (
    <OfficialLlmBookLab
      title="第6章 训练更大的模型"
      concepts={concepts}
      accent="#a16207"
      view="model"
    />
  );
}
export function Llm06TrainingLargerModelsExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第6章 训练更大的模型"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Llm06TrainingLargerModelsEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第6章 训练更大的模型"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
