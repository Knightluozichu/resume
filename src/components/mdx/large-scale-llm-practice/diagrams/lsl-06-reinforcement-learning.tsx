import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "偏好数据",
  "奖励建模",
  "策略优化",
  "优势估计",
  "KL约束",
  "安全门禁",
] as const;

export function Lsl06ReinforcementLearningPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第6章 强化学习"
      concepts={concepts}
      accent="#4338ca"
      view="pipeline"
    />
  );
}

export function Lsl06ReinforcementLearningTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第6章 强化学习"
      concepts={concepts}
      accent="#4338ca"
      view="training"
    />
  );
}

export function Lsl06ReinforcementLearningEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第6章 强化学习"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
