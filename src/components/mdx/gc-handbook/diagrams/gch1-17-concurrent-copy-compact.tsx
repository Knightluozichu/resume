import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第17章 并发复制与整理",
  "17.1 大部分并发复制",
  "Baker算法",
  "大部分并发、大部分复制回收",
  "17.2 Brooks间接屏障",
  "17.3 自擦除读屏障",
  "17.4 复制副本",
  "17.5 多版本复制",
  "避免写时复制的扩展",
  "17.6 Sapphire",
  "回收器阶段",
  "合并阶段",
  "volatile字段",
  "17.7 并发整理",
  "Compressor",
  "Pauseless",
  "17.8 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第17章 并发复制与整理" focus="比较Baker、Brooks、自擦除读屏障、复制副本、多版本、Sapphire、Compressor与Pauseless方案" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第17章 并发复制与整理" focus="让变异器在对象复制前中后读写字段，验证from/to副本、转发指针、复制写入和提交顺序" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第17章 并发复制与整理" focus="并发移动状态机、读屏障转发路径、版本一致性表、整理器对比实验" nodes={nodes} />; }
