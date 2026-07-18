"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "附录A 异策略型的蒙特卡罗方法",
  "A.1 异策略型的蒙特卡罗方法的理论",
  "A.2 异策略型的蒙特卡罗方法的实现",
] as const;
export function DlrAppendixAOffPolicyMcMapLab() {
  return (
    <OfficialRlLab
      title="附录A 异策略型的蒙特卡罗方法"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function DlrAppendixAOffPolicyMcExperimentLab() {
  return (
    <OfficialRlLab
      title="附录A 异策略型的蒙特卡罗方法"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function DlrAppendixAOffPolicyMcEvidenceLab() {
  return (
    <OfficialRlLab
      title="附录A 异策略型的蒙特卡罗方法"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
