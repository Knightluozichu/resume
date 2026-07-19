import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-19-usable-variable",
  title: "步骤19 让变量更易用",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤19 让变量更易用",
    "19.1 命名变量",
    "19.2 实例变量ndarray",
    "19.3 len函数和print函数",
  ],
  mechanism:
    "Variable 增加 name、shape、ndim、size、dtype、len 与 repr 代理，使调试信息来自 data 而不复制状态",
  success: "步骤19 让变量更易用 的前向、反向与重放证据一致",
  failure:
    "步骤19 让变量更易用 在“缓存一份独立 shape 或 dtype 会在 data 变化后产生不一致”处拒绝",
} as const;

export function Dl2Step19UsableVariableLab() {
  return <DezeroStepLab {...profile} />;
}
