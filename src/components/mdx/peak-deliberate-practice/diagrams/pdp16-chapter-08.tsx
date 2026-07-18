import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-08",
  title: "第8章 怎样解释天生才华",
  nodes: ["拆解传奇", "追溯经历", "比较训练", "保留基因", "评估标签"],
  focuses: ["音乐传奇", "运动案例", "奇才案例", "训练比较", "基因边界"],
} as const;

export function Pdp16Chapter08DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter08FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter08TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
