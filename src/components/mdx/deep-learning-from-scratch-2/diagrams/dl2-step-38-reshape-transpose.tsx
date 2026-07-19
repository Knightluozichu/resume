import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-38-reshape-transpose",
  title: "步骤38 改变形状的函数",
  family: "tensor",
  nodes: ["输入shape", "轴变换", "前向shape", "反向还原", "梯度shape"],
  concepts: [
    "步骤38 改变形状的函数",
    "38.1 reshape函数的实现",
    "38.2 从Variable对象调用reshape",
    "38.3 矩阵的转置",
    "38.4 实际的transpose函数（补充内容）",
  ],
  mechanism:
    "reshape/transpose 前向只改变视图或轴序，反向必须恢复输入原 shape 或逆置换",
  success: "步骤38 改变形状的函数 的前向、反向与重放证据一致",
  failure:
    "步骤38 改变形状的函数 在“只保存输出 shape 无法在 backward 还原输入布局”处拒绝",
} as const;

export function Dl2Step38ReshapeTransposeLab() {
  return <DezeroStepLab {...profile} />;
}
