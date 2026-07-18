"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "确定流程入口",
  "绘制顺序状态",
  "标出分支条件",
  "证明循环终止",
  "注入中断事件",
  "验证返回位置",
] as const;
const concepts = [
  "第4章 程序像河水一样流动着",
  "4.1 程序的流程分为三种",
  "4.2 用流程图表示程序的流程",
  "4.3 表示循环程序块的“帽子”和“短裤”",
  "4.4 结构化程序设计",
  "4.5 画流程图来思考算法",
  "4.6 特殊的程序流程——中断处理",
  "4.7 特殊的程序流程——事件驱动",
  "COLUMN 来自企业培训现场：电阻颜色代码的谐音助记口诀",
] as const;
const common = {
  title: "第 4 章 程序像河水一样流动着",
  label: "计算机怎样运行 · 程序与算法",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Hcw04ProgramFlowMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw04ProgramFlowExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw04ProgramFlowEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
