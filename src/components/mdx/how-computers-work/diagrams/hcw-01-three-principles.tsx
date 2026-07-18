"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "辨认输入边界",
  "编码指令数据",
  "按序执行运算",
  "保存中间状态",
  "产生可见输出",
  "核对三项原则",
] as const;
const concepts = [
  "第1章 计算机的三大原则",
  "1.1 计算机的三个根本性基础",
  "1.2 输入、运算、输出是硬件的基础",
  "1.3 软件是指令和数据的集合",
  "1.4 对计算机来说什么都是数字",
  "1.5 只要理解了三大原则，即使遇到难懂的新技术，也能轻松应对",
  "1.6 为了贴近人类，计算机在不断地进化",
  "1.7 稍微预习一下第2章",
] as const;
const common = {
  title: "第 1 章 计算机的三大原则",
  label: "计算机怎样运行 · 原则与硬件",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Hcw01ThreePrinciplesMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw01ThreePrinciplesExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw01ThreePrinciplesEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
