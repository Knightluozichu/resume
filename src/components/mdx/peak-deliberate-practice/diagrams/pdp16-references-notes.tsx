import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-references-notes",
  title: "参考文献和注释",
  nodes: ["抽取主张", "定位来源", "核对方法", "检查边界", "更新结论"],
  focuses: ["主张索引", "来源层级", "方法核查", "外推边界", "结论更新"],
} as const;

export function Pdp16ReferencesNotesDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16ReferencesNotesFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16ReferencesNotesTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
