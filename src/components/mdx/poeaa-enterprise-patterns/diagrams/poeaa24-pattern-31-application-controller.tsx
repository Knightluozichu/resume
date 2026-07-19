import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-31-application-controller",
  title: "14.7 应用控制器",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.7 应用控制器"],
  decision:
    "能用状态与事件驱动页面流转，测试非法跳转，并避免控制器复制领域状态机",
  healthy: "14.7 应用控制器 的约束仍成立",
  failure: "14.7 应用控制器 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern31ApplicationControllerBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern31ApplicationControllerMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern31ApplicationControllerTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
