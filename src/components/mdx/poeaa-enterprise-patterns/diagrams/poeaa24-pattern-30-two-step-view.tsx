import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-30-two-step-view",
  title: "14.6 两步视图",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.6 两步视图"],
  decision:
    "能让多个页面共享第二步布局且第一步保持页面语义，并证明缓存与错误定位没有失控",
  healthy: "14.6 两步视图 的约束仍成立",
  failure: "14.6 两步视图 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern30TwoStepViewBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern30TwoStepViewMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern30TwoStepViewTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
