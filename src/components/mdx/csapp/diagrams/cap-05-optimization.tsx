"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "建立性能基线",
  "定位热点",
  "消除重复工作",
  "缩短依赖链",
  "提高并行度",
  "验证语义等价",
] as const;
const concepts = [
  "第5章 优化程序性能",
  "5.1 优化编译器的能力和局限性",
  "5.2 表示程序性能",
  "5.3 程序示例",
  "5.4 消除循环的低效率",
  "5.5 减少过程调用",
  "5.6 消除不必要的内存引用",
  "5.7 理解现代处理器",
  "5.7.1 整体操作",
  "5.7.2 功能单元的性能",
  "5.7.3 处理器操作的抽象模型",
  "5.8 循环展开",
  "5.9 提高并行性",
  "5.9.1 多个累积变量",
  "5.9.2 重新结合变换",
  "5.10 优化合并代码的结果小结",
  "5.11 一些限制因素",
  "5.11.1 寄存器溢出",
  "5.11.2 分支预测和预测错误处罚",
  "5.12 理解内存性能",
  "5.12.1 加载的性能",
  "5.12.2 存储的性能",
  "5.13 应用：性能提高技术",
  "5.14 确认和消除性能瓶颈",
  "5.14.1 程序剖析",
  "5.14.2 使用剖析程序来指导优化",
  "5.15 小结",
] as const;
const common = {
  title: "第 5 章 优化程序性能",
  label: "程序结构和执行 · 性能优化",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;

export function Cap05OptimizationMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function Cap05OptimizationExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function Cap05OptimizationEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
