import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Appendix E: Memory management in Java apps",
  "E.1 How the JVM organizes an app’s memory",
  "E.2 The stack used by threads to store local data",
  "E.3 The heap the app uses to store object instances",
  "E.4 The metaspace memory location for storing data types"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="附录E Java应用内存管理" focus="区分线程栈、对象堆与类元数据空间，将OOM、栈溢出和类加载增长映射到不同证据" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="附录E Java应用内存管理" focus="分别制造递归栈增长、堆对象保留和动态类加载，比较错误、日志和监控信号" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="附录E Java应用内存管理" focus="内存区域图、对象生命周期、容量与上限、区域特定故障实验" nodes={nodes} />;
}
