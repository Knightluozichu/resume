import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-official-final-review",
  title: "《代码大全（第2版）》全书总复习",
  nodes: ["问题基线", "结构重建", "测试保护", "增量交付", "工艺复盘"],
  concepts: [],
  mechanism:
    "总复习以一个可审查变更贯穿需求边界、设计、实现、测试、集成、发布和回退，并在每一段保留首个偏离点",
  success: "《代码大全（第2版）》全书总复习 的机制链、结果和复位轨迹与预测一致",
  failure:
    "《代码大全（第2版）》全书总复习 在“各章都能复述，却无法用同一变更重建跨章证据链”处拒绝",
  model: {
    primaryLabel: "先决条件",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 1.8,
    secondaryLabel: "复杂度",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 10,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "数据控制压力",
  },
} as const;

export function Cc2eOfficialFinalReviewMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
