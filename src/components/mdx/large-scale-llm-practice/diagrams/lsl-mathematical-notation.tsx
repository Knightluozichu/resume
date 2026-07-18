import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = ["形状", "序列", "概率", "注意力", "优化", "策略"] as const;

export function LslMathematicalNotationPipelineLab() {
  return (
    <OfficialLslBookLab
      title="数学符号"
      concepts={concepts}
      accent="#1d4ed8"
      view="pipeline"
    />
  );
}

export function LslMathematicalNotationTrainingLab() {
  return (
    <OfficialLslBookLab
      title="数学符号"
      concepts={concepts}
      accent="#1d4ed8"
      view="training"
    />
  );
}

export function LslMathematicalNotationEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="数学符号"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
