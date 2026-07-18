import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第1章 新能源汽车分类",
  "1.1 电动汽车",
  "1.1.1 纯电动汽车",
  "1.1.2 混合动力电动汽车",
  "1.1.3 燃料电池电动汽车",
  "1.2 燃气汽车",
] as const;

export function Ine2301ClassificationEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第1章：新能源汽车分类"
      concepts={concepts}
      accent="#2563eb"
      view="energy"
    />
  );
}

export function Ine2301ClassificationComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第1章：新能源汽车分类"
      concepts={concepts}
      accent="#2563eb"
      view="component"
    />
  );
}

export function Ine2301ClassificationEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第1章：新能源汽车分类"
      concepts={concepts}
      accent="#2563eb"
      view="evidence"
    />
  );
}
