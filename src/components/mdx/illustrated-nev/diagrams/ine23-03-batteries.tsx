import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第3章 新能源汽车电池",
  "3.1 锂离子电池",
  "3.1.1 锂离子电池的结构",
  "3.1.2 锂离子电池的工作原理",
  "3.2 镍氢电池",
  "3.2.1 镍氢电池的结构",
] as const;

export function Ine2303BatteriesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第3章：新能源汽车电池"
      concepts={concepts}
      accent="#15803d"
      view="energy"
    />
  );
}

export function Ine2303BatteriesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第3章：新能源汽车电池"
      concepts={concepts}
      accent="#15803d"
      view="component"
    />
  );
}

export function Ine2303BatteriesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第3章：新能源汽车电池"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
