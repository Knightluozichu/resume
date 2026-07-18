"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "转换二进制小数",
  "规格化尾数",
  "编码偏置指数",
  "按规则舍入",
  "累计误差界",
  "选择定点或容差",
] as const;
const concepts = [
  "第3章 计算机进行小数运算时出错的原因",
  "3.1 将0.1累加100次也得不到10",
  "3.2 用二进制数表示小数",
  "3.3 计算机运算出错的原因",
  "3.4 什么是浮点数",
  "3.5 正则表达式和EXCESS系统",
  "3.6 在实际的程序中进行确认",
  "3.7 如何避免计算机计算出错",
  "3.8 二进制数和十六进制数",
] as const;
const common = {
  title: "第 3 章 计算机进行小数运算时出错的原因",
  label: "程序怎样运行 · CPU与数据",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Hpw03FloatingPointMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw03FloatingPointExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw03FloatingPointEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
