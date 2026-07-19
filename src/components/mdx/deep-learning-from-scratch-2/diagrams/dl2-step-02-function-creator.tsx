import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-02-function-creator",
  title: "步骤2 创建变量的函数",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤2 创建变量的函数",
    "2.1 什么是函数",
    "2.2 Function类的实现",
    "2.3 使用Function类",
  ],
  mechanism:
    "Function.__call__ 解包输入 data、执行 forward，再把输出重新包装成 Variable",
  success: "步骤2 创建变量的函数 的前向、反向与重放证据一致",
  failure:
    "步骤2 创建变量的函数 在“forward 返回裸数组却没有统一包装，会让组合调用失去一致接口”处拒绝",
} as const;

export function Dl2Step02FunctionCreatorLab() {
  return <DezeroStepLab {...profile} />;
}
