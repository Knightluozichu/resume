import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-25-code-tuning-strategies",
  title: "第25章：代码调整策略",
  nodes: ["性能目标", "基线测量", "热点定位", "候选调整", "复测取舍"],
  focuses: ["质量权衡", "调整时机", "低效来源", "精确测量", "反复调整"],
} as const;

export function Cc2e25CodeTuningStrategiesStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2e25CodeTuningStrategiesTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2e25CodeTuningStrategiesEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
