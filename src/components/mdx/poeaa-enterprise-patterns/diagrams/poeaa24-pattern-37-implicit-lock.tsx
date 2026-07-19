import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-37-implicit-lock",
  title: "16.4 隐含锁",
  family: "concurrency",
  nodes: ["读取", "业务处理", "版本锁", "冲突裁决", "提交重试"],
  focuses: ["冲突概率", "锁粒度", "等待", "回滚", "恢复"],
  concepts: ["16.4 隐含锁"],
  decision:
    "能证明所有修改入口都会隐式锁定，并让只读路径、嵌套调用和锁失败行为显式可测",
  healthy: "16.4 隐含锁 的约束仍成立",
  failure: "16.4 隐含锁 在“冲突概率”处拒绝",
} as const;

// 离线并发：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern37ImplicitLockBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern37ImplicitLockMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern37ImplicitLockTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
