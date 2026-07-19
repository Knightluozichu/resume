import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-05-code-improvement",
  title: "第5部分：代码改善",
  nodes: ["质量目标", "协同检查", "测试调试", "安全重构", "性能复测"],
  concepts: ["第5部分 代码改善"],
  mechanism:
    "代码改善从质量目标出发，用协同检查和开发者测试发现问题，以调试定位、重构保行为、性能测量验证改进",
  success: "第5部分：代码改善 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第5部分：代码改善 在“同时修复、重构和调优，结果变好却无法归因”处拒绝",
  model: {
    primaryLabel: "质量",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.8,
    secondaryLabel: "协作",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 10,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "测试压力",
  },
} as const;

export function Cc2ePart05CodeImprovementMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
