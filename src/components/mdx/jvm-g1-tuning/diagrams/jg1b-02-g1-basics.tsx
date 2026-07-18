import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第2章 G1的基本概念",
  "2.1 分区",
  "2.2 G1停顿预测模型",
  "2.3 卡表和位图",
  "2.4 对象头",
  "2.5 内存分配和管理",
  "2.6 线程",
  "2.6.1 栈帧",
  "2.6.2 句柄",
  "2.6.3 JVM本地方法栈中的对象",
  "2.6.4 Java本地方法栈中的对象",
  "2.7 日志解读",
  "2.8 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第2章 G1的基本概念" focus="理解Region、停顿预测、卡表、位图、对象头、线程栈与日志，建立G1源码阅读所需的内存模型" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第2章 G1的基本概念" focus="改变单个Region规模和目标停顿，在固定分配负载下比较预测、年轻代长度、停顿和吞吐" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第2章 G1的基本概念" focus="Region状态图、预测样本、卡表位图映射、栈与句柄关系、参数证据表" nodes={nodes} />; }
