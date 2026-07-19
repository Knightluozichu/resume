import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-44-parameter-layer",
  title: "步骤44 汇总参数的层",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤44 汇总参数的层",
    "44.1 Parameter类的实现",
    "44.2 Layer类的实现",
    "44.3 Linear类的实现",
    "44.4 使用Layer实现神经网络",
  ],
  mechanism:
    "Parameter 标记可训练 Variable，Layer 递归收集属性中的 Parameter 并统一 cleargrads/迭代",
  success: "步骤44 汇总参数的层 的前向、反向与重放证据一致",
  failure:
    "步骤44 汇总参数的层 在“把临时激活误注册为 Parameter 会被优化器更新和保存”处拒绝",
} as const;

export function Dl2Step44ParameterLayerLab() {
  return <DezeroStepLab {...profile} />;
}
