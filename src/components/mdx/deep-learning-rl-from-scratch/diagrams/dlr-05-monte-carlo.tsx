"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第5章 蒙特卡罗方法",
  "5.1 蒙特卡罗方法的基础知识",
  "5.1.1 骰子的点数和",
  "5.1.2 分布模型和样本模型",
  "5.1.3 蒙特卡罗方法的实现",
  "5.2 使用蒙特卡罗方法评估策略",
  "5.2.1 使用蒙特卡罗方法计算价值函数",
  "5.2.2 求所有状态的价值函数",
] as const;
export function Dlr05MonteCarloMapLab() {
  return (
    <OfficialRlLab
      title="第5章 蒙特卡罗方法"
      concepts={concepts}
      accent="#047857"
      view="map"
    />
  );
}
export function Dlr05MonteCarloExperimentLab() {
  return (
    <OfficialRlLab
      title="第5章 蒙特卡罗方法"
      concepts={concepts}
      accent="#047857"
      view="experiment"
    />
  );
}
export function Dlr05MonteCarloEvidenceLab() {
  return (
    <OfficialRlLab
      title="第5章 蒙特卡罗方法"
      concepts={concepts}
      accent="#047857"
      view="evidence"
    />
  );
}
