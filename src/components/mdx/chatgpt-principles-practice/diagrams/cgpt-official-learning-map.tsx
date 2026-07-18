import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "目录分母",
  "预训练",
  "提示学习",
  "强化学习",
  "RLHF",
  "私有化实战",
] as const;

export function CgptOfficialLearningMapArchitectureLab() {
  return (
    <OfficialCgptLab
      title="《ChatGPT原理与实战》权威学习地图"
      concepts={concepts}
      accent="#1d4ed8"
      view="architecture"
    />
  );
}
export function CgptOfficialLearningMapTrainingLab() {
  return (
    <OfficialCgptLab
      title="《ChatGPT原理与实战》权威学习地图"
      concepts={concepts}
      accent="#1d4ed8"
      view="training"
    />
  );
}
export function CgptOfficialLearningMapEvidenceLab() {
  return (
    <OfficialCgptLab
      title="《ChatGPT原理与实战》权威学习地图"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
