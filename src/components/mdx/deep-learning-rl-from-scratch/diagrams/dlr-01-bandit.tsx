"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第1章 赌场老虎机问题",
  "1.1 机器学习的分类与强化学习",
  "1.1.1 监督学习",
  "1.1.2 无监督学习",
  "1.1.3 强化学习",
  "1.2 赌场老虎机问题",
  "1.2.1 什么是赌场老虎机问题",
  "1.2.2 什么是好的老虎机",
] as const;
export function Dlr01BanditMapLab() {
  return (
    <OfficialRlLab
      title="第1章 赌场老虎机问题"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function Dlr01BanditExperimentLab() {
  return (
    <OfficialRlLab
      title="第1章 赌场老虎机问题"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function Dlr01BanditEvidenceLab() {
  return (
    <OfficialRlLab
      title="第1章 赌场老虎机问题"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
