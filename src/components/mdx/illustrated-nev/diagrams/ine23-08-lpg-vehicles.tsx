import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第8章 液化石油气汽车",
  "8.1 概述",
  "8.2 高尔夫液化石油气汽车",
  "8.2.1 LPG供给系统",
  "8.2.2 储气瓶",
  "8.2.3 LPG气瓶集成阀",
] as const;

export function Ine2308LpgVehiclesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第8章：液化石油气汽车"
      concepts={concepts}
      accent="#c2410c"
      view="energy"
    />
  );
}

export function Ine2308LpgVehiclesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第8章：液化石油气汽车"
      concepts={concepts}
      accent="#c2410c"
      view="component"
    />
  );
}

export function Ine2308LpgVehiclesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第8章：液化石油气汽车"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
