import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第8章 G1中的引用处理",
  "8.1 引用概述",
  "8.2 可回收对象发现",
  "8.3 在GC时的处理发现列表",
  "8.4 重新激活可达的引用",
  "8.5 日志解读",
  "8.6 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第8章 G1中的引用处理" focus="区分强、软、弱、虚引用的发现列表与处理阶段，理解重新可达和引用队列对回收结果的影响" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第8章 G1中的引用处理" focus="构造四类引用和ReferenceQueue，制造内存压力并记录发现、清除、入队与重新可达结果" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第8章 G1中的引用处理" focus="引用状态机、发现列表、处理顺序、队列消费测试、日志与参数边界" nodes={nodes} />; }
