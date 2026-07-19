import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-27-front-controller",
  title: "14.3 前端控制器",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.3 前端控制器"],
  decision:
    "能证明所有请求经过同一安全与日志门禁，并避免中央入口演变成包含业务逻辑的巨型控制器",
  healthy: "14.3 前端控制器 的约束仍成立",
  failure: "14.3 前端控制器 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern27FrontControllerBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern27FrontControllerMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern27FrontControllerTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
