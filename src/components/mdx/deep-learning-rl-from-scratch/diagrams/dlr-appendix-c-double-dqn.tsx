"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "附录C Double DQN的理解",
  "C.1 什么是过大估计",
  "C.2 过大估计的解决方法",
] as const;
export function DlrAppendixCDoubleDqnMapLab() {
  return (
    <OfficialRlLab
      title="附录C Double DQN的理解"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function DlrAppendixCDoubleDqnExperimentLab() {
  return (
    <OfficialRlLab
      title="附录C Double DQN的理解"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function DlrAppendixCDoubleDqnEvidenceLab() {
  return (
    <OfficialRlLab
      title="附录C Double DQN的理解"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
