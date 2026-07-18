import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-08",
  title: "8 写给大家的学习策略",
  nodes: ["角色目标", "检索设计", "间隔穿插", "反馈校准", "持续迁移"],
  focuses: ["全角色统筹", "学生任务", "职场任务", "教师设计", "培训评估"],
} as const;

export function Mis18Chapter08ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter08RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter08CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
