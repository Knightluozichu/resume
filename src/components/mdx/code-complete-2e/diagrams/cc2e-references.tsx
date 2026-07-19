import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-references",
  title: "参考文献",
  nodes: ["章节主张", "引用坐标", "原始证据", "口径比较", "引用结论"],
  concepts: ["参考文献"],
  mechanism:
    "参考文献页把章节主张连到可定位来源，核对作者、年份、版本、方法与上下文，并在来源冲突时记录裁决理由",
  success: "参考文献 的机制链、结果和复位轨迹与预测一致",
  failure: "参考文献 在“只列书名或链接，不说明它支持哪条主张”处拒绝",
  model: {
    primaryLabel: "来源层级",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 1.3,
    secondaryLabel: "年份",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 8,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 16,
    limit: 52,
    metricLabel: "方法压力",
  },
} as const;

export function Cc2eReferencesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
