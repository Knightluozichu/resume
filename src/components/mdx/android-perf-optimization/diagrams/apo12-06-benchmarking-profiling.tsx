import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第6章 性能评测和剖析",
  "6.1 时间测量",
  "6.1.1 System.nanoTime()",
  "6.1.2 Debug.threadCpuTimeNanos()",
  "6.2 方法调用跟踪",
  "6.2.1 Debug.startMethodTracing()",
  "6.2.2 使用TraceView工具",
  "6.2.3 DDMS中的TraceView",
  "6.2.4 本地方法跟踪",
  "6.3 日志",
  "6.4 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第6章 性能评测和剖析" focus="用墙钟与线程CPU时间、方法跟踪、TraceView、DDMS、本地跟踪和日志建立可重复性能证据" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第6章 性能评测和剖析" focus="用一次Debug构建墙钟数字下结论，忽略预热、调度、跟踪开销、设备状态与Release产物差异" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第6章 性能评测和剖析" focus="预热与采样计划、墙钟/CPU时间、trace文件、调用树、原生热点、日志开销和置信区间" nodes={nodes} />; }
