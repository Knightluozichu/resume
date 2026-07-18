import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "11 Analyzing potential JVM problems with GC logs",
  "11.1 Enabling GC logs",
  "11.2 Storing GC logs in files",
  "11.3 Particular configurations for storing GC logs",
  "11.4 Analyzing GC logs",
  "11.4.1 Troubleshooting performance lags with GC pause times",
  "11.4.2 Identifying memory leaks with heap usage logs",
  "11.4.3 Identifying insufficient memory with full GC events",
  "11.4.4 Tuning parallelism in GC",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第11章 用GC日志分析潜在JVM问题" focus="启用并轮转GC日志，用暂停、回收前后占用、Full GC和并行度解释性能、泄漏与容量问题" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第11章 用GC日志分析潜在JVM问题" focus="固定工作量后改变一个并行度参数，比较暂停、CPU、吞吐和Full GC频率，不达预算即回滚" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第11章 用GC日志分析潜在JVM问题" focus="日志配置与轮转、事件时间线、暂停分布、存活集趋势、调优假设与回滚阈值" nodes={nodes} />;
}
