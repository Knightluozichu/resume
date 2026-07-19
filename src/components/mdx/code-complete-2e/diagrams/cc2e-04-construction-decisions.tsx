import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-04-construction-decisions",
  title: "第4章：关键的“构建”决策",
  nodes: ["产品约束", "语言选择", "约定基线", "实践组合", "决策复核"],
  concepts: [
    "第4章 关键的“构建”决策",
    "4.1 选择编程语言",
    "语言描述",
    "4.2 编程约定",
    "4.3 你在技术浪潮中的位置",
    "“深入一种语言去编程”的例子",
    "4.4 选择主要的构建实践方法",
    "关键点",
  ],
  mechanism:
    "构建决策根据产品约束选择语言、工具、编码约定、复用策略和质量实践，并保存备选方案与触发重审的条件",
  success: "第4章：关键的“构建”决策 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第4章：关键的“构建”决策 在“先选熟悉工具，再倒推问题以适配工具”处拒绝",
  model: {
    primaryLabel: "语言适配",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 1.7,
    secondaryLabel: "约定一致",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 9,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 18,
    limit: 58,
    metricLabel: "技术风险压力",
  },
} as const;

export function Cc2e04ConstructionDecisionsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
