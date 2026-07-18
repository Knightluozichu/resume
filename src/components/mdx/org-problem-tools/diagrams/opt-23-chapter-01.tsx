import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-chapter-01",
  title: "第1章 入门套装：一定要掌握的8个工具",
  nodes: [
    "让成员安全进入",
    "共同约定规则",
    "发散并保持聚焦",
    "组织目标与想法",
    "明确行动归属",
  ],
  focuses: ["破冰安全", "基本规则", "发散聚类", "目标共享", "行动责任"],
} as const;

export function Opt23Chapter01MapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23Chapter01ExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23Chapter01EvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
