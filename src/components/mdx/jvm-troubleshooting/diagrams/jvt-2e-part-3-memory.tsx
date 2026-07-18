import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Part 3 Diagnosing memory-related problems"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="Part 3 诊断内存相关问题" focus="串联分配剖析、堆转储、OQL与GC日志，区分高分配率、存活集增长、容量不足和收集器行为" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="Part 3 诊断内存相关问题" focus="分别制造短命对象洪峰和静态集合保留，比较采样、堆转储和GC日志中的不同特征" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="Part 3 诊断内存相关问题" focus="内存症状分类、采集预算、引用路径、GC时间线、修复验收条件" nodes={nodes} />;
}
