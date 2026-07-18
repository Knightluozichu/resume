import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-02-man-month",
  title: "第2章：人月神话",
  nodes: ["任务分解", "依赖网络", "人员到位", "集成测试", "进度恢复"],
  focuses: ["人月非线性", "关键路径", "沟通成本", "测试预留", "Brooks法则"],
} as const;

export function Tmm4002ManMonthDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4002ManMonthScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4002ManMonthEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
