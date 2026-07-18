"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "列出必要元件",
  "读取电路符号",
  "连接地址数据总线",
  "连接I/O与控制线",
  "注入时钟和程序",
  "逐信号调试",
] as const;
const concepts = [
  "第2章 试着制造一台计算机吧",
  "2.1 制作微型计算机所必需的元件",
  "2.2 电路图的读法",
  "2.3 连接电源、数据和地址总线",
  "2.4 连接I/O",
  "2.5 连接时钟信号",
  "2.6 连接用于区分读写对象是内存还是I/O的引脚",
  "2.7 连接剩余的控制引脚",
  "2.8 连接外部设备，通过DMA输入程序",
  "2.9 连接用于输入输出的外部设备",
  "2.10 输入测试程序并进行调试",
] as const;
const common = {
  title: "第 2 章 试着制造一台计算机吧",
  label: "计算机怎样运行 · 原则与硬件",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Hcw02BuildComputerMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw02BuildComputerExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw02BuildComputerEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
