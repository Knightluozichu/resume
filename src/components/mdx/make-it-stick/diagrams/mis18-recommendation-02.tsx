import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-recommendation-02",
  title: "推荐序二 学习不止技巧",
  nodes: ["学习问题", "经验直觉", "实验反证", "策略边界", "行动承诺"],
  focuses: ["真实目标", "流畅错觉", "证据等级", "适用条件", "复核计划"],
} as const;

export function Mis18Recommendation02ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Recommendation02RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Recommendation02CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
