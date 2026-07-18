import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "9 Profiling memory-related problems",
  "9.1 Sampling to identify memory allocation problems",
  "9.2 Profiling to find the culprit",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第9章 剖析内存相关问题" focus="先用采样发现分配异常，再用更细剖析定位类型、分配点和调用路径，控制探针开销" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第9章 剖析内存相关问题" focus="将缓存关闭和开启各跑同一工作量，比较分配率、完成时间和Full GC后存活集" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第9章 剖析内存相关问题" focus="类型分配排名、分配栈、年龄与存活观察、优化前后工作量归一化结果" nodes={nodes} />;
}
