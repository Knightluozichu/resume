import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-index",
  title: "索引",
  nodes: ["问题术语", "索引词", "章节坐标", "上下文比较", "实践路径"],
  concepts: ["索引"],
  mechanism:
    "索引把问题术语、同义词和交叉引用连到多个章节语境，读者从故障或概念反向构造学习路径",
  success: "索引 的机制链、结果和复位轨迹与预测一致",
  failure: "索引 在“索引词只跳到单页标题，不能比较不同语境的含义”处拒绝",
  model: {
    primaryLabel: "术语规范",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.2,
    secondaryLabel: "同义词",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 7,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 18,
    limit: 48,
    metricLabel: "页码压力",
  },
} as const;

export function Cc2eIndexMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
