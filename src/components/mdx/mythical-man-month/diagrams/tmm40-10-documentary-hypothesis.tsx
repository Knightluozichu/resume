import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-10-documentary-hypothesis",
  title: "第10章：提纲挈领",
  nodes: ["目标", "产品定义", "组织责任", "计划预算", "状态变更"],
  focuses: ["关键文档集", "单一事实源", "决策显化", "状态更新", "审计路径"],
} as const;

export function Tmm4010DocumentaryHypothesisDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4010DocumentaryHypothesisScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4010DocumentaryHypothesisEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
