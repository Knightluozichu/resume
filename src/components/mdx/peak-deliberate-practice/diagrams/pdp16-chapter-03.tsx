import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-03",
  title: "第3章 心理表征",
  nodes: ["感知线索", "匹配模式", "预测结果", "选择行动", "反馈更新"],
  focuses: ["盲棋案例", "专家差异", "表征定义", "规律识别", "计划学习"],
} as const;

export function Pdp16Chapter03DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter03FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter03TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
