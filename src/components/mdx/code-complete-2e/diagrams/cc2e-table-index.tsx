import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-table-index",
  title: "表目录",
  nodes: ["问题", "表格定位", "口径核对", "数据比较", "决策引用"],
  concepts: ["表目录"],
  mechanism:
    "表目录用于核对表号、变量定义、单位、样本、版本和比较口径，再决定表中差异是否支持结论",
  success: "表目录 的机制链、结果和复位轨迹与预测一致",
  failure: "表目录 在“直接比较不同分母、年份或项目规模的数据”处拒绝",
  model: {
    primaryLabel: "表号",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.3,
    secondaryLabel: "数据口径",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 8,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 16,
    limit: 52,
    metricLabel: "单位压力",
  },
} as const;

export function Cc2eTableIndexMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
