import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第3章 G1的对象分配",
  "3.1 对象分配概述",
  "3.2 快速分配",
  "3.3 慢速分配",
  "3.3.1 大对象分配",
  "3.3.2 最后的分配尝试",
  "3.4 G1垃圾回收的时机",
  "3.4.1 分配时发生回收",
  "3.4.2 外部调用的回收",
  "3.5 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第3章 G1的对象分配" focus="沿TLAB快速分配、慢速路径、大对象与最后尝试理解Region分配失败如何触发回收" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第3章 G1的对象分配" focus="让对象大小跨过TLAB与Humongous阈值，保存分配日志并核对走过的源码分支与回收触发" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第3章 G1的对象分配" focus="快慢路径流程、TLAB计数、Humongous边界、分配失败与GC触发时间线" nodes={nodes} />; }
