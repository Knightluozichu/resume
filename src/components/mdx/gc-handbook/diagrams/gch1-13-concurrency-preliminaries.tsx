import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第13章 并发基础",
  "13.1 硬件",
  "处理器与线程",
  "互连",
  "内存",
  "缓存",
  "一致性",
  "缓存一致性性能示例：自旋锁",
  "13.2 硬件内存一致性",
  "栅栏与happens-before",
  "一致性模型",
  "13.3 硬件原语",
  "比较并交换",
  "加载链接/条件存储",
  "原子算术原语",
  "先测试再测试并设置",
  "更强的原语",
  "原子原语开销",
  "13.4 进展保证",
  "进展保证与并发回收",
  "13.5 并发算法记号",
  "13.6 互斥",
  "13.7 工作共享与终止检测",
  "会合屏障",
  "13.8 并发数据结构",
  "并发栈",
  "单链表并发队列",
  "数组并发队列",
  "工作窃取并发双端队列",
  "13.9 事务内存",
  "什么是事务内存？",
  "用事务内存实现回收",
  "GC存在时支持事务内存",
  "13.10 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第13章 并发基础" focus="为并行与并发GC建立缓存一致性、内存模型、原子原语、进展保证、工作共享和并发容器基础" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第13章 并发基础" focus="用受控线程重排、CAS失败和工作窃取场景验证屏障、队列、终止检测与内存序假设" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第13章 并发基础" focus="happens-before图、原子线性化点、进展保证表、工作窃取与终止检测实验" nodes={nodes} />; }
