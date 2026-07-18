"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "声明字长",
  "编码位模式",
  "执行移位逻辑",
  "解释补码符号",
  "检测溢出",
  "还原数值语义",
] as const;
const concepts = [
  "第2章 数据是用二进制数表示的",
  "2.1 用二进制数表示计算机信息的原因",
  "2.2 什么是二进制数",
  "2.3 移位运算和乘除运算的关系",
  "2.4 便于计算机处理的“补数”",
  "2.5 逻辑右移和算术右移的区别",
  "2.6 掌握逻辑运算的窍门",
  "COLUMN 如果是你，你会怎样介绍？——向小学生讲解CPU和二进制",
] as const;
const common = {
  title: "第 2 章 数据是用二进制数表示的",
  label: "程序怎样运行 · CPU与数据",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Hpw02BinaryMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw02BinaryExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw02BinaryEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
