import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-05",
  title: "第5章 要事优先",
  nodes: [
    "盘点现有承诺",
    "停止低贡献事项",
    "比较未来机会",
    "只选当前要事",
    "保护完成时段",
  ],
  focuses: ["系统放弃", "沉没成本", "未来机会", "优先顺序", "集中完成"],
} as const;

export function Eex19Chapter05MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter05ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter05EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
