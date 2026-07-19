import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-26-page-controller",
  title: "14.2 页面控制器",
  family: "web",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
  concepts: ["14.2 页面控制器"],
  decision:
    "能让两个页面控制器复用领域服务却保持各自输入契约，并识别重复流程何时需要前端控制器",
  healthy: "14.2 页面控制器 的约束仍成立",
  failure: "14.2 页面控制器 在“路由”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern26PageControllerBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern26PageControllerMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern26PageControllerTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
