import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "前言",
  "数学符号",
  "模型基础",
  "预训练数据",
  "分布式训练",
  "评估闭环",
] as const;

export function LslOfficialLearningMapPipelineLab() {
  return (
    <OfficialLslBookLab
      title="《大规模语言模型：从理论到实践》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="pipeline"
    />
  );
}

export function LslOfficialLearningMapTrainingLab() {
  return (
    <OfficialLslBookLab
      title="《大规模语言模型：从理论到实践》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="training"
    />
  );
}

export function LslOfficialLearningMapEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="《大规模语言模型：从理论到实践》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
