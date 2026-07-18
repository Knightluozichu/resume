import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第6章 混合回收",
  "6.1 并发标记算法详解",
  "6.2 并发标记算法的难点",
  "6.2.1 三色标记法",
  "6.2.2 难点示意图",
  "6.2.3 再谈写屏障",
  "6.3 G1中混合回收的步骤",
  "6.4 混合回收中并发标记处理的线程",
  "6.4.1 并发标记线程启动的时机",
  "6.4.2 根扫描子阶段",
  "6.4.3 并发标记子阶段",
  "6.4.4 再标记子阶段",
  "6.4.5 清理子阶段",
  "6.4.6 启动混合收集",
  "6.5 并发标记算法演示",
  "6.5.1 初始标记子阶段",
  "6.5.2 根扫描子阶段",
  "6.5.3 并发标记子阶段",
  "6.5.4 再标记子阶段",
  "6.5.5 清理子阶段",
  "6.6 GC活动图",
  "6.7 日志解读",
  "6.8 参数优化"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第6章 混合回收" focus="用三色标记和写屏障解释并发标记，从启动、根扫描、并发标记、再标记、清理走到Mixed收集" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第6章 混合回收" focus="改变分配速率与老年代存活率，观察并发周期能否及时完成、候选集如何变化以及Mixed次数" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第6章 混合回收" focus="三色对象图、并发阶段时间线、标记线程负载、候选Old Region、Mixed周期日志" nodes={nodes} />; }
