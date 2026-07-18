import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第18章 并发引用计数",
  "18.1 重访简单引用计数",
  "18.2 缓冲引用计数",
  "18.3 并发循环引用计数",
  "18.4 获取堆快照",
  "18.5 滑动视图引用计数",
  "面向年龄的回收",
  "算法",
  "滑动视图循环回收",
  "内存一致性",
  "18.6 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第18章 并发引用计数" focus="研究缓冲、并发循环回收、堆快照和滑动视图引用计数中的原子更新、年龄与内存一致性" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第18章 并发引用计数" focus="并发更新共享槽并周期冲刷缓冲，注入循环与线程延迟，验证不提前回收且最终找回循环" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第18章 并发引用计数" focus="并发计数账本、缓冲批次边界、循环试删轨迹、快照与滑动视图证明" nodes={nodes} />; }
