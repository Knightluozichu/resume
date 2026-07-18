import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第12章 Java内存模型与线程",
  "12.1 概述",
  "12.2 硬件的效率与一致性",
  "12.3 Java内存模型",
  "12.3.1 主内存与工作内存",
  "12.3.2 内存间交互操作",
  "12.3.3 对于volatile型变量的特殊规则",
  "12.3.4 针对long和double型变量的特殊规则",
  "12.3.5 原子性、可见性与有序性",
  "12.3.6 先行发生原则",
  "12.4 Java与线程",
  "12.4.1 线程的实现",
  "12.4.2 Java线程调度",
  "12.4.3 状态转换",
  "12.5 Java与协程",
  "12.5.1 内核线程的局限",
  "12.5.2 协程的复苏",
  "12.5.3 Java的解决方案",
  "12.6 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第12章 Java内存模型与线程" focus="从缓存一致性过渡到JMM的原子性、可见性、有序性和happens-before，再比较内核线程与协程" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第12章 Java内存模型与线程" focus="用并发测试器验证消息传递反例，分别加入volatile、锁和线程启动/终止规则，解释合法结果变化" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第12章 Java内存模型与线程" focus="JMM动作图、重排序反例、happens-before证明、线程状态轨迹、协程版本边界" nodes={nodes} />;
}
