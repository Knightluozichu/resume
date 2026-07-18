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

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="《垃圾回收算法手册》权威学习地图" focus="沿19章、术语表、参考文献与索引建立从基本算法、分区和运行时接口到并行、并发与实时回收的完整知识图" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="《垃圾回收算法手册》权威学习地图" focus="从一个对象图出发，选择回收算法、分配器、分区、屏障和调度策略，并逐层写出不变式与失败条件" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="《垃圾回收算法手册》权威学习地图" focus="359节点覆盖矩阵、算法谱系、运行时接口图、全书实验与证据清单" nodes={nodes} />; }
