import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-14-web-presentation-patterns",
  title: "第14章 Web表现模式",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["第14章 Web表现模式"],
  decision:
    "能解释Web表现模式的边界与选择轴，逐项覆盖7个目录节点，并在同一应用切片中验证",
  healthy: "第14章 Web表现模式 的约束仍成立",
  failure: "第14章 Web表现模式 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter14WebPresentationPatternsBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter14WebPresentationPatternsMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter14WebPresentationPatternsTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
