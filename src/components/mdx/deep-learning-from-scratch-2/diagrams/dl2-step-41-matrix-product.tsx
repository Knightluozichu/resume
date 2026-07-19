import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-41-matrix-product",
  title: "步骤41 矩阵的乘积",
  family: "tensor",
  nodes: ["输入shape", "轴变换", "前向shape", "反向还原", "梯度shape"],
  concepts: [
    "步骤41 矩阵的乘积",
    "41.1 向量的内积和矩阵的乘积",
    "41.2 检查矩阵的形状",
    "41.3 矩阵乘积的反向传播",
  ],
  mechanism:
    "矩阵乘积检查内维匹配，反向分别右乘或左乘转置矩阵以恢复两个输入 shape",
  success: "步骤41 矩阵的乘积 的前向、反向与重放证据一致",
  failure:
    "步骤41 矩阵的乘积 在“把 matmul 当逐元素乘法会得到看似可广播但语义错误的梯度”处拒绝",
} as const;

export function Dl2Step41MatrixProductLab() {
  return <DezeroStepLab {...profile} />;
}
