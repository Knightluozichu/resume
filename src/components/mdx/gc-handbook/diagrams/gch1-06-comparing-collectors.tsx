import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第6章 比较垃圾回收器",
  "6.1 吞吐量",
  "6.2 停顿时间",
  "6.3 空间",
  "6.4 实现",
  "6.5 自适应系统",
  "6.6 垃圾回收的统一理论",
  "抽象垃圾回收",
  "追踪式垃圾回收",
  "引用计数式垃圾回收"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第6章 比较垃圾回收器" focus="以吞吐、停顿、空间、实现复杂度和自适应能力比较回收器，并用统一抽象连接追踪与引用计数" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第6章 比较垃圾回收器" focus="固定有效工作与内存上限，运行不同存活率、对象大小和线程数，报告分布而非单一均值" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第6章 比较垃圾回收器" focus="多目标评价矩阵、工作负载画像、统一抽象推导、选择与否决记录" nodes={nodes} />; }
