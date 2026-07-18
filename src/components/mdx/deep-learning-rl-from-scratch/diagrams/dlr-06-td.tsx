"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第6章 TD方法",
  "6.1 使用TD方法评估策略",
  "6.1.1 TD方法的推导",
  "6.1.2 MC方法和TD方法的比较",
  "6.1.3 TD方法的实现",
  "6.2 SARSA",
  "6.2.1 同策略型的SARSA",
  "6.2.2 SARSA的实现",
] as const;
export function Dlr06TdMapLab() {
  return (
    <OfficialRlLab
      title="第6章 TD方法"
      concepts={concepts}
      accent="#c2410c"
      view="map"
    />
  );
}
export function Dlr06TdExperimentLab() {
  return (
    <OfficialRlLab
      title="第6章 TD方法"
      concepts={concepts}
      accent="#c2410c"
      view="experiment"
    />
  );
}
export function Dlr06TdEvidenceLab() {
  return (
    <OfficialRlLab
      title="第6章 TD方法"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
