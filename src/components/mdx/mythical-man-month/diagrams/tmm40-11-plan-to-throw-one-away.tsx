import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-11-plan-to-throw-one-away",
  title: "第11章：未雨绸缪",
  nodes: ["试验原型", "学习反馈", "变更设计", "组织调整", "版本演进"],
  focuses: ["舍弃原型", "变化成本", "模块边界", "组织韧性", "生产率回落"],
} as const;

export function Tmm4011PlanToThrowOneAwayDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4011PlanToThrowOneAwayScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4011PlanToThrowOneAwayEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
