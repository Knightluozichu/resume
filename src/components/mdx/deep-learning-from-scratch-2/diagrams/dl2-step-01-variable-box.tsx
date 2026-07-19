import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-01-variable-box",
  title: "步骤1 作为“箱子”的变量",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "第1阶段 自动微分",
    "步骤1 作为“箱子”的变量",
    "1.1 什么是变量",
    "1.2 实现Variable类",
    "1.3 （补充）NumPy的多维数组",
  ],
  mechanism:
    "Variable 把 ndarray 数据与承载数据的对象身份分开，后续图连接属于对象而不是数组值",
  success: "步骤1 作为“箱子”的变量 的前向、反向与重放证据一致",
  failure:
    "步骤1 作为“箱子”的变量 在“直接接收 list 或把 Variable 与 ndarray 当成同一对象会破坏类型合同”处拒绝",
} as const;

export function Dl2Step01VariableBoxLab() {
  return <DezeroStepLab {...profile} />;
}
