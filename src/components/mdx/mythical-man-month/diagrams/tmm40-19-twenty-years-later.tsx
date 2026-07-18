import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-19-twenty-years-later",
  title: "第19章：20年后的《人月神话》",
  nodes: ["旧观点", "行业变化", "数据复核", "作者修正", "未来实验"],
  focuses: ["保留观点", "承认错误", "增量开发", "购买复用", "长期演化"],
} as const;

export function Tmm4019TwentyYearsLaterDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4019TwentyYearsLaterScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4019TwentyYearsLaterEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
