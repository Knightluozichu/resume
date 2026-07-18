"use client";
import { OfficialRlcLab } from "./official-rlc-lab";
const concepts = [
  "第4章 深度强化学习",
  "函数近似",
  "网络Q值",
  "TD目标",
  "动作输出",
  "q21dl.c",
  "q22dl.c",
  "通过融合强化学习与深度学习实现深度强化学习",
] as const;
export function Rlc04DeepReinforcementLearningMapLab() {
  return (
    <OfficialRlcLab
      title="第4章 深度强化学习"
      concepts={concepts}
      accent="#6d28d9"
      view="map"
    />
  );
}
export function Rlc04DeepReinforcementLearningExperimentLab() {
  return (
    <OfficialRlcLab
      title="第4章 深度强化学习"
      concepts={concepts}
      accent="#6d28d9"
      view="experiment"
    />
  );
}
export function Rlc04DeepReinforcementLearningEvidenceLab() {
  return (
    <OfficialRlcLab
      title="第4章 深度强化学习"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
