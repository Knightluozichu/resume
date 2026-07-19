import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-10-identity-map",
  title: "11.2 标识映射",
  family: "mapping",
  nodes: ["事务范围", "身份缓存", "对象访问", "变更集合", "提交"],
  focuses: ["工作单元", "唯一实例", "加载时机", "写出顺序", "并发"],
  concepts: ["11.2 标识映射"],
  decision:
    "能证明同一标识的多次读取返回同一实例，并在工作范围结束时正确释放映射",
  healthy: "11.2 标识映射 的约束仍成立",
  failure: "11.2 标识映射 在“工作单元”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern10IdentityMapBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern10IdentityMapMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern10IdentityMapTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
