import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-official-final-review",
  title: "《人月神话》40周年版全书总复习",
  nodes: ["现状基线", "计划恢复", "架构收敛", "增量交付", "观点复核"],
  focuses: [
    "工作量与进度",
    "组织与沟通",
    "设计与文档",
    "测试与里程碑",
    "长期证据",
  ],
} as const;

export function Tmm40OfficialFinalReviewDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm40OfficialFinalReviewScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm40OfficialFinalReviewEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
