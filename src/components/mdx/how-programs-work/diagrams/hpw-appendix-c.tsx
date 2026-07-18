"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "声明数据类型",
  "定义变量函数",
  "调用标准库",
  "传递参数返回值",
  "区分局部全局",
  "编译运行验证",
] as const;
const concepts = [
  "附录 让我们开始C语言之旅",
  "C语言的特点",
  "变量和函数",
  "数据类型",
  "标准函数库",
  "函数调用",
  "局部变量和全局变量",
  "数组和循环",
  "其他语法结构",
] as const;
const common = {
  title: "附录 让我们开始C语言之旅",
  label: "程序怎样运行 · 思考与C语言",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function HpwAppendixCMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function HpwAppendixCExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function HpwAppendixCEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
