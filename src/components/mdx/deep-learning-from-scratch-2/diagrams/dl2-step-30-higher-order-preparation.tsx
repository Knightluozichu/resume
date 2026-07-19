import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-30-higher-order-preparation",
  title: "步骤30 高阶导数（准备篇）",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤30 高阶导数（准备篇）",
    "30.1 确认工作①：Variable实例变量",
    "30.2 确认工作②：Function类",
    "30.3 确认工作③：Variable类的反向传播",
  ],
  mechanism:
    "把 grad 从 ndarray 升级为 Variable，并让 backward 运算也通过 DeZero Function 执行，为高阶图建模",
  success: "步骤30 高阶导数（准备篇） 的前向、反向与重放证据一致",
  failure:
    "步骤30 高阶导数（准备篇） 在“backward 中混入 NumPy 运算会切断梯度本身的 creator”处拒绝",
} as const;

export function Dl2Step30HigherOrderPreparationLab() {
  return <DezeroStepLab {...profile} />;
}
