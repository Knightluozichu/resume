"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "装入指令地址",
  "读取操作码",
  "更新寄存器",
  "判断条件码",
  "保存调用现场",
  "选择下一指令",
] as const;
const concepts = [
  "第1章 对程序员来说CPU是什么",
  "1.1 CPU的内部结构解析",
  "1.2 CPU是寄存器的集合体",
  "1.3 决定程序流程的程序计数器",
  "1.4 条件分支和循环机制",
  "1.5 函数的调用机制",
  "1.6 通过地址和索引实现数组",
  "1.7 CPU的处理其实很简单",
] as const;
const common = {
  title: "第 1 章 对程序员来说CPU是什么",
  label: "程序怎样运行 · CPU与数据",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Hpw01CpuMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw01CpuExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw01CpuEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
