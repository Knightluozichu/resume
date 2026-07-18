import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第2章 新能源汽车电机",
  "2.1 直流电机",
  "2.1.1 直流电机结构",
  "2.1.2 直流电机工作原理",
  "2.2 交流异步电机",
  "2.2.1 交流异步电机结构",
] as const;

export function Ine2302MotorsEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第2章：新能源汽车电机"
      concepts={concepts}
      accent="#7c3aed"
      view="energy"
    />
  );
}

export function Ine2302MotorsComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第2章：新能源汽车电机"
      concepts={concepts}
      accent="#7c3aed"
      view="component"
    />
  );
}

export function Ine2302MotorsEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第2章：新能源汽车电机"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
