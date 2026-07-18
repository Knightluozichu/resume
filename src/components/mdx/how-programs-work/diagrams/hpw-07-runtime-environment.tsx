"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "固件初始化",
  "装载引导程序",
  "启动操作系统",
  "建立设备抽象",
  "提供API或虚拟机",
  "加载目标程序",
] as const;
const concepts = [
  "第7章 程序是在何种环境中运行的",
  "7.1 运行环境=操作系统+硬件",
  "7.2 Windows克服了CPU以外的硬件差异",
  "7.3 不同操作系统的API不同",
  "7.4 FreeBSD Port帮你轻松使用源代码",
  "7.5 利用虚拟机获得其他操作系统环境",
  "7.6 提供相同运行环境的Java虚拟机",
  "7.7 BIOS和引导",
] as const;
const common = {
  title: "第 7 章 程序是在何种环境中运行的",
  label: "程序怎样运行 · 环境与构建",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Hpw07RuntimeEnvironmentMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw07RuntimeEnvironmentExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw07RuntimeEnvironmentEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
