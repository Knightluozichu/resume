"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "配置设备寄存器",
  "发起输入输出",
  "等待或接收中断",
  "保存处理现场",
  "执行DMA或复制",
  "确认设备完成",
] as const;
const concepts = [
  "第11章 硬件控制方法",
  "11.1 应用和硬件无关？",
  "11.2 支撑硬件输入输出的IN指令和OUT指令",
  "11.3 编写测试用的输入输出程序",
  "11.4 外围设备的中断请求",
  "11.5 用中断来实现实时处理",
  "11.6 DMA可以实现短时间内传送大量数据",
  "11.7 文字及图片的显示机制",
  "COLUMN 如果是你，你会怎样介绍？——向邻居老奶奶说明显示器和电视机的不同",
] as const;
const common = {
  title: "第 11 章 硬件控制方法",
  label: "程序怎样运行 · 汇编与硬件",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain,
  concepts,
} as const;
export function Hpw11HardwareControlMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw11HardwareControlExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw11HardwareControlEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
