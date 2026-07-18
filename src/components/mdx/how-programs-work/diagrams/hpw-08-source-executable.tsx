"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "解析源代码",
  "生成目标代码",
  "解析符号重定位",
  "链接启动与库",
  "加载映射段",
  "建立栈堆执行",
] as const;
const concepts = [
  "第8章 从源文件到可执行文件",
  "8.1 计算机只能运行本地代码",
  "8.2 本地代码的内容",
  "8.3 编译器负责转换源代码",
  "8.4 仅靠编译是无法得到可执行文件的",
  "8.5 启动及库文件",
  "8.6 DLL文件及导入库",
  "8.7 可执行文件运行时的必要条件",
  "8.8 程序加载时会生成栈和堆",
  "8.9 有点难度的Q&A",
] as const;
const common = {
  title: "第 8 章 从源文件到可执行文件",
  label: "程序怎样运行 · 环境与构建",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Hpw08SourceExecutableMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw08SourceExecutableExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw08SourceExecutableEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
