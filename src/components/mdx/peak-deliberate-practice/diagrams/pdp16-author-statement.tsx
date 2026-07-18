import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-author-statement",
  title: "作者声明",
  nodes: ["定位作者", "界定主张", "区分案例", "标注推论", "独立复核"],
  focuses: ["作者责任", "核心主张", "案例作用", "推论边界", "复核责任"],
} as const;

export function Pdp16AuthorStatementDesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16AuthorStatementFeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16AuthorStatementTransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
