import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-37-tensor",
  title: "步骤37 处理张量",
  family: "tensor",
  nodes: ["输入shape", "轴变换", "前向shape", "反向还原", "梯度shape"],
  concepts: [
    "第4阶段 创建神经网络",
    "步骤37 处理张量",
    "37.1 对各元素进行计算",
    "37.2 使用张量时的反向传播",
    "37.3 使用张量时的反向传播（补充内容）",
  ],
  mechanism:
    "逐元素函数对任意形状张量保持 shape，反向局部导数与上游梯度逐元素相乘",
  success: "步骤37 处理张量 的前向、反向与重放证据一致",
  failure: "步骤37 处理张量 在“误把张量梯度压成标量会丢失每个元素的贡献”处拒绝",
} as const;

export function Dl2Step37TensorLab() {
  return <DezeroStepLab {...profile} />;
}
