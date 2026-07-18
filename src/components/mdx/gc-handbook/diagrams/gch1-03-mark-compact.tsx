import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第3章 标记-整理垃圾回收",
  "3.1 双指针整理",
  "3.2 Lisp 2算法",
  "3.3 线索整理",
  "3.4 单遍算法",
  "3.5 需要考虑的问题",
  "整理是否必要？",
  "整理的吞吐成本",
  "长寿命数据",
  "局部性",
  "标记-整理算法的局限"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第3章 标记-整理垃圾回收" focus="比较双指针、Lisp 2、线索整理和单遍算法如何计算转发地址、更新引用并移动对象" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第3章 标记-整理垃圾回收" focus="构造含固定对象、内部指针与不同存活率的堆，重放四类整理算法并验证每条引用都指向新地址" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第3章 标记-整理垃圾回收" focus="四类整理算法通路图、地址更新表、对象次序与局部性比较、移动约束清单" nodes={nodes} />; }
