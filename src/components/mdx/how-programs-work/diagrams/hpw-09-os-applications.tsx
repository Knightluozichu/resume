"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "应用发起请求",
  "语言库封装",
  "陷入系统调用",
  "内核校验权限",
  "驱动操作硬件",
  "返回结果错误",
] as const;
const concepts = [
  "第9章 操作系统和应用的关系",
  "9.1 操作系统功能的历史",
  "9.2 要意识到操作系统的存在",
  "9.3 系统调用和高级编程语言的移植性",
  "9.4 操作系统和高级编程语言使硬件抽象化",
  "9.5 Windows操作系统的特征",
  "COLUMN 如果是你，你会怎样介绍？——向超喜欢手机的女高中生讲解操作系统的作用",
] as const;
const common = {
  title: "第 9 章 操作系统和应用的关系",
  label: "程序怎样运行 · 环境与构建",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Hpw09OsApplicationsMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw09OsApplicationsExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw09OsApplicationsEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
