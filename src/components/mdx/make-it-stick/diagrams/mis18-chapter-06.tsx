import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-06",
  title: "6 选择适合自己的学习风格",
  nodes: ["能力差异", "任务表征", "规则提取", "结构构建", "灵活应用"],
  focuses: ["偏好边界", "任务要求", "共性规则", "知识组块", "迁移选择"],
} as const;

export function Mis18Chapter06ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter06RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter06CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
