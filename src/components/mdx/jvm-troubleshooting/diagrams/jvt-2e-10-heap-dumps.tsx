import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "10 Investigating memory problems with heap dumps",
  "10.1 Obtaining a heap dump",
  "10.1.1 Configuring an app to generate a heap dump when it encounters a memory problem",
  "10.1.2 Obtaining a heap dump using a profiler",
  "10.1.3 Obtaining a heap dump with the command line",
  "10.2 Reading a heap dump",
  "10.3 Using the OQL console to query a heap dump",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第10章 用堆转储调查内存问题" focus="规划OOM自动采集、剖析器与命令行采集，读取支配树和GC根引用，并用OQL验证对象群假设" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第10章 用堆转储调查内存问题" focus="让带业务键的对象被监听器意外保留，用OQL筛选并沿最短GC根路径找到注册表所有者" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第10章 用堆转储调查内存问题" focus="采集运行手册、转储校验和与访问控制、支配树、GC根路径、OQL查询与修复对照" nodes={nodes} />;
}
