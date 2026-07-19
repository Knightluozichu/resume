import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-figure-index",
  title: "图目录",
  nodes: ["问题", "图号定位", "节点解释", "边的语义", "代码验证"],
  concepts: ["图目录"],
  mechanism:
    "图目录要求把节点解释为对象或状态、把边解释为数据或控制变化，并用代码轨迹验证方向和边界",
  success: "图目录 的机制链、结果和复位轨迹与预测一致",
  failure: "图目录 在“把装饰箭头当成因果关系，图中没有状态和反例”处拒绝",
  model: {
    primaryLabel: "图号",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 1.8,
    secondaryLabel: "对象",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 8,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 16,
    limit: 62,
    metricLabel: "关系压力",
  },
} as const;

export function Cc2eFigureIndexMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
