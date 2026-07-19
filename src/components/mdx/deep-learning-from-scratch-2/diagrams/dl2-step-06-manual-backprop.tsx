import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-06-manual-backprop",
  title: "步骤6 手动进行反向传播",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤6 手动进行反向传播",
    "6.1 Variable类的功能扩展",
    "6.2 Function类的功能扩展",
    "6.3 Square类和Exp类的功能扩展",
    "6.4 反向传播的实现",
  ],
  mechanism:
    "Variable 保存 grad 与 creator，Function 保存 input；手动从输出沿 creator 逐节点调用 backward",
  success: "步骤6 手动进行反向传播 的前向、反向与重放证据一致",
  failure:
    "步骤6 手动进行反向传播 在“只给输出设置 grad 而未保存 creator/input 时，反向传播在首个节点就停止”处拒绝",
} as const;

export function Dl2Step06ManualBackpropLab() {
  return <DezeroStepLab {...profile} />;
}
