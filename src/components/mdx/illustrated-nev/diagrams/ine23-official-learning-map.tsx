import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "内容提要",
  "前言",
  "第1章 新能源汽车分类",
  "第2章 新能源汽车电机",
  "第3章 新能源汽车电池",
  "第4章 纯电动汽车",
] as const;

export function Ine23OfficialLearningMapEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="《图解新能源汽车原理与构造》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="energy"
    />
  );
}

export function Ine23OfficialLearningMapComponentLab() {
  return (
    <OfficialIne23BookLab
      title="《图解新能源汽车原理与构造》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="component"
    />
  );
}

export function Ine23OfficialLearningMapEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="《图解新能源汽车原理与构造》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
