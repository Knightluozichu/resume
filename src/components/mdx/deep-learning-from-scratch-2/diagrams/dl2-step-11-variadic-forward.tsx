import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-11-variadic-forward",
  title: "步骤11 可变长参数（正向传播篇）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "第2阶段 用自然的代码表达",
    "步骤11 可变长参数（正向传播篇）",
    "11.1 修改Function类",
    "11.2 Add类的实现",
  ],
  mechanism:
    "Function 接受 inputs 元组并把 xs 列表送入 forward，使 Add 等运算可表达多输入和多输出",
  success: "步骤11 可变长参数（正向传播篇） 的前向、反向与重放证据一致",
  failure:
    "步骤11 可变长参数（正向传播篇） 在“仍按单输入字段保存 input 会丢掉第二个操作数及其梯度路径”处拒绝",
} as const;

export function Dl2Step11VariadicForwardLab() {
  return <DezeroStepLab {...profile} />;
}
