"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "澄清业务目标",
  "拆解系统边界",
  "签发阶段文档",
  "协调开发测试",
  "上线监控维护",
  "演练备份恢复",
] as const;
const concepts = [
  "第12章 SE负责监管计算机系统的构建",
  "12.1 SE是自始到终参与系统开发过程的工程师",
  "12.2 SE未必担任过程序员",
  "12.3 系统开发过程的规范",
  "12.4 各个阶段的工作内容及文档",
  "12.5 所谓设计，就是拆解",
  "12.6 面向对象法简化了系统维护工作",
  "12.7 技术能力和沟通能力",
  "12.8 IT不等于引进计算机",
  "12.9 计算机系统的成功与失败",
  "12.10 大幅提升设备利用率的多机备份",
] as const;
const common = {
  title: "第 12 章 SE负责监管计算机系统的构建",
  label: "计算机怎样运行 · 系统构建",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain,
  concepts,
} as const;
export function Hcw12SystemEngineeringMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw12SystemEngineeringExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw12SystemEngineeringEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
