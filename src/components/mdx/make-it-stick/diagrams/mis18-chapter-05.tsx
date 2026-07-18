import { OfficialMis18Lab } from "./official-mis18-lab";

const props = {
  unitId: "mis18-chapter-05",
  title: "5 打造适合自己的心智模型",
  nodes: ["快速判断", "主观信心", "客观测验", "结构修正", "模型应用"],
  focuses: ["机制一偏差", "信心校准", "漏洞暴露", "规则提取", "复杂判断"],
} as const;

export function Mis18Chapter05ScheduleLab() {
  return <OfficialMis18Lab {...props} mode="schedule" />;
}
export function Mis18Chapter05RetrievalLab() {
  return <OfficialMis18Lab {...props} mode="retrieval" />;
}
export function Mis18Chapter05CalibrationLab() {
  return <OfficialMis18Lab {...props} mode="calibration" />;
}
