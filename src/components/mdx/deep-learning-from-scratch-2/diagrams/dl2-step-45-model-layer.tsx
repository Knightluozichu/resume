import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-45-model-layer",
  title: "步骤45 汇总层的层",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤45 汇总层的层",
    "45.1 扩展Layer类",
    "45.2 Model类",
    "45.3 使用Model来解决问题",
    "45.4 MLP类",
  ],
  mechanism:
    "Model 继承 Layer 并可嵌套子层，MLP 根据尺寸列表构造任意深度线性层序列",
  success: "步骤45 汇总层的层 的前向、反向与重放证据一致",
  failure:
    "步骤45 汇总层的层 在“子层不注册为属性时递归参数遍历会漏掉整层权重”处拒绝",
} as const;

export function Dl2Step45ModelLayerLab() {
  return <DezeroStepLab {...profile} />;
}
