import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-official-final-review",
  title: "《引导工具箱》全书综合复核",
  nodes: [
    "冻结会议问题",
    "诊断阶段与权力",
    "选择组合工具",
    "注入参与失衡",
    "独立复核兑现",
  ],
  focuses: ["陌生迁移", "工具选择", "权力安全", "失败注入", "行动证据"],
} as const;

export function Opt23OfficialFinalReviewMapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23OfficialFinalReviewExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23OfficialFinalReviewEvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
