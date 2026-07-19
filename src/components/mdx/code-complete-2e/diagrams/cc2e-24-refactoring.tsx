import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-24-refactoring",
  title: "第24章：重构",
  nodes: ["坏味道", "行为基线", "小步变换", "测试确认", "结构复盘"],
  concepts: [
    "第24章 重构",
    "24.1 软件进化的类型",
    "软件进化的哲学",
    "24.2 重构简介",
    "重构的理由",
    "拒绝重构的理由",
    "24.3 特定的重构",
    "数据级的重构",
    "语句级的重构",
    "子程序级重构",
    "类实现的重构",
    "类接口的重构",
    "系统级重构",
    "24.4 安全的重构",
    "不宜重构的情况",
    "24.5 重构策略",
    "推荐读物",
    "关键点",
  ],
  mechanism:
    "重构在外部可观察行为被测试冻结后，以小步可逆变换改善命名、数据、条件、子程序、类和接口结构",
  success: "第24章：重构 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第24章：重构 在“没有行为基线便大范围改写，功能变化混入结构变化”处拒绝",
  model: {
    primaryLabel: "进化类型",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.8,
    secondaryLabel: "重构理由",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 9,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "数据语句子程序压力",
  },
} as const;

export function Cc2e24RefactoringMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
