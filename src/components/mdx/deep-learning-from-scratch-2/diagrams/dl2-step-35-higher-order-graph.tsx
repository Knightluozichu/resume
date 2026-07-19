import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-35-higher-order-graph",
  title: "步骤35 高阶导数的计算图",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤35 高阶导数的计算图",
    "35.1 tanh函数的导数",
    "35.2 tanh函数的实现",
    "35.3 高阶导数的计算图可视化",
  ],
  mechanism:
    "tanh.backward 使用 1-y²，二阶导图可视化揭示反向运算本身形成的新节点",
  success: "步骤35 高阶导数的计算图 的前向、反向与重放证据一致",
  failure:
    "步骤35 高阶导数的计算图 在“使用缓存 ndarray y 而不是 Variable y 会让高阶图在局部断开”处拒绝",
} as const;

export function Dl2Step35HigherOrderGraphLab() {
  return <DezeroStepLab {...profile} />;
}
