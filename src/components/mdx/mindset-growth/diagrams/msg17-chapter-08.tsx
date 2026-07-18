import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-08",
  title: "第 8 章 改变思维模式",
  nodes: ["接受现状", "观察触发", "命名脚本", "选择新策略", "持续复盘"],
  focuses: ["变化机制", "干预证据", "第一步", "儿童支持", "持续维护"],
} as const;

export function Msg17Chapter08DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter08ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter08TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
