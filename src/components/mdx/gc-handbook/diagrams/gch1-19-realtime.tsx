import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第19章 实时垃圾回收",
  "19.1 实时系统",
  "19.2 调度实时回收",
  "19.3 基于工作量的实时回收",
  "并行并发复制",
  "不均匀工作及其对调度的影响",
  "19.4 基于空闲的实时回收",
  "调度回收器工作",
  "执行开销",
  "程序员输入",
  "19.5 基于时间的实时回收：Metronome",
  "变异器利用率",
  "支持可预测性",
  "分析",
  "健壮性",
  "19.6 组合调度方法：Tax-and-Spend",
  "Tax-and-Spend调度",
  "Tax-and-Spend前提",
  "19.7 控制碎片",
  "Metronome中的增量整理",
  "单处理器增量复制",
  "Stopless：无锁垃圾回收",
  "Staccato：变异器等待自由的尽力整理",
  "Chicken：面向x86的变异器等待自由尽力整理",
  "Clover：变异器概率锁自由的保证整理",
  "Stopless、Chicken与Clover比较",
  "碎片化分配",
  "19.8 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第19章 实时垃圾回收" focus="从实时系统、基于工作量/空闲/时间的调度到Tax-and-Spend和增量整理，建立可证明延迟预算" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第19章 实时垃圾回收" focus="控制分配率、存活率和CPU预算，比较work-based、slack-based、Metronome与Tax-and-Spend调度" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第19章 实时垃圾回收" focus="调度预算表、变异器利用率曲线、最坏工作量证明、碎片控制与超载策略" nodes={nodes} />; }
