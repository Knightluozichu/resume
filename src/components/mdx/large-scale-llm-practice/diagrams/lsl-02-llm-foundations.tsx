import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "嵌入",
  "注意力",
  "前馈层",
  "残差归一化",
  "GPT预训练",
  "LLaMA结构",
] as const;

export function Lsl02LlmFoundationsPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第2章 大语言模型基础"
      concepts={concepts}
      accent="#4d7c0f"
      view="pipeline"
    />
  );
}

export function Lsl02LlmFoundationsTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第2章 大语言模型基础"
      concepts={concepts}
      accent="#4d7c0f"
      view="training"
    />
  );
}

export function Lsl02LlmFoundationsEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第2章 大语言模型基础"
      concepts={concepts}
      accent="#4d7c0f"
      view="evidence"
    />
  );
}
