import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第5章 引用计数",
  "5.1 引用计数的优缺点",
  "5.2 提高效率",
  "5.3 延迟引用计数",
  "5.4 合并引用计数",
  "5.5 循环引用计数",
  "5.6 有限字段引用计数",
  "5.7 需要考虑的问题",
  "运行环境",
  "高级方案"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第5章 引用计数" focus="从即时回收优势走向延迟、合并、循环与有限字段计数，解释更新开销、循环泄漏和并发一致性" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第5章 引用计数" focus="构造共享、循环、短期更新风暴和栈根场景，对比朴素、延迟、合并及循环引用计数" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第5章 引用计数" focus="引用增减状态机、零计数递归队列、循环候选图、写入合并与缓冲账本" nodes={nodes} />; }
