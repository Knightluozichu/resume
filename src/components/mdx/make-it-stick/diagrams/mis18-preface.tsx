import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-preface",
  title: "前言",
  nodes: ["学习问题", "经验直觉", "实验反证", "策略边界", "行动承诺"],
  focuses: ["真实目标", "流畅错觉", "证据等级", "适用条件", "复核计划"],
} as const;

export function Mis18PrefaceScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18PrefaceRetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18PrefaceCalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
