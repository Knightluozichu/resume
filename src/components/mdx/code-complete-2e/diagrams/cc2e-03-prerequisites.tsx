import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-03-prerequisites",
  title: "第3章：三思而后行：前期准备",
  nodes: ["问题定义", "需求基线", "架构风险", "生命周期选择", "构建就绪"],
  concepts: [
    "第3章 三思而后行：前期准备",
    "3.1 前期准备的重要性",
    "前期准备适用于现代软件项目吗",
    "准备不周全的诱因",
    "关于开始构建之前要做前期准备的绝对有力且简明的论据",
    "3.2 辨明你所从事的软件的类型",
    "迭代开发法对前期准备的影响",
    "在序列式开发法和迭代式开发法之间做出选择",
    "3.3 问题定义的先决条件",
    "3.4 需求的先决条件",
    "为什么要有正式的需求",
    "稳定需求的神话",
    "在构建期间处理需求变更",
    "3.5 架构的先决条件",
    "架构的典型组成部分",
    "3.6 花费在前期准备上的时间长度",
    "更多资源",
    "关键点",
  ],
  mechanism:
    "前期准备把问题定义、稳定需求、架构风险和生命周期约束变成构建就绪清单，高风险未知项先做探针而非批量编码",
  success: "第3章：三思而后行：前期准备 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第3章：三思而后行：前期准备 在“在核心需求和架构边界仍不确定时扩大实现规模”处拒绝",
  model: {
    primaryLabel: "准备收益",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.7,
    secondaryLabel: "项目类型",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 9,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 18,
    limit: 58,
    metricLabel: "稳定性压力",
  },
} as const;

export function Cc2e03PrerequisitesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
