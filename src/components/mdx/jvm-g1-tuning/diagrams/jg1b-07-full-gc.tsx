import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第7章 Full GC",
  "7.1 Evac失败",
  "7.2 串行FGC",
  "7.2.1 标记活跃对象",
  "7.2.2 计算对象的新地址",
  "7.2.3 更新引用对象的地址",
  "7.2.4 移动对象完成压缩",
  "7.2.5 后处理",
  "7.3 并行FGC",
  "7.3.1 并行标记活跃对象",
  "7.3.2 计算对象的新地址",
  "7.3.3 更新引用对象的地址",
  "7.3.4 移动对象完成压缩",
  "7.3.5 后处理",
  "7.4 日志解读",
  "7.5 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第7章 Full GC" focus="分析Evacuation Failure及串行、JDK 10并行Full GC的标记、地址计算、引用更新、压缩与后处理" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第7章 Full GC" focus="在隔离环境提高存活集制造疏散失败，对照jdk8u60与JDK 10路径并验证增加余量后的恢复" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第7章 Full GC" focus="失败触发树、四阶段移动图、串并行源码差异、Full GC日志与恢复预算" nodes={nodes} />; }
