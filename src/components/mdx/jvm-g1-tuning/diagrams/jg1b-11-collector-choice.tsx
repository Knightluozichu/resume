import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第11章 垃圾回收器的选择",
  "11.1 如何衡量垃圾回收器",
  "11.2 G1调优的方向"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第11章 垃圾回收器的选择" focus="以吞吐、尾延迟、内存、CPU、堆规模、恢复和运维成本选择收集器，并为G1调优建立顺序" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第11章 垃圾回收器的选择" focus="用真实流量回放比较两种候选，报告p50/p99、吞吐、CPU、内存、Full GC和恢复时间" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第11章 垃圾回收器的选择" focus="SLO与工作量、候选收集器矩阵、基线、单变量实验、收益副作用与回滚" nodes={nodes} />; }
