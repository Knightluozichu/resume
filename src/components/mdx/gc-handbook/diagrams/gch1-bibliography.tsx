import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "参考文献"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="参考文献" focus="按原始论文、算法家族、实现与评测方法建立可追溯来源图，区分书中结论和后续发展" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="参考文献" focus="为一个算法选择原始论文和独立复现，核对假设、硬件、工作负载与书中综合结论" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="参考文献" focus="来源分级表、算法-论文-章节图、复现实验清单、版本化补充阅读" nodes={nodes} />; }
