import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第1章 垃圾回收概述",
  "1.1 Java发展概述",
  "1.2 本书常见术语",
  "1.3 回收算法概述",
  "1.3.1 分代管理算法",
  "1.3.2 复制算法",
  "1.3.3 标记清除",
  "1.3.4 标记压缩",
  "1.3.5 算法小结",
  "1.4 JVM垃圾回收器概述",
  "1.4.1 串行回收",
  "1.4.2 并行回收",
  "1.4.3 并发标记回收",
  "1.4.4 垃圾优先回收"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第1章 垃圾回收概述" focus="建立分代、复制、标记清除、标记压缩及串行、并行、并发、垃圾优先四类回收的共同语言" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第1章 垃圾回收概述" focus="对同一对象图手工执行复制、标记清除与标记压缩，比较空间、移动、暂停和并发读写约束" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第1章 垃圾回收概述" focus="算法对象移动图、回收器时间线、停顿与吞吐权衡表、术语反例" nodes={nodes} />; }
