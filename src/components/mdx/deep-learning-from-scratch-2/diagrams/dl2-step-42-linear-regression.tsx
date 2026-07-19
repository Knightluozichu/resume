import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-42-linear-regression",
  title: "步骤42 线性回归",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤42 线性回归",
    "42.1 玩具数据集",
    "42.2 线性回归的理论知识",
    "42.3 线性回归的实现",
    "42.4 DeZero的mean_squared_error函数（补充内容）",
  ],
  mechanism:
    "线性回归用可训练 W、b 最小化均方误差，每轮先清梯度再按损失反向更新",
  success: "步骤42 线性回归 的前向、反向与重放证据一致",
  failure:
    "步骤42 线性回归 在“训练与评估复用旧预测或未清梯度会制造虚假的损失下降”处拒绝",
} as const;

export function Dl2Step42LinearRegressionLab() {
  return <DezeroStepLab {...profile} />;
}
