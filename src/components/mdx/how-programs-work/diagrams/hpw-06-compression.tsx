"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "统计数据分布",
  "选择编码模型",
  "生成码表",
  "写入压缩流",
  "解码重建",
  "逐字节校验",
] as const;
const concepts = [
  "第6章 亲自尝试压缩数据",
  "6.1 文件以字节为单位保存",
  "6.2 RLE算法的机制",
  "6.3 RLE算法的缺点",
  "6.4 通过莫尔斯编码来看哈夫曼算法的基础",
  "6.5 用二叉树实现哈夫曼编码",
  "6.6 哈夫曼算法能够大幅提升压缩比率",
  "6.7 可逆压缩和非可逆压缩",
  "COLUMN 如果是你，你会怎样介绍？——向沉迷游戏的中学生讲解内存和磁盘",
] as const;
const common = {
  title: "第 6 章 亲自尝试压缩数据",
  label: "程序怎样运行 · 内存与存储",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain,
  concepts,
} as const;
export function Hpw06CompressionMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw06CompressionExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw06CompressionEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
