import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-02",
  title: "2 学习的本质：知识链和记忆结",
  nodes: ["初始编码", "检索尝试", "反馈修正", "再次检索", "长期保持"],
  focuses: ["编码质量", "提取费力", "反馈时机", "间隔长度", "保持证据"],
} as const;

export function Mis18Chapter02ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter02RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter02CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
