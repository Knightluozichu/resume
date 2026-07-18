import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-publishing-postscript",
  title: "出版后记",
  nodes: ["确认版本", "核对目录", "区分贡献", "记录边界", "回看应用"],
  focuses: ["版次身份", "目录分母", "传播责任", "重构边界", "读者行动"],
} as const;

export function Msg17PublishingPostscriptDiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17PublishingPostscriptExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17PublishingPostscriptTransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
