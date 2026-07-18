import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-07",
  title: "第 7 章 父母、老师与教练：思维模式的传播",
  nodes: ["成人期待", "信息表达", "学习者解释", "练习反馈", "能力发展"],
  focuses: ["成败信息", "教学责任", "教练标准", "虚假成长", "行动设计"],
} as const;

export function Msg17Chapter07DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter07ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter07TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
