import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-official-final-review",
  title: "《企业应用架构模式》全书总复习",
  family: "book",
  nodes: ["请求入口", "领域事务", "对象映射", "并发会话", "远程边界"],
  focuses: ["版次闭环", "模式协作", "替代方案", "故障注入", "独立复核"],
  concepts: ["76个正式单元", "119个目录节点", "18章", "51个模式", "10个模式族"],
  decision:
    "能组合至少六个不同模式族完成应用切片，并说明每个模式为何采用、何时应替换",
  healthy: "《企业应用架构模式》全书总复习 的约束仍成立",
  failure: "《企业应用架构模式》全书总复习 在“版次闭环”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24OfficialFinalReviewBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24OfficialFinalReviewMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24OfficialFinalReviewTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
