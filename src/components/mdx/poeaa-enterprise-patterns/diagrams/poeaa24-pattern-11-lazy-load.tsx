import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-11-lazy-load",
  title: "11.3 延迟加载",
  family: "mapping",
  nodes: ["事务范围", "身份缓存", "对象访问", "变更集合", "提交"],
  focuses: ["工作单元", "唯一实例", "加载时机", "写出顺序", "并发"],
  concepts: ["11.3 延迟加载"],
  decision:
    "能证明未访问数据不产生查询，首次访问只加载一次，并避免会话关闭后的隐式失败和N+1查询",
  healthy: "11.3 延迟加载 的约束仍成立",
  failure: "11.3 延迟加载 在“工作单元”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern11LazyLoadBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern11LazyLoadMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern11LazyLoadTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
