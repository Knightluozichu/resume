import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-48-multiclass",
  title: "步骤48 多分类",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: ["步骤48 多分类", "48.1 螺旋数据集", "48.2 用于训练的代码"],
  mechanism:
    "螺旋数据集按 epoch 打乱小批量，MLP 用分类损失反传并记录独立 accuracy",
  success: "步骤48 多分类 的前向、反向与重放证据一致",
  failure:
    "步骤48 多分类 在“用训练批次顺序评估或把 accuracy 当可微损失会混淆优化与度量”处拒绝",
} as const;

export function Dl2Step48MulticlassLab() {
  return <DezeroStepLab {...profile} />;
}
