"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "定义输入输出",
  "写出有限步骤",
  "选择典型模式",
  "估算操作次数",
  "利用数据规律",
  "纸上回放验证",
] as const;
const concepts = [
  "第5章 与算法成为好朋友的七个要点",
  "5.1 算法是程序设计的“熟语”",
  "5.2 要点1：算法中解决问题的步骤是明确且有限的",
  "5.3 要点2：计算机不靠直觉而是机械地解决问题",
  "5.4 要点3：了解并应用典型算法",
  "5.5 要点4：利用计算机的处理速度",
  "5.6 要点5：使用编程技巧提升程序执行速度",
  "5.7 要点6：找出数字间的规律",
  "5.8 要点7：先在纸上考虑算法",
] as const;
const common = {
  title: "第 5 章 与算法成为好朋友的七个要点",
  label: "计算机怎样运行 · 程序与算法",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain,
  concepts,
} as const;
export function Hcw05AlgorithmsMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw05AlgorithmsExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw05AlgorithmsEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
