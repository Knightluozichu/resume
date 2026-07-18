import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第7章 天然气汽车",
  "7.1 概述",
  "7.2 奥迪A4 Avant g-tron天然气汽车",
  "7.2.1 加注管口",
  "7.2.2 带有滤清器的止回阀",
  "7.2.3 气瓶和汽油箱",
] as const;

export function Ine2307NaturalGasVehiclesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第7章：天然气汽车"
      concepts={concepts}
      accent="#047857"
      view="energy"
    />
  );
}

export function Ine2307NaturalGasVehiclesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第7章：天然气汽车"
      concepts={concepts}
      accent="#047857"
      view="component"
    />
  );
}

export function Ine2307NaturalGasVehiclesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第7章：天然气汽车"
      concepts={concepts}
      accent="#047857"
      view="evidence"
    />
  );
}
