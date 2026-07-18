import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第4章 G1的Refine线程",
  "4.1 记忆集",
  "4.2 Refine线程的功能及原理",
  "4.2.1 抽样线程",
  "4.2.2 管理RSet",
  "4.2.3 Mutator处理DCQ",
  "4.2.4 Refine线程的工作原理",
  "4.3 Refinement Zone",
  "4.4 RSet涉及的写屏障",
  "4.5 日志解读",
  "4.6 参数介绍和调优"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第4章 G1的Refine线程" focus="追踪写屏障、Dirty Card Queue、Refine线程与RSet更新，理解后台精炼不足如何把工作推回Mutator" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第4章 G1的Refine线程" focus="制造低与高跨Region更新两组负载，观察队列水位、Refine并行度、Mutator处理和暂停扫描成本" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第4章 G1的Refine线程" focus="跨Region引用图、写屏障路径、DCQ水位、Refinement Zone状态、Mutator税收" nodes={nodes} />; }
