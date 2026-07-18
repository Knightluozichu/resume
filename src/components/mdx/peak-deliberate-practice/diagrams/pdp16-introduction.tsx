import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-introduction",
  title: "引言 天才存在吗",
  nodes: ["观察杰出", "拆解标签", "追溯训练", "提出机制", "限定外推"],
  focuses: ["天才问题", "音高案例", "训练产物", "全书承诺", "外推边界"],
} as const;

export function Pdp16IntroductionDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16IntroductionFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16IntroductionTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
