import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-01",
  title: "第1章 有目的的练习",
  nodes: ["测量基线", "设定目标", "专注尝试", "获得反馈", "突破瓶颈"],
  focuses: ["记忆案例", "练习总量", "目的练习", "四项特征", "瓶颈修正"],
} as const;

export function Pdp16Chapter01DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter01FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter01TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
