import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-05-backprop-theory",
  title: "步骤5 反向传播的理论知识",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤5 反向传播的理论知识",
    "5.1 链式法则",
    "5.2 反向传播的推导",
    "5.3 用计算图表示",
  ],
  mechanism:
    "链式法则把复合函数的局部导数按反向路径相乘，计算图明确每个中间变量的责任",
  success: "步骤5 反向传播的理论知识 的前向、反向与重放证据一致",
  failure:
    "步骤5 反向传播的理论知识 在“沿前向方向乘导数或漏掉一条局部边会得到方向正确但数值错误的梯度”处拒绝",
} as const;

export function Dl2Step05BackpropTheoryLab() {
  return <DezeroStepLab {...profile} />;
}
