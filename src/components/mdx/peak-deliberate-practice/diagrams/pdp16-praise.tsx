import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-praise",
  title: "赞誉",
  nodes: ["识别评价", "拆出主张", "定位依据", "寻找反例", "决定采信"],
  focuses: ["评价来源", "主张类型", "证据等级", "反例边界", "采信决策"],
} as const;

export function Pdp16PraiseDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16PraiseFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16PraiseTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
