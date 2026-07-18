import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "目录分母",
  "论文矩阵",
  "模型合同",
  "实验重放",
  "安全切片",
  "生命周期",
] as const;

export function LlmOfficialLearningMapModelLab() {
  return (
    <OfficialLlmBookLab
      title="《大语言模型：基础与前沿》权威学习地图"
      concepts={concepts}
      accent="#1d4ed8"
      view="model"
    />
  );
}
export function LlmOfficialLearningMapExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="《大语言模型：基础与前沿》权威学习地图"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function LlmOfficialLearningMapEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="《大语言模型：基础与前沿》权威学习地图"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
