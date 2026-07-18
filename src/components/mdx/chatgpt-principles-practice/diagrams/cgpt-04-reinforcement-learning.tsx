import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "马尔可夫决策过程",
  "状态",
  "动作",
  "回报",
  "价值函数",
  "策略梯度",
] as const;

export function Cgpt04ReinforcementLearningArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第4章 强化学习基础"
      concepts={concepts}
      accent="#0369a1"
      view="architecture"
    />
  );
}
export function Cgpt04ReinforcementLearningTrainingLab() {
  return (
    <OfficialCgptLab
      title="第4章 强化学习基础"
      concepts={concepts}
      accent="#0369a1"
      view="training"
    />
  );
}
export function Cgpt04ReinforcementLearningEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第4章 强化学习基础"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
