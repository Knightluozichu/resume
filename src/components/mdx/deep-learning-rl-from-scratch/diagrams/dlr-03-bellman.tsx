"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = [
  "第3章 贝尔曼方程",
  "3.1 贝尔曼方程的推导",
  "3.1.1 概率和期望值（推导贝尔曼方程的准备）",
  "3.1.2 贝尔曼方程的推导",
  "3.2 贝尔曼方程的例子",
  "3.2.1 2格网格世界",
  "3.2.2 贝尔曼方程的意义",
  "3.3 动作价值函数与贝尔曼方程",
] as const;
export function Dlr03BellmanMapLab() {
  return (
    <OfficialRlLab
      title="第3章 贝尔曼方程"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}
export function Dlr03BellmanExperimentLab() {
  return (
    <OfficialRlLab
      title="第3章 贝尔曼方程"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}
export function Dlr03BellmanEvidenceLab() {
  return (
    <OfficialRlLab
      title="第3章 贝尔曼方程"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
