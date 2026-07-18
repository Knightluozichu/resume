import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-to-readers",
  title: "致读者",
  nodes: ["选择技能", "测量基线", "定位弱点", "设计练习", "复测迁移"],
  focuses: ["真实目标", "能力基线", "薄弱环节", "练习合同", "迁移验收"],
} as const;

export function Pdp16ToReadersDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16ToReadersFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16ToReadersTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
