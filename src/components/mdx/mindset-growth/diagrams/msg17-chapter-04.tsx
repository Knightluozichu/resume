import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-04",
  title: "第 4 章 体育：冠军的思维模式",
  nodes: ["禀赋起点", "专项训练", "比赛压力", "失败复盘", "长期表现"],
  focuses: ["天赋叙事", "竞技品性", "成功标准", "失败处理", "责任掌控"],
} as const;

export function Msg17Chapter04DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter04ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter04TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
