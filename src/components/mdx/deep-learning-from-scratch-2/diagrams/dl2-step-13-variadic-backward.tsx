import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-13-variadic-backward",
  title: "步骤13 可变长参数（反向传播篇）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤13 可变长参数（反向传播篇）",
    "13.1 支持可变长参数的Add类的反向传播",
    "13.2 修改Variable类",
    "13.3 Square类的实现",
  ],
  mechanism:
    "可变长 backward 按输入顺序返回梯度元组，Variable.backward 将每个 gx 写回对应输入",
  success: "步骤13 可变长参数（反向传播篇） 的前向、反向与重放证据一致",
  failure:
    "步骤13 可变长参数（反向传播篇） 在“梯度元组顺序与 inputs 不一致会把数值正确的梯度写到错误变量”处拒绝",
} as const;

export function Dl2Step13VariadicBackwardLab() {
  return <DezeroStepLab {...profile} />;
}
