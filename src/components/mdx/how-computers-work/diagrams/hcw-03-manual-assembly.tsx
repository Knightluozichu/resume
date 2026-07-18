"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "声明寄存器初值",
  "读取助记符语义",
  "查找操作码",
  "编码地址与立即数",
  "逐指令追踪状态",
  "累计时钟周期",
] as const;
const concepts = [
  "第3章 体验一次手工汇编",
  "3.1 从程序员的角度看硬件",
  "3.2 机器语言和汇编语言",
  "3.3 Z80 CPU的寄存器结构",
  "3.4 追踪程序的运行过程",
  "3.5 尝试手工汇编",
  "3.6 尝试估算程序的执行时间",
] as const;
const common = {
  title: "第 3 章 体验一次手工汇编",
  label: "计算机怎样运行 · 程序与算法",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Hcw03ManualAssemblyMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw03ManualAssemblyExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw03ManualAssemblyEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
