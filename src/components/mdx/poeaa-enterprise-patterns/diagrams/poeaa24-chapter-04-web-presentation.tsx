import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-chapter-04-web-presentation",
  title: "第4章 Web表示层",
  family: "web",
  nodes: ["请求", "输入控制", "模型调用", "视图生成", "响应"],
  focuses: ["请求映射", "控制器", "模型", "视图", "导航"],
  concepts: [
    "第4章 Web表示层",
    "4.1 视图模式",
    "4.2 输入控制器模式",
    "4.3 进一步阅读",
  ],
  decision:
    "能解释Web表示层的边界与选择轴，逐项覆盖3个目录节点，并在同一应用切片中验证",
  healthy: "第4章 Web表示层 的约束仍成立",
  failure: "第4章 Web表示层 在“请求映射”处拒绝",
} as const;

// Web 表示：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Chapter04WebPresentationBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Chapter04WebPresentationMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Chapter04WebPresentationTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
