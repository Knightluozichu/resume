import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-39-sum",
  title: "步骤39 求和的函数",
  family: "tensor",
  nodes: ["输入shape", "轴变换", "前向shape", "反向还原", "梯度shape"],
  concepts: [
    "步骤39 求和的函数",
    "39.1 sum函数的反向传播",
    "39.2 sum函数的实现",
    "39.3 axis和keepdims",
  ],
  mechanism:
    "sum 的 backward 按 axis 与 keepdims 重建被消去维度，再广播回输入 shape",
  success: "步骤39 求和的函数 的前向、反向与重放证据一致",
  failure:
    "步骤39 求和的函数 在“忽略 keepdims 会让多轴求和的梯度对齐到错误轴”处拒绝",
} as const;

export function Dl2Step39SumLab() {
  return <DezeroStepLab {...profile} />;
}
