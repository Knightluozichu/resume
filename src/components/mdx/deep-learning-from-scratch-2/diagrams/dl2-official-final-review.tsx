import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-official-final-review",
  title: "《深度学习入门2：自制框架》全书总复习",
  family: "book",
  nodes: ["前置合同", "新增能力", "最小验证", "故障注入", "跨步复用"],
  concepts: [],
  mechanism:
    "总复习用同一最小任务贯穿 Variable、动态图、高阶导、Layer、Optimizer、GPU、CNN 与 RNN",
  success: "《深度学习入门2：自制框架》全书总复习 的前向、反向与重放证据一致",
  failure:
    "《深度学习入门2：自制框架》全书总复习 在“只复述 API 名称而不能预测首个错误节点不算掌握框架”处拒绝",
} as const;

export function Dl2OfficialFinalReviewLab() {
  return <DezeroStepLab {...profile} />;
}
