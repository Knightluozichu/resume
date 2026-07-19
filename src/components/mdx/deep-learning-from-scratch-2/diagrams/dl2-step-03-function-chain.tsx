import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-03-function-chain",
  title: "步骤3 函数的连续调用",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: ["步骤3 函数的连续调用", "3.1 Exp函数的实现", "3.2 函数的连续调用"],
  mechanism:
    "函数组合按实际执行顺序连接，Exp 与 Square 的输出可直接成为下一个 Function 的输入",
  success: "步骤3 函数的连续调用 的前向、反向与重放证据一致",
  failure:
    "步骤3 函数的连续调用 在“复制中间数值而不是传递 Variable 会切断后续追踪所需的对象链”处拒绝",
} as const;

export function Dl2Step03FunctionChainLab() {
  return <DezeroStepLab {...profile} />;
}
