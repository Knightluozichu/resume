import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-introduction",
  title: "引言",
  nodes: [
    "识别情境",
    "记录自我叙事",
    "选择学习目标",
    "执行有效策略",
    "复盘证据",
  ],
  focuses: ["信念假设", "触发情境", "目标选择", "策略行为", "证据修正"],
} as const;

export function Msg17IntroductionDiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17IntroductionExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17IntroductionTransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
