import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第6章 燃料电池汽车",
  "6.1 概述",
  "6.2 Mirai燃料电池汽车",
  "6.2.1 燃料电池",
  "6.2.2 燃料电池堆",
  "6.2.3 燃料电池辅助系统",
] as const;

export function Ine2306FuelCellVehiclesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第6章：燃料电池汽车"
      concepts={concepts}
      accent="#0891b2"
      view="energy"
    />
  );
}

export function Ine2306FuelCellVehiclesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第6章：燃料电池汽车"
      concepts={concepts}
      accent="#0891b2"
      view="component"
    />
  );
}

export function Ine2306FuelCellVehiclesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第6章：燃料电池汽车"
      concepts={concepts}
      accent="#0891b2"
      view="evidence"
    />
  );
}
