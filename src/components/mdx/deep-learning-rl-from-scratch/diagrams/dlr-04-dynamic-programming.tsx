"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第4章 动态规划法",
  "4.1 动态规划法和策略评估",
  "4.1.1 动态规划法简介",
  "4.1.2 尝试迭代策略评估",
  "4.1.3 迭代策略评估的其他实现方式",
  "4.2 解决更大的问题",
  "4.2.1 GridWorld类的实现",
  "4.2.2 defaultdict的用法",
] as const;
export function Dlr04DynamicProgrammingMapLab() {
  return (
    <OfficialRlLab
      title="第4章 动态规划法"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function Dlr04DynamicProgrammingExperimentLab() {
  return (
    <OfficialRlLab
      title="第4章 动态规划法"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function Dlr04DynamicProgrammingEvidenceLab() {
  return (
    <OfficialRlLab
      title="第4章 动态规划法"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
