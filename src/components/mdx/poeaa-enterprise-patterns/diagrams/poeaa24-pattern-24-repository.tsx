import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-24-repository",
  title: "13.3 资源库",
  family: "mapping",
  nodes: ["领域意图", "查询对象", "映射元数据", "执行", "对象结果"],
  focuses: ["元数据校验", "查询组合", "资源库边界", "参数化", "类型恢复"],
  concepts: ["13.3 资源库"],
  decision:
    "能让领域服务使用领域词汇查询聚合，证明资源库没有承载业务规则或返回持久化细节",
  healthy: "13.3 资源库 的约束仍成立",
  failure: "13.3 资源库 在“元数据校验”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern24RepositoryBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern24RepositoryMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern24RepositoryTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
