import { OfficialPdp16Lab } from "./official-pdp16-lab";

const props = {
  unitId: "pdp16-chapter-09",
  title: "第9章 用刻意练习创造全新的世界",
  nodes: ["定义目标表现", "设计学习活动", "即时诊断", "反馈修正", "扩展制度"],
  focuses: ["物理教学", "方法前景", "领域扩展", "社会愿景", "制度边界"],
} as const;

export function Pdp16Chapter09DesignLab() {
  return <OfficialPdp16Lab {...props} mode="design" />;
}
export function Pdp16Chapter09FeedbackLab() {
  return <OfficialPdp16Lab {...props} mode="feedback" />;
}
export function Pdp16Chapter09TransferLab() {
  return <OfficialPdp16Lab {...props} mode="transfer" />;
}
