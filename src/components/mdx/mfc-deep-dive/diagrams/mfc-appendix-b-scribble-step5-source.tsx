import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "附录B Scribble Step 5完整原始码",
  label: "附录B · 完整源码",
  color: "#155e75",
  soft: "#ecfeff",
  chain: [
    "建立干净工程",
    "装配Document/View",
    "核对消息资源",
    "绘制并序列化",
    "预览打印",
    "重放回归",
  ],
  concepts: ["附录B Scribble Step 5完整原始码"],
} as const;

export function MfcAppendixBScribbleStep5SourceMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function MfcAppendixBScribbleStep5SourceExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function MfcAppendixBScribbleStep5SourceEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
