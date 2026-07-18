import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第8章 堆分区",
  "8.1 术语",
  "8.2 为什么分区",
  "按移动性分区",
  "按大小分区",
  "为空间分区",
  "按种类分区",
  "按回收收益分区",
  "按响应性分区",
  "按局部性分区",
  "按线程分区",
  "按可用性分区",
  "按可变性分区",
  "8.3 如何分区",
  "8.4 何时分区"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第8章 堆分区" focus="按移动性、大小、种类、收益、响应、局部性、线程、可用性和可变性解释为什么、如何、何时分区" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第8章 堆分区" focus="给对象添加寿命、大小、线程和移动约束标签，比较静态分区、动态区域与无分区基线" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第8章 堆分区" focus="分区维度矩阵、对象晋入/迁出规则、跨区引用合同、收益与失衡监控" nodes={nodes} />; }
