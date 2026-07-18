import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = [
  "第4章 纯电动汽车",
  "4.1 概述",
  "4.1.1 纯电动汽车组成",
  "4.1.2 纯电动汽车充电系统",
  "4.2 特斯拉纯电动汽车",
  "4.2.1 特斯拉纯电动汽车Model S",
] as const;

export function Ine2304BatteryElectricVehiclesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="第4章：纯电动汽车"
      concepts={concepts}
      accent="#0369a1"
      view="energy"
    />
  );
}

export function Ine2304BatteryElectricVehiclesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="第4章：纯电动汽车"
      concepts={concepts}
      accent="#0369a1"
      view="component"
    />
  );
}

export function Ine2304BatteryElectricVehiclesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="第4章：纯电动汽车"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
