import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-05-concurrency",
  title: "第5章 并发",
  family: "concurrency",
  nodes: ["业务事务", "读取版本", "并发修改", "冲突检测", "提交恢复"],
  focuses: ["执行语境", "隔离", "不变量", "乐观悲观", "事务"],
  concepts: [
    "第5章 并发",
    "5.1 并发问题",
    "5.2 执行语境",
    "5.3 隔离与不变性",
    "5.4 乐观并发控制和悲观并发控制",
    "5.5 事务",
    "5.6 离线并发控制的模式",
    "5.7 应用服务器并发",
    "5.8 进一步阅读",
  ],
  decision:
    "能解释并发的边界与选择轴，逐项覆盖8个目录节点，并在同一应用切片中验证",
  healthy: "第5章 并发 的约束仍成立",
  failure: "第5章 并发 在“执行语境”处拒绝",
} as const;

// 离线并发：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter05ConcurrencyBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter05ConcurrencyMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter05ConcurrencyTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
