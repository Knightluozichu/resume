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

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="《JVM G1源码分析和调优》全书总复习" focus="用一个从分配、Refine、Young、并发标记、Mixed到Full GC的事故串联135个目录节点" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="《JVM G1源码分析和调优》全书总复习" focus="随机抽取一个正式节点嵌入综合事故，让另一位读者仅凭原始证据推翻或确认根因" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="《JVM G1源码分析和调优》全书总复习" focus="事故时间线、源码调用链、GC日志、对象状态、参数实验、恢复与版本差异" nodes={nodes} />; }
