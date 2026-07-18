"use client";
import { OfficialRlcLab } from "./official-rlc-lab";
const concepts = [
  "第2章 强化学习的实现",
  "Q学习",
  "Q表",
  "TD误差",
  "探索利用",
  "状态转移",
  "终止状态",
  "强化学习与Q学习",
] as const;
export function Rlc02ReinforcementImplementationMapLab() {
  return (
    <OfficialRlcLab
      title="第2章 强化学习的实现"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Rlc02ReinforcementImplementationExperimentLab() {
  return (
    <OfficialRlcLab
      title="第2章 强化学习的实现"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Rlc02ReinforcementImplementationEvidenceLab() {
  return (
    <OfficialRlcLab
      title="第2章 强化学习的实现"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
