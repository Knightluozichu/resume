import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-29-transform-view",
  title: "14.5 转换视图",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.5 转换视图"],
  decision:
    "能用同一输入稳定生成输出，测试转换规则，并说明何时模板更适合设计人员协作",
  healthy: "14.5 转换视图 的约束仍成立",
  failure: "14.5 转换视图 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern29TransformViewBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern29TransformViewMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern29TransformViewTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
