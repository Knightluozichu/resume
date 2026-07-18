import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-05",
  title: "第 5 章 商业：思维模式和领导力",
  nodes: ["人才假设", "信息流动", "管理决策", "团队学习", "组织结果"],
  focuses: ["人才文化", "决策质量", "领导行为", "团体讨论", "能力发展"],
} as const;

export function Msg17Chapter05DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter05ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter05TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
