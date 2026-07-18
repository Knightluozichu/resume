import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "微调决策",
  "训练数据",
  "词元化",
  "评估指标",
  "检查点",
  "灾难性遗忘",
] as const;

export function Bla11FineTuningFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 11: Fine-Tuning Large Language Models"
      concepts={concepts}
      accent="#0e7490"
      view="pipeline"
    />
  );
}

export function Bla11FineTuningExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 11: Fine-Tuning Large Language Models"
      concepts={concepts}
      accent="#0e7490"
      view="training"
    />
  );
}

export function Bla11FineTuningEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 11: Fine-Tuning Large Language Models"
      concepts={concepts}
      accent="#0e7490"
      view="evidence"
    />
  );
}
