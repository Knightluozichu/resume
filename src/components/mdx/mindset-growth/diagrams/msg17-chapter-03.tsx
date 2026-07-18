import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-03",
  title: "第 3 章 关于能力和成就的真相",
  nodes: ["起点测量", "任务投入", "策略反馈", "能力变化", "成就审计"],
  focuses: ["成绩轨迹", "艺术训练", "表扬标签", "否定标签", "因果边界"],
} as const;

export function Msg17Chapter03DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter03ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter03TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
