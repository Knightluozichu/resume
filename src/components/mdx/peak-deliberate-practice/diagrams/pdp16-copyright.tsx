import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-copyright",
  title: "版权信息",
  nodes: ["识别版本", "核对责任", "冻结目录", "标注改编", "保存证据"],
  focuses: ["版本身份", "责任主体", "目录分母", "改编边界", "证据留存"],
} as const;

export function Pdp16CopyrightDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16CopyrightFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16CopyrightTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
