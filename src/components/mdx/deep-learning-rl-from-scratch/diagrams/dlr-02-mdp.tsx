"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第2章 马尔可夫决策过程",
  "2.1 什么是MDP",
  "2.1.1 MDP的具体例子",
  "2.1.2 智能体与环境的互动",
  "2.2 环境和智能体的数学表示",
  "2.2.1 状态转移",
  "2.2.2 奖励函数",
  "2.2.3 智能体的策略",
] as const;
export function Dlr02MdpMapLab() {
  return (
    <OfficialRlLab
      title="第2章 马尔可夫决策过程"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function Dlr02MdpExperimentLab() {
  return (
    <OfficialRlLab
      title="第2章 马尔可夫决策过程"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function Dlr02MdpEvidenceLab() {
  return (
    <OfficialRlLab
      title="第2章 马尔可夫决策过程"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
