import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-chapter-06",
  title: "第6章 老司机的精进",
  nodes: ["真实问题", "原理模型", "刻意实践", "书面表达", "反馈修正"],
  focuses: ["学习目标", "抽象能力", "实践节奏", "表达质量", "领导责任"],
} as const;

export function Crv18Chapter06ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Chapter06FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Chapter06EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
