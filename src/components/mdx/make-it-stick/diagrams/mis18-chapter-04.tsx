import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-04",
  title: "4 知识的“滚雪球”效应",
  nodes: ["已有知识", "生成尝试", "适度遗忘", "再巩固", "结构扩展"],
  focuses: ["先备知识", "生成质量", "困难强度", "记忆更新", "创造迁移"],
} as const;

export function Mis18Chapter04ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter04RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter04CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
