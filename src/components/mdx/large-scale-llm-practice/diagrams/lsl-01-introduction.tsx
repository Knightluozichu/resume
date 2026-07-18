import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "基本概念",
  "发展历程",
  "数据准备",
  "预训练",
  "对齐训练",
  "应用评估",
] as const;

export function Lsl01IntroductionPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第1章 绪论"
      concepts={concepts}
      accent="#be123c"
      view="pipeline"
    />
  );
}

export function Lsl01IntroductionTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第1章 绪论"
      concepts={concepts}
      accent="#be123c"
      view="training"
    />
  );
}

export function Lsl01IntroductionEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第1章 绪论"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
