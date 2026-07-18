"use client";
import { OfficialRlcLab } from "./official-rlc-lab";
const concepts = [
  "第1章 强化学习与深度学习",
  "人工智能",
  "机器学习",
  "强化学习",
  "神经网络",
  "深度学习",
  "深度强化学习",
  "机器学习与强化学习",
] as const;
export function Rlc01RlDeepLearningMapLab() {
  return (
    <OfficialRlcLab
      title="第1章 强化学习与深度学习"
      concepts={concepts}
      accent="#b45309"
      view="map"
    />
  );
}
export function Rlc01RlDeepLearningExperimentLab() {
  return (
    <OfficialRlcLab
      title="第1章 强化学习与深度学习"
      concepts={concepts}
      accent="#b45309"
      view="experiment"
    />
  );
}
export function Rlc01RlDeepLearningEvidenceLab() {
  return (
    <OfficialRlcLab
      title="第1章 强化学习与深度学习"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
