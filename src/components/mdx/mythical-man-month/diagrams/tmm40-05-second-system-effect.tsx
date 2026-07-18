import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-05-second-system-effect",
  title: "第5章：画蛇添足",
  nodes: ["首版约束", "积压设想", "二版提案", "功能预算", "删除决策"],
  focuses: ["第二系统效应", "功能膨胀", "复杂度预算", "设计复核", "舍弃能力"],
} as const;

export function Tmm4005SecondSystemEffectDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4005SecondSystemEffectScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4005SecondSystemEffectEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
