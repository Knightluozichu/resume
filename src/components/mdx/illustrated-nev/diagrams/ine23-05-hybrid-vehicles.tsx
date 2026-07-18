import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第5章 混合动力汽车",
  "5.1 丰田卡罗拉双擎轿车",
  "5.1.1 卡罗拉双擎轿车简介",
  "5.1.2 丰田混合动力系统",
  "5.1.3 卡罗拉双擎发动机",
  "5.1.4 卡罗拉双擎传动桥",
] as const;

export function Ine2305HybridVehiclesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第5章：混合动力汽车"
      concepts={concepts}
      accent="#b45309"
      view="energy"
    />
  );
}

export function Ine2305HybridVehiclesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第5章：混合动力汽车"
      concepts={concepts}
      accent="#b45309"
      view="component"
    />
  );
}

export function Ine2305HybridVehiclesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第5章：混合动力汽车"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
