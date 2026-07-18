import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第3章 垃圾收集器与内存分配策略",
  "3.1 概述",
  "3.2 对象已死？",
  "3.2.1 引用计数算法",
  "3.2.2 可达性分析算法",
  "3.2.3 再谈引用",
  "3.2.4 生存还是死亡？",
  "3.2.5 回收方法区",
  "3.3 垃圾收集算法",
  "3.3.1 分代收集理论",
  "3.3.2 标记-清除算法",
  "3.3.3 标记-复制算法",
  "3.3.4 标记-整理算法",
  "3.4 HotSpot的算法细节实现",
  "3.4.1 根节点枚举",
  "3.4.2 安全点",
  "3.4.3 安全区域",
  "3.4.4 记忆集与卡表",
  "3.4.5 写屏障",
  "3.4.6 并发的可达性分析",
  "3.5 经典垃圾收集器",
  "3.5.1 Serial收集器",
  "3.5.2 ParNew收集器",
  "3.5.3 Parallel Scavenge收集器",
  "3.5.4 Serial Old收集器",
  "3.5.5 Parallel Old收集器",
  "3.5.6 CMS收集器",
  "3.5.7 Garbage First收集器",
  "3.6 低延迟垃圾收集器",
  "3.6.1 Shenandoah收集器",
  "3.6.2 ZGC收集器",
  "3.7 选择合适的垃圾收集器",
  "3.7.1 Epsilon收集器",
  "3.7.2 收集器的权衡",
  "3.7.3 虚拟机及垃圾收集器日志",
  "3.7.4 垃圾收集器参数总结",
  "3.8 实战：内存分配与回收策略",
  "3.8.1 对象优先在Eden分配",
  "3.8.2 大对象直接进入老年代",
  "3.8.3 长期存活的对象将进入老年代",
  "3.8.4 动态对象年龄判定",
  "3.8.5 空间分配担保",
  "3.9 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第3章 垃圾收集器与内存分配策略" focus="从对象存活判定、收集算法和HotSpot并发标记细节走到收集器权衡与分配实验" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第3章 垃圾收集器与内存分配策略" focus="固定工作量分别观察吞吐优先与低延迟收集器，比较暂停分布、CPU、存活集和内存余量" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第3章 垃圾收集器与内存分配策略" focus="可达性图、算法移动过程、收集器权衡表、GC日志、分配年龄实验" nodes={nodes} />;
}
