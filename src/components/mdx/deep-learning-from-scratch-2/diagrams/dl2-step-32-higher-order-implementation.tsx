import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-32-higher-order-implementation",
  title: "步骤32 高阶导数（实现篇）",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤32 高阶导数（实现篇）",
    "32.1 新的DeZero",
    "32.2 函数类的反向传播",
    "32.3 实现更有效的反向传播（增加模式控制代码）",
    "32.4 修改__init__.py",
  ],
  mechanism:
    "函数 backward 改用可微运算，Variable.backward 在 enable_backprop(create_graph) 作用域执行并释放临时梯度",
  success: "步骤32 高阶导数（实现篇） 的前向、反向与重放证据一致",
  failure:
    "步骤32 高阶导数（实现篇） 在“模式作用域放错位置会让部分局部导数建图、部分不建图”处拒绝",
} as const;

export function Dl2Step32HigherOrderImplementationLab() {
  return <DezeroStepLab {...profile} />;
}
