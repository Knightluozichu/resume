import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-04",
  title: "第4章 如何发挥人的长处",
  nodes: [
    "定义岗位成果",
    "识别可证长处",
    "匹配任务责任",
    "限制关键短处",
    "复核贡献增益",
  ],
  focuses: ["用人所长", "岗位匹配", "管理上司", "自我长处", "品格门禁"],
} as const;

export function Eex19Chapter04MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter04ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter04EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
