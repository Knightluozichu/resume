import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-04-conceptual-integrity",
  title: "第4章：贵族专制、民主政治和系统设计",
  nodes: ["用户任务", "设计原则", "架构决策", "实现约束", "一致体验"],
  focuses: ["概念完整性", "结构师责任", "意见输入", "决策收敛", "并行准备"],
} as const;

export function Tmm4004ConceptualIntegrityDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4004ConceptualIntegrityScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4004ConceptualIntegrityEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
