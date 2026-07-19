import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-51-mnist",
  title: "步骤51 MNIST的训练",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤51 MNIST的训练",
    "51.1 MNIST数据集",
    "51.2 训练MNIST",
    "51.3 改进模型",
  ],
  mechanism:
    "MNIST 管道连接 Dataset、DataLoader、MLP、Optimizer，并用独立测试集和 test_mode 评估",
  success: "步骤51 MNIST的训练 的前向、反向与重放证据一致",
  failure:
    "步骤51 MNIST的训练 在“在测试集上更新参数或沿用训练模式会造成数据泄漏和不稳定评估”处拒绝",
} as const;

export function Dl2Step51MnistLab() {
  return <DezeroStepLab {...profile} />;
}
