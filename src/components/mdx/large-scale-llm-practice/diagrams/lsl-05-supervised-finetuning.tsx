import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "提示",
  "示例",
  "低秩适配",
  "上下文扩展",
  "指令构建",
  "监督微调",
] as const;

export function Lsl05SupervisedFinetuningPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第5章 有监督微调"
      concepts={concepts}
      accent="#c2410c"
      view="pipeline"
    />
  );
}

export function Lsl05SupervisedFinetuningTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第5章 有监督微调"
      concepts={concepts}
      accent="#c2410c"
      view="training"
    />
  );
}

export function Lsl05SupervisedFinetuningEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第5章 有监督微调"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
