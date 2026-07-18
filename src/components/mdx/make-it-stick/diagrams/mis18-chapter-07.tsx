import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-07",
  title: "7 终身学习者基本的基本",
  nodes: ["起始能力", "挑战任务", "有效策略", "反馈坚持", "能力增长"],
  focuses: ["个体差异", "可塑边界", "策略质量", "自我效能", "专家模型"],
} as const;

export function Mis18Chapter07ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter07RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter07CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
