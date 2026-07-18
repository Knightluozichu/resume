import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第1章 垃圾回收概述",
  "第2章 G1的基本概念",
  "第3章 G1的对象分配",
  "第4章 G1的Refine线程",
  "第5章 新生代回收",
  "第6章 混合回收",
  "第7章 Full GC",
  "第8章 G1中的引用处理",
  "第9章 G1的新特性：字符串去重",
  "第10章 线程中的安全点",
  "第11章 垃圾回收器的选择",
  "第12章 新一代垃圾回收器",
  "附录A 编译调试JVM",
  "附录B 本地内存跟踪",
  "附录C 阅读JVM需要了解的C++知识"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="《JVM G1源码分析和调优》权威学习地图" focus="沿12章与附录A-C建立从GC算法、G1源码、日志到调优和后继收集器的完整证据路径" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="《JVM G1源码分析和调优》权威学习地图" focus="为分配失败、RSet积压、Mixed过晚与安全点过长分别选择章节和最低扰动证据" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="《JVM G1源码分析和调优》权威学习地图" focus="135节点覆盖矩阵、源码版本地图、GC阶段依赖图和全书实验清单" nodes={nodes} />; }
