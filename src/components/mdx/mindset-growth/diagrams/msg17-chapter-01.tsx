import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-01",
  title: "第 1 章 思维模式",
  nodes: ["能力假设", "挑战出现", "意义解释", "应对选择", "结果回写"],
  focuses: ["差异来源", "行为含义", "生活脚本", "概念增量", "自知校准"],
} as const;

export function Msg17Chapter01DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter01ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter01TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
