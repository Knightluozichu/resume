import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-47-softmax-cross-entropy",
  title: "步骤47 softmax函数和交叉熵误差",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤47 softmax函数和交叉熵误差",
    "47.1 用于切片操作的函数",
    "47.2 softmax函数",
    "47.3 交叉熵误差",
  ],
  mechanism:
    "get_item 保持切片可微，softmax 用稳定平移，交叉熵从正确类别的对数概率构造批量损失",
  success: "步骤47 softmax函数和交叉熵误差 的前向、反向与重放证据一致",
  failure:
    "步骤47 softmax函数和交叉熵误差 在“直接 exp 大 logits 会溢出，标签轴或批轴选错会产生错误损失”处拒绝",
} as const;

export function Dl2Step47SoftmaxCrossEntropyLab() {
  return <DezeroStepLab {...profile} />;
}
