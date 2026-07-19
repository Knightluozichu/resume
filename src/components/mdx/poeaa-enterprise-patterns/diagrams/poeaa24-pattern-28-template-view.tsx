import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-28-template-view",
  title: "14.4 模板视图",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.4 模板视图"],
  decision:
    "能对输出做转义与快照验证，限制模板中的业务逻辑，并比较复用布局的代价",
  healthy: "14.4 模板视图 的约束仍成立",
  failure: "14.4 模板视图 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern28TemplateViewBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern28TemplateViewMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern28TemplateViewTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
