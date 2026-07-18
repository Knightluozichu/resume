import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-06",
  title: "第 6 章 人际关系：关于相处的思维模式",
  nodes: ["关系期待", "冲突触发", "归因解释", "沟通行动", "修复或边界"],
  focuses: ["两性差异", "爱情脚本", "敌意升级", "竞争比较", "关系成长"],
} as const;

export function Msg17Chapter06DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter06ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter06TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
