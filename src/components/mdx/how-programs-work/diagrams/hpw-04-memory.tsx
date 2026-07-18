"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "分配字节区域",
  "绑定类型解释",
  "计算地址偏移",
  "执行结构操作",
  "检查引用可达",
  "释放或复用内存",
] as const;
const concepts = [
  "第4章 熟练使用有棱有角的内存",
  "4.1 内存的物理机制很简单",
  "4.2 内存的逻辑模型是楼房",
  "4.3 简单的指针",
  "4.4 数组是高效使用内存的基础",
  "4.5 栈、队列以及环形缓冲区",
  "4.6 链表使元素的追加和删除更容易",
  "4.7 二叉查找树使数据搜索更有效",
] as const;
const common = {
  title: "第 4 章 熟练使用有棱有角的内存",
  label: "程序怎样运行 · 内存与存储",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Hpw04MemoryMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw04MemoryExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw04MemoryEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
