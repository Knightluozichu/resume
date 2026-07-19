import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-03-relational-mapping",
  title: "第3章 映射到关系数据库",
  family: "mapping",
  nodes: ["对象图", "身份关系", "读取", "变更跟踪", "写回"],
  focuses: ["身份", "工作单元", "关系映射", "继承映射", "连接边界"],
  concepts: [
    "第3章 映射到关系数据库",
    "3.1 架构模式",
    "3.2 行为问题",
    "3.3 读取数据",
    "3.4 结构映射模式",
    "3.5 建立映射",
    "3.6 使用元数据",
    "3.7 数据库连接",
    "3.8 其他问题",
    "3.9 进一步阅读",
  ],
  decision:
    "能解释映射到关系数据库的边界与选择轴，逐项覆盖9个目录节点，并在同一应用切片中验证",
  healthy: "第3章 映射到关系数据库 的约束仍成立",
  failure: "第3章 映射到关系数据库 在“身份”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter03RelationalMappingBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter03RelationalMappingMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter03RelationalMappingTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
