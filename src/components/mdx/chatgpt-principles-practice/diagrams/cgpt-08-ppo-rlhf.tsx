import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "优势函数",
  "重要性比率",
  "裁剪目标",
  "奖励模型",
  "KL惩罚",
  "奖励投机",
] as const;

export function Cgpt08PpoRlhfArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第8章 PPO算法与RLHF理论实战"
      concepts={concepts}
      accent="#c2410c"
      view="architecture"
    />
  );
}
export function Cgpt08PpoRlhfTrainingLab() {
  return (
    <OfficialCgptLab
      title="第8章 PPO算法与RLHF理论实战"
      concepts={concepts}
      accent="#c2410c"
      view="training"
    />
  );
}
export function Cgpt08PpoRlhfEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第8章 PPO算法与RLHF理论实战"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
