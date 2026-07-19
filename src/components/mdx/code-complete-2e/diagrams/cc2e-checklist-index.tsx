import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-checklist-index",
  title: "核对表目录",
  nodes: ["任务类型", "核对表定位", "逐项检查", "证据链接", "遗漏回归"],
  concepts: ["核对表目录"],
  mechanism:
    "核对表索引把具体构建任务连到进入条件、逐项判断、拒绝理由和证据位置，勾选动作本身不构成通过",
  success: "核对表目录 的机制链、结果和复位轨迹与预测一致",
  failure: "核对表目录 在“为了达到完成率而勾选不适用或没有证据的条目”处拒绝",
  model: {
    primaryLabel: "索引覆盖",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 1.8,
    secondaryLabel: "适用时机",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 10,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "条目证据压力",
  },
} as const;

export function Cc2eChecklistIndexMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
