import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-01",
  title: "1 学习是挑战天性的必修课",
  nodes: ["接触材料", "主观流畅", "无提示检索", "反馈校准", "延迟保持"],
  focuses: ["学习定义", "错觉来源", "提取能力", "错误修正", "迁移结果"],
} as const;

export function Mis18Chapter01ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter01RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter01CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
