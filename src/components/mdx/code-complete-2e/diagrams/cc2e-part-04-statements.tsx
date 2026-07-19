import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-04-statements",
  title: "第4部分：语句",
  nodes: ["顺序语句", "条件", "循环", "特殊结构", "复杂度复核"],
  concepts: ["第4部分 语句"],
  mechanism:
    "语句部分按依赖组织直线代码，以清晰条件、循环不变量和表驱动规则表达控制，并用路径复杂度复核特殊结构",
  success: "第4部分：语句 的机制链、结果和复位轨迹与预测一致",
  failure: "第4部分：语句 在“控制结构合法但进入、退出和默认路径不可解释”处拒绝",
  model: {
    primaryLabel: "直线代码",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 2.1,
    secondaryLabel: "条件",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 9,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "循环压力",
  },
} as const;

export function Cc2ePart04StatementsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
