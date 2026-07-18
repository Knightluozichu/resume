import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-acknowledgments",
  title: "致谢",
  nodes: ["核心主张", "原始研究", "方法限制", "适用边界", "后续验证"],
  focuses: ["引文坐标", "研究设计", "效应口径", "外推条件", "更新证据"],
} as const;

export function Mis18AcknowledgmentsScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18AcknowledgmentsRetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18AcknowledgmentsCalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
