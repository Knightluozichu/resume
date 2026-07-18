"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "输出汇编源码",
  "区分指令伪指令",
  "跟踪mov数据流",
  "建立调用栈帧",
  "映射变量存储",
  "追踪跳转分支",
] as const;
const concepts = [
  "第10章 通过汇编语言了解程序的实际构成",
  "10.1 汇编语言和本地代码是一一对应的",
  "10.2 通过编译器输出汇编语言的源代码",
  "10.3 不会转换成本地代码的伪指令",
  "10.4 汇编语言的语法是“操作码+操作数”",
  "10.5 最常用的mov指令",
  "10.6 对栈进行push和pop",
  "10.7 函数调用机制",
  "10.8 函数内部的处理",
  "10.9 始终确保全局变量用的内存空间",
  "10.10 临时确保局部变量用的内存空间",
  "10.11 循环处理的实现方法",
  "10.12 条件分支的实现方法",
  "10.13 了解程序运行方式的必要性",
] as const;
const common = {
  title: "第 10 章 通过汇编语言了解程序的实际构成",
  label: "程序怎样运行 · 汇编与硬件",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Hpw10AssemblyMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw10AssemblyExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw10AssemblyEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
