import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = ["场景", "智能体", "通信", "合作", "决策", "逻辑"] as const;

export function MasOfficialLearningMapModelLab() {
  return (
    <OfficialMasBookLab
      title="An Introduction to MultiAgent Systems 第二版权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="pipeline"
    />
  );
}

export function MasOfficialLearningMapGameLab() {
  return (
    <OfficialMasBookLab
      title="An Introduction to MultiAgent Systems 第二版权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="training"
    />
  );
}

export function MasOfficialLearningMapEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="An Introduction to MultiAgent Systems 第二版权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
