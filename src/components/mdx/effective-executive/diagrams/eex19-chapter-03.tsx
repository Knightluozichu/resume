import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-03",
  title: "第3章 我能贡献什么",
  nodes: [
    "识别外部需要",
    "声明具体贡献",
    "翻译专业知识",
    "组织协作会议",
    "确认成果被用",
  ],
  focuses: ["贡献承诺", "知识转化", "人际关系", "会议产出", "外部需要"],
} as const;

export function Eex19Chapter03MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter03ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter03EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
