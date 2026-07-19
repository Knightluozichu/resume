import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-25-model-view-controller",
  title: "14.1 模型-视图-控制器",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.1 模型-视图-控制器"],
  decision:
    "能替换一种视图而不改模型，注入控制器测试请求，并证明三者依赖方向清楚",
  healthy: "14.1 模型-视图-控制器 的约束仍成立",
  failure: "14.1 模型-视图-控制器 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern25ModelViewControllerBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern25ModelViewControllerMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern25ModelViewControllerTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
