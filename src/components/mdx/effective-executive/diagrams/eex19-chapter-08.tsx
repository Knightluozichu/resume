import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-08",
  title: "第8章 结论：管理者必须卓有成效",
  nodes: [
    "记录真实时间",
    "承诺外部贡献",
    "组合人的长处",
    "集中当前要事",
    "执行有效决策",
  ],
  focuses: ["五项习惯", "自我发展", "组织发展", "知识成果", "持续复盘"],
} as const;

export function Eex19Chapter08MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter08ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter08EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
