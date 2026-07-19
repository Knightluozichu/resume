import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-01-layering",
  title: "第1章 分层",
  family: "layering",
  nodes: ["请求", "表示层", "领域层", "数据源层", "运行环境"],
  focuses: ["职责边界", "依赖方向", "层间契约", "部署位置", "变更触达"],
  concepts: [
    "第1章 分层",
    "1.1 企业应用中层次的演化",
    "1.2 三个基本层次",
    "1.3 为各层选择运行环境",
  ],
  decision:
    "能解释分层的边界与选择轴，逐项覆盖3个目录节点，并在同一应用切片中验证",
  healthy: "第1章 分层 的约束仍成立",
  failure: "第1章 分层 在“职责边界”处拒绝",
} as const;

// 分层与边界：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter01LayeringBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter01LayeringMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter01LayeringTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
