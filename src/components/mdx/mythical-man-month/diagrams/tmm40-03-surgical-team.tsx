import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-03-surgical-team",
  title: "第3章：外科手术队伍",
  nodes: ["复杂问题", "首席设计", "支持角色", "团队运行", "规模扩展"],
  focuses: ["角色非对称", "决策权", "工具支持", "接口边界", "扩展风险"],
} as const;

export function Tmm4003SurgicalTeamDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4003SurgicalTeamScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4003SurgicalTeamEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
