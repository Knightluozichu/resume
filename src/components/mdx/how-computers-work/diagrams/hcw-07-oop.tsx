"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "识别业务职责",
  "划分类与对象",
  "封装状态行为",
  "设计消息协议",
  "组合或继承复用",
  "用测试验证协作",
] as const;
const concepts = [
  "第7章 成为会使用面向对象编程的程序员吧",
  "7.1 面向对象编程",
  "7.2 对OOP的多种理解方法",
  "7.3 观点1：面向对象编程通过把组件拼装到一起构建程序",
  "7.4 观点2：面向对象编程能够提升程序的开发效率和可维护性",
  "7.5 观点3：面向对象编程是适用于大型程序的开发方法",
  "7.6 观点4：面向对象编程就是在为现实世界建模",
  "7.7 观点5：面向对象编程可以借助UML设计程序",
  "7.8 观点6：面向对象编程通过在对象间传递消息驱动程序",
  "7.9 观点7：在面向对象编程中使用继承、封装和多态",
  "7.10 类和对象的区别",
  "7.11 类有三种使用方法",
  "7.12 在Java和.NET中有关OOP的知识不能少",
] as const;
const common = {
  title: "第 7 章 成为会使用面向对象编程的程序员吧",
  label: "计算机怎样运行 · 数据与对象",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;
export function Hcw07OopMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw07OopExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw07OopEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
