import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "知识能力",
  "伦理安全",
  "领域评估",
  "指标",
  "人工评估",
  "污染检查",
] as const;

export function Lsl08LlmEvaluationPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第8章 大语言模型评估"
      concepts={concepts}
      accent="#a21caf"
      view="pipeline"
    />
  );
}

export function Lsl08LlmEvaluationTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第8章 大语言模型评估"
      concepts={concepts}
      accent="#a21caf"
      view="training"
    />
  );
}

export function Lsl08LlmEvaluationEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第8章 大语言模型评估"
      concepts={concepts}
      accent="#a21caf"
      view="evidence"
    />
  );
}
