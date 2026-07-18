import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第12章 语言特定问题",
  "12.1 终结",
  "终结器何时运行？",
  "哪个线程运行终结器？",
  "终结器能否彼此并发运行？",
  "终结器能否访问已不可达对象？",
  "已终结对象何时回收？",
  "终结器出错会怎样？",
  "终结是否有保证顺序？",
  "终结竞态问题",
  "终结器与锁",
  "特定语言中的终结",
  "进一步研究",
  "12.2 弱引用",
  "其他动机",
  "支持多种指针强度",
  "用幻影对象控制终结顺序",
  "弱指针清除竞态",
  "弱指针清除通知",
  "其他语言中的弱指针",
  "12.3 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第12章 语言特定问题" focus="分析终结、弱引用、多级引用强度和清除通知如何改变可达性、回收顺序与并发竞态" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第12章 语言特定问题" focus="构造对象复活、终结锁竞争、弱引用清除竞态和多级强度图，重放不同顺序并验证合同" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第12章 语言特定问题" focus="终结状态机、引用强度偏序、复活与竞态案例、语言语义对照表" nodes={nodes} />; }
