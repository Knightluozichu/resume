import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-09-unit-of-work",
  title: "11.1 工作单元",
  family: "mapping",
  nodes: ["事务范围", "身份缓存", "对象访问", "变更集合", "提交"],
  focuses: ["工作单元", "唯一实例", "加载时机", "写出顺序", "并发"],
  concepts: ["11.1 工作单元"],
  decision:
    "能记录新增、修改、删除对象并原子提交，故障时不留下部分写入或遗漏变更",
  healthy: "11.1 工作单元 的约束仍成立",
  failure: "11.1 工作单元 在“工作单元”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern09UnitOfWorkBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern09UnitOfWorkMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern09UnitOfWorkTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
