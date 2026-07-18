import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第14章 并行垃圾回收",
  "14.1 是否有足够工作可并行？",
  "14.2 负载均衡",
  "14.3 同步",
  "14.4 分类",
  "14.5 并行标记",
  "以处理器为中心的技术",
  "14.6 并行复制",
  "以处理器为中心的复制技术",
  "以内存为中心的复制技术",
  "14.7 并行清扫",
  "14.8 并行整理",
  "14.9 需要考虑的问题",
  "术语",
  "并行回收是否值得？",
  "负载均衡策略",
  "管理追踪",
  "底层同步",
  "清扫与整理",
  "终止"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第14章 并行垃圾回收" focus="拆解并行标记、复制、清扫和整理的任务粒度、负载均衡、同步、终止与可扩展性" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第14章 并行垃圾回收" focus="固定堆图后改变GC线程数与任务粒度，测量串行分数、窃取、原子冲突、带宽和尾部不平衡" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第14章 并行垃圾回收" focus="并行阶段DAG、工作窃取轨迹、同步热点图、加速比与效率报告" nodes={nodes} />; }
