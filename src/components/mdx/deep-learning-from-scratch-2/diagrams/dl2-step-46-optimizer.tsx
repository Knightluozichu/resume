import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-46-optimizer",
  title: "步骤46 通过Optimizer更新参数",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤46 通过Optimizer更新参数",
    "46.1 Optimizer类",
    "46.2 SGD类的实现",
    "46.3 使用SGD类来解决问题",
    "46.4 SGD以外的优化方法",
  ],
  mechanism:
    "Optimizer 绑定 target 参数，update 前执行 hooks，再由 SGD/Momentum 等规则逐参数更新",
  success: "步骤46 通过Optimizer更新参数 的前向、反向与重放证据一致",
  failure:
    "步骤46 通过Optimizer更新参数 在“优化器持有另一组参数副本会更新不到模型实际使用的权重”处拒绝",
} as const;

export function Dl2Step46OptimizerLab() {
  return <DezeroStepLab {...profile} />;
}
