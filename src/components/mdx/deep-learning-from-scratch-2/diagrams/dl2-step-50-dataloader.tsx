import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-50-dataloader",
  title: "步骤50 用于取出小批量数据的DataLoader",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤50 用于取出小批量数据的DataLoader",
    "50.1 什么是迭代器",
    "50.2 使用DataLoader",
    "50.3 accuracy函数的实现",
    "50.4 螺旋数据集的训练代码",
  ],
  mechanism:
    "DataLoader 实现迭代器协议，按 batch_size 产生索引块并在 epoch 边界重置与可选打乱",
  success: "步骤50 用于取出小批量数据的DataLoader 的前向、反向与重放证据一致",
  failure:
    "步骤50 用于取出小批量数据的DataLoader 在“漏掉最后不足一批的数据或 epoch 重置会改变样本覆盖率”处拒绝",
} as const;

export function Dl2Step50DataloaderLab() {
  return <DezeroStepLab {...profile} />;
}
