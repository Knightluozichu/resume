import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-43-neural-network",
  title: "步骤43 神经网络",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤43 神经网络",
    "43.1 DeZero中的linear函数",
    "43.2 非线性数据集",
    "43.3 激活函数和神经网络",
    "43.4 神经网络的实现",
  ],
  mechanism:
    "Linear 与 sigmoid 组合出两层网络，非线性激活使模型超越单一仿射映射",
  success: "步骤43 神经网络 的前向、反向与重放证据一致",
  failure:
    "步骤43 神经网络 在“省略激活函数时多层线性层仍等价于单层线性变换”处拒绝",
} as const;

export function Dl2Step43NeuralNetworkLab() {
  return <DezeroStepLab {...profile} />;
}
