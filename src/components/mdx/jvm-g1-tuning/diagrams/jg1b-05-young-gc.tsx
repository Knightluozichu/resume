import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第5章 新生代回收",
  "5.1 YGC算法概述",
  "5.2 YGC代码分析",
  "5.2.1 并行任务",
  "5.2.2 其他处理",
  "5.3 YGC算法演示",
  "5.3.1 选择CSet",
  "5.3.2 根处理",
  "5.3.3 RSet处理",
  "5.3.4 复制",
  "5.3.5 Redirty",
  "5.3.6 释放空间",
  "5.4 日志解读",
  "5.4.1 YGC日志",
  "5.4.2 大对象日志分析",
  "5.4.3 对象年龄日志分析",
  "5.5 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第5章 新生代回收" focus="从CSet选择、根与RSet处理、复制、Redirty到Region释放复刻一次G1 Young GC及其日志" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第5章 新生代回收" focus="固定工作量逐步增加存活率，比较复制量、晋升、对象年龄、工作线程失衡和预测误差" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第5章 新生代回收" focus="Young GC阶段时间线、CSet清单、并行任务分布、年龄表、复制与释放证据" nodes={nodes} />; }
