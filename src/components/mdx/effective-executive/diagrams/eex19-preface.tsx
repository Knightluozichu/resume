import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-preface",
  title: "前言",
  nodes: [
    "区分效率成效",
    "确认知识职责",
    "选择外部结果",
    "练习五项习惯",
    "用兑现结果验收",
  ],
  focuses: ["有效性定义", "知识管理者", "习惯可学", "外部成果", "自我管理"],
} as const;

export function Eex19PrefaceMapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19PrefaceExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19PrefaceEvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
