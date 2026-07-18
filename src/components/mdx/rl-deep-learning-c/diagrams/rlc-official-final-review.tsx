"use client";
import { OfficialRlcLab } from "./official-rlc-lab";
const concepts = [
  "《强化学习与深度学习：通过C语言模拟》全书总复习",
  "环境转移",
  "Q值更新",
  "网络前向",
  "误差反传",
  "函数近似",
  "独立重放",
  "第1章 强化学习与深度学习",
] as const;
export function RlcOfficialFinalReviewMapLab() {
  return (
    <OfficialRlcLab
      title="《强化学习与深度学习：通过C语言模拟》全书总复习"
      concepts={concepts}
      accent="#0369a1"
      view="map"
    />
  );
}
export function RlcOfficialFinalReviewExperimentLab() {
  return (
    <OfficialRlcLab
      title="《强化学习与深度学习：通过C语言模拟》全书总复习"
      concepts={concepts}
      accent="#0369a1"
      view="experiment"
    />
  );
}
export function RlcOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialRlcLab
      title="《强化学习与深度学习：通过C语言模拟》全书总复习"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
