import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-31-higher-order-theory",
  title: "步骤31 高阶导数（理论篇）",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤31 高阶导数（理论篇）",
    "31.1 在反向传播时进行的计算",
    "31.2 创建反向传播的计算图的方法",
  ],
  mechanism:
    "create_graph 控制反向传播期间是否构建新计算图，一阶 backward 的运算可再接受 backward",
  success: "步骤31 高阶导数（理论篇） 的前向、反向与重放证据一致",
  failure:
    "步骤31 高阶导数（理论篇） 在“无条件建反向图会浪费内存，无条件关闭则无法求二阶导”处拒绝",
} as const;

export function Dl2Step31HigherOrderTheoryLab() {
  return <DezeroStepLab {...profile} />;
}
