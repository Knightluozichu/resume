"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第8章 DQN",
  "8.1 OpenAI Gym",
  "8.1.1 OpenAI Gym的基础知识",
  "8.1.2 随机智能体",
  "8.2 DQN的核心技术",
  "8.2.1 经验回放（Experience Replay）",
  "8.2.2 经验回放的实现",
  "8.2.3 目标网络（Target Network）",
] as const;
export function Dlr08DqnMapLab() {
  return (
    <OfficialRlLab
      title="第8章 DQN"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function Dlr08DqnExperimentLab() {
  return (
    <OfficialRlLab
      title="第8章 DQN"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Dlr08DqnEvidenceLab() {
  return (
    <OfficialRlLab
      title="第8章 DQN"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
