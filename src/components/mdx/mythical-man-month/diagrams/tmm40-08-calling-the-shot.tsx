import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-08-calling-the-shot",
  title: "第8章：胸有成竹",
  nodes: ["规模定义", "历史样本", "生产率分布", "情境校准", "估算区间"],
  focuses: ["数据口径", "样本差异", "规模效应", "不确定区间", "估算校准"],
} as const;

export function Tmm4008CallingTheShotDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4008CallingTheShotScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4008CallingTheShotEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
