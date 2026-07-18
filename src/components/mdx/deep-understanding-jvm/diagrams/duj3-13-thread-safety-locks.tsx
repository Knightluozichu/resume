import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第13章 线程安全与锁优化",
  "13.1 概述",
  "13.2 线程安全",
  "13.2.1 Java语言中的线程安全",
  "13.2.2 线程安全的实现方法",
  "13.3 锁优化",
  "13.3.1 自旋锁与自适应自旋",
  "13.3.2 锁消除",
  "13.3.3 锁粗化",
  "13.3.4 轻量级锁",
  "13.3.5 偏向锁",
  "13.4 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第13章 线程安全与锁优化" focus="从不可变、互斥与非阻塞实现线程安全，理解自旋、消除、粗化、轻量级锁与偏向锁的版本化实现" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第13章 线程安全与锁优化" focus="在低竞争和高竞争两组负载比较互斥与CAS方案，检查吞吐、尾延迟、失败重试、饥饿和业务不变量" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第13章 线程安全与锁优化" focus="安全性定义、线性化点、竞争基准、锁状态记录、版本适用域与回归测试" nodes={nodes} />;
}
