import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-recommendation-01",
  title: "推荐序一 轻松的学习是无效的",
  nodes: ["学习问题", "经验直觉", "实验反证", "策略边界", "行动承诺"],
  focuses: ["真实目标", "流畅错觉", "证据等级", "适用条件", "复核计划"],
} as const;

export function Mis18Recommendation01ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Recommendation01RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Recommendation01CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
