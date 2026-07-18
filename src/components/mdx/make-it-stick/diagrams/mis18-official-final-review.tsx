import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-official-final-review",
  title: "《认知天性》全书综合复核",
  nodes: ["定义目标", "预测表现", "安排检索", "测量保持", "修正迁移"],
  focuses: ["目标行为", "流畅错觉", "策略剂量", "延迟证据", "独立复核"],
} as const;

export function Mis18OfficialFinalReviewScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18OfficialFinalReviewRetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18OfficialFinalReviewCalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
