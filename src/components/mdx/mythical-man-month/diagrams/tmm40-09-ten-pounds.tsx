import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-09-ten-pounds",
  title: "第9章：削足适履",
  nodes: ["容量约束", "模块配额", "持续测量", "表示重构", "边界验收"],
  focuses: ["空间成本", "预算分配", "规模跟踪", "数据表示", "局部优化"],
} as const;

export function Tmm4009TenPoundsDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4009TenPoundsScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4009TenPoundsEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
