"use client";
import { OfficialRlcLab } from "./official-rlc-lab";
const concepts = [
  "《强化学习与深度学习：通过C语言模拟》权威学习地图",
  "Q学习",
  "C语言模拟",
  "分层网络",
  "反向传播",
  "卷积网络",
  "深度强化学习",
  "第1章 强化学习与深度学习",
] as const;
export function RlcOfficialLearningMapMapLab() {
  return (
    <OfficialRlcLab
      title="《强化学习与深度学习：通过C语言模拟》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function RlcOfficialLearningMapExperimentLab() {
  return (
    <OfficialRlcLab
      title="《强化学习与深度学习：通过C语言模拟》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function RlcOfficialLearningMapEvidenceLab() {
  return (
    <OfficialRlcLab
      title="《强化学习与深度学习：通过C语言模拟》权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
