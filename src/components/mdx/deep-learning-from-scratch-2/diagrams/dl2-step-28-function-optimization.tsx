import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-28-function-optimization",
  title: "步骤28 函数优化",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤28 函数优化",
    "28.1 Rosenbrock函数",
    "28.2 求导",
    "28.3 梯度下降法的实现",
  ],
  mechanism:
    "Rosenbrock 谷底用梯度下降迭代更新两个变量，并在每轮清梯度后重新 forward/backward",
  success: "步骤28 函数优化 的前向、反向与重放证据一致",
  failure:
    "步骤28 函数优化 在“学习率过大在狭长谷底振荡，不 cleargrad 会累积跨轮梯度”处拒绝",
} as const;

export function Dl2Step28FunctionOptimizationLab() {
  return <DezeroStepLab {...profile} />;
}
