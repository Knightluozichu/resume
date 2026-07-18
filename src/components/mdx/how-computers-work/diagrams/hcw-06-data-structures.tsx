"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "定义元素语义",
  "选择内存布局",
  "声明允许操作",
  "追踪索引或引用",
  "验证边界状态",
  "比较时间空间",
] as const;
const concepts = [
  "第6章 与数据结构成为好朋友的七个要点",
  "6.1 要点1：了解内存和变量的关系",
  "6.2 要点2：了解作为数据结构基础的数组",
  "6.3 要点3：了解数组的应用——作为典型算法的数据结构",
  "6.4 要点4：了解并掌握典型数据结构的类型和概念",
  "6.5 要点5：了解栈和队列的实现方法",
  "6.6 要点6：了解结构体的组成",
  "6.7 要点7：了解链表和二叉树的实现方法",
] as const;
const common = {
  title: "第 6 章 与数据结构成为好朋友的七个要点",
  label: "计算机怎样运行 · 数据与对象",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain,
  concepts,
} as const;
export function Hcw06DataStructuresMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw06DataStructuresExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw06DataStructuresEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
