import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-official-learning-map",
  title: "《认知天性》权威学习地图",
  nodes: ["误解诊断", "检索巩固", "练习调度", "校准建模", "角色迁移"],
  focuses: ["版次目录", "证据主张", "策略组合", "误差校准", "行动验收"],
} as const;

export function Mis18OfficialLearningMapScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18OfficialLearningMapRetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18OfficialLearningMapCalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
