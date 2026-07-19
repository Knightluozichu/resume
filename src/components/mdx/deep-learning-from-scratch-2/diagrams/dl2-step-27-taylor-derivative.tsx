import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-27-taylor-derivative",
  title: "步骤27 泰勒展开的导数",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤27 泰勒展开的导数",
    "27.1 sin函数的实现",
    "27.2 泰勒展开的理论知识",
    "27.3 泰勒展开的实现",
    "27.4 计算图的可视化",
  ],
  mechanism:
    "sin 的泰勒级数逐项累加并以项绝对值阈值停止，自动微分图保留每一项的导数",
  success: "步骤27 泰勒展开的导数 的前向、反向与重放证据一致",
  failure:
    "步骤27 泰勒展开的导数 在“固定迭代次数过少会产生近似误差，过多则制造冗长计算图”处拒绝",
} as const;

export function Dl2Step27TaylorDerivativeLab() {
  return <DezeroStepLab {...profile} />;
}
