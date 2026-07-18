import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-01",
  title: "第1章 卓有成效是可以学会的",
  nodes: [
    "识别成果责任",
    "直面工作现实",
    "区分效率成效",
    "练习五项习惯",
    "复核外部结果",
  ],
  focuses: ["知识管理者", "组织现实", "有效性", "可学习惯", "结果责任"],
} as const;

export function Eex19Chapter01MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter01ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter01EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
