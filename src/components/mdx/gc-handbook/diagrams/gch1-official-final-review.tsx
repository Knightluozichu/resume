import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第1章 引言",
  "第2章 标记-清扫垃圾回收",
  "第3章 标记-整理垃圾回收",
  "第4章 复制式垃圾回收",
  "第5章 引用计数",
  "第6章 比较垃圾回收器",
  "第7章 分配",
  "第8章 堆分区",
  "第9章 分代垃圾回收",
  "第10章 其他分区方案",
  "第11章 运行时接口",
  "第12章 语言特定问题",
  "第13章 并发基础",
  "第14章 并行垃圾回收",
  "第15章 并发垃圾回收",
  "第16章 并发标记-清扫",
  "第17章 并发复制与整理",
  "第18章 并发引用计数",
  "第19章 实时垃圾回收",
  "术语表",
  "参考文献",
  "索引"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="《垃圾回收算法手册》全书总复习" focus="用统一对象图和固定服务目标综合选择算法、分配、分区、运行时接口、并发屏障与调度，并通过反例复核" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="《垃圾回收算法手册》全书总复习" focus="为吞吐、低延迟和硬实时三类目标各设计一套回收方案，再互换工作负载寻找反例" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="《垃圾回收算法手册》全书总复习" focus="全书设计评审、三条实现路线、失效模式矩阵、独立重放与迁移报告" nodes={nodes} />; }
