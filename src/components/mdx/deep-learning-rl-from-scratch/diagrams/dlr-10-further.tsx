"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第10章 进一步学习",
  "10.1 深度强化学习算法的分类",
  "10.2 策略梯度法的改进算法",
  "10.2.1 A3C、A2C",
  "10.2.2 DDPG",
  "10.2.3 TRPO、PPO",
  "10.3 DQN的改进算法",
  "10.3.1 分类DQN",
] as const;
export function Dlr10FurtherMapLab() {
  return (
    <OfficialRlLab
      title="第10章 进一步学习"
      concepts={concepts}
      accent="#4338ca"
      view="map"
    />
  );
}
export function Dlr10FurtherExperimentLab() {
  return (
    <OfficialRlLab
      title="第10章 进一步学习"
      concepts={concepts}
      accent="#4338ca"
      view="experiment"
    />
  );
}
export function Dlr10FurtherEvidenceLab() {
  return (
    <OfficialRlLab
      title="第10章 进一步学习"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
