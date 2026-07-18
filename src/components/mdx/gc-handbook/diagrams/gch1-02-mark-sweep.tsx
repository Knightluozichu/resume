import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第2章 标记-清扫垃圾回收",
  "2.1 标记-清扫算法",
  "2.2 三色抽象",
  "2.3 改进标记-清扫",
  "2.4 位图标记",
  "2.5 惰性清扫",
  "2.6 标记循环中的缓存未命中",
  "2.7 需要考虑的问题",
  "变异器开销",
  "吞吐量",
  "空间使用",
  "移动还是不移动？"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第2章 标记-清扫垃圾回收" focus="从根闭包、三色抽象、位图标记与惰性清扫推导不移动回收器的正确性、局部性和碎片代价" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第2章 标记-清扫垃圾回收" focus="在相同对象图上切换对象头标记与侧位图、立即清扫与惰性清扫，测量缓存失效、分配延迟和碎片" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第2章 标记-清扫垃圾回收" focus="三色状态机、标记栈上界、位图布局、惰性清扫与空闲链证据" nodes={nodes} />; }
