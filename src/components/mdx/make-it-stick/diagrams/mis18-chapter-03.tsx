import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-03",
  title: "3 “后刻意练习”时代的到来",
  nodes: ["技能集合", "练习调度", "策略辨识", "延迟检索", "新情境迁移"],
  focuses: ["题型边界", "间隔强度", "辨别练习", "保持曲线", "迁移能力"],
} as const;

export function Mis18Chapter03ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter03RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter03CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
