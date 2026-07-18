"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第1章 赌场老虎机问题",
  "第2章 马尔可夫决策过程",
  "第3章 贝尔曼方程",
  "第4章 动态规划法",
  "第5章 蒙特卡罗方法",
  "第6章 TD方法",
  "第7章 神经网络和Q学习",
  "第8章 DQN",
] as const;
export function DlrOfficialFinalReviewMapLab() {
  return (
    <OfficialRlLab
      title="《深度学习入门4：强化学习》全书总复习"
      concepts={concepts}
      accent="#047857"
      view="map"
    />
  );
}
export function DlrOfficialFinalReviewExperimentLab() {
  return (
    <OfficialRlLab
      title="《深度学习入门4：强化学习》全书总复习"
      concepts={concepts}
      accent="#047857"
      view="experiment"
    />
  );
}
export function DlrOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialRlLab
      title="《深度学习入门4：强化学习》全书总复习"
      concepts={concepts}
      accent="#047857"
      view="evidence"
    />
  );
}
