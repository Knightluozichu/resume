import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第10章 其他分区方案",
  "10.1 大对象空间",
  "Treadmill垃圾回收器",
  "借助操作系统支持移动对象",
  "无指针对象",
  "10.2 拓扑回收器",
  "成熟对象空间垃圾回收",
  "基于连通性的垃圾回收",
  "线程局部垃圾回收",
  "栈分配",
  "区域推断",
  "10.3 标记-清扫与复制的混合回收器",
  "Garbage-First",
  "Immix及其他方案",
  "受限内存空间中的复制回收",
  "10.4 书签式垃圾回收",
  "10.5 隐式引用计数",
  "10.6 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第10章 其他分区方案" focus="覆盖大对象空间、拓扑与线程局部方案、混合回收、Garbage-First、Immix、受限复制、书签与隐式引用计数" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第10章 其他分区方案" focus="构造大对象、无指针对象、线程逃逸和碎片堆，逐一验证各分区方案的收益与失败边界" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第10章 其他分区方案" focus="方案谱系图、分区选择器、跨区元数据表、极端工作负载退化矩阵" nodes={nodes} />; }
