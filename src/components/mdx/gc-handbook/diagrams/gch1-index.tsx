import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "索引"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="索引" focus="把算法、数据结构、不变式、实现者和性能指标映射到19章的跨章位置，支持问题驱动回查" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="索引" focus="从停顿尖峰、碎片、晋升失败、屏障开销和终止检测五类症状反向定位最小章节集合" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="索引" focus="主题-章节反向索引、同义词表、故障症状入口、实验与证据入口" nodes={nodes} />; }
