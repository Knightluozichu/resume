import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-36-double-backprop",
  title: "步骤36 DeZero的其他用途",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤36 DeZero的其他用途",
    "36.1 double backprop的用途",
    "36.2 深度学习研究中的应用示例",
  ],
  mechanism:
    "double backprop 可对梯度范数等导数函数再次求导，用于正则、敏感度和研究型目标",
  success: "步骤36 DeZero的其他用途 的前向、反向与重放证据一致",
  failure:
    "步骤36 DeZero的其他用途 在“把一阶梯度 detach 后再构造损失会让二阶项恒为零”处拒绝",
} as const;

export function Dl2Step36DoubleBackpropLab() {
  return <DezeroStepLab {...profile} />;
}
