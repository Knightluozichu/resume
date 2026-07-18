import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-06-01",
  title: "6.1 凡事必先骑上虎背，和性格内向的程序员聊几句",
  nodes: ["真实问题", "原理模型", "刻意实践", "书面表达", "反馈修正"],
  focuses: ["学习目标", "抽象能力", "实践节奏", "表达质量", "领导责任"],
} as const;

export function Crv18Section0601ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0601FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0601EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
