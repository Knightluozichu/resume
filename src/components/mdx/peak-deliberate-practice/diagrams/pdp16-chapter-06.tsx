import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-06",
  title: "第6章 在生活中运用刻意练习原则",
  nodes: ["选择导师", "安排专注", "执行反馈", "定位停滞", "维持动机"],
  focuses: ["导师匹配", "专注投入", "自我反馈", "停滞诊断", "动机系统"],
} as const;

export function Pdp16Chapter06DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter06FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter06TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
