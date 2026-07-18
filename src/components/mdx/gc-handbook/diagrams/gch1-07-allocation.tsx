import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第7章 分配",
  "7.1 顺序分配",
  "7.2 空闲链分配",
  "首次适配分配",
  "下次适配分配",
  "最佳适配分配",
  "加速空闲链分配",
  "7.3 碎片",
  "7.4 分类适配分配",
  "碎片分析",
  "填充尺寸类别",
  "7.5 分类适配与首次、最佳、下次适配的组合",
  "7.6 其他考虑",
  "对齐",
  "尺寸限制",
  "边界标签",
  "堆可解析性",
  "局部性",
  "保留荒野区",
  "跨越映射",
  "7.7 并发系统中的分配",
  "7.8 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第7章 分配" focus="比较顺序、空闲链、适配与分类适配分配，理解内部/外部碎片、边界标签、可解析性和并发分配" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第7章 分配" focus="重放固定尺寸序列，比较first-fit、next-fit、best-fit和segregated-fit的搜索成本与碎片" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第7章 分配" focus="分配器数据结构图、适配策略轨迹、碎片热图、并发线性化点与恢复实验" nodes={nodes} />; }
